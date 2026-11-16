import { INITIAL_ABBREVIATIONS, INITIAL_ABC_LOGS, INITIAL_CASE_STUDIES, SUPPORT_PLANS } from '../data/behavioralData';
import { BEHAVIOUR_AREAS } from '../data/behaviourAreas';

export const EVIDENCE_INDEX = [
  {
    slug: 'observations',
    title: 'Observation records',
    summary: 'Incidents written up in ABC format, with the patterns they show by function and time of day.',
    count: `${INITIAL_ABC_LOGS.length} records`,
  },
  {
    slug: 'case-studies',
    title: 'Case studies',
    summary: 'Individual students from first observation to reviewed plan, with before-and-after data.',
    count: `${INITIAL_CASE_STUDIES.length} cases`,
  },
  {
    slug: 'support-plans',
    title: 'Behaviour support plans',
    summary: 'Prevent, teach and respond strategies with a five-level de-escalation ladder for staff.',
    count: `${SUPPORT_PLANS.length} plans`,
  },
  {
    slug: 'behaviour-areas',
    title: 'Behaviour areas',
    summary: 'The kinds of behaviour seen in school, what tends to trigger them, and what helps.',
    count: `${BEHAVIOUR_AREAS.length} areas`,
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    summary: 'ABA, IB and special-education terms in plain language, with school examples.',
    count: `${INITIAL_ABBREVIATIONS.length} terms`,
  },
] as const;

export type EvidenceSlug = (typeof EVIDENCE_INDEX)[number]['slug'];
