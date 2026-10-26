# Product Requirements Document (PRD): LightWaste

## 1. Problem Statement & Objectives
- **Problem:** Classroom lights remain on when rooms are empty, leading to energy waste. Users lack guidance on proper usage, and supervisors cannot centrally manage or monitor multiple lighting zones per room.
- **Objective:** Develop a centralized IoT system to monitor and control multiple lighting zones across 4 rooms, demonstrating robotics and automation concepts[cite: 9].

## 2. User Personas & Flows
- **Persona 1: User (Lecturer/Student)**
  - Enters a specific classroom and uses a dedicated device (phone/tablet UI) to control the lights in that specific room.
  - Flow: Select Room -> View Rules/Instructions -> Toggle specific lights ON/OFF.
- **Persona 2: Admin (Supervisor)**
  - Manages all rooms from a central dashboard.
  - Flow: View analytics for all rooms -> Select Room -> Master override to turn OFF specific lights or ALL lights at once.

## 3. Requirements (Berdasarkan Rubrik ITT569)
- **Custom UI:** Must develop a custom Web UI dashboard integrated with a cloud database (Firebase) for real-time interaction and logging, separated into `/user` and `/admin` routes[cite: 7].
- **Hardware Stability:** The 4x Maker UNO and NodeMCU prototype must run reliably during the demo, handling multiple LED outputs per room without crashing[cite: 7].
- **Documentation:** The project requires a Lean Canvas with all 9 blocks filled, showing real problem-solution fit[cite: 9].

## 4. Constraints
- Hardware: 4 Maker UNOs (acting as 4 rooms), 1 NodeMCU V2 (Gateway). Each Maker UNO must control multiple LEDs to simulate multiple lights per room. No extra modules can be purchased.