import { ABCEntry, CaseStudy, Abbreviation, BIPPlan } from '../types/behavioral';

export const INITIAL_ABC_LOGS: ABCEntry[] = [
  {
    id: 'abc-101',
    timestamp: '2026-10-14 09:15',
    studentCode: 'Student A (PYP Grade 4)',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    settingEvents: 'Monday morning transition; reported poor sleep and skipped breakfast',
    antecedent: 'Teacher announced transition from open inquiry play to independent unit reflection journal writing (low predictability, non-preferred cognitive demand)',
    behavior: 'Pushed desk chair backward (loud clatter), swept journal onto the floor, folded arms across chest, vocalized "I will not write this rubbish" at 75dB, engaged in head-down avoidance for 8 minutes',
    consequence: 'Classroom peers looked around in silence; Homeroom teacher stepped in and paused instruction to coax student',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Moderate',
    durationMinutes: 8,
    replacementBehavior: 'Exchanging red "Processing Break - 3 Min" visual token and taking 3 deep diaphragmatic breaths',
    consequenceInterventionApplied: 'Task demand temporarily held neutral with visual timer; prompt hierarchy re-introduced at step 1 with graphic organizer scaffolding',
    notes: 'Escape maintained by peer distraction and task delay. Implemented visual transition countdown for upcoming sessions.'
  },
  {
    id: 'abc-102',
    timestamp: '2026-10-14 11:30',
    studentCode: 'Student B (MYP Grade 7)',
    programme: 'MYP',
    setting: 'Science & Design Lab',
    settingEvents: 'High sensory room volume (exhaust hoods humming, 24 students handling glassware)',
    antecedent: 'Peer lab partner requested to take turn recording titration measurements on shared digital tablet',
    behavior: 'Elevated vocal volume, yelled "Get your hands off my log!", slammed lab manual onto table, stood up abruptly knocking plastic beaker over',
    consequence: 'Peer immediately backed away; teacher assigned an individual lab station to prevent disruption',
    perceivedFunction: 'Access to Tangible',
    intensity: 'Moderate',
    durationMinutes: 5,
    replacementBehavior: 'Utilizing structured 3-minute lab partner turn-taking protocol and visual timer',
    consequenceInterventionApplied: 'DRA (Differential Reinforcement of Alternative Behavior) for polite turn negotiation; denied exclusive immediate possession without functional request',
    notes: 'Maintaining reinforcer was immediate control over materials. Needs structured roles in IB collaborative inquiry.'
  },
  {
    id: 'abc-103',
    timestamp: '2026-10-15 13:45',
    studentCode: 'Student C (DP Grade 11)',
    programme: 'DP',
    setting: 'Exam & Assessment Hall',
    antecedent: 'Mock IB Diploma Mathematics Paper 2 invigilator called "15 minutes remaining, ensure all working is documented"',
    behavior: 'Student experienced acute autonomic hyperarousal, began hyperventilating, tore two scratch sheets into fine strips, began weeping silently with head on desk',
    consequence: 'Invigilator signaled behavioral therapist; student escorted to quiet sensory-decompression conference room',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Severe / Crisis',
    durationMinutes: 22,
    replacementBehavior: 'Initiating 5-4-3-2-1 sensory grounding exercise and utilizing approved 5-minute stop-the-clock rest break accommodation',
    consequenceInterventionApplied: 'Low-arousal verbal pacing, bilateral sensory squeeze ball, collaborative cognitive reframing of incomplete questions',
    notes: 'Perfectionism-driven panic. High-stakes IB internal assessment pressure operating as an establishing operation (EO).'
  },
  {
    id: 'abc-104',
    timestamp: '2026-10-16 10:05',
    studentCode: 'Student D (PYP Early Years 2)',
    programme: 'PYP',
    setting: 'Outdoor Recess & Sports Field',
    antecedent: 'Recess whistle blown signaling transition from playground sandbox to indoor circle time',
    behavior: 'Elopement: Sprinting across boundary soccer line toward parking perimeter fence, laughing when educator initiated pursuit',
    consequence: 'Two learning support assistants pursued student for 90 meters; peers cheered and watched',
    perceivedFunction: 'Attention',
    intensity: 'Severe / Crisis',
    durationMinutes: 12,
    replacementBehavior: 'Holding "Transition Leader" flag and walking alongside designated peer buddy',
    consequenceInterventionApplied: 'Planned ignoring of chase dynamic (neutral perimeter containment without playful verbal engagement), non-contingent attention prior to whistle',
    notes: 'Function was peer & adult chase attention. Safety protocol revised to station staff strategically 2 minutes before whistle.'
  },
  {
    id: 'abc-105',
    timestamp: '2026-10-16 12:20',
    studentCode: 'Student E (MYP Grade 8)',
    programme: 'MYP',
    setting: 'Cafeteria & Dining Hall',
    settingEvents: 'Extreme decibel level (86dB measured), fluorescent lighting flicker near tray return',
    antecedent: 'Accidental physical bump from peer carrying soup tray in crowded line',
    behavior: 'Immediate aggressive posture, shoved peer with both open palms into tray station, shouted profanities, clutched ears and paced rapidly',
    consequence: 'Cafeteria supervisor pulled students apart; peers cleared immediate perimeter',
    perceivedFunction: 'Automatic/Sensory',
    intensity: 'Severe / Crisis',
    durationMinutes: 15,
    replacementBehavior: 'Self-advocating for early cafeteria pass (5 minutes ahead of cohort) and wearing loop earplugs',
    consequenceInterventionApplied: 'Immediate safe space decompression in nurse annex; sensory debrief once heart rate returned below 90 bpm',
    notes: 'Underlying sensory defensiveness misattributed as pure peer hostility. Sensory environmental modification implemented.'
  },
  {
    id: 'abc-106',
    timestamp: '2026-10-17 08:50',
    studentCode: 'Student F (PYP Grade 2)',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    antecedent: 'Transition from iPad educational math game to group carpet reading time',
    behavior: 'Clutched iPad tightly to chest with both hands, dropped body weight limp to the floor (flopping), screamed "No no no mine!"',
    consequence: 'Assistant offered an extra 2 minutes of screen time if student promised to get up',
    perceivedFunction: 'Access to Tangible',
    intensity: 'Moderate',
    durationMinutes: 7,
    replacementBehavior: 'Pushing red digital timer button to complete 1-minute warning countdown and putting iPad into sleep dock',
    consequenceInterventionApplied: 'Extinction of screaming: iPad locked remotely via MDM console; calm transition reinforced with preferred bookmark choice',
    notes: 'Assistant coaching provided: avoid reinforcing floppy behavior with bonus screen time (intermittent reinforcement trap).'
  },
  {
    id: 'abc-107',
    timestamp: '2026-10-17 14:10',
    studentCode: 'Student G (MYP Grade 9)',
    programme: 'MYP',
    setting: 'Hallway & Locker Bay',
    antecedent: 'Combination lock failed to open on third attempt while corridor was bustling between Period 4 and 5',
    behavior: 'Kicked locker door repeatedly (4 kicks), punched steel locker with closed fist, kicked backpack down hallway',
    consequence: 'Passing students laughed and filmed on phone; hallway monitor ran over shouting "Detention!"',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Moderate',
    durationMinutes: 4,
    replacementBehavior: 'Texting/calling student support helper badge or asking neighboring teacher for master key pass without violence',
    consequenceInterventionApplied: 'Hallway monitor redirected to neutral stance; student guided to deep breathing; physical locker serviced with smooth latch',
    notes: 'Frustration intolerance combined with fear of being marked late (escape from tardy consequences).'
  },
  {
    id: 'abc-108',
    timestamp: '2026-10-18 10:30',
    studentCode: 'Student H (DP Grade 12)',
    programme: 'DP',
    setting: 'Library & Quiet Study',
    antecedent: 'Supervisor reminded student that Theory of Knowledge (TOK) essay draft was overdue by 48 hours',
    behavior: 'Shut laptop lid violently, stated "I am dropping out of the IB Diploma, the whole programme is pretentious nonsense", walked out of library',
    consequence: 'Librarian alerted Diploma Coordinator; coordinator held 45-minute crisis counseling session',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Moderate',
    durationMinutes: 30,
    replacementBehavior: 'Breaking TOK knowledge question into three micro-deadlines with behavioral therapist check-in',
    consequenceInterventionApplied: 'Acceptance & Commitment Training (ACT) defusion exercise; established contingent 20-minute drafting sprints followed by preferred walk',
    notes: 'Perfectionism-driven cognitive fusion. High value placed on academic identity creating immense avoidance vulnerability.'
  },
  {
    id: 'abc-109',
    timestamp: '2026-10-18 13:10',
    studentCode: 'Student A (PYP Grade 4)',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    antecedent: 'Collaborative group inquiry poster assignment where student had to negotiate who writes the title marker',
    behavior: 'Grabbed all chisel-tip markers and threw them across the classroom carpet, tipped over water bottle',
    consequence: 'Group members stopped working; teacher told student to sit alone at back desk',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Moderate',
    durationMinutes: 9,
    replacementBehavior: 'Using structured role assignment cards ("Illustrator / Timekeeper / Researcher") designed by therapist',
    consequenceInterventionApplied: 'Restitutional overcorrection (cleaning water and picking up markers) before returning to academic activity; prompt replacement card',
    notes: 'Second incident this week. Task demand combined with peer negotiation overload triggers escape response.'
  },
  {
    id: 'abc-110',
    timestamp: '2026-10-19 09:00',
    studentCode: 'Student I (PYP Grade 1)',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    antecedent: 'Teacher began reading aloud picture book during 20-minute morning gathering on the carpet',
    behavior: 'Spun in circles on carpet, made repetitive bird-chirping vocalizations at 65dB, tapped neighbor repeatedly on shoulder',
    consequence: 'Teacher continually said "Shh, please sit criss-cross applesauce", classmates giggled',
    perceivedFunction: 'Automatic/Sensory',
    intensity: 'Mild',
    durationMinutes: 14,
    replacementBehavior: 'Holding sensory tactile massage ring and sitting on inflatable wobble cushion in perimeter spot',
    consequenceInterventionApplied: 'Provided proprioceptive seating accommodation; teacher discontinued verbal reprimands and delivered positive praise for calm body',
    notes: 'Vestibular and proprioceptive seeking behavior. Needs scheduled sensory diet breaks before whole-group listening.'
  },
  {
    id: 'abc-111',
    timestamp: '2026-10-19 11:45',
    studentCode: 'Student B (MYP Grade 7)',
    programme: 'MYP',
    setting: 'Science & Design Lab',
    antecedent: 'Teacher handed back formative design criterion assessment with Grade 3 (approaching standard)',
    behavior: 'Crumped rubric into tight ball, threw it at recycling bin missing by 2 meters, put head inside hoodie and refused eye contact',
    consequence: 'Teacher walked to desk, crouched down, and spent 10 minutes reassuring student',
    perceivedFunction: 'Attention',
    intensity: 'Mild',
    durationMinutes: 11,
    replacementBehavior: 'Completing "IB Criterion Growth Reflection" sheet noting 2 strengths and 1 actionable revision step',
    consequenceInterventionApplied: 'Planned brief neutral wait time; teacher redirected to rubric feedback rubric only when student sat upright with open posture',
    notes: 'Adult attention was maintaining the helpless posture. Functional communication for feedback taught.'
  },
  {
    id: 'abc-112',
    timestamp: '2026-10-20 15:10',
    studentCode: 'Student J (PYP Grade 5)',
    programme: 'PYP',
    setting: 'School Bus & Transitions',
    settingEvents: 'End of 7-period Friday schedule; high physical exhaustion',
    antecedent: 'Bus driver directed student to sit in assigned seat 14B instead of favored rear window seat',
    behavior: 'Stood in middle aisle blocking 30 students, kicked bus seat backrest, yelled "You are not my boss, I hate this school!"',
    consequence: 'Bus monitor took 15 minutes to negotiate with student; bus departure delayed',
    perceivedFunction: 'Access to Tangible',
    intensity: 'Moderate',
    durationMinutes: 16,
    replacementBehavior: 'Checking visual Friday bus seating chart with assigned peer companion before boarding',
    consequenceInterventionApplied: 'Consistent boundary enforcement; student sat in seat before bus moved; Friday incentive token redeemed upon arrival',
    notes: 'Transition resistance heightened on Fridays. Assigned peer partner strategy successfully piloted.'
  }
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-pyp-401',
    title: 'Reducing Task Avoidance & Affective Meltdowns in PYP Collaborative Inquiry',
    studentPseudonym: 'Student Leo (Grade 4)',
    programme: 'PYP',
    gradeBand: 'Primary Years (Ages 9-10)',
    category: 'Affective Storms & Emotional Dysregulation',
    primaryFunction: 'Escape/Avoidance',
    ibLearnerProfileTarget: 'Reflective & Balanced',
    ibAtlFocus: 'Self-Management Skills (Affective Regulation & Resilience)',
    presentingSituation: 'Student Leo consistently exhibited intense emotional dysregulation during open-ended, inquiry-based group tasks (a core hallmark of the IB Primary Years Programme). In transdisciplinary units (e.g. "How the World Works"), when required to write multi-step inquiries without rigid scaffolding, Leo engaged in desk clearing, shouting, and hiding under tables, leading to classroom evacuations and average lost instructional time of 35 minutes per day.',
    targetBehaviorOperationalDefinition: 'Task refusal & disruptive outbursts: Defined as pushing furniture (moving desk/chair > 20cm abruptly), sweeping items off flat surfaces, and vocalizing opposition ("No", "I hate IB", screaming) at > 70dB lasting longer than 15 seconds.',
    fbaHypothesis: 'When presented with novel, unstructured cognitive demands involving writing in group settings (SD), Leo engages in property disruption and vocal defiance, which reliably results in postponement or removal of the academic demand (negative reinforcement) and secondary adult co-regulation attention.',
    baselineData: {
      frequencyPerWeek: 14,
      durationAverageMin: 28,
      intensity: 'Severe / Crisis'
    },
    interventionData: {
      frequencyPerWeek: 2,
      durationAverageMin: 5,
      reductionPercentage: 85.7,
      durationWeeks: 8
    },
    antecedentInterventions: [
      'Visual Schedule with "Task Chunking": Divided 40-minute inquiry periods into four 8-minute micro-intervals with visual countdown bars.',
      'Pre-corrective priming: Reviewing the daily inquiry central idea 5 minutes prior to whole-class transition.',
      'Choice Architecture: Offering choices in output format (e.g., speech-to-text dictation, mind-mapping, or handwritten bullet points).',
      'Environmental sensory regulation: Providing noise-dampening loops and a dedicated low-stimulus "Reflection Nook" within the PYP classroom.'
    ],
    replacementBehaviorsFCT: [
      'Functional Communication Training (FCT): Explicitly taught student to point to or exchange a "Break & Clarify" visual token when cognitive frustration reaches level 2 on the 5-point scale.',
      'ATL Self-Management Protocol: Practiced 4-7-8 tactical box breathing before engaging with non-preferred written prompts.',
      'Peer Collaboration Script: Provided sentence starters ("I agree with your inquiry point, can I illustrate the chart?") to reduce interpersonal friction.'
    ],
    consequenceExtinctionStrategies: [
      'Escape Extinction: Non-preferred academic demands were never permanently terminated; once calm for 2 continuous minutes, the original micro-task was re-presented in a scaffolded 1-sentence prompt.',
      'Differential Reinforcement of Alternative Behavior (DRA): Immediate praise and token delivery for initiating tasks within 30 seconds of presentation.',
      'Low-Arousal Adult Stance: Educators avoided lengthy reasoning during escalation; maintained 2-meter physical distance with neutral body language.'
    ],
    multidisciplinaryCollaboration: 'Trained Homeroom Teacher, PYP Coordinator, and Learning Support Assistant (LSA) on maintaining consistent prompt hierarchies and data tracking using daily ABC scatterplots. Parents implemented synchronous token economy routines at home.',
    clinicalTakeaways: [
      'Inquiry-based learning requires explicit cognitive scaffolding for neurodivergent learners prone to demand overload.',
      'Escape extinction must always be paired with robust, frictionless FCT (Functional Communication Training).',
      'Teaching the IB Learner Profile "Reflective" gave the student clinical dignity and an age-appropriate vocabulary to evaluate their own arousal.'
    ]
  },
  {
    id: 'case-myp-702',
    title: 'De-escalating Physical Agitation & Lab Conflict via Differential Reinforcement',
    studentPseudonym: 'Student Kai (Grade 7)',
    programme: 'MYP',
    gradeBand: 'Middle Years (Ages 12-13)',
    category: 'Interpersonal Friction & Social Communication',
    primaryFunction: 'Access to Tangible',
    ibLearnerProfileTarget: 'Communicators & Open-Minded',
    ibAtlFocus: 'Social Skills (Interpersonal Communication & Collaborative Group Work)',
    presentingSituation: 'During MYP Design & Sciences practical labs, Kai exhibited intense possessiveness over specific lab apparatus (digital scales, high-power microscopes, 3D printers). When peers approached the station or attempted to alternate turns, Kai engaged in physical blocking, verbal aggression, and slamming equipment, presenting severe safety risks in a science laboratory.',
    targetBehaviorOperationalDefinition: 'Physical aggression & material hoarding: Defined as placing hands on peer belongings or apparatus while vocalizing threats ("Touch this and you will regret it"), using body to barricade equipment, or slamming objects on countertops with audible concussive force.',
    fbaHypothesis: 'When a peer approaches preferred instructional materials during shared lab activities (SD), Kai engages in aggressive posturing and intimidation, which functions to maintain exclusive access to the preferred items (positive reinforcement: tangible access) and drives peers away (negative reinforcement: peer avoidance).',
    baselineData: {
      frequencyPerWeek: 11,
      durationAverageMin: 18,
      intensity: 'Moderate'
    },
    interventionData: {
      frequencyPerWeek: 1,
      durationAverageMin: 3,
      reductionPercentage: 90.9,
      durationWeeks: 6
    },
    antecedentInterventions: [
      'Pre-assigned Laboratory Roles: Structured lab jobs according to MYP assessment criteria: "Investigator A (Materials), Investigator B (Digital Logger), Investigator C (Timekeeper)".',
      'Visual Timers for Station Rotation: Sand timers and digital tablet countdowns visible to both partners.',
      'Motivating Operation (MO) Satiation: Provided non-contingent access to high-interest design software for 10 minutes prior to high-stakes collaborative labs.'
    ],
    replacementBehaviorsFCT: [
      'Scripted Turn Negotiation: Taught Kai the "2-Minute Transition Request": "I need 2 more minutes to finalize this measurement, then you have the station."',
      'ATL Communication Training: Practiced perspective taking during bi-weekly social skills coaching sessions with the behavioral therapist.'
    ],
    consequenceExtinctionStrategies: [
      'Differential Reinforcement of Incompatible Behavior (DRI): Reinforced hands resting flat on table or on personal clipboard during peer turn intervals.',
      'Tangible Extinction: Aggression resulted in immediate neutral removal from the preferred apparatus station until 3 minutes of calm peer cooperation was displayed.',
      'Restitutive Overcorrection: Kai was required to clean and calibrate shared apparatus for both partners upon demonstrating cooperation.'
    ],
    multidisciplinaryCollaboration: 'Co-planned with MYP Science Head of Department to incorporate social rubrics into formative lab grades. Science teacher reinforced replacement communication cards systematically.',
    clinicalTakeaways: [
      'In middle school lab environments, ambiguous group roles catalyze territory disputes. Explicit role structuring acts as a potent antecedent intervention.',
      'DRI (Differential Reinforcement of Incompatible Behavior) was dramatically more effective than punitive lab bans.'
    ]
  },
  {
    id: 'case-dp-1103',
    title: 'Overcoming High-Stakes Exam Panic & Perfectionism Paralysis in IB Diploma Programme',
    studentPseudonym: 'Student Sophia (Grade 11)',
    programme: 'DP',
    gradeBand: 'Diploma Programme (Ages 16-17)',
    category: 'High-Stakes IB Academic Anxiety & Perfectionism',
    primaryFunction: 'Escape/Avoidance',
    ibLearnerProfileTarget: 'Balanced & Risk-Takers',
    ibAtlFocus: 'Thinking Skills (Metacognition & Cognitive Flexibility)',
    presentingSituation: 'Sophia is an academically high-achieving student enrolled in the rigorous IB Diploma Programme (Higher Level Biology, Chemistry, and Psychology). Facing impending mock examinations and internal assessment (IA) deadlines, Sophia developed severe panic attacks, characterized by hyperventilation, somatic stomach complaints, somatic fainting sensations, and complete exam room elopement. This resulted in zero completed assessments over a 3-week testing block.',
    targetBehaviorOperationalDefinition: 'Assessment elopement & acute somatic panic: Defined as standing up during an examination, vocalizing inability to breathe, leaving the examination room without invigilator authorization, or crumpling examination answer booklets.',
    fbaHypothesis: 'When presented with timed, high-stakes evaluative prompts accompanied by timer countdowns (SD), cognitive thoughts of perceived intellectual failure act as an establishing operation (EO), evoking acute sympathetic nervous system fight-or-flight responses. Eloping from the exam room provides immediate reduction in overwhelming panic (negative reinforcement: escape from perceived evaluative catastrophe).',
    baselineData: {
      frequencyPerWeek: 5,
      durationAverageMin: 45,
      intensity: 'Severe / Crisis'
    },
    interventionData: {
      frequencyPerWeek: 0,
      durationAverageMin: 0,
      reductionPercentage: 100,
      durationWeeks: 10
    },
    antecedentInterventions: [
      'Official IB Assessment Accommodations: Formally secured "Stop-the-Clock" rest breaks (10 min/hour) and separate, distraction-free quiet room testing through IB Cardiff Inclusive Assessment arrangements.',
      'Exposure Hierarchies: Graduated mock exams starting with 10-minute untimed practice, progressing to 25-minute, 50-minute, and full 90-minute timed conditions.',
      'Environmental Alteration: Positioned desk adjacent to natural lighting; eliminated audible ticking wall clocks in favor of a silent digital countdown.'
    ],
    replacementBehaviorsFCT: [
      'Acceptance & Commitment Training (ACT) Defusion: Practiced acknowledging "The Story of Not Being Good Enough" as mental events rather than literal truths.',
      'Somatic Grounding Card: Laminated discreet index card outlining the 5-4-3-2-1 sensory method and progressive muscle relaxation to activate parasympathetic rebound.',
      'Self-Advocacy Card: Quietly placed an "Official 5-Minute Pause" card on the invigilator corner without verbal drama.'
    ],
    consequenceExtinctionStrategies: [
      'Gradual Re-entry Protocol: Elopement to the hallway was met with low-stimulation, silent accompaniment back to the quiet room; assessment was never cancelled, only paused with stop-the-clock timer.',
      'De-emphasizing Point Totals: Post-assessment debriefs focused strictly on ATL process metrics (persistence, regulation) rather than raw numerical grades.'
    ],
    multidisciplinaryCollaboration: 'Coordinated with the IB Diploma Coordinator, School Psychologist, and External Clinical Psychiatrist to draft an inclusive education access passport. Hosted parent conferences to de-escalate parental academic pressure.',
    clinicalTakeaways: [
      'High school behavioral therapy in IB World Schools requires sophisticated clinical fluency with academic perfectionism and ACT principles.',
      'Official IB Cardiff accommodation protocols are essential behavioral scaffolding for severe somatic panic.',
      'Sophia completed all 6 formal DP exams in May with zero elopement episodes, earning 41 out of 45 IB points.'
    ]
  },
  {
    id: 'case-pyp-104',
    title: 'Managing Proprioceptive Seeking & Wandering in Early Childhood PYP Classroom',
    studentPseudonym: 'Student Noah (Kindergarten / Early Years 3)',
    programme: 'PYP',
    gradeBand: 'Early Childhood (Ages 5-6)',
    category: 'Sensory Modulation & Motor Agitation',
    primaryFunction: 'Automatic/Sensory',
    ibLearnerProfileTarget: 'Inquirers & Principled',
    ibAtlFocus: 'Self-Management (Spatial Awareness & Body Control)',
    presentingSituation: 'Noah demonstrated chronic out-of-seat wandering, crashing into book displays, rolling across other students during story circle, and mouth-chewing of non-food items (pencils, clothing collars). Standard classroom redirection resulted in repetitive giggling and immediate recidivism.',
    targetBehaviorOperationalDefinition: 'Sensory motor disruption: Defined as leaving designated circle boundary without permission, launching torso onto furniture or peers, and placing inedible plastic or wooden objects past the lips into the oral cavity.',
    fbaHypothesis: 'Noah exhibits severe sensory seeking behaviors (proprioceptive and vestibular hypo-reactivity). Wandering and body crashing are maintained by automatic sensory reinforcement (proprioceptive input to joints and muscles) rather than defiance or academic escape.',
    baselineData: {
      frequencyPerWeek: 35,
      durationAverageMin: 12,
      intensity: 'Mild'
    },
    interventionData: {
      frequencyPerWeek: 6,
      durationAverageMin: 2,
      reductionPercentage: 82.9,
      durationWeeks: 6
    },
    antecedentInterventions: [
      'Sensory Diet Schedule: Scheduled 5 minutes of "Heavy Work" every 45 minutes (carrying book baskets, wall push-ups, crab walking to cubbies).',
      'Alternative Seating: Inflatable sensory disc cushion and resistance band strapped across front chair legs for foot bouncing.',
      'Oral Motor Chewelry: Provided medical-grade silicone chew necklace for safe oral sensory stimulation.'
    ],
    replacementBehaviorsFCT: [
      'Taught Noah to request "Stomp Break" using a picture symbol exchange (PECS).',
      'Designated "Sensory Crash Mat" in classroom corner with explicit visual rules: "Jump here when body feels bouncy".'
    ],
    consequenceExtinctionStrategies: [
      'Sensory Redirection: When crashing into peers occurred, teacher silently escorted Noah to the crash mat or heavy work station without verbal scolding (eliminating social attention reinforcement).',
      'Differential Reinforcement of Zero Rates of Behavior (DRO): Delivered dinosaur stamps every 10 minutes of remaining seated in designated learning zones.'
    ],
    multidisciplinaryCollaboration: 'Partnered with visiting Occupational Therapist (OT) to align sensory modulation protocols. Homeroom teacher integrated motor brain breaks for the whole class, destigmatizing Noah’s sensory tools.',
    clinicalTakeaways: [
      'Labeling automatic sensory seeking as "defiance" is a critical clinical error. Addressing the neurological input demand eliminates the disruptive topography.',
      'Classroom-wide sensory strategies benefit all early childhood PYP learners.'
    ]
  },
  {
    id: 'case-myp-805',
    title: 'Addressing Executive Function Paralysis & Silent Work Disengagement in MYP Individuals & Societies',
    studentPseudonym: 'Student Maya (Grade 8)',
    programme: 'MYP',
    gradeBand: 'Middle Years (Ages 13-14)',
    category: 'Executive Functioning & Task Refusal',
    primaryFunction: 'Escape/Avoidance',
    ibLearnerProfileTarget: 'Thinkers & Inquirers',
    ibAtlFocus: 'Organization & Thinking Skills',
    presentingSituation: 'In MYP Humanities (Individuals & Societies), Maya routinely engaged in passive non-compliance: sitting motionless for entire 60-minute periods with notebook open but blank, staring at the ceiling, doodling in margins, and refusing to begin research inquiries. When asked questions, Maya gave one-word shrugs.',
    targetBehaviorOperationalDefinition: 'Passive task refusal: Defined as failing to make pencil-to-paper or fingers-to-keyboard contact within 5 minutes of prompt delivery, accompanied by gaze aversion and non-responsiveness to teacher instructions.',
    fbaHypothesis: 'Complex, multi-page MYP inquiry prompts with ambiguous formatting evoke cognitive overwhelm and executive dysfunction. Passive disengagement functions to avoid the anxiety of producing flawed academic work (negative reinforcement: avoidance of failure).',
    baselineData: {
      frequencyPerWeek: 8,
      durationAverageMin: 50,
      intensity: 'Mild'
    },
    interventionData: {
      frequencyPerWeek: 1,
      durationAverageMin: 6,
      reductionPercentage: 87.5,
      durationWeeks: 5
    },
    antecedentInterventions: [
      'Visual Task Decomposition: Converted 3-page research outlines into single-step color-coded checklists (e.g., Step 1: Write only the research question).',
      'The 2-Minute Rule: Agreed upon a contract where Maya only had to write for 120 seconds before choosing whether to take a 1-minute pause.',
      'Graphic Organizers: Scaffolding historical source analysis with structured sentence starters.'
    ],
    replacementBehaviorsFCT: [
      'Self-Monitoring Checklist: Maya checked off mini-milestones independently, cultivating intrinsic ATL self-management.',
      'Taught Maya to highlight confusing prompt phrases in yellow and request specific clarification rather than shutting down.'
    ],
    consequenceExtinctionStrategies: [
      'Extinction of Passive Avoidance: Teacher did not allow class period to end with zero output; held a brief, calm 5-minute after-class completion sprint.',
      'Differential Reinforcement of Alternative (DRA): Teacher delivered immediate quiet verbal recognition for each completed bullet point.'
    ],
    multidisciplinaryCollaboration: 'Collaborated with English and Humanities subject teachers to standardize research templates across subjects.',
    clinicalTakeaways: [
      'Passive non-compliance in middle school is often disguised executive dysfunction rather than apathy.',
      'Chunking and high-contrast visual structuring directly unlock cognitive momentum.'
    ]
  },
  {
    id: 'case-pyp-206',
    title: 'Extinguishing Tangible Tantrums & Physical Aggression during Screen Transitions',
    studentPseudonym: 'Student Lucas (Grade 2)',
    programme: 'PYP',
    gradeBand: 'Primary Years (Ages 7-8)',
    category: 'Interpersonal Friction & Social Communication',
    primaryFunction: 'Access to Tangible',
    ibLearnerProfileTarget: 'Principled & Balanced',
    ibAtlFocus: 'Self-Management (Emotional Regulation & Flexibility)',
    presentingSituation: 'Lucas exhibited severe behavioral outbursts whenever educational tablet sessions concluded in the classroom. Behaviors included biting his own forearm, biting teacher hands when devices were collected, screaming, and kicking the tech charging trolley.',
    targetBehaviorOperationalDefinition: 'Tangible transition aggression: Defined as sinking teeth into own flesh or others, biting, kicking, and screaming at > 80dB triggered by the removal of digital touchscreen devices.',
    fbaHypothesis: 'Removal of the tablet (SD) evokes severe aggressive behavior which historically resulted in adults returning the tablet for "just 5 more minutes" to keep the classroom calm (positive reinforcement: tangible access through intermittent schedule).',
    baselineData: {
      frequencyPerWeek: 12,
      durationAverageMin: 19,
      intensity: 'Severe / Crisis'
    },
    interventionData: {
      frequencyPerWeek: 1,
      durationAverageMin: 2,
      reductionPercentage: 91.7,
      durationWeeks: 7
    },
    antecedentInterventions: [
      'Visual & Auditory Countdowns: 5-minute, 2-minute, and 30-second multi-sensory timer alerts on the tablet screen.',
      'Premack Principle ("First-Then"): "First dock iPad in charging bay, then select Lego building station for 10 minutes".',
      'Physical Transition Object: Lucas was given a physical token to carry from the screen area to the construction zone.'
    ],
    replacementBehaviorsFCT: [
      'Taught Lucas to push a giant red "Save & Pause" button on his visual board.',
      'Taught functional vocal request: "May I save my game to play tomorrow?"'
    ],
    consequenceExtinctionStrategies: [
      'Tangible Extinction: Under zero circumstances was tablet screen time re-opened or extended in response to aggression or self-injury.',
      'Safety Management: Staff wore protective arm guards for 2 weeks; student was blocked from self-biting using neutral non-restrictive protective pads.',
      'High-Density Praise: Lavished celebratory social praise and peer high-fives upon successful, independent tablet docking.'
    ],
    multidisciplinaryCollaboration: 'Coached LSA and parents on extinction burst preparedness. Parents synchronized identical tablet transition rules at home.',
    clinicalTakeaways: [
      'Extinction bursts are predictable and must be planned for with rigorous safety protocols.',
      'Consistency across school and home environments is non-negotiable for tangible-maintained behaviors.'
    ]
  }
];

