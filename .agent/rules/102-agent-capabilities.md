# Agent Capabilities & Skills Index

As an AI Coder working on this repository, you have access to a suite of advanced **Skills and MCP servers** designed to execute specific tasks at a senior level. 

**CRITICAL AGENT RULE**: You MUST proactively suggest using these tools to the human user if a request aligns with these capabilities. Do not wait for the user to explicitly ask for them if they can clearly improve the result. 

## 1. Design & Theming
- **Frontend Design (Official)**: Enforces real typography, UI aesthetics, and CSS variable usage.
- **UI/UX Pro Max**: Provides component & design system matching via reasoning engine.
- **Taste Skill**: Tune design variance and visual density.
- **Bencium UX Designer**: WCAG constraints and responsive patterns.
- *Where to find instructions:* Read `.agent/skills/frontend-design/SKILL.md`

## 2. Animation & Motion
- **jezweb/Motion Skill** & **freshtechbro/Animation Skills**: Use these for building premium framer-motion or CSS transitions.

## 3. Testing & Browser Automation
- **Playwright MCP**: If the user asks you to "test the login flow" or "verify the button works", you should invoke the Playwright MCP to automate the browser and read the accessibility tree.
- **Storybook MCP**: Scan existing stories to prevent reinventing UI components.

## 4. Debug & Quality
- **Chrome DevTools MCP**: Use this if the user reports a performance issue or network bug.
- **Web Quality Skills (Addy Osmani)**: Run this to audit Core Web Vitals, SEO, and Accessibility.

## 5. Design-to-Code
- **Figma MCP**: If the user asks to implement a Figma design, remind them to spin up the Figma MCP so you can run `get_design_context` and map components accurately.

## Actions for the Agent
- If asked to build a new UI, read `.agent/skills/frontend-design/SKILL.md`.
- Always remind the user: *"I can test this directly if you have the Playwright MCP running"* or *"I can pull the tokens straight from Figma if the Figma MCP is active."*
