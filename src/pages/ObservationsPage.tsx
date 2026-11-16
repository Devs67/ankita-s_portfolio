import { useMemo, useState } from 'react';
import { INITIAL_ABC_LOGS } from '../data/behavioralData';
import { INCIDENT_STORIES, StoryPanel } from '../data/incidentStories';
import { ABCEntry, BehaviorFunction } from '../types/behavioral';
import { calculateFunctionDistribution, generateTimeOfDayDistribution } from '../utils/behavioralAnalysis';
import { CircledLetter, SubHeading, splitTimestamp } from '../components/ui';
import { Icon } from '../components/art';
import { EvidenceIntro, FUNCTION_LOOK, FunctionBadge, IntensityMeter, Note, SettingBadge } from '../components/evidence';
import { EvidenceBack } from './EvidenceBack';

const FN_FILL: Record<BehaviorFunction, string> = {
  'Escape/Avoidance': 'var(--color-sky)',
  Attention: 'var(--color-butter)',
  'Access to Tangible': 'var(--color-mint)',
  'Automatic/Sensory': 'var(--color-blush)',
  'Multiple / Combined': 'var(--color-wash)',
};

const SLOT_SHORT = ['Arrival', 'Lessons', 'Lunch & recess', 'Afternoon', 'Home time'];

