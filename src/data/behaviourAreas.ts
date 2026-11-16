export interface BehaviourArea {
  id: string;
  title: string;
  subtitle: string;
  clinicalTerms: string;
  contexts: string[];
  triggers: string[];
  looksLike: string[];
  maintainingFunction: string;
  strategies: string[];
  ibAtlLink: string;
}

export const BEHAVIOUR_AREAS: BehaviourArea[] = [
  {
    id: 'executive-function',
    title: 'Executive Functioning & Task Refusal',
    subtitle: 'Initiation Inertia, Cognitive Demand Avoidance & Disengagement',
    clinicalTerms: 'Operant escape conditioning maintained by negative reinforcement; executive working memory and task decomposition deficits.',
    contexts: [
      'Open-ended PYP transdisciplinary inquiry projects with low visual structure',
      'Multi-step MYP Design / Sciences lab reports with ambiguous rubric boundaries',
      'Unstructured independent study blocks where students face initiation paralysis'
    ],
    triggers: [
      'Presentation of non-preferred multi-step writing or mathematical inquiry tasks',
      'Vague oral instructions without step-by-step visual organizers',
      'Sudden transitions from preferred free inquiry to rigid written reflection'
    ],
    looksLike: [
      'Sweeping worksheets or digital tablets onto the floor',
      'Slumping limp in chair or hiding head beneath arms for > 5 consecutive minutes',
      'Vocal opposition: "This is stupid", "I refuse to do this IB rubbish"'
    ],
    maintainingFunction: 'Primary: Escape/Avoidance (Task demand); Secondary: Adult Co-regulation Attention',
    strategies: [
      'Visual Task Chunking: Breaking 40-minute periods into four 8-minute micro-intervals',
      'Premack Principle ("First-Then" contingent sequencing)',
      'Differential Reinforcement of Alternative Behavior (DRA) for task initiation within 30 seconds',
      'Functional Communication Training (FCT) for "Clarify & Pause" token exchange'
    ],
    ibAtlLink: 'ATL Self-Management (Organization, Persistence & Time Management)'
  },
  {
    id: 'emotional-regulation',
    title: 'Affective Storms & Emotional Dysregulation',
    subtitle: 'Sensory Overload Meltdowns, Explosive Outbursts & Property Destruction',
    clinicalTerms: 'Autonomic nervous system sympathetic hyperarousal; impaired amygdala-prefrontal connectivity leading to acute fight-or-flight crisis responses.',
    contexts: [
      'Overstimulating cafeterias or school assemblies exceeding 85 decibels',
      'Unexpected timetable substitutions, cancelled recess, or teacher absence',
      'Academic frustration when an IB inquiry experiment yields unexpected errors'
    ],
    triggers: [
      'High ambient sensory decibels paired with fatigue or skipped meals (Motivating Operations)',
      'Unannounced environmental transitions without visual countdown cues',
      'Perceived social or academic unfairness in peer games'
    ],
    looksLike: [
      'Overturning desks and chairs with concussive force',
      'High-amplitude screaming (> 80dB) and door slamming',
      'Elopement from classroom boundaries into corridors or parking perimeter'
    ],
    maintainingFunction: 'Primary: Automatic/Sensory Regulation & Escape from overwhelming stimulus environments',
    strategies: [
      'Low-Arousal Crisis Protocol: Neutral body posture, 2-meter physical safety perimeter',
      'Environmental Sensory De-escalation: Escort to low-stimulus Sensory Decompression Nook',
      '5-Stage Crisis De-escalation Ladder with clear adult behavioral guardrails',
      'Sensory Diet Schedule: Scheduled proprioceptive heavy work routines'
    ],
    ibAtlLink: 'ATL Self-Management: Affective Skills (Emotional Regulation & Mindfulness)'
  },
  {
    id: 'social-communication',
    title: 'Interpersonal Dynamics & Social Communication',
    subtitle: 'Peer Conflict, Collaborative Friction & Material Hoarding',
    clinicalTerms: 'Pragmatic social language impairments, theory of mind challenges, and operant tangible/peer-attention reinforcement contingencies.',
    contexts: [
      'Unstructured peer group allocations during IB PYP/MYP group presentations',
      'Sharing high-demand instructional equipment (microscopes, robotics kits, art materials)',
      'Playground games with complex, unwritten peer social hierarchies'
    ],
    triggers: [
      'Peer approaching preferred instructional apparatus or attempting to take a turn',
      'Perceived verbal slights or misinterpreting peer sarcasm as intentional hostility',
      'Ambiguous group roles during collaborative inquiry tasks'
    ],
    looksLike: [
      'Physical blocking, shoving, and material clutching ("Get your hands off my station!")',
      'Verbal threats and profanities directed at peer group members',
      'Storming away from collaborative groups and refusing peer dialogue'
    ],
    maintainingFunction: 'Primary: Access to Tangible apparatus; Secondary: Peer Avoidance or Peer Attention',
    strategies: [
      'Differential Reinforcement of Incompatible Behavior (DRI): Hands resting on personal clipboard during peer turn',
      'Pre-assigned Structured Roles: "Investigator / Digital Recorder / Timekeeper"',
      'Visual Sand Timers for turn alternation',
      'Restitutional Overcorrection and social problem-solving debriefs'
    ],
    ibAtlLink: 'ATL Social Skills (Interpersonal Communication & Collaborative Group Work)'
  },
  {
    id: 'sensory-modulation',
    title: 'Sensory Modulation & Motor Agitation',
    subtitle: 'Proprioceptive Seeking, Wandering & Vestibular Stimming',
    clinicalTerms: 'Neurological sensory processing atypicalities (hypo/hyper-reactivity); behavior maintained by automatic sensory reinforcement.',
    contexts: [
      'Extended whole-group carpet listening times (> 15 minutes) in PYP Early Years',
      'Transitions between specialist classes (Music, Art, Physical Education)',
      'Quiet library study periods requiring prolonged seated stillness'
    ],
    triggers: [
      'Prolonged motor restriction without scheduled proprioceptive input',
      'Fluorescent light flicker or hum near workspace',
      'Under-stimulating passive lecture instructional modes'
    ],
    looksLike: [
      'Repetitive body crashing into book displays, cubbies, or peer boundaries',
      'Oral chewing of non-edible objects (pencils, clothing collars, erasers)',
      'Continuous out-of-seat pacing, vocal humming, or bird-like chirping'
    ],
    maintainingFunction: 'Primary: Automatic/Sensory Reinforcement (Proprioceptive / Vestibular Input)',
    strategies: [
      'Collaborative OT Sensory Diet: Scheduled "Heavy Work" transitions (carrying book crates)',
      'Alternative Seating: Inflatable wobble cushions, chair resistance foot bands',
      'Medical-grade silicone chew necklaces (chewelry)',
      'Differential Reinforcement of Zero Rates of Behavior (DRO) with token rewards'
    ],
    ibAtlLink: 'ATL Self-Management (Body Awareness & Physical Spatial Regulation)'
  },
  {
    id: 'academic-anxiety',
    title: 'High-Stakes IB Academic Anxiety & Perfectionism',
    subtitle: 'DP Exam Panic, Somatic Avoidance & Assessment Catastrophizing',
    clinicalTerms: 'Cognitive fusion with rigid failure schemas; establishing operations (EO) elevating panic avoidance to acute escape behaviors.',
    contexts: [
      'IB Diploma Mock Examinations and official May/November testing sessions',
      'Theory of Knowledge (TOK) and Extended Essay (EE) submission deadlines',
      'Public exhibition presentations (PYP Exhibition, MYP Personal Project)'
    ],
    triggers: [
      'Invigilator announcements: "15 minutes remaining on Paper 2"',
      'Receiving critical rubric feedback on formative assessment drafts',
      'Facing complex, non-algorithmic Higher Level (HL) mathematics problems'
    ],
    looksLike: [
      'Acute hyperventilation, crying, and somatic stomach complaints in testing rooms',
      'Assessment elopement: Walking out of examination halls without authorization',
      'Tearing answer booklets or deleting weeks of draft research out of despair'
    ],
    maintainingFunction: 'Primary: Escape from evaluative self-threat & task pressure',
    strategies: [
      'Official IB Cardiff Assessment Accommodations: "Stop-the-Clock" rest breaks & separate quiet room',
      'Graduated Exposure Hierarchies (10-min, 25-min, 50-min timed conditions)',
      'Acceptance & Commitment Training (ACT) cognitive defusion exercises',
      'Silent visual break-card protocols for seamless invigilator communication'
    ],
    ibAtlLink: 'ATL Thinking Skills (Metacognition, Emotional Resilience & Cognitive Flexibility)'
  }
];
