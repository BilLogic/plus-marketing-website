# Code Standards

## General Guidelines
- Use **early returns** whenever possible to make code more readable.
- Use **descriptive variable and function names**. Event handlers should use the `handle` prefix (e.g., `handleClick`).
- Keep components focused and small. Implement the DRY (Don't Repeat Yourself) principle.

## TypeScript and React
- Use `const` instead of `function` for component definitions (e.g., `const Button = () => { ... }`).
- Always define types or interfaces for props. Avoid `any`.
- Never use semicolons (unless strictly required by the compiler for ASI).

## Styling (Tailwind CSS)
- **Always use Tailwind classes** for styling HTML elements; avoid standard CSS or inline `<style>` tags.
- Use the `cn()` utility (clsx + tailwind-merge) for conditional class names instead of ternary operators mixed in strings when possible.
- Avoid generic colors. Map to semantic tokens (e.g., `bg-primary`, `text-muted`).

## Commits
Use standard conventional commits:
- `feat:` for new features.
- `fix:` for bug fixes.
- `chore:`, `docs:`, `ui:`, `refactor:` as appropriate.