export function ObservationsPage() {
  const [fn, setFn] = useState<BehaviorFunction | 'all'>('all');

  const distribution = useMemo(() => calculateFunctionDistribution(INITIAL_ABC_LOGS).filter((d) => d.count > 0), []);
  const timeOfDay = useMemo(() => generateTimeOfDayDistribution(INITIAL_ABC_LOGS), []);
  const top = distribution.reduce((a, b) => (b.count > a.count ? b : a));
  const peak = timeOfDay.reduce((a, b) => (b.count > a.count ? b : a));
  const records = fn === 'all' ? INITIAL_ABC_LOGS : INITIAL_ABC_LOGS.filter((l) => l.perceivedFunction === fn);

  return (
    <>
      <EvidenceIntro
        back={<EvidenceBack />}
        title="Observation records"
        intro="What came before, what the child did, what came after — noted as it happened."
        icon="notebook"
        tile="bg-sky"
        note="every record is an A → B → C"
      />

      {/* What the behaviour is for: the tiles double as the filter */}
      <section aria-labelledby="fn-title" className="border-t border-rule py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <SubHeading>
              <span id="fn-title">What the behaviour gets the child</span>
            </SubHeading>
            <p className="text-sm">Tap a card to see only those records.</p>
          </div>
          <button
            type="button"
            aria-pressed={fn === 'all'}
            onClick={() => setFn('all')}
            className={`rounded-full border px-3.5 py-1.5 text-sm ${fn === 'all' ? 'border-ink bg-ink text-paper' : 'border-rule bg-white/70 text-ink hover:border-ink'}`}
          >
            All {INITIAL_ABC_LOGS.length}
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {distribution.map((d) => {
            const look = FUNCTION_LOOK[d.functionName];
            const active = fn === d.functionName;
            return (
              <button
                key={d.functionName}
                type="button"
                aria-pressed={active}
                onClick={() => setFn(active ? 'all' : d.functionName)}
                className={`relative rounded-2xl border-2 bg-white p-4 text-left transition-all ${
                  active ? 'border-ink shadow-[5px_5px_0_var(--color-ink)]' : 'border-transparent ring-1 ring-rule hover:border-ink/40'
                }`}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${look.tile}`}>
                    <Icon name={look.icon} className="h-9 w-9" />
                  </span>
                  <span className="font-display text-3xl leading-none text-ink">{d.count}</span>
                </span>
                <span className="mt-3 block font-bold text-ink">{look.short}</span>
                <span className="block text-sm">{look.plain}</span>
                <span aria-hidden="true" className="mt-3 flex gap-1">
                  {INITIAL_ABC_LOGS.map((_, i) => (
                    <span key={i} className={`h-1.5 flex-1 rounded-full ${i < d.count ? 'bg-ink' : 'bg-rule'}`} />
                  ))}
                </span>
                {d.count === top.count && <span className="absolute -top-3 right-3 rotate-3 rounded bg-tape px-2 font-hand text-sm text-ink">most often</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* When it happens: the school day as a timeline */}
      <section aria-labelledby="day-title" className="border-t border-rule py-10">
        <SubHeading>
          <span id="day-title">When it happens</span>
        </SubHeading>
        <div className="mt-4 rounded-2xl bg-white/80 p-4 ring-1 ring-rule sm:p-6">
          <DayStrip logs={INITIAL_ABC_LOGS} peakIndex={timeOfDay.indexOf(peak)} />
          <Note className="mt-2">
            ↑ busiest stretch: {SLOT_SHORT[timeOfDay.indexOf(peak)].toLowerCase()} ({peak.timeRange.replace(' - ', '–')}) — {peak.count} of{' '}
            {INITIAL_ABC_LOGS.length} incidents
          </Note>
        </div>
      </section>

      {/* The records themselves */}
      <section aria-labelledby="rec-title" className="border-t border-rule pt-10 pb-16">
        <div className="flex items-baseline justify-between gap-4">
          <SubHeading>
            <span id="rec-title">Records</span>
          </SubHeading>
          <span className="font-mono text-sm">
            {records.length} shown{fn !== 'all' && ` · ${FUNCTION_LOOK[fn].short}`}
          </span>
        </div>
        <div className="mt-5 grid gap-5">
          {records.map((log) => (
            <RecordCard key={log.id} log={log} />
          ))}
        </div>
      </section>
    </>
  );
}

/** 08:00–16:00 with each incident placed at its time, coloured by what it was for. */
function DayStrip({ logs, peakIndex }: { logs: ABCEntry[]; peakIndex: number }) {
  const W = 640;
  const x0 = 16;
  const x1 = W - 16;
  const xAt = (hours: number) => x0 + ((hours - 8) / 8) * (x1 - x0);
  const bounds = [8, 9.5, 11.5, 13, 14.5, 16];
  const placed = logs
    .map((l) => {
      const [h, m] = splitTimestamp(l.timestamp).time.split(':').map(Number);
      return { log: l, x: xAt(h + m / 60) };
    })
    .sort((a, b) => a.x - b.x);
  // Stack incidents that sit close together so none hide another
  const rows: number[] = [];
  const dots = placed.map((p) => {
    let row = 0;
    while (rows[row] !== undefined && p.x - rows[row] < 20) row++;
    rows[row] = p.x;
    return { ...p, y: 64 - row * 20 };
  });

  return (
    <svg viewBox={`0 0 ${W} 120`} role="img" aria-label="Incidents placed across the school day from 8am to 4pm" className="h-auto w-full">
      {bounds.slice(0, -1).map((b, i) => (
        <g key={b}>
          <rect
            x={xAt(b)}
            y="8"
            width={xAt(bounds[i + 1]) - xAt(b) - 2}
            height="76"
            rx="8"
            fill={i === peakIndex ? 'var(--color-butter)' : 'var(--color-wash)'}
            opacity={i === peakIndex ? 0.7 : 0.6}
          />
          <text x={(xAt(b) + xAt(bounds[i + 1])) / 2} y="112" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fill="var(--color-graphite)">
            {SLOT_SHORT[i]}
          </text>
        </g>
      ))}
      <line x1={x0} x2={x1} y1="84" y2="84" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
      {[8, 10, 12, 14, 16].map((h) => (
        <text key={h} x={xAt(h)} y="97" textAnchor={h === 8 ? 'start' : h === 16 ? 'end' : 'middle'} fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-graphite)">
          {h > 12 ? h - 12 : h}
          {h >= 12 ? 'pm' : 'am'}
        </text>
      ))}
      {dots.map(({ log, x, y }) => {
        const { time } = splitTimestamp(log.timestamp);
        return (
          <circle key={log.id} cx={x} cy={y} r="8.5" fill={FN_FILL[log.perceivedFunction]} stroke="var(--color-ink)" strokeWidth="2">
            <title>
              {`${time} · ${FUNCTION_LOOK[log.perceivedFunction].short} · ${log.intensity}`}
            </title>
          </circle>
        );
      })}
    </svg>
  );
}

/** One drawn panel (360×260). The hand-lettered words sit on top as text and scale with the picture. */
function StoryPicture({ panel }: { panel: StoryPanel }) {
  const x = (v: number) => `${(v / 360) * 100}%`;
  const y = (v: number) => `${(v / 260) * 100}%`;
  const size = (px: number) => `${px / 3.6}cqw`;
  const ink = (red: boolean) => (red ? 'text-margin' : 'text-ink');
  return (
    <div className="relative aspect-[360/260] w-full [container-type:inline-size]">
      <img src={`${import.meta.env.BASE_URL}${panel.file}`} alt="" width={360} height={260} loading="lazy" className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="absolute inset-0 font-hand font-bold">
        {panel.says.map((s) => (
          <span
            key={s.text}
            className={`absolute text-center ${ink(s.red)}`}
            style={{ left: x(s.x), top: y(s.y + 4), width: x(s.w), fontSize: size(16), lineHeight: size(26) }}
          >
            {s.text}
          </span>
        ))}
        {panel.words.map((w) => (
          <span
            key={w.text}
            className={`absolute whitespace-nowrap ${ink(w.red)}`}
            style={{ left: x(w.x), top: y(w.y), fontSize: size(w.size), lineHeight: 1.6, transform: w.rot ? `rotate(${w.rot}deg)` : undefined }}
          >
            {w.text}
          </span>
        ))}
      </div>
    </div>
  );
}

const ABC = [
  { key: 'antecedent', letter: 'A', label: 'Just before' },
  { key: 'behavior', letter: 'B', label: 'What happened' },
  { key: 'consequence', letter: 'C', label: 'Just after' },
] as const;

function RecordCard({ log }: { log: ABCEntry }) {
  const [open, setOpen] = useState(false);
  const { time } = splitTimestamp(log.timestamp);
  const student = log.studentCode.replace(/\s*\(.*\)/, '');
  const story = INCIDENT_STORIES[log.id];

  return (
    <article className="rounded-2xl bg-white/85 p-5 ring-1 ring-rule sm:p-6">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="font-mono text-sm text-margin">
          {time}
        </span>
        <SettingBadge setting={log.setting} />
        <IntensityMeter level={log.intensity} />
        <span className="inline-flex items-center gap-1 text-sm text-ink">
          <Icon name="timer" className="h-5 w-5" /> {log.durationMinutes} min
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="font-mono text-xs">
            {student} · {log.programme}
          </span>
          <FunctionBadge fn={log.perceivedFunction} />
        </span>
      </header>

      <ol className="mt-5 grid gap-3 md:grid-cols-3 md:gap-0">
        {ABC.map((step, i) => {
          const panel = story?.panels[i];
          return (
            <li key={step.key} className="relative overflow-hidden rounded-xl bg-wash/60 md:mr-6">
              {panel && <StoryPicture panel={panel} />}
              <div className="flex gap-3 p-3.5">
                <CircledLetter letter={step.letter} className="h-8 w-8" />
                <div className="min-w-0">
                  <p className="font-mono text-xs">{step.label}</p>
                  {panel ? (
                    <>
                      <p className="text-[0.9375rem] text-ink">{panel.caption}</p>
                      {open && <p className="mt-2 border-t border-dashed border-rule pt-2 text-sm">{log[step.key]}</p>}
                    </>
                  ) : (
                    <p className={`text-[0.9375rem] text-ink ${open ? '' : 'line-clamp-3'}`}>{log[step.key]}</p>
                  )}
                </div>
              </div>
              {i < 2 && (
                <span aria-hidden="true" className="absolute top-1/2 -right-5 hidden -translate-y-1/2 font-display text-xl text-margin md:block">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {open && (
        <dl className="mt-5 grid gap-4 text-[0.9375rem] sm:grid-cols-2">
          <div className="flex gap-3">
            <Icon name="blocks" className="h-8 w-8" />
            <div>
              <dt className="font-mono text-xs">Skill taught instead</dt>
              <dd className="text-ink">{log.replacementBehavior}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon name="people" className="h-8 w-8" />
            <div>
              <dt className="font-mono text-xs">How adults responded</dt>
              <dd className="text-ink">{log.consequenceInterventionApplied}</dd>
            </div>
          </div>
          {log.settingEvents && (
            <div className="flex gap-3">
              <Icon name="pin" className="h-8 w-8" />
              <div>
                <dt className="font-mono text-xs">Background that day</dt>
                <dd>{log.settingEvents}</dd>
              </div>
            </div>
          )}
          {log.notes && (
            <div className="flex gap-3">
              <Icon name="notebook" className="h-8 w-8" />
              <div>
                <dt className="font-mono text-xs">Therapist’s note</dt>
                <dd className="font-hand text-lg leading-snug text-ink">{log.notes}</dd>
              </div>
            </div>
          )}
        </dl>
      )}

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rule bg-white px-3 py-1 font-mono text-xs text-ink hover:border-ink"
      >
        <span aria-hidden="true" className={`transition-transform ${open ? 'rotate-90' : ''}`}>
          ▸
        </span>
        {open ? 'Show less' : 'Read full record'}
      </button>
    </article>
  );
}
