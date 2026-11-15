import React, { useState } from 'react';
import { X, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ABCEntry, BehaviorFunction, BehaviorIntensity, IBProgramme, SettingEnvironment } from '../types/behavioral';
import { validateABCEntry } from '../utils/behavioralAnalysis';

interface AddABCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newEntry: ABCEntry) => void;
}

export const AddABCModal: React.FC<AddABCModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<Partial<ABCEntry>>({
    studentCode: '',
    programme: 'PYP',
    setting: 'Inquiry Classroom',
    settingEvents: '',
    antecedent: '',
    behavior: '',
    consequence: '',
    perceivedFunction: 'Escape/Avoidance',
    intensity: 'Mild',
    durationMinutes: 5,
    replacementBehavior: '',
    consequenceInterventionApplied: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validation = validateABCEntry(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const now = new Date();
    const formattedTimestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newRecord: ABCEntry = {
      id: `abc-${Date.now()}`,
      timestamp: formattedTimestamp,
      studentCode: formData.studentCode!.trim(),
      programme: formData.programme as IBProgramme,
      setting: formData.setting as SettingEnvironment,
      settingEvents: formData.settingEvents?.trim() || undefined,
      antecedent: formData.antecedent!.trim(),
      behavior: formData.behavior!.trim(),
      consequence: formData.consequence!.trim(),
      perceivedFunction: formData.perceivedFunction as BehaviorFunction,
      intensity: formData.intensity as BehaviorIntensity,
      durationMinutes: Number(formData.durationMinutes) || 0,
      replacementBehavior: formData.replacementBehavior?.trim() || 'Functional Communication Protocol',
      consequenceInterventionApplied: formData.consequenceInterventionApplied?.trim() || 'Differential Reinforcement and Extinction',
      notes: formData.notes?.trim() || undefined
    };

    onAdd(newRecord);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-abc-title"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 id="add-abc-title" className="text-base font-bold text-slate-900 tracking-tight">
              Log Clinical ABC Observation (Antecedent · Behaviour · Consequence)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter observable, measurable behavioral data in psychological language.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          {/* Row 1: Student Code & IB Programme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Student Pseudonym / Code *
              </label>
              <input
                type="text"
                placeholder="e.g. Student K (MYP Grade 8)"
                value={formData.studentCode}
                onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 text-xs"
              />
              {errors.studentCode && (
                <span className="text-rose-600 text-[11px] mt-1 block">{errors.studentCode}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                IB Programme *
              </label>
              <select
                value={formData.programme}
                onChange={(e) => setFormData({ ...formData, programme: e.target.value as IBProgramme })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              >
                <option value="PYP">Primary Years Programme (PYP)</option>
                <option value="MYP">Middle Years Programme (MYP)</option>
                <option value="DP">Diploma Programme (DP)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Setting Environment & Setting Events */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Setting Environment *
              </label>
              <select
                value={formData.setting}
                onChange={(e) => setFormData({ ...formData, setting: e.target.value as SettingEnvironment })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              >
                <option value="Inquiry Classroom">Inquiry Classroom</option>
                <option value="Science & Design Lab">Science &amp; Design Lab</option>
                <option value="Hallway & Locker Bay">Hallway &amp; Locker Bay</option>
                <option value="Cafeteria & Dining Hall">Cafeteria &amp; Dining Hall</option>
                <option value="Outdoor Recess & Sports Field">Outdoor Recess &amp; Sports Field</option>
                <option value="Exam & Assessment Hall">Exam &amp; Assessment Hall</option>
                <option value="Library & Quiet Study">Library &amp; Quiet Study</option>
                <option value="School Bus & Transitions">School Bus &amp; Transitions</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Setting Events / MOs (Motivating Operations)
              </label>
              <input
                type="text"
                placeholder="e.g. Skipped lunch; high sensory room noise; argument prior"
                value={formData.settingEvents}
                onChange={(e) => setFormData({ ...formData, settingEvents: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
            </div>
          </div>

          {/* The 3-Term Contingency Fields */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                A · Antecedent (Sᴰ / Immediate Environmental Trigger) *
              </label>
              <textarea
                rows={2}
                placeholder="Describe the exact stimulus, instruction, or demand that immediately preceded the behavior..."
                value={formData.antecedent}
                onChange={(e) => setFormData({ ...formData, antecedent: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
              {errors.antecedent && (
                <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.antecedent}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-amber-900 mb-1">
                B · Target Behaviour (Observable Operational Definition) *
              </label>
              <textarea
                rows={2}
                placeholder="Describe observable, measurable actions (e.g. swept 4 textbooks off table, shouted at 75dB, refused to write for 8 min)..."
                value={formData.behavior}
                onChange={(e) => setFormData({ ...formData, behavior: e.target.value })}
                className="w-full px-3 py-2 bg-amber-50/40 border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
              />
              {errors.behavior && (
                <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.behavior}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-teal-900 mb-1">
                C · Consequence (Immediate Environmental Reaction / Maintaining Reinforcer) *
              </label>
              <textarea
                rows={2}
                placeholder="What happened immediately after? (e.g. Peers laughed; adult coaxed student for 10 min; task was removed)..."
                value={formData.consequence}
                onChange={(e) => setFormData({ ...formData, consequence: e.target.value })}
                className="w-full px-3 py-2 bg-teal-50/40 border border-teal-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
              {errors.consequence && (
                <span className="text-rose-600 text-[11px] mt-0.5 block">{errors.consequence}</span>
              )}
            </div>
          </div>

          {/* Row 4: Function, Intensity, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Perceived Function (SEAT) *
              </label>
              <select
                value={formData.perceivedFunction}
                onChange={(e) => setFormData({ ...formData, perceivedFunction: e.target.value as BehaviorFunction })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              >
                <option value="Escape/Avoidance">Escape / Avoidance</option>
                <option value="Attention">Attention</option>
                <option value="Access to Tangible">Access to Tangible</option>
                <option value="Automatic/Sensory">Automatic / Sensory</option>
                <option value="Multiple / Combined">Multiple / Combined</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Intensity Tier *
              </label>
              <select
                value={formData.intensity}
                onChange={(e) => setFormData({ ...formData, intensity: e.target.value as BehaviorIntensity })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              >
                <option value="Mild">Mild (In situ tolerable)</option>
                <option value="Moderate">Moderate (Instruction disrupted)</option>
                <option value="Severe / Crisis">Severe / Crisis (Safety risk)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min="0"
                max="180"
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
            </div>
          </div>

          {/* Replacement & Applied Clinical Protocol */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block font-semibold text-teal-800 mb-1">
                Replacement Behavior / FCT (Functional Communication Training)
              </label>
              <input
                type="text"
                placeholder="e.g. Exchanging a 3-min visual break token or self-monitoring checklist"
                value={formData.replacementBehavior}
                onChange={(e) => setFormData({ ...formData, replacementBehavior: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Clinical Intervention Executed (Extinction / DRA / De-escalation)
              </label>
              <input
                type="text"
                placeholder="e.g. Demand held neutral; DRA token delivered once calm for 2 minutes"
                value={formData.consequenceInterventionApplied}
                onChange={(e) => setFormData({ ...formData, consequenceInterventionApplied: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Therapist Reflection &amp; Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Follow up with homeroom teacher regarding visual schedule fidelity"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between -mx-6 -mb-6 mt-6">
            <span className="text-[11px] text-slate-500">
              Validated against BACB &amp; IB clinical documentation standards.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Observation Log</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