export const INITIAL_ABBREVIATIONS: Abbreviation[] = [
  {
    id: 'abbr-1',
    acronym: 'ABC',
    fullName: 'Antecedent-Behavior-Consequence',
    domain: 'ABA Clinical',
    definition: 'The fundamental three-term contingency in behavioral analysis describing the stimulus preceding a behavior, the observable action, and the environmental event following it.',
    clinicalApplication: 'Used in classroom observations to identify the functional relationships maintaining student behavior.',
    exampleInSchool: 'Antecedent: Pop quiz announced. Behavior: Paper tearing. Consequence: Sent out of room (Escape).'
  },
  {
    id: 'abbr-2',
    acronym: 'ABA',
    fullName: 'Applied Behavior Analysis',
    domain: 'ABA Clinical',
    definition: 'The scientific discipline devoted to understanding and improving human behavior using principles of operant and respondent conditioning.',
    clinicalApplication: 'Guides evidence-based individualized behavior plans, skill acquisition programs, and functional assessments.',
    exampleInSchool: 'Designing token economies and discrete trial protocols for neurodiverse students in IB schools.'
  },
  {
    id: 'abbr-3',
    acronym: 'FBA',
    fullName: 'Functional Behavior Assessment',
    domain: 'ABA Clinical',
    definition: 'A systematic diagnostic process for determining the underlying purpose or function that a specific problem behavior serves for an individual.',
    clinicalApplication: 'Mandatory prerequisite for developing an individualized Behavior Intervention Plan (BIP).',
    exampleInSchool: 'Conducting direct scatterplots, parent interviews, and ABC recording to discover if shouting in class is maintained by attention or escape.'
  },
  {
    id: 'abbr-4',
    acronym: 'BIP',
    fullName: 'Behavior Intervention Plan',
    domain: 'ABA Clinical',
    definition: 'A formal, written clinical roadmap detailing proactive antecedent strategies, teaching replacement behaviors, and consequence extinction protocols.',
    clinicalApplication: 'Distributed to multidisciplinary school teams (homeroom teachers, LSAs, subject leads) to ensure uniform clinical execution.',
    exampleInSchool: 'A 3-page protocol instructing staff how to respond during green, yellow, and red escalation states for Student M.'
  },
  {
    id: 'abbr-5',
    acronym: 'SEAT',
    fullName: 'Sensory · Escape · Attention · Tangible',
    domain: 'ABA Clinical',
    definition: 'The four recognized universal functions of operant human behavior in Applied Behavior Analysis.',
    clinicalApplication: 'The foundational diagnostic lens for analyzing any classroom behavioral incident.',
    exampleInSchool: 'Determining whether a Grade 8 student is leaving class to avoid math (Escape) or talk with peers in the corridor (Attention/Tangible).'
  },
  {
    id: 'abbr-6',
    acronym: 'FCT',
    fullName: 'Functional Communication Training',
    domain: 'ABA Clinical',
    definition: 'A differential reinforcement procedure that teaches an appropriate, socially valid communicative alternative to replace problem behavior.',
    clinicalApplication: 'Replacing aggression, screaming, or elopement with communication cards, speech-generating devices, or vocal requests.',
    exampleInSchool: 'Teaching a PYP student to hand a "Help Please" symbol card instead of throwing pencil boxes.'
  },
  {
    id: 'abbr-7',
    acronym: 'DRA',
    fullName: 'Differential Reinforcement of Alternative Behavior',
    domain: 'ABA Clinical',
    definition: 'A behavioral procedure where reinforcement is delivered for a desirable alternative behavior while reinforcement is withheld for the problem behavior.',
    clinicalApplication: 'Increases constructive student behaviors while systematically placing maladaptive behaviors on extinction.',
    exampleInSchool: 'Praising and rewarding a student who raises their hand to ask for a turn, while ignoring blurting out.'
  },
  {
    id: 'abbr-8',
    acronym: 'DRI',
    fullName: 'Differential Reinforcement of Incompatible Behavior',
    domain: 'ABA Clinical',
    definition: 'A procedure reinforcing a behavior that cannot physically occur at the same time as the target problem behavior.',
    clinicalApplication: 'Highly effective for physical disruptions, pacing, and out-of-seat behaviors.',
    exampleInSchool: 'Reinforcing keeping both hands flat on the desk or lap, which makes hitting or throwing impossible.'
  },
  {
    id: 'abbr-9',
    acronym: 'DRO',
    fullName: 'Differential Reinforcement of Other Behavior',
    domain: 'ABA Clinical',
    definition: 'Delivering reinforcement whenever the target problem behavior has not occurred during a specified time interval (zero rates).',
    clinicalApplication: 'Used to rapidly suppress severe vocal disruptions or motor stereotypies across classroom periods.',
    exampleInSchool: 'Rewarding a student with a preferred puzzle sticker after every 10 minutes free of screaming.'
  },
  {
    id: 'abbr-10',
    acronym: 'SD (Sᴰ)',
    fullName: 'Discriminative Stimulus',
    domain: 'ABA Clinical',
    definition: 'An antecedent stimulus correlated with the availability of reinforcement for a particular behavioral response.',
    clinicalApplication: 'Understanding which environmental signals (teacher voice, bell, peer gaze) trigger specific behaviors.',
    exampleInSchool: 'The teacher opening the laptop cart signals that playing educational games is now reinforced.'
  },
  {
    id: 'abbr-11',
    acronym: 'MO / EO / AO',
    fullName: 'Motivating Operation / Establishing Operation / Abolishing Operation',
    domain: 'ABA Clinical',
    definition: 'Environmental events or biological conditions that temporarily alter the value of a reinforcer and the frequency of behavior reinforced by it.',
    clinicalApplication: 'Recognizing setting events such as lack of sleep, hunger, sensory overload, or prolonged academic struggle.',
    exampleInSchool: 'A student who skipped breakfast experiences food deprivation as an Establishing Operation (EO), increasing tangible food-seeking.'
  },
  {
    id: 'abbr-12',
    acronym: 'NCR',
    fullName: 'Non-Contingent Reinforcement',
    domain: 'ABA Clinical',
    definition: 'The delivery of maintaining reinforcers on a fixed or variable time schedule independent of the student\'s behavior.',
    clinicalApplication: 'Abolishes the motivation (AO) to engage in problem behavior to access attention or sensory input.',
    exampleInSchool: 'Teacher checks in with a student every 5 minutes with warm attention so the student does not need to act out to get noticed.'
  },
  {
    id: 'abbr-13',
    acronym: 'DTT',
    fullName: 'Discrete Trial Training',
    domain: 'ABA Clinical',
    definition: 'A structured ABA instructional method breaking skills down into discrete components with a clear antecedent, prompt, response, and consequence.',
    clinicalApplication: 'Used in 1-on-1 intensive interventions for foundational language and motor milestones.',
    exampleInSchool: 'Teaching receptive identification of emotion flashcards in a quiet support room.'
  },
  {
    id: 'abbr-14',
    acronym: 'NET',
    fullName: 'Natural Environment Teaching',
    domain: 'ABA Clinical',
    definition: 'ABA instruction occurring within naturally occurring everyday activities, capitalizing on student-directed motivation.',
    clinicalApplication: 'Ideal for IB international school environments (playgrounds, collaborative inquiry centers, cafeterias).',
    exampleInSchool: 'Teaching social greeting and sharing during cafeteria lunch line rather than at a sterile clinic table.'
  },
  {
    id: 'abbr-15',
    acronym: 'PBS / PBIS',
    fullName: 'Positive Behavior Support / Positive Behavioral Interventions & Supports',
    domain: 'ABA Clinical',
    definition: 'A values-led framework applying behavioral science to enhance quality of life and prevent problem behavior through environmental redesign.',
    clinicalApplication: 'School-wide multi-tiered systems of support (MTSS Tier 1, 2, 3) across international schools.',
    exampleInSchool: 'Creating school-wide matrix of expectations for hallways, bathrooms, and libraries.'
  },
  {
    id: 'abbr-16',
    acronym: 'IB',
    fullName: 'International Baccalaureate',
    domain: 'IB Education',
    definition: 'A globally recognized educational foundation offering four programs focusing on critical thinking, intercultural understanding, and holistic development.',
    clinicalApplication: 'Contextualizes behavioral therapy within inquiry-based, student-directed, non-traditional learning environments.',
    exampleInSchool: 'Aligning behavioral goals with international-mindedness and student agency.'
  },
  {
    id: 'abbr-17',
    acronym: 'PYP',
    fullName: 'Primary Years Programme',
    domain: 'IB Education',
    definition: 'The IB curriculum framework for students aged 3 to 12 focusing on transdisciplinary learning through inquiry units of inquiry (UOI).',
    clinicalApplication: 'Behavioral therapist designs visual schedules and sensory zones tailored to play-based and inquiry classrooms.',
    exampleInSchool: 'Managing peer friction during 6-week transdisciplinary inquiry projects.'
  },
  {
    id: 'abbr-18',
    acronym: 'MYP',
    fullName: 'Middle Years Programme',
    domain: 'IB Education',
    definition: 'The IB curriculum framework for students aged 11 to 16 emphasizing interdisciplinary understanding and authentic assessment criteria (A, B, C, D).',
    clinicalApplication: 'Interventions target adolescent executive functioning, lab safety, social-emotional peer dynamics, and criterion rubric anxiety.',
    exampleInSchool: 'Coaching students on managing multi-week Community Project deliverables.'
  },
  {
    id: 'abbr-19',
    acronym: 'DP',
    fullName: 'Diploma Programme',
    domain: 'IB Education',
    definition: 'A rigorous, pre-university 2-year educational programme for students aged 16 to 19 featuring 6 subjects, Extended Essay, TOK, and CAS.',
    clinicalApplication: 'Therapy focuses on high-stakes academic perfectionism, panic desensitization, time management, and official IB accommodations.',
    exampleInSchool: 'Supporting Grade 11-12 students with stop-the-clock exam modifications and cognitive reframing.'
  },
  {
    id: 'abbr-20',
    acronym: 'ATL',
    fullName: 'Approaches to Learning',
    domain: 'IB Education',
    definition: 'Five core categories of deliberate skills fostered in IB students: Thinking, Communication, Social, Self-Management, and Research skills.',
    clinicalApplication: 'The perfect pedagogical bridge linking ABA replacement behaviors directly to the curriculum.',
    exampleInSchool: 'Framing emotional regulation and impulse control as "ATL Self-Management: Affective Skills".'
  },
  {
    id: 'abbr-21',
    acronym: 'LP',
    fullName: 'Learner Profile',
    domain: 'IB Education',
    definition: 'The ten attributes IB learners strive to embody: Inquirers, Knowledgeable, Thinkers, Communicators, Principled, Open-minded, Caring, Risk-takers, Balanced, Reflective.',
    clinicalApplication: 'Used as affirming psychological vocabulary to reinforce student progress and self-concept.',
    exampleInSchool: 'Commending a student who used their calm-down breathing card as being "Reflective and Balanced".'
  },
  {
    id: 'abbr-22',
    acronym: 'UOI',
    fullName: 'Unit of Inquiry',
    domain: 'IB Education',
    definition: 'An in-depth, multi-week conceptual learning exploration organized under transdisciplinary themes in the PYP.',
    clinicalApplication: 'Therapist modifies classroom environmental triggers during shifting UOI projects.',
    exampleInSchool: 'Supporting a student with ADHD during open-ended research on "Sharing the Planet".'
  },
  {
    id: 'abbr-23',
    acronym: 'TOK',
    fullName: 'Theory of Knowledge',
    domain: 'IB Education',
    definition: 'A flagship core DP course where students reflect on the nature of knowledge, claims, and how we know what we know.',
    clinicalApplication: 'Often a trigger for perfectionistic avoidance; therapist utilizes ACT and metacognitive pacing.',
    exampleInSchool: 'Breaking the 1,600-word TOK exhibition into structured 15-minute behavioral work sprints.'
  },
  {
    id: 'abbr-24',
    acronym: 'CAS',
    fullName: 'Creativity, Activity, Service',
    domain: 'IB Education',
    definition: 'A mandatory core component of the IB Diploma requiring real-world experiential learning outside the academic curriculum.',
    clinicalApplication: 'Therapist assists students with social anxiety to find accommodating service learning placements.',
    exampleInSchool: 'Supporting an autistic student in organizing an inclusive library book club for CAS.'
  },
  {
    id: 'abbr-25',
    acronym: 'IEP',
    fullName: 'Individualized Education Plan',
    domain: 'Multidisciplinary & SEN',
    definition: 'A formal legal document outlining specific educational goals, accommodations, and clinical services for a student with identified learning needs.',
    clinicalApplication: 'The therapist contributes behavioral goals, baseline metrics, and intervention matrices.',
    exampleInSchool: 'Participating in annual review meetings with coordinators, parents, and therapists.'
  },
  {
    id: 'abbr-26',
    acronym: 'LSA',
    fullName: 'Learning Support Assistant (or Paraprofessional / Shadow Teacher)',
    domain: 'Multidisciplinary & SEN',
    definition: 'A dedicated educator providing direct 1:1 or small group instructional and behavioral support in inclusive classrooms.',
    clinicalApplication: 'The therapist trains and supervises LSAs on fidelity of behavior intervention plans and prompt fading.',
    exampleInSchool: 'Coaching an LSA on how to fade hand-over-hand prompts to independent visual token exchange.'
  },
  {
    id: 'abbr-27',
    acronym: 'SEN / SEND',
    fullName: 'Special Educational Needs (and Disabilities)',
    domain: 'Multidisciplinary & SEN',
    definition: 'Educational and developmental needs requiring specialized accommodations, modified curricula, or clinical behavioral support.',
    clinicalApplication: 'Categorization framework utilized by international school student support departments.',
    exampleInSchool: 'Collaborating on Tier 3 intensive supports for students with neurodivergent diagnoses.'
  },
  {
    id: 'abbr-28',
    acronym: 'MDT',
    fullName: 'Multi-Disciplinary Team',
    domain: 'Multidisciplinary & SEN',
    definition: 'A collaborative committee comprising Behavioral Therapists, Speech-Language Pathologists (SLP), Occupational Therapists (OT), School Psychologists, and IB Coordinators.',
    clinicalApplication: 'Convenes regularly to review holistic student progress, analyze ABC trends, and update interventions.',
    exampleInSchool: 'Joint case conference to evaluate sensory vs. communication drivers of a student’s classroom meltdowns.'
  },
  {
    id: 'abbr-29',
    acronym: 'OT',
    fullName: 'Occupational Therapist',
    domain: 'Multidisciplinary & SEN',
    definition: 'Healthcare professional specializing in fine motor skills, sensory integration, visual-spatial coordination, and activities of daily living.',
    clinicalApplication: 'Behavioral therapist collaborates with OT to differentiate sensory hypo/hyper-reactivity from operant learned escape.',
    exampleInSchool: 'Co-designing a sensory diet combining heavy work with behavioral reinforcement schedules.'
  },
  {
    id: 'abbr-30',
    acronym: 'SLP',
    fullName: 'Speech-Language Pathologist',
    domain: 'Multidisciplinary & SEN',
    definition: 'Clinician evaluating and treating communication, pragmatics, voice, and expressive/receptive language disorders.',
    clinicalApplication: 'Essential partner in Functional Communication Training (FCT) and AAC (Augmentative and Alternative Communication) systems.',
    exampleInSchool: 'Selecting appropriate high-tech AAC symbols for a non-speaking PYP student.'
  },
  {
    id: 'abbr-31',
    acronym: 'PECS',
    fullName: 'Picture Exchange Communication System',
    domain: 'ABA Clinical',
    definition: 'An augmentative and alternative communication protocol utilizing ABA principles where individuals exchange pictures to communicate requests and comments.',
    clinicalApplication: 'Teaches functional requesting to extinguish tantrums and frustration-induced aggression.',
    exampleInSchool: 'Early years student exchanging a "Water" or "Toilet" picture card independently.'
  },
  {
    id: 'abbr-32',
    acronym: 'MTSS',
    fullName: 'Multi-Tiered System of Supports',
    domain: 'Multidisciplinary & SEN',
    definition: 'A systemic prevention framework comprising Tier 1 (Universal school-wide), Tier 2 (Targeted small group), and Tier 3 (Intensive individualized) interventions.',
    clinicalApplication: 'Structuring therapist consultation across whole-school climate and intensive individual student caseloads.',
    exampleInSchool: 'Leading Tier 1 emotional regulation workshops while delivering Tier 3 BIPs for acute cases.'
  }
];

