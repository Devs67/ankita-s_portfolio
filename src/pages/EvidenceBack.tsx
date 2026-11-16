import { href } from '../router';

export function EvidenceBack({ to = href('evidence'), label = 'Evidence' }: { to?: string; label?: string }) {
  return (
    <a href={to} className="font-mono text-[0.8125rem] text-margin underline decoration-margin/30 underline-offset-4 hover:decoration-margin">
      ← {label}
    </a>
  );
}
