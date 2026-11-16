import { INITIAL_CASE_STUDIES } from '../data/behavioralData';
import { CaseStudy } from '../types/behavioral';
import { BulletList, CircledLetter, SubHeading } from '../components/ui';
import { Icon, IconName } from '../components/art';
import { Clamp, EvidenceIntro, FunctionBadge, IncidentDots, StickyNote } from '../components/evidence';
import { href } from '../router';
import { EvidenceBack } from './EvidenceBack';

const CATEGORY_LOOK: Record<CaseStudy['category'], { icon: IconName; tile: string; short: string }> = {
  'Executive Functioning & Task Refusal': { icon: 'clipboard', tile: 'bg-sky', short: 'Getting started on work' },
  'Affective Storms & Emotional Dysregulation': { icon: 'bolt', tile: 'bg-butter', short: 'Big emotions' },
  'Interpersonal Friction & Social Communication': { icon: 'people', tile: 'bg-mint', short: 'Getting on with peers' },
  'Sensory Modulation & Motor Agitation': { icon: 'wave', tile: 'bg-blush', short: 'Sensory needs' },
  'High-Stakes IB Academic Anxiety & Perfectionism': { icon: 'book', tile: 'bg-wash', short: 'Worry about work' },
};

const drop = (c: CaseStudy) => Math.round((1 - c.interventionData.frequencyPerWeek / c.baselineData.frequencyPerWeek) * 100);

