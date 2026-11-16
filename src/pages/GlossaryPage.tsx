import { useState } from 'react';
import { INITIAL_ABBREVIATIONS } from '../data/behavioralData';
import { searchAbbreviations } from '../utils/behavioralAnalysis';
import { MarginNote, PageIntro, Row } from '../components/ui';
import { EvidenceBack } from './EvidenceBack';

const DOMAINS = [
  ['all', 'All'],
  ['ABA Clinical', 'Behaviour analysis'],
  ['IB Education', 'IB'],
  ['Multidisciplinary & SEN', 'Special education'],
] as const;

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<string>('all');
  const terms = searchAbbreviations(INITIAL_ABBREVIATIONS, query, domain);

  return (
    <>
      <PageIntro eyebrow={<EvidenceBack />} title="Glossary">
        <p>The shorthand used across these records and plans, in plain language, with an example from school.</p>
      </PageIntro>

      <Row margin={<MarginNote>Find</MarginNote>} className="border-t border-rule py-8">
        <div className="flex max-w-3xl flex-col gap-4">
          <label className="block">
            <span className="sr-only">Search terms</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search, e.g. FCT or reinforcement"
              className="w-full rounded-lg border border-rule bg-white px-4 py-2.5 text-ink placeholder:text-graphite/60 focus:border-ink focus:outline-none"
            />
          </label>
          <div role="group" aria-label="Filter by area" className="flex flex-wrap gap-2">
            {DOMAINS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={domain === value}
                onClick={() => setDomain(value)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  domain === value ? 'border-ink bg-ink text-paper' : 'border-rule text-ink hover:border-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Row>

      <div className="pb-16">
        {terms.length === 0 && (
          <Row className="border-t border-rule py-10">
            <p className="text-ink">No terms match “{query}”. Try a shorter word, or choose All.</p>
          </Row>
        )}
        {terms.map((t) => (
          <Row
            key={t.id}
            as="article"
            className="border-t border-rule py-7"
            margin={<h2 className="font-mono text-lg text-margin">{t.acronym}</h2>}
          >
            <div className="max-w-3xl">
              <p className="font-display text-xl text-ink">{t.fullName}</p>
              <p className="mt-1.5">{t.definition}</p>
              <p className="mt-2 text-[0.9375rem]">
                <span className="font-mono text-xs">In school: </span>
                {t.exampleInSchool}
              </p>
            </div>
          </Row>
        ))}
      </div>
    </>
  );
}
