# Behavioural Therapy Portfolio

Portfolio site for a Behavioural Therapist working in an International Baccalaureate (IB) school. The home page covers who she is and how she works; the Evidence section holds read-only observation records (ABC format), case studies, behaviour support plans, behaviour areas and a glossary.

Built with React, Vite and Tailwind CSS. Static site, no backend.

## Editing content

- Name, credentials, school, experience, email and LinkedIn: `src/content/profile.ts`. Empty fields are hidden.
- Observation records, case studies, support plans, glossary: `src/data/behavioralData.ts`.
- Behaviour areas: `src/data/behaviourAreas.ts`.

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # type-check
npm test         # unit tests
npm run build    # production build into dist/
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which type-checks, tests, builds and publishes `dist/` to GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** once.

## Privacy

Do not commit real student names, photos or notes. Case studies and sample logs must stay de-identified.