export function CaseStudiesPage({ caseId }: { caseId?: string }) {
  if (caseId) {
    const study = INITIAL_CASE_STUDIES.find((c) => c.id === caseId);
    if (study) return <CaseStudyDetail c={study} />;
  }

  return (
    <>
      <EvidenceIntro
        back={<EvidenceBack />}
        title="Case studies"
        intro="Individual students, from first observation to a reviewed plan. Names and details changed."
        icon="folder"
        tile="bg-butter"
        note="before → after, in dots"
      />

      <ul className="grid gap-5 border-t border-rule pt-10 pb-16 md:grid-cols-2">
        {INITIAL_CASE_STUDIES.map((c) => {
          const look = CATEGORY_LOOK[c.category];
          return (
            <li key={c.id}>
              <a
                href={href('evidence', 'case-studies', c.id)}
                className="group flex h-full flex-col rounded-2xl border-2 border-ink bg-white p-5 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]"
              >
                <span className="flex items-center gap-3">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${look.tile}`}>
                    <Icon name={look.icon} className="h-9 w-9" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{look.short}</span>
                    <span className="block font-mono text-xs">
                      {c.studentPseudonym.replace(/\s*\(.*\)/, '')} · IB {c.programme}
                    </span>
                  </span>
                </span>
                <span className="mt-4 flex-1 font-display text-lg leading-snug text-ink">{c.title}</span>
                <span className="mt-5 flex items-end gap-4 border-t border-dashed border-rule pt-4">
                  <MiniBars before={c.baselineData.frequencyPerWeek} after={c.interventionData.frequencyPerWeek} />
                  <span className="text-sm">
                    <span className="block text-ink">
                      incidents a week: {c.baselineData.frequencyPerWeek} → {c.interventionData.frequencyPerWeek}
                    </span>
                    <span className="font-mono text-xs">over {c.interventionData.durationWeeks} weeks</span>
                  </span>
                  <span className="ml-auto -rotate-6 font-hand text-2xl font-bold text-margin">−{drop(c)}%</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Two little bars: how many incidents before and after. */
function MiniBars({ before, after }: { before: number; after: number }) {
  const h = (v: number) => Math.max(3, (v / before) * 40);
  return (
    <svg viewBox="0 0 34 44" aria-hidden="true" className="h-11 w-9 shrink-0">
      <rect x="2" y={42 - h(before)} width="12" height={h(before)} rx="2" fill="var(--color-graphite)" opacity="0.35" />
      <rect x="19" y={42 - h(after)} width="12" height={h(after)} rx="2" fill="var(--color-mint)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M1 43h32" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CaseStudyDetail({ c }: { c: CaseStudy }) {
  const look = CATEGORY_LOOK[c.category];
  const section = 'border-t border-rule py-10';
  const tilts = [-1.5, 1, -0.5, 1.5];

  return (
    <>
      <header className="pt-10 pb-8 sm:pt-14">
        <EvidenceBack to={href('evidence', 'case-studies')} label="Case studies" />
        <h1 className="mt-4 max-w-4xl text-[1.9rem] leading-tight sm:text-[2.6rem]">{c.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full py-0.5 pr-3 pl-1 text-sm text-ink ${look.tile}`}>
            <Icon name={look.icon} className="h-6 w-6" />
            {look.short}
          </span>
          <FunctionBadge fn={c.primaryFunction} />
          <span className="rounded-full border border-rule bg-white/70 px-3 py-0.5 font-mono text-xs">
            {c.studentPseudonym} · IB {c.programme} · {c.gradeBand}
          </span>
        </div>
      </header>

      {/* The result first, as a picture */}
      <section aria-label="Results" className="rounded-2xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-ink)] sm:p-8">
        <div className="grid items-center gap-8 md:grid-cols-[auto_auto_1fr]">
          <IncidentDots count={c.baselineData.frequencyPerWeek} tone="before" label="Before" />
          <span aria-hidden="true" className="hidden font-display text-4xl text-margin md:block">
            →
          </span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <IncidentDots count={c.interventionData.frequencyPerWeek} tone="after" label={`After ${c.interventionData.durationWeeks} weeks`} />
            <div className="text-right">
              <p className="-rotate-3 font-hand text-5xl font-bold text-margin">−{drop(c)}%</p>
              <p className="mt-2 inline-flex items-center gap-2 text-ink">
                <Icon name="timer" className="h-7 w-7" />
                each one {c.baselineData.durationAverageMin} min → {c.interventionData.durationAverageMin} min
              </p>
            </div>
          </div>
        </div>
        <p className="sr-only">
          Incidents fell from {c.baselineData.frequencyPerWeek} to {c.interventionData.frequencyPerWeek} a week over{' '}
          {c.interventionData.durationWeeks} weeks, and average length from {c.baselineData.durationAverageMin} to{' '}
          {c.interventionData.durationAverageMin} minutes.
        </p>
      </section>

      {/* The story, three short panels */}
      <section aria-label="The situation" className={`mt-10 ${section}`}>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: 'pin' as IconName, title: 'The situation', text: c.presentingSituation },
            { icon: 'eye' as IconName, title: 'What we watched for', text: c.targetBehaviorOperationalDefinition },
            { icon: 'search' as IconName, title: 'Why we think it happened', text: c.fbaHypothesis },
          ].map((p, i) => (
            <div key={p.title} className="relative rounded-2xl bg-white/80 p-5 ring-1 ring-rule">
              <div className="flex items-center gap-3">
                <Icon name={p.icon} className="h-10 w-10" />
                <h2 className="font-sans text-base font-bold">{p.title}</h2>
              </div>
              <div className="mt-3 text-[0.9375rem]">
                <Clamp>{p.text}</Clamp>
              </div>
              {i < 2 && (
                <span aria-hidden="true" className="absolute top-8 -right-4 z-10 hidden font-display text-xl text-margin md:block">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* What we did, in the plan's three parts */}
      <section aria-labelledby="did-title" className={section}>
        <SubHeading>
          <span id="did-title">What we did</span>
        </SubHeading>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {[
            { letter: 'A', icon: 'shield' as IconName, title: 'Before it happens', items: c.antecedentInterventions, tile: 'bg-butter/60' },
            { letter: 'B', icon: 'blocks' as IconName, title: 'Skills taught', items: c.replacementBehaviorsFCT, tile: 'bg-mint/60' },
            { letter: 'C', icon: 'people' as IconName, title: 'How adults respond', items: c.consequenceExtinctionStrategies, tile: 'bg-blush/60' },
          ].map((col) => (
            <div key={col.letter} className={`rounded-2xl p-5 ${col.tile}`}>
              <div className="mb-3 flex items-center gap-3">
                <CircledLetter letter={col.letter} className="h-9 w-9" />
                <h3 className="font-sans text-base font-bold">{col.title}</h3>
                <Icon name={col.icon} className="ml-auto h-9 w-9" />
              </div>
              <div className="text-[0.9375rem] text-ink">
                <BulletList items={col.items} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who was involved and the IB connection */}
      <section aria-label="Team and IB links" className={section}>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="flex gap-4">
            <Icon name="people" className="h-12 w-12" />
            <div className="text-[0.9375rem]">
              <h2 className="font-sans text-base font-bold">The team around the child</h2>
              <div className="mt-1">
                <Clamp>{c.multidisciplinaryCollaboration}</Clamp>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon name="school" className="h-12 w-12" />
            <div>
              <h2 className="font-sans text-base font-bold">IB links</h2>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm text-ink">
                <li className="rounded-full bg-sky px-3 py-1">Learner profile: {c.ibLearnerProfileTarget}</li>
                <li className="rounded-full bg-mint px-3 py-1">ATL: {c.ibAtlFocus}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Takeaways as sticky notes */}
      <section aria-labelledby="take-title" className={`${section} pb-16`}>
        <SubHeading>
          <span id="take-title">What I took away</span>
        </SubHeading>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.clinicalTakeaways.map((t, i) => (
            <li key={t}>
              <StickyNote tone={['bg-butter', 'bg-mint', 'bg-blush', 'bg-sky'][i % 4]} tilt={tilts[i % 4]}>
                {t}
              </StickyNote>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
