import { useState } from 'react';
import { INITIAL_ABBREVIATIONS } from '../data/behavioralData';
import { Abbreviation } from '../types/behavioral';
import { searchAbbreviations } from '../utils/behavioralAnalysis';
import { Icon, IconName } from '../components/art';
import { EvidenceIntro, More } from '../components/evidence';
import { EvidenceBack } from './EvidenceBack';

const DOMAIN_LOOK: Record<Abbreviation['domain'], { label: string; icon: IconName; tile: string }> = {
  'ABA Clinical': { label: 'Behaviour analysis', icon: 'search', tile: 'bg-sky' },
  'IB Education': { label: 'IB', icon: 'school', tile: 'bg-butter' },
  'Multidisciplinary & SEN': { label: 'Special education', icon: 'people', tile: 'bg-mint' },
};

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<string>('all');
  const terms = searchAbbreviations(INITIAL_ABBREVIATIONS, query, domain);

  return (
    <>
      <EvidenceIntro
        back={<EvidenceBack />}
        title="Glossary"
        intro="The shorthand used in these records, in plain language."
        icon="book"
        tile="bg-wash"
        note="tap “in school” for an example"
      />

      <section aria-label="Find a term" className="flex flex-col gap-4 border-t border-rule py-8 md:flex-row md:items-center">
        <label className="block md:w-80">
          <span className="sr-only">Search terms</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, e.g. FCT"
            className="w-full rounded-full border border-rule bg-white px-4 py-2.5 text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none"
          />
        </label>
        <div role="group" aria-label="Filter by area" className="flex flex-wrap gap-2">
          {[['all', 'All'] as const, ...Object.entries(DOMAIN_LOOK).map(([k, v]) => [k, v.label] as const)].map(([value, label]) => {
            const look = DOMAIN_LOOK[value as Abbreviation['domain']];
            const active = domain === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setDomain(value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active ? 'border-ink bg-ink text-paper' : 'border-rule bg-white/70 text-ink hover:border-ink'
                }`}
              >
                {look && <Icon name={look.icon} className="h-5 w-5" />}
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {terms.length === 0 ? (
        <p className="pb-16 text-ink">No terms match “{query}”. Try a shorter word, or choose All.</p>
      ) : (
        <ul className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {terms.map((t) => {
            const look = DOMAIN_LOOK[t.domain];
            return (
              <li key={t.id} className="flex flex-col rounded-2xl bg-white/90 p-5 ring-1 ring-rule">
                <div className="flex items-start justify-between gap-3">
                  <h2 className={`-rotate-2 rounded-lg px-2.5 py-1 font-display text-2xl leading-none text-ink ${look.tile}`}>{t.acronym}</h2>
                  <span title={look.label}>
                    <Icon name={look.icon} className="h-7 w-7" />
                    <span className="sr-only">{look.label}</span>
                  </span>
                </div>
                <p className="mt-3 font-bold leading-snug text-ink">{t.fullName}</p>
                <p className="mt-1 flex-1 text-[0.9375rem]">{t.definition}</p>
                <More label="in school">
                  <p className="font-hand text-lg leading-snug text-margin">{t.exampleInSchool}</p>
                </More>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
