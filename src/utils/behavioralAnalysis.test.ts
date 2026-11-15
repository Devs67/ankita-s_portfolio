import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFunctionDistribution,
  calculateIntensityBreakdown,
  calculateProgrammeBreakdown,
  calculateOutcomeReduction,
  filterABCLogs,
  generateTimelineTrendData,
  generateTimeOfDayDistribution,
  searchAbbreviations,
  validateABCEntry
} from './behavioralAnalysis';
import { ABCEntry, Abbreviation, ABCFilterState } from '../types/behavioral';

const mockLogs: ABCEntry[] = [
  {
    id: 'abc-1',
    timestamp: '2026-10-10 09:30',
    studentCode: 'Student A (PYP Grade 3)',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    antecedent: 'Presented with open-ended central idea reflection worksheet',
    behavior: 'Pushed paper off desk and hid head beneath arms',
    consequence: 'Teacher prompted with visual break card; task paused',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Mild',
    durationMinutes: 6,
    replacementBehavior: 'Pointing to "Need 2-min Processing Break" visual token',
    consequenceInterventionApplied: 'Honored functional communication request; delivered 2-min timer'
  },
  {
    id: 'abc-2',
    timestamp: '2026-10-10 11:15',
    studentCode: 'Student B (MYP Grade 7)',
    programme: 'MYP',
    setting: 'Science & Design Lab',
    antecedent: 'Peer requested to share the microscope apparatus during group inquiry',
    behavior: 'Elevated vocal volume, yelled "Do not touch my station!", slammed lab manual',
    consequence: 'Peers stepped back in silence; teacher moved peer to another workbench',
    perceivedFunction: 'Access to Tangible',
    intensity: 'Moderate',
    durationMinutes: 4,
    replacementBehavior: 'Using structured turn-taking countdown timer script',
    consequenceInterventionApplied: 'Differential reinforcement of alternative communication (DRA)'
  },
  {
    id: 'abc-3',
    timestamp: '2026-10-11 14:00',
    studentCode: 'Student C (DP Grade 11)',
    programme: 'DP',
    setting: 'Exam & Assessment Hall',
    antecedent: 'Announcement of 15 minutes remaining on Mock Paper 2 assessment',
    behavior: 'Hyperventilating, crying, tearing scratch pad into strips',
    consequence: 'Invigilator called therapist; escorted to sensory decompression room',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Severe / Crisis',
    durationMinutes: 18,
    replacementBehavior: 'Box-breathing ATL self-regulation grounding protocol card',
    consequenceInterventionApplied: 'Low-arousal sensory regulation protocol followed by exam accommodation'
  }
];

test('calculateFunctionDistribution correctly computes counts and percentages', () => {
  const dist = calculateFunctionDistribution(mockLogs);
  const escapeDist = dist.find(d => d.functionName === 'Escape/Avoidance');
  const tangibleDist = dist.find(d => d.functionName === 'Access to Tangible');
  const sensoryDist = dist.find(d => d.functionName === 'Automatic/Sensory');

  assert.equal(escapeDist?.count, 2);
  assert.equal(escapeDist?.percentage, 67); // 2 out of 3 = 66.67% -> 67%
  assert.equal(tangibleDist?.count, 1);
  assert.equal(tangibleDist?.percentage, 33);
  assert.equal(sensoryDist?.count, 0);
  assert.equal(sensoryDist?.percentage, 0);
});

test('calculateIntensityBreakdown aggregates intensities correctly', () => {
  const breakdown = calculateIntensityBreakdown(mockLogs);
  assert.equal(breakdown.Mild, 1);
  assert.equal(breakdown.Moderate, 1);
  assert.equal(breakdown['Severe / Crisis'], 1);
});

test('calculateProgrammeBreakdown aggregates IB programmes accurately', () => {
  const prog = calculateProgrammeBreakdown(mockLogs);
  assert.equal(prog.PYP, 1);
  assert.equal(prog.MYP, 1);
  assert.equal(prog.DP, 1);
});

test('calculateOutcomeReduction calculates percentage drop with edge cases', () => {
  assert.equal(calculateOutcomeReduction(20, 4), 80);
  assert.equal(calculateOutcomeReduction(10, 0), 100);
  assert.equal(calculateOutcomeReduction(10, 10), 0);
  assert.equal(calculateOutcomeReduction(10, 15), 0); // worsened behavior
  assert.equal(calculateOutcomeReduction(0, 5), 0); // baseline zero
});

