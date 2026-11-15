import { ABCEntry, BehaviorFunction, BehaviorIntensity, IBProgramme, SettingEnvironment } from '../types/behavioral';

/**
 * Extracts and maps clinical ABC logs from raw text (extracted from Word .docx or pasted text).
 */
export function parseDocumentTextToABC(rawText: string): Partial<ABCEntry>[] {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line breaks
  const cleaned = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split into chunks if there are multiple incidents separated by headings, numbered sections, or horizontal lines
  const delimiterRegex = /(?:\n\s*(?:---+|===+|___+)\s*\n)|(?:\n(?=(?:Incident|Observation|Case|Entry|ABC Record)\s*#?\d+[:\s\n]))|(?:\n(?=Student(?:\s*Name|\s*Code|\s*ID)?\s*[:\-]))/i;
  
  const rawChunks = cleaned.split(delimiterRegex).map(c => c.trim()).filter(c => c.length > 10);
  const chunks = rawChunks.length > 0 ? rawChunks : [cleaned];

  const results: Partial<ABCEntry>[] = [];

  for (const chunk of chunks) {
    const entry = parseSingleABCChunk(chunk);
    // studentCode always gets a default, so it can't be used to tell real entries from heading-only chunks
    if (entry.behavior || entry.antecedent || entry.consequence) {
      results.push(entry);
    }
  }

  // Fallback: If no structured chunk yielded at least an antecedent or behavior, try single parse
  if (results.length === 0 && cleaned.trim().length > 15) {
    results.push(parseSingleABCChunk(cleaned));
  }

  return results;
}

function parseSingleABCChunk(chunk: string): Partial<ABCEntry> {
  const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);

  const parsed: Partial<ABCEntry> = {
    timestamp: localTimestamp(),
    durationMinutes: 5,
    intensity: 'Moderate',
    setting: 'Inquiry Classroom',
    programme: 'PYP',
    perceivedFunction: 'Escape/Avoidance'
  };

  // Field matchers
  const studentMatch = chunk.match(/(?:Student(?:\s*Code|\s*Pseudonym|\s*Name|\s*ID)?|Student)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (studentMatch) {
    parsed.studentCode = cleanField(studentMatch[1]);
  }

  const progMatch = chunk.match(/(?:IB\s*Programme|Programme|Program|Division|Grade\s*Band)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (progMatch) {
    const val = progMatch[1].toUpperCase();
    if (val.includes('DP') || val.includes('DIPLOMA')) parsed.programme = 'DP';
    else if (val.includes('MYP') || val.includes('MIDDLE')) parsed.programme = 'MYP';
    else if (val.includes('PYP') || val.includes('PRIMARY')) parsed.programme = 'PYP';
  } else {
    // Check inside chunk text
    if (/\b(?:DP|Diploma Programme|Grade 11|Grade 12)\b/i.test(chunk)) parsed.programme = 'DP';
    else if (/\b(?:MYP|Middle Years|Grade 6|Grade 7|Grade 8|Grade 9|Grade 10)\b/i.test(chunk)) parsed.programme = 'MYP';
    else if (/\b(?:PYP|Primary Years|Grade 1|Grade 2|Grade 3|Grade 4|Grade 5|Early Years)\b/i.test(chunk)) parsed.programme = 'PYP';
  }

  const settingMatch = chunk.match(/(?:Setting|Environment|Location|Context)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (settingMatch) {
    parsed.setting = normalizeSetting(settingMatch[1]);
  }

  // Labels must start a line so single-letter aliases (A/B/C) don't match inside words like "Lab - ..."
  const antecedentMatch = chunk.match(/^\s*(?:Antecedent|Trigger|Preceding\s*Event|Stimulus|SD|A)\s*[:\-\t]\s*([^\n\r]+(?:(?:\n(?!Behavior|Behaviour|Consequence|Function|Intensity|Student|Setting|Replacement|[ABC]\s*[:\-\t]))[^\n\r]+)*)/im);
  if (antecedentMatch) {
    parsed.antecedent = cleanField(antecedentMatch[1]);
  }

  const behaviorMatch = chunk.match(/^\s*(?:Behavior|Behaviour|Target\s*Behavior|Topography|B)\s*[:\-\t]\s*([^\n\r]+(?:(?:\n(?!Consequence|Function|Intensity|Student|Setting|Replacement|Antecedent|[ABC]\s*[:\-\t]))[^\n\r]+)*)/im);
  if (behaviorMatch) {
    parsed.behavior = cleanField(behaviorMatch[1]);
  }

  const consequenceMatch = chunk.match(/^\s*(?:Consequence|Immediate\s*Outcome|Reaction|Maintaining\s*Consequence|C)\s*[:\-\t]\s*([^\n\r]+(?:(?:\n(?!Function|Intensity|Student|Setting|Replacement|Antecedent|Behavior|[ABC]\s*[:\-\t]))[^\n\r]+)*)/im);
  if (consequenceMatch) {
    parsed.consequence = cleanField(consequenceMatch[1]);
  }

  const functionMatch = chunk.match(/(?:Function|Perceived\s*Function|Maintaining\s*Function|SEAT)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (functionMatch) {
    parsed.perceivedFunction = normalizeFunction(functionMatch[1]);
  } else {
    // Detect function keywords
    if (/escape|avoid|demand|refusal/i.test(chunk)) parsed.perceivedFunction = 'Escape/Avoidance';
    else if (/attention|peer reaction|teacher reaction/i.test(chunk)) parsed.perceivedFunction = 'Attention';
    else if (/tangible|access|item|toy|device|iPad|material/i.test(chunk)) parsed.perceivedFunction = 'Access to Tangible';
    else if (/sensory|automatic|stimming|noise|auditory|vestibular/i.test(chunk)) parsed.perceivedFunction = 'Automatic/Sensory';
  }

  const intensityMatch = chunk.match(/(?:Intensity|Severity|Crisis\s*Level|Tier)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (intensityMatch) {
    parsed.intensity = normalizeIntensity(intensityMatch[1]);
  } else {
    if (/crisis|severe|dangerous|elopement|aggression|injury/i.test(chunk)) parsed.intensity = 'Severe / Crisis';
    else if (/moderate|disruptive|interruption/i.test(chunk)) parsed.intensity = 'Moderate';
    else if (/mild|low/i.test(chunk)) parsed.intensity = 'Mild';
  }

  const replacementMatch = chunk.match(/(?:Replacement(?:\s*Behavior)?|FCT|Alternative\s*Behavior|DRA|Skill)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (replacementMatch) {
    parsed.replacementBehavior = cleanField(replacementMatch[1]);
  }

  const interventionMatch = chunk.match(/(?:Intervention|Applied\s*Intervention|Response|Protocol)\s*[:\-\t]\s*([^\n\r]+)/i);
  if (interventionMatch) {
    parsed.consequenceInterventionApplied = cleanField(interventionMatch[1]);
  }

  const durationMatch = chunk.match(/(?:Duration|Length|Time\s*Elapsed)\s*[:\-\t]\s*(\d+)\s*(?:min|m|minutes)?/i);
  if (durationMatch) {
    parsed.durationMinutes = parseInt(durationMatch[1], 10);
  }

  // If no labeled fields were found, try paragraph line heuristics
  if (!parsed.antecedent && !parsed.behavior && lines.length >= 3) {
    parsed.antecedent = lines[0];
    parsed.behavior = lines[1];
    parsed.consequence = lines[2];
  }

  if (!parsed.studentCode) {
    parsed.studentCode = 'Student (Imported Document)';
  }

  return parsed;
}

function cleanField(str: string): string {
  return str.replace(/\s+/g, ' ').replace(/^[:\-\s]+|[:\-\s]+$/g, '').trim();
}

function normalizeFunction(str: string): BehaviorFunction {
  const s = str.toLowerCase();
  if (s.includes('escape') || s.includes('avoid')) return 'Escape/Avoidance';
  if (s.includes('attention')) return 'Attention';
  if (s.includes('tangible') || s.includes('item') || s.includes('access')) return 'Access to Tangible';
  if (s.includes('sensory') || s.includes('automatic')) return 'Automatic/Sensory';
  return 'Multiple / Combined';
}

function normalizeIntensity(str: string): BehaviorIntensity {
  const s = str.toLowerCase();
  if (s.includes('severe') || s.includes('crisis') || s.includes('high')) return 'Severe / Crisis';
  if (s.includes('mod')) return 'Moderate';
  return 'Mild';
}

function normalizeSetting(str: string): SettingEnvironment {
  const s = str.toLowerCase();
  if (s.includes('lab') || s.includes('science')) return 'Science & Design Lab';
  if (s.includes('dining') || s.includes('cafeteria') || s.includes('lunch')) return 'Cafeteria & Dining Hall';
  if (s.includes('exam') || s.includes('assessment')) return 'Exam & Assessment Hall';
  if (s.includes('bus')) return 'School Bus & Transitions';
  if (s.includes('transit') || s.includes('hallway') || s.includes('corridor')) return 'Hallway & Locker Bay';
  if (s.includes('recess') || s.includes('play') || s.includes('field')) return 'Outdoor Recess & Sports Field';
  if (s.includes('library') || s.includes('quiet')) return 'Library & Quiet Study';
  return 'Inquiry Classroom';
}

/** Local "YYYY-MM-DD HH:MM" (toISOString would give UTC and shift the time-of-day). */
export function localTimestamp(d: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
