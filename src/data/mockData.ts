import {
  RegionTelemetry,
  IncidentReport,
  AlertBulletin,
  EmergencyShelter,
  UserProfile
} from '../types';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-auth-1',
    name: 'Dr. Rajeshwar Sharma',
    role: 'AUTHORITY',
    roleTitle: 'Chief Emergency Operations Officer',
    organization: 'Uttarakhand State Disaster Management Authority (USDMA)',
    region: 'Chamoli / Garhwal Division',
    badgeNumber: 'USDMA-HQ-0419'
  },
  {
    id: 'user-resp-2',
    name: 'Cmdt. Vikram Negi',
    role: 'RESPONDER',
    roleTitle: 'Battalion Search & Rescue Commander',
    organization: '8th Battalion NDRF (Himalayan Quick Response)',
    region: 'Alaknanda Catchment Zone',
    badgeNumber: 'NDRF-BN08-332'
  },
  {
    id: 'user-coll-3',
    name: 'Smt. Priya Rawat, IAS',
    role: 'COLLECTOR',
    roleTitle: 'District Magistrate & DDMA Chairman',
    organization: 'District Administration Chamoli',
    region: 'Joshimath-Badrinath Axis',
    badgeNumber: 'IAS-UK-2016-89'
  },
  {
    id: 'user-cit-4',
    name: 'Anand Bhatt',
    role: 'CITIZEN',
    roleTitle: 'Village Disaster Volunteer & Resident',
    organization: 'Joshimath Community Flood Warden',
    region: 'Lower Vishnuprayag Sector'
  },
  {
    id: 'user-eval-5',
    name: 'SIH Evaluator / Guest',
    role: 'EVALUATOR',
    roleTitle: 'Smart India Hackathon 2026 Jury Member',
    organization: 'Ministry of Jal Shakti / AICTE Evaluation Panel',
    region: 'All Hilly Regions (Universal Access)'
  }
];

