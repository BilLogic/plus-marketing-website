# MCP Server Setup Guide

To ensure AI coding agents (like Claude Code, Cursor, Aider) can fully assist with the **Plus Marketing Website**, you need to configure specific Model Context Protocol (MCP) servers locally.

## 1. Figma MCP
Enables the agent to read design tokens, layout data, and component mappings directly from our Figma files.

**Installation**:
```bash
npx -y @figma/mcp
```
**Usage**:
In Cursor, add the MCP server configuration:
- Name: `Figma`
- Command: `npx @figma/mcp`

Or in Claude Code:
```bash
claude mcp add --transport sse figma-dev-mode-mcp-server http://127.0.0.1:3845/sse
```

## 2. Playwright MCP
Allows the agent to spin up a headless browser, navigate the app, and take accessibility tree snapshots to verify UI functionality natively.

**Installation**:
```bash
npx -y @playwright/mcp@latest
```
**Usage** in Claude Code:
```bash
claude mcp add playwright -s user -- npx @playwright/mcp@latest
```

## 3. Notion MCP (CMS Planning)
If tracking tasks or pulling content drafts from Notion, install the Notion MCP.

**Installation**:
You will need a Notion Integration token. Ensure you have `NOTION_API_TOKEN` set in your environment.
```bash
npx -y @modelcontextprotocol/server-notion
```

---
**Note to Agents**: Always verify if these are running via the `.agent/rules/302-mcp-status-check.md` rule before failing a task!
