import React from 'react';

/** A letter circled in margin-red pen, as in the handwritten ABC notes. */
export function CircledLetter({ letter, className = 'w-9 h-9' }: { letter: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={`shrink-0 ${className}`}>
      <circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke="var(--color-margin)"
        strokeWidth="1.8"
        strokeLinecap="round"
        transform="rotate(-100 20 20)"
      />
      <text
        x="20"
        y="26.5"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="18"
        fill="var(--color-margin)"
      >
        {letter}
      </text>
    </svg>
  );
}

/** Margin-note label: the small red annotation that sits left of the margin rule. */
export function MarginNote({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[0.8125rem] leading-snug text-margin">{children}</p>;
}

/** A block with an optional small label (section name, date) sitting above its content. */
export function Row({
  margin,
  children,
  id,
  className = '',
  as: Tag = 'section',
}: {
  margin?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: 'section' | 'article' | 'div';
}) {
  return (
    <Tag id={id} className={`scroll-mt-6 ${className}`}>
      {margin && <div className="mb-3">{margin}</div>}
      <div className="min-w-0">{children}</div>
    </Tag>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2 font-sans text-[0.8125rem] font-bold uppercase tracking-wider text-ink">{children}</h3>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-graphite/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-14 09:15" → { date: "14 Oct 2026", time: "09:15" } */
export function splitTimestamp(ts: string): { date: string; time: string } {
  const [datePart, timePart = ''] = ts.split(/[ T]/);
  const [y, m, d] = datePart.split('-').map(Number);
  const date = y && m && d ? `${d} ${MONTHS[m - 1]} ${y}` : datePart;
  return { date, time: timePart.slice(0, 5) };
}
