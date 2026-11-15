import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  Plus, 
  Eye, 
  Clock, 
  MapPin, 
  AlertCircle,
  HelpCircle,
  X,
  FileSpreadsheet,
  Upload
} from 'lucide-react';
import { ABCEntry, ABCFilterState, BehaviorFunction, BehaviorIntensity } from '../types/behavioral';
import { 
  calculateFunctionDistribution, 
  calculateIntensityBreakdown, 
  calculateProgrammeBreakdown, 
  filterABCLogs 
} from '../utils/behavioralAnalysis';

interface ABCRegistryProps {
  logs: ABCEntry[];
  onOpenNewABC: () => void;
  onOpenWordUpload?: () => void;
  onOpenGlossary: (acronym?: string) => void;
  onOpenPrintSummary: (filteredLogs: ABCEntry[]) => void;
}

export const ABCRegistry: React.FC<ABCRegistryProps> = ({
  logs,
  onOpenNewABC,
  onOpenWordUpload,
  onOpenGlossary,
  onOpenPrintSummary,
}) => {
  const [filterState, setFilterState] = useState<ABCFilterState>({
    searchQuery: '',
    programme: 'all',
    functionType: 'all',
    intensity: 'all',
    setting: 'all'
  });

  const [selectedLog, setSelectedLog] = useState<ABCEntry | null>(null);

  const filteredLogs = useMemo(() => {
    return filterABCLogs(logs, filterState);
  }, [logs, filterState]);

  const functionDist = useMemo(() => {
    return calculateFunctionDistribution(filteredLogs);
  }, [filteredLogs]);

  const intensityBreakdown = useMemo(() => {
    return calculateIntensityBreakdown(filteredLogs);
  }, [filteredLogs]);

  const programmeBreakdown = useMemo(() => {
    return calculateProgrammeBreakdown(filteredLogs);
  }, [filteredLogs]);

  const resetFilters = () => {
    setFilterState({
      searchQuery: '',
      programme: 'all',
      functionType: 'all',
      intensity: 'all',
      setting: 'all'
    });
  };

  const hasActiveFilters = 
    filterState.searchQuery !== '' || 
    filterState.programme !== 'all' || 
    filterState.functionType !== 'all' || 
    filterState.intensity !== 'all' || 
    filterState.setting !== 'all';

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <span>Applied Behavior Analysis (ABA)</span>
            <span aria-hidden="true">·</span>
            <span>Three-Term Contingency Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Antecedent · Behaviour · Consequence (ABC) Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Real-time clinical observation repository tracking behavioral topography, operational definitions, discriminative stimuli (Sᴰ), maintaining reinforcers, and replacement protocols across the IB educational continuum.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onOpenWordUpload && (
            <button
              onClick={onOpenWordUpload}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-teal-900 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors shadow-xs"
              title="Import ABC data from a Word (.docx) document"
            >
              <Upload className="w-4 h-4 text-teal-700" />
              <span>Import Word Doc</span>
            </button>
          )}

          <button
            onClick={() => onOpenPrintSummary(filteredLogs)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>MDT Clinical Summary</span>
          </button>

          <button
            onClick={onOpenNewABC}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-teal-800 hover:bg-teal-900 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Log Observation</span>
          </button>
        </div>
      </div>

      {/* Visual Behavioral Analytics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        {/* Function Distribution (SEAT) */}
        <div className="space-y-2 md:border-r md:border-slate-200 md:pr-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Perceived Function (SEAT)
            </span>
            <button
              onClick={() => onOpenGlossary('SEAT')}
              className="text-xs text-teal-700 hover:underline inline-flex items-center gap-1"
            >
              <span>What is SEAT?</span>
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1.5">
            {functionDist.map((fn) => (
              <div key={fn.functionName} className="text-xs space-y-0.5">
                <div className="flex justify-between text-slate-700">
                  <span className="truncate pr-2">{fn.functionName}</span>
                  <span className="font-semibold text-slate-900">{fn.count} ({fn.percentage}%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      fn.functionName === 'Escape/Avoidance' ? 'bg-amber-600' :
                      fn.functionName === 'Attention' ? 'bg-teal-600' :
                      fn.functionName === 'Access to Tangible' ? 'bg-indigo-600' :
                      fn.functionName === 'Automatic/Sensory' ? 'bg-rose-600' : 'bg-slate-500'
                    }`}
                    style={{ width: `${fn.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intensity Breakdown */}
        <div className="space-y-2 md:border-r md:border-slate-200 md:px-4">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Clinical Intensity Distribution
          </span>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-center">
              <span className="text-xs text-emerald-800 font-medium block">Mild</span>
              <span className="text-xl font-bold text-emerald-900 mt-1 block">
                {intensityBreakdown.Mild}
              </span>
              <span className="text-slate-500 text-[10px]">Tolerable in situ</span>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-center">
              <span className="text-xs text-amber-800 font-medium block">Moderate</span>
              <span className="text-xl font-bold text-amber-900 mt-1 block">
                {intensityBreakdown.Moderate}
              </span>
              <span className="text-slate-500 text-[10px]">Instruction disrupted</span>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200/60 text-center">
              <span className="text-xs text-rose-800 font-medium block">Crisis</span>
              <span className="text-xl font-bold text-rose-900 mt-1 block">
                {intensityBreakdown['Severe / Crisis']}
              </span>
              <span className="text-slate-500 text-[10px]">Safety risk / de-escalation</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Standardized per BACB crisis thresholds and IB student wellbeing policies.
          </p>
        </div>

        {/* IB Programme Spread */}
        <div className="space-y-2 md:pl-4">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Programme Caseload Spread
          </span>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">Primary Years (PYP)</span>
              <span className="font-bold text-slate-900">{programmeBreakdown.PYP} observations</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">Middle Years (MYP)</span>
              <span className="font-bold text-slate-900">{programmeBreakdown.MYP} observations</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">Diploma Programme (DP)</span>
              <span className="font-bold text-slate-900">{programmeBreakdown.DP} observations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => setFilterState({ ...filterState, searchQuery: e.target.value })}
              placeholder="Search by student, antecedent (Sᴰ), behavior topography, consequence, or setting..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
            />
          </div>

          {/* Reset button if filtered */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        {/* Filter Dropdowns / Segmented selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
          {/* IB Programme */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              IB Programme
            </label>
            <select
              value={filterState.programme}
              onChange={(e) => setFilterState({ ...filterState, programme: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            >
              <option value="all">All Programmes</option>
              <option value="PYP">Primary Years (PYP)</option>
              <option value="MYP">Middle Years (MYP)</option>
              <option value="DP">Diploma Programme (DP)</option>
            </select>
          </div>

          {/* Perceived Function */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Behavior Function
            </label>
            <select
              value={filterState.functionType}
              onChange={(e) => setFilterState({ ...filterState, functionType: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            >
              <option value="all">All Functions</option>
              <option value="Escape/Avoidance">Escape / Avoidance</option>
              <option value="Attention">Attention Seeking</option>
              <option value="Access to Tangible">Access to Tangible</option>
              <option value="Automatic/Sensory">Automatic / Sensory</option>
              <option value="Multiple / Combined">Multiple / Combined</option>
            </select>
          </div>

          {/* Intensity */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Intensity Tier
            </label>
            <select
              value={filterState.intensity}
              onChange={(e) => setFilterState({ ...filterState, intensity: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            >
              <option value="all">All Intensities</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe / Crisis">Severe / Crisis</option>
            </select>
          </div>

          {/* Setting */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              School Environment
            </label>
            <select
              value={filterState.setting}
              onChange={(e) => setFilterState({ ...filterState, setting: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            >
              <option value="all">All School Settings</option>
              <option value="Inquiry Classroom">Inquiry Classroom</option>
              <option value="Science & Design Lab">Science &amp; Design Lab</option>
              <option value="Hallway & Locker Bay">Hallway &amp; Locker Bay</option>
              <option value="Cafeteria & Dining Hall">Cafeteria &amp; Dining Hall</option>
              <option value="Outdoor Recess & Sports Field">Outdoor Recess &amp; Field</option>
              <option value="Exam & Assessment Hall">Exam &amp; Assessment Hall</option>
              <option value="Library & Quiet Study">Library &amp; Study</option>
              <option value="School Bus & Transitions">School Bus &amp; Transitions</option>
            </select>
          </div>
        </div>
      </div>

      {/* ABC Records List / Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredLogs.length}</strong> of{' '}
            <strong className="text-slate-900">{logs.length}</strong> clinical ABC entries
          </span>
          <span className="hidden sm:inline">
            De-identified in accordance with clinical privacy standards
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-semibold text-slate-800 text-sm">No ABC observations match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or resetting the programme, function, or setting filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((entry) => (
              <article
                key={entry.id}
                className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
              >
                {/* Entry Header: Metadata text with typographic separators (anti-slop clean metadata) */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 text-sm">
                      {entry.studentCode}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="font-semibold text-indigo-700">
                      IB {entry.programme}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {entry.setting}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {entry.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Function:</span>
                      <span className={`font-semibold ${
                        entry.perceivedFunction === 'Escape/Avoidance' ? 'text-amber-700' :
                        entry.perceivedFunction === 'Attention' ? 'text-teal-700' :
                        entry.perceivedFunction === 'Access to Tangible' ? 'text-indigo-700' :
                        'text-rose-700'
                      }`}>
                        {entry.perceivedFunction}
                      </span>
                    </div>

                    <span className="text-slate-300" aria-hidden="true">·</span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Intensity:</span>
                      <span className={`font-semibold ${
                        entry.intensity === 'Mild' ? 'text-emerald-700' :
                        entry.intensity === 'Moderate' ? 'text-amber-700' : 'text-rose-700'
                      }`}>
                        {entry.intensity}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedLog(entry)}
                      className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                      title="Inspect complete clinical ABC log"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>

                {/* The 3-Term Contingency (Antecedent - Behavior - Consequence) Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                  {/* Antecedent (A) */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                        A · Antecedent (Sᴰ)
                      </span>
                      <button
                        onClick={() => onOpenGlossary('SD')}
                        className="text-[10px] text-teal-700 hover:underline"
                      >
                        Sᴰ Definition
                      </button>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {entry.antecedent}
                    </p>
                    {entry.settingEvents && (
                      <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                        <strong className="not-italic text-slate-600 font-medium">Setting Event: </strong>
                        {entry.settingEvents}
                      </p>
                    )}
                  </div>

                  {/* Behavior (B) */}
                  <div className="p-3 rounded-lg bg-amber-50/40 border border-amber-200/60 space-y-1">
                    <span className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">
                      B · Target Behaviour (Topography)
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {entry.behavior}
                    </p>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-amber-200/50 flex items-center justify-between">
                      <span>Duration: {entry.durationMinutes} min</span>
                      <span className="text-amber-800 font-semibold">{entry.intensity}</span>
                    </div>
                  </div>

                  {/* Consequence (C) */}
                  <div className="p-3 rounded-lg bg-teal-50/40 border border-teal-200/60 space-y-1">
                    <span className="font-bold text-teal-900 uppercase tracking-wide text-[11px]">
                      C · Maintaining Consequence
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {entry.consequence}
                    </p>
                    <div className="text-[11px] text-teal-900 pt-1 border-t border-teal-200/50">
                      <span className="font-semibold">Maintaining Function: </span>
                      {entry.perceivedFunction}
                    </div>
                  </div>
                </div>

                {/* Replacement Behavior & Consequence Intervention Applied */}
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-teal-400">Taught Replacement Behavior (FCT):</span>
                      <button 
                        onClick={() => onOpenGlossary('FCT')}
                        className="text-[10px] text-slate-400 hover:text-white underline"
                      >
                        [What is FCT?]
                      </button>
                    </div>
                    <p className="text-slate-300">
                      {entry.replacementBehavior}
                    </p>
                  </div>

                  <div className="border-t sm:border-t-0 sm:border-l border-slate-700 pt-2 sm:pt-0 sm:pl-3 space-y-0.5 shrink-0 max-w-sm">
                    <span className="font-bold text-indigo-300">Clinical Intervention Applied:</span>
                    <p className="text-slate-300 text-[11px]">
                      {entry.consequenceInterventionApplied}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Modal View */}
      {selectedLog && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog" 
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                  <span>Detailed Clinical Observation Protocol</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedLog.timestamp}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedLog.studentCode} ({selectedLog.programme})
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Setting</span>
                  <span className="font-semibold text-slate-800">{selectedLog.setting}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Perceived Function</span>
                  <span className="font-semibold text-teal-800">{selectedLog.perceivedFunction}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Intensity Tier</span>
                  <span className="font-semibold text-slate-800">{selectedLog.intensity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-semibold uppercase">Episode Duration</span>
                  <span className="font-semibold text-slate-800">{selectedLog.durationMinutes} minutes</span>
                </div>
              </div>

              {/* Setting Event */}
              {selectedLog.settingEvents && (
                <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 space-y-1">
                  <span className="font-bold text-amber-900 uppercase text-[10px] tracking-wide">
                    Setting Events &amp; Motivating Operations (MO / EO)
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedLog.settingEvents}
                  </p>
                </div>
              )}

              {/* Three Term Contingency Details */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block uppercase text-[11px] tracking-wide">
                    1. Antecedent Stimulus (Sᴰ / Demand Presentation)
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedLog.antecedent}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-amber-300 bg-amber-50/30 space-y-1">
                  <span className="font-bold text-amber-950 block uppercase text-[11px] tracking-wide">
                    2. Observable Behavior (Operational Topography)
                  </span>
                  <p className="text-slate-900 leading-relaxed font-medium">
                    {selectedLog.behavior}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-teal-300 bg-teal-50/30 space-y-1">
                  <span className="font-bold text-teal-950 block uppercase text-[11px] tracking-wide">
                    3. Environmental Consequence (Immediate Environmental Reaction)
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedLog.consequence}
                  </p>
                </div>
              </div>

              {/* Clinical Solutions */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 space-y-1">
                  <span className="font-bold text-teal-400 block uppercase text-[11px] tracking-wide">
                    Functional Alternative / Replacement Behavior (FCT)
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedLog.replacementBehavior}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-300 space-y-1">
                  <span className="font-bold text-slate-800 block uppercase text-[11px] tracking-wide">
                    Intervention Executed by Therapist / LSA
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedLog.consequenceInterventionApplied}
                  </p>
                </div>

                {selectedLog.notes && (
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-700 block uppercase text-[11px] tracking-wide">
                      Therapist Clinical Reflection &amp; Follow-up Action
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedLog.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
