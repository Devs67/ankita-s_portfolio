import { INITIAL_CASE_STUDIES } from '../data/behavioralData';
import { Bar, BulletList, MarginNote, PageIntro, Row, SubHeading } from '../components/ui';
import { href } from '../router';
import { EvidenceBack } from './EvidenceBack';

export function CaseStudiesPage({ caseId }: { caseId?: string }) {
  if (caseId) {
    const study = INITIAL_CASE_STUDIES.find((c) => c.id === caseId);
    if (study) return <CaseStudyDetail id={study.id} />;
  }

  return (
    <>
      <PageIntro eyebrow={<EvidenceBack />} title="Case studies">
        <p>Individual students, followed from the first observations through a support plan to review. Names and identifying details have been changed.</p>
      </PageIntro>

      <ul className="border-t border-rule">
        {INITIAL_CASE_STUDIES.map((c) => (
          <li key={c.id} className="border-b border-rule">
            <Row
              as="div"
              className="py-8"
              margin={
                <div className="font-mono text-sm">
                  <div className="text-margin">IB {c.programme}</div>
                  <div>{c.gradeBand}</div>
                </div>
              }
            >
              <a href={href('evidence', 'case-studies', c.id)} className="group block">
                <h2 className="max-w-3xl text-2xl leading-snug group-hover:underline group-hover:decoration-rule group-hover:underline-offset-4">
                  {c.title}
                </h2>
                <p className="mt-2 font-mono text-[0.8125rem]">
                  {c.studentPseudonym} · {c.category} · {c.interventionData.durationWeeks} weeks
                </p>
                <p className="mt-2 text-ink">
                  {c.baselineData.frequencyPerWeek} incidents a week before → {c.interventionData.frequencyPerWeek} after
                </p>
              </a>
            </Row>
          </li>
        ))}
      </ul>
    </>
  );
}

function CaseStudyDetail({ id }: { id: string }) {
  const c = INITIAL_CASE_STUDIES.find((s) => s.id === id)!;
  const freqMax = Math.max(c.baselineData.frequencyPerWeek, c.interventionData.frequencyPerWeek);
  const durMax = Math.max(c.baselineData.durationAverageMin, c.interventionData.durationAverageMin);

  const section = 'border-t border-rule py-10';

  return (
    <>
      <PageIntro eyebrow={<EvidenceBack to={href('evidence', 'case-studies')} label="Case studies" />} title={c.title}>
        <p className="font-mono text-sm">
          {c.studentPseudonym} · IB {c.programme} · {c.gradeBand}
        </p>
      </PageIntro>

      <Row margin={<MarginNote>Situation</MarginNote>} className={section}>
        <p className="max-w-3xl">{c.presentingSituation}</p>
      </Row>

      <Row margin={<MarginNote>Target behaviour</MarginNote>} className={section}>
        <p className="max-w-3xl text-ink">{c.targetBehaviorOperationalDefinition}</p>
      </Row>

      <Row margin={<MarginNote>Hypothesis</MarginNote>} className={section}>
        <p className="max-w-3xl">{c.fbaHypothesis}</p>
        <p className="mt-3 font-mono text-sm text-ink">Function: {c.primaryFunction}</p>
      </Row>

      <Row margin={<MarginNote>Results</MarginNote>} className={section}>
        <p className="font-mono text-sm">Over {c.interventionData.durationWeeks} weeks</p>
        <div className="mt-5 grid max-w-3xl gap-10 sm:grid-cols-2">
          <div className="space-y-3">
            <SubHeading>Incidents per week</SubHeading>
            <Bar label="Before" value={c.baselineData.frequencyPerWeek} max={freqMax} tone="faint" />
            <Bar label="After" value={c.interventionData.frequencyPerWeek} max={freqMax} />
          </div>
          <div className="space-y-3">
            <SubHeading>Average length</SubHeading>
            <Bar label="Before" value={c.baselineData.durationAverageMin} max={durMax} detail={`${c.baselineData.durationAverageMin} min`} tone="faint" />
            <Bar label="After" value={c.interventionData.durationAverageMin} max={durMax} detail={`${c.interventionData.durationAverageMin} min`} />
          </div>
        </div>
      </Row>

      <Row margin={<MarginNote>What we did</MarginNote>} className={section}>
        <div className="grid max-w-5xl gap-10 lg:grid-cols-3">
          <div>
            <SubHeading>Before it happens</SubHeading>
            <BulletList items={c.antecedentInterventions} />
          </div>
          <div>
            <SubHeading>Skills taught</SubHeading>
            <BulletList items={c.replacementBehaviorsFCT} />
          </div>
          <div>
            <SubHeading>How adults respond</SubHeading>
            <BulletList items={c.consequenceExtinctionStrategies} />
          </div>
        </div>
      </Row>

      <Row margin={<MarginNote>Team</MarginNote>} className={section}>
        <p className="max-w-3xl">{c.multidisciplinaryCollaboration}</p>
      </Row>

      <Row margin={<MarginNote>IB links</MarginNote>} className={section}>
        <dl className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs">Learner profile</dt>
            <dd className="text-ink">{c.ibLearnerProfileTarget}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs">Approaches to learning</dt>
            <dd className="text-ink">{c.ibAtlFocus}</dd>
          </div>
        </dl>
      </Row>

      <Row margin={<MarginNote>Takeaways</MarginNote>} className={`${section} pb-16`}>
        <div className="max-w-3xl">
          <BulletList items={c.clinicalTakeaways} />
        </div>
      </Row>
    </>
  );
}
