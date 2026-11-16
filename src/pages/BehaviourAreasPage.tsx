import { BEHAVIOUR_AREAS } from '../data/behaviourAreas';
import { BulletList } from '../components/ui';
import { Icon, IconName } from '../components/art';
import { EvidenceIntro, More, Note } from '../components/evidence';
import { EvidenceBack } from './EvidenceBack';

const AREA_LOOK: Record<string, { icon: IconName; tile: string; short: string }> = {
  'executive-function': { icon: 'clipboard', tile: 'bg-sky', short: 'Getting started on work' },
  'emotional-regulation': { icon: 'bolt', tile: 'bg-butter', short: 'Big emotions' },
  'social-communication': { icon: 'people', tile: 'bg-mint', short: 'Getting on with peers' },
  'sensory-modulation': { icon: 'wave', tile: 'bg-blush', short: 'Sensory needs' },
};
const FALLBACK = { icon: 'map' as IconName, tile: 'bg-wash', short: '' };

const PANELS = [
  { key: 'contexts', icon: 'pin', title: 'Where it shows up', tone: 'bg-white/85 ring-1 ring-rule' },
  { key: 'triggers', icon: 'bolt', title: 'What sets it off', tone: 'bg-white/85 ring-1 ring-rule' },
  { key: 'looksLike', icon: 'eye', title: 'What it looks like', tone: 'bg-white/85 ring-1 ring-rule' },
  { key: 'strategies', icon: 'heart', title: 'What helps', tone: 'bg-mint/70 ring-2 ring-ink' },
] as const;

export function BehaviourAreasPage() {
  return (
    <>
      <EvidenceIntro
        back={<EvidenceBack />}
        title="Behaviour areas"
        intro="The behaviour that comes up most in school: where, why, and what helps."
        icon="map"
        tile="bg-blush"
        note="pick an area to jump to it"
      />

      {/* Jump to an area */}
      <nav aria-label="Areas" className="grid grid-cols-2 gap-3 border-t border-rule py-8 lg:grid-cols-4">
        {BEHAVIOUR_AREAS.map((area) => {
          const look = AREA_LOOK[area.id] ?? FALLBACK;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => document.getElementById(area.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:ring-2 hover:ring-ink"
            >
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${look.tile}`}>
                <Icon name={look.icon} className="h-9 w-9" />
              </span>
              <span className="text-sm font-bold leading-snug text-ink">{look.short || area.title}</span>
            </button>
          );
        })}
      </nav>

      {BEHAVIOUR_AREAS.map((area) => {
        const look = AREA_LOOK[area.id] ?? FALLBACK;
        const primary = area.maintainingFunction.replace(/^Primary:\s*/, '').split(/[;(]/)[0].trim();
        return (
          <article key={area.id} id={area.id} className="scroll-mt-6 border-t border-rule py-12">
            <header className="flex flex-wrap items-center gap-5">
              <span className={`grid h-20 w-20 shrink-0 -rotate-3 place-items-center rounded-2xl border-2 border-ink ${look.tile} shadow-[4px_4px_0_var(--color-ink)]`}>
                <Icon name={look.icon} className="h-14 w-14" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl leading-snug sm:text-3xl">{look.short || area.title}</h2>
                <p className="mt-1 text-sm">{area.title}</p>
              </div>
              <Note className="w-full sm:w-auto">usually about: {primary.toLowerCase()}</Note>
            </header>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {PANELS.map((p) => (
                <div key={p.key} className={`rounded-2xl p-5 ${p.tone}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <Icon name={p.icon} className="h-9 w-9" />
                    <h3 className="font-sans text-base font-bold">{p.title}</h3>
                  </div>
                  <div className="text-[0.9375rem] text-ink">
                    <BulletList items={area[p.key]} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-start gap-x-6">
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky px-3 py-1 text-sm text-ink">
                <Icon name="school" className="h-5 w-5" />
                {area.ibAtlLink}
              </span>
              <More label="In clinical terms">
                <p className="max-w-3xl">{area.clinicalTerms}</p>
              </More>
            </div>
          </article>
        );
      })}
    </>
  );
}
