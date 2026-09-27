import { RegionTelemetry, IncidentReport, AlertBulletin } from '../types';

export interface SituationReportData {
  reportId: string;
  generatedAt: string;
  regionName: string;
  state: string;
  basin: string;
  preparedFor: string;
  currentRisk: string;
  confidence: number;
  markdownContent: string;
}

export function generateSituationReport(
  region: RegionTelemetry,
  incidents: IncidentReport[],
  alerts: AlertBulletin[],
  officerName: string
): SituationReportData {
  const timestamp = new Date().toISOString();
  const dateFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });
  const reportId = `SITREP-${region.id.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');
  const criticalCount = activeIncidents.filter(i => i.severity === 'CRITICAL').length;
  const highCount = activeIncidents.filter(i => i.severity === 'HIGH').length;

  const md = `# EMERGENCY DISASTER OPERATIONS - EXECUTIVE SITUATION REPORT (SITREP)
**REPORT REFERENCE:** ${reportId}
**DATE & TIME:** ${dateFormatted} IST
**CATCHMENT SECTOR:** ${region.name}, ${region.state} (${region.basin})
**PREPARED BY:** FLOOD GUARD AI Automated Operations Engine & ${officerName}
**CLASSIFICATION:** OFFICIAL DISASTER RESPONSE - IMMEDIATE ACTION

---

## 1. CURRENT SITUATION SUMMARY
At ${dateFormatted}, the hydrological telemetry across the ${region.basin} indicates an overall **${region.risk.level} FLASH FLOOD RISK** with a multi-sensor consensus confidence of **${region.risk.confidencePercent}%**.
A population of approximately **${region.populationAtRisk.toLocaleString()} residents** across the riverine corridor is under active monitoring.
${region.risk.primaryCause}

---

## 2. MULTI-SOURCE TELEMETRY STATUS
* **Precipitation:** Current rate is **${region.rainfall.currentRate} mm/h** (${region.rainfall.intensity}). 24-hour accumulated rainfall has reached **${region.rainfall.accumulated24h} mm**. Radar echo intensity: **${region.rainfall.radarEchoIntensity}**.
* **River Hydrometry:** ${region.river.name} current stage is **${region.river.currentLevel} m**.
  - Warning Threshold: ${region.river.warningThreshold} m (${region.river.currentLevel >= region.river.warningThreshold ? `EXCEEDED by +${(region.river.currentLevel - region.river.warningThreshold).toFixed(2)}m` : `${(region.river.warningThreshold - region.river.currentLevel).toFixed(2)}m margin remaining`})
  - Danger Threshold: ${region.river.dangerThreshold} m
  - Discharge Rate: **${region.river.dischargeRate} cusecs** | Hydrograph Trend: **${region.river.trend} (+${region.river.rateOfRise} cm/h)**
* **Regolith & Soil Saturation:** Topsoil moisture is **${region.soil.moisturePercent}%** (Index: ${region.soil.saturationIndex}). Absorption buffer remaining is only **${region.soil.absorptionCapacityMm} mm**, accelerating overland kinetic runoff.
* **Topographic Vulnerability:** Catchment elevation: **${region.terrain.catchmentElevationM}m ASL**; Average slope gradient: **${region.terrain.averageSlopeDeg}°**. Geomorphic choke points present in narrow gorge sections.

---

## 3. MAIN RISK FACTORS
${region.risk.factors.map(f => `- **${f.name}** [${f.status}]: ${f.contributionText}`).join('\n')}

---

## 4. AFFECTED AREAS & INFRASTRUCTURE UNDER THREAT
1. Low-lying riverbanks and ghat approaches in ${region.name}.
2. Submerged causeways, culverts, and pedestrian suspension footbridges.
3. Highway stretches vulnerable to sudden mudflow and rock debris.

---

## 5. RECENT FIELD INCIDENTS (${activeIncidents.length} Active / ${criticalCount} Critical / ${highCount} High)
${activeIncidents.length === 0 ? '_No active field incidents reported in this cycle._' : activeIncidents.map(inc => `* **[${inc.severity}] ${inc.id}**: ${inc.title} (${inc.location})
  - Status: \`${inc.status}\` | Priority Score: ${inc.priorityScore}/100
  - Description: ${inc.description}
  ${inc.assignedTeam ? `- Assigned: ${inc.assignedTeam}` : '- Team: Unassigned'}
`).join('\n')}

---

## 6. RISK NOWCAST & 6-HOUR TRAJECTORY
${region.nowcast.slice(0, 5).map(n => `- **${n.hourLabel}**: Predicted Risk: **${n.predictedRisk}** (Score: ${n.riskScore}/100) | Rain: ${n.rainfallMmH} mm/h | River: ${n.riverLevelM}m ${n.transitionEvent ? `[ALERT: ${n.transitionEvent}]` : ''}`).join('\n')}

---

## 7. DATA RELIABILITY & SENSOR INTEGRITY
${region.reliability.map(r => `* ${r.sensorCategory} (${r.stationName}): **${r.status}** (${r.dataQualityPct}% Quality, Last Ping: ${r.lastPingMinutesAgo}m ago) - ${r.impactOnConfidence}`).join('\n')}

---

## 8. RESPONSE PRIORITIES & COMMAND DIRECTIVES
1. **Civil Evacuation:** ${region.risk.evacuationRecommended ? 'MANDATORY EVACUATION active for riverbank settlements and low-lying hamlets.' : 'Heighten advisory alert; stand by for precautionary evacuation order.'}
2. **Traffic Control:** Close bridges with less than 1.5m clearance to flood crest; deploy SDRF/Police at dangerous causeways.
3. **Emergency Shelters:** Ensure food, potable water, and medical kits are verified at primary relief hubs.
4. **Inter-Agency Coordination:** Maintain hourly synchronization between CWC, IMD, District Magistrate, and NDRF Battalion HQ.

*Report generated automatically by FLOOD GUARD AI Command Architecture.*
`;

  return {
    reportId,
    generatedAt: timestamp,
    regionName: region.name,
    state: region.state,
    basin: region.basin,
    preparedFor: officerName,
    currentRisk: region.risk.level,
    confidence: region.risk.confidencePercent,
    markdownContent: md
  };
}
