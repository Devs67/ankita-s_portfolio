import React from 'react';
import { X, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { ABCEntry, TherapistProfile } from '../types/behavioral';
import { calculateFunctionDistribution, calculateIntensityBreakdown } from '../utils/behavioralAnalysis';

interface PrintSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: ABCEntry[];
  profile: TherapistProfile;
}

export const PrintSummaryModal: React.FC<PrintSummaryModalProps> = ({
  isOpen,
  onClose,
  logs,
  profile,
}) => {
  if (!isOpen) return null;

  const functionDist = calculateFunctionDistribution(logs);
  const intensity = calculateIntensityBreakdown(logs);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:static"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-300 overflow-hidden my-6 print:border-none print:shadow-none print:m-0 print:max-w-none">
        {/* Modal Controls (Hidden in print) */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-teal-800" />
            <span>Multi-Disciplinary Team (MDT) / IEP Clinical Brief</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-teal-800 text-white hover:bg-teal-900 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-xs text-slate-800 print:p-6 print:space-y-4">
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                MDT Clinical Behaviour Analysis &amp; ABC Synthesis Report
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                International Baccalaureate Inclusive Student Support Department
              </p>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <div>Generated: {new Date().toLocaleDateString()}</div>
              <div>Clinician: {profile.name}{profile.credentials ? `, ${profile.credentials}` : ''}</div>
            </div>
          </div>

          {/* Aggregate Quantitative Overview */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Total Observations</span>
              <span className="text-lg font-bold text-slate-900">{logs.length} Logged Incidents</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Severe / Crisis Episodes</span>
              <span className="text-lg font-bold text-rose-700">{intensity['Severe / Crisis']} Recorded</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Primary Maintaining Function</span>
              <span className="text-lg font-bold text-teal-800">
                {functionDist[0]?.functionName} ({functionDist[0]?.percentage}%)
              </span>
            </div>
          </div>

          {/* Function Distribution Table */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              1. Functional Formulation Summary (SEAT)
            </h2>
            <table className="w-full text-left border border-slate-200 rounded text-[11px]">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="p-2 font-semibold text-slate-700">Hypothesized Function</th>
                  <th className="p-2 font-semibold text-slate-700">Observation Count</th>
                  <th className="p-2 font-semibold text-slate-700">Percentage</th>
                  <th className="p-2 font-semibold text-slate-700">Primary Replacement Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {functionDist.map((fn) => (
                  <tr key={fn.functionName}>
                    <td className="p-2 font-medium text-slate-900">{fn.functionName}</td>
                    <td className="p-2 text-slate-700">{fn.count}</td>
                    <td className="p-2 font-semibold text-slate-800">{fn.percentage}%</td>
                    <td className="p-2 text-slate-600">
                      {fn.functionName === 'Escape/Avoidance' ? 'FCT Break Card & Task Chunking' :
                       fn.functionName === 'Attention' ? 'Planned Ignoring & Non-contingent Praise' :
                       fn.functionName === 'Access to Tangible' ? 'Visual Turn Countdown & DRI' :
                       'Proprioceptive Heavy Work & Sensory Diet'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Individual ABC Logs Table */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              2. Clinical Observation Logs Table
            </h2>
            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-left text-[10px] divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2 font-semibold text-slate-700">Student &amp; Date</th>
                    <th className="p-2 font-semibold text-slate-700">Setting</th>
                    <th className="p-2 font-semibold text-slate-700">Antecedent (Sᴰ)</th>
                    <th className="p-2 font-semibold text-slate-700">Behavior (Topography)</th>
                    <th className="p-2 font-semibold text-slate-700">Consequence</th>
                    <th className="p-2 font-semibold text-slate-700">Function</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {logs.slice(0, 10).map((l) => (
                    <tr key={l.id}>
                      <td className="p-2 font-medium text-slate-900 whitespace-nowrap">
                        {l.studentCode}<br />
                        <span className="text-slate-400 text-[9px]">{l.timestamp}</span>
                      </td>
                      <td className="p-2 text-slate-600">{l.setting}</td>
                      <td className="p-2 text-slate-700 max-w-[160px] truncate">{l.antecedent}</td>
                      <td className="p-2 text-slate-800 font-medium max-w-[160px] truncate">{l.behavior}</td>
                      <td className="p-2 text-slate-600 max-w-[160px] truncate">{l.consequence}</td>
                      <td className="p-2 font-semibold text-teal-800">{l.perceivedFunction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {logs.length > 10 && (
              <p className="text-[10px] text-slate-500 italic">
                * Showing first 10 records for summary synthesis. Additional records archived in digital registry.
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500">
            <span>Prepared by: {profile.name}{profile.credentials ? `, ${profile.credentials}` : ''} ({profile.roleTitle})</span>
            <span>Confidential Educational Record (FERPA / GDPR Protected)</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
