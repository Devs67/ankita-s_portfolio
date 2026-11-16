import { BEHAVIOUR_AREAS } from '../data/behaviourAreas';
import { BulletList, MarginNote, PageIntro, Row, SubHeading } from '../components/ui';
import { EvidenceBack } from './EvidenceBack';

export function BehaviourAreasPage() {
  return (
    <>
      <PageIntro eyebrow={<EvidenceBack />} title="Behaviour areas">
        <p>The kinds of behaviour that come up most in school, where they show up, what tends to set them off, and what helps.</p>
      </PageIntro>

      {BEHAVIOUR_AREAS.map((area) => (
        <Row
          key={area.id}
          id={area.id}
          as="article"
          className="border-t border-rule py-12"
          margin={<MarginNote>{area.maintainingFunction.replace(/^Primary:\s*/, '').split(/[;(]/)[0].trim()}</MarginNote>}
        >
          <h2 className="text-2xl leading-snug sm:text-3xl">{area.title}</h2>
          <p className="mt-1 text-ink">{area.subtitle}</p>

          <div className="mt-8 grid max-w-5xl gap-x-10 gap-y-8 md:grid-cols-2">
            <div>
              <SubHeading>Where it shows up</SubHeading>
              <BulletList items={area.contexts} />
            </div>
            <div>
              <SubHeading>Common triggers</SubHeading>
              <BulletList items={area.triggers} />
            </div>
            <div>
              <SubHeading>What it looks like</SubHeading>
              <BulletList items={area.looksLike} />
            </div>
            <div>
              <SubHeading>What helps</SubHeading>
              <BulletList items={area.strategies} />
            </div>
          </div>

          <dl className="mt-8 grid max-w-5xl gap-4 border-t border-dashed border-rule pt-5 text-[0.9375rem] md:grid-cols-2">
            <div>
              <dt className="font-mono text-xs">IB approaches to learning</dt>
              <dd className="text-ink">{area.ibAtlLink}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs">In clinical terms</dt>
              <dd>{area.clinicalTerms}</dd>
            </div>
          </dl>
        </Row>
      ))}
    </>
  );
}
