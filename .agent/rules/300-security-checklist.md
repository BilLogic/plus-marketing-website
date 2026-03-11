# Security Checklist

When finalizing code for frontend forms, API routes, or sensitive data access, please confirm:

1. **Input Sanitization**: Are you using `zod` to validate user inputs completely? Never trust raw client data.
2. **CORS & CSRF**: Is the route properly restricted?
3. **Environment Secrets**: Ensure NO `process.env.SECRET_KEY` variables are exposed in `NEXT_PUBLIC_` or client-side files (`"use client"`).
4. **Auth Guards**: If protecting a page or component, are you actively checking the session/cookie server-side before rendering or responding from an API handler?
