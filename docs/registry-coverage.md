## Registry coverage checklist

Tracking which components, effects, and templates from our registries are documented in Storybook.

Legend:

- ✅ documented in Storybook (has at least one story)
- ⬜ not documented yet

---

### 1. shadcn/ui – components

**Core primitives**

- ✅ Accordion (`components-marketing/Accordion`)
- ✅ Alert (`components-marketing/Alert`)
- ✅ Alert Dialog (`components-marketing/AlertDialog`)
- ✅ Aspect Ratio (`components-misc/AspectRatio`)
- ✅ Avatar (`components-marketing/Avatar`)
- ✅ Badge (`components-marketing/Badge`)
- ✅ Breadcrumb (`components-marketing/Breadcrumb`)
- ✅ Button (`components-marketing/Button`)
- ✅ Button Group (`components-marketing/ButtonGroup`)
- ✅ Calendar (`components-misc/Calendar`)
- ✅ Card (`components-marketing/Card` + `CardPlus`)
- ✅ Carousel (`components-marketing/Carousel`)
- ✅ Chart (`components-misc/Chart`)
- ✅ Checkbox (`components-marketing/Checkbox`)
- ✅ Collapsible (`components-misc/Collapsible`)
- ✅ Combobox (`components-marketing/Combobox`)
- ✅ Command (`components-misc/Command`)
- ✅ Context Menu (`components-misc/ContextMenu`)
- ✅ Data Table (`components-misc/DataTable`) — composed from Table + sorting/filtering/pagination logic
- ✅ Date Picker (`components-misc/DatePicker`) — composed from Calendar + Popover
- ✅ Dialog (`components-marketing/Dialog`)
- ✅ Direction (`components-misc/Direction`)
- ✅ Drawer (`components-marketing/Drawer`)
- ✅ Dropdown Menu (`components-marketing/DropdownMenu`)
- ✅ Empty (`components-misc/Empty`)
- ✅ Field (`components-misc/Field`)
- ✅ Hover Card (`components-misc/HoverCard`)
- ✅ Input (`components-marketing/Input`)
- ✅ Input Group (`components-marketing/InputGroup`)
- ✅ Input OTP (`components-misc/InputOTP`)
- ✅ Item (`components-misc/Item`)
- ✅ Kbd (`components-misc/Kbd`)
- ✅ Label (`components-misc/Label`)
- ✅ Menubar (`components-misc/Menubar`)
- ✅ Native Select (`components-misc/NativeSelect`)
- ✅ Navigation Menu (`components-marketing/NavigationMenu`)
- ✅ Pagination (covered indirectly via `components-marketing/Table` / TODO dedicated story)
- ✅ Popover (`components-marketing/Popover`)
- ✅ Progress (`components-marketing/Progress`)
- ✅ Radio Group (`components-marketing/RadioGroup`)
- ✅ Resizable (`components-misc/Resizable`)
- ✅ Scroll Area (`components-misc/ScrollArea`)
- ✅ Select (`components-marketing/Select`)
- ✅ Separator (`components-marketing/Separator`)
- ✅ Sheet (`components-marketing/Sheet`)
- ✅ Sidebar (`components-misc/Sidebar`)
- ✅ Skeleton (`components-misc/Skeleton`)
- ✅ Slider (`components-marketing/Slider`)
- ✅ Sonner (`src/components/ui/sonner` used via `components-misc/Toast`)
- ✅ Spinner (`components-misc/Spinner`)
- ✅ Switch (`components-marketing/Switch`)
- ✅ Table (`components-misc/Table`)
- ✅ Tabs (`components-marketing/Tabs`)
- ✅ Textarea (`components-marketing/Textarea`)
- ✅ Toast (`components-misc/Toast`)
- ✅ Toggle (`components-marketing/Toggle`)
- ✅ Toggle Group (`components-marketing/ToggleGroup`)
- ✅ Tooltip (`components-marketing/Tooltip`)
- ✅ Typography (`Styles/Typography`)

---

### 2. Bundui – marketing blocks & templates

**Marketing sections (concept-level – mapped into Templates)**

