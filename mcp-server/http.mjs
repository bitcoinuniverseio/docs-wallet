#!/usr/bin/env node
// Universe Wallet documentation MCP server, Streamable HTTP transport.
//
// The same core and tool set as stdio.mjs, served over HTTP for hosted clients.
// Deployed on first-party infrastructure under the documentation domain. No
// authentication is required because the server can only read public
// documentation; no state is kept between requests beyond the corpus itself.
//
// Usage: PORT=8787 node mcp-server/http.mjs [--corpus <dir>]
import { createServer } from 'node:http';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { buildTools, loadCorpus } from './core.mjs';

const corpusIndex = process.argv.indexOf('--corpus');
const corpus = loadCorpus(corpusIndex !== -1 ? { corpusDir: process.argv[corpusIndex + 1] } : {});
const tools = buildTools(corpus);

function createMcpServer() {
  const server = new Server(
    { name: 'universe-wallet-docs', version: corpus.catalog.walletVersion },
    {
      capabilities: { tools: {} },
      instructions:
        'Read-only documentation server for Universe Wallet. Every result cites its page, release, and content hash.',
    },
  );
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  }));
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const tool = tools.find((candidate) => candidate.name === name);
    if (!tool) {
      return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
    }
    try {
      const result = await tool.handler(args ?? {});
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text', text: `Tool failed: ${error.message}` }], isError: true };
    }
  });
  return server;
}

const port = Number(process.env.PORT ?? 8787);

const httpServer = createServer(async (req, res) => {
  if (req.url !== '/mcp/wallet' && req.url !== '/mcp/wallet/') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }
  // Stateless mode: one server instance per request keeps the surface
  // read-only and simple; no sessions, no stored state.
  try {
    const mcpServer = createMcpServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
    res.on('close', () => {
      void transport.close();
      void mcpServer.close();
    });
    await mcpServer.connect(transport);
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    await transport.handleRequest(req, res, body);
  } catch (error) {
    if (!res.headersSent) {
      res.writeHead(500, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  }
});

httpServer.listen(port, () => {
  process.stdout.write(`universe-wallet-docs MCP (HTTP) listening on :${port}/mcp/wallet\n`);
});
