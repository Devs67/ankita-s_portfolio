import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Sparkles, 
  Users, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  GraduationCap, 
  Compass, 
  HeartHandshake,
  Layers,
  FileSpreadsheet,
  Edit3,
  Upload
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { TherapistProfile, ABCEntry } from '../types/behavioral';
import { BehaviorTrendDashboard } from './BehaviorTrendDashboard';

interface PortfolioOverviewProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenGlossary: (acronym?: string) => void;
  onOpenNewABC: () => void;
  onOpenWordUpload?: () => void;
  totalAbcCount: number;
  logs: ABCEntry[];
  profile: TherapistProfile;
  onOpenEditProfile: () => void;
}

export const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  onNavigate,
  onOpenGlossary,
  onOpenNewABC,
  onOpenWordUpload,
  totalAbcCount,
  logs,
  profile,
  onOpenEditProfile,
}) => {
  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-teal-300">
            <span>{profile.roleTitle}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.schoolName}</span>
            {profile.credentials && (
              <>
                <span aria-hidden="true">·</span>
                <span>{profile.credentials}</span>
              </>
            )}
            <button
              onClick={onOpenEditProfile}
              className="text-xs text-teal-300/80 hover:text-white underline inline-flex items-center gap-1 ml-1"
              aria-label="Customize title and credentials"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Title / Name</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Applied Behavior Analysis &amp; Inclusion Portfolio in an International Baccalaureate School
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Bridging rigorous empirical psychological science—specializing in{' '}
            <button
              onClick={() => onOpenGlossary('ABC')}
              className="text-teal-300 hover:text-teal-200 underline decoration-teal-400/50 font-semibold"
            >
              ABC (Antecedent-Behavior-Consequence)
            </button>{' '}
            functional analysis,{' '}
            <button
              onClick={() => onOpenGlossary('FBA')}
              className="text-teal-300 hover:text-teal-200 underline decoration-teal-400/50 font-semibold"
            >
              FBA
            </button>
            , and{' '}
            <button
              onClick={() => onOpenGlossary('BIP')}
              className="text-teal-300 hover:text-teal-200 underline decoration-teal-400/50 font-semibold"
            >
              BIP
            </button>{' '}
            design—with the holistic inquiry and international-mindedness of the IB Primary Years (PYP), Middle Years (MYP), and Diploma Programme (DP).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('abc-registry')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Explore ABC Clinical Registry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('cases')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Review Real-Life Case Studies</span>
            </button>

            <button
              onClick={onOpenNewABC}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-900/60 hover:bg-slate-700/80 text-teal-300 border border-teal-500/30 transition-colors"
            >
              <span>+ Record New Observation</span>
            </button>

            {onOpenWordUpload && (
              <button
                onClick={onOpenWordUpload}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-teal-900/60 hover:bg-teal-800/80 text-teal-200 border border-teal-500/40 transition-colors"
                title="Upload Microsoft Word (.docx) documents to automatically extract ABC clinical logs"
              >
                <Upload className="w-4 h-4 text-teal-300" />
                <span>Upload Word Docs (.docx)</span>
              </button>
            )}
          </div>
        </div>

        {/* Ambient subtle watermark badge */}
        <div className="absolute -right-8 -bottom-10 opacity-5 pointer-events-none select-none text-white text-9xl font-black">
          ABA
        </div>
      </section>

      {/* Quantitative Impact & Clinical Caseload Metrics */}
      <section aria-labelledby="clinical-metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <h2 id="clinical-metrics" className="sr-only">Clinical Caseload Metrics</h2>
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">ABC Observation Logs</span>
            <Activity className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {totalAbcCount} Recorded
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Across PYP, MYP &amp; DP environments
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Mean Behavior Reduction</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 tracking-tight">
            89.2%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Post-BIP intervention outcome rate
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">IB Educational Continuum</span>
            <GraduationCap className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            3 Programmes
          </div>
          <p className="text-xs text-slate-500 mt-1">
            PYP (Ages 3-12) · MYP · DP (Ages 16-19)
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Retention &amp; Inclusion</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            100% Inclusion
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Zero disciplinary exclusions / expulsions
          </p>
        </div>
      </section>

      {/* Behavior Trend & Frequency Dashboard (Recharts) */}
      <BehaviorTrendDashboard 
        logs={logs} 
        onOpenGlossary={onOpenGlossary} 
      />

      {/* Clinical Philosophy & IB Alignment */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
            <span>Compassionate Behavioral Science</span>
            <span aria-hidden="true">·</span>
            <span>Neurodiversity Affirming</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 tracking-tight">
            Bridging Applied Behavior Analysis with the International Baccalaureate
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            In an IB school, education is built on inquiry, collaborative dialogue, self-directed exploration, and student agency. For neurodivergent children (ADHD, Autism, Sensory Processing Sensitivities, Pathological Demand Avoidance, Executive Function Deficits), this freedom can catalyze intense cognitive overload, demand avoidance, and affective storms. My clinical practice harmonizes ABA operant principles with the IB framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 1 */}
          <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
              <Target className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Function-Based Formulation (SEAT)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every behavior is communicative. We never treat symptoms punitively. Using rigorous ABC tracking, we uncover whether the maintenance mechanism is Sensory, Escape, Attention, or Tangible access, grounding every decision in clinical data.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Approaches to Learning (ATL) Alignment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replacement behaviors are translated directly into IB Approaches to Learning (ATL) skills: Self-Management (Affective regulation, organization), Social Skills (collaborative dialogue), and Communication Skills (FCT).
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Multidisciplinary Systemic Coaching
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Behavioral interventions fail in isolation. I train Homeroom Teachers, Learning Support Assistants (LSAs), Subject Leads, and Parents on prompt fading, low-arousal crisis de-escalation, and reinforcement integrity.
            </p>
          </div>
        </div>
      </section>

      {/* The 3-Tier Multi-Tiered System of Supports (MTSS) in IB */}
      <section className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <div>
          <span className="text-xs text-teal-400 font-medium">School-Wide Clinical Architecture</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
            Multi-Tiered System of Behavioral Supports (MTSS) in an IB Context
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            How behavioral psychology is deployed systematically across the school ecosystem to ensure proactive prevention before crisis escalation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Tier 1 */}
          <div className="p-5 rounded-lg bg-slate-800/90 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">Tier 1 · Universal (100% of Students)</span>
              <span className="text-xs text-slate-400">Classroom Ecology</span>
            </div>
            <h3 className="font-semibold text-white text-sm">Proactive Environmental Engineering</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Sensory-friendly inquiry classrooms: designated decompression nooks, loop earplugs, natural lighting.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Explicit visual schedules and 2-minute transition countdowns across PYP and MYP.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>School-wide matrix of behavioral expectations linked directly to IB Learner Profile attributes.</span>
              </li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="p-5 rounded-lg bg-slate-800/90 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Tier 2 · Targeted (~15% of Students)</span>
              <span className="text-xs text-slate-400">Small Group Support</span>
            </div>
            <h3 className="font-semibold text-white text-sm">Skill Deficit &amp; Modulation Groups</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Check-In / Check-Out (CICO) mentoring with daily ATL self-management behavioral rubrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Structured lunch-bunch peer interaction circles for students with pragmatic language barriers.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>DP exam stress desensitization clinics &amp; Pomodoro task-chunking workshops.</span>
              </li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="p-5 rounded-lg bg-slate-800/90 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Tier 3 · Intensive (~5% of Students)</span>
              <span className="text-xs text-slate-400">Individualized Clinical</span>
            </div>
            <h3 className="font-semibold text-white text-sm">Comprehensive FBA &amp; BIP Protocols</h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Formal Functional Behavior Assessments (direct ABC observation scatterplots, parent interviews).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>Customized Behavior Intervention Plans (BIP) with 5-stage crisis de-escalation ladders.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>1-on-1 LSA supervision, prompt fading protocol, and official IB Cardiff exam accommodations.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The 5 Key Behavioral Categories Overview & Quick Jump */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-slate-500">Clinical Focus Areas</div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Core Behavioral Topographies Handled in School
            </h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 transition-colors"
          >
            <span>View Full Topographical Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigate('categories')} 
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-700/60 transition-all cursor-pointer group"
          >
            <div className="text-xs font-semibold text-teal-800">01. Executive Functioning &amp; Avoidance</div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-teal-900">
              Task Refusal &amp; Disengagement
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Passive non-compliance, hiding under desks, and refusal during open-ended research or written reflections.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('categories')} 
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-700/60 transition-all cursor-pointer group"
          >
            <div className="text-xs font-semibold text-teal-800">02. Affective Storms</div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-teal-900">
              Emotional Meltdowns &amp; Aggression
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Sweeping desks, throwing materials, physical elopement, and screaming triggered by sensory overload or unexpected changes.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('categories')} 
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-700/60 transition-all cursor-pointer group"
          >
            <div className="text-xs font-semibold text-teal-800">03. Social Communication Friction</div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-teal-900">
              Peer Conflict &amp; Group Work Escalation
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Verbal hostility, apparatus hoarding in science labs, rigid inflexibility during collaborative inquiry.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('categories')} 
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-700/60 transition-all cursor-pointer group"
          >
            <div className="text-xs font-semibold text-teal-800">04. Sensory Modulation Deficits</div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-teal-900">
              Motor Agitation &amp; Proprioceptive Seeking
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Constant out-of-seat wandering, crashing into classroom furniture, vocal stimming, and tactile seeking.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('categories')} 
            className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-teal-700/60 transition-all cursor-pointer group"
          >
            <div className="text-xs font-semibold text-teal-800">05. High-Stakes Academic Anxiety</div>
            <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-teal-900">
              DP Perfectionism Paralysis &amp; Exam Panic
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Hyperventilation, exam elopement, somatic symptoms, and severe catastrophic avoidance of deadlines.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('codex')} 
            className="p-4 rounded-lg bg-teal-50 border border-teal-200 hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-teal-900">Psychological Codex</div>
              <h3 className="font-bold text-teal-950 text-sm mt-1">
                32+ Clinical &amp; IB Abbreviations
              </h3>
              <p className="text-xs text-teal-800 mt-1">
                Explore the complete dictionary of ABA terms (DRA, DRI, DRO, FCT, SEAT) and IB concepts.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-900 inline-flex items-center gap-1 mt-3">
              Open Dictionary <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
