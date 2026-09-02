#!/usr/bin/env node
// Universe Wallet documentation MCP server, stdio transport.
//
// Read-only documentation tools over the generated corpus. Usage:
//   node mcp-server/stdio.mjs [--corpus <dir-with-api/*.json-and-markdown>]
// The corpus defaults to dist/ (run the site build first) or downloads nothing:
// pass a directory containing api/*.json, markdown/, and provider-contract.json.
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { buildTools, loadCorpus } from './core.mjs';

const corpusIndex = process.argv.indexOf('--corpus');
const corpus = loadCorpus(corpusIndex !== -1 ? { corpusDir: process.argv[corpusIndex + 1] } : {});
const tools = buildTools(corpus);

const server = new Server(
  {
    name: 'universe-wallet-docs',
    version: corpus.catalog.walletVersion,
  },
  {
    capabilities: { tools: {} },
    instructions:
      'Read-only documentation server for Universe Wallet. Every result cites its page, release, and content hash. Unknown versions and unknown capabilities are answered as unknown, never guessed.',
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
    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }
  try {
    const result = await tool.handler(args ?? {});
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Tool failed: ${error.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