export const REGIONS_DATA: RegionTelemetry[] = [
  {
    id: 'chamoli-joshimath',
    name: 'Chamoli / Joshimath',
    state: 'Uttarakhand',
    basin: 'Alaknanda & Dhauliganga Confluence',
    coordinates: { lat: 30.5562, lng: 79.5678 },
    elevationRange: '1,420m - 3,850m ASL',
    populationAtRisk: 42500,
    rainfall: {
      currentRate: 46.5,
      intensity: 'Heavy',
      accumulated24h: 138.4,
      trend6h: [12.0, 18.5, 29.0, 38.0, 48.2, 46.5],
      stationId: 'AWS-UK-CHM04',
      stationName: 'Joshimath High-Altitude AWS',
      radarEchoIntensity: 'Severe',
      lastReadingTime: '4 mins ago'
    },
    river: {
      name: 'Alaknanda River (Vishnuprayag Gauge)',
      currentLevel: 5.82,
      warningThreshold: 5.50,
      dangerThreshold: 6.20,
      historicalHigh: 6.85,
      dischargeRate: 2450,
      rateOfRise: 28,
      trend: 'Rapidly Rising',
      gaugeStation: 'CWC Automatic Radar Gauge #408',
      lastReadingTime: '2 mins ago'
    },
    soil: {
      moisturePercent: 88.4,
      saturationIndex: 0.88,
      saturationTrend: 'Saturated (Runoff Imminent)',
      absorptionCapacityMm: 8.5,
      landslideVulnerabilityScore: 84,
      sensorDepth: '0 - 50 cm Integrated Probe'
    },
    terrain: {
      catchmentElevationM: 2680,
      averageSlopeDeg: 38.5,
      valleyNarrownessIndex: 'Severe Gorge / Choke Point',
      runoffCoefficient: 0.82,
      vegetationCoverPercent: 44,
      debrisFlowRisk: 'Severe'
    },
    risk: {
      level: 'HIGH',
      confidencePercent: 91,
      trend: 'Rising',
      timestamp: '2026-09-27T06:30:00Z',
      primaryCause: 'Intense orographic rainfall pulse combined with steep 38° slope runoff and near-saturated topsoil.',
      factors: [
        {
          name: 'Rainfall Intensity (46.5 mm/h)',
          weight: 90,
          status: 'HIGH',
          contributionText: 'Convective cell stationed over upper catchment; 46.5 mm/h exceeds 30 mm/h hilly threshold.'
        },
        {
          name: 'Soil Saturation (88.4%)',
          weight: 88,
          status: 'HIGH',
          contributionText: 'Topsoil near 100% field capacity; over 82% of current rain converts directly to surface runoff.'
        },
        {
          name: 'River Water Level (5.82m)',
          weight: 82,
          status: 'HIGH',
          contributionText: 'Exceeded Warning Mark (5.50m) by 0.32m; 0.38m remaining before Danger Mark (6.20m).'
        },
        {
          name: 'Steep Gorge Funneling',
          weight: 78,
          status: 'ELEVATED',
          contributionText: 'V-shaped narrow gorge reduces natural hydrograph lag time down to 35-50 minutes.'
        }
      ],
      aiExplanation: 'Multi-source sensor consensus confirms a High Flash Flood Risk. A localized cloudburst band upstream has deposited 138mm over 24h, saturating the catchment topsoil (88.4%). Because the Alaknanda river at Vishnuprayag gauge is already 0.32m above warning level and rising at 28cm/hour, additional runoff from steep 38.5° terrain will arrive in the next 45 minutes.',
      physicalRationale: 'Hydrological runoff model (Soil Conservation Service Curve Number CN=89) indicates instantaneous runoff peak due to zero infiltration remaining in thin mountain regolith.',
      evacuationRecommended: true,
      recommendedAction: 'Sound sirens for riverbank settlements in Vishnuprayag and lower Joshimath; suspend ghat access immediately.'
    },
    reliability: [
      {
        sensorCategory: 'Automatic Weather Station (AWS)',
        stationName: 'IMD Joshimath Catchment Station',
        status: 'RELIABLE',
        lastPingMinutesAgo: 4,
        dataQualityPct: 98,
        impactOnConfidence: 'Direct physical telemetry active. No gaps detected.'
      },
      {
        sensorCategory: 'CWC River Radar Gauge',
        stationName: 'Vishnuprayag Stage Radar',
        status: 'RELIABLE',
        lastPingMinutesAgo: 2,
        dataQualityPct: 96,
        impactOnConfidence: 'Ultrasonic acoustic bounce sensor operating nominally.'
      },
      {
        sensorCategory: 'Soil Moisture Matrix (ISRO Bhuvan)',
        stationName: 'Garhwal Hill Regolith Probe 02',
        status: 'RELIABLE',
        lastPingMinutesAgo: 12,
        dataQualityPct: 92,
        impactOnConfidence: 'Multi-depth TDR sensors transmitting via INSAT telemetry.'
      },
      {
        sensorCategory: 'Upstream Glacial Moraine Sentinel',
        stationName: 'Dhauliganga Glacial Moraine Radar',
        status: 'LIMITED',
        lastPingMinutesAgo: 38,
        dataQualityPct: 74,
        impactOnConfidence: 'Mountain cloud attenuation on Ku-band satellite link; using interpolated trend.'
      }
    ],
    nowcast: [
      {
        hourLabel: 'NOW',
        hoursFromNow: 0,
        predictedRisk: 'HIGH',
        riskScore: 78,
        rainfallMmH: 46.5,
        riverLevelM: 5.82,
        soilMoisturePct: 88.4,
        transitionEvent: 'River crossed 5.50m warning stage'
      },
      {
        hourLabel: '+1 HR',
        hoursFromNow: 1,
        predictedRisk: 'HIGH',
        riskScore: 84,
        rainfallMmH: 52.0,
        riverLevelM: 6.05,
        soilMoisturePct: 91.2,
        transitionEvent: 'Predicted 6.0m surge pulse from upstream gorge'
      },
      {
        hourLabel: '+2 HR',
        hoursFromNow: 2,
        predictedRisk: 'CRITICAL',
        riskScore: 92,
        rainfallMmH: 58.0,
        riverLevelM: 6.28,
        soilMoisturePct: 94.0,
        transitionEvent: 'CRITICAL THRESHOLD: Exceeds 6.20m Danger Mark'
      },
      {
        hourLabel: '+3 HR',
        hoursFromNow: 3,
        predictedRisk: 'CRITICAL',
        riskScore: 89,
        rainfallMmH: 42.0,
        riverLevelM: 6.32,
        soilMoisturePct: 95.1,
        transitionEvent: 'Peak flood crest passing Vishnuprayag'
      },
      {
        hourLabel: '+4 HR',
        hoursFromNow: 4,
        predictedRisk: 'HIGH',
        riskScore: 74,
        rainfallMmH: 26.0,
        riverLevelM: 6.10,
        soilMoisturePct: 93.5,
        transitionEvent: 'Precipitation easing; slow drainage begins'
      },
      {
        hourLabel: '+5 HR',
        hoursFromNow: 5,
        predictedRisk: 'MODERATE',
        riskScore: 61,
        rainfallMmH: 14.0,
        riverLevelM: 5.75,
        soilMoisturePct: 90.0,
        transitionEvent: 'River receding back towards warning threshold'
      },
      {
        hourLabel: '+6 HR',
        hoursFromNow: 6,
        predictedRisk: 'MODERATE',
        riskScore: 52,
        rainfallMmH: 8.5,
        riverLevelM: 5.40,
        soilMoisturePct: 86.5,
        transitionEvent: 'Debris risk remains active on unstable slopes'
      }
    ]
  },
  {
    id: 'mandi-pandoh',
    name: 'Mandi / Beas Valley',
    state: 'Himachal Pradesh',
    basin: 'Beas River Sub-Catchment',
    coordinates: { lat: 31.7087, lng: 76.9318 },
    elevationRange: '760m - 2,100m ASL',
    populationAtRisk: 58000,
    rainfall: {
      currentRate: 24.0,
      intensity: 'Moderate',
      accumulated24h: 82.5,
      trend6h: [15.0, 18.0, 22.0, 26.5, 25.0, 24.0],
      stationId: 'AWS-HP-MND01',
      stationName: 'Mandi Town Observatory',
      radarEchoIntensity: 'Moderate',
      lastReadingTime: '6 mins ago'
    },
    river: {
      name: 'Beas River (Victoria Bridge Gauge)',
      currentLevel: 4.10,
      warningThreshold: 4.80,
      dangerThreshold: 5.60,
      historicalHigh: 6.40,
      dischargeRate: 1650,
      rateOfRise: 14,
      trend: 'Gradually Rising',
      gaugeStation: 'Pandoh Inflow Gauge CWC-88',
      lastReadingTime: '3 mins ago'
    },
    soil: {
      moisturePercent: 68.2,
      saturationIndex: 0.68,
      saturationTrend: 'Increasing',
      absorptionCapacityMm: 22.0,
      landslideVulnerabilityScore: 56,
      sensorDepth: '0 - 50 cm Soil Probe'
    },
    terrain: {
      catchmentElevationM: 1450,
      averageSlopeDeg: 28.0,
      valleyNarrownessIndex: 'Moderate V-Shape',
      runoffCoefficient: 0.64,
      vegetationCoverPercent: 58,
      debrisFlowRisk: 'Moderate'
    },
    risk: {
      level: 'MODERATE',
      confidencePercent: 88,
      trend: 'Rising',
      timestamp: '2026-09-27T06:30:00Z',
      primaryCause: 'Consistent moderate rainfall across Beas catchment with upstream dam outflow regulated.',
      factors: [
        {
          name: 'Rainfall Rate (24 mm/h)',
          weight: 60,
          status: 'ELEVATED',
          contributionText: 'Moderate steady monsoon shower; catchment absorbing initial surges.'
        },
        {
          name: 'River Buffer Margin (0.70m to Warning)',
          weight: 52,
          status: 'SAFE',
          contributionText: 'River is 0.70m below 4.80m warning mark; reservoir floodgates ready.'
        },
        {
          name: 'Soil Capacity (22mm remaining)',
          weight: 58,
          status: 'SAFE',
          contributionText: 'Soil moisture at 68%; can absorb approximately 2 hours of current rainfall.'
        },
        {
          name: 'Valley Hydrology',
          weight: 62,
          status: 'ELEVATED',
          contributionText: 'Moderate valley width provides partial attenuation before urban constriction.'
        }
      ],
      aiExplanation: 'Moderate flood risk observed across the Mandi urban stretch. Steady rain (24mm/h) is keeping runoff controlled. Current river stage (4.10m) remains 0.70m below warning threshold. If rainfall intensifies beyond 35mm/h, soil will saturate within 90 minutes.',
      physicalRationale: 'Hydrological mass-balance indicates Pandoh reservoir flood cushion is currently sufficient for up to 3000 cusecs inflow.',
      evacuationRecommended: false,
      recommendedAction: 'Issue alert bulletin to riverside parking, camping zones, and low causeways.'
    },
    reliability: [
      {
        sensorCategory: 'Automatic Weather Station (AWS)',
        stationName: 'Mandi AWS IMD',
        status: 'RELIABLE',
        lastPingMinutesAgo: 6,
        dataQualityPct: 99,
        impactOnConfidence: 'Nominal'
      },
      {
        sensorCategory: 'CWC River Radar Gauge',
        stationName: 'Victoria Bridge Gauge',
        status: 'RELIABLE',
        lastPingMinutesAgo: 3,
        dataQualityPct: 95,
        impactOnConfidence: 'Nominal'
      },
      {
        sensorCategory: 'Soil Moisture Matrix (ISRO Bhuvan)',
        stationName: 'HP Agriculture Probe Mandi',
        status: 'RELIABLE',
        lastPingMinutesAgo: 10,
        dataQualityPct: 90,
        impactOnConfidence: 'Nominal'
      }
    ],
    nowcast: [
      {
        hourLabel: 'NOW',
        hoursFromNow: 0,
        predictedRisk: 'MODERATE',
        riskScore: 54,
        rainfallMmH: 24.0,
        riverLevelM: 4.10,
        soilMoisturePct: 68.2
      },
      {
        hourLabel: '+1 HR',
        hoursFromNow: 1,
        predictedRisk: 'MODERATE',
        riskScore: 59,
        rainfallMmH: 27.5,
        riverLevelM: 4.25,
        soilMoisturePct: 72.0
      },
      {
        hourLabel: '+2 HR',
        hoursFromNow: 2,
        predictedRisk: 'MODERATE',
        riskScore: 66,
        rainfallMmH: 31.0,
        riverLevelM: 4.45,
        soilMoisturePct: 77.5
      },
      {
        hourLabel: '+3 HR',
        hoursFromNow: 3,
        predictedRisk: 'HIGH',
        riskScore: 72,
        rainfallMmH: 36.0,
        riverLevelM: 4.75,
        soilMoisturePct: 83.0,
        transitionEvent: 'Approaching 4.80m warning mark'
      },
      {
        hourLabel: '+4 HR',
        hoursFromNow: 4,
        predictedRisk: 'HIGH',
        riskScore: 71,
        rainfallMmH: 29.0,
        riverLevelM: 4.85,
        soilMoisturePct: 84.5
      },
      {
        hourLabel: '+5 HR',
        hoursFromNow: 5,
        predictedRisk: 'MODERATE',
        riskScore: 58,
        rainfallMmH: 18.0,
        riverLevelM: 4.60,
        soilMoisturePct: 81.0
      },
      {
        hourLabel: '+6 HR',
        hoursFromNow: 6,
        predictedRisk: 'MODERATE',
        riskScore: 48,
        rainfallMmH: 10.0,
        riverLevelM: 4.30,
        soilMoisturePct: 76.0
      }
    ]
  },
  {
    id: 'wayanad-meppadi',
    name: 'Wayanad / Meppadi',
    state: 'Kerala',
    basin: 'Chaliyar & Kabini Upper Ridges',
    coordinates: { lat: 11.5543, lng: 76.1264 },
    elevationRange: '700m - 2,100m ASL',
    populationAtRisk: 34000,
    rainfall: {
      currentRate: 54.0,
      intensity: 'Torrential',
      accumulated24h: 215.0,
      trend6h: [28.0, 39.0, 48.0, 52.0, 56.0, 54.0],
      stationId: 'AWS-KL-WYD03',
      stationName: 'Meppadi Estate IMD AWS',
      radarEchoIntensity: 'Severe',
      lastReadingTime: '1 min ago'
    },
    river: {
      name: 'Iruvanjippuzha & Mountain Torrents',
      currentLevel: 4.95,
      warningThreshold: 4.40,
      dangerThreshold: 5.10,
      historicalHigh: 5.45,
      dischargeRate: 1980,
      rateOfRise: 32,
      trend: 'Rapidly Rising',
      gaugeStation: 'Meppadi Bridge Hydro-Station',
      lastReadingTime: '2 mins ago'
    },
    soil: {
      moisturePercent: 96.8,
      saturationIndex: 0.97,
      saturationTrend: 'Saturated (Runoff Imminent)',
      absorptionCapacityMm: 2.1,
      landslideVulnerabilityScore: 94,
      sensorDepth: 'Soil Moisture Regolith Matrix 0-100cm'
    },
    terrain: {
      catchmentElevationM: 1820,
      averageSlopeDeg: 34.0,
      valleyNarrownessIndex: 'Severe Gorge / Choke Point',
      runoffCoefficient: 0.91,
      vegetationCoverPercent: 72,
      debrisFlowRisk: 'Severe'
    },
    risk: {
      level: 'CRITICAL',
      confidencePercent: 94,
      trend: 'Rapidly Rising',
      timestamp: '2026-09-27T06:30:00Z',
      primaryCause: 'Severe super-saturation (96.8%) from 215mm 24h deluge triggering combined flash flood and mudflow hazard.',
      factors: [
        {
          name: 'Super-Saturated Soil (96.8%)',
          weight: 98,
          status: 'CRITICAL',
          contributionText: 'Zero infiltration buffer; extreme pore-water pressure threatening sudden slope liquefaction.'
        },
        {
          name: 'Torrential Rainfall (54 mm/h)',
          weight: 95,
          status: 'CRITICAL',
          contributionText: 'Continuous cloudburst-level downpour directly flowing into narrow valley channels.'
        },
        {
          name: 'River at 4.95m (0.15m to Danger Mark)',
          weight: 92,
          status: 'CRITICAL',
          contributionText: 'Mountain torrents overflowing banks; river surging at 32cm/hour.'
        },
        {
          name: 'Debris Flow Vulnerability (94/100)',
          weight: 90,
          status: 'CRITICAL',
          contributionText: 'Historical landslide debris chokes culverts downstream, magnifying flash flood crests.'
        }
      ],
      aiExplanation: 'CRITICAL EMERGENCY: Catchment soil saturation at 96.8% has converted entire hillside slopes into impermeable slide planes. With 54mm/h rain continuing, downstream channels in Chooralmala-Meppadi corridor face severe flash flooding and debris torrents within 20-30 minutes.',
      physicalRationale: 'Factor of Safety (FoS) on tea estate slopes has dropped below 1.05. Runoff coefficient is 0.91, creating instantaneous flash surges.',
      evacuationRecommended: true,
      recommendedAction: 'Immediate mandatory evacuation of all valley floor settlements to designated high-ground tea factory shelters.'
    },
    reliability: [
      {
        sensorCategory: 'Automatic Weather Station (AWS)',
        stationName: 'Meppadi Estate AWS',
        status: 'RELIABLE',
        lastPingMinutesAgo: 1,
        dataQualityPct: 97,
        impactOnConfidence: 'Nominal'
      },
      {
        sensorCategory: 'CWC River Radar Gauge',
        stationName: 'Meppadi Bridge Hydro-Station',
        status: 'RELIABLE',
        lastPingMinutesAgo: 2,
        dataQualityPct: 96,
        impactOnConfidence: 'Nominal'
      },
      {
        sensorCategory: 'Soil Moisture Matrix (ISRO Bhuvan)',
        stationName: 'Wayanad Ghat Slope Probe',
        status: 'RELIABLE',
        lastPingMinutesAgo: 5,
        dataQualityPct: 94,
        impactOnConfidence: 'Nominal'
      }
    ],
    nowcast: [
      {
        hourLabel: 'NOW',
        hoursFromNow: 0,
        predictedRisk: 'CRITICAL',
        riskScore: 94,
        rainfallMmH: 54.0,
        riverLevelM: 4.95,
        soilMoisturePct: 96.8,
        transitionEvent: 'Surpassing 4.90m critical safety crest'
      },
      {
        hourLabel: '+1 HR',
        hoursFromNow: 1,
        predictedRisk: 'CRITICAL',
        riskScore: 98,
        rainfallMmH: 62.0,
        riverLevelM: 5.25,
        soilMoisturePct: 98.5,
        transitionEvent: 'BREACH: Exceeds 5.10m Danger Mark'
      },
      {
        hourLabel: '+2 HR',
        hoursFromNow: 2,
        predictedRisk: 'CRITICAL',
        riskScore: 96,
        rainfallMmH: 58.0,
        riverLevelM: 5.38,
        soilMoisturePct: 99.0,
        transitionEvent: 'Severe debris damming hazard at bridge pier'
      },
      {
        hourLabel: '+3 HR',
        hoursFromNow: 3,
        predictedRisk: 'CRITICAL',
        riskScore: 90,
        rainfallMmH: 45.0,
        riverLevelM: 5.15,
        soilMoisturePct: 98.0
      },
      {
        hourLabel: '+4 HR',
        hoursFromNow: 4,
        predictedRisk: 'HIGH',
        riskScore: 79,
        rainfallMmH: 30.0,
        riverLevelM: 4.80,
        soilMoisturePct: 95.0
      },
      {
        hourLabel: '+5 HR',
        hoursFromNow: 5,
        predictedRisk: 'HIGH',
        riskScore: 70,
        rainfallMmH: 18.0,
        riverLevelM: 4.40,
        soilMoisturePct: 92.0
      },
      {
        hourLabel: '+6 HR',
        hoursFromNow: 6,
        predictedRisk: 'MODERATE',
        riskScore: 58,
        rainfallMmH: 10.0,
        riverLevelM: 4.10,
        soilMoisturePct: 88.0
      }
    ]
  },
  {
    id: 'teesta-valley',
    name: 'Teesta Valley / Mangan',
    state: 'Sikkim',
    basin: 'Upper Teesta Basin (GLOF Monitored)',
    coordinates: { lat: 27.5028, lng: 88.5283 },
    elevationRange: '890m - 4,200m ASL',
    populationAtRisk: 22000,
    rainfall: {
      currentRate: 16.0,
      intensity: 'Moderate',
      accumulated24h: 54.0,
      trend6h: [10.0, 12.0, 14.5, 18.0, 17.5, 16.0],
      stationId: 'AWS-SKM-T01',
      stationName: 'Mangan District AWS',
      radarEchoIntensity: 'Weak',
      lastReadingTime: '8 mins ago'
    },
    river: {
      name: 'Teesta River (Mangan Bridge Gauge)',
      currentLevel: 3.20,
      warningThreshold: 4.60,
      dangerThreshold: 5.40,
      historicalHigh: 6.90,
      dischargeRate: 1100,
      rateOfRise: 6,
      trend: 'Stable',
      gaugeStation: 'Upper Teesta Hydro Gauge #12',
      lastReadingTime: '15 mins ago'
    },
    soil: {
      moisturePercent: 52.0,
      saturationIndex: 0.52,
      saturationTrend: 'Stable',
      absorptionCapacityMm: 38.0,
      landslideVulnerabilityScore: 48,
      sensorDepth: 'Glacial Till Depth 0-60cm'
    },
    terrain: {
      catchmentElevationM: 3100,
      averageSlopeDeg: 42.0,
      valleyNarrownessIndex: 'Severe Gorge / Choke Point',
      runoffCoefficient: 0.70,
      vegetationCoverPercent: 51,
      debrisFlowRisk: 'Moderate'
    },
    risk: {
      level: 'LOW',
      confidencePercent: 74,
      trend: 'Stable',
      timestamp: '2026-09-27T06:30:00Z',
      primaryCause: 'Precipitation is currently light to moderate; river stage well below warning thresholds.',
      factors: [
        {
          name: 'Rainfall (16 mm/h)',
          weight: 35,
          status: 'SAFE',
          contributionText: 'Within normal seasonal limits; no orographic cloudburst cloud signature.'
        },
        {
          name: 'River Buffer (1.40m to Warning)',
          weight: 25,
          status: 'SAFE',
          contributionText: 'Teesta water level 3.20m has comfortable clearance to 4.60m warning level.'
        },
        {
          name: 'Soil Infiltration Capacity',
          weight: 30,
          status: 'SAFE',
          contributionText: 'Absorptive capacity is high (38mm available before saturation).'
        },
        {
          name: 'Glacial Lake Monitoring',
          weight: 45,
          status: 'ELEVATED',
          contributionText: 'Upper South Lhonak lake moraine dam telemetry has 15-min latency; standby active.'
        }
      ],
      aiExplanation: 'Low flash flood risk at present. River gauge at Mangan has 1.40m buffer below warning mark. However, overall prediction confidence is reduced to 74% because the high-altitude glacial moraine telemetry has delayed packet delivery.',
      physicalRationale: 'Hydrological balance is stable; snowmelt contribution is seasonal and baseflow remains normal.',
      evacuationRecommended: false,
      recommendedAction: 'Continue baseline monitoring; maintain telemetry checks with CWC North-East control center.'
    },
    reliability: [
      {
        sensorCategory: 'Automatic Weather Station (AWS)',
        stationName: 'Mangan AWS IMD',
        status: 'RELIABLE',
        lastPingMinutesAgo: 8,
        dataQualityPct: 96,
        impactOnConfidence: 'Nominal'
      },
      {
        sensorCategory: 'CWC River Radar Gauge',
        stationName: 'Upper Teesta Hydro Gauge #12',
        status: 'LIMITED',
        lastPingMinutesAgo: 15,
        dataQualityPct: 76,
        impactOnConfidence: 'Delayed sync over VSAT satellite relay.'
      },
      {
        sensorCategory: 'Glacial Moraine Water Probe',
        stationName: 'South Lhonak Moraine Radar',
        status: 'LIMITED',
        lastPingMinutesAgo: 45,
        dataQualityPct: 68,
        impactOnConfidence: 'Solar panel freeze at 5200m ASL causing periodic telemetry drops. Reduced prediction reliability.'
      }
    ],
    nowcast: [
      {
        hourLabel: 'NOW',
        hoursFromNow: 0,
        predictedRisk: 'LOW',
        riskScore: 28,
        rainfallMmH: 16.0,
        riverLevelM: 3.20,
        soilMoisturePct: 52.0
      },
      {
        hourLabel: '+1 HR',
        hoursFromNow: 1,
        predictedRisk: 'LOW',
        riskScore: 32,
        rainfallMmH: 18.0,
        riverLevelM: 3.30,
        soilMoisturePct: 54.0
      },
      {
        hourLabel: '+2 HR',
        hoursFromNow: 2,
        predictedRisk: 'LOW',
        riskScore: 36,
        rainfallMmH: 19.5,
        riverLevelM: 3.42,
        soilMoisturePct: 56.5
      },
      {
        hourLabel: '+3 HR',
        hoursFromNow: 3,
        predictedRisk: 'MODERATE',
        riskScore: 45,
        rainfallMmH: 22.0,
        riverLevelM: 3.60,
        soilMoisturePct: 60.0
      },
      {
        hourLabel: '+4 HR',
        hoursFromNow: 4,
        predictedRisk: 'MODERATE',
        riskScore: 42,
        rainfallMmH: 17.0,
        riverLevelM: 3.55,
        soilMoisturePct: 59.0
      },
      {
        hourLabel: '+5 HR',
        hoursFromNow: 5,
        predictedRisk: 'LOW',
        riskScore: 35,
        rainfallMmH: 12.0,
        riverLevelM: 3.40,
        soilMoisturePct: 56.0
      },
      {
        hourLabel: '+6 HR',
        hoursFromNow: 6,
        predictedRisk: 'LOW',
        riskScore: 26,
        rainfallMmH: 8.0,
        riverLevelM: 3.25,
        soilMoisturePct: 53.0
      }
    ]
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'INC-2026-089',
    title: 'Severe Debris Mudflow at Badrinath National Highway (NH-07 km 42)',
    type: 'DEBRIS_FLOW',
    location: 'Near Vishnuprayag Barrage, Chamoli',
    coordinates: { lat: 30.562, lng: 79.572 },
    timestamp: '24 mins ago',
    severity: 'CRITICAL',
    priorityScore: 96,
    status: 'RESPONDING',
    reporterName: 'Sub-Inspector R. Rawat',
    reporterRole: 'State Police Patrol Unit 4',
    description: 'Sudden boulder avalanche and muddy runoff washed across 120m stretch of highway. 4 tourist vehicles halted on higher shoulder. Water height on asphalt is approx 0.8m with heavy velocity.',
    imageUrl: '/src/assets/images/himalayan_river_valley_1790516109200.jpg',
    aiAnalysis: {
      detectedFeatures: [
        'Rapid turbulent brown torrent across roadway',
        'Visible mountain slope regolith slip',
        'Vehicular passage completely blocked',
        'High debris content (boulders, tree branches)'
      ],
      waterVelocityIndicator: 'Violent Surge',
      structuralThreat: 'Direct Breach / Overtopping',
      confidence: 93,
      recommendedVerification: 'Confirm culvert integrity under km 42 roadbed; check for stranded passengers in stranded vehicles.'
    },
    assignedTeam: 'NDRF Quick Rescue Unit Alpha-3',
    casualtiesReported: 0,
    peopleEvacuated: 14
  },
  {
    id: 'INC-2026-088',
    title: 'Alaknanda Riverbank Embankment Scour Near Old Ghat',
    type: 'RIVER_OVERFLOW',
    location: 'Lower Bazar, Joshimath',
    coordinates: { lat: 30.548, lng: 79.561 },
    timestamp: '52 mins ago',
    severity: 'HIGH',
    priorityScore: 84,
    status: 'VERIFIED',
    reporterName: 'Anand Bhatt',
    reporterRole: 'Community Disaster Volunteer',
    description: 'Swollen river water is washing against the stone retaining wall. Lower stepped bathing ghats are submerged. 6 shops in low zone advised to move inventory to upper market.',
    aiAnalysis: {
      detectedFeatures: [
        'River level touching masonry wall base',
        'Turbulent standing eddies',
        'Ghat stairs submerged up to 4th flight'
      ],
      waterVelocityIndicator: 'Rapid Torrential',
      structuralThreat: 'Potential Scour',
      confidence: 89,
      recommendedVerification: 'Deploy flood warden team with loudhailers; verify river gauge reading matches visual crest.'
    },
    assignedTeam: 'Chamoli SDRF Team 2',
    peopleEvacuated: 28
  },
  {
    id: 'INC-2026-087',
    title: 'Submerged Pedestrian Suspension Bridge (Bridge #3)',
    type: 'BRIDGE_SUBMERGED',
    location: 'Govindghat Foot Access, Chamoli',
    coordinates: { lat: 30.612, lng: 79.593 },
    timestamp: '1 hour 15 mins ago',
    severity: 'HIGH',
    priorityScore: 78,
    status: 'UNDER REVIEW',
    reporterName: 'Gram Pradhan Govindghat',
    reporterRole: 'Village Council Head',
    description: 'Surging tributary water is hitting the steel walkway girder. Driftwood snagged on northern cable anchor. Foot traffic barricaded by local youth.',
    aiAnalysis: {
      detectedFeatures: [
        'Bridge clearance reduced to 0m (water lapping decking)',
        'Hydrodynamic drag on cable suspension',
        'Debris pile-up on pier'
      ],
      waterVelocityIndicator: 'Violent Surge',
      structuralThreat: 'Direct Breach / Overtopping',
      confidence: 91,
      recommendedVerification: 'PWD Structural Engineer dispatch required before reopening.'
    },
    assignedTeam: 'District PWD Bridge Cell'
  },
  {
    id: 'INC-2026-085',
    title: 'Temporary Culvert Choke and Road Inundation',
    type: 'ROAD_WASHOUT',
    location: 'Mandi Outskirts, Pandoh Bypass',
    coordinates: { lat: 31.692, lng: 76.945 },
    timestamp: '2 hours ago',
    severity: 'MEDIUM',
    priorityScore: 62,
    status: 'RESOLVED',
    reporterName: 'HP Highway Patrol 08',
    reporterRole: 'Traffic Police',
    description: 'Debris from hillside blocked twin 900mm pipe culvert. Water diverted across road. JCB excavator cleared obstruction and water has drained.',
    assignedTeam: 'NHAI Maintenance Unit 3',
    peopleEvacuated: 0
  },
  {
    id: 'INC-2026-084',
    title: 'Precautionary Evacuation of Low-Lying River Hamlet',
    type: 'PEOPLE_STRANDED',
    location: 'Chooralmala Riverbank, Wayanad',
    coordinates: { lat: 11.542, lng: 76.138 },
    timestamp: '3 hours ago',
    severity: 'CRITICAL',
    priorityScore: 98,
    status: 'RESPONDING',
    reporterName: 'Village Officer Meppadi',
    reporterRole: 'Revenue Department',
    description: 'Rising stream cut off sole footbridge to 18 residential cottages. Revenue team and Fire & Rescue rigging zip lines and motorized inflatable boats.',
    assignedTeam: 'NDRF 4th Battalion + Kerala Fire & Rescue',
    casualtiesReported: 0,
    peopleEvacuated: 52
  }
];

export const INITIAL_ALERTS: AlertBulletin[] = [
  {
    id: 'ALT-UK-2026-042',
    title: 'FLASH FLOOD RED ALERT - ALAKNANDA BASIN (JOSHIMATH / CHAMOLI)',
    level: 'CRITICAL',
    issuedAt: '2026-09-27T06:15:00Z',
    validUntil: '2026-09-27T12:00:00Z',
    affectedBasin: 'Alaknanda, Dhauliganga & Pindar Catchments',
    headlineEn: 'CRITICAL FLASH FLOOD WARNING: Cloudburst triggered torrential surge in Alaknanda river. River level at Vishnuprayag has crossed warning mark (5.82m) and is rising rapidly. Immediate evacuation of riverbank zones required.',
    headlineHi: 'अति गंभीर चेतावनी: अलकनंदा नदी में बादल फटने से जलस्तर चेतावनी निशान (5.82 मी.) को पार कर चुका है। निचले इलाकों में रहने वाले लोग तत्काल सुरक्षित ऊंचाई वाले राहत शिविरों में जाएं।',
    detailedInstructions: '1. Do not approach riverbanks, bridges, or steep valley shoulders.\n2. Inhabitants of Vishnuprayag, Lower Joshimath, and Govindghat must move to designated government relief shelters.\n3. Keep 72-hour emergency go-bags ready with torch, drinking water, and dry rations.\n4. Call State Emergency Operations Center at 1070 or NDRF at 1078 for rescue assistance.',
    channels: ['CELL_BROADCAST', 'SIREN', 'WHATSAPP', 'RADIO', 'CAP_XML'],
    issuedBy: 'Disaster Management Authority (USDMA)',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-HP-2026-029',
    title: 'FLOOD WATCH (ORANGE) - BEAS RIVER & MANDI URBAN REACHES',
    level: 'WATCH',
    issuedAt: '2026-09-27T05:00:00Z',
    validUntil: '2026-09-27T18:00:00Z',
    affectedBasin: 'Beas River, Suketi Khad, Pandoh Dam Downstream',
    headlineEn: 'FLOOD WATCH: Continuous rainfall of 24mm/h across Beas catchment. Water release from upstream barrage expected. Avoid camping near riverbed.',
    headlineHi: 'बाढ़ निगरानी: ब्यास नदी के जलग्रहण क्षेत्र में निरंतर वर्षा। नदी किनारे पार्किंग और आवाजाही तुरंत बंद करें।',
    detailedInstructions: '1. Riverside footpaths and car parking on Victoria bridge road are cordoned off.\n2. Small boat and rafting operations suspended until further notice.\n3. Monitor emergency notifications via FM 101.4 AIR Mandi.',
    channels: ['CELL_BROADCAST', 'WHATSAPP', 'CAP_XML'],
    issuedBy: 'District Emergency Operations Center Mandi',
    status: 'ACTIVE'
  },
  {
    id: 'ALT-KL-2026-061',
    title: 'CRITICAL EVACUATION ADVISORY - UPPER WAYANAD HILL TRACTS',
    level: 'CRITICAL',
    issuedAt: '2026-09-27T04:30:00Z',
    validUntil: '2026-09-27T16:00:00Z',
    affectedBasin: 'Chaliyar Upstream, Meppadi, Chooralmala',
    headlineEn: 'MANDATORY EVACUATION: Extreme soil saturation (96.8%) combined with 215mm rainfall creates severe risk of flash surges and debris flows. Move to relief camps immediately.',
    headlineHi: 'अति आवश्यक सूचना: भारी बारिश और मिट्टी के अति-संतृप्ति के कारण मेप्पाडी क्षेत्र में तुरंत सुरक्षित शिविरों में जाएं।',
    detailedInstructions: '1. Follow evacuation route via North Tea Division Road towards High School Shelter.\n2. Do not attempt to cross flooded streams on foot or two-wheelers.\n3. Emergency helpline: 1077 (District Control Room).',
    channels: ['CELL_BROADCAST', 'SIREN', 'WHATSAPP', 'RADIO', 'CAP_XML'],
    issuedBy: 'Wayanad District Disaster Management Authority',
    status: 'ACTIVE'
  }
];

