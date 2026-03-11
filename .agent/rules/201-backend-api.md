# Backend API & Middleware Patterns

*Applies to: `src/api/**`, `src/lib/**`*

## Next.js Route Handlers
- Use `NextResponse` for all API responses.
- All routes must handle errors gracefully using `try/catch` and return appropriate status codes (e.g., 400 Bad Request, 500 Internal Server Error) with a standardized JSON error shape: `{ error: string, code?: string }`.

## Input Validation
- Validate all incoming API request data (body, query params) using **Zod** before processing it. Never trust client input.
- Keep route handler logic minimal. Defer heavy business logic to separate helper functions in `src/lib/`.
