import { useState } from 'react';
import { SUPPORT_PLANS } from '../data/behavioralData';
import { BulletList, CircledLetter, MarginNote, PageIntro, Row } from '../components/ui';
import { EvidenceBack } from './EvidenceBack';

/** Colour bands are part of the de-escalation protocol itself, so they stay. */
const LEVEL_COLOURS: Record<string, string> = {
  Green: '#2f8a57',
  Yellow: '#e0b23a',
  Orange: '#e07a2e',
  Red: '#c63c34',
  Blue: '#3a78c2',
};

export function SupportPlansPage() {
  const [planId, setPlanId] = useState(SUPPORT_PLANS[0].id);
  const plan = SUPPORT_PLANS.find((p) => p.id === planId)!;
  const section = 'border-t border-rule py-10';

  return (
    <>
      <PageIntro eyebrow={<EvidenceBack />} title="Behaviour support plans">
        <p>
          Each plan answers the ABC record: change what comes <em>before</em>, teach a better <em>behaviour</em> that does the same
          job, and agree what adults do <em>after</em>. A de-escalation ladder tells staff exactly what to look for and how to
          respond at each stage.
        </p>
      </PageIntro>

      <Row margin={<MarginNote>Plan</MarginNote>} className="border-t border-rule py-8">
        <div role="group" aria-label="Choose a plan" className="flex flex-wrap gap-2">
          {SUPPORT_PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={p.id === planId}
              onClick={() => setPlanId(p.id)}
              className={`rounded-full border px-4 py-2 text-left text-sm transition-colors ${
                p.id === planId ? 'border-ink bg-ink text-paper' : 'border-rule text-ink hover:border-ink'
              }`}
            >
              <span className="font-mono text-xs opacity-75">{p.programme}</span> {p.targetBehavior}
            </button>
          ))}
        </div>
      </Row>

      <Row margin={<MarginNote>Student</MarginNote>} className={section}>
        <h2 className="text-2xl leading-snug sm:text-3xl">{plan.targetBehavior}</h2>
        <p className="mt-2 font-mono text-sm">
          {plan.studentCode} · Function: {plan.functionOfBehavior} · Review by {plan.reviewDate}
        </p>
        <p className="mt-4 max-w-3xl text-ink">{plan.operationalDefinition}</p>
      </Row>

      <Row margin={<MarginNote>Strategies</MarginNote>} className={section}>
        <div className="grid max-w-5xl gap-10 lg:grid-cols-3">
          {[
            ['A', 'Prevent', 'Change what comes before', plan.preventiveStrategies],
            ['B', 'Teach', 'A replacement that does the same job', plan.teachingStrategies],
            ['C', 'Respond', 'What adults do after', plan.reactiveStrategies],
          ].map(([letter, title, sub, items]) => (
            <div key={letter as string}>
              <div className="mb-3 flex items-center gap-3">
                <CircledLetter letter={letter as string} className="h-9 w-9" />
                <div>
                  <h3 className="font-sans text-lg font-bold">{title as string}</h3>
                  <p className="text-sm">{sub as string}</p>
                </div>
              </div>
              <BulletList items={items as string[]} />
            </div>
          ))}
        </div>
      </Row>

      <Row margin={<MarginNote>De-escalation</MarginNote>} className={section}>
        <ol className="max-w-5xl divide-y divide-rule border-y border-rule">
          {plan.crisisEscalationLevels.map((lvl) => {
            const colour = Object.entries(LEVEL_COLOURS).find(([k]) => lvl.level.startsWith(k))?.[1] ?? '#4a5263';
            const [name, stage] = lvl.level.split(' (');
            return (
              <li key={lvl.level} className="grid gap-4 py-5 md:grid-cols-[9rem_1fr_1fr] md:gap-8">
                <div className="flex items-center gap-2.5 md:items-start">
                  <span aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: colour }} />
                  <div>
                    <div className="font-bold text-ink">{name}</div>
                    <div className="text-sm">{stage?.replace(')', '')}</div>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs">What you’ll see</div>
                  <p className="text-[0.9375rem]">{lvl.behaviorIndicators}</p>
                </div>
                <div>
                  <div className="font-mono text-xs">What adults do</div>
                  <p className="text-[0.9375rem] text-ink">{lvl.adultResponse}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Row>

      <Row margin={<MarginNote>Reinforcement</MarginNote>} className={`${section} pb-16`}>
        <p className="max-w-3xl text-ink">{plan.reinforcementSchedule}</p>
      </Row>
    </>
  );
}
