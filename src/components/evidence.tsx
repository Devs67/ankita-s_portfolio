import React, { useState } from 'react';
import { BehaviorFunction, BehaviorIntensity, SettingEnvironment } from '../types/behavioral';
import { Icon, IconName, Star } from './art';

/** One picture and one sticker colour per behaviour function, used on every evidence page. */
export const FUNCTION_LOOK: Record<BehaviorFunction, { icon: IconName; tile: string; short: string; plain: string }> = {
  'Escape/Avoidance': { icon: 'exit', tile: 'bg-sky', short: 'Escape', plain: 'gets out of something' },
  Attention: { icon: 'hand', tile: 'bg-butter', short: 'Attention', plain: 'gets someone’s attention' },
  'Access to Tangible': { icon: 'gift', tile: 'bg-mint', short: 'Tangible', plain: 'gets an object or activity' },
  'Automatic/Sensory': { icon: 'wave', tile: 'bg-blush', short: 'Sensory', plain: 'meets a sensory need' },
  'Multiple / Combined': { icon: 'search', tile: 'bg-wash', short: 'Multiple', plain: 'does more than one job' },
};

export const SETTING_LOOK: Record<SettingEnvironment, { icon: IconName; short: string }> = {
  'Inquiry Classroom': { icon: 'board', short: 'Classroom' },
  'Science & Design Lab': { icon: 'flask', short: 'Science lab' },
  'Hallway & Locker Bay': { icon: 'door', short: 'Corridor' },
  'Cafeteria & Dining Hall': { icon: 'plate', short: 'Lunch hall' },
  'Outdoor Recess & Sports Field': { icon: 'ball', short: 'Playground' },
  'Exam & Assessment Hall': { icon: 'clipboard', short: 'Exam hall' },
  'Library & Quiet Study': { icon: 'book', short: 'Library' },
  'School Bus & Transitions': { icon: 'bus', short: 'Transitions' },
};

export function FunctionBadge({ fn }: { fn: BehaviorFunction }) {
  const look = FUNCTION_LOOK[fn];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full py-0.5 pr-3 pl-1 text-sm text-ink ${look.tile}`}>
      <Icon name={look.icon} className="h-6 w-6" />
      {look.short}
    </span>
  );
}

export function SettingBadge({ setting }: { setting: SettingEnvironment }) {
  const look = SETTING_LOOK[setting];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink">
      <Icon name={look.icon} className="h-6 w-6" />
      {look.short}
    </span>
  );
}

const INTENSITY_STEP: Record<BehaviorIntensity, number> = { Mild: 1, Moderate: 2, 'Severe / Crisis': 3 };

/** Three rising bars, filled to the incident's intensity. */
export function IntensityMeter({ level }: { level: BehaviorIntensity }) {
  const n = INTENSITY_STEP[level];
  const label = level === 'Severe / Crisis' ? 'Severe' : level;
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink" title={`Intensity: ${level}`}>
      <svg viewBox="0 0 22 16" aria-hidden="true" className="h-4 w-6">
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={i * 8}
            y={10 - i * 5}
            width="5.5"
            height={6 + i * 5}
            rx="1"
            fill={i < n ? (n === 3 ? 'var(--color-margin)' : 'var(--color-ink)') : 'var(--color-rule)'}
          />
        ))}
      </svg>
      <span className="sr-only">Intensity: </span>
      {label}
    </span>
  );
}

/** A handwritten note in the margin colour. */
export function Note({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-hand text-lg leading-snug text-margin ${className}`}>{children}</p>;
}

/** Extra detail, folded away until asked for. */
export function More({ label = 'More detail', children }: { label?: string; children: React.ReactNode }) {
  return (
    <details className="group mt-4">
      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-rule bg-white/70 px-3 py-1 font-mono text-xs text-ink hover:border-ink [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="transition-transform group-open:rotate-90">
          ▸
        </span>
        {label}
      </summary>
      <div className="mt-4 text-[0.9375rem]">{children}</div>
    </details>
  );
}

/** Page header for an evidence page: one-line intro, a large drawn sticker and a note beside it. */
export function EvidenceIntro({
  back,
  title,
  intro,
  icon,
  tile,
  note,
}: {
  back: React.ReactNode;
  title: string;
  intro: React.ReactNode;
  icon: IconName;
  tile: string;
  note: string;
}) {
  return (
    <header className="grid items-center gap-8 pt-10 pb-10 sm:pt-14 md:grid-cols-[1fr_auto]">
      <div>
        <div className="mb-4">{back}</div>
        <h1 className="text-[2.1rem] leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg">{intro}</p>
      </div>
      <div className="relative hidden w-52 flex-col items-center md:flex">
        <span className={`grid h-36 w-36 rotate-3 place-items-center rounded-[2rem] border-2 border-ink ${tile} shadow-[6px_6px_0_var(--color-ink)]`}>
          <Icon name={icon} className="h-24 w-24" />
        </span>
        <Star className="absolute -top-3 left-2 h-8 w-8 -rotate-12" />
        <Note className="mt-5 -rotate-2 text-center">{note}</Note>
      </div>
    </header>
  );
}

/** A paragraph cut to three lines, with a button to read the rest. */
export function Clamp({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className={`${className} ${open ? '' : 'line-clamp-3'}`}>{children}</p>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="mt-1 font-mono text-xs text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
        {open ? 'less' : 'read more'}
      </button>
    </div>
  );
}

/** Dots, one per incident, for a quick before-and-after picture. */
export function IncidentDots({ count, tone, label }: { count: number; tone: 'before' | 'after'; label: string }) {
  return (
    <div>
      <p className="font-mono text-xs">{label}</p>
      <div aria-hidden="true" className="mt-2 grid w-fit grid-cols-7 gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={`h-4 w-4 rounded-full border-2 ${tone === 'before' ? 'border-graphite/50 bg-graphite/25' : 'border-ink bg-mint'}`}
          />
        ))}
      </div>
      <p className="mt-2 font-display text-2xl text-ink">
        {count} <span className="font-sans text-sm text-graphite">a week</span>
      </p>
    </div>
  );
}

/** A sticky note, slightly turned, for takeaways and reminders. */
export function StickyNote({ children, tone = 'bg-butter', tilt = 0 }: { children: React.ReactNode; tone?: string; tilt?: number }) {
  return (
    <div
      className={`relative rounded-sm p-5 pt-6 text-[0.9375rem] text-ink shadow-[0_10px_24px_-14px_rgba(30,43,111,0.5)] ${tone}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 bg-white/60" />
      {children}
    </div>
  );
}
