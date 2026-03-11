# Database & Content Strategy

*Applies to: `src/db/**`, `content/**`*

## Current Approach: Headless / MDX
- Currently, this project primarily relies on **MDX** for marketing content (blogs, case studies) and lightweight file-based data structures to remain maximally performant and simple.
- Do not write standard SQL queries or setup heavy ORMs (like Prisma) unless explicitly instructed to integrate a backend (e.g., Supabase) later for lead-gen capturing.

## Markdown/Content Rules
- All MDX files must have proper frontmatter (e.g., `title`, `date`, `description`) defined and validated by Zod when parsed.