export const INITIAL_BIP_TEMPLATE: BIPPlan = {
  id: 'bip-pyp-401',
  studentCode: 'Student L (Grade 4)',
  programme: 'PYP',
  targetBehavior: 'Task Avoidance & Disruptive Property Destruction',
  operationalDefinition: 'Pushing desk/chair > 20cm abruptly, sweeping items off flat surfaces onto floor, and vocalizing opposition ("No", "I hate IB", screaming) at > 70dB lasting > 15s.',
  functionOfBehavior: 'Escape/Avoidance',
  preventiveStrategies: [
    'Pre-corrective priming 5 minutes before open-ended inquiry blocks.',
    'Visual task chunking using 4-part visual strip (10 min work, 2 min pause).',
    'Providing speech-to-text alternative output mode.',
    'Seating positioned away from high-traffic doorway and flickering lights.'
  ],
  teachingStrategies: [
    'Functional Communication Training (FCT): Exchange "3-Minute Decompression Break" card.',
    'ATL Self-Management: Practice 4-7-8 diaphragmatic breathing with visual lung graphic.',
    'Social script: "I need help with this question, please show me step 1".'
  ],
  reactiveStrategies: [
    'Maintain neutral, low-arousal adult posture (sideways stance, avoid direct prolonged eye contact).',
    'Do not engage in verbal debate or moralizing lectures during arousal.',
    'Keep physical proximity at safe 2-meter boundary; protect peers calmly.'
  ],
  crisisEscalationLevels: [
    {
      level: 'Green (Baseline)',
      behaviorIndicators: 'Relaxed posture, responsive to greetings, working on visual task schedule, engaging with peers.',
      adultResponse: 'Deliver high-density non-contingent praise; reinforce on a VR-3 schedule for on-task persistence.'
    },
    {
      level: 'Yellow (Agitation / Rumbling)',
      behaviorIndicators: 'Fidgeting with pencil, rapid eye darting, sighs, muttering "This is stupid", stiffened shoulder posture.',
      adultResponse: 'Prompt replacement behavior immediately: point to break card, offer choice of tool (pencil vs typing), reduce verbal language.'
    },
    {
      level: 'Orange (Escalation / Outburst)',
      behaviorIndicators: 'Shoving chair back, sweeping books to floor, vocal volume > 70dB, clenching fists, refusal to sit.',
      adultResponse: 'Safety positioning: clear surrounding students quietly. Stop all academic demands. Deliver single 2-word calm prompt: "Safe space".'
    },
    {
      level: 'Red (Crisis)',
      behaviorIndicators: 'Throwing heavy objects, kicking walls, attempting to hit or bite self/others, complete cognitive disengagement.',
      adultResponse: 'Execute crisis safety protocol: evacuate room if necessary. Do not restrain unless imminent severe physical injury. Contact behavior therapist.'
    },
    {
      level: 'Blue (De-escalation & Recovery)',
      behaviorIndicators: 'Lowered vocal volume, rhythmic breathing returning, crying or sighing, sitting on floor quietly, asks for water.',
      adultResponse: 'Allow quiet sensory recovery without questions for 10-15 minutes. Offer sips of cool water. Reconnect non-judgmentally before restoring task.'
    }
  ],
  reinforcementSchedule: 'Differential Reinforcement of Alternative Behavior (DRA): 1 token awarded for every 8 minutes of sustained task engagement without disruption. 4 tokens = 10 minutes of preferred MakerSpace inquiry.',
  reviewDate: '2026-12-01'
};

