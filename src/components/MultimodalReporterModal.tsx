import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { analyzeFloodPhoto, MultimodalAnalysisResult } from '../services/multimodalReporter';
import { IncidentReport } from '../types';
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Send,
  X,
  Info,
  Layers,
  MapPin
} from 'lucide-react';

export const MultimodalReporterModal: React.FC = () => {
  const { activeRegion, addIncident, isOffline, setActiveTab } = useApp();

  const [description, setDescription] = useState<string>(
    'Torrential muddy mountain water carrying small boulders broke through the culvert and is overflowing across the valley highway.'
  );
  const [locationText, setLocationText] = useState<string>(`${activeRegion.name} Upper Gorge Reach`);
  const [selectedPhotoPreset, setSelectedPhotoPreset] = useState<string>(
    '/src/assets/images/himalayan_river_valley_1790516109200.jpg'
  );
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<MultimodalAnalysisResult | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const activePhoto = customPhotoUrl || selectedPhotoPreset;

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setSubmissionSuccess(false);
    try {
      const res = await analyzeFloodPhoto(description, activePhoto);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitToAuthorities = () => {
    if (!analysisResult) return;

    const newIncident: IncidentReport = {
      id: `INC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: `${analysisResult.incidentType.replace('_', ' ')}: ${locationText}`,
      type: analysisResult.incidentType,
      location: locationText,
      coordinates: { lat: activeRegion.coordinates.lat + 0.005, lng: activeRegion.coordinates.lng + 0.004 },
      timestamp: 'Just now',
      severity: analysisResult.suggestedSeverity,
      priorityScore: analysisResult.priorityScore,
      status: 'NEW',
      reporterName: 'Citizen Ground Observer / AI Multimodal',
      reporterRole: 'Crowdsourced Field Observer',
      description,
      imageUrl: activePhoto,
      aiAnalysis: {
        detectedFeatures: analysisResult.detectedFeatures,
        waterVelocityIndicator: analysisResult.waterVelocityIndicator,
        structuralThreat: analysisResult.structuralThreat,
        confidence: analysisResult.confidence,
        recommendedVerification: analysisResult.recommendedVerification
      }
    };

    addIncident(newIncident);
    setSubmissionSuccess(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
              <Camera className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              AI Multimodal Flood Reporter
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              VISION REASONING
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Upload field photos of rising water, mudflows, or submerged culverts for automated structural and severity triage.
          </p>
        </div>

        {isOffline && (
          <span className="text-[11px] font-mono text-amber-300 bg-amber-950 px-2.5 py-1 rounded border border-amber-700">
            Offline: Report will queue locally
          </span>
        )}
      </div>

      {/* Main Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Photo Preview & Presets */}
        <div className="md:col-span-6 space-y-3">
          <label className="text-xs font-semibold text-slate-300 block">
            1. Field Photography / Evidence:
          </label>

          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
            <img
              src={activePhoto}
              alt="Flood Incident Evidence"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/90 text-[10px] text-slate-300 px-2 py-0.5 rounded border border-slate-800">
              Active Inspector Image
            </div>
          </div>

          {/* Preset Sample Photo Buttons for Quick Evaluator Testing */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-slate-400 font-mono">TEST PHOTO SAMPLES:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedPhotoPreset('/src/assets/images/himalayan_river_valley_1790516109200.jpg');
                  setCustomPhotoUrl('');
                  setDescription('Mountain torrent carrying rock debris over roadside pavement near bridge pier.');
                }}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-colors ${
                  activePhoto.includes('himalayan_river_valley')
                    ? 'bg-slate-800 border-cyan-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                }`}
              >
                <div className="font-semibold text-[11px]">Himalayan Valley Surge</div>
                <div className="text-[10px] text-slate-500">Debris & Road Obstruction</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPhotoPreset('/src/assets/images/himalayan_river_valley_1790516109200.jpg');
                  setDescription('High water level touching bridge underside. Large trees and drift logs pinned against central pier.');
                }}
                className="p-2 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-900 text-left text-slate-400 cursor-pointer"
              >
                <div className="font-semibold text-[11px] text-slate-300">Bridge Structural Hazard</div>
                <div className="text-[10px] text-slate-500">Pier Choke & High Velocity</div>
              </button>
            </div>
          </div>

          {/* Custom File Upload Simulation */}
          <div className="pt-1">
            <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-slate-700 rounded-xl bg-slate-950/60 hover:bg-slate-950 text-slate-400 hover:text-white cursor-pointer text-xs transition-colors">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Click to simulate uploading a new camera photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setCustomPhotoUrl(url);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Right Column: Incident Details Form */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              2. Observation Location & Landmark:
            </label>
            <div className="relative">
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="e.g. Vishnuprayag Barrage NH-07 Km 44"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <MapPin className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              3. Visual Description of Flash Flood Conditions:
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe water color, flow speed, obstacles, submerged vehicles or trapped persons..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 leading-relaxed"
            />
          </div>

          {/* Action: Run AI Analysis */}
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-950/40 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing Flood Geometry & Sediment Velocity...' : 'Analyze with AI Flood Vision Engine'}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                AI MULTIMODAL INSPECTION REPORT
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                Classification: {analysisResult.incidentType.replace('_', ' ')}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded border ${
                analysisResult.suggestedSeverity === 'CRITICAL'
                  ? 'bg-red-950 text-red-300 border-red-800'
                  : 'bg-orange-950 text-orange-300 border-orange-800'
              }`}>
                {analysisResult.suggestedSeverity} PRIORITY ({analysisResult.priorityScore}/100)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold text-slate-300 mb-1.5">Detected Visual Indicators:</div>
              <ul className="space-y-1 text-slate-400">
                {analysisResult.detectedFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-slate-400">Flow Velocity Indicator:</span>{' '}
                <span className="font-mono font-bold text-amber-300">{analysisResult.waterVelocityIndicator}</span>
              </div>
              <div>
                <span className="text-slate-400">Structural Threat:</span>{' '}
                <span className="font-mono font-bold text-red-400">{analysisResult.structuralThreat}</span>
              </div>
              <div>
                <span className="text-slate-400">Field Verification Checklist:</span>
                <p className="text-[11px] text-slate-300 mt-0.5 italic">
                  {analysisResult.recommendedVerification}
                </p>
              </div>
            </div>
          </div>

          {/* Explanation Quote */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong>AI Operational Rationale:</strong> {analysisResult.aiExplanation}
          </div>

          {/* Mandatory Tool Disclaimer */}
          <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300/90 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{analysisResult.disclaimer}</span>
          </div>

          {/* Dispatch Submission Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {submissionSuccess ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                Report logged into Authority Response Queue (ID: INC-2026-NEW)
              </div>
            ) : (
              <span className="text-[11px] text-slate-400">
                Review verified details before transmitting to NDRF & District Ops.
              </span>
            )}

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {submissionSuccess ? (
                <button
                  onClick={() => setActiveTab('prioritization')}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  View in Priority Queue →
                </button>
              ) : (
                <button
                  onClick={handleSubmitToAuthorities}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Report to Operations Room
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
