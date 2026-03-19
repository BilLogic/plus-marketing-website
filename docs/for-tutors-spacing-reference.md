# For Tutors Page — Spacing & Component Reference (Storybook)

Use this when rebuilding the For Tutors landing page from the design. All values align with **Styles/Spacing** and **Layout/Grid** in Storybook.

---

## 1. Global page & container

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Page horizontal padding** | Styles/Spacing → Padding conventions → “Page container” | `px-4 sm:px-6 lg:px-8` (16px → 24px → 32px) |
| **Content max width** | Styles/Spacing → Container widths | `max-w-5xl` (1024px) or `max-w-6xl` (1152px) for “standard page content” |
| **Vertical gap between major sections** | Styles/Spacing → Responsive patterns → “Section vertical” | `py-8 sm:py-12 lg:py-16` (32px → 48px → 64px) between sections |
| **Centering** | — | `mx-auto` with your `max-w-*` |

---

## 2. Header / navbar

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Nav link spacing** | Already in Bundui navbar | `gap-8` (32px) between About, For schools, etc. |
| **CTA button padding** | Styles/Spacing → Padding conventions → “Button (default)” | `px-4 py-2` (16px / 8px); pill = `rounded-full` |
| **Logo + nav container** | Templates/Navbars | Use `BunduiNavbar` or same `max-w-5xl` + horizontal padding as page |

---

## 3. Hero section

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Section vertical padding** | Styles/Spacing → Responsive patterns | `py-12 sm:py-16 lg:py-20` or similar (generous top/bottom) |
| **Space between label, heading, subheading** | Styles/Spacing → Gap utilities | `gap-4` or `gap-6` (16px / 24px) between blocks; `space-y-4` / `space-y-6` for stacks |
| **Gap between the two buttons** | Styles/Spacing → Gap utilities | `gap-4` (16px) — “Standard — card grids, nav items” |
| **Button padding (pill)** | Styles/Spacing → Padding conventions → Buttons | `px-4 py-2` (default) or `px-5 py-2.5` (lg) |
| **Templates** | — | Reuse patterns from **Templates/CTA** and **Templates/Features** (centered copy + actions) |

---

## 4. “Get Paid for All Your Hours” (3-column cards)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Section padding** | Styles/Spacing → Padding conventions | Section: `px-4 py-8 sm:px-6 sm:py-12` (Section mobile/desktop) |
| **Gap between cards** | Styles/Spacing → Gap utilities / Responsive patterns | `gap-4 sm:gap-6 lg:gap-8` (16px → 24px → 32px) |
| **Card internal padding** | Styles/Spacing → Padding conventions → “Card” | `p-5` or `p-6` (20px or 24px) |
| **Layout** | Layout/Grid → BasicGrid | `grid grid-cols-1 gap-4 md:grid-cols-3` (or use `gap-6` / `gap-8` as above) |
| **Heading margin below** | — | `mb-6` (24px) after section heading/subheading |

---

## 5. “What Tutoring at PLUS Looks Like” (3 small cards + large image)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Row of 3 cards** | Layout/Grid → BasicGrid | `grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6` |
| **Gap between cards row and image** | Styles/Spacing → Gap utilities | `gap-6` or `gap-8` (24px / 32px) |
| **Card padding** | Padding conventions → Card | `p-5` or `p-6` |
| **Templates** | Templates/Features | Similar structure: heading + subheading + card grid |

---

## 6. “Earn Certification & Digital Badges” (one wide card, split left/right)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Card internal padding** | Padding conventions → Card | `p-6` (24px) |
| **Gap between left (text) and right (badge)** | Gap utilities | `gap-6` or `gap-8`; use `flex` or `grid grid-cols-1 md:grid-cols-2` |
| **Button** | Padding conventions → Button | `px-4 py-2` or `px-5 py-2.5` for “Learn more” |

---

## 7. “Your Tutor Toolkit” (1 large + 2 stacked cards)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Grid** | Layout/Grid → GridWithGridItems or GridAreas | `grid grid-cols-1 md:grid-cols-4` with one cell `md:col-span-2` and two stacked, or `md:grid-cols-[2fr_1fr]` + rows |
| **Gap between grid items** | Gap utilities | `gap-4 sm:gap-6` |
| **Card padding** | Padding conventions → Card | `p-5` or `p-6` |

---

## 8. “Voices from Our Tutors” (3 testimonial cards)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Layout** | Layout/Grid → BasicGrid | `grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6` |
| **Card padding** | Padding conventions → Card | `p-6` |
| **Gutter between cards** | Gap utilities | `gap-6` or `gap-8` |
| **Templates** | Templates/Testimonials | **BunduiTestimonialsSection** for structure and spacing reference |

---

## 9. Final CTA (“Ready to Make an Impact?”)

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Section padding** | Styles/Spacing → Responsive patterns | `py-16 sm:py-20 md:py-24` (as in Templates/CTA) |
| **Container** | CTA story wrapper | `mx-auto max-w-5xl px-4 sm:px-6 md:px-8` |
| **Gap between heading and buttons** | Gap utilities | `gap-6` (24px) |
| **Templates** | Templates/CTA | **BunduiCtaSection** for layout and spacing |

---

## 10. Newsletter signup bar

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Bar padding** | Padding conventions → “Section (mobile)” | `px-4 py-3` or `py-4` |
| **Gap between input and button** | Gap utilities | `gap-3` (12px) — “Default — form fields” |
| **Input padding** | Padding conventions → Input | `px-3 py-2` (12px / 8px) |
| **Templates** | Templates/Newsletter | **BunduiNewsletterSection** for layout and styling |

---

## 11. Footer

| Design need | Storybook reference | Classes / values |
|-------------|---------------------|-------------------|
| **Multi-column layout** | Layout/Grid | Flex or grid with `gap-8` (32px) between columns |
| **Column internal spacing** | Gap utilities | `gap-4` (16px) between link rows |
| **Templates** | Templates/Footer | **BunduiFooterSection** (dark teal, logo + link columns) |
| **Bottom bar (copyright + links)** | — | `border-t border-border/50`, `py-4`, `px-4 sm:px-6` |

---

## Quick lookup: spacing scale (4px grid)

Use these Tailwind classes so spacing stays on the 4px grid:

- **4px** = `1` (e.g. `p-1`, `gap-1`)
- **8px** = `2`
- **12px** = `3`
- **16px** = `4`
- **24px** = `6`
- **32px** = `8`
- **48px** = `12`
- **64px** = `16`

**Where to look in Storybook**

- **Styles/Spacing** — spacing scale, gap utilities, padding conventions, container widths, responsive patterns.
- **Layout/Grid** — BasicGrid (3-col), GridWithGridItems, GridAreas, CardGridLayout (section + cards).
- **Templates** — Navbars, CTA, Testimonials, Newsletter, Footer, Features (for feature cards).
