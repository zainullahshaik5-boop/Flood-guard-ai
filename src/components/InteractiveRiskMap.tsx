import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  AlertTriangle,
  LifeBuoy,
  X,
  Compass,
  Navigation,
  CheckCircle2,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const InteractiveRiskMap: React.FC = () => {
  const { activeRegion, incidents, shelters, setActiveTab } = useApp();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [useGoogleMapsEmbed, setUseGoogleMapsEmbed] = useState<boolean>(false);

  // Layer Toggles
  const [showRiverLayer, setShowRiverLayer] = useState<boolean>(true);
  const [showZonesLayer, setShowZonesLayer] = useState<boolean>(true);
  const [showSheltersLayer, setShowSheltersLayer] = useState<boolean>(true);
  const [showIncidentsLayer, setShowIncidentsLayer] = useState<boolean>(true);
  const [showBridgesLayer, setShowBridgesLayer] = useState<boolean>(true);

  // Region specific map geometries
  const mapData = {
    'chamoli-joshimath': {
      riverPath: 'M 40,280 Q 180,240 320,180 T 540,110 T 780,60',
      tributaryPath: 'M 320,180 Q 360,260 420,380',
      dangerZones: [
        { id: 'zone-1', name: 'Vishnuprayag Confluence Basin', level: 'CRITICAL', d: 'M 260,150 L 380,140 L 400,240 L 280,260 Z' },
        { id: 'zone-2', name: 'Lower Joshimath Riverine Ghats', level: 'HIGH', d: 'M 140,210 L 260,190 L 270,290 L 160,310 Z' },
        { id: 'zone-3', name: 'Govindghat Riverside Corridor', level: 'HIGH', d: 'M 480,80 L 620,70 L 630,150 L 500,160 Z' }
      ],
      bridges: [
        { id: 'br-1', name: 'Vishnuprayag NH Bridge', x: 310, y: 185, status: 'SUBMERGED', note: 'Water overtopping parapet wall by 0.2m' },
        { id: 'br-2', name: 'Govindghat Suspension Bridge', x: 540, y: 115, status: 'BLOCKED', note: 'Footbridge closed due to driftwood snag' },
        { id: 'br-3', name: 'Joshimath Upper Bypass Flyover', x: 220, y: 120, status: 'CLEAR', note: 'Elevated structure safe for emergency convoys' }
      ]
    },
    'mandi-pandoh': {
      riverPath: 'M 60,350 Q 240,320 400,220 T 650,160 T 780,120',
      tributaryPath: 'M 400,220 Q 420,120 480,40',
      dangerZones: [
        { id: 'zone-hp-1', name: 'Mandi Town Riverbed Ghats', level: 'MODERATE', d: 'M 340,190 L 460,180 L 480,260 L 360,280 Z' },
        { id: 'zone-hp-2', name: 'Suketi Khad Lowlands', level: 'HIGH', d: 'M 200,290 L 320,270 L 330,350 L 210,370 Z' }
      ],
      bridges: [
        { id: 'br-hp-1', name: 'Victoria Suspension Bridge', x: 390, y: 225, status: 'CLEAR', note: 'Pedestrian only; 1.8m clearance remaining' },
        { id: 'br-hp-2', name: 'Pandoh Dam Downstream Causeway', x: 620, y: 165, status: 'BLOCKED', note: 'Cordoned off due to gate discharge' }
      ]
    },
    'wayanad-meppadi': {
      riverPath: 'M 40,80 Q 220,160 380,240 T 560,300 T 780,360',
      tributaryPath: 'M 380,240 Q 480,160 600,100',
      dangerZones: [
        { id: 'zone-kl-1', name: 'Chooralmala Runoff Corridor', level: 'CRITICAL', d: 'M 320,200 L 440,180 L 460,300 L 340,320 Z' },
        { id: 'zone-kl-2', name: 'Mundakkai Valley Tea Section', level: 'CRITICAL', d: 'M 480,140 L 620,120 L 640,220 L 500,240 Z' }
      ],
      bridges: [
        { id: 'br-kl-1', name: 'Chooralmala River Bailey Bridge', x: 375, y: 245, status: 'BLOCKED', note: 'Approaches washed away; Bailey bridge under rebuild' }
      ]
    },
    'teesta-valley': {
      riverPath: 'M 80,40 Q 200,140 360,200 T 520,280 T 740,380',
      tributaryPath: 'M 360,200 Q 280,280 220,380',
      dangerZones: [
        { id: 'zone-sk-1', name: 'Mangan Lower Gorge Terraces', level: 'MODERATE', d: 'M 300,160 L 420,150 L 430,240 L 310,250 Z' }
      ],
      bridges: [
        { id: 'br-sk-1', name: 'Mangan Teesta Girder Bridge', x: 355, y: 205, status: 'CLEAR', note: 'Nominal clearances' }
      ]
    }
  }[activeRegion.id] || {
    riverPath: 'M 40,280 Q 180,240 320,180 T 540,110 T 780,60',
    tributaryPath: 'M 320,180 Q 360,260 420,380',
    dangerZones: [],
    bridges: []
  };

  const filteredIncidents = incidents.filter(i =>
    i.location.toLowerCase().includes(activeRegion.name.split('/')[0].trim().toLowerCase()) ||
    i.location.toLowerCase().includes(activeRegion.state.toLowerCase())
  );

  const regionShelters = shelters.filter(s => s.region.includes(activeRegion.name.split('/')[0].trim()));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4">
      {/* Top Map Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              Catchment GIS Topographic Hazard Map
            </h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              CONTOUR RELIEF
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time overlay of mountain river courses, elevation choke points, bridges, and emergency shelters.
          </p>
        </div>

        {/* View Switcher & Search */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bridge, shelter or ghat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-7 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 w-48 sm:w-56"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2.5" />
          </div>

          {/* Google Maps / Topo Map Switcher */}
          <button
            onClick={() => setUseGoogleMapsEmbed(!useGoogleMapsEmbed)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Switch to Google Maps Satellite View"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">
              {useGoogleMapsEmbed ? 'Vector Topo View' : 'Google Satellite'}
            </span>
          </button>
        </div>
      </div>

      {/* Layer Toggles & Map Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 text-[11px] font-mono mr-1">LAYERS:</span>
          
          <button
            onClick={() => setShowRiverLayer(!showRiverLayer)}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
              showRiverLayer ? 'bg-blue-950/80 border-blue-600 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            🌊 River Network
          </button>

          <button
            onClick={() => setShowZonesLayer(!showZonesLayer)}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
              showZonesLayer ? 'bg-red-950/80 border-red-600 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            ⚠️ Inundation Polygons
          </button>

          <button
            onClick={() => setShowBridgesLayer(!showBridgesLayer)}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
              showBridgesLayer ? 'bg-amber-950/80 border-amber-600 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            🌉 Bridges & Roads
          </button>

          <button
            onClick={() => setShowSheltersLayer(!showSheltersLayer)}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
              showSheltersLayer ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            🏕️ Safe Shelters
          </button>

          <button
            onClick={() => setShowIncidentsLayer(!showIncidentsLayer)}
            className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
              showIncidentsLayer ? 'bg-purple-950/80 border-purple-600 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            🚨 Live Incidents
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-slate-400 px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer ml-1"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Map Canvas / Google Maps Fallback Container */}
      <div className="relative w-full h-[450px] sm:h-[500px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
        {useGoogleMapsEmbed ? (
          /* Google Maps Safe Embed / Fallback */
          <div className="w-full h-full relative">
            <iframe
              title={`Google Map - ${activeRegion.name}`}
              className="w-full h-full border-0 filter invert contrast-125"
              src={`https://maps.google.com/maps?q=${activeRegion.coordinates.lat},${activeRegion.coordinates.lng}&z=13&output=embed`}
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-slate-300 backdrop-blur-sm">
              Satellite coordinates: {activeRegion.coordinates.lat}°N, {activeRegion.coordinates.lng}°E
            </div>
          </div>
        ) : (
          /* Interactive Topographic GIS Vector Canvas */
          <div
            className="w-full h-full overflow-hidden relative cursor-grab active:cursor-grabbing"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <svg
              viewBox="0 0 800 420"
              className="w-full h-full object-cover select-none"
            >
              <defs>
                {/* Elevation Contours Grid Pattern */}
                <pattern id="contourGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  <circle cx="20" cy="20" r="1" fill="#334155" />
                </pattern>

                {/* River water gradient */}
                <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Inundation hazard pulse */}
                <radialGradient id="hazardPulse">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                </radialGradient>
              </defs>

              {/* Background Elevation Grid */}
              <rect width="800" height="420" fill="#020617" />
              <rect width="800" height="420" fill="url(#contourGrid)" />

              {/* Topographic Contour Lines */}
              <g stroke="#334155" strokeWidth="0.8" fill="none" opacity="0.4">
                <path d="M 0,100 C 150,70 300,120 450,90 C 600,60 700,100 800,80" />
                <path d="M 0,180 C 120,160 260,200 400,170 C 560,140 680,180 800,160" />
                <path d="M 0,260 C 140,240 280,280 430,250 C 580,220 720,260 800,240" />
                <path d="M 0,340 C 160,320 320,360 480,330 C 640,300 750,340 800,320" />
              </g>

              {/* Inundation Hazard Zones Polygons */}
              {showZonesLayer && mapData.dangerZones.map(zone => (
                <g key={zone.id} onClick={() => setSelectedFeature({ featureCategory: 'ZONE', ...zone })} className="cursor-pointer group">
                  <path
                    d={zone.d}
                    fill={zone.level === 'CRITICAL' ? 'url(#hazardPulse)' : '#f9731633'}
                    stroke={zone.level === 'CRITICAL' ? '#ef4444' : '#f97316'}
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                    className="group-hover:fill-opacity-60 transition-all"
                  />
                  <text
                    x={parseInt(zone.d.split(' ')[1]) + 20}
                    y={parseInt(zone.d.split(' ')[2]) + 20}
                    fill={zone.level === 'CRITICAL' ? '#fca5a5' : '#fed7aa'}
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fontWeight="bold"
                  >
                    {zone.name}
                  </text>
                </g>
              ))}

              {/* River Network Course */}
              {showRiverLayer && (
                <g>
                  {/* Tributary */}
                  <path
                    d={mapData.tributaryPath}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Main River Trunk */}
                  <path
                    d={mapData.riverPath}
                    fill="none"
                    stroke="url(#riverGradient)"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  <text x="700" y="80" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                    {activeRegion.river.name.split('(')[0]}
                  </text>
                </g>
              )}

              {/* Bridges & Infrastructure Points */}
              {showBridgesLayer && mapData.bridges.map(br => (
                <g
                  key={br.id}
                  transform={`translate(${br.x}, ${br.y})`}
                  onClick={() => setSelectedFeature({ featureCategory: 'BRIDGE', ...br })}
                  className="cursor-pointer group"
                >
                  <circle
                    r="8"
                    className={`transition-all ${
                      br.status === 'SUBMERGED'
                        ? 'fill-red-500 stroke-red-200 animate-pulse'
                        : br.status === 'BLOCKED'
                        ? 'fill-amber-500 stroke-amber-200'
                        : 'fill-emerald-500 stroke-emerald-200'
                    }`}
                    strokeWidth="2"
                  />
                  <text y="-11" textAnchor="middle" fill="#f8fafc" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="bold">
                    🌉 {br.name}
                  </text>
                </g>
              ))}

              {/* Shelters Pins */}
              {showSheltersLayer && regionShelters.map((shl, idx) => {
                const posX = 150 + (idx * 220);
                const posY = 100 + (idx * 60);
                return (
                  <g
                    key={shl.id}
                    transform={`translate(${posX}, ${posY})`}
                    onClick={() => setSelectedFeature({ featureCategory: 'SHELTER', ...shl })}
                    className="cursor-pointer group"
                  >
                    <circle r="9" fill="#059669" stroke="#6ee7b7" strokeWidth="2" />
                    <text y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      H
                    </text>
                    <text y="20" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="Plus Jakarta Sans" fontWeight="bold">
                      {shl.name.split(' ')[0]} Hub
                    </text>
                  </g>
                );
              })}

              {/* Live Incident Markers */}
              {showIncidentsLayer && filteredIncidents.map((inc, idx) => {
                const posX = 240 + (idx * 160);
                const posY = 170 + (idx * 45);
                return (
                  <g
                    key={inc.id}
                    transform={`translate(${posX}, ${posY})`}
                    onClick={() => setSelectedFeature({ featureCategory: 'INCIDENT', ...inc })}
                    className="cursor-pointer group"
                  >
                    <polygon
                      points="0,-12 11,8 -11,8"
                      className={`transition-all ${
                        inc.severity === 'CRITICAL' ? 'fill-red-600 stroke-white' : 'fill-orange-600 stroke-white'
                      }`}
                      strokeWidth="1.5"
                    />
                    <text y="5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                      !
                    </text>
                    <text y="20" textAnchor="middle" fill="#fca5a5" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">
                      {inc.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* Feature Inspection Modal / Drawer Overlay */}
        {selectedFeature && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-slate-900/95 border border-slate-700 rounded-xl p-4 shadow-2xl backdrop-blur-md z-30">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                {selectedFeature.featureCategory}: {selectedFeature.name || selectedFeature.title || selectedFeature.id}
              </span>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedFeature.featureCategory === 'ZONE' && (
              <div className="text-xs space-y-1.5 text-slate-300">
                <div><strong>Inundation Status:</strong> <span className="text-red-400 font-bold">{selectedFeature.level}</span></div>
                <p className="text-[11px] text-slate-400">
                  Catchment runoff simulation indicates high probability of overbank flooding within 40 minutes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('prioritization')}
                    className="w-full py-1.5 bg-red-950 border border-red-700 text-red-200 text-xs font-bold rounded cursor-pointer"
                  >
                    View Active Queue for Zone →
                  </button>
                </div>
              </div>
            )}

            {selectedFeature.featureCategory === 'BRIDGE' && (
              <div className="text-xs space-y-1.5 text-slate-300">
                <div><strong>Structural Clearance:</strong> <span className="font-bold text-amber-400">{selectedFeature.status}</span></div>
                <p className="text-[11px] text-slate-400">{selectedFeature.note}</p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => alert(`Dispatch alert issued for ${selectedFeature.name}`)}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded cursor-pointer"
                  >
                    Dispatch PWD Inspection
                  </button>
                </div>
              </div>
            )}

            {selectedFeature.featureCategory === 'SHELTER' && (
              <div className="text-xs space-y-1.5 text-slate-300">
                <div><strong>Elevation:</strong> {selectedFeature.elevationM}m ASL (High-Ground Verified)</div>
                <div><strong>Capacity:</strong> {selectedFeature.capacityCurrent} / {selectedFeature.capacityTotal} persons</div>
                <div><strong>Safe Approach Route:</strong> <span className="text-emerald-400">{selectedFeature.safeRouteStatus}</span></div>
                <div><strong>Contact:</strong> {selectedFeature.contactPerson} ({selectedFeature.contactNumber})</div>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('emergency')}
                    className="w-full py-1.5 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-bold rounded cursor-pointer"
                  >
                    View Complete Shelter Guide →
                  </button>
                </div>
              </div>
            )}

            {selectedFeature.featureCategory === 'INCIDENT' && (
              <div className="text-xs space-y-1.5 text-slate-300">
                <div><strong>Severity:</strong> <span className="text-red-400 font-bold">{selectedFeature.severity}</span></div>
                <div><strong>Location:</strong> {selectedFeature.location}</div>
                <p className="text-[11px] text-slate-400">{selectedFeature.description}</p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('prioritization')}
                    className="w-full py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold rounded cursor-pointer"
                  >
                    Open Incident Dispatch Console →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map Legend Bar */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 px-1">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Critical Zone
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> High Inundation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> River Channel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Emergency Shelter
          </span>
        </div>
        <span className="font-mono text-slate-500">
          EPSG:3857 · Cartosat 10m DEM Mesh
        </span>
      </div>
    </div>
  );
};