export const SUPPORT_PLANS: BIPPlan[] = [
  INITIAL_BIP_TEMPLATE,
  {
    id: 'bip-myp-702',
    studentCode: 'Student K (MYP Grade 7)',
    programme: 'MYP',
    targetBehavior: 'Physical Aggression & Apparatus Hoarding in Sciences',
    operationalDefinition: 'Placing hands on peer belongings, shouting "Touch this and you will regret it", slamming beakers or blocking station with torso.',
    functionOfBehavior: 'Access to Tangible',
    preventiveStrategies: [
      'Pre-assigned structured lab roles: "Investigator A / Data Logger / Timekeeper".',
      'Visual 3-minute sand timers on lab counter for station rotation.',
      'Non-contingent access to high-interest design tools prior to collaborative blocks.'
    ],
    teachingStrategies: [
      'Scripted request training: "I need 2 more minutes to finish this measurement, then you have the station."',
      'ATL Social Skills: Perspective taking and collaborative dialogue rubrics.'
    ],
    reactiveStrategies: [
      'Differential Reinforcement of Incompatible Behavior (DRI): Hands flat on clipboard during peer turn.',
      'Tangible extinction: Apparatus removed until 3 minutes of calm cooperation is displayed.'
    ],
    crisisEscalationLevels: [
      {
        level: 'Green (Baseline)',
        behaviorIndicators: 'Collaborating calmly, recording observations on shared tablet, hands on personal tools.',
        adultResponse: 'Deliver verbal praise every 5 minutes; award criterion engagement bonus points.'
      },
      {
        level: 'Yellow (Agitation / Rumbling)',
        behaviorIndicators: 'Rapid breathing, clutching apparatus tightly with both hands, ignoring peer requests to share.',
        adultResponse: 'Prompt visual turn-taking card; remind of remaining timer countdown; offer neutral choice.'
      },
      {
        level: 'Orange (Escalation / Outburst)',
        behaviorIndicators: 'Shouting at peer, slamming beakers onto workbench, blocking access with physical stance.',
        adultResponse: 'Step between students with neutral open stance. Direct peer to alternate workbench safely. Low-arousal voice.'
      },
      {
        level: 'Red (Crisis)',
        behaviorIndicators: 'Throwing glassware or threatening physical violence with lab instruments.',
        adultResponse: 'Evacuate lab workbench perimeter immediately. Do not physically engage unless immediate danger. Summon therapist.'
      },
      {
        level: 'Blue (De-escalation & Recovery)',
        behaviorIndicators: 'Hands open, sitting down, lower vocal pitch, responsive to simple redirection.',
        adultResponse: 'Allow 10 minutes quiet breathing; provide cool water; conduct restorative clean-up once fully regulated.'
      }
    ],
    reinforcementSchedule: 'DRI: 1 token for each 5-minute interval hands remain on personal clipboard while peer operates apparatus. 3 tokens = 10 min preferred CAD design.',
    reviewDate: '2026-11-28'
  },
  {
    id: 'bip-dp-1103',
    studentCode: 'Student S (DP Grade 11)',
    programme: 'DP',
    targetBehavior: 'Assessment Panic & Examination Elopement',
    operationalDefinition: 'Hyperventilating, vocalizing panic, crumpling exam answer sheets, and exiting testing room without authorization.',
    functionOfBehavior: 'Escape/Avoidance',
    preventiveStrategies: [
      'Official IB Inclusive Assessment accommodation: Separate distraction-free room & 10 min/hr stop-the-clock rest breaks.',
      'Graduated exposure hierarchies with timed practice tests.',
      'Silent digital countdown timer replacing ticking wall clocks.'
    ],
    teachingStrategies: [
      'Acceptance & Commitment Training (ACT) cognitive defusion: "I am having the thought that I will fail, but I can still write question 1".',
      'Somatic 5-4-3-2-1 grounding protocol.',
      'Silent "Pause Card" placed on desk to alert invigilator without verbal speech.'
    ],
    reactiveStrategies: [
      'Low-arousal escort to quiet annex without lecture or academic cajoling.',
      'Stop-the-clock timer engaged; assessment never cancelled, only paused until physiological regulation is restored.'
    ],
    crisisEscalationLevels: [
      {
        level: 'Green (Baseline)',
        behaviorIndicators: 'Focused on exam paper, utilizing margin scratch notes, steady breathing.',
        adultResponse: 'Maintain silent, non-intrusive monitoring; ensure water bottle is filled.'
      },
      {
        level: 'Yellow (Agitation / Rumbling)',
        behaviorIndicators: 'Rapid pencil tapping, tears welling in eyes, heavy sighing, staring blankly at single problem for > 6 minutes.',
        adultResponse: 'Quietly point to somatic grounding card on desk; tap stop-the-clock timer offering a 3-minute pause.'
      },
      {
        level: 'Orange (Escalation / Outburst)',
        behaviorIndicators: 'Crying aloud, crumpling answer booklet, pushing chair back to stand and flee.',
        adultResponse: 'Softly prompt: "Pause card active. Step with me to the quiet corridor." Walk at student\'s pace.'
      },
      {
        level: 'Red (Crisis)',
        behaviorIndicators: 'Full panic attack, severe hyperventilation, inability to stand, numbness in fingers.',
        adultResponse: 'Guide student to sit against wall; guide slow 4-7-8 breathing; notify school nurse and therapist.'
      },
      {
        level: 'Blue (De-escalation & Recovery)',
        behaviorIndicators: 'Respiratory rate returns to baseline, tears subside, acknowledges invigilator presence.',
        adultResponse: 'Offer cold water; review question 1 collaboratively to rebuild momentum; restart exam clock.'
      }
    ],
    reinforcementSchedule: 'Self-monitoring: Checking off each completed question section with 2 minutes of silent eye rest.',
    reviewDate: '2026-12-15'
  }
];
