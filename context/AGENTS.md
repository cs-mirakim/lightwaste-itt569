# Project: LightWaste (IoT Lighting Management System)

## Tech Stack
- Frontend: Next.js 15 (App Router), React, Tailwind CSS, shadcn/ui
- Backend & DB: Firebase Realtime Database
- Hosting: Cloudflare Pages
- Hardware: 4x Maker UNO, 1x NodeMCU V2 (ESP8266), LDR, LEDs
- Package Manager: pnpm only

## Included Skills & Contexts
- @../.agents/shadcn-ui/
- @../.agents/mattpocock/
- @../.agents/anti-slop/
- @../.agents/taste-skill/
- @../.agents/cloudflare-sec/
- @../.agents/hamizi-sec/SECURITY.md

## Core Rules
1. NEVER use `npm` or `yarn`. Strictly `pnpm`.
2. Do not invent hardware components not listed in the PRD.
3. Always read `context/PRD.md` and `context/ARCHITECTURE.md` before suggesting major changes.
4. Update `context/TASKS.md` automatically when completing a ticket.
5. Apply the rigorous security checks from Hamizi's prompt to all React/Next.js code before finalizing.
6. Code in English, but PRD/Architecture comments can be in Malay.