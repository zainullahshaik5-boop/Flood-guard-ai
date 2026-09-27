export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type AlertLevel = 'INFORMATION' | 'WATCH' | 'WARNING' | 'CRITICAL';
export type IncidentStatus = 'NEW' | 'UNDER REVIEW' | 'VERIFIED' | 'RESPONDING' | 'RESOLVED';
export type SensorStatus = 'RELIABLE' | 'LIMITED' | 'INSUFFICIENT';

export type UserRole = 
  | 'AUTHORITY'     // State/District Disaster Management Authority (SDMA/DDMA)
  | 'RESPONDER'     // NDRF / SDRF Search & Rescue Commander
  | 'COLLECTOR'     // District Magistrate / Collector
  | 'CITIZEN'       // Local Resident / Village Volunteer
  | 'EVALUATOR';    // SIH 2026 Hackathon Judge / Demo Mode

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  organization: string;
  region: string;
  avatarUrl?: string;
  badgeNumber?: string;
}

export interface RegionTelemetry {
  id: string;
  name: string;
  state: string;
  basin: string;
  coordinates: { lat: number; lng: number };
  elevationRange: string;
  populationAtRisk: number;
  rainfall: RainfallData;
  river: RiverData;
  soil: SoilData;
  terrain: TerrainData;
  risk: RiskAssessment;
  reliability: SensorReliability[];
  nowcast: NowcastPoint[];
}

export interface RainfallData {
  currentRate: number; // mm/h
  intensity: 'Normal' | 'Moderate' | 'Heavy' | 'Torrential' | 'Cloudburst Event';
  accumulated24h: number; // mm
  trend6h: number[]; // 6 hourly readings
  stationId: string;
  stationName: string;
  radarEchoIntensity: 'Weak' | 'Moderate' | 'Severe' | 'Convective Core';
  lastReadingTime: string;
}

export interface RiverData {
  name: string;
  currentLevel: number; // meters
  warningThreshold: number; // meters
  dangerThreshold: number; // meters
  historicalHigh: number; // meters
  dischargeRate: number; // cusecs
  rateOfRise: number; // cm/hour
  trend: 'Rapidly Rising' | 'Gradually Rising' | 'Stable' | 'Receding';
  gaugeStation: string;
  lastReadingTime: string;
}

export interface SoilData {
  moisturePercent: number; // % volumetric water content
  saturationIndex: number; // 0.0 to 1.0
  saturationTrend: 'Increasing' | 'Saturated (Runoff Imminent)' | 'Near Field Capacity' | 'Stable';
  absorptionCapacityMm: number; // remaining capacity in mm
  landslideVulnerabilityScore: number; // 0 to 100
  sensorDepth: string;
}

export interface TerrainData {
  catchmentElevationM: number;
  averageSlopeDeg: number;
  valleyNarrownessIndex: 'Wide Valley' | 'Moderate V-Shape' | 'Severe Gorge / Choke Point';
  runoffCoefficient: number; // 0.0 to 1.0
  vegetationCoverPercent: number;
  debrisFlowRisk: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface RiskFactor {
  name: string;
  weight: number; // 0 to 100%
  status: 'SAFE' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
  contributionText: string;
}

export interface RiskAssessment {
  level: RiskLevel;
  confidencePercent: number; // multi-sensor consensus
  trend: 'Rapidly Rising' | 'Rising' | 'Stable' | 'Receding';
  timestamp: string;
  primaryCause: string;
  factors: RiskFactor[];
  aiExplanation: string;
  physicalRationale: string;
  evacuationRecommended: boolean;
  recommendedAction: string;
}

export interface NowcastPoint {
  hourLabel: string;
  hoursFromNow: number;
  predictedRisk: RiskLevel;
  riskScore: number; // 0-100
  rainfallMmH: number;
  riverLevelM: number;
  soilMoisturePct: number;
  transitionEvent?: string;
}

export interface IncidentReport {
  id: string;
  title: string;
  type: 'FLASH_FLOOD' | 'RIVER_OVERFLOW' | 'DEBRIS_FLOW' | 'ROAD_WASHOUT' | 'BRIDGE_SUBMERGED' | 'PEOPLE_STRANDED';
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  priorityScore: number; // 0-100 AI priority rank
  status: IncidentStatus;
  reporterName: string;
  reporterRole: string;
  description: string;
  imageUrl?: string;
  aiAnalysis?: {
    detectedFeatures: string[];
    waterVelocityIndicator: 'Standing' | 'Slow Flow' | 'Rapid Torrential' | 'Violent Surge';
    structuralThreat: 'None Visible' | 'Potential Scour' | 'Direct Breach / Overtopping';
    confidence: number;
    recommendedVerification: string;
  };
  assignedTeam?: string;
  casualtiesReported?: number;
  peopleEvacuated?: number;
}

export interface AlertBulletin {
  id: string;
  title: string;
  level: AlertLevel;
  issuedAt: string;
  validUntil: string;
  affectedBasin: string;
  headlineEn: string;
  headlineHi: string;
  detailedInstructions: string;
  channels: ('CELL_BROADCAST' | 'SIREN' | 'WHATSAPP' | 'RADIO' | 'CAP_XML')[];
  issuedBy: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

export interface EmergencyShelter {
  id: string;
  name: string;
  region: string;
  coordinates: { lat: number; lng: number };
  elevationM: number;
  capacityTotal: number;
  capacityCurrent: number;
  hasMedicalPost: boolean;
  hasHelipad: boolean;
  foodSuppliesDays: number;
  safeRouteStatus: 'CLEAR' | 'CAUTION_DEBRIS' | 'WATERLOGGED';
  contactPerson: string;
  contactNumber: string;
}

export interface SensorReliability {
  sensorCategory: string;
  stationName: string;
  status: SensorStatus;
  lastPingMinutesAgo: number;
  dataQualityPct: number;
  impactOnConfidence: string;
}

export interface SimulationParameters {
  rainfallRateMmH: number;
  rainfallDurationHours: number;
  initialRiverStageM: number;
  soilMoisturePct: number;
  slopeAngleDeg: number;
  deforestationFactor: 'Pristine Forest' | 'Moderate Grazing' | 'High Deforestation';
}

export interface SimulationResult {
  simulatedRisk: RiskLevel;
  peakDischargeCusecs: number;
  lagTimeToPeakMinutes: number;
  floodInundationAreaSqKm: number;
  projectedRiverStageM: number;
  soilSaturationReachedPct: number;
  hydrographCurve: { minute: number; discharge: number; waterLevel: number }[];
  summaryNote: string;
}
