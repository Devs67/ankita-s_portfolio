export type IBProgramme = 'PYP' | 'MYP' | 'DP';

export type BehaviorFunction = 
  | 'Escape/Avoidance' 
  | 'Attention' 
  | 'Access to Tangible' 
  | 'Automatic/Sensory'
  | 'Multiple / Combined';

export type BehaviorIntensity = 'Mild' | 'Moderate' | 'Severe / Crisis';

export type SettingEnvironment = 
  | 'Inquiry Classroom' 
  | 'Science & Design Lab' 
  | 'Hallway & Locker Bay' 
  | 'Cafeteria & Dining Hall' 
  | 'Outdoor Recess & Sports Field' 
  | 'Exam & Assessment Hall' 
  | 'Library & Quiet Study' 
  | 'School Bus & Transitions';

export interface ABCEntry {
  id: string;
  timestamp: string; // ISO or date string e.g. "2026-10-14 10:15"
  studentCode: string; // e.g. "Student L (Grade 5)"
  programme: IBProgramme;
  setting: SettingEnvironment;
  settingEvents?: string; // e.g. "Transition after weekend; fluorescent light flickering; skipped breakfast"
  antecedent: string; // Discriminative Stimulus (SD) or presentation of a demand
  behavior: string; // Topography & operational definition
  consequence: string; // Environmental reaction / maintaining reinforcer
  perceivedFunction: BehaviorFunction;
  intensity: BehaviorIntensity;
  durationMinutes: number;
  replacementBehavior: string; // Alternative functional behavior
  consequenceInterventionApplied: string; // What the therapist / LSA actually executed
  notes?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  studentPseudonym: string;
  programme: IBProgramme;
  gradeBand: string;
  category: 
    | 'Executive Functioning & Task Refusal'
    | 'Affective Storms & Emotional Dysregulation'
    | 'Interpersonal Friction & Social Communication'
    | 'Sensory Modulation & Motor Agitation'
    | 'High-Stakes IB Academic Anxiety & Perfectionism';
  primaryFunction: BehaviorFunction;
  ibLearnerProfileTarget: string; // e.g. "Reflective & Balanced"
  ibAtlFocus: string; // e.g. "Self-Management: Affective & Organization Skills"
  presentingSituation: string;
  targetBehaviorOperationalDefinition: string;
  fbaHypothesis: string;
  baselineData: {
    frequencyPerWeek: number;
    durationAverageMin: number;
    intensity: BehaviorIntensity;
  };
  interventionData: {
    frequencyPerWeek: number;
    durationAverageMin: number;
    reductionPercentage: number;
    durationWeeks: number;
  };
  antecedentInterventions: string[];
  replacementBehaviorsFCT: string[];
  consequenceExtinctionStrategies: string[];
  multidisciplinaryCollaboration: string; // How teachers, LSAs, parents collaborated
  clinicalTakeaways: string[];
}

export interface Abbreviation {
  id: string;
  acronym: string;
  fullName: string;
  domain: 'ABA Clinical' | 'IB Education' | 'Multidisciplinary & SEN';
  definition: string;
  clinicalApplication: string;
  exampleInSchool: string;
}

export interface ABCFilterState {
  searchQuery: string;
  programme: string; // 'all' | 'PYP' | 'MYP' | 'DP'
  functionType: string; // 'all' | BehaviorFunction
  intensity: string; // 'all' | BehaviorIntensity
  setting: string; // 'all' | SettingEnvironment
}

export interface BIPPlan {
  id: string;
  studentCode: string;
  programme: IBProgramme;
  targetBehavior: string;
  operationalDefinition: string;
  functionOfBehavior: BehaviorFunction;
  preventiveStrategies: string[];
  teachingStrategies: string[];
  reactiveStrategies: string[];
  crisisEscalationLevels: {
    level: 'Green (Baseline)' | 'Yellow (Agitation / Rumbling)' | 'Orange (Escalation / Outburst)' | 'Red (Crisis)' | 'Blue (De-escalation & Recovery)';
    behaviorIndicators: string;
    adultResponse: string;
  }[];
  reinforcementSchedule: string;
  reviewDate: string;
}
