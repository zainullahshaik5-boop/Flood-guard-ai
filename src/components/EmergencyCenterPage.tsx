import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_CONTACTS } from '../data/mockData';
import {
  LifeBuoy,
  PhoneCall,
  MapPin,
  CheckSquare,
  Square,
  AlertTriangle,
  ShieldAlert,
  Send,
  ExternalLink,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';

export const EmergencyCenterPage: React.FC = () => {
  const { shelters, activeRegion, setActiveTab } = useApp();

  const [sosSent, setSosSent] = useState<boolean>(false);
  const [sosLocation, setSosLocation] = useState<string>(activeRegion.name);
  const [sosPeopleCount, setSosPeopleCount] = useState<number>(2);

  // 72-Hour Disaster Go-Bag interactive checklist state
  const [checklist, setChecklist] = useState<{ id: string; label: string; checked: boolean }[]>([
    { id: 'water', label: 'Sealed drinking water (3L per person) + purification tablets', checked: true },
    { id: 'food', label: 'High-energy non-perishable rations (jaggery, roasted chana, bars)', checked: true },
    { id: 'torch', label: 'Waterproof high-lumen torch / headlamp with spare batteries', checked: false },
    { id: 'radio', label: 'Battery or hand-crank AM/FM radio for civil disaster updates', checked: false },
    { id: 'docs', label: 'Waterproof pouch with Aadhaar, land deeds, and prescriptions', checked: true },
    { id: 'meds', label: 'Essential personal prescription medications (7-day supply)', checked: false },
    { id: 'whistle', label: 'High-decibel emergency whistle for acoustic rescue signaling', checked: false },
    { id: 'firstaid', label: 'First-aid kit: sterile gauze, tourniquet, antiseptic solution', checked: false }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleSendSos = (e: React.FormEvent) => {
    e.preventDefault();
    setSosSent(true);
  };

  const checkedCount = checklist.filter(c => c.checked).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-900/80 border border-red-700 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5 text-red-300 animate-pulse" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Civil Protection & Emergency Operations Center
            </h2>
          </div>
          <p className="text-xs text-red-200/90 mt-1 max-w-2xl leading-relaxed">
            Direct access to verified high-ground relief camps, national search & rescue hotlines, and instant SOS distress beacons for {activeRegion.name}.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('reporter')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Report Incident →
          </button>
        </div>
      </div>

      {/* Main Grid: SOS Beacon & Hotlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Helplines */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                Verified Disaster Response Helplines
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">24x7 TOLL FREE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EMERGENCY_CONTACTS.map((contact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">{contact.service}</div>
                  <div className="text-lg font-extrabold font-mono text-cyan-300">
                    <a href={`tel:${contact.number}`} className="hover:underline flex items-center gap-1.5">
                      {contact.number}
                    </a>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-snug">{contact.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Configured numbers represent official NDMA and state disaster helplines.</span>
            </div>
          </div>

          {/* 72-Hour Disaster Go-Bag Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  72-Hour Disaster Go-Bag Checklist
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                  {checkedCount} / {checklist.length} Packed
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-950 hover:bg-slate-950/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={item.checked ? 'text-slate-400 line-through' : 'text-slate-200 font-medium'}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: SOS Distress Beacon & Emergency Shelters */}
        <div className="lg:col-span-6 space-y-4">
          {/* Emergency SOS Distress Beacon */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                Civil Emergency SOS Distress Beacon
              </h3>
              <span className="text-[10px] font-mono text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                PRIORITY RESCUE
              </span>
            </div>

            {sosSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 text-xs space-y-2">
                <div className="font-bold flex items-center gap-2 text-sm text-emerald-300">
                  <span>✓</span> SOS DISTRESS BEACON ACTIVE
                </div>
                <p className="leading-relaxed">
                  Your coordinates and emergency dispatch signal have been registered in the District Operations Room. NDRF Field Unit Alpha has been alerted. Remain on higher ground.
                </p>
                <button
                  onClick={() => setSosSent(false)}
                  className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded text-xs cursor-pointer"
                >
                  Send Another Distress Update
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendSos} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Your Landmark / Village Sector:
                  </label>
                  <input
                    type="text"
                    value={sosLocation}
                    onChange={(e) => setSosLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Number of People Stranded / Evacuating:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={sosPeopleCount}
                    onChange={(e) => setSosPeopleCount(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Transmit SOS to NDRF Battalion & DEOC
                </button>
              </form>
            )}
          </div>

          {/* Verified Nearby High-Ground Shelters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Verified High-Ground Relief Shelters
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {shelters.length} Configured Hubs
              </span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {shelters.map(shelter => (
                <div key={shelter.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-white">{shelter.name}</div>
                      <div className="text-[11px] text-cyan-400">{shelter.region}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {shelter.elevationM}m ASL
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div>
                      Occupancy: <strong className="text-slate-200">{shelter.capacityCurrent} / {shelter.capacityTotal}</strong>
                    </div>
                    <div>
                      Road Status: <strong className="text-emerald-400">{shelter.safeRouteStatus}</strong>
                    </div>
                    <div>
                      Medical Post: <strong className="text-slate-200">{shelter.hasMedicalPost ? 'Available' : 'None'}</strong>
                    </div>
                    <div>
                      Rations: <strong className="text-slate-200">{shelter.foodSuppliesDays} days buffer</strong>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-800/80">
                    <span className="text-slate-400">Contact: {shelter.contactPerson}</span>
                    <a href={`tel:${shelter.contactNumber}`} className="text-cyan-400 font-mono hover:underline">
                      {shelter.contactNumber}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
