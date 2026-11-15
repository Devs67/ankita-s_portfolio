import React from 'react';
import { 
  Layers, 
  Target, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  BrainCircuit, 
  Activity 
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface BehaviorCategoriesViewProps {
  onNavigateToABCWithFilter: (categoryOrQuery: string) => void;
  onOpenGlossary: (acronym?: string) => void;
}

export const BehaviorCategoriesView: React.FC<BehaviorCategoriesViewProps> = ({
  onNavigateToABCWithFilter,
  onOpenGlossary,
}) => {
  const categories = [
    {
      id: 'cat-1',
      title: 'Executive Functioning & Task Refusal',
      subtitle: 'Initiation Inertia, Cognitive Demand Avoidance & Disengagement',
      psychologicalLanguage: 'Operant escape conditioning maintained by negative reinforcement; executive working memory and task decomposition deficits.',
      situations: [
        'Open-ended PYP transdisciplinary inquiry projects with low visual structure',
        'Multi-step MYP Design / Sciences lab reports with ambiguous rubric boundaries',
        'Unstructured independent study blocks where students face initiation paralysis'
      ],
      antecedents: [
        'Presentation of non-preferred multi-step writing or mathematical inquiry tasks',
        'Vague oral instructions without step-by-step visual organizers',
        'Sudden transitions from preferred free inquiry to rigid written reflection'
      ],
      topographies: [
        'Sweeping worksheets or digital tablets onto the floor',
        'Slumping limp in chair or hiding head beneath arms for > 5 consecutive minutes',
        'Vocal opposition: "This is stupid", "I refuse to do this IB rubbish"'
      ],
      functions: 'Primary: Escape/Avoidance (Task demand); Secondary: Adult Co-regulation Attention',
      abaInterventions: [
        'Visual Task Chunking: Breaking 40-minute periods into four 8-minute micro-intervals',
        'Premack Principle ("First-Then" contingent sequencing)',
        'Differential Reinforcement of Alternative Behavior (DRA) for task initiation within 30 seconds',
        'Functional Communication Training (FCT) for "Clarify & Pause" token exchange'
      ],
      ibAtlLink: 'ATL Self-Management (Organization, Persistence & Time Management)'
    },
    {
      id: 'cat-2',
      title: 'Affective Storms & Emotional Dysregulation',
      subtitle: 'Sensory Overload Meltdowns, Explosive Outbursts & Property Destruction',
      psychologicalLanguage: 'Autonomic nervous system sympathetic hyperarousal; impaired amygdala-prefrontal connectivity leading to acute fight-or-flight crisis responses.',
      situations: [
        'Overstimulating cafeterias or school assemblies exceeding 85 decibels',
        'Unexpected timetable substitutions, cancelled recess, or teacher absence',
        'Academic frustration when an IB inquiry experiment yields unexpected errors'
      ],
      antecedents: [
        'High ambient sensory decibels paired with fatigue or skipped meals (Motivating Operations)',
        'Unannounced environmental transitions without visual countdown cues',
        'Perceived social or academic unfairness in peer games'
      ],
      topographies: [
        'Overturning desks and chairs with concussive force',
        'High-amplitude screaming (> 80dB) and door slamming',
        'Elopement from classroom boundaries into corridors or parking perimeter'
      ],
      functions: 'Primary: Automatic/Sensory Regulation & Escape from overwhelming stimulus environments',
      abaInterventions: [
        'Low-Arousal Crisis Protocol: Neutral body posture, 2-meter physical safety perimeter',
        'Environmental Sensory De-escalation: Escort to low-stimulus Sensory Decompression Nook',
        '5-Stage Crisis De-escalation Ladder with clear adult behavioral guardrails',
        'Sensory Diet Schedule: Scheduled proprioceptive heavy work routines'
      ],
      ibAtlLink: 'ATL Self-Management: Affective Skills (Emotional Regulation & Mindfulness)'
    },
    {
      id: 'cat-3',
      title: 'Interpersonal Dynamics & Social Communication',
      subtitle: 'Peer Conflict, Collaborative Friction & Material Hoarding',
      psychologicalLanguage: 'Pragmatic social language impairments, theory of mind challenges, and operant tangible/peer-attention reinforcement contingencies.',
      situations: [
        'Unstructured peer group allocations during IB PYP/MYP group presentations',
        'Sharing high-demand instructional equipment (microscopes, robotics kits, art materials)',
        'Playground games with complex, unwritten peer social hierarchies'
      ],
      antecedents: [
        'Peer approaching preferred instructional apparatus or attempting to take a turn',
        'Perceived verbal slights or misinterpreting peer sarcasm as intentional hostility',
        'Ambiguous group roles during collaborative inquiry tasks'
      ],
      topographies: [
        'Physical blocking, shoving, and material clutching ("Get your hands off my station!")',
        'Verbal threats and profanities directed at peer group members',
        'Storming away from collaborative groups and refusing peer dialogue'
      ],
      functions: 'Primary: Access to Tangible apparatus; Secondary: Peer Avoidance or Peer Attention',
      abaInterventions: [
        'Differential Reinforcement of Incompatible Behavior (DRI): Hands resting on personal clipboard during peer turn',
        'Pre-assigned Structured Roles: "Investigator / Digital Recorder / Timekeeper"',
        'Visual Sand Timers for turn alternation',
        'Restitutional Overcorrection and social problem-solving debriefs'
      ],
      ibAtlLink: 'ATL Social Skills (Interpersonal Communication & Collaborative Group Work)'
    },
    {
      id: 'cat-4',
      title: 'Sensory Modulation & Motor Agitation',
      subtitle: 'Proprioceptive Seeking, Wandering & Vestibular Stimming',
      psychologicalLanguage: 'Neurological sensory processing atypicalities (hypo/hyper-reactivity); behavior maintained by automatic sensory reinforcement.',
      situations: [
        'Extended whole-group carpet listening times (> 15 minutes) in PYP Early Years',
        'Transitions between specialist classes (Music, Art, Physical Education)',
        'Quiet library study periods requiring prolonged seated stillness'
      ],
      antecedents: [
        'Prolonged motor restriction without scheduled proprioceptive input',
        'Fluorescent light flicker or hum near workspace',
        'Under-stimulating passive lecture instructional modes'
      ],
      topographies: [
        'Repetitive body crashing into book displays, cubbies, or peer boundaries',
        'Oral chewing of non-edible objects (pencils, clothing collars, erasers)',
        'Continuous out-of-seat pacing, vocal humming, or bird-like chirping'
      ],
      functions: 'Primary: Automatic/Sensory Reinforcement (Proprioceptive / Vestibular Input)',
      abaInterventions: [
        'Collaborative OT Sensory Diet: Scheduled "Heavy Work" transitions (carrying book crates)',
        'Alternative Seating: Inflatable wobble cushions, chair resistance foot bands',
        'Medical-grade silicone chew necklaces (chewelry)',
        'Differential Reinforcement of Zero Rates of Behavior (DRO) with token rewards'
      ],
      ibAtlLink: 'ATL Self-Management (Body Awareness & Physical Spatial Regulation)'
    },
    {
      id: 'cat-5',
      title: 'High-Stakes IB Academic Anxiety & Perfectionism',
      subtitle: 'DP Exam Panic, Somatic Avoidance & Assessment Catastrophizing',
      psychologicalLanguage: 'Cognitive fusion with rigid failure schemas; establishing operations (EO) elevating panic avoidance to acute escape behaviors.',
      situations: [
        'IB Diploma Mock Examinations and official May/November testing sessions',
        'Theory of Knowledge (TOK) and Extended Essay (EE) submission deadlines',
        'Public exhibition presentations (PYP Exhibition, MYP Personal Project)'
      ],
      antecedents: [
        'Invigilator announcements: "15 minutes remaining on Paper 2"',
        'Receiving critical rubric feedback on formative assessment drafts',
        'Facing complex, non-algorithmic Higher Level (HL) mathematics problems'
      ],
      topographies: [
        'Acute hyperventilation, crying, and somatic stomach complaints in testing rooms',
        'Assessment elopement: Walking out of examination halls without authorization',
        'Tearing answer booklets or deleting weeks of draft research out of despair'
      ],
      functions: 'Primary: Escape from evaluative self-threat & task pressure',
      abaInterventions: [
        'Official IB Cardiff Assessment Accommodations: "Stop-the-Clock" rest breaks & separate quiet room',
        'Graduated Exposure Hierarchies (10-min, 25-min, 50-min timed conditions)',
        'Acceptance & Commitment Training (ACT) cognitive defusion exercises',
        'Silent visual break-card protocols for seamless invigilator communication'
      ],
      ibAtlLink: 'ATL Thinking Skills (Metacognition, Emotional Resilience & Cognitive Flexibility)'
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-teal-800">
          <span>Diagnostic Topography &amp; Psychological Formulation</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span>School-Based Behavioral Domains</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Behavioral Topographies &amp; Clinical Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
          Classifying real-life school situations into formal psychological domains—linking operational definitions, discriminative stimuli, maintaining functions (SEAT), and IB Approaches to Learning (ATL) skills.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="space-y-6">
        {categories.map((cat, index) => (
          <article
            key={cat.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-xs hover:border-slate-300 transition-all space-y-5"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                  <span>Domain 0{index + 1}</span>
                  <span className="text-slate-300" aria-hidden="true">·</span>
                  <span className="text-slate-500 font-semibold">{cat.subtitle}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
                  {cat.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed italic">
                  <strong>Psychological Formulation: </strong>{cat.psychologicalLanguage}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onNavigateToABCWithFilter(cat.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <span>Filter ABC Logs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4-column breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Situations in IB */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wide block">
                  IB School Contexts
                </span>
                <ul className="space-y-1 text-slate-600">
                  {cat.situations.map((sit, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">·</span>
                      <span>{sit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Antecedents */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wide block">
                  Typical Antecedents (Sᴰ)
                </span>
                <ul className="space-y-1 text-slate-600">
                  {cat.antecedents.map((ant, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400">·</span>
                      <span>{ant}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Observable Topographies */}
              <div className="p-3.5 rounded-lg bg-amber-50/50 border border-amber-200/60 space-y-1.5">
                <span className="font-bold text-amber-950 uppercase text-[10px] tracking-wide block">
                  Observable Topographies
                </span>
                <ul className="space-y-1 text-slate-800">
                  {cat.topographies.map((top, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">·</span>
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ABA Interventions */}
              <div className="p-3.5 rounded-lg bg-teal-50/50 border border-teal-200/60 space-y-1.5">
                <span className="font-bold text-teal-950 uppercase text-[10px] tracking-wide block">
                  Evidence-Based ABA Protocols
                </span>
                <ul className="space-y-1 text-slate-800">
                  {cat.abaInterventions.map((int, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-700 font-bold">✔</span>
                      <span>{int}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar: Function and ATL Link */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Maintaining Function:</span>
                <span className="font-semibold text-teal-800">{cat.functions}</span>
              </div>

              <div className="flex items-center gap-2 text-indigo-800">
                <Compass className="w-4 h-4" />
                <span className="font-medium">IB Pedagogical Bridge: <strong>{cat.ibAtlLink}</strong></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
