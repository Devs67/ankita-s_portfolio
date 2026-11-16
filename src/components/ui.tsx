import React from 'react';
import { BehaviorFunction } from '../types/behavioral';

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

/**
 * Two-column notebook row: a narrow margin column (labels, dates) and the page.
 * The red margin rule itself is drawn once by the page wrapper at the column boundary.
 */
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
    <Tag id={id} className={`grid md:grid-cols-[10rem_1fr] scroll-mt-6 ${className}`}>
      <div className="mb-3 md:mb-0 md:pr-6 md:text-right">{margin}</div>
      <div className="min-w-0 md:pl-10">{children}</div>
    </Tag>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Row margin={eyebrow} className="pt-12 pb-10 sm:pt-16">
      <h1 className="text-[2rem] leading-tight sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg">{children}</div>}
    </Row>
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

/** Horizontal bar with a label and a count, for small distributions. */
export function Bar({
  label,
  value,
  max,
  detail,
  tone = 'ink',
}: {
  label: string;
  value: number;
  max: number;
  detail?: string;
  tone?: 'ink' | 'faint';
}) {
  const pct = max > 0 ? Math.max((value / max) * 100, value > 0 ? 3 : 0) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[0.9375rem]">
        <span className="text-ink">{label}</span>
        <span className="font-mono text-sm">{detail ?? value}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-wash">
        <div
          className={`h-2 rounded-full ${tone === 'ink' ? 'bg-ink' : 'bg-graphite/40'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export const FUNCTION_SHORT: Record<BehaviorFunction, string> = {
  'Escape/Avoidance': 'Escape',
  Attention: 'Attention',
  'Access to Tangible': 'Tangible',
  'Automatic/Sensory': 'Sensory',
  'Multiple / Combined': 'Multiple',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-14 09:15" → { date: "14 Oct 2026", time: "09:15" } */
export function splitTimestamp(ts: string): { date: string; time: string } {
  const [datePart, timePart = ''] = ts.split(/[ T]/);
  const [y, m, d] = datePart.split('-').map(Number);
  const date = y && m && d ? `${d} ${MONTHS[m - 1]} ${y}` : datePart;
  return { date, time: timePart.slice(0, 5) };
}
