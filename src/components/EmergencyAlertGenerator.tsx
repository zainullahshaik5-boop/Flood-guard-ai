import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertBulletin, AlertLevel } from '../types';
import {
  Radio,
  Send,
  Eye,
  CheckCircle,
  AlertTriangle,
  Code,
  Smartphone,
  Volume2,
  Share2,
  X,
  ShieldAlert
} from 'lucide-react';

export const EmergencyAlertGenerator: React.FC = () => {
  const { activeRegion, addAlert, currentUser } = useApp();

  const [alertLevel, setAlertLevel] = useState<AlertLevel>('CRITICAL');
  const [headlineEn, setHeadlineEn] = useState<string>(
    `⚠️ ${activeRegion.risk.level} FLASH FLOOD WARNING: Cloudburst runoff in ${activeRegion.name} has caused ${activeRegion.river.name} to rise rapidly (+${activeRegion.river.rateOfRise} cm/h). Riverbank and low-lying settlements must evacuate to designated relief shelters immediately. Avoid bridges and gorges.`
  );
  const [headlineHi, setHeadlineHi] = useState<string>(
    `⚠️ आपातकालीन चेतावनी: ${activeRegion.name} में अत्यधिक वर्षा के कारण नदी का जलस्तर खतरे के निशान की ओर बढ़ रहा है। निचले क्षेत्रों के निवासी तुरंत सुरक्षित ऊंचाई वाले आश्रयों में जाएं।`
  );
  const [selectedChannels, setSelectedChannels] = useState<string[]>([
    'CELL_BROADCAST',
    'SIREN',
    'WHATSAPP',
    'RADIO'
  ]);
  const [previewTab, setPreviewTab] = useState<'SMS' | 'CAP_XML' | 'SIREN' | 'WHATSAPP'>('SMS');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [requiresConfirmation, setRequiresConfirmation] = useState<boolean>(false);

  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const capXmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>CAP-IN-${activeRegion.id.toUpperCase()}-${Date.now()}</identifier>
  <sender>${currentUser?.organization || 'State Disaster Management Authority'}</sender>
  <sent>${new Date().toISOString()}</sent>
  <status>Actual</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <info>
    <category>Met</category>
    <event>Flash Flood Warning</event>
    <urgency>Immediate</urgency>
    <severity>${alertLevel}</severity>
    <certainty>Observed</certainty>
    <eventCode><valueName>SAME</valueName><value>FFW</value></eventCode>
    <headline>${headlineEn}</headline>
    <description>Rainfall rate: ${activeRegion.rainfall.currentRate} mm/h. River gauge: ${activeRegion.river.currentLevel}m. Soil saturation: ${activeRegion.soil.moisturePercent}%.</description>
    <area>
      <areaDesc>${activeRegion.name}, ${activeRegion.state}</areaDesc>
      <circle>${activeRegion.coordinates.lat},${activeRegion.coordinates.lng},12.0</circle>
    </area>
  </info>
</alert>`;

  const handleBroadcast = () => {
    const newAlert: AlertBulletin = {
      id: `ALT-MANUAL-${Date.now().toString().slice(-4)}`,
      title: `${alertLevel} FLASH FLOOD ALERT - ${activeRegion.name.toUpperCase()}`,
      level: alertLevel,
      issuedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
      affectedBasin: activeRegion.basin,
      headlineEn,
      headlineHi,
      detailedInstructions: 'Evacuate riverbank lowlands. Move to municipal high-ground relief centers.',
      channels: selectedChannels as any,
      issuedBy: currentUser ? `${currentUser.name} (${currentUser.roleTitle})` : 'Disaster Management Authority',
      status: 'ACTIVE'
    };

    addAlert(newAlert);
    setIsDispatched(true);
    setRequiresConfirmation(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-950 border border-orange-800 flex items-center justify-center">
            <Radio className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              AI Emergency Alert Generator & Broadcaster
            </h3>
            <div className="text-xs text-slate-400">
              Disaster Operations Center · Common Alerting Protocol (CAP) Architecture
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
          HUMAN-IN-THE-LOOP ACTIVE
        </span>
      </div>

      {/* Alert Severity Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 block">
          1. Select Regulatory Alert Severity Level:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { level: 'INFORMATION' as AlertLevel, color: 'border-blue-700 bg-blue-950/40 text-blue-300' },
            { level: 'WATCH' as AlertLevel, color: 'border-amber-700 bg-amber-950/40 text-amber-300' },
            { level: 'WARNING' as AlertLevel, color: 'border-orange-700 bg-orange-950/40 text-orange-300' },
            { level: 'CRITICAL' as AlertLevel, color: 'border-red-700 bg-red-950/40 text-red-300' }
          ].map(lvl => (
            <button
              key={lvl.level}
              type="button"
              onClick={() => setAlertLevel(lvl.level)}
              className={`p-2.5 rounded-xl border text-center font-bold text-xs cursor-pointer transition-all ${
                alertLevel === lvl.level
                  ? `${lvl.color} ring-1 ring-white/20`
                  : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {lvl.level}
            </button>
          ))}
        </div>
      </div>

      {/* Bilingual Alert Text Inputs */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            2. Public Broadcast Headline (English):
          </label>
          <textarea
            rows={3}
            value={headlineEn}
            onChange={(e) => setHeadlineEn(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            3. Regional Language Broadcast (Hindi / Local Catchment Dialect):
          </label>
          <textarea
            rows={2}
            value={headlineHi}
            onChange={(e) => setHeadlineHi(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Broadcast Distribution Channels */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 block">
          4. Select Emergency Dispatch Channels:
        </label>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'CELL_BROADCAST', label: 'Cell Broadcast (Geo-Targeted Tower SMS)', icon: Smartphone },
            { id: 'SIREN', label: 'Riverbank Warning Sirens & PA Audio', icon: Volume2 },
            { id: 'WHATSAPP', label: 'Community Volunteer WhatsApp Grid', icon: Share2 },
            { id: 'RADIO', label: 'AIR FM 101.4 Civil Alert Radio', icon: Radio },
            { id: 'CAP_XML', label: 'NDMA Central CAP XML Gateway', icon: Code }
          ].map(chan => {
            const isSelected = selectedChannels.includes(chan.id);
            return (
              <button
                key={chan.id}
                type="button"
                onClick={() => toggleChannel(chan.id)}
                className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <chan.icon className="w-3.5 h-3.5" />
                {chan.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Channel Transmission Previews
          </span>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg text-[11px]">
            {(['SMS', 'CAP_XML', 'SIREN', 'WHATSAPP'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setPreviewTab(tab)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  previewTab === tab ? 'bg-cyan-900 text-white font-bold' : 'text-slate-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Channel Previews */}
        {previewTab === 'SMS' && (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs shadow-lg space-y-1">
            <div className="font-bold text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
              EMERGENCY CELL BROADCAST: {alertLevel}
            </div>
            <p className="text-slate-200 leading-relaxed font-sans">{headlineEn}</p>
            <div className="text-[10px] text-slate-500 pt-1 font-mono">
              Sent via Geo-Fenced GSM/LTE towers within 15km of {activeRegion.name}.
            </div>
          </div>
        )}

        {previewTab === 'CAP_XML' && (
          <pre className="text-[11px] font-mono text-cyan-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto max-h-48 border border-slate-800">
            {capXmlPreview}
          </pre>
        )}

        {previewTab === 'SIREN' && (
          <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              Automated Riverbank Acoustic Warning Pattern:
            </div>
            <p className="text-slate-300 font-mono text-[11px]">
              [SIREN TONE: 3x 15-second wailing crest] → "ATTENTION: ALAKNANDA RIVER AT VISHNUPRAYAG GAUGE IS APPROACHING CRITICAL DANGER. EVACUATE RIVERBED TERRACES IMMEDIATELY TO HIGHER GROUND."
            </p>
          </div>
        )}

        {previewTab === 'WHATSAPP' && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs space-y-1">
            <div className="font-bold text-emerald-300">
              🟢 FLOOD GUARD COMMUNITY DISASTER ALERT
            </div>
            <p className="text-slate-200 text-[11px] leading-relaxed">
              {headlineEn}
            </p>
            <div className="text-[10px] text-emerald-400/80 pt-1">
              Forwarded to 48 Gram Panchayats and Village Disaster Teams.
            </div>
          </div>
        )}
      </div>

      {/* Safety Notice & Authorization */}
      <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl text-[11px] text-amber-300 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Safety Protocol:</strong> Official emergency declarations must be verified by the duty Disaster Operations Officer before transmission. System never broadcasts alerts automatically without affirmative human authorization.
        </span>
      </div>

      {/* Confirmation & Dispatch Controls */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {isDispatched ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            Alert successfully dispatched to {selectedChannels.length} emergency channels.
          </div>
        ) : (
          <span className="text-[11px] text-slate-400">
            Ready to broadcast across {activeRegion.name} catchment.
          </span>
        )}

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {requiresConfirmation ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setRequiresConfirmation(false)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBroadcast}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                Confirm & Issue Official Warning
              </button>
            </div>
          ) : (
            <button
              onClick={() => setRequiresConfirmation(true)}
              disabled={isDispatched}
              className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-950 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              {isDispatched ? 'Warning Broadcasted' : 'Authorize & Broadcast Warning'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
