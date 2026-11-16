import { useMemo, useState } from 'react';
import { INITIAL_ABC_LOGS } from '../data/behavioralData';
import { BehaviorFunction } from '../types/behavioral';
import { calculateFunctionDistribution, generateTimeOfDayDistribution } from '../utils/behavioralAnalysis';
import { Bar, CircledLetter, FUNCTION_SHORT, MarginNote, PageIntro, Row, SubHeading, splitTimestamp } from '../components/ui';
import { EvidenceBack } from './EvidenceBack';

export function ObservationsPage() {
  const [fn, setFn] = useState<BehaviorFunction | 'all'>('all');

  const distribution = useMemo(() => calculateFunctionDistribution(INITIAL_ABC_LOGS).filter((d) => d.count > 0), []);
  const timeOfDay = useMemo(() => generateTimeOfDayDistribution(INITIAL_ABC_LOGS), []);
  const maxFn = Math.max(...distribution.map((d) => d.count));
  const maxSlot = Math.max(...timeOfDay.map((s) => s.count));

  const records = fn === 'all' ? INITIAL_ABC_LOGS : INITIAL_ABC_LOGS.filter((l) => l.perceivedFunction === fn);

  return (
    <>
      <PageIntro eyebrow={<EvidenceBack />} title="Observation records">
        <p>
          Each record follows the ABC format: what happened just before (<em>antecedent</em>), what the student did (
          <em>behaviour</em>), and what followed (<em>consequence</em>). Read together, the records show what a behaviour is doing
          for the child.
        </p>
      </PageIntro>

      <Row margin={<MarginNote>Patterns</MarginNote>} className="border-t border-rule py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SubHeading>What the behaviour gets the child</SubHeading>
            <div className="mt-4 space-y-4">
              {distribution.map((d) => (
                <Bar key={d.functionName} label={d.functionName} value={d.count} max={maxFn} detail={`${d.count} · ${d.percentage}%`} />
              ))}
            </div>
          </div>
          <div>
            <SubHeading>When it happens</SubHeading>
            <div className="mt-4 space-y-4">
              {timeOfDay.map((s) => (
                <Bar key={s.slot} label={s.timeRange} value={s.count} max={maxSlot} detail={`${s.count}`} />
              ))}
            </div>
          </div>
        </div>
      </Row>

      <Row margin={<MarginNote>Records</MarginNote>} className="border-t border-rule pt-12">
        <div role="group" aria-label="Filter by function" className="flex flex-wrap gap-2">
          {(['all', ...distribution.map((d) => d.functionName)] as const).map((option) => {
            const active = fn === option;
            const count = option === 'all' ? INITIAL_ABC_LOGS.length : distribution.find((d) => d.functionName === option)?.count;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setFn(option)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  active ? 'border-ink bg-ink text-paper' : 'border-rule text-ink hover:border-ink'
                }`}
              >
                {option === 'all' ? 'All' : FUNCTION_SHORT[option]} <span className="font-mono text-xs opacity-75">{count}</span>
              </button>
            );
          })}
        </div>
      </Row>

      <div className="pb-8">
        {records.map((log) => {
          const { date, time } = splitTimestamp(log.timestamp);
          return (
            <Row
              key={log.id}
              as="article"
              className="border-b border-rule py-10 last:border-b-0"
              margin={
                <div className="font-mono text-sm">
                  <div className="text-margin">{date}</div>
                  <div className="text-graphite">{time}</div>
                </div>
              }
            >
              <p className="font-mono text-[0.8125rem] text-graphite">
                {log.studentCode} · {log.setting} · {log.intensity} · {log.durationMinutes} min
              </p>

              <dl className="mt-4 space-y-3">
                {[
                  ['A', 'Antecedent', log.antecedent],
                  ['B', 'Behaviour', log.behavior],
                  ['C', 'Consequence', log.consequence],
                ].map(([letter, term, text]) => (
                  <div key={letter} className="flex gap-3">
                    <dt>
                      <CircledLetter letter={letter} className="h-8 w-8" />
                      <span className="sr-only">{term}</span>
                    </dt>
                    <dd className="max-w-3xl pt-0.5 text-ink">{text}</dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-6 grid max-w-3xl gap-x-8 gap-y-4 text-[0.9375rem] sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-xs">Function</dt>
                  <dd className="text-ink">{log.perceivedFunction}</dd>
                </div>
                {log.settingEvents && (
                  <div>
                    <dt className="font-mono text-xs">Background that day</dt>
                    <dd>{log.settingEvents}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-xs">Replacement taught</dt>
                  <dd>{log.replacementBehavior}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs">Response used</dt>
                  <dd>{log.consequenceInterventionApplied}</dd>
                </div>
                {log.notes && (
                  <div className="sm:col-span-2">
                    <dt className="font-mono text-xs">Notes</dt>
                    <dd>{log.notes}</dd>
                  </div>
                )}
              </dl>
            </Row>
          );
        })}
      </div>
    </>
  );
}
