# MCP Status & Local Setup Checks

This rule is invoked to verify if tools require manual user-startup or to assist debugging MCP Server connections.

## Expected Integrations
- **Notion MCP**: For pulling dynamic CMS content or syncing planning boards.
- **Figma MCP**: For directly reading brand tokens and `Code Connect` component mapping.
- **Playwright MCP**: For spinning up browser instances to natively test UI/UX flows.

## Troubleshooting Logic
If you (the coding agent) receive an error starting a tool, reading a Figma file, or accessing a resource via MCP:
1. DO NOT assume the code is broken immediately.
2. **Instruct the User**: Explicitly remind the user to start or install the required MCP servers locally. 
   - *Example prompt to user: "I notice the Figma MCP is unreachable. Please ensure it is running in your terminal or Claude Desktop configuration, then I can continue mapping these components."*

## Remote Workspace Connectivity
If a dev server is running but the user cannot reach it in their browser, the issue is likely **port forwarding** — not a code bug. See `303-port-forwarding.md` for the full diagnostic and user education steps.
