# Machine-readable documentation and MCP | Universe Wallet

llms.txt, the JSON catalog, clean Markdown views, and the read-only MCP server for AI clients.

- Universe Wallet 
- Developers 
 
# Machine-readable documentation and MCP

 
# Machine-readable documentation and MCP
 Everything humans read here exists in machine-readable form, generated from the same data and checked against wallet 1.7.5.8. Nothing is summarized by a model on the way through: clients quote the same pages people read.

## Corpus
 
- llms.txt - the shaped index for language models 
- llms-full.txt - every page as plain text 
- api/catalog.json - every page with its content hash 
- api/releases.json - the release catalog 
- api/capabilities.json - the capability snapshot 
- api/journeys.json - the journey catalog 
- markdown/ - a clean Markdown view of every page 

## MCP server
 A read-only Model Context Protocol server serves this corpus. Tools: search_wallet_docs , read_wallet_doc , list_wallet_releases , compare_wallet_releases , get_wallet_capability , list_wallet_protocols , get_wallet_protocol , list_wallet_journeys , read_wallet_journey , read_wallet_safety_checklist , get_provider_method , list_provider_methods . Every result carries its URL, title, release, and content hash. The server exposes no wallet connector, signer, broadcaster, or account lookup, and cannot mutate anything.

### Local stdio server
 Run from a checkout of this repository (the corpus is generated at build time):
 node mcp-server/stdio.mjs --corpus https://bitcoinuniverseio.github.io/docs-wallet/api/catalog.json 
### Claude Code
 claude mcp add universe-wallet-docs -- node /path/to/docs-wallet/mcp-server/stdio.mjs 
### Cursor and VS Code-compatible clients
 {
 "mcpServers": {
 "universe-wallet-docs": {
 "command": "node",
 "args": ["/path/to/docs-wallet/mcp-server/stdio.mjs"]
 }
 }
} 
### Hosted read-only endpoint
 A Streamable HTTP endpoint serving the same corpus from first-party infrastructure:
 {
 "mcpServers": {
 "universe-wallet-docs": {
 "url": "https://docs.bitcoinuniverse.io/mcp/wallet"
 }
 }
} Both transports are one implementation with two adapters, tested with the MCP protocol test suite. The hosted endpoint exposes the same read-only tool set and nothing else.

## Grounding rules the server enforces
 
- Every answer quotes pages; the server never synthesizes capabilities. 
- Unknown versions are answered as unknown, never mapped to the nearest release. 
- Capability status travels with every result that involves an operation. 
- Insufficient evidence returns the closest passages and says so. 
 Questions about integration: start at the integration guide or the Integration Studio .

 
 Previous Integration Studio Next Troubleshooting 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 
- Bitcoin Universe documentation portal 
- Report a documentation error
