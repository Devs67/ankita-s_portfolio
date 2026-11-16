import { useEffect } from 'react';
import { href, useRoute } from './router';
import { PROFILE } from './content/profile';
import { HomePage, hasContact } from './pages/HomePage';
import { ObservationsPage } from './pages/ObservationsPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { SupportPlansPage } from './pages/SupportPlansPage';
import { BehaviourAreasPage } from './pages/BehaviourAreasPage';
import { GlossaryPage } from './pages/GlossaryPage';

const HOME_SECTIONS = ['about', 'experience', 'method', 'evidence', 'contact'];

const NAV = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Method', 'method'],
  ['Evidence', 'evidence'],
  ...(hasContact ? [['Contact', 'contact']] : []),
];

function Page({ path }: { path: string[] }) {
  const [first, second, third] = path;
  if (first === 'evidence' && second) {
    switch (second) {
      case 'observations':
        return <ObservationsPage />;
      case 'case-studies':
        return <CaseStudiesPage caseId={third} />;
      case 'support-plans':
        return <SupportPlansPage />;
      case 'behaviour-areas':
        return <BehaviourAreasPage />;
      case 'glossary':
        return <GlossaryPage />;
    }
  }
  return <HomePage />;
}

export default function App() {
  const path = useRoute();
  const key = path.join('/');

  // Section links (#/about) scroll within the home page; every other route starts at the top.
  useEffect(() => {
    const section = path.length === 1 && HOME_SECTIONS.includes(path[0]) ? path[0] : null;
    if (section) document.getElementById(section)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeTop = path[0] ?? '';
  const isHome = !(path[0] === 'evidence' && path[1]);

  return (
    <div className="flex min-h-screen flex-col">
      <div aria-hidden="true" className="fluid">
        <span />
        <span />
        <span />
        <span />
      </div>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper">
        Skip to content
      </a>

      <header className="border-b border-rule bg-paper/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
          <a href={href()} className="group flex items-baseline gap-3">
            <span className="font-display text-2xl text-ink">{PROFILE.name}</span>
            <span className="font-mono text-[0.8125rem] text-graphite">{PROFILE.role}</span>
          </a>
          <nav aria-label="Main">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a
                    href={href(id)}
                    aria-current={activeTop === id ? 'page' : undefined}
                    className={`text-[0.9375rem] underline-offset-[6px] hover:text-ink hover:underline hover:decoration-rule hover:decoration-2 ${
                      activeTop === id ? 'text-ink underline decoration-margin decoration-2' : ''
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" className="flex-1">
        {isHome ? (
          // The home page lays out its own full-width bands
          <HomePage />
        ) : (
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Page path={path} />
          </div>
        )}
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:justify-between sm:px-6">
          <p>
            <span className="text-ink">{PROFILE.name}</span> · {PROFILE.role}
          </p>
          <p>Student details on this site are de-identified.</p>
        </div>
      </footer>
    </div>
  );
}
