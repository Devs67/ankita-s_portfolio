/**
 * Everything about Ms Ankita that appears on the site, taken from her resume.
 * Leave a field as '' to hide it — nothing is shown as a placeholder.
 */
export const PROFILE = {
  name: 'Ankita Dutta',
  firstName: 'Ankita',
  role: 'Behavioural Therapist',
  credentials: 'MA Applied Psychology, University of Calcutta',
  programmes: 'Early Years, PYP and MYP',
  school: 'The Shri Ram Academy, Hyderabad',
  location: 'Hyderabad, India',
  email: 'ankitadutta0105@gmail.com',
  /** Full profile URL, e.g. https://www.linkedin.com/in/... */
  linkedin: 'https://www.linkedin.com/in/ankita-dutta-187a7a283',
};

/**
 * The quote under the hero. Swap in any of these:
 *   'Every kid needs a champion.'                 — Rita F. Pierson, educator · TED Talks Education, 2013
 *   'Different, not less.'                        — Dr Temple Grandin, autism advocate and author
 *   'The world needs all kinds of minds.'         — Dr Temple Grandin, autism advocate and author
 *   'If you’ve met one person with autism, you’ve met one person with autism.' — Dr Stephen Shore, special educator
 *   'A misbehaving child is a discouraged child.' — Rudolf Dreikurs, child psychiatrist and educator
 */
export const QUOTE = {
  text: 'Every kid needs a champion.',
  by: 'Rita F. Pierson',
  note: 'educator · TED Talks Education, 2013',
};

/** Drop a portrait at public/ankita.jpg; until then a monogram shows in its place. */
export const PHOTO = 'ankita.jpg';

export const SCHOOL_LABEL = PROFILE.school || 'an International Baccalaureate school';

export interface Role {
  /** Picks the timeline icon */
  kind: 'school' | 'aba' | 'clinical' | 'remote';
  title: string;
  org: string;
  dates: string;
  points: string[];
}

/** School and clinical roles, newest first. */
export const EXPERIENCE: Role[] = [
  {
    kind: 'school',
    title: 'Behavioural Therapist',
    org: 'The Shri Ram Academy, Hyderabad',
    dates: 'Jan 2025 – now',
    points: [
      '1:1 and small-group behavioural support for PYP and MYP students — behavioural, emotional and social needs.',
      'Design and run behaviour intervention plans (BIPs), tracking progress through structured data collection and regular review.',
      'Classroom observations to identify triggers and recommend proactive, evidence-based strategies.',
      'Work with homeroom and subject teachers to carry strategies into lessons and transitions, and with parents and the counselling team to keep home and school aligned.',
    ],
  },
  {
    kind: 'aba',
    title: 'Senior Shadow Teacher',
    org: 'Early Autism Ventures, Hyderabad',
    dates: 'May – Sep 2025',
    points: [
      'Managed a caseload of 7 clients: wrote IEP/BIP goals and led parent meetings on progress and next steps.',
      'Ran VB-MAPP assessments and wrote the assessment reports that shaped each programme.',
      'Trained and mentored new shadow teachers, observing their sessions and giving structured feedback.',
      'Led monthly documentation audits and coordinated weekly reporting between shadow teachers and supervisors.',
    ],
  },
  {
    kind: 'aba',
    title: 'Shadow Teacher & ABA Therapist',
    org: 'Early Autism Ventures, Hyderabad',
    dates: 'Jul 2024 – Apr 2025',
    points: [
      'Supported a student 1:1 in the mainstream classroom to access, understand and complete academic tasks.',
      'Adapted lesson plans and materials with class teachers; tracked developmental progress and kept parents informed.',
      'Facilitated peer interaction and social-skill building.',
    ],
  },
  {
    kind: 'clinical',
    title: 'Clinical Intern',
    org: 'Calcutta Pavlov Hospital & Calcutta National Medical College, Kolkata',
    dates: 'Jan – May 2021',
    points: [
      'Took case histories and mental status examinations; co-facilitated therapy sessions including systematic desensitisation.',
      'Assessed learning disabilities using VSMS, DST, WAIS and Raven’s Progressive Matrices.',
    ],
  },
  {
    kind: 'remote',
    title: 'Intern',
    org: 'Fortis Healthcare (remote)',
    dates: 'Jul 2020',
    points: ['Structured training in community mental health support, CBT, positive psychology and suicide prevention.'],
  },
];

/** Shown as one line under the timeline so the 2021–2024 gap is explained. */
export const OTHER_WORK =
  'Between 2021 and 2024: academic research associate (Teachief Academy) and international operations executive (Nuveq Holidays), Kolkata. Volunteer teacher, Missionaries of Charity, Kolkata (2017).';

export const EDUCATION = [
  { degree: 'Master’s in Applied Psychology', place: 'University of Calcutta', year: '2020' },
  { degree: 'Bachelor’s in Psychology', place: 'University of Calcutta', year: '2018' },
];

export const EXPERTISE = [
  'Behaviour intervention plans (BIP)',
  'Individualised education plans (IEP)',
  'VB-MAPP assessment and reporting',
  'Classroom observation (ABC)',
  'Inclusive classroom collaboration',
  'Parent and stakeholder communication',
  'Training and mentoring shadow teachers',
  'Case documentation and compliance',
  'Differentiated learning support',
];
