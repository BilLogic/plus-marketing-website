"use client"

import { CounterAnimation } from "@/components/effects/counter-animation"
import { MagneticHover } from "@/components/effects/magnetic-hover"
import { MeteorBackground } from "@/components/effects/meteor-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

/**
 * Top announcement bar mirroring the tutors.plus product update banner.
 */
export const PlusAnnouncementBar = () => {
  return (
    <div className="w-full border-b border-border/60 bg-primary/5 px-4 py-2.5 text-xs text-muted-foreground sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs">
          <span className="mr-1.5 inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
            New
          </span>
          PLUS app v10 is now live — new features for onboarding, AI Feedback and tutoring workflows.
        </p>
        <Button variant="link" size="sm" className="h-auto px-0 py-0 text-xs font-medium text-primary">
          Explore updates →
        </Button>
      </div>
    </div>
  )
}

/**
 * Navbar adapted from BunduiNavbar with tutors.plus style links.
 */
export const PlusNavbar = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <header className="sticky top-0 z-40 bg-background/80 pb-3 backdrop-blur-md">
      <div className="flex justify-center px-4 pt-3 sm:px-6">
        <div className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-border/70 bg-background/90 px-4 py-2.5 shadow-sm shadow-black/[0.04]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="relative flex size-7 items-center justify-center rounded-full bg-primary/10">
              <span className="absolute inset-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-semibold tracking-tight">PLUS</span>
          </div>

          {/* Nav links */}
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
            {["About", "Solutions", "Impact", "Get Involved"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
              <span>Light</span>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                aria-label="Toggle light and dark mode"
              />
              <span>Dark</span>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Demo
            </Button>
            <Button size="sm">Login</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * Hero section with H1 = "Scaling Up High-Impact Math Tutoring with Technology and Training".
 */
export const PlusHeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/90">
      <MeteorBackground density={14} />
      {/* Subtle teal gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-fuchsia-500/5" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 sm:px-10 sm:py-16 md:flex-row md:items-center md:py-20">
        {/* Main copy */}
        <div className="max-w-2xl space-y-5">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
            Carnegie Mellon University
          </span>
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Scaling Up High-Impact Math Tutoring with Technology and Training
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            PLUS is a virtual tutoring platform that empowers middle school math learners with AI technology and research-backed methods.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <MagneticHover>
              <Button size="lg" className="shadow-md shadow-primary/25">
                Try our demo
              </Button>
            </MagneticHover>
            <Button size="lg" variant="outline">
              Explore updates →
            </Button>
          </div>
        </div>

        {/* Mission card */}
        <div className="flex-1 md:max-w-xs">
          <Card className="border-border/60 bg-background/90 shadow-sm">
            <CardHeader className="pb-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                Our mission
              </p>
            </CardHeader>
            <CardContent className="space-y-2.5 text-sm text-muted-foreground">
              <p>
                PLUS serves students from low-income backgrounds across the country, providing math tutoring that fits into the school day.
              </p>
              <p>
                Tutors work alongside classroom teachers to build confidence, motivation, and deep understanding of math concepts.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

/**
 * Impact stats section: 13+ Schools, 500+ Tutors, 5000+ Students.
 */
export const PlusImpactStatsSection = () => {
  return (
    <section id="impact" className="rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Impact
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          PLUS Serves Students from Low-Income Backgrounds Across the Country
        </h2>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            target: 13,
            suffix: "+",
            label: "Schools",
            desc: "PLUS tutors provide instructional support to middle-school math learners during the school day.",
            color: "text-primary",
            bg: "bg-primary/8",
          },
          {
            target: 500,
            suffix: "+",
            label: "Tutors",
            desc: "University and community tutors trained to support middle school math learners.",
            color: "text-fuchsia-800 dark:text-fuchsia-300",
            bg: "bg-fuchsia-500/8",
          },
          {
            target: 5000,
            suffix: "+",
            label: "Students",
            desc: "Students across the country receiving personalized math support through PLUS.",
            color: "text-blue-700 dark:text-blue-300",
            bg: "bg-blue-500/8",
          },
        ].map(({ target, suffix, label, desc, color, bg }) => (
          <Card key={label} className="border-border/70 bg-card/90">
            <CardHeader className="pb-2">
              <CardTitle className={`text-4xl font-bold ${color}`}>
                <CounterAnimation target={target} suffix={suffix} />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${bg} ${color}`}>{label}</p>
              <p className="text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button variant="outline" size="sm">
          Get PLUS tutoring
        </Button>
      </div>
    </section>
  )
}

/**
 * Motivation and stories section.
 */
export const PlusMotivationSection = () => {
  return (
    <section className="rounded-3xl border border-border/70 bg-card/90 px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Motivation and Content Help for Every Student
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Math is for Everyone
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We are leveling the playing field by making tutoring more accessible, so that students can unlock their full potential.
          </p>
          <Button variant="outline" size="sm">
            Learn our stories →
          </Button>
        </div>
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            PLUS tutors focus on both the emotional and academic sides of learning. Sessions are designed to keep students motivated while providing clear explanations, practice opportunities, and timely feedback.
          </p>
          <p>
            By pairing research-backed methods with caring relationships, PLUS helps students see themselves as math learners who can grow and succeed.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Outcomes strip: 1:1 Live Tutoring Support, 80%+, Motivation.
 */
export const PlusOutcomesStrip = () => {
  return (
    <section className="rounded-3xl border border-border/70 bg-background/80 px-6 py-8 sm:px-10 sm:py-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">1:1 Live Tutoring Support</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Real-time virtual sessions that give each student focused help in math.
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              <CounterAnimation target={80} suffix="%+" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            of students from low-income families supported through PLUS tutoring programs.
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Motivation &amp; Content Support</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Tutors provide both motivational coaching and just-in-time math help so students stay on track.
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

/**
 * Voices/testimonials section in a 2×2 grid with consistent card heights.
 */
export const PlusVoicesSection = () => {
  const testimonials = [
    {
      quote: "The students' reactions speak for themselves. They look forward to the tutoring sessions. It's not just about math. It's about relationships. It's about",
      highlight: "building confidence",
      end: ".",
      attribution: "School District of Lancaster",
      role: "Partner District",
    },
    {
      quote: "Tutoring has affected me and it made me realize if I didn't get the help I needed I would still be struggling. But it made me see",
      highlight: "math differently in a good way",
      end: ".",
      attribution: "Student Receiving PLUS Tutoring",
      role: "Middle School Student",
    },
    {
      quote: "It's been exciting and encouraging to see how PLUS university tutors are able to provide an additional layer of math intervention by virtually assisting our students with",
      highlight: "just-in-time support",
      end: ".",
      attribution: "Assistant Director of Educational Services",
      role: "Partner School Administrator",
    },
    {
      quote: "My students were able to understand concepts more easily than before due to the",
      highlight: "one-to-one help",
      end: ". My students' math confidence has also increased!",
      attribution: "Teacher Working with PLUS Tutors",
      role: "Classroom Partner",
    },
  ]

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Voices from Our Students &amp; Partner Schools
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          What students, teachers, and districts say about PLUS.
        </h2>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map(({ quote, highlight, end, attribution, role }) => (
          <Card key={attribution} className="flex flex-col border-border/70 bg-card/90">
            <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-5">
              <div>
                <span className="mb-3 block text-3xl leading-none text-primary/40 select-none">&ldquo;</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {quote} <span className="font-medium text-foreground">{highlight}</span>{end}
                </p>
              </div>
              <div className="border-t border-border/60 pt-3">
                <p className="text-xs font-semibold text-foreground">{attribution}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/**
 * Toolkit section with "Giving Tutors Superpowers" as the prominent heading.
 */
export const PlusToolkitSection = () => {
  return (
    <section id="solutions" className="rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12">
      <header className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          PLUS Toolkit
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Giving Tutors Superpowers
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground">
          PLUS Toolkit connects with students' math practice software like MATHia and IXL and helps tutors identify which students to focus on with data-driven dashboards and AI-powered training.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "AI-Powered Tutor Training",
            desc: "Tutors get guided practice, feedback, and scenarios that help them build effective instructional habits faster.",
            accent: "bg-primary/8 border-primary/20",
            label: "AI Training",
            labelColor: "text-primary bg-primary/10",
          },
          {
            title: "Collaborative Goal Setting",
            desc: "Tutors, supervisors, and school partners can align on goals for attendance, engagement, and math growth.",
            accent: "bg-fuchsia-500/5 border-fuchsia-500/20",
            label: "Goal Setting",
            labelColor: "text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-500/10",
          },
          {
            title: "Dashboards for Tutor Supervisors",
            desc: "Supervisors see real-time progress and can coach tutors based on data, not guesswork.",
            accent: "bg-blue-500/5 border-blue-500/20",
            label: "Supervisor View",
            labelColor: "text-blue-700 dark:text-blue-300 bg-blue-500/10",
          },
        ].map(({ title, desc, accent, label, labelColor }) => (
          <Card key={title} className={`border ${accent}`}>
            <CardHeader className="pb-2">
              <span className={`mb-2 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${labelColor}`}>
                {label}
              </span>
              <CardTitle className="text-base font-semibold leading-snug">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/**
 * Metrics for toolkit usage: 10k+ problems, 20+ lessons.
 */
export const PlusToolkitMetricsSection = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {[
        {
          target: 10000,
          suffix: "+",
          desc: "Math problems completed each week with PLUS tutoring support.",
          color: "text-primary",
        },
        {
          target: 20,
          suffix: "+",
          desc: "Tutor training lessons designed to build instructional skill and math confidence.",
          color: "text-fuchsia-700 dark:text-fuchsia-300",
        },
      ].map(({ target, suffix, desc, color }) => (
        <Card key={target} className="border-border/70 bg-card/90">
          <CardHeader className="pb-2">
            <CardTitle className={`text-4xl font-bold ${color}`}>
              <CounterAnimation target={target} suffix={suffix} />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
        </Card>
      ))}
    </section>
  )
}

/**
 * Awards section as a polished list with year badges.
 */
export const PlusAwardsSection = () => {
  const awards = [
    {
      year: "2023",
      title: "SIIA CODiE Award Finalist",
      sub: "Best Learning Recovery Tool",
    },
    {
      year: "2023",
      title: "Best Demo Award",
      sub: "International Conference on Artificial Intelligence in Education",
    },
    {
      year: "2022",
      title: "IELA Gold Star Award",
      sub: "Performance Support Experience",
    },
    {
      year: "—",
      title: "EdTech Awards Finalist",
      sub: "The largest edtech awards program",
    },
  ]

  return (
    <section className="rounded-3xl border border-border/70 bg-background/80 px-6 py-10 sm:px-10 sm:py-12">
      <header className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Recognition
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          Recognized for Learning Impact and Innovation
        </h2>
      </header>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {awards.map(({ year, title, sub }) => (
          <li
            key={title}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/90 px-4 py-3"
          >
            <span className="mt-0.5 flex-shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              {year}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * Research section highlighting the learning science roots.
 */
export const PlusResearchSection = () => {
  return (
    <section className="rounded-3xl border border-border/70 bg-card/90 px-6 py-10 sm:px-10 sm:py-12">
      <div className="grid gap-8 md:grid-cols-[1fr,auto] md:items-start">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Taking Learning Science Research into Practice
          </p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Rooted in Science &amp; Research
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            PLUS is founded on decades of learning science research from leaders at Carnegie Mellon University and Stanford University. PLUS's findings are freely available to all.
          </p>
          <Button variant="outline" size="sm">
            Our Research →
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-background/80 px-8 py-6 text-center">
          <p className="text-5xl font-bold text-primary">
            <CounterAnimation target={30} suffix="+" />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">published papers</p>
        </div>
      </div>
    </section>
  )
}

/**
 * Newsletter + footer adapted from BunduiFooterSection with tutors.plus links.
 */
export const PlusFooterSection = () => {
  return (
    <footer className="mt-12 border-t border-border/60 bg-muted/40 px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-[2fr,1.8fr]">
          {/* Newsletter */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex size-7 items-center justify-center rounded-full bg-primary/10">
                  <span className="absolute inset-1.5 rounded-full bg-primary" />
                </span>
                <span className="text-sm font-semibold tracking-tight">PLUS</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Virtual tutoring · Carnegie Mellon University</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Join our mailing list</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Stay informed about new PLUS features, research, and impact stories.
              </p>
            </div>
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="Your email address" className="sm:max-w-64" />
              <Button type="submit" className="shrink-0">
                Sign Up
              </Button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">About</p>
              <ul className="mt-3 space-y-2">
                {["Our story", "Our team"].map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foreground">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Solutions</p>
              <ul className="mt-3 space-y-2">
                {["PLUS Tutoring", "PLUS Training", "PLUS Toolkit"].map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foreground">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Impact</p>
              <ul className="mt-3 space-y-2">
                <li><a href="#" className="transition-colors hover:text-foreground">Our research</a></li>
              </ul>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Get Involved</p>
              <ul className="mt-3 space-y-2">
                {["Become a tutor", "Contact us", "Careers"].map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foreground">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Carnegie Mellon University © 2026</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground">Media kit</a>
            <a href="#" className="transition-colors hover:text-foreground">Release notes</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