test('filterABCLogs filters correctly across multiple criteria', () => {
  const defaultFilter: ABCFilterState = {
    searchQuery: '',
    programme: 'all',
    functionType: 'all',
    intensity: 'all',
    setting: 'all'
  };

  // 1. All logs
  assert.equal(filterABCLogs(mockLogs, defaultFilter).length, 3);

  // 2. Filter by programme
  const pypFilter = { ...defaultFilter, programme: 'PYP' };
  assert.equal(filterABCLogs(mockLogs, pypFilter).length, 1);
  assert.equal(filterABCLogs(mockLogs, pypFilter)[0].studentCode, 'Student A (PYP Grade 3)');

  // 3. Filter by function
  const escapeFilter = { ...defaultFilter, functionType: 'Escape/Avoidance' };
  assert.equal(filterABCLogs(mockLogs, escapeFilter).length, 2);

  // 4. Search query matching antecedent or behavior text
  const searchFilter = { ...defaultFilter, searchQuery: 'microscope' };
  assert.equal(filterABCLogs(mockLogs, searchFilter).length, 1);
  assert.equal(filterABCLogs(mockLogs, searchFilter)[0].programme, 'MYP');
});

test('searchAbbreviations matches acronyms, full names and clinical context', () => {
  const mockAbbreviations: Abbreviation[] = [
    {
      id: '1',
      acronym: 'ABC',
      fullName: 'Antecedent-Behavior-Consequence',
      domain: 'ABA Clinical',
      definition: 'The three-term contingency underlying behavioral assessments.',
      clinicalApplication: 'Used to record observational data in classrooms.',
      exampleInSchool: 'Tracking task refusal in Grade 4 math.'
    },
    {
      id: '2',
      acronym: 'ATL',
      fullName: 'Approaches to Learning',
      domain: 'IB Education',
      definition: 'Deliberate skills cultivated across all IB programmes.',
      clinicalApplication: 'Bridging behavioral self-regulation with IB curriculum.',
      exampleInSchool: 'Teaching self-management strategies for exam stress.'
    }
  ];

  const res1 = searchAbbreviations(mockAbbreviations, 'contingency');
  assert.equal(res1.length, 1);
  assert.equal(res1[0].acronym, 'ABC');

  const res2 = searchAbbreviations(mockAbbreviations, 'atl');
  assert.equal(res2.length, 1);
  assert.equal(res2[0].acronym, 'ATL');

  const res3 = searchAbbreviations(mockAbbreviations, '', 'IB Education');
  assert.equal(res3.length, 1);
  assert.equal(res3[0].acronym, 'ATL');
});

test('validateABCEntry validates required clinical fields', () => {
  const invalid = validateABCEntry({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.studentCode);
  assert.ok(invalid.errors.programme);
  assert.ok(invalid.errors.antecedent);
  assert.ok(invalid.errors.behavior);

  const valid = validateABCEntry({
    studentCode: 'Student X',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    antecedent: 'Teacher gave direct oral prompt to start reading',
    behavior: 'Threw pencil across the carpet area',
    consequence: 'Peers laughed; teacher paused lesson',
    perceivedFunction: 'Attention',
    intensity: 'Mild',
    durationMinutes: 2
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateTimelineTrendData aggregates chronological entries by day and dimension', () => {
  const trend = generateTimelineTrendData(mockLogs);
  assert.equal(trend.length, 2);

  const day1 = trend[0];
  assert.equal(day1.fullDate, '2026-10-10');
  assert.equal(day1.date, 'Oct 10');
  assert.equal(day1.total, 2);
  assert.equal(day1.escape, 1);
  assert.equal(day1.tangible, 1);
  assert.equal(day1.mild, 1);
  assert.equal(day1.moderate, 1);
  assert.equal(day1.pyp, 1);
  assert.equal(day1.myp, 1);

  const day2 = trend[1];
  assert.equal(day2.fullDate, '2026-10-11');
  assert.equal(day2.date, 'Oct 11');
  assert.equal(day2.total, 1);
  assert.equal(day2.escape, 1);
  assert.equal(day2.crisis, 1);
  assert.equal(day2.dp, 1);

  // Empty logs check
  assert.deepEqual(generateTimelineTrendData([]), []);
});

test('generateTimeOfDayDistribution groups entries into school timetable intervals', () => {
  const slots = generateTimeOfDayDistribution(mockLogs);
  assert.equal(slots.length, 5);

  // mockLogs[0] at 09:30 and mockLogs[1] at 11:15 fall in "Inquiry & Academic Sprints (09:30 - 11:30)"
  const inquirySlot = slots.find(s => s.slot.includes('Inquiry'));
  assert.ok(inquirySlot);
  assert.equal(inquirySlot.count, 2);
  assert.equal(inquirySlot.percentage, 67);

  // mockLogs[2] at 14:00 falls in "Afternoon Labs & Assessments (13:00 - 14:30)"
  const afternoonSlot = slots.find(s => s.slot.includes('Afternoon'));
  assert.ok(afternoonSlot);
  assert.equal(afternoonSlot.count, 1);
  assert.equal(afternoonSlot.percentage, 33);

  // Empty logs check
  const emptySlots = generateTimeOfDayDistribution([]);
  assert.equal(emptySlots.length, 5);
  assert.equal(emptySlots.every(s => s.count === 0), true);
});