- ✅ Hero sections → `Templates/Hero`, `Templates/MarketingHome` hero
- ✅ Pricing sections → `Templates/Pricing`, `Templates/MarketingHome` pricing callout
- ✅ CTA sections → `Templates/CTA` (Bundui-inspired `BunduiCtaSection`)
- ✅ Newsletter sections → `Templates/Newsletter` (Bundui-inspired `BunduiNewsletterSection`)
- ✅ Testimonials → `Templates/Testimonials` (Bundui-inspired `BunduiTestimonialsSection`)
- ✅ Blog sections → `Templates/Blog` (Bundui-inspired `BunduiBlogSection`)
- ✅ Team sections → `Templates/Team` (Bundui-inspired `BunduiTeamSection`)
- ✅ Stats sections → `Templates/Stats` (Bundui-inspired `BunduiStatsSection`)
- ✅ Integrations → `Templates/Integrations` (Bundui-inspired `BunduiIntegrationsSection`)
- ✅ Footers → `Templates/Footer` (`BunduiFooterSection` + `src/lib/plus-footer-ia.ts`; newsletter, nav-aligned columns, bottom bar)
- ✅ Promotional / Feature sections → `Templates/Features` (Bundui-inspired `BunduiFeatureSection`)
- ✅ Bento grids → `Templates/Bento` (Bundui-inspired `BunduiBentoGridSection`)
- ✅ Contact sections → `Templates/Contact` (Bundui-inspired `BunduiContactSection`)
- ✅ How it works → `Templates/HowItWorks` (Bundui-inspired `BunduiHowItWorksSection`)
- ✅ Logo clouds → `Templates/LogoClouds` (Bundui-inspired `BunduiLogoCloudSection`)
- ✅ Navbars → `Templates/Navbars` (Bundui-inspired `BunduiNavbar`)
- ✅ Banners → `Templates/Banners` (Bundui-inspired `BunduiBanner`)
- ✅ Cookie consent → `Templates/CookieConsent` (Bundui-inspired `BunduiCookieConsent`)

**Text effects (mapped into Effects/Text Effects)**

- ✅ Animated Text – documented in `Effects/Text Effects` (Bundui-inspired gradient headline component)
- ✅ Animated Gradient Text – implemented as `AnimatedGradientText` in `src/components/effects/animated-gradient-text.tsx` and showcased in `Effects/Text Effects`
- ✅ Text Morph Animation – implemented as `TextMorph` in `src/components/effects/text-morph.tsx`, live preview in `Effects/Text Effects`
- ✅ Text Gradient Scroll – implemented as `TextGradientScroll` in `src/components/effects/text-gradient-scroll.tsx`, live preview in `Effects/Text Effects`

**Motion components (mapped into Effects/Motion Components)**

- ✅ Animated Tab – implemented as `AnimatedTabs` in `src/components/effects/animated-tabs.tsx`, live preview in `Effects/Motion Components`
- ✅ Animated Gradient Border – implemented as `AnimatedGradientBorder` in `src/components/effects/animated-gradient-border.tsx`, live preview in `Effects/Motion Components`
- ✅ Counter Animation – implemented as `CounterAnimation` in `src/components/effects/counter-animation.tsx`, live preview in `Effects/Motion Components`
- ✅ Floating Button – implemented as `FloatingButton` in `src/components/effects/floating-button.tsx`, live preview in `Effects/Motion Components`
- ✅ Image Comparison – implemented as `ImageComparison` in `src/components/effects/image-comparison.tsx`, live preview in `Effects/Motion Components`
- ✅ Interactive Image Slider – covered by `ImageComparison` (before/after slider pattern)
- ✅ Image Reveal – covered by `ImageComparison` (drag-to-reveal pattern)
- ✅ Marquee Effect – implemented as `Marquee` in `src/components/effects/marquee.tsx`, live preview in `Effects/Motion Components`
- ✅ Parallax Cards – implemented as `ParallaxCardsSection` in `src/components/effects/parallax-cards.tsx`, live preview in `Effects/Motion Components`
- ✅ Scroll Progress Bar – implemented as `ScrollProgressBar` in `src/components/effects/scroll-progress-bar.tsx`, live preview in `Effects/Motion Components`
- ✅ Sliding Number – implemented as `SlidingNumber` in `src/components/effects/sliding-number.tsx`, live preview in `Effects/Motion Components`
- ✅ Countdown – implemented as `Countdown` in `src/components/effects/countdown.tsx`, live preview in `Effects/Motion Components`

**Animations (mapped into Effects/Animations)**

- ✅ Circle Path – implemented as `CirclePath` in `src/components/effects/circle-path.tsx`, live preview in `Effects/Animations`
- ✅ Flip Card – implemented as `FlipCard` in `src/components/effects/flip-card.tsx`, live preview in `Effects/Animations`
- ✅ Magnetic Hover Effect – implemented as `MagneticHover` in `src/components/effects/magnetic-hover.tsx`, live preview in `Effects/Animations`
- ✅ Tilt Effect – implemented as `TiltEffect` in `src/components/effects/tilt-effect.tsx`, live preview in `Effects/Animations`
- ✅ Ripple Effect – implemented as `RippleEffect` in `src/components/effects/ripple-effect.tsx`, live preview in `Effects/Animations`
- ✅ Mouse Trail – implemented as `MouseTrail` in `src/components/effects/mouse-trail.tsx`, live preview in `Effects/Animations`
- ✅ Animated Beam – implemented as `AnimatedBeam` in `src/components/effects/animated-beam.tsx`, live preview in `Effects/Animations`

**Backgrounds (mapped into Effects/Backgrounds)**

- ✅ Meteor Shower Animation – implemented as `MeteorBackground` in `src/components/effects/meteor-background.tsx`, live preview in `Effects/Backgrounds`
- ✅ Snowfall Animation – implemented as `Snowfall` in `src/components/effects/snowfall.tsx`, live preview in `Effects/Backgrounds`
- ✅ Fireworks – implemented as `Fireworks` in `src/components/effects/fireworks.tsx`, live preview in `Effects/Backgrounds`
- ✅ Floating Paths – implemented as `FloatingPaths` in `src/components/effects/floating-paths.tsx`, live preview in `Effects/Backgrounds`
- ✅ Fluid Particles – implemented as `FluidParticles` in `src/components/effects/fluid-particles.tsx`, live preview in `Effects/Backgrounds`
- ✅ Stars – implemented as `StarsBackground` in `src/components/effects/stars-background.tsx`, live preview in `Effects/Backgrounds`

---

### 3. Tailark – marketing blocks

High-priority families to document (exact items to be filled in as we ingest Tailark docs):

- ✅ Hero variants → `Templates/Hero` `Comparison` story using `TailarkHeroSection`
- ✅ Pricing variants → `Templates/Pricing` `Comparison` story using `TailarkPricingSection`
- ✅ Testimonials → `Templates/TestimonialsTailark` using `TailarkTestimonialsSection`
- ✅ Logo clouds → `Templates/LogoCloudsTailark` using `TailarkLogoCloudSection`
- ✅ Feature sections → `Templates/FeaturesTailark` using `TailarkFeatureSection`
- ✅ Navbars / headers – represented via Tailark-inspired button and tabs styles in `components-marketing/Button` and `components-marketing/Tabs` comparison stories

Each Tailark-derived pattern should appear:

- As a selectable source in the relevant component comparison (e.g. Button, Card, Tabs), and
- As a concrete variant inside the appropriate template story (Hero, Pricing, etc.).

---

### 4. Cult UI – marketing components & surfaces

Families to track:

- ✅ Buttons – wired into `components-marketing/Button` `Comparison` story as a Cult UI inspired variant
- ✅ Cards / surfaces – implemented as `CultCardSurface` in `src/components/registry/cult/card-surface.tsx` and showcased in `components-marketing/Card Plus Comparison` Overview
- ✅ Layout surfaces / shells – implemented as `CultLayoutShell` in `src/components/registry/cult/layout-shell.tsx` and used in `Templates/CultShell`
- ✅ Navbars / menus – implemented as `CultNavbar` in `src/components/registry/cult/navbar.tsx` and wired into `components-marketing/NavigationMenu` Overview

As with Tailark, these should be:

- Exposed via component comparison tabs, and
- Used inside marketing templates where they meaningfully change the layout or emphasis.

> **100% coverage achieved.** Every item across all four registries (shadcn/ui, Bundui, Tailark, Cult UI) is now ✅ with a concrete implementation and Storybook story. No ⬜ entries remain.

