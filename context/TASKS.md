# Development Plan & Delegation

## Amir Hakim (Ketua / DevOps & Pengurusan)
- [x] TASK-1: Initialize Next.js 15 project with `pnpm` and setup `/user` and `/admin` folder structures.
- [ ] TASK-2: Setup Cloudflare Pages auto-deployment.
- [ ] TASK-3: Configure Firebase RTDB security rules and establish the multi-light JSON schema.

## Eqhlas (Software Engineering)
- [ ] TASK-4: Build `/user` UI (Room selection, rules/instructions display, and individual light switches) using shadcn/ui.
- [ ] TASK-5: Build `/admin` UI (Analytics dashboard and master override switches).
- [ ] TASK-6: Integrate Firebase SDK to both UIs and apply `hamizi-sec` security audit.

## Paan (Hardware Engineering)
- [ ] TASK-7: Assemble breadboard circuits connecting 4 Maker UNOs to the NodeMCU, ensuring each Maker UNO has at least 2 LEDs (multiple lights).
- [ ] TASK-8: Write Arduino C++ firmware for Maker UNOs to receive multi-zone commands and control respective LEDs.
- [ ] TASK-9: Write ESP8266 firmware to sync multi-zone data between Maker UNOs and Firebase.

## Amir Azib (Dokumentasi & QA)
- [ ] TASK-10: Draft Chapter 1, Chapter 2 (System Justification), and Chapter 3 (System Design) including flow charts[cite: 5].
- [ ] TASK-11: Prepare the Lean Canvas and document the "Rules of Usage" that will be displayed in the User UI[cite: 5, 9].
- [ ] TASK-12: Assist Paan with hardware stability testing[cite: 7] and produce the <3 min demo video showing both User and Admin POVs[cite: 8].