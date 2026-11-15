import {
  ABCEntry,
  ABCFilterState,
  Abbreviation,
  BehaviorFunction,
  BehaviorIntensity,
  IBProgramme,
  SettingEnvironment
} from '../types/behavioral';

export interface FunctionCount {
  functionName: BehaviorFunction;
  count: number;
  percentage: number;
}

export function calculateFunctionDistribution(logs: ABCEntry[]): FunctionCount[] {
  const allFunctions: BehaviorFunction[] = [
    'Escape/Avoidance',
    'Attention',
    'Access to Tangible',
    'Automatic/Sensory',
    'Multiple / Combined'
  ];

  const total = logs.length;
  if (total === 0) {
    return allFunctions.map(fn => ({ functionName: fn, count: 0, percentage: 0 }));
  }

  const counts: Record<BehaviorFunction, number> = {
    'Escape/Avoidance': 0,
    'Attention': 0,
    'Access to Tangible': 0,
    'Automatic/Sensory': 0,
    'Multiple / Combined': 0
  };

  logs.forEach(log => {
    if (counts[log.perceivedFunction] !== undefined) {
      counts[log.perceivedFunction]++;
    } else {
      counts['Multiple / Combined']++;
    }
  });

  return allFunctions.map(fn => ({
    functionName: fn,
    count: counts[fn],
    percentage: Math.round((counts[fn] / total) * 100)
  }));
}

export function calculateIntensityBreakdown(logs: ABCEntry[]): Record<BehaviorIntensity, number> {
  const breakdown: Record<BehaviorIntensity, number> = {
    Mild: 0,
    Moderate: 0,
    'Severe / Crisis': 0
  };

  logs.forEach(log => {
    if (breakdown[log.intensity] !== undefined) {
      breakdown[log.intensity]++;
    }
  });

  return breakdown;
}

export function calculateProgrammeBreakdown(logs: ABCEntry[]): Record<IBProgramme, number> {
  const breakdown: Record<IBProgramme, number> = {
    PYP: 0,
    MYP: 0,
    DP: 0
  };

  logs.forEach(log => {
    if (breakdown[log.programme] !== undefined) {
      breakdown[log.programme]++;
    }
  });

  return breakdown;
}

export function calculateOutcomeReduction(baseline: number, current: number): number {
  if (baseline <= 0) return 0;
  if (current <= 0) return 100;
  if (current >= baseline) return 0;
  const reduction = ((baseline - current) / baseline) * 100;
  return Math.round(reduction * 10) / 10;
}

export function filterABCLogs(logs: ABCEntry[], filter: ABCFilterState): ABCEntry[] {
  const query = (filter.searchQuery || '').trim().toLowerCase();

  return logs.filter(log => {
    // Programme filter
    if (filter.programme !== 'all' && log.programme !== filter.programme) {
      return false;
    }

    // Function filter
    if (filter.functionType !== 'all' && log.perceivedFunction !== filter.functionType) {
      return false;
    }

    // Intensity filter
    if (filter.intensity !== 'all' && log.intensity !== filter.intensity) {
      return false;
    }

    // Setting filter
    if (filter.setting !== 'all' && log.setting !== filter.setting) {
      return false;
    }

    // Search query matches student, antecedent, behavior, consequence, notes, or setting
    if (query) {
      const haystack = [
        log.studentCode,
        log.antecedent,
        log.behavior,
        log.consequence,
        log.replacementBehavior,
        log.setting,
        log.settingEvents || '',
        log.notes || ''
      ].join(' ').toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function searchAbbreviations(
  abbreviations: Abbreviation[],
  query: string,
  domainFilter: string = 'all'
): Abbreviation[] {
  const q = (query || '').trim().toLowerCase();

  return abbreviations.filter(abbr => {
    if (domainFilter !== 'all' && abbr.domain !== domainFilter) {
      return false;
    }

    if (!q) return true;

    return (
      abbr.acronym.toLowerCase().includes(q) ||
      abbr.fullName.toLowerCase().includes(q) ||
      abbr.definition.toLowerCase().includes(q) ||
      abbr.clinicalApplication.toLowerCase().includes(q)
    );
  });
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateABCEntry(entry: Partial<ABCEntry>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!entry.studentCode?.trim()) {
    errors.studentCode = 'Student pseudonym or code is required (for privacy compliance).';
  }

  if (!entry.programme) {
    errors.programme = 'IB Programme (PYP, MYP, or DP) must be selected.';
  }

  if (!entry.setting) {
    errors.setting = 'Environment / Setting is required.';
  }

  if (!entry.antecedent?.trim() || entry.antecedent.trim().length < 5) {
    errors.antecedent = 'Antecedent stimulus / trigger must be described specifically (min 5 characters).';
  }

  if (!entry.behavior?.trim() || entry.behavior.trim().length < 5) {
    errors.behavior = 'Target behavior requires an observable, measurable operational definition.';
  }

  if (!entry.consequence?.trim() || entry.consequence.trim().length < 5) {
    errors.consequence = 'Immediate environmental consequence / reaction must be noted.';
  }

  if (!entry.perceivedFunction) {
    errors.perceivedFunction = 'Perceived function of behavior must be identified.';
  }

  if (!entry.intensity) {
    errors.intensity = 'Intensity tier must be categorized.';
  }

  if (entry.durationMinutes === undefined || entry.durationMinutes === null || entry.durationMinutes < 0) {
    errors.durationMinutes = 'Duration must be 0 minutes or greater.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export interface TimelineDataPoint {
  date: string;
  fullDate: string;
  total: number;
  escape: number;
  attention: number;
  tangible: number;
  sensory: number;
  mild: number;
  moderate: number;
  crisis: number;
  pyp: number;
  myp: number;
  dp: number;
}

export function generateTimelineTrendData(logs: ABCEntry[]): TimelineDataPoint[] {
  if (logs.length === 0) return [];

  // Group by date YYYY-MM-DD
  const dateMap: Record<string, {
    escape: number;
    attention: number;
    tangible: number;
    sensory: number;
    mild: number;
    moderate: number;
    crisis: number;
    pyp: number;
    myp: number;
    dp: number;
    total: number;
  }> = {};

  logs.forEach(log => {
    // timestamp format is e.g. "2026-10-14 09:15" or ISO
    const dateStr = log.timestamp.split(' ')[0] || log.timestamp.split('T')[0];
    if (!dateMap[dateStr]) {
      dateMap[dateStr] = {
        escape: 0,
        attention: 0,
        tangible: 0,
        sensory: 0,
        mild: 0,
        moderate: 0,
        crisis: 0,
        pyp: 0,
        myp: 0,
        dp: 0,
        total: 0
      };
    }

    dateMap[dateStr].total++;

    if (log.perceivedFunction === 'Escape/Avoidance') dateMap[dateStr].escape++;
    else if (log.perceivedFunction === 'Attention') dateMap[dateStr].attention++;
    else if (log.perceivedFunction === 'Access to Tangible') dateMap[dateStr].tangible++;
    else if (log.perceivedFunction === 'Automatic/Sensory') dateMap[dateStr].sensory++;

    if (log.intensity === 'Mild') dateMap[dateStr].mild++;
    else if (log.intensity === 'Moderate') dateMap[dateStr].moderate++;
    else if (log.intensity === 'Severe / Crisis') dateMap[dateStr].crisis++;

    if (log.programme === 'PYP') dateMap[dateStr].pyp++;
    else if (log.programme === 'MYP') dateMap[dateStr].myp++;
    else if (log.programme === 'DP') dateMap[dateStr].dp++;
  });

  // Sort dates chronologically
  const sortedDates = Object.keys(dateMap).sort();

  return sortedDates.map(dateKey => {
    // Format human-friendly label like "Oct 14"
    const parts = dateKey.split('-');
    let formattedDate = dateKey;
    if (parts.length === 3) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (monthIndex >= 0 && monthIndex < 12) {
        formattedDate = `${monthNames[monthIndex]} ${day}`;
      }
    }

    const item = dateMap[dateKey];
    return {
      date: formattedDate,
      fullDate: dateKey,
      ...item
    };
  });
}

export interface TimeOfDaySlot {
  slot: string;
  timeRange: string;
  count: number;
  percentage: number;
}

export function generateTimeOfDayDistribution(logs: ABCEntry[]): TimeOfDaySlot[] {
  const slots: TimeOfDaySlot[] = [
    { slot: 'Morning Arrival & Transitions', timeRange: '08:00 - 09:30', count: 0, percentage: 0 },
    { slot: 'Inquiry & Academic Sprints', timeRange: '09:30 - 11:30', count: 0, percentage: 0 },
    { slot: 'Midday Dining & Recess', timeRange: '11:30 - 13:00', count: 0, percentage: 0 },
    { slot: 'Afternoon Labs & Assessments', timeRange: '13:00 - 14:30', count: 0, percentage: 0 },
    { slot: 'Dismissal & Departure', timeRange: '14:30 - 16:00', count: 0, percentage: 0 }
  ];

  if (logs.length === 0) return slots;

  logs.forEach(log => {
    const timePart = log.timestamp.split(' ')[1] || log.timestamp.split('T')[1];
    if (timePart) {
      const [hourStr, minStr] = timePart.split(':');
      const hour = parseInt(hourStr, 10);
      const min = parseInt(minStr || '0', 10);
      const totalMinutes = hour * 60 + min;

      if (totalMinutes < 9 * 60 + 30) {
        slots[0].count++;
      } else if (totalMinutes < 11 * 60 + 30) {
        slots[1].count++;
      } else if (totalMinutes < 13 * 60) {
        slots[2].count++;
      } else if (totalMinutes < 14 * 60 + 30) {
        slots[3].count++;
      } else {
        slots[4].count++;
      }
    } else {
      slots[1].count++;
    }
  });

  const total = logs.length;
  slots.forEach(slot => {
    slot.percentage = Math.round((slot.count / total) * 100);
  });

  return slots;
}

