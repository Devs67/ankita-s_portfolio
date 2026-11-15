import React, { useState } from 'react';
import { X, UserCheck, Shield } from 'lucide-react';
import { TherapistProfile } from '../types/behavioral';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: TherapistProfile;
  onSave: (updated: TherapistProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<TherapistProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name.trim() || 'Behavioural Therapist',
      credentials: formData.credentials?.trim() || '',
      roleTitle: formData.roleTitle.trim() || 'Behavioural Therapist & Inclusion Specialist',
      department: formData.department.trim() || 'Inclusion & Student Support Services',
      schoolName: formData.schoolName.trim() || 'International Baccalaureate World School'
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-teal-800" />
            <h2 id="edit-profile-title" className="text-base font-bold text-slate-900 tracking-tight">
              Edit Professional Identity &amp; Title
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close profile editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <p className="text-slate-500 text-xs">
            Customize your professional name, title, and credentials across all site views, case studies, BIP documents, and printable clinical reports.
          </p>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Professional Name / Display Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Behavioural Therapist or your preferred name"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Qualifications &amp; Credentials (Optional)
            </label>
            <input
              type="text"
              value={formData.credentials || ''}
              onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
              placeholder="e.g. M.Sc., RBT, ABA Specialist, or leave blank"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Leave blank if you prefer no credentials displayed next to your name.
            </span>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Role &amp; Primary Title *
            </label>
            <input
              type="text"
              value={formData.roleTitle}
              onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
              placeholder="e.g. IB World School Behavioural Consultant"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              School or Institution Affiliation
            </label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="e.g. International Baccalaureate World School"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="e.g. Inclusion & Student Support Services"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 text-xs"
            />
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between -mx-6 -mb-6 mt-6">
            <span className="text-[11px] text-slate-500">
              Persists automatically to your browser storage.
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
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors shadow-sm"
              >
                Save Identity
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
