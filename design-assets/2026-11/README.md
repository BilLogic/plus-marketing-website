# Design assets for the PLUS design system update

Source files for the marketing site upgrade. Nothing here is served or imported until a later ticket copies it into place.

| File | Used for | Destination |
| --- | --- | --- |
| `plus-lockup-colored-24.svg` | Phone header | `public/brand/` |
| `plus-lockup-colored-32.svg` | Desktop header | `public/brand/` |
| `plus-lockup-colored-dark-32.svg` | Footer | `public/brand/` |
| `plus-lockup-colored-96.svg` | Source for the social image | Stays here |
| `icon.svg` | Browser tab icon | `src/app/icon.svg` |
| `favicon.ico` | Fallback tab icon, 16 and 32 | `src/app/favicon.ico` |
| `apple-icon.png` | iOS home screen, 180 px | `src/app/apple-icon.png` |
| `opengraph-image.png` | Default social image, 1200x630 | `src/app/opengraph-image.png` |
| `GoogleSansFlex-Latin-ROND100.woff2` | Site font | `src/app/fonts/` |
| `OFL.txt` | Font license | `src/app/fonts/` |
| `plus-tokens.css` | Light color, radius, shadow and type tokens | `src/app/plus-tokens.css` |

The font file keeps the full weight axis (1 to 1000) and has rounded ends built in at ROND 100, so it needs no `font-variation-settings`. Declare `weight: "400 600"` when loading it.

Logo artwork is rendered from the PLUS `Logo` component. Do not redraw or edit it.

Generated from plus-uno commit `980ab60c9`.
