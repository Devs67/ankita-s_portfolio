import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDocumentTextToABC } from './documentParser';

test('parseDocumentTextToABC parses single labeled clinical incident', () => {
  const sampleDoc = `
Student: Student M (MYP Grade 7)
Programme: MYP
Setting: Science & Design Lab
Antecedent: Peer grabbed the shared digital caliper during robotics build
Behavior: Snatched caliper back, slammed fist on bench, shouted "Get your hands off!"
Consequence: Teacher initiated 10-second countdown; peer redirected to another station
Function: Access to Tangible
Intensity: Moderate
Duration: 3 mins
Replacement: Requesting "My turn - please wait 2 minutes" script card
  `.trim();

  const results = parseDocumentTextToABC(sampleDoc);
  assert.equal(results.length, 1);
  const entry = results[0];
  assert.equal(entry.studentCode, 'Student M (MYP Grade 7)');
  assert.equal(entry.programme, 'MYP');
  assert.equal(entry.setting, 'Science & Design Lab');
  assert.equal(entry.perceivedFunction, 'Access to Tangible');
  assert.equal(entry.intensity, 'Moderate');
  assert.equal(entry.durationMinutes, 3);
  assert.ok(entry.antecedent?.includes('caliper'));
  assert.ok(entry.behavior?.includes('Snatched'));
  assert.ok(entry.consequence?.includes('countdown'));
  assert.ok(entry.replacementBehavior?.includes('script card'));
});

test('parseDocumentTextToABC splits multi-incident document', () => {
  const multiIncidentDoc = `
Incident 1
Student: Student K
Programme: PYP
Antecedent: Teacher announced end of free inquiry play
Behavior: Screamed, hid inside beanbag tunnel
Consequence: Assistant sat nearby with visual schedule
Function: Escape

Incident 2
Student: Student L
Programme: DP
Antecedent: Practice Extended Essay deadline announced
Behavior: Hyperventilating and pacing out of classroom
Consequence: Escorted to pastoral counselling office
Function: Escape
Intensity: Severe / Crisis
  `.trim();

  const results = parseDocumentTextToABC(multiIncidentDoc);
  assert.equal(results.length, 2);
  assert.equal(results[0].studentCode, 'Student K');
  assert.equal(results[0].programme, 'PYP');
  assert.equal(results[1].studentCode, 'Student L');
  assert.equal(results[1].programme, 'DP');
  assert.equal(results[1].intensity, 'Severe / Crisis');
});

test('single-letter labels do not match inside other words', () => {
  const doc = `Student: Student A - Grade 5
Setting: Science Lab - Room 2
Antecedent: Teacher asked to pack up
Behavior: Threw the pencil case
Consequence: Given a 2-minute warning`;
  const [entry] = parseDocumentTextToABC(doc);
  assert.equal(entry.antecedent, 'Teacher asked to pack up');
  assert.equal(entry.behavior, 'Threw the pencil case');
  assert.equal(entry.setting, 'Science & Design Lab');
});

test('A: / B: / C: shorthand is split into separate fields', () => {
  const doc = `Student: Student U
A: Boy behind her touched her hair during assembly
B: Pulling her hair
C: Looked at the shadow teacher and removed her hands`;
  const [entry] = parseDocumentTextToABC(doc);
  assert.equal(entry.antecedent, 'Boy behind her touched her hair during assembly');
  assert.equal(entry.behavior, 'Pulling her hair');
  assert.equal(entry.consequence, 'Looked at the shadow teacher and removed her hands');
});

test('consecutive Student: blocks split without a --- separator', () => {
  const doc = `Student: K
Antecedent: Bell rang for recess
Behavior: Screamed loudly

Student: L
Antecedent: Deadline announced
Behavior: Paced around the room`;
  const results = parseDocumentTextToABC(doc);
  assert.equal(results.length, 2);
  assert.equal(results[1].studentCode, 'L');
});

test('settings map onto the app setting list', () => {
  const settingOf = (s: string) =>
    parseDocumentTextToABC(`Setting: ${s}\nAntecedent: something\nBehavior: something else`)[0].setting;
  assert.equal(settingOf('Lunch hall'), 'Cafeteria & Dining Hall');
  assert.equal(settingOf('Corridor'), 'Hallway & Locker Bay');
  assert.equal(settingOf('Sports field'), 'Outdoor Recess & Sports Field');
});

test('parseDocumentTextToABC handles empty input gracefully', () => {
  assert.deepEqual(parseDocumentTextToABC(''), []);
  assert.deepEqual(parseDocumentTextToABC('   '), []);
});
