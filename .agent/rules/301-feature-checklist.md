# Feature Polish Checklist

Before concluding work on a feature, you MUST check this list to verify it is production-ready.

1. **Loading States**: Did you implement a skeleton loader (`skeleton.tsx` from Shadcn) or a loading state spinner while data fetches?
2. **Error Boundaries**: Are errors completely handled? Is there a fallback UI instead of a white crash screen?
3. **Responsive Design**: Have you tested standard mobile (`sm`), tablet (`md`), and desktop breakpoints (`lg`, `xl`) explicitly via Tailwind prefixes? Does it look premium on all of them?
4. **Accessibility (a11y)**: Do all buttons have `aria-label`s or obvious text? Is contrast high enough?
5. **Caching & Revalidation**: Where possible in Next.js, are you correctly utilizing `export const revalidate = 3600;` or similar caching tactics rather than dynamically rendering static marketing data?