export const EMERGENCY_SHELTERS: EmergencyShelter[] = [
  {
    id: 'SHL-UK-01',
    name: 'Joshimath Municipal Higher Secondary School Relief Hub',
    region: 'Chamoli / Joshimath',
    coordinates: { lat: 30.559, lng: 79.564 },
    elevationM: 1980,
    capacityTotal: 650,
    capacityCurrent: 218,
    hasMedicalPost: true,
    hasHelipad: true,
    foodSuppliesDays: 8,
    safeRouteStatus: 'CLEAR',
    contactPerson: 'Shri K. S. Chauhan, Tehsildar',
    contactNumber: '+91-1372-222108'
  },
  {
    id: 'SHL-UK-02',
    name: 'Govindghat Gurudwara Elevated Community Shelter',
    region: 'Chamoli / Joshimath',
    coordinates: { lat: 30.615, lng: 79.596 },
    elevationM: 1840,
    capacityTotal: 1200,
    capacityCurrent: 480,
    hasMedicalPost: true,
    hasHelipad: false,
    foodSuppliesDays: 14,
    safeRouteStatus: 'CLEAR',
    contactPerson: 'Sardar Manjit Singh, Camp Manager',
    contactNumber: '+91-1372-226224'
  },
  {
    id: 'SHL-UK-03',
    name: 'Auli ITBP Base Camp Emergency Complex',
    region: 'Chamoli / Joshimath',
    coordinates: { lat: 30.531, lng: 79.570 },
    elevationM: 2750,
    capacityTotal: 400,
    capacityCurrent: 85,
    hasMedicalPost: true,
    hasHelipad: true,
    foodSuppliesDays: 21,
    safeRouteStatus: 'CLEAR',
    contactPerson: 'Duty Officer ITBP Auli',
    contactNumber: '+91-1372-221235'
  },
  {
    id: 'SHL-HP-01',
    name: 'Mandi Vallabh Degree College Indoor Sports Complex',
    region: 'Mandi / Beas Valley',
    coordinates: { lat: 31.712, lng: 76.928 },
    elevationM: 820,
    capacityTotal: 850,
    capacityCurrent: 140,
    hasMedicalPost: true,
    hasHelipad: false,
    foodSuppliesDays: 10,
    safeRouteStatus: 'CLEAR',
    contactPerson: 'Dr. Anita Thakur, Shelter Incharge',
    contactNumber: '+91-1905-223401'
  },
  {
    id: 'SHL-KL-01',
    name: 'Meppadi St. Joseph High School & Parish Hall',
    region: 'Wayanad / Meppadi',
    coordinates: { lat: 11.562, lng: 76.121 },
    elevationM: 920,
    capacityTotal: 700,
    capacityCurrent: 395,
    hasMedicalPost: true,
    hasHelipad: false,
    foodSuppliesDays: 6,
    safeRouteStatus: 'CLEAR',
    contactPerson: 'Fr. George Mathew / Health Inspector',
    contactNumber: '+91-4936-280220'
  }
];

