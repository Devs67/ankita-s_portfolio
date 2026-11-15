import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Layers, 
  Activity, 
  Filter,
  Info
} from 'lucide-react';
import { ABCEntry, IBProgramme } from '../types/behavioral';
import { 
  generateTimelineTrendData, 
  generateTimeOfDayDistribution,
  TimelineDataPoint 
} from '../utils/behavioralAnalysis';

interface BehaviorTrendDashboardProps {
  logs: ABCEntry[];
  onOpenGlossary?: (acronym?: string) => void;
}

type ViewMode = 'function' | 'intensity' | 'programme' | 'routine';

export const BehaviorTrendDashboard: React.FC<BehaviorTrendDashboardProps> = ({
  logs,
  onOpenGlossary
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('function');
  const [selectedProgramme, setSelectedProgramme] = useState<'ALL' | IBProgramme>('ALL');

  // Filter logs if programme selected
  const filteredLogs = useMemo(() => {
    if (selectedProgramme === 'ALL') return logs;
    return logs.filter(l => l.programme === selectedProgramme);
  }, [logs, selectedProgramme]);

  // Aggregate timeline trend
  const timelineData: TimelineDataPoint[] = useMemo(() => {
    return generateTimelineTrendData(filteredLogs);
  }, [filteredLogs]);

  // Aggregate time-of-day distribution
  const timeOfDayData = useMemo(() => {
    return generateTimeOfDayDistribution(filteredLogs);
  }, [filteredLogs]);

  // Quick statistics
  const stats = useMemo(() => {
    const total = filteredLogs.length;
    if (total === 0) {
      return {
        total: 0,
        primaryFunction: 'N/A',
        peakRoutine: 'N/A',
        crisisRate: 0,
        activeDays: 0
      };
    }

    // Function counts
    const fnCounts: Record<string, number> = {};
    let crisisCount = 0;
    filteredLogs.forEach(l => {
      fnCounts[l.perceivedFunction] = (fnCounts[l.perceivedFunction] || 0) + 1;
      if (l.intensity === 'Severe / Crisis') crisisCount++;
    });

    let topFn = 'Escape/Avoidance';
    let topFnCount = 0;
    Object.entries(fnCounts).forEach(([fn, cnt]) => {
      if (cnt > topFnCount) {
        topFnCount = cnt;
        topFn = fn;
      }
    });

    // Peak time of day
    let peakSlot = timeOfDayData[0]?.slot.split('&')[0].trim() || 'N/A';
    let peakSlotCount = -1;
    timeOfDayData.forEach(s => {
      if (s.count > peakSlotCount) {
        peakSlotCount = s.count;
        peakSlot = s.slot.split('&')[0].trim();
      }
    });

    return {
      total,
      primaryFunction: `${topFn.split('/')[0]} (${Math.round((topFnCount / total) * 100)}%)`,
      peakRoutine: peakSlot,
      crisisRate: Math.round((crisisCount / total) * 100),
      activeDays: timelineData.length
    };
  }, [filteredLogs, timelineData, timeOfDayData]);

  return (
    <section 
      aria-labelledby="behavior-trend-heading"
      className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-teal-700" />
            <span>Longitudinal Clinical Tracking</span>
            <span aria-hidden="true">·</span>
            <span>Empirical ABA Frequency</span>
          </div>
          <h2 id="behavior-trend-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Behavior Trend &amp; Frequency Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Visualizing chronological incidence across behavioral functions (SEAT), intensity gradients, and school schedule intervals to assess BIP intervention fidelity.
          </p>
        </div>

        {/* Programme Filter */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Cohort:</span>
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
            {(['ALL', 'PYP', 'MYP', 'DP'] as const).map(prog => (
              <button
                key={prog}
                onClick={() => setSelectedProgramme(prog)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedProgramme === prog
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {prog}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Observed Incidents</span>
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            {stats.total} Logs
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Across {stats.activeDays} logged observation days
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Primary Function</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 truncate">
            {stats.primaryFunction}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Highest frequency antecedent driver
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Peak Disruption Window</span>
            <Clock className="w-3.5 h-3.5 text-indigo-700" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1 truncate">
            {stats.peakRoutine}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Key target for environmental priming
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Severe / Crisis Ratio</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
          </div>
          <div className="text-xl font-bold text-rose-700 mt-1">
            {stats.crisisRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Requires active de-escalation protocol
          </div>
        </div>
      </div>

      {/* Chart View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setViewMode('function')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              viewMode === 'function'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Function Trajectory (SEAT)
          </button>
          <button
            onClick={() => setViewMode('intensity')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              viewMode === 'intensity'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Intensity Tier Volume
          </button>
          <button
            onClick={() => setViewMode('routine')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              viewMode === 'routine'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            School Day Timetable
          </button>
          <button
            onClick={() => setViewMode('programme')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              viewMode === 'programme'
                ? 'bg-white text-slate-900 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IB Programme Continuum
          </button>
        </div>

        {onOpenGlossary && (
          <button
            onClick={() => onOpenGlossary('SEAT')}
            className="text-xs text-teal-800 hover:text-teal-950 font-medium underline inline-flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Understanding SEAT Functions</span>
          </button>
        )}
      </div>

      {/* Primary Chart Area */}
      <div className="w-full bg-slate-50/50 rounded-lg p-3 sm:p-4 border border-slate-200/80 min-h-[340px]">
        {timelineData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-sm">
            <Activity className="w-8 h-8 mb-2 opacity-40" />
            <span>No observation logs found for the selected cohort filter.</span>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'function' ? (
                /* Function Trajectory - Stacked Area Chart */
                <AreaChart data={timelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEscape" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorAttention" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorTangible" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorSensory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      border: 'none', 
                      color: '#f8fafc',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="escape"
                    name="Escape / Avoidance"
                    stackId="1"
                    stroke="#d97706"
                    fill="url(#colorEscape)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="attention"
                    name="Attention"
                    stackId="1"
                    stroke="#0d9488"
                    fill="url(#colorAttention)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="tangible"
                    name="Access to Tangibles"
                    stackId="1"
                    stroke="#4f46e5"
                    fill="url(#colorTangible)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="sensory"
                    name="Automatic / Sensory"
                    stackId="1"
                    stroke="#e11d48"
                    fill="url(#colorSensory)"
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : viewMode === 'intensity' ? (
                /* Intensity Breakdown - Stacked Bar Chart */
                <BarChart data={timelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      border: 'none', 
                      color: '#f8fafc',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="mild" name="Mild (Low Disruption)" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="moderate" name="Moderate (Instructional Interruption)" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="crisis" name="Severe / Crisis (Safety/Elopement)" stackId="a" fill="#e11d48" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : viewMode === 'programme' ? (
                /* IB Programme Continuum - Stacked Bar Chart */
                <BarChart data={timelineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '8px', 
                      border: 'none', 
                      color: '#f8fafc',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="pyp" name="PYP Primary (Ages 3-12)" stackId="p" fill="#0d9488" />
                  <Bar dataKey="myp" name="MYP Middle Years (Ages 11-16)" stackId="p" fill="#6366f1" />
                  <Bar dataKey="dp" name="DP Diploma Programme (Ages 16-19)" stackId="p" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                /* Time of Day Distribution - Bar Chart */
                <BarChart 
                  data={timeOfDayData} 
                  margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="timeRange" 
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs space-y-1 shadow-lg border border-slate-700">
                            <div className="font-bold text-teal-300">{data.slot}</div>
                            <div className="text-slate-300">Timetable Window: {data.timeRange}</div>
                            <div className="font-semibold">{data.count} Incidents ({data.percentage}% of caseload)</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    name="Incident Volume by Timetable Period" 
                    fill="#0f766e" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Clinical Interpretation Footer */}
      <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-100 flex items-start gap-3 text-xs text-slate-700">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-teal-950">
            Clinical Longitudinal Analysis &amp; Differential Reinforcement Trajectory:
          </span>
          <p className="leading-relaxed">
            Data reflects concentrated spikes during open-ended academic inquiry blocks and high-stakes Diploma Programme timed assessments. Introduction of visual countdown timers, pre-correction antecedent scripts, and Differential Reinforcement of Alternative behavior (DRA) correlates with a measurable decline in high-intensity crisis incidents over the observation cycle.
          </p>
        </div>
      </div>
    </section>
  );
};
