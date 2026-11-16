import React from 'react';
import { MarginNote, Row } from '../components/ui';
import { AbcCycle, AgeSteps, Icon, IconName, Portrait, Squiggle, Star, SupportCircle } from '../components/art';
import { EDUCATION, EXPERIENCE, EXPERTISE, OTHER_WORK, PROFILE, QUOTE, SCHOOL_LABEL } from '../content/profile';
import { href } from '../router';
import { EVIDENCE_INDEX } from '../content/evidenceIndex';

const METHOD: { title: string; icon: IconName; text: string; link?: { label: string; to: string } }[] = [
  {
    title: 'Observe and assess',
    icon: 'eye',
    text: 'Record each incident as it happens — what came just before, what the child did, what followed — alongside formal assessment such as VB-MAPP.',
    link: { label: 'Observation records', to: href('evidence', 'observations') },
  },
  {
    title: 'Find the function',
    icon: 'search',
    text: 'Read across the records for the pattern: is the behaviour an escape, a bid for attention, a way to get something, or a sensory need?',
    link: { label: 'Behaviour areas', to: href('evidence', 'behaviour-areas') },
  },
  {
    title: 'Write the plan',
    icon: 'clipboard',
    text: 'Prevent the trigger, teach a replacement that does the same job, and agree how adults respond — down to a step-by-step de-escalation ladder.',
    link: { label: 'Support plans', to: href('evidence', 'support-plans') },
  },
  {
    title: 'Coach the team',
    icon: 'people',
    text: 'Teachers, shadow teachers and parents practise the same responses, so the child meets the same answer everywhere.',
  },
  {
    title: 'Review',
    icon: 'loop',
    text: 'Keep recording, compare against the starting picture, and adjust the plan until the new behaviour holds.',
    link: { label: 'Case studies', to: href('evidence', 'case-studies') },
  },
];

const PLACES: [IconName, string][] = [
  ['board', 'Classrooms'],
  ['door', 'Corridors'],
  ['mic', 'Assemblies'],
  ['plate', 'Lunch hall'],
  ['ball', 'Sports'],
];

const ROLE_ICON: Record<(typeof EXPERIENCE)[number]['kind'], IconName> = {
  school: 'school',
  aba: 'blocks',
  clinical: 'clinic',
  remote: 'laptop',
};

const EVIDENCE_STYLE: Record<string, { icon: IconName; tile: string }> = {
  observations: { icon: 'notebook', tile: 'bg-sky' },
  'case-studies': { icon: 'folder', tile: 'bg-butter' },
  'support-plans': { icon: 'clipboard', tile: 'bg-mint' },
  'behaviour-areas': { icon: 'map', tile: 'bg-blush' },
  glossary: { icon: 'book', tile: 'bg-wash' },
};

const hasContact = Boolean(PROFILE.email || PROFILE.linkedin);

