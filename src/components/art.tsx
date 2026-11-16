import React, { useState } from 'react';
import { PHOTO, PROFILE } from '../content/profile';

/*
  Hand-drawn notebook stickers: navy ink outlines over flat highlighter fills.
  Every drawing is decorative unless it carries text, in which case the text is real SVG text.
*/

const INK = 'var(--color-ink)';
const stroke = { stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export type IconName =
  | 'eye' | 'search' | 'clipboard' | 'people' | 'loop'
  | 'notebook' | 'folder' | 'map' | 'book'
  | 'school' | 'blocks' | 'clinic' | 'laptop' | 'cap' | 'mail'
  | 'board' | 'door' | 'mic' | 'plate' | 'ball';

const ICONS: Record<IconName, React.ReactNode> = {
  eye: (
    <>
      <path d="M5 24C11 13 37 13 43 24C37 35 11 35 5 24Z" fill="var(--color-sky)" {...stroke} />
      <circle cx="24" cy="24" r="7" fill="white" {...stroke} />
      <circle cx="24" cy="24" r="3" fill={INK} />
    </>
  ),
  search: (
    <>
      <circle cx="20" cy="20" r="12" fill="var(--color-butter)" {...stroke} />
      <path d="M14 18a7 7 0 0 1 6-5" fill="none" {...stroke} stroke="white" strokeWidth="2.5" />
      <path d="M29 29l11 11" fill="none" {...stroke} strokeWidth="4.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="10" y="9" width="28" height="33" rx="3" fill="var(--color-mint)" {...stroke} />
      <rect x="17" y="5" width="14" height="8" rx="2" fill="white" {...stroke} />
      <path d="M16 21h16M16 27h16M16 33h9" fill="none" {...stroke} />
      <path d="M30 32l2 2 4-5" fill="none" {...stroke} stroke="var(--color-margin)" />
    </>
  ),
  people: (
    <>
      <path d="M25 41c0-8 3-12 8-12s8 4 8 12Z" fill="var(--color-sky)" {...stroke} />
      <circle cx="33" cy="20" r="5" fill="var(--color-sky)" {...stroke} />
      <path d="M6 41c0-10 4-15 10-15s10 5 10 15Z" fill="var(--color-blush)" {...stroke} />
      <circle cx="16" cy="15" r="6" fill="var(--color-blush)" {...stroke} />
    </>
  ),
  loop: (
    <>
      <circle cx="24" cy="24" r="17" fill="var(--color-butter)" stroke="none" />
      <path d="M36 17A14 14 0 1 0 38 27" fill="none" {...stroke} strokeWidth="2.5" />
      <path d="M37 9v8h-8" fill="none" {...stroke} strokeWidth="2.5" />
      <path d="M18 24l4 4 8-8" fill="none" {...stroke} stroke="var(--color-margin)" />
    </>
  ),
  notebook: (
    <>
      <rect x="11" y="6" width="28" height="36" rx="2" fill="var(--color-sky)" {...stroke} />
      <path d="M18 6v36" stroke="var(--color-margin)" strokeWidth="1.5" />
      <path d="M22 15h12M22 21h12M22 27h8" fill="none" {...stroke} strokeWidth="1.6" />
      {[12, 19, 26, 33].map((y) => (
        <circle key={y} cx="11" cy={y} r="2.2" fill="white" {...stroke} strokeWidth="1.5" />
      ))}
    </>
  ),
  folder: (
    <>
      <path d="M5 13h13l4 4h21v22H5Z" fill="var(--color-butter)" {...stroke} />
      <rect x="11" y="22" width="18" height="11" rx="1" fill="white" {...stroke} strokeWidth="1.6" />
      <path d="M14 26h10M14 29.5h7" fill="none" {...stroke} strokeWidth="1.4" />
    </>
  ),
  map: (
    <>
      <path d="M5 12l12-4 14 4 12-4v28l-12 4-14-4-12 4Z" fill="var(--color-mint)" {...stroke} />
      <path d="M17 8v28M31 12v28" fill="none" {...stroke} strokeWidth="1.6" />
      <path d="M9 30c4-2 6-8 12-8s8 4 14-2" fill="none" stroke="var(--color-margin)" strokeWidth="1.8" strokeDasharray="2 3" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M24 14C18 10 10 10 5 12v25c5-2 13-2 19 2 6-4 14-4 19-2V12c-5-2-13-2-19 2Z" fill="var(--color-blush)" {...stroke} />
      <path d="M24 14v25" fill="none" {...stroke} />
      <path d="M10 19c3-1 7-1 10 0M10 25c3-1 7-1 10 0M28 19c3-1 7-1 10 0" fill="none" {...stroke} strokeWidth="1.5" />
    </>
  ),
  school: (
    <>
      <path d="M7 41V22l17-10 17 10v19Z" fill="var(--color-butter)" {...stroke} />
      <rect x="20" y="30" width="8" height="11" fill="white" {...stroke} />
      <circle cx="24" cy="22" r="3.5" fill="white" {...stroke} strokeWidth="1.6" />
      <path d="M24 12V4" fill="none" {...stroke} />
      <path d="M24 4h9l-2.5 3 2.5 3h-9Z" fill="var(--color-margin)" stroke="none" />
    </>
  ),
  blocks: (
    <>
      <rect x="6" y="27" width="16" height="14" rx="1.5" fill="var(--color-sky)" {...stroke} />
      <rect x="26" y="27" width="16" height="14" rx="1.5" fill="var(--color-mint)" {...stroke} />
      <rect x="15" y="11" width="16" height="16" rx="1.5" fill="var(--color-butter)" {...stroke} transform="rotate(-8 23 19)" />
    </>
  ),
  clinic: (
    <>
      <rect x="8" y="12" width="32" height="29" rx="3" fill="var(--color-sky)" {...stroke} />
      <path d="M17 12V8h14v4" fill="none" {...stroke} />
      <path d="M21 20h6v5h5v6h-5v5h-6v-5h-5v-6h5Z" fill="var(--color-margin)" stroke="none" />
    </>
  ),
  laptop: (
    <>
      <rect x="10" y="10" width="28" height="20" rx="2" fill="var(--color-sky)" {...stroke} />
      <path d="M5 34h38l-3 6H8Z" fill="var(--color-butter)" {...stroke} />
      <path d="M17 20l4 4 9-8" fill="none" {...stroke} />
    </>
  ),
  cap: (
    <>
      <path d="M12 21v9c0 3 5.5 6 12 6s12-3 12-6v-9" fill="var(--color-butter)" {...stroke} />
      <path d="M3 18l21-9 21 9-21 9Z" fill="var(--color-sky)" {...stroke} />
      <path d="M40 20v11" fill="none" {...stroke} />
      <circle cx="40" cy="33" r="2.5" fill="var(--color-margin)" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="5" y="11" width="38" height="27" rx="2.5" fill="var(--color-butter)" {...stroke} />
      <path d="M6 13l18 14 18-14" fill="none" {...stroke} />
    </>
  ),
  board: (
    <>
      <rect x="5" y="7" width="38" height="25" rx="2" fill="var(--color-mint)" {...stroke} />
      <path d="M13 32l-3 10M35 32l3 10" fill="none" {...stroke} />
      <path d="M11 18c3-4 6-4 8 0s5 4 8 0" fill="none" {...stroke} strokeWidth="1.6" />
      <path d="M11 25h14" fill="none" {...stroke} strokeWidth="1.6" />
      <path d="M31 21l3 3 5-6" fill="none" {...stroke} stroke="var(--color-margin)" />
    </>
  ),
  door: (
    <>
      <path d="M4 42h40" fill="none" {...stroke} />
      <rect x="13" y="6" width="22" height="36" rx="1.5" fill="var(--color-sky)" {...stroke} />
      <rect x="17" y="10" width="14" height="10" rx="1" fill="white" {...stroke} strokeWidth="1.6" />
      <circle cx="30" cy="27" r="1.8" fill={INK} />
    </>
  ),
  mic: (
    <>
      <path d="M13 20c0 7 5 11 11 11s11-4 11-11" fill="none" {...stroke} />
      <rect x="18" y="5" width="12" height="20" rx="6" fill="var(--color-blush)" {...stroke} />
      <path d="M24 31v9M16 41h16" fill="none" {...stroke} />
    </>
  ),
  plate: (
    <>
      <circle cx="24" cy="24" r="15" fill="var(--color-butter)" {...stroke} />
      <circle cx="24" cy="24" r="8.5" fill="white" {...stroke} strokeWidth="1.6" />
      <path d="M4 10v8a2 2 0 0 0 2 2v20M44 10v30" fill="none" {...stroke} strokeWidth="1.8" />
    </>
  ),
  ball: (
    <>
      <circle cx="24" cy="24" r="16" fill="var(--color-blush)" {...stroke} />
      <path d="M8 24h32M24 8c-7 6-7 26 0 32M24 8c7 6 7 26 0 32" fill="none" {...stroke} strokeWidth="1.6" />
    </>
  ),
};

export function Icon({ name, className = 'h-12 w-12' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={`shrink-0 overflow-visible ${className}`}>
      {ICONS[name]}
    </svg>
  );
}

export function Star({ className = 'h-6 w-6', fill = 'var(--color-tape)' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 2.5l2.7 6 6.5.6-4.9 4.3 1.5 6.4L12 16.5 6.2 19.8l1.5-6.4L2.8 9.1l6.5-.6Z" fill={fill} {...stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function Squiggle({ className = 'h-4 w-24', color = 'var(--color-margin)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 12" aria-hidden="true" preserveAspectRatio="none" className={className}>
      <path d="M2 6c6-6 10 6 16 0s10 6 16 0 10 6 16 0 10 6 16 0 10 6 16 0 10 6 16 0" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Taped polaroid. Shows public/ankita.jpg, or a drawn monogram until that file exists. */
export function Portrait() {
  const [failed, setFailed] = useState(false);
  const initials = PROFILE.name
    .split(' ')
    .map((w) => w[0])
    .join('');
  return (
    <figure className="relative mx-auto w-60 rotate-2 bg-white p-3 pb-2 shadow-[0_18px_40px_-18px_rgba(30,43,111,0.45)] ring-1 ring-rule sm:w-72">
      <span aria-hidden="true" className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-tape/75" />
      <div className="aspect-[4/5] overflow-hidden bg-sky">
        {failed ? (
          <svg viewBox="0 0 200 250" role="img" aria-label={`${PROFILE.name} (photo coming soon)`} className="h-full w-full">
            <circle cx="100" cy="112" r="62" fill="var(--color-butter)" stroke={INK} strokeWidth="2.5" />
            <text x="100" y="132" textAnchor="middle" fontFamily="var(--font-display)" fontSize="56" fill={INK}>
              {initials}
            </text>
            <path d="M36 214c20-12 40 12 64 0s44 12 64 0" fill="none" stroke="var(--color-margin)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M160 40l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="var(--color-tape)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="38" cy="58" r="9" fill="var(--color-mint)" stroke={INK} strokeWidth="1.8" />
          </svg>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}${PHOTO}`}
            alt={`Portrait of ${PROFILE.name}`}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <figcaption className="pt-2 text-center font-hand text-2xl text-ink">Ms {PROFILE.firstName}</figcaption>
    </figure>
  );
}

/** Three steps, one per IB programme, with a child growing taller on each. */
export function AgeSteps() {
  const steps = [
    { name: 'Early Years', ages: 'ages 3–5', x: 8, h: 62, fill: 'var(--color-butter)', kid: 0.72 },
    { name: 'PYP', ages: 'ages 6–11', x: 126, h: 104, fill: 'var(--color-mint)', kid: 0.88 },
    { name: 'MYP', ages: 'ages 11–16', x: 244, h: 146, fill: 'var(--color-sky)', kid: 1.04 },
  ];
  const base = 232;
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="I work across three IB programmes: Early Years (ages 3–5), PYP (ages 6–11) and MYP (ages 11–16)" className="h-auto w-full">
      {steps.map((s) => {
        const top = base - s.h;
        const k = s.kid;
        const cx = s.x + 54;
        return (
          <g key={s.name}>
            <rect x={s.x} y={top} width="108" height={s.h} rx="4" fill={s.fill} stroke={INK} strokeWidth="2" />
            <text x={cx} y={top + 28} textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fill={INK}>
              {s.name}
            </text>
            <text x={cx} y={top + 50} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--color-graphite)">
              {s.ages}
            </text>
            {/* the child standing on this step */}
            <g transform={`translate(${cx} ${top}) scale(${k})`}>
              <path d="M-13 0v-30c0-8 6-13 13-13s13 5 13 13V0" fill="var(--color-blush)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
              <path d="M-5 0v-10M5 0v-10" stroke={INK} strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="-54" r="10" fill="white" stroke={INK} strokeWidth="2" />
            </g>
          </g>
        );
      })}
      <path d="M4 232h352" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** The child at the centre, with everyone who carries the same plan around them. */
export function SupportCircle() {
  const people = [
    ['Homeroom', 'teachers'],
    ['Subject', 'teachers'],
    ['Shadow', 'teachers'],
    ['Parents', ''],
    ['Counselling', 'team'],
  ];
  const fills = ['var(--color-mint)', 'var(--color-sky)', 'var(--color-blush)', 'var(--color-butter)', 'var(--color-mint)'];
  const C = 200;
  const R = 138;
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="The child at the centre, supported by homeroom teachers, subject teachers, shadow teachers, parents and the counselling team"
      className="h-auto w-full"
    >
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-rule)" strokeWidth="2" strokeDasharray="4 7" strokeLinecap="round" />
      {people.map((_, i) => {
        const a = (-90 + i * 72) * (Math.PI / 180);
        return <line key={i} x1={C} y1={C} x2={C + R * Math.cos(a)} y2={C + R * Math.sin(a)} stroke="var(--color-rule)" strokeWidth="2" />;
      })}
      <circle cx={C} cy={C} r="60" fill="var(--color-butter)" stroke={INK} strokeWidth="2.5" />
      <text x={C} y={C - 2} textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fill={INK}>
        The child
      </text>
      <text x={C} y={C + 20} textAnchor="middle" fontFamily="var(--font-hand)" fontSize="16" fill="var(--color-margin)">
        at the centre
      </text>
      {people.map(([l1, l2], i) => {
        const a = (-90 + i * 72) * (Math.PI / 180);
        const x = C + R * Math.cos(a);
        const y = C + R * Math.sin(a);
        return (
          <g key={l1}>
            <circle cx={x} cy={y} r="46" fill={fills[i]} stroke={INK} strokeWidth="2" />
            <text x={x} y={l2 ? y - 3 : y + 5} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fontWeight="700" fill={INK}>
              {l1}
            </text>
            {l2 && (
              <text x={x} y={y + 15} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="14" fill={INK}>
                {l2}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Antecedent → Behaviour → Consequence, and where a support plan steps in. */
export function AbcCycle() {
  const C = { x: 210, y: 196 };
  const R = 138;
  const at = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(C.x + R * Math.cos(a)).toFixed(1)} ${(C.y + R * Math.sin(a)).toFixed(1)}`;
  };
  const arc = (from: number, to: number) => `M${at(from)}A${R} ${R} 0 0 1 ${at(to)}`;
  const nodes = [
    { deg: -90, letter: 'A', word: 'Antecedent', fill: 'var(--color-butter)', act: 'prevent', dx: 64, dy: -26, anchor: 'start' },
    { deg: 30, letter: 'B', word: 'Behaviour', fill: 'var(--color-mint)', act: 'teach', dx: 0, dy: 76, anchor: 'middle' },
    { deg: 150, letter: 'C', word: 'Consequence', fill: 'var(--color-blush)', act: 'respond', dx: 0, dy: 76, anchor: 'middle' },
  ] as const;
  const fns = ['Escape', 'Attention', 'Tangible', 'Sensory'];
  return (
    <svg
      viewBox="0 0 420 380"
      role="img"
      aria-label="The ABC cycle: an antecedent sets off a behaviour, the consequence shapes the next antecedent. A support plan prevents the trigger, teaches a replacement behaviour, and sets how adults respond. In the middle: what the behaviour is for — escape, attention, something tangible, or a sensory need."
      className="h-auto w-full"
    >
      <defs>
        <marker id="abc-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1l8 4-8 4" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>
      {[
        [-64, 4],
        [56, 124],
        [176, 244],
      ].map(([f, t]) => (
        <path key={f} d={arc(f, t)} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" markerEnd="url(#abc-arrow)" />
      ))}

      <text x={C.x} y={C.y - 28} textAnchor="middle" fontFamily="var(--font-hand)" fontSize="17" fill="var(--color-margin)">
        what is it for?
      </text>
      {fns.map((f, i) => {
        const x = C.x + (i % 2 === 0 ? -40 : 40);
        const y = C.y - 4 + Math.floor(i / 2) * 30;
        return (
          <g key={f}>
            <rect x={x - 36} y={y - 11} width="72" height="24" rx="12" fill="white" stroke="var(--color-rule)" strokeWidth="1.5" />
            <text x={x} y={y + 5.5} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="13" fill={INK}>
              {f}
            </text>
          </g>
        );
      })}

      {nodes.map((n) => {
        const a = (n.deg * Math.PI) / 180;
        const x = C.x + R * Math.cos(a);
        const y = C.y + R * Math.sin(a);
        return (
          <g key={n.letter}>
            <circle cx={x} cy={y} r="48" fill={n.fill} stroke={INK} strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--font-display)" fontSize="30" fill={INK}>
              {n.letter}
            </text>
            <text x={x} y={y + 24} textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12.5" fill={INK}>
              {n.word}
            </text>
            <text x={x + n.dx} y={y + n.dy} textAnchor={n.anchor} fontFamily="var(--font-hand)" fontSize="19" fontWeight="700" fill="var(--color-margin)">
              {n.anchor === 'start' ? `← ${n.act}` : `↑ ${n.act}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
