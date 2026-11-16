import { useState } from 'react';
import { SUPPORT_PLANS } from '../data/behavioralData';
import { BulletList, CircledLetter, SubHeading } from '../components/ui';
import { Icon, IconName } from '../components/art';
import { Clamp, EvidenceIntro, FUNCTION_LOOK, FunctionBadge, Note } from '../components/evidence';
import { EvidenceBack } from './EvidenceBack';

/** Colour bands are part of the de-escalation protocol itself, so they stay. */
const LEVEL_COLOURS: Record<string, string> = {
  Green: '#2f8a57',
  Yellow: '#e0b23a',
  Orange: '#e07a2e',
  Red: '#c63c34',
  Blue: '#3a78c2',
};
/** How high each stage sits on the hill: arousal rises to crisis, then settles. */
const LEVEL_HEIGHT = [1, 2, 3, 4, 1.6];

export function SupportPlansPage() {
  const [planId, setPlanId] = useState(SUPPORT_PLANS[0].id);
  const [stage, setStage] = useState(0);
  const plan = SUPPORT_PLANS.find((p) => p.id === planId)!;
  const levels = plan.crisisEscalationLevels;
  const current = levels[stage];
  const section = 'border-t border-rule py-10';

  return (
    <>
      <EvidenceIntro
        back={<EvidenceBack />}
        title="Behaviour support plans"
        intro="Prevent the trigger, teach a better way, agree how adults respond — and a ladder for when things escalate."
        icon="clipboard"
        tile="bg-mint"
        note="one plan the whole team follows"
      />

      {/* Choose a plan */}
      <section aria-label="Choose a plan" className="grid gap-4 border-t border-rule py-8 md:grid-cols-2">
        {SUPPORT_PLANS.map((p) => {
          const active = p.id === planId;
          const look = FUNCTION_LOOK[p.functionOfBehavior];
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setPlanId(p.id);
                setStage(0);
              }}
              className={`flex items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition-all ${
                active ? 'border-ink shadow-[5px_5px_0_var(--color-ink)]' : 'border-transparent ring-1 ring-rule hover:border-ink/40'
              }`}
            >
              <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${look.tile}`}>
                <Icon name={look.icon} className="h-10 w-10" />
              </span>
              <span>
                <span className="block font-mono text-xs">
                  {p.programme} · {p.studentCode}
                </span>
                <span className="block font-bold leading-snug text-ink">{p.targetBehavior}</span>
              </span>
            </button>
          );
        })}
      </section>

      {/* The behaviour this plan is about */}
      <section aria-labelledby="plan-title" className={section}>
        <div className="flex flex-wrap items-center gap-2">
          <FunctionBadge fn={plan.functionOfBehavior} />
          <span className="rounded-full border border-rule bg-white/70 px-3 py-0.5 font-mono text-xs">Review by {plan.reviewDate}</span>
        </div>
        <h2 id="plan-title" className="mt-4 text-2xl leading-snug sm:text-3xl">
          {plan.targetBehavior}
        </h2>
        <div className="mt-3 max-w-3xl text-ink">
          <Clamp>{plan.operationalDefinition}</Clamp>
        </div>
      </section>

      {/* Prevent · Teach · Respond */}
      <section aria-labelledby="strat-title" className={section}>
        <SubHeading>
          <span id="strat-title">The plan in three parts</span>
        </SubHeading>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {[
            { letter: 'A', icon: 'shield' as IconName, title: 'Prevent', sub: 'change what comes before', items: plan.preventiveStrategies, tile: 'bg-butter/60' },
            { letter: 'B', icon: 'blocks' as IconName, title: 'Teach', sub: 'a better way to get the same thing', items: plan.teachingStrategies, tile: 'bg-mint/60' },
            { letter: 'C', icon: 'people' as IconName, title: 'Respond', sub: 'what adults do after', items: plan.reactiveStrategies, tile: 'bg-blush/60' },
          ].map((col) => (
            <div key={col.letter} className={`rounded-2xl p-5 ${col.tile}`}>
              <div className="mb-3 flex items-center gap-3">
                <CircledLetter letter={col.letter} className="h-9 w-9" />
                <div>
                  <h3 className="font-sans text-lg font-bold">{col.title}</h3>
                  <p className="font-hand text-base leading-none text-margin">{col.sub}</p>
                </div>
                <Icon name={col.icon} className="ml-auto h-10 w-10" />
              </div>
              <div className="text-[0.9375rem] text-ink">
                <BulletList items={col.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* De-escalation: pick a stage on the hill */}
      <section aria-labelledby="ladder-title" className={section}>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <SubHeading>
            <span id="ladder-title">De-escalation ladder</span>
          </SubHeading>
          <Note>tap a stage ↓</Note>
        </div>
        <div className="mt-4 rounded-2xl bg-white/85 p-5 ring-1 ring-rule sm:p-6">
          <div role="group" aria-label="Stages" className="grid grid-cols-5 items-end gap-2 sm:gap-3">
            {levels.map((lvl, i) => {
              const colour = Object.entries(LEVEL_COLOURS).find(([k]) => lvl.level.startsWith(k))?.[1] ?? '#4a5263';
              const [name, phase] = lvl.level.split(' (');
              const active = i === stage;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStage(i)}
                  className="group flex flex-col items-stretch text-left"
                >
                  <span
                    className={`block rounded-t-xl border-2 transition-all ${active ? 'border-ink' : 'border-transparent opacity-70 group-hover:opacity-100'}`}
                    style={{ background: colour, height: `${LEVEL_HEIGHT[i] * 2.4}rem` }}
                  />
                  <span className={`mt-2 block text-sm font-bold ${active ? 'text-ink' : ''}`}>{name}</span>
                  <span className="hidden text-xs sm:block">{phase?.replace(')', '')}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid gap-5 border-t border-dashed border-rule pt-5 md:grid-cols-2">
            <div className="flex gap-3">
              <Icon name="eye" className="h-10 w-10" />
              <div>
                <p className="font-mono text-xs">What you’ll see</p>
                <p className="text-[0.9375rem]">{current.behaviorIndicators}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Icon name="people" className="h-10 w-10" />
              <div>
                <p className="font-mono text-xs">What adults do</p>
                <p className="text-[0.9375rem] text-ink">{current.adultResponse}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reinforcement */}
      <section aria-labelledby="reinf-title" className={`${section} pb-16`}>
        <SubHeading>
          <span id="reinf-title">How good choices are rewarded</span>
        </SubHeading>
        <div className="mt-4 flex flex-col gap-5 rounded-2xl bg-butter/50 p-5 sm:flex-row sm:items-center">
          <span aria-hidden="true" className="flex shrink-0 items-center gap-1">
            {Array.from({ length: Number(plan.reinforcementSchedule.match(/(\d+) tokens\s*=/)?.[1] ?? 3) }, (_, i) => (
              <Icon key={i} name="token" className="h-9 w-9" />
            ))}
            <span className="mx-1 font-display text-2xl text-margin">=</span>
            <Icon name="gift" className="h-10 w-10" />
          </span>
          <p className="max-w-2xl text-[0.9375rem] text-ink">{plan.reinforcementSchedule}</p>
        </div>
      </section>
    </>
  );
}
