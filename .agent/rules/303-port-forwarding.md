# Port Forwarding in Remote / Cloud Workspaces

When this project is opened via **Cursor Remote**, **VS Code Dev Tunnels**, **GitHub Codespaces**, or any cloud-based IDE, local dev servers (Next.js on `:3000`, Storybook on `:6006`, etc.) are **not directly reachable** from the user's browser because the server runs on a remote machine.

## What the Agent Must Do

When you start a dev server (e.g. `npm run dev`, `npm run storybook`) in a remote workspace:

1. **Detect the environment.** If `curl http://localhost:<port>` returns a 200 but the user reports they cannot see the page, this is almost certainly a port-forwarding issue — not a server bug.

2. **Use the built-in browser first.** The Cursor IDE browser MCP (`browser_navigate`) runs co-located with the server, so `http://localhost:<port>` works directly. Navigate there and take a screenshot to confirm the server is healthy.

3. **Educate the user on port forwarding.** Provide these steps:
   - Open the **Ports** panel in Cursor (bottom bar, next to Terminal / Problems / Output).
   - If the port is already listed, note the **Forwarded Address** column — that is the URL to open in a browser.
   - If the port is _not_ listed, click **Add Port** and enter the port number (e.g. `6006`).
   - **Visibility** defaults to **Private** (requires GitHub sign-in to access). Right-click the port entry and change to **Public** if the user wants a shareable link without authentication.

4. **Provide the tunnel URL pattern.** Dev Tunnel URLs follow this pattern:
   ```
   https://<tunnel-id>-<port>.use.devtunnels.ms/
   ```
   The exact `<tunnel-id>` can be found in the port forwarding logs or the Ports panel.

## Common Pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| Browser shows "can't reach this page" | Port not forwarded | Add port in Ports panel |
| Tunnel URL redirects to GitHub login | Visibility set to Private | Change to Public, or sign in with GitHub |
| `curl` works but browser doesn't | Browser is on a different machine | Use the forwarded URL, not `localhost` |
| Storybook loads but assets are broken | Storybook base URL mismatch | Pass `--host 0.0.0.0` (already default in our scripts) |

## Quick Reference: Default Ports

| Service | Port | Start Command |
|---|---|---|
| Next.js Dev | `3000` | `npm run dev` |
| Storybook | `6006` | `npm run storybook` |
