import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  Calendar, 
  User, 
  Layers, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BIPPlan, BehaviorFunction, IBProgramme, TherapistProfile } from '../types/behavioral';
import { INITIAL_BIP_TEMPLATE } from '../data/behavioralData';

interface BIPArchitectProps {
  onOpenGlossary: (acronym?: string) => void;
  profile: TherapistProfile;
}

export const BIPArchitect: React.FC<BIPArchitectProps> = ({
  onOpenGlossary,
  profile,
}) => {
  const [bip, setBip] = useState<BIPPlan>(INITIAL_BIP_TEMPLATE);
  const [activePreset, setActivePreset] = useState<'pyp-task' | 'myp-lab' | 'dp-exam'>('pyp-task');

  const loadPreset = (preset: 'pyp-task' | 'myp-lab' | 'dp-exam') => {
    setActivePreset(preset);
    if (preset === 'pyp-task') {
      setBip(INITIAL_BIP_TEMPLATE);
    } else if (preset === 'myp-lab') {
      setBip({
        id: 'bip-myp-702',
        studentCode: 'Student K (MYP Grade 7)',
        programme: 'MYP',
        targetBehavior: 'Physical Aggression & Apparatus Hoarding in Sciences',
        operationalDefinition: 'Placing hands on peer belongings, shouting "Touch this and you will regret it", slamming beakers or blocking station with torso.',
        functionOfBehavior: 'Access to Tangible',
        preventiveStrategies: [
          'Pre-assigned structured lab roles: "Investigator A / Data Logger / Timekeeper".',
          'Visual 3-minute sand timers on lab counter for station rotation.',
          'Non-contingent access to high-interest design tools prior to collaborative blocks.'
        ],
        teachingStrategies: [
          'Scripted request training: "I need 2 more minutes to finish this measurement, then you have the station."',
          'ATL Social Skills: Perspective taking and collaborative dialogue rubrics.'
        ],
        reactiveStrategies: [
          'Differential Reinforcement of Incompatible Behavior (DRI): Hands flat on clipboard during peer turn.',
          'Tangible extinction: Apparatus removed until 3 minutes of calm cooperation is displayed.'
        ],
        crisisEscalationLevels: [
          {
            level: 'Green (Baseline)',
            behaviorIndicators: 'Collaborating calmly, recording observations on shared tablet, hands on personal tools.',
            adultResponse: 'Deliver verbal praise every 5 minutes; award criterion engagement bonus points.'
          },
          {
            level: 'Yellow (Agitation / Rumbling)',
            behaviorIndicators: 'Rapid breathing, clutching apparatus tightly with both hands, ignoring peer requests to share.',
            adultResponse: 'Prompt visual turn-taking card; remind of remaining timer countdown; offer neutral choice.'
          },
          {
            level: 'Orange (Escalation / Outburst)',
            behaviorIndicators: 'Shouting at peer, slamming beakers onto workbench, blocking access with physical stance.',
            adultResponse: 'Step between students with neutral open stance. Direct peer to alternate workbench safely. Low-arousal voice.'
          },
          {
            level: 'Red (Crisis)',
            behaviorIndicators: 'Throwing glassware or threatening physical violence with lab instruments.',
            adultResponse: 'Evacuate lab workbench perimeter immediately. Do not physically engage unless immediate danger. Summon therapist.'
          },
          {
            level: 'Blue (De-escalation & Recovery)',
            behaviorIndicators: 'Hands open, sitting down, lower vocal pitch, responsive to simple redirection.',
            adultResponse: 'Allow 10 minutes quiet breathing; provide cool water; conduct restorative clean-up once fully regulated.'
          }
        ],
        reinforcementSchedule: 'DRI: 1 token for each 5-minute interval hands remain on personal clipboard while peer operates apparatus. 3 tokens = 10 min preferred CAD design.',
        reviewDate: '2026-11-28'
      });
    } else {
      setBip({
        id: 'bip-dp-1103',
        studentCode: 'Student S (DP Grade 11)',
        programme: 'DP',
        targetBehavior: 'Assessment Panic & Examination Elopement',
        operationalDefinition: 'Hyperventilating, vocalizing panic, crumpling exam answer sheets, and exiting testing room without authorization.',
        functionOfBehavior: 'Escape/Avoidance',
        preventiveStrategies: [
          'Official IB Inclusive Assessment accommodation: Separate distraction-free room & 10 min/hr stop-the-clock rest breaks.',
          'Graduated exposure hierarchies with timed practice tests.',
          'Silent digital countdown timer replacing ticking wall clocks.'
        ],
        teachingStrategies: [
          'Acceptance & Commitment Training (ACT) cognitive defusion: "I am having the thought that I will fail, but I can still write question 1".',
          'Somatic 5-4-3-2-1 grounding protocol.',
          'Silent "Pause Card" placed on desk to alert invigilator without verbal speech.'
        ],
        reactiveStrategies: [
          'Low-arousal сопровождение to quiet annex without lecture or academic cajoling.',
          'Stop-the-clock timer engaged; assessment never cancelled, only paused until physiological regulation is restored.'
        ],
        crisisEscalationLevels: [
          {
            level: 'Green (Baseline)',
            behaviorIndicators: 'Focused on exam paper, utilizing margin scratch notes, steady breathing.',
            adultResponse: 'Maintain silent, non-intrusive monitoring; ensure water bottle is filled.'
          },
          {
            level: 'Yellow (Agitation / Rumbling)',
            behaviorIndicators: 'Rapid pencil tapping, tears welling in eyes, heavy sighing, staring blankly at single problem for > 6 minutes.',
            adultResponse: 'Quietly point to somatic grounding card on desk; tap stop-the-clock timer offering a 3-minute pause.'
          },
          {
            level: 'Orange (Escalation / Outburst)',
            behaviorIndicators: 'Crying aloud, crumpling answer booklet, pushing chair back to stand and flee.',
            adultResponse: 'Softly prompt: "Pause card active. Step with me to the quiet corridor." Walk at student\'s pace.'
          },
          {
            level: 'Red (Crisis)',
            behaviorIndicators: 'Full panic attack, severe hyperventilation, inability to stand, numbness in fingers.',
            adultResponse: 'Guide student to sit against wall; guide slow 4-7-8 breathing; notify school nurse and therapist.'
          },
          {
            level: 'Blue (De-escalation & Recovery)',
            behaviorIndicators: 'Respiratory rate returns to baseline, tears subside, acknowledges invigilator presence.',
            adultResponse: 'Offer cold water; review question 1 collaboratively to rebuild momentum; restart exam clock.'
          }
        ],
        reinforcementSchedule: 'Self-monitoring: Checking off each completed question section with 2 minutes of silent eye rest.',
        reviewDate: '2026-12-15'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-teal-800">
            <span>Clinical Blueprint &amp; Crisis Management</span>
            <span aria-hidden="true" className="text-slate-300">/</span>
            <span>Applied Behavior Analysis &amp; IB Inclusion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Behavior Intervention Plan (BIP) Architect
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            A clinical, multi-tiered behavior support plan outlining antecedent environmental redesign, replacement behavior acquisition, maintaining reinforcer extinction, and a 5-phase Crisis De-escalation Ladder.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs shrink-0"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Print / Export BIP Protocol</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-semibold text-slate-700">
          Select Clinical Case Template:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => loadPreset('pyp-task')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePreset === 'pyp-task'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            PYP Task Refusal &amp; Meltdown
          </button>
          <button
            onClick={() => loadPreset('myp-lab')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePreset === 'myp-lab'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            MYP Science Lab &amp; Aggression
          </button>
          <button
            onClick={() => loadPreset('dp-exam')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activePreset === 'dp-exam'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            DP Exam Panic &amp; Elopement
          </button>
        </div>
      </div>

      {/* The Printable BIP Document Container */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-widest">
              <span>Apex Behavioral Therapy &amp; IB Inclusion Department</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              INDIVIDUALIZED BEHAVIOR INTERVENTION PLAN (BIP)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strictly Confidential · For Multi-Disciplinary Team (MDT), Homeroom Educators &amp; LSAs
            </p>
          </div>

          <div className="text-right text-xs text-slate-600 space-y-0.5">
            <div><strong>Review Cycle:</strong> Quarterly</div>
            <div><strong>Next Review Date:</strong> {bip.reviewDate}</div>
            <div><strong>Authorizing Clinician:</strong> {profile.name}{profile.credentials ? `, ${profile.credentials}` : ''}</div>
          </div>
        </div>

        {/* Section 1: Student Profile & Operational Target Behavior */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
            Student Profile &amp; Target Behavior Formulation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Student Code</span>
              <span className="font-bold text-slate-900 text-sm">{bip.studentCode}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">IB Continuum</span>
              <span className="font-bold text-indigo-800 text-sm">IB {bip.programme}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Identified Primary Function</span>
              <span className="font-bold text-teal-800 text-sm">{bip.functionOfBehavior}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-amber-50/50 border border-amber-200/70 space-y-1 text-xs">
            <span className="font-bold text-amber-950 uppercase text-[11px] block">
              Operational Definition of Target Behaviour
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">
              {bip.operationalDefinition}
            </p>
          </div>
        </div>

        {/* Section 2: Three-Tiered Behavioral Intervention Architecture */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
            Three-Tiered Clinical Intervention Protocols
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Preventive (Antecedent) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block text-teal-800">
                A · Proactive / Preventive Strategies
              </span>
              <p className="text-slate-500 text-[11px]">
                Engineering environment to abolish motivation (AO) and remove triggers:
              </p>
              <ul className="space-y-1.5 text-slate-700 pt-1">
                {bip.preventiveStrategies.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-700 font-bold">✔</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Teaching (Replacement) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block text-indigo-800">
                B · Teaching Replacement Behaviors (FCT)
              </span>
              <p className="text-slate-500 text-[11px]">
                Alternative functional communicative behaviors &amp; ATL skills:
              </p>
              <ul className="space-y-1.5 text-slate-700 pt-1">
                {bip.teachingStrategies.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-700 font-bold">✔</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reactive (Consequence & Extinction) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 uppercase text-[11px] block text-amber-800">
                C · Reactive &amp; Extinction Protocols
              </span>
              <p className="text-slate-500 text-[11px]">
                Adult response ensuring zero reinforcement for problem behavior:
              </p>
              <ul className="space-y-1.5 text-slate-700 pt-1">
                {bip.reactiveStrategies.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-700 font-bold">✔</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: 5-Phase Crisis De-Escalation Ladder */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
              Five-Phase Crisis De-Escalation Ladder
            </h3>
            <span className="text-xs text-slate-500">
              Low-Arousal Approach for Teachers &amp; Support Staff
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
            {bip.crisisEscalationLevels.map((lvl) => {
              const bg = 
                lvl.level.includes('Green') ? 'border-l-4 border-l-emerald-600 bg-emerald-50/20' :
                lvl.level.includes('Yellow') ? 'border-l-4 border-l-amber-500 bg-amber-50/20' :
                lvl.level.includes('Orange') ? 'border-l-4 border-l-orange-600 bg-orange-50/20' :
                lvl.level.includes('Red') ? 'border-l-4 border-l-rose-600 bg-rose-50/20' :
                'border-l-4 border-l-sky-600 bg-sky-50/20';

              return (
                <div key={lvl.level} className={`p-4 ${bg} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs tracking-tight">
                      {lvl.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block text-[10px] uppercase">
                        Observable Student Behavioral Indicators:
                      </span>
                      <p className="text-slate-800 leading-relaxed mt-0.5">
                        {lvl.behaviorIndicators}
                      </p>
                    </div>

                    <div>
                      <span className="text-teal-900 font-semibold block text-[10px] uppercase">
                        Mandated Adult Response (Educators &amp; LSAs):
                      </span>
                      <p className="text-slate-800 leading-relaxed mt-0.5 font-medium">
                        {lvl.adultResponse}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Reinforcement Schedule & Verification */}
        <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
          <span className="text-teal-400 font-bold uppercase tracking-wider text-[11px] block">
            Reinforcement Schedule &amp; Incentive Architecture
          </span>
          <p className="text-slate-200 leading-relaxed">
            {bip.reinforcementSchedule}
          </p>
          <div className="pt-2 border-t border-slate-700 flex flex-wrap items-center justify-between text-slate-400 text-[11px]">
            <span>Complies with BACB Ethical Guidelines &amp; IB Inclusion Access Principles</span>
            <span>Parent &amp; Coordinator Signatures On File</span>
          </div>
        </div>
      </div>
    </div>
  );
};
