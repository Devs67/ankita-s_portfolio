import React, { useState } from 'react';
import { 
  BookOpen, 
  TrendingDown, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Compass, 
  Users, 
  ShieldAlert, 
  Lightbulb, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { CaseStudy, IBProgramme } from '../types/behavioral';

interface CaseStudiesViewProps {
  caseStudies: CaseStudy[];
  onOpenGlossary: (acronym?: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({
  caseStudies,
  onOpenGlossary,
}) => {
  const [selectedProgramme, setSelectedProgramme] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(caseStudies[0]?.id || null);

  const categories = [
    'all',
    'Executive Functioning & Task Refusal',
    'Affective Storms & Emotional Dysregulation',
    'Interpersonal Friction & Social Communication',
    'Sensory Modulation & Motor Agitation',
    'High-Stakes IB Academic Anxiety & Perfectionism'
  ];

  const filteredCases = caseStudies.filter((c) => {
    if (selectedProgramme !== 'all' && c.programme !== selectedProgramme) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedCaseId(expandedCaseId === id ? null : id);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-teal-800">
          <span>Evidence-Based Clinical Practice</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>De-identified School Case Portfolio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Clinical Case Studies &amp; Functional Behavior Assessments (FBA)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
          Comprehensive, real-life behavioural challenges managed across the International Baccalaureate continuum—integrating empirical ABA functional hypotheses, antecedent modifications, replacement communication (FCT), and measurable outcome data.
        </p>
      </div>

      {/* Filter Bar (Functional Segmented Controls) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Programme Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
            {['all', 'PYP', 'MYP', 'DP'].map((prog) => (
              <button
                key={prog}
                onClick={() => setSelectedProgramme(prog)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedProgramme === prog
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {prog === 'all' ? 'All Programmes' : prog === 'PYP' ? 'Primary (PYP)' : prog === 'MYP' ? 'Middle Years (MYP)' : 'Diploma (DP)'}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{filteredCases.length}</strong> of {caseStudies.length} case studies
          </div>
        </div>

        {/* Category Filter Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-semibold text-slate-500 shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-teal-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Behavioral Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies List */}
      <div className="space-y-4">
        {filteredCases.map((cs) => {
          const isExpanded = expandedCaseId === cs.id;

          return (
            <article
              key={cs.id}
              className={`bg-white rounded-xl border transition-all shadow-xs ${
                isExpanded ? 'border-teal-700/60 ring-1 ring-teal-700/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header / Summary Card */}
              <div 
                onClick={() => toggleExpand(cs.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
              >
                <div className="space-y-2 flex-1">
                  {/* Clean Metadata Line (Anti-Slop Clean Typography) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-teal-800">
                      IB {cs.programme}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-600 font-medium">
                      {cs.gradeBand}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-700 font-semibold">
                      {cs.studentPseudonym}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-slate-500">
                      Category: {cs.category}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {cs.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Hypothesized Function:</span>
                      <span className="font-semibold text-slate-800">{cs.primaryFunction}</span>
                    </div>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-indigo-600" />
                      <span>ATL Focus: <strong>{cs.ibAtlFocus}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Outcome reduction badge & Accordion toggle */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center min-w-[120px]">
                    <div className="flex items-center justify-center gap-1 text-emerald-800 font-bold text-base">
                      <TrendingDown className="w-4 h-4" />
                      <span>-{cs.interventionData.reductionPercentage}%</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium block">
                      Target Behavior Reduction
                    </span>
                  </div>

                  <button
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label={isExpanded ? 'Collapse case study' : 'Expand case study'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Clinical Blueprint Section */}
              {isExpanded && (
                <div className="border-t border-slate-200 p-5 sm:p-6 bg-slate-50/50 space-y-6">
                  {/* Presenting Situation & Operational Definition */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        Presenting IB Educational Situation
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {cs.presentingSituation}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                        Target Behaviour: Observable Operational Definition
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium bg-amber-50/50 p-2.5 rounded border border-amber-200/60">
                        {cs.targetBehaviorOperationalDefinition}
                      </p>
                    </div>
                  </div>

                  {/* FBA Hypothesis Statement */}
                  <div className="p-4 rounded-lg bg-indigo-950 text-indigo-50 space-y-1.5 border border-indigo-900">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                        Functional Behavior Assessment (FBA) Hypothesis Formulation
                      </span>
                      <button
                        onClick={() => onOpenGlossary('FBA')}
                        className="text-[11px] text-teal-300 hover:text-white underline"
                      >
                        [FBA Methodology]
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-indigo-100 font-mono leading-relaxed pt-1">
                      &ldquo;{cs.fbaHypothesis}&rdquo;
                    </p>
                  </div>

                  {/* Quantitative Baseline vs Post-Intervention Tracking */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Empirical Data: Baseline vs. Post-Intervention (BIP Outcome)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[10px] font-medium uppercase">Baseline Episodes</span>
                        <span className="text-lg font-bold text-slate-900">{cs.baselineData.frequencyPerWeek} / week</span>
                        <span className="text-slate-400 text-[10px]">Avg duration: {cs.baselineData.durationAverageMin} min</span>
                      </div>

                      <div className="p-3 rounded bg-emerald-50 border border-emerald-200">
                        <span className="text-emerald-700 block text-[10px] font-medium uppercase">Post-BIP Episodes</span>
                        <span className="text-lg font-bold text-emerald-900">{cs.interventionData.frequencyPerWeek} / week</span>
                        <span className="text-emerald-700 text-[10px]">Avg duration: {cs.interventionData.durationAverageMin} min</span>
                      </div>

                      <div className="p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[10px] font-medium uppercase">Intervention Window</span>
                        <span className="text-lg font-bold text-slate-900">{cs.interventionData.durationWeeks} Weeks</span>
                        <span className="text-slate-400 text-[10px]">Direct ABA Coaching</span>
                      </div>

                      <div className="p-3 rounded bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[10px] font-medium uppercase">IB Learner Profile</span>
                        <span className="text-sm font-bold text-slate-900 truncate block mt-0.5">{cs.ibLearnerProfileTarget}</span>
                        <span className="text-slate-400 text-[10px]">Reflective Practice</span>
                      </div>
                    </div>
                  </div>

                  {/* 4-Pillared ABA Intervention Architecture */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Four-Pillared ABA Intervention Protocol
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Pillar 1: Antecedent Engineering */}
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">1</span>
                          Antecedent Modifications (Sᴰ / MO)
                        </span>
                        <ul className="space-y-1.5 text-slate-600 pl-1">
                          {cs.antecedentInterventions.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-teal-700 font-bold">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pillar 2: Replacement Behaviors (FCT) */}
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-[10px]">2</span>
                          Replacement Behaviors &amp; FCT
                        </span>
                        <ul className="space-y-1.5 text-slate-600 pl-1">
                          {cs.replacementBehaviorsFCT.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-indigo-700 font-bold">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pillar 3: Consequence Management & Extinction */}
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">3</span>
                          Consequence &amp; Extinction Protocol
                        </span>
                        <ul className="space-y-1.5 text-slate-600 pl-1">
                          {cs.consequenceExtinctionStrategies.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-700 font-bold">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Multidisciplinary Collaboration & Clinical Takeaways */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        Multi-Disciplinary Team (MDT) Execution
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {cs.multidisciplinaryCollaboration}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-teal-50/70 border border-teal-200/70 space-y-1.5">
                      <span className="font-bold text-teal-900 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-teal-800" />
                        Therapist Clinical Insights &amp; IB Takeaways
                      </span>
                      <ul className="space-y-1 text-slate-700">
                        {cs.clinicalTakeaways.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-800 font-bold">✔</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
