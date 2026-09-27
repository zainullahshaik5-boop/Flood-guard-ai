import { RegionTelemetry } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'SAFETY_ACTION' | 'RISK_EXPLANATION' | 'PREPAREDNESS' | 'INCIDENT_REPORT' | 'GENERAL';
}

export function getQuickAssistantResponse(
  question: string,
  region: RegionTelemetry
): { text: string; category: ChatMessage['category'] } {
  const q = question.toLowerCase();

  // 1. Actions during flash flood
  if (q.includes('what should i do') || q.includes('during a flash flood') || q.includes('cloudburst')) {
    return {
      category: 'SAFETY_ACTION',
      text: `EMERGENCY ACTION STEPS FOR HILLY REGIONS:
1. Seek Higher Ground Immediately: Move uphill away from rivers, gullies, culverts, and steep gorge beds. Flash floods can surge within 15–30 minutes without warning.
2. Never Drive or Walk Through Flowing Water: Just 15 cm (6 inches) of rapid water can sweep a person off balance; 30 cm can float a vehicle.
3. Stay Off Bridges: Fast turbulent mountain water with tree logs and boulders causes structural scouring.
4. Disconnect Electrical Mains: If safe to do so before evacuating low structures.
5. In ${region.name}: Relocate to designated high-elevation shelters such as municipal schools or Gurudwara relief hubs.

Emergency Dispatch: NDRF (1078) · State Emergency (1070) · Police (112).`
    };
  }

  // 2. Why area is showing current risk
  if (q.includes('why is my area') || q.includes('high risk') || q.includes('why this risk') || q.includes('current risk')) {
    return {
      category: 'RISK_EXPLANATION',
      text: `CURRENT TELEMETRY BREAKDOWN FOR ${region.name.toUpperCase()}:
• Risk Assessment: ${region.risk.level} (${region.risk.confidencePercent}% sensor consensus)
• Rainfall Rate: ${region.rainfall.currentRate} mm/h (${region.rainfall.intensity}) with ${region.rainfall.accumulated24h}mm accumulated in 24 hours.
• River Stage: ${region.river.name} is at ${region.river.currentLevel}m (Warning Threshold: ${region.river.warningThreshold}m, Danger Mark: ${region.river.dangerThreshold}m). Rate of rise is +${region.river.rateOfRise} cm/hr.
• Topsoil Saturation: ${region.soil.moisturePercent}% volumetric saturation, leaving only ${region.soil.absorptionCapacityMm}mm absorption capacity before 100% surface runoff.
• Slope Factor: ${region.terrain.averageSlopeDeg}° incline accelerates flash flood peak travel time to 35-50 minutes.

${region.risk.aiExplanation}`
    };
  }

  // 3. What to avoid
  if (q.includes('avoid') || q.includes('don\'t') || q.includes('danger')) {
    return {
      category: 'SAFETY_ACTION',
      text: `CRITICAL PRACTICES TO AVOID IN HILLY FLASH FLOODS:
❌ DO NOT stay in riverbed tents, tourist camping zones, or ghat-side cottages.
❌ DO NOT cross low causeways or submerged pedestrian suspension bridges.
❌ DO NOT seek shelter under unstable roadside cut-slopes or overhangs vulnerable to debris slips.
❌ DO NOT use underground basements or lower ground floors when water begins pooling.
❌ DO NOT rely on social media rumors; verify emergency alerts through official SDMA / District Collector broadcasts.`
    };
  }

  // 4. Emergency Go-Bag checklist
  if (q.includes('carry') || q.includes('go-bag') || q.includes('kit') || q.includes('pack')) {
    return {
      category: 'PREPAREDNESS',
      text: `ESSENTIAL 72-HOUR DISASTER GO-BAG (HILLY REGION):
🎒 Core Essentials:
• Drinking water (at least 3 liters per person in sealed bottles) + water purification tablets.
• High-calorie non-perishable foods (roasted gram, jaggery, dry fruits, energy bars).
• Waterproof torch / headlamp with spare batteries.
• Battery-powered or hand-crank AM/FM radio for emergency civil broadcasts.
• Waterproof pouch containing Aadhaar card, property papers, insurance, and medical prescriptions.
• Essential personal medications (minimum 7-day supply).
• Multi-tool knife, whistle for signaling rescue teams, and emergency foil space blanket.
• First-aid kit (gauze, antiseptic, burn cream, waterproof bandages).`
    };
  }

  // 5. Reporting flooding
  if (q.includes('report') || q.includes('upload') || q.includes('incident')) {
    return {
      category: 'INCIDENT_REPORT',
      text: `HOW TO REPORT FLASH FLOODING:
1. Open the "AI Flood Reporter" tab in the navigation bar.
2. Attach a photo showing the water level, road blockage, or river surge.
3. Select your exact hilly location or sector.
4. The AI multimodal engine will verify visible water velocity, debris obstruction, and assign an emergency priority score (0–100).
5. The incident is immediately dispatched to the District Operations Center and NDRF field commanders.

Offline Note: If mobile connectivity drops, the report is saved securely in your browser cache and uploaded automatically once signal is restored.`
    };
  }

  // 6. Risk level meaning
  if (q.includes('risk level mean') || q.includes('difference') || q.includes('what does')) {
    return {
      category: 'RISK_EXPLANATION',
      text: `FLOOD GUARD AI RISK LEVELS DEFINED:
🟢 LOW: Hydrological metrics nominal. River stages well within banks; catchment soils possess active infiltration buffering. Normal activity permitted.
🟡 MODERATE: Elevated precipitation or rising river inflows. Low causeways and riverbeds may experience minor inundation. Authorities placed on alert.
🟠 HIGH: Rainfall and soil saturation reach critical runoff thresholds. River approaching or breaching warning stage. Precautionary evacuation of riverbank dwellings advised.
🔴 CRITICAL: Imminent flash flood breach or debris surge. Danger threshold exceeded. Mandatory immediate relocation to designated higher ground shelters.`
    };
  }

  // Default helpful response
  return {
    category: 'GENERAL',
    text: `FLOOD GUARD AI ASSISTANT:
I am configured with official National Disaster Management Authority (NDMA) guidelines and real-time telemetry for ${region.name}.

You can ask me:
• "What should I do during a flash flood?"
• "Why is my area showing ${region.risk.level} risk?"
• "What items belong in a 72-hour emergency go-bag?"
• "What are the designated high-ground shelters nearby?"
• "How do I submit an emergency incident report?"

Always follow instructions from local emergency authorities. AI guidance does not replace official emergency directives.`
  };
}
