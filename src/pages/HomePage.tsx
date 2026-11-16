import { MarginNote, Row } from '../components/ui';
import { EDUCATION, EXPERIENCE, EXPERTISE, OTHER_WORK, PROFILE, SCHOOL_LABEL } from '../content/profile';
import { href } from '../router';
import { EVIDENCE_INDEX } from '../content/evidenceIndex';

const METHOD = [
  {
    title: 'Observe and assess',
    text: 'Record each incident as it happens — what came just before, what the child did, what followed, where and for how long — alongside formal assessment such as VB-MAPP.',
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
    text: 'Homeroom and subject teachers, shadow teachers and parents practise the same responses, so the child meets the same answer everywhere. I also train and mentor new shadow teachers.',
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
    ['School', PROFILE.school],
    ['Programmes', PROFILE.programmes],
    ['Qualification', PROFILE.credentials],
    ['Works with', 'Homeroom and subject teachers, shadow teachers, the counselling team and parents'],
  ].filter(([, value]) => value);

  return (
    <>
      {/* Hero: who she is and what she does */}
      <section aria-labelledby="hero-title" className="pt-14 pb-16 sm:pt-20 sm:pb-20">
        <Row margin={<MarginNote>{PROFILE.location}</MarginNote>}>
          <h1 id="hero-title" className="text-[2.75rem] leading-[1.05] sm:text-7xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 font-mono text-sm">
            {PROFILE.role} · {PROFILE.programmes}
          </p>
          <p className="mt-8 max-w-3xl font-display text-[1.6rem] leading-snug text-ink sm:text-[2.1rem] sm:leading-[1.3]">
            I help children from the early years to middle school cope, learn and belong in the mainstream classroom.
          </p>
          <p className="mt-5 max-w-2xl text-lg">
            I observe what sets a behaviour off, write support plans with teachers and parents, and teach children the skills
            that work better — currently at {SCHOOL_LABEL}.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
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

      {/* The idea the practice rests on */}
      <Row
        className="border-t border-rule py-14 sm:py-16"
        margin={
          <span aria-hidden="true" className="block font-display text-7xl leading-[0.8] text-margin">
            “
          </span>
        }
      >
        <figure>
          <blockquote className="font-display text-3xl leading-tight text-ink sm:text-5xl">Kids do well if they can.</blockquote>
          <figcaption className="mt-4 font-mono text-sm">
            Dr Ross W. Greene, child psychologist · author of <cite className="not-italic">The Explosive Child</cite>
          </figcaption>
        </figure>
      </Row>

      {/* About */}
      <Row id="about" margin={<MarginNote>About</MarginNote>} className="border-t border-rule py-16">
        <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">Behaviour is communication. My job is to translate it.</h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="max-w-2xl space-y-4">
            <p>
              I’m {PROFILE.firstName}, a psychology-trained {PROFILE.role.toLowerCase()} at {SCHOOL_LABEL}. I support students’
              behavioural, emotional and learning needs across the {PROFILE.programmes} years — one-to-one, in small groups, and
              inside the mainstream classroom.
            </p>
            <p>
              Most of my day happens away from a desk: in classrooms, corridors, assemblies, the lunch hall and the line for
              sports, noting what happens just before a behaviour, what it looks like, and what follows. From those notes I work
              out what the behaviour is doing for the child, then plan with teachers and parents so the next time that moment
              comes round, it goes differently.
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

      {/* Experience: dates sit in the margin, like the dated entries in an observation notebook */}
      <Row id="experience" margin={<MarginNote>Experience</MarginNote>} className="border-t border-rule pt-16 pb-4">
        <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">From clinical training to the classroom</h2>
      </Row>
      <ol>
        {EXPERIENCE.map((role) => (
          <li key={`${role.title}-${role.dates}`}>
            <Row as="div" className="py-7" margin={<p className="font-mono text-sm text-margin md:pt-1">{role.dates}</p>}>
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
            </Row>
          </li>
        ))}
      </ol>
      <Row className="pb-6">
        <p className="max-w-3xl text-[0.9375rem]">{OTHER_WORK}</p>
      </Row>
      <Row className="pt-6 pb-16">
        <div className="grid max-w-5xl gap-10 border-t border-dashed border-rule pt-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="mb-3 font-sans text-[0.8125rem] font-bold uppercase tracking-wider">Education</h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className="mb-3 font-sans text-[0.8125rem] font-bold uppercase tracking-wider">Areas of expertise</h3>
            <ul className="flex flex-wrap gap-2">
              {EXPERTISE.map((skill) => (
                <li key={skill} className="rounded-full border border-rule px-3 py-1 text-[0.9375rem] text-ink">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
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
