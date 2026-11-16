/**
 * Everything about Ms Ankita that appears on the site.
 * Leave a field as '' to hide it — nothing is shown as a placeholder.
 */
export const PROFILE = {
  name: 'Ankita',
  /** e.g. 'M.A. Clinical Psychology · RBT' — shown under the name when set */
  credentials: '',
  role: 'Behavioural Therapist',
  /** e.g. 'Oakridge International School, Hyderabad' — falls back to a generic description */
  school: '',
  /** e.g. '6 years' — shown in the About facts when set */
  experience: '',
  email: '',
  linkedin: '',
};

export const SCHOOL_LABEL = PROFILE.school || 'an International Baccalaureate school';
