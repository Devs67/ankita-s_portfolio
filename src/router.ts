import { useEffect, useState } from 'react';

/** Hash routes (#/evidence/case-studies) so deep links work on GitHub Pages without server rewrites. */
function readPath(): string[] {
  return window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

export function useRoute(): string[] {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}

export const href = (...segments: string[]) => `#/${segments.join('/')}`;
