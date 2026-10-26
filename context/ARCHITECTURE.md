# System Architecture

## Diagram Aliran
Maker UNO (x4) <--> I2C / Serial <--> NodeMCU V2 (ESP8266) <--> Wi-Fi <--> Firebase RTDB <--> Next.js Web Dashboard (Cloudflare)

## Komponen & Integrasi
1. **Web Dashboard (Next.js):** 
   - Uses Bento Grid layout to display 4 rooms.
   - Triggers ON/OFF commands to Firebase.
2. **Database (Firebase RTDB):** 
   - Stores real-time LED states and LDR readings.
3. **Gateway (NodeMCU V2):** 
   - Connects to Wi-Fi. Listens to Firebase. Routes commands to the specific Maker UNO.
4. **End Nodes (4x Maker UNO):** 
   - Reads local LDR sensor, switches prototype LED based on Gateway commands.
   - Provides circuit design diagrams and control system process diagrams for documentation[cite: 5].