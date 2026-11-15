import { 
  ClipboardList, 
  BookOpen, 
  Layers, 
  FileText, 
  Bookmark, 
  ShieldCheck, 
  GraduationCap, 
  HelpCircle,
  Plus,
  Edit3,
  Upload
} from 'lucide-react';
import { TherapistProfile } from '../types/behavioral';

export type ActiveTab = 'overview' | 'abc-registry' | 'cases' | 'categories' | 'codex' | 'bip';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenGlossary: (acronym?: string) => void;
  onOpenNewABC: () => void;
  onOpenWordUpload: () => void;
  profile: TherapistProfile;
  onOpenEditProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGlossary,
  onOpenNewABC,
  onOpenWordUpload,
  profile,
  onOpenEditProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Professional Credential */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center font-bold text-lg shadow-sm border border-slate-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 tracking-tight text-base sm:text-lg">
                  {profile.name}
                </span>
                {profile.credentials && (
                  <span className="text-xs text-slate-500 font-medium">
                    · {profile.credentials}
                  </span>
                )}
                <button
                  onClick={onOpenEditProfile}
                  className="p-1 text-slate-400 hover:text-teal-800 rounded transition-colors"
                  title="Edit professional title / name"
                  aria-label="Edit professional title or name"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {profile.roleTitle} · {profile.schoolName}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenGlossary()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors border border-slate-200"
              title="Search clinical ABA & IB abbreviations"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Abbreviations</span> Codex
            </button>

            <button
              onClick={onOpenWordUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors"
              title="Upload Microsoft Word (.docx) or notes to import ABC data"
            >
              <Upload className="w-3.5 h-3.5 text-teal-700" />
              <span>Import Word Doc</span>
            </button>

            <button
              onClick={onOpenNewABC}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-md transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log ABC Data</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Accessible segmented nav) */}
        <nav aria-label="Main Navigation" className="flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar border-t border-slate-100">
          <button
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Clinical Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('abc-registry')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'abc-registry'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>ABC Clinical Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'cases'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Studies &amp; FBA</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Behavioral Topographies</span>
          </button>

          <button
            onClick={() => setActiveTab('codex')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'codex'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Clinical Codex &amp; Abbreviations</span>
          </button>

          <button
            onClick={() => setActiveTab('bip')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              activeTab === 'bip'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>BIP Architect &amp; De-escalation</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