export const EMERGENCY_CONTACTS = [
  { service: 'National Disaster Response Force (NDRF) HQ', number: '1078', tollFree: true, desc: 'National 24x7 Search & Rescue dispatch' },
  { service: 'State Disaster Management Authority (SDMA Control)', number: '1070', tollFree: true, desc: 'State-level tactical emergency management' },
  { service: 'District Emergency Operations Center (DEOC)', number: '1077', tollFree: true, desc: 'Local district magistrate control room' },
  { service: 'National Emergency Response Police / Rescue', number: '112', tollFree: true, desc: 'Pan-India single emergency access' },
  { service: 'Emergency Medical & Advanced Life Ambulance', number: '108', tollFree: true, desc: 'Trauma dispatch & mobile field clinics' },
  { service: 'CWC Flood Early Warning Information Desk', number: '1800-180-1551', tollFree: true, desc: 'Central Water Commission river hydrometry' }
];

export const PREVIOUS_CYCLE_SNAPSHOT: Record<string, {
  rainfallRate: number;
  riverLevel: number;
  soilMoisture: number;
  riskLevel: string;
  timestamp: string;
}> = {
  'chamoli-joshimath': {
    rainfallRate: 28.5,
    riverLevel: 5.20,
    soilMoisture: 79.4,
    riskLevel: 'MODERATE',
    timestamp: '45 mins ago'
  },
  'mandi-pandoh': {
    rainfallRate: 22.0,
    riverLevel: 3.95,
    soilMoisture: 65.0,
    riskLevel: 'MODERATE',
    timestamp: '45 mins ago'
  },
  'wayanad-meppadi': {
    rainfallRate: 42.0,
    riverLevel: 4.60,
    soilMoisture: 91.0,
    riskLevel: 'HIGH',
    timestamp: '45 mins ago'
  },
  'teesta-valley': {
    rainfallRate: 14.0,
    riverLevel: 3.15,
    soilMoisture: 50.0,
    riskLevel: 'LOW',
    timestamp: '45 mins ago'
  }
};