/** A full-width band. Paper and wash bands keep the notebook's red margin rule. */
function Band({
  tone = 'paper',
  id,
  className = '',
  children,
  label,
}: {
  tone?: 'paper' | 'wash' | 'grid' | 'ink';
  id?: string;
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  const bg = { paper: '', wash: 'bg-wash', grid: 'grid-paper', ink: 'bg-ink text-paper/80' }[tone];
  return (
    <section id={id} aria-label={label} className={`relative scroll-mt-0 ${bg}`}>
      <div className={`relative mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>
        {tone !== 'ink' && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[calc(10rem+1.5rem)] hidden w-px bg-margin/40 md:block" />
        )}
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ label, children, light = false }: { label: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Row margin={light ? <p className="font-mono text-[0.8125rem] text-tape">{label}</p> : <MarginNote>{label}</MarginNote>}>
      <h2 className={`max-w-2xl text-3xl leading-tight sm:text-[2.6rem] ${light ? 'text-paper' : ''}`}>{children}</h2>
    </Row>
  );
}

export function HomePage() {
  return (
    <>
      {/* Hero: who she is, with her photo pinned to the page */}
      <Band label="Introduction" className="pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Row margin={<MarginNote>{PROFILE.location}</MarginNote>}>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-hand text-2xl text-margin">Hello, I’m</p>
              <h1 className="text-[2.75rem] leading-[1.05] sm:text-7xl">{PROFILE.name}</h1>
              <p className="mt-3 inline-flex flex-wrap items-center gap-2 font-mono text-sm">
                <span className="rounded-full bg-ink px-3 py-1 text-paper">{PROFILE.role}</span>
                <span className="rounded-full border border-rule bg-white px-3 py-1 text-ink">{PROFILE.programmes}</span>
              </p>
              <p className="mt-8 max-w-2xl font-display text-[1.6rem] leading-snug text-ink sm:text-[2.05rem] sm:leading-[1.3]">
                I help children from the early years to middle school <span className="highlight">cope, learn and belong</span> in
                the mainstream classroom.
              </p>
              <p className="mt-5 max-w-xl text-lg">
                I observe what sets a behaviour off, write support plans with teachers and parents, and teach children the skills
                that work better — currently at {SCHOOL_LABEL}.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={href('evidence')} className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-ink/90">
                  See the evidence
                </a>
                <a href={href('method')} className="font-semibold text-ink underline decoration-rule decoration-2 underline-offset-4 hover:decoration-ink">
                  How I work
                </a>
              </div>
            </div>
            <div className="relative justify-self-center px-6 lg:justify-self-end">
              <Star className="absolute -left-1 top-6 h-9 w-9 -rotate-12" />
              <Star className="absolute -right-2 bottom-20 h-6 w-6 rotate-12" fill="var(--color-mint)" />
              <Portrait />
              <Squiggle className="absolute -bottom-5 left-10 h-4 w-28" />
            </div>
          </div>
        </Row>
      </Band>

      {/* The quote: a full ink band so it reads as a pause */}
      <Band tone="ink" label="Quote" className="py-16 sm:py-20">
        <figure className="relative mx-auto max-w-4xl text-center">
          <span aria-hidden="true" className="block font-display text-8xl leading-[0.6] text-tape">
            “
          </span>
          <blockquote className="mt-4 font-display text-4xl leading-tight text-paper sm:text-6xl">{QUOTE.text}</blockquote>
          <figcaption className="mt-6 font-mono text-sm text-paper/75">
            <span className="text-paper">{QUOTE.by}</span> · {QUOTE.note}
          </figcaption>
        </figure>
      </Band>

      {/* About, with the circle of people who carry the plan */}
      <Band id="about" className="py-16 sm:py-20">
        <SectionTitle label="About">Behaviour is communication. My job is to translate it.</SectionTitle>
        <Row>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_22rem]">
            <div className="max-w-2xl space-y-4">
              <p>
                I’m {PROFILE.firstName}, a psychology-trained {PROFILE.role.toLowerCase()} at {SCHOOL_LABEL}. I support students’
                behavioural, emotional and learning needs across the {PROFILE.programmes} years — one-to-one, in small groups,
                and inside the mainstream classroom.
              </p>
              <p>
                Most of my day happens away from a desk, noting what happens just before a behaviour, what it looks like, and what
                follows. From those notes I work out what the behaviour is doing for the child, then plan with everyone around
                them so the next time that moment comes round, it goes differently.
              </p>
              <p className="font-mono text-sm text-ink">{PROFILE.credentials}</p>
            </div>
            <figure className="mx-auto w-full max-w-[22rem]">
              <SupportCircle />
              <figcaption className="mt-1 text-center font-hand text-lg text-margin">one plan, the same response everywhere</figcaption>
            </figure>
          </div>
        </Row>
      </Band>

      {/* At a glance: who and where, drawn */}
      <Band tone="grid" label="At a glance" className="py-16 sm:py-20">
        <Row margin={<MarginNote>At a glance</MarginNote>}>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-2xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-ink)]">
              <h2 className="font-sans text-[0.8125rem] font-bold uppercase tracking-wider">The children I work with</h2>
              <p className="mt-1 font-display text-2xl">Three programmes, one continuum</p>
              <div className="mt-5">
                <AgeSteps />
              </div>
              <p className="mt-2 font-mono text-xs">Ages are approximate.</p>
            </div>
            <div className="rounded-2xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-ink)]">
              <h2 className="font-sans text-[0.8125rem] font-bold uppercase tracking-wider">Where the work happens</h2>
              <p className="mt-1 font-display text-2xl">Wherever the moment is</p>
              <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
                {PLACES.map(([icon, label]) => (
                  <li key={label} className="flex flex-col items-center gap-2 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-wash">
                      <Icon name={icon} className="h-10 w-10" />
                    </span>
                    <span className="text-sm text-ink">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-dashed border-rule pt-4 text-[0.9375rem]">
                One-to-one, in small groups, and alongside the class — not just in a therapy room.
              </p>
            </div>
          </div>
        </Row>
      </Band>

      {/* Experience: a timeline with a picture for each kind of setting */}
      <Band id="experience" className="py-16 sm:py-20">
        <SectionTitle label="Experience">From clinical training to the classroom</SectionTitle>
        <ol className="mt-6">
          {EXPERIENCE.map((role, i) => (
            <li key={`${role.title}-${role.dates}`}>
              <Row as="div" className="py-6" margin={<p className="font-mono text-sm text-margin md:pt-3">{role.dates}</p>}>
                <div className="relative flex gap-5">
                  {i < EXPERIENCE.length - 1 && (
                    <span aria-hidden="true" className="absolute top-16 -bottom-8 left-7 w-0.5 bg-rule" />
                  )}
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-white">
                    <Icon name={ROLE_ICON[role.kind]} className="h-9 w-9" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-sans text-lg font-bold">{role.title}</h3>
                    <p className="text-ink">{role.org}</p>
                    <ul className="mt-3 max-w-3xl space-y-1.5">
                      {role.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-graphite/60" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Row>
            </li>
          ))}
        </ol>
        <Row className="pb-4">
          <p className="max-w-3xl pl-[4.75rem] text-[0.9375rem]">{OTHER_WORK}</p>
        </Row>
        <Row className="pt-8">
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl bg-wash p-6">
              <div className="flex items-center gap-3">
                <Icon name="cap" className="h-11 w-11" />
                <h3 className="font-sans text-[0.8125rem] font-bold uppercase tracking-wider">Education</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {EDUCATION.map((e) => (
                  <li key={e.degree}>
                    <span className="text-ink">{e.degree}</span>
                    <span className="block font-mono text-sm">
                      {e.place} · {e.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-wash p-6">
              <h3 className="font-sans text-[0.8125rem] font-bold uppercase tracking-wider">Areas of expertise</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {EXPERTISE.map((skill, i) => (
                  <li
                    key={skill}
                    className={`rounded-full border border-ink/15 px-3 py-1 text-[0.9375rem] text-ink ${
                      ['bg-butter', 'bg-mint', 'bg-sky', 'bg-blush'][i % 4]
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Row>
      </Band>

      {/* Method: the ABC cycle drawn, then the five steps */}
      <Band id="method" tone="wash" className="py-16 sm:py-20">
        <SectionTitle label="Method">From one observation to a plan the whole team can follow</SectionTitle>
        <Row>
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
            <figure className="rounded-2xl border-2 border-ink bg-white p-5 shadow-[6px_6px_0_var(--color-ink)] lg:sticky lg:top-6">
              <AbcCycle />
              <figcaption className="mt-2 text-[0.9375rem]">
                <span className="font-bold text-ink">The ABC cycle.</span> Every plan targets one of the three points — and starts
                from what the behaviour is for.
              </figcaption>
            </figure>
            <ol className="space-y-4">
              {METHOD.map((step, i) => (
                <li key={step.title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-rule">
                  <div className="flex shrink-0 flex-col items-center">
                    <Icon name={step.icon} className="h-12 w-12" />
                    <span className="mt-1 font-mono text-xs text-margin">step {i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold">{step.title}</h3>
                    <p className="mt-1">{step.text}</p>
                    {step.link && (
                      <a href={step.link.to} className="mt-2 inline-block font-mono text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                        {step.link.label} →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Row>
      </Band>

      {/* Evidence: illustrated cards */}
      <Band id="evidence" className="py-16 sm:py-20">
        <SectionTitle label="Evidence">Evidence of practice</SectionTitle>
        <Row>
          <p className="mt-3 max-w-2xl">Records, plans and case studies from school-based work. All student details are de-identified.</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {EVIDENCE_INDEX.map((item) => {
              const style = EVIDENCE_STYLE[item.slug] ?? { icon: 'notebook' as IconName, tile: 'bg-wash' };
              return (
                <li key={item.slug}>
                  <a
                    href={href('evidence', item.slug)}
                    className="group flex h-full flex-col rounded-2xl border-2 border-ink bg-white p-5 transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-ink)]"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className={`grid h-16 w-16 place-items-center rounded-xl ${style.tile}`}>
                        <Icon name={style.icon} className="h-11 w-11" />
                      </span>
                      <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-sm text-paper">{item.count}</span>
                    </span>
                    <span className="mt-4 font-display text-xl text-ink">{item.title}</span>
                    <span className="mt-1 flex-1 text-[0.9375rem]">{item.summary}</span>
                    <span className="mt-4 font-mono text-sm text-ink group-hover:underline group-hover:underline-offset-4">Open →</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Row>
      </Band>

      {hasContact && (
        <Band id="contact" tone="ink" className="py-16 sm:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <span className="grid h-28 w-28 place-items-center rounded-full bg-paper">
              <Icon name="mail" className="h-16 w-16" />
            </span>
            <div>
              <p className="font-hand text-2xl text-tape">Let’s talk about a child, a class or a role</p>
              <h2 className="mt-1 text-3xl leading-tight text-paper sm:text-5xl">Get in touch</h2>
              <div className="mt-6 flex flex-col items-start gap-3">
                {PROFILE.email && (
                  <a href={`mailto:${PROFILE.email}`} className="break-all font-display text-2xl text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:text-3xl">
                    {PROFILE.email}
                  </a>
                )}
                {PROFILE.linkedin && (
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="font-mono text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper">
                    LinkedIn profile →
                  </a>
                )}
              </div>
            </div>
          </div>
        </Band>
      )}
    </>
  );
}

export { hasContact };
