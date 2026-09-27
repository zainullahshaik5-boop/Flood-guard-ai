import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateSituationReport } from '../services/situationReportService';
import {
  FileText,
  Copy,
  Download,
  Printer,
  CheckCircle,
  X,
  ShieldAlert
} from 'lucide-react';

export const SituationReportModal: React.FC = () => {
  const {
    activeRegion,
    incidents,
    alerts,
    currentUser,
    showSituationReportModal,
    setShowSituationReportModal
  } = useApp();

  const [copied, setCopied] = useState<boolean>(false);

  if (!showSituationReportModal) return null;

  const sitrep = generateSituationReport(
    activeRegion,
    incidents,
    alerts,
    currentUser ? `${currentUser.name} (${currentUser.roleTitle})` : 'Duty Disaster Operations Officer'
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(sitrep.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitrep.markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sitrep.reportId}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                Executive Disaster Situation Report (SitRep)
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                  {sitrep.reportId}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Generated for District Collectorate & NDRF Battalion Command
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSituationReportModal(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/40 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap select-text">
          {sitrep.markdownContent}
        </div>

        {/* Action Controls Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            Formatted in Standard Civil Protection Markdown
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Report'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download (.md)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print SitRep</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
