export interface MultimodalAnalysisResult {
  detectedFeatures: string[];
  waterVelocityIndicator: 'Standing' | 'Slow Flow' | 'Rapid Torrential' | 'Violent Surge';
  structuralThreat: 'None Visible' | 'Potential Scour' | 'Direct Breach / Overtopping';
  confidence: number;
  priorityScore: number;
  incidentType: 'FLASH_FLOOD' | 'RIVER_OVERFLOW' | 'DEBRIS_FLOW' | 'ROAD_WASHOUT' | 'BRIDGE_SUBMERGED' | 'PEOPLE_STRANDED';
  suggestedSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  aiExplanation: string;
  recommendedVerification: string;
  disclaimer: string;
}

export function analyzeFloodPhoto(
  description: string,
  imagePreviewUrl?: string
): Promise<MultimodalAnalysisResult> {
  return new Promise((resolve) => {
    // Deterministic computer vision reasoning simulation with high domain fidelity
    setTimeout(() => {
      const lower = description.toLowerCase();

      let incidentType: MultimodalAnalysisResult['incidentType'] = 'FLASH_FLOOD';
      let suggestedSeverity: MultimodalAnalysisResult['suggestedSeverity'] = 'HIGH';
      let priorityScore = 85;
      let waterVelocity: MultimodalAnalysisResult['waterVelocityIndicator'] = 'Rapid Torrential';
      let structuralThreat: MultimodalAnalysisResult['structuralThreat'] = 'Potential Scour';

      const features: string[] = [];

      if (lower.includes('debris') || lower.includes('mud') || lower.includes('landslide') || lower.includes('boulder')) {
        incidentType = 'DEBRIS_FLOW';
        suggestedSeverity = 'CRITICAL';
        priorityScore = 96;
        waterVelocity = 'Violent Surge';
        structuralThreat = 'Direct Breach / Overtopping';
        features.push('High sediment & mud concentration in active runoff');
        features.push('Visible boulder deposition across carriageway');
        features.push('Steep valley scarp failure indicators');
      } else if (lower.includes('bridge') || lower.includes('culvert')) {
        incidentType = 'BRIDGE_SUBMERGED';
        suggestedSeverity = 'CRITICAL';
        priorityScore = 92;
        waterVelocity = 'Violent Surge';
        structuralThreat = 'Direct Breach / Overtopping';
        features.push('Water level at or exceeding deck soffit');
        features.push('Driftwood / hydrodynamic obstruction at pier');
        features.push('Approaches flooded; vehicular danger');
      } else if (lower.includes('road') || lower.includes('highway') || lower.includes('traffic')) {
        incidentType = 'ROAD_WASHOUT';
        suggestedSeverity = 'HIGH';
        priorityScore = 88;
        waterVelocity = 'Rapid Torrential';
        structuralThreat = 'Potential Scour';
        features.push('Road asphalt submerged by cross-flow torrent');
        features.push('Edge scour on outer mountain shoulder');
      } else if (lower.includes('stranded') || lower.includes('people') || lower.includes('rescue')) {
        incidentType = 'PEOPLE_STRANDED';
        suggestedSeverity = 'CRITICAL';
        priorityScore = 99;
        waterVelocity = 'Rapid Torrential';
        structuralThreat = 'Direct Breach / Overtopping';
        features.push('Civilian proximity to rising high-velocity water');
        features.push('Safe pedestrian exit route compromised');
      } else {
        features.push('Elevated brown turbid mountain floodwaters');
        features.push('Rapid current with surface standing waves');
        features.push('Inundation of natural river terrace and low-lying ground');
      }

      resolve({
        detectedFeatures: features,
        waterVelocityIndicator: waterVelocity,
        structuralThreat,
        confidence: 91,
        priorityScore,
        incidentType,
        suggestedSeverity,
        aiExplanation: `Multimodal inspection indicates ${suggestedSeverity} risk. Visual features show ${waterVelocity.toLowerCase()} water with ${structuralThreat.toLowerCase()} threatening infrastructure. Description correlates with active mountain flash runoff.`,
        recommendedVerification: 'Dispatch local SDRF scout or police patrol with laser rangefinder to confirm depth and structural integrity of nearest abutments.',
        disclaimer: 'AI analysis is an assistance tool. Verify critical information through authorized personnel and reliable sensors.'
      });
    }, 1200);
  });
}
