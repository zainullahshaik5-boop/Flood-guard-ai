# FLOOD GUARD AI
### AI-Powered Flash Flood Prediction, Multi-Source Telemetry Monitoring & Emergency Response System for Hilly Regions
**Smart India Hackathon 2026 — Problem Statement SIH26192**

---

## 🌊 Overview & Problem Statement Context
In mountainous terrain such as the Himalayas (Garhwal/Kumaon, Himachal Pradesh, Sikkim) and Western Ghats (Wayanad), conventional flood prediction models fail. Orographic cloudbursts, steep slope gradients (30°–50°), and saturated mountain regolith compress lag times down to **under 45 minutes**, washing away traditional gauge sensors and bridges before plain-river warnings can trigger.

**FLOOD GUARD AI** implements an operational disaster doctrine:
$$\textbf{PREDICT} \longrightarrow \textbf{WARN} \longrightarrow \textbf{RESPOND} \longrightarrow \textbf{PROTECT}$$

It fuses:
1. **Precipitation:** High-altitude IMD Automatic Weather Stations (AWS) + Doppler radar reflectivity.
2. **River Hydrometry:** Central Water Commission (CWC) ultrasonic acoustic radar measuring stage and rise velocity (+cm/h).
3. **Soil Regolith Saturation:** ISRO Bhuvan satellite microwave radiometry + in-situ TDR soil moisture probes.
4. **Terrain Kinematics:** Cartosat Digital Elevation Model (DEM) slope physics calculating kinematic wave velocity and gorge choke points.

---

## 🚀 Key Features

* **Current Flood Risk Engine:** Physics-informed deterministic classification (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`) with multi-sensor consensus confidence (never implying 100% real-world certainty).
* **AI "What Changed?" Engine:** Immediate delta comparison between sensor cycles to explain physical causes of risk shifts.
* **AI Flash Flood Nowcast (0–6 Hours):** Forward-looking trajectory chart with transition event markers and interactive timeline scrubber.
* **Interactive Topographic GIS Hazard Map:** Vector contour terrain map with river channels, inundation zones, bridges, emergency shelters, and live incident markers. Includes deployment-safe Google Maps toggle.
* **"Flood Scenario Simulator" (Digital Twin Sandbox):** Interactive simulation tool allowing evaluators to dynamically vary rainfall intensity (0–120 mm/h), duration, river stage, soil saturation, and slope to observe hydrograph peak crest timing in real time.
* **AI Multimodal Flood Reporter:** Citizen & responder photo submission with automated vision analysis of water velocity, debris obstruction, and structural pier scour risk.
* **AI Emergency Alert Generator:** Disaster Operations broadcast tool supporting SMS Cell Broadcast, Common Alerting Protocol (CAP XML), riverbank sirens, and WhatsApp volunteer grids with human-in-the-loop authorization.
* **AI Alert Prioritization Queue:** Tactical queue sorting incoming incidents by risk severity, bridge choke hazard, and reported civilian proximity.
* **FloodGuard Assistant:** Safety-focused conversational agent answering disaster protocols based on official NDMA guidelines.
* **Executive Disaster Situation Report (SitRep):** 1-Click generation of formal SitRep with Copy, Download (.md), and Print capabilities.
* **Prediction Reliability & Sensor Health Center:** Telemetry health audit (`🟢 Reliable`, `🟡 Limited`, `🔴 Insufficient`) with automatic conservative fallback if satellite links lag.
* **Zero-Latency Offline Emergency Mode:** Automatic detection and manual simulation; caches incident reports in browser storage and auto-synchronizes when connectivity restores.
* **Role-Based Command Access (RBAC):** Authenticated profiles for Disaster Management Authority, NDRF Battalion Commander, District Magistrate, and Community Volunteers, plus instant 1-Click Evaluator Demo Mode.

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 19, TypeScript, Vite
* **Styling:** Tailwind CSS v4, dark command-center aesthetic
* **Icons & Animation:** Lucide React, Motion
* **GIS Engine:** Topographic Vector SVG Canvas + Google Maps Embed Fallback
* **Visualization:** High-performance custom SVG charts with tabular numerals
* **Architecture:** 100% client-resilient with optional server-side proxy routes

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional | For live server-side multimodal image reasoning. High-fidelity deterministic fallback is active when omitted. |
| `APP_URL` | Optional | Deployment root URL (defaults to `http://localhost:3000`). |
| `VITE_GOOGLE_MAPS_API_KEY` | Optional | For live Google Maps satellite tiles. Platform uses built-in topographic vector GIS map by default. |
| `VITE_FIREBASE_API_KEY` | Optional | For persistent remote team sync. Local storage is used by default. |

> **Note:** The application is completely functional in **DEMO MODE** without any external API keys or cloud credentials.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server (Port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📦 Deployment Instructions

The application compiles into static assets suitable for instant deployment to Vercel, Netlify, Cloud Run, or Firebase Hosting:

```bash
npm run build
```

The output in `dist/` contains all minified bundles and relative asset paths.

---

## 🏆 Smart India Hackathon 2026 Evaluation Journey

To evaluate the platform during a hackathon demonstration:
1. Open the platform → Notice the SIH26192 mission banner.
2. Click **"Enter Instant Demo Mode (Evaluator)"** to bypass login.
3. Observe the **Current Flood Risk** for Chamoli / Joshimath and click **"Why this risk?"** to inspect the SCS-CN physical factor breakdown.
4. Click **"What Changed?"** to see the cycle-over-cycle delta analysis.
5. Review the **Multi-Source Telemetry Grid** (Rainfall, River Gauge, Soil Moisture, Terrain).
6. Explore the **Interactive GIS Hazard Map** and toggle layers (Inundation Polygons, Shelters, Bridges).
7. Switch to the **"Scenario Simulator"** (Digital Twin) tab → Slide rainfall up to 85 mm/h to trigger real-time hydrograph cresting.
8. Go to **"AI Flood Reporter"** → Test a photo scenario to inspect water velocity and structural threat analysis.
9. Open **FloodGuard Assistant** and ask: *"What should I do during a flash flood?"*.
10. Click **"Generate Situation Report"** from the top bar to preview and export an executive SitRep for the District Collector.
11. Click the **Wifi toggle icon** in the top bar to simulate mountain telecom failure and verify **Offline Emergency Mode**.
