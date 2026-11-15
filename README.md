# Behavioural Therapy Portfolio

Portfolio site for a Behavioural Therapist working in an International Baccalaureate (IB) school: ABC (Antecedent-Behaviour-Consequence) observation log with trend charts, case studies, behaviour categories, an ABA/IB abbreviations glossary, and a behaviour intervention plan (BIP) builder.

Built with React, Vite, Tailwind CSS and Recharts. There is no backend: any observations entered on the site are saved only in that visitor's browser (`localStorage`).

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
