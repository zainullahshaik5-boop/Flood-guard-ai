import { SimulationParameters, SimulationResult, RiskLevel } from '../types';

export function runFloodSimulation(params: SimulationParameters): SimulationResult {
  const {
    rainfallRateMmH,
    rainfallDurationHours,
    initialRiverStageM,
    soilMoisturePct,
    slopeAngleDeg,
    deforestationFactor
  } = params;

  // Land cover runoff multiplier
  const landCoverMultiplier = 
    deforestationFactor === 'High Deforestation' ? 1.35 :
    deforestationFactor === 'Moderate Grazing' ? 1.15 : 0.85;

  // Soil saturation factor: if soil moisture > 80%, runoff increases exponentially
  const soilRunoffCoeff = Math.min(0.96, (soilMoisturePct / 100) * 0.75 * landCoverMultiplier);

  // Effective precipitation contributing to instant surface runoff (mm/h)
  const effectiveRainfall = rainfallRateMmH * soilRunoffCoeff;

  // Catchment lag time (Snyder's or Kirpich formula adapted for steep hilly catchment)
  // Steeper slope + higher deforestation = faster flash flood arrival
  const slopeSpeedFactor = Math.sqrt(Math.max(10, slopeAngleDeg) / 25);
  const baseLagMinutes = 120;
  const lagTimeToPeakMinutes = Math.max(
    18,
    Math.round((baseLagMinutes / (slopeSpeedFactor * (1 + effectiveRainfall / 60))) * (deforestationFactor === 'High Deforestation' ? 0.75 : 1.0))
  );

  // Peak discharge (Rational / SCS synthetic unit hydrograph)
  // Catchment area assumed ~180 sq km typical mountain tributary
  const catchmentAreaSqKm = 180;
  const peakDischargeCusecs = Math.round(
    (0.278 * effectiveRainfall * catchmentAreaSqKm * 35.3147) * (1 + (rainfallDurationHours > 3 ? 0.25 : 0))
  );

  // River stage surge (stage-discharge rating curve approx: H = H0 + (Q / 850)^0.6)
  const surgeHeightM = +(Math.pow(Math.max(0, peakDischargeCusecs) / 950, 0.58)).toFixed(2);
  const projectedRiverStageM = +(initialRiverStageM + surgeHeightM).toFixed(2);

  // Soil saturation reached after storm duration
  const addedSaturation = Math.min(30, (rainfallRateMmH * rainfallDurationHours) / 10);
  const soilSaturationReachedPct = Math.min(100, Math.round(soilMoisturePct + addedSaturation));

  // Determine simulated risk level
  let simulatedRisk: RiskLevel = 'LOW';
  if (projectedRiverStageM >= 6.0 || (rainfallRateMmH >= 65 && soilMoisturePct >= 80)) {
    simulatedRisk = 'CRITICAL';
  } else if (projectedRiverStageM >= 5.0 || rainfallRateMmH >= 38 || soilMoisturePct >= 85) {
    simulatedRisk = 'HIGH';
  } else if (projectedRiverStageM >= 3.8 || rainfallRateMmH >= 20 || soilMoisturePct >= 65) {
    simulatedRisk = 'MODERATE';
  } else {
    simulatedRisk = 'LOW';
  }

  // Flood inundation estimate
  const floodInundationAreaSqKm = +(Math.max(0.1, (projectedRiverStageM - 3.5) * 1.8 * (deforestationFactor === 'High Deforestation' ? 1.4 : 1.0))).toFixed(2);

  // Generate hydrograph points over 360 minutes (6 hours)
  const hydrographCurve: { minute: number; discharge: number; waterLevel: number }[] = [];
  const totalDurationMinutes = 360;
  const timeStep = 20;

  for (let t = 0; t <= totalDurationMinutes; t += timeStep) {
    let qFactor = 0;
    if (t < lagTimeToPeakMinutes) {
      // Rising limb (power curve)
      qFactor = Math.pow(t / lagTimeToPeakMinutes, 2.2);
    } else {
      // Recession limb (exponential decay)
      const recessionConstant = 0.012;
      qFactor = Math.exp(-recessionConstant * (t - lagTimeToPeakMinutes));
    }
    
    const currentQ = Math.round(Math.max(250, peakDischargeCusecs * qFactor + 250));
    const currentH = +(initialRiverStageM + surgeHeightM * qFactor).toFixed(2);

    hydrographCurve.push({
      minute: t,
      discharge: currentQ,
      waterLevel: currentH
    });
  }

  const summaryNote = simulatedRisk === 'CRITICAL'
    ? `SIMULATED FLASH SURGE: Extreme simulated crest of ${projectedRiverStageM}m arrives within ${lagTimeToPeakMinutes} minutes. Severe mountain runoff will overtop low-lying river bridges.`
    : simulatedRisk === 'HIGH'
    ? `SIMULATED HIGH HAZARD: Projected river surge reaches ${projectedRiverStageM}m within ${lagTimeToPeakMinutes} mins. Catchment infiltration drops to zero as soil reaches ${soilSaturationReachedPct}%.`
    : simulatedRisk === 'MODERATE'
    ? `SIMULATED ELEVATED SURGE: River level rises to ${projectedRiverStageM}m at minute ${lagTimeToPeakMinutes}. Runoff remains mostly within embankment profiles.`
    : `SIMULATED STABLE FLOW: Peak flood stage ${projectedRiverStageM}m remains safely below warning levels with lag time of ${lagTimeToPeakMinutes} minutes.`;

  return {
    simulatedRisk,
    peakDischargeCusecs,
    lagTimeToPeakMinutes,
    floodInundationAreaSqKm: Math.max(0, floodInundationAreaSqKm),
    projectedRiverStageM,
    soilSaturationReachedPct,
    hydrographCurve,
    summaryNote
  };
}
