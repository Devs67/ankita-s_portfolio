import { CircledLetter, MarginNote, Row } from '../components/ui';
import { PROFILE, SCHOOL_LABEL } from '../content/profile';
import { href } from '../router';
import { EVIDENCE_INDEX } from '../content/evidenceIndex';

const HERO_LINES = [
  {
    letter: 'A',
    term: 'antecedent',
    text: 'The room gets loud. The task is open-ended. The plan changes without warning.',
  },
  {
    letter: 'B',
    term: 'behaviour',
    text: 'A child pulls at their hair, runs for the corridor, or puts their head down.',
  },
  {
    letter: 'C',
    term: 'consequence',
    text: 'What the adults do next decides what the child learns. That’s where I work.',
  },
];

const METHOD = [
  {
    title: 'Observe',
    text: 'Record each incident as it happens: what came just before, what the child did, what followed, where, when and for how long.',
    link: { label: 'Observation records', to: href('evidence', 'observations') },
  },
  {
    title: 'Find the function',
    text: 'Read across the records for the pattern. Is the behaviour getting the child out of a demand, bringing attention, getting something, or meeting a sensory need?',
    link: { label: 'Behaviour areas', to: href('evidence', 'behaviour-areas') },
  },
  {
    title: 'Write the plan',
    text: 'A support plan in three parts: prevent the trigger, teach a replacement that does the same job, and agree how adults respond — down to a step-by-step de-escalation ladder.',
    link: { label: 'Support plans', to: href('evidence', 'support-plans') },
  },
  {
    title: 'Coach the team',
    text: 'Homeroom teachers, shadow teachers, learning support assistants and parents practise the same responses, so the child meets the same answer everywhere.',
  },
  {
    title: 'Review',
    text: 'Keep recording, compare against the starting picture, and adjust the plan until the new behaviour holds.',
    link: { label: 'Case studies', to: href('evidence', 'case-studies') },
  },
];

const hasContact = Boolean(PROFILE.email || PROFILE.linkedin);

export function HomePage() {
  const facts = [
    ['Role', PROFILE.role],
    ['Where', PROFILE.school || 'International Baccalaureate (IB) school'],
    ['Works with', 'Homeroom teachers, shadow teachers, learning support assistants and parents'],
    ['Experience', PROFILE.experience],
    ['Qualifications', PROFILE.credentials],
  ].filter(([, value]) => value);

  return (
    <>
      {/* Hero: the practice, written as an ABC record */}
      <section aria-labelledby="hero-title" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
        <Row margin={<MarginNote>Date: {new Date().toLocaleDateString('en-GB')}</MarginNote>}>
          <p className="font-mono text-sm text-graphite">
            {PROFILE.name} · {PROFILE.role}
          </p>
          <h1 id="hero-title" className="sr-only">
            {PROFILE.name}, {PROFILE.role}
          </h1>
        </Row>

        <ol className="mt-6">
          {HERO_LINES.map((line, i) => (
            <li key={line.letter}>
              <Row
                as="div"
                className="max-md:mt-6"
                margin={
                  <div className="flex items-center gap-3 md:justify-end md:pt-2">
                    <CircledLetter letter={line.letter} draw delay={0.25 + i * 0.35} className="h-10 w-10 sm:h-12 sm:w-12 md:order-last" />
                    <span className="font-mono text-xs text-margin">{line.term}</span>
                  </div>
                }
              >
                <p className="border-b border-rule pb-4 pt-1 font-display text-[1.6rem] leading-snug text-ink sm:pt-3 sm:text-[2.35rem] sm:leading-[1.25]">
                  <span className="sr-only">{line.term}: </span>
                  {line.text}
                </p>
              </Row>
            </li>
          ))}
        </ol>

        <Row className="mt-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={href('evidence')}
              className="rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-colors hover:bg-ink/90"
            >
              See the evidence
            </a>
            <a href={href('method')} className="font-semibold text-ink underline decoration-rule decoration-2 underline-offset-4 hover:decoration-ink">
              How I work
            </a>
          </div>
        </Row>
      </section>

      {/* About */}
      <Row id="about" margin={<MarginNote>About</MarginNote>} className="border-t border-rule py-16">
        <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">Behaviour is communication. My job is to translate it.</h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl space-y-4">
            <p>
              I’m {PROFILE.name}, a {PROFILE.role.toLowerCase()} at {SCHOOL_LABEL}. Most of my day happens away from a desk — in
              classrooms, corridors, assemblies, the lunch hall and the line for sports — noting what happens just before a
              behaviour, what it looks like, and what follows.
            </p>
            <p>
              From those notes I work out what the behaviour is doing for the child. Then I plan with the class team, so the next
              time that moment comes round, it goes differently — and the child has a better way to ask for what they need.
            </p>
          </div>
          <dl className="space-y-4 text-[0.9375rem]">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-xs text-graphite/80">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Row>

      {/* Method: a real sequence, so it's numbered */}
      <Row id="method" margin={<MarginNote>Method</MarginNote>} className="border-t border-rule py-16">
        <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">From one observation to a plan the whole team can follow</h2>
        <ol className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
          {METHOD.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="font-display text-3xl leading-none text-rule">{i + 1}</span>
              <div>
                <h3 className="font-sans text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5">{step.text}</p>
                {step.link && (
                  <a href={step.link.to} className="mt-2 inline-block font-mono text-sm text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                    {step.link.label} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Row>

      {/* Evidence: a notebook contents page */}
      <Row id="evidence" margin={<MarginNote>Evidence</MarginNote>} className="border-t border-rule py-16">
        <h2 className="text-3xl leading-tight sm:text-4xl">Evidence of practice</h2>
        <p className="mt-3 max-w-2xl">Records, plans and case studies from school-based work. All student details are de-identified.</p>
        <ul className="mt-10 max-w-3xl">
          {EVIDENCE_INDEX.map((item) => (
            <li key={item.slug} className="border-b border-rule last:border-b-0">
              <a href={href('evidence', item.slug)} className="group block py-5">
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-xl text-ink group-hover:underline group-hover:decoration-rule group-hover:underline-offset-4 sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="leader" aria-hidden="true" />
                  <span className="shrink-0 font-mono text-sm text-ink">{item.count}</span>
                </span>
                <span className="mt-1 block max-w-xl text-[0.9375rem]">{item.summary}</span>
              </a>
            </li>
          ))}
        </ul>
      </Row>

      {hasContact && (
        <Row id="contact" margin={<MarginNote>Contact</MarginNote>} className="border-t border-rule py-16">
          <h2 className="text-3xl leading-tight sm:text-4xl">Get in touch</h2>
          <div className="mt-6 flex flex-col gap-3">
            {PROFILE.email && (
              <a href={`mailto:${PROFILE.email}`} className="font-display text-2xl text-ink underline decoration-rule underline-offset-4 hover:decoration-ink sm:text-3xl">
                {PROFILE.email}
              </a>
            )}
            {PROFILE.linkedin && (
              <a href={PROFILE.linkedin} className="font-mono text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                LinkedIn profile →
              </a>
            )}
          </div>
        </Row>
      )}
    </>
  );
}

export { hasContact };
