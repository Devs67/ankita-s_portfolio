import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { PortfolioOverview } from './components/PortfolioOverview';
import { ABCRegistry } from './components/ABCRegistry';
import { CaseStudiesView } from './components/CaseStudiesView';
import { BehaviorCategoriesView } from './components/BehaviorCategoriesView';
import { AbbreviationsCodex } from './components/AbbreviationsCodex';
import { BIPArchitect } from './components/BIPArchitect';
import { AbbreviationDrawer } from './components/AbbreviationDrawer';
import { AddABCModal } from './components/AddABCModal';
import { PrintSummaryModal } from './components/PrintSummaryModal';
import { EditProfileModal } from './components/EditProfileModal';
import { WordDocumentUploadModal } from './components/WordDocumentUploadModal';
import { ABCEntry, CaseStudy, Abbreviation, TherapistProfile } from './types/behavioral';
import { 
  INITIAL_ABC_LOGS, 
  INITIAL_CASE_STUDIES, 
  INITIAL_ABBREVIATIONS 
} from './data/behavioralData';
import { GraduationCap, ShieldCheck, Bookmark, Heart } from 'lucide-react';

const STORAGE_KEY_ABC = 'apex_clinical_abc_logs_v1';
const STORAGE_KEY_PROFILE = 'apex_therapist_profile_v2';

const DEFAULT_PROFILE: TherapistProfile = {
  name: 'Behavioural Therapist',
  credentials: '',
  roleTitle: 'Behavioural Therapist',
  department: 'Inclusion & Student Support Services',
  schoolName: 'International Baccalaureate World School'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Therapist identity profile
  const [therapistProfile, setTherapistProfile] = useState<TherapistProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.name === 'string') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  // Load from localStorage or seed
  const [abcLogs, setAbcLogs] = useState<ABCEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ABC);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_ABC_LOGS;
  });

  const [caseStudies] = useState<CaseStudy[]>(INITIAL_CASE_STUDIES);
  const [abbreviations] = useState<Abbreviation[]>(INITIAL_ABBREVIATIONS);

  // Modals & Drawers state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [selectedAcronym, setSelectedAcronym] = useState<string | null>(null);
  const [isAddABCModalOpen, setIsAddABCModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isWordUploadOpen, setIsWordUploadOpen] = useState(false);
  const [printLogs, setPrintLogs] = useState<ABCEntry[]>(abcLogs);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(therapistProfile));
    } catch (e) {
      console.error('Failed to sync profile to localStorage', e);
    }
  }, [therapistProfile]);

  // Sync logs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ABC, JSON.stringify(abcLogs));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [abcLogs]);

  const handleOpenGlossary = (acronym?: string) => {
    setSelectedAcronym(acronym || null);
    setIsGlossaryOpen(true);
  };

  const handleAddABC = (newEntry: ABCEntry) => {
    setAbcLogs((prev) => [newEntry, ...prev]);
  };

  const handleImportLogs = (imported: ABCEntry[]) => {
    setAbcLogs((prev) => [...imported, ...prev]);
  };

  const handleOpenPrintSummary = (logsToPrint: ABCEntry[]) => {
    setPrintLogs(logsToPrint);
    setIsPrintModalOpen(true);
  };

  const handleNavigateToABCWithFilter = (_categoryOrQuery: string) => {
    setActiveTab('abc-registry');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-700 selection:text-white">
      {/* Sticky Primary Header & Nav */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGlossary={handleOpenGlossary}
        onOpenNewABC={() => setIsAddABCModalOpen(true)}
        onOpenWordUpload={() => setIsWordUploadOpen(true)}
        profile={therapistProfile}
        onOpenEditProfile={() => setIsEditProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'overview' && (
          <PortfolioOverview
            onNavigate={setActiveTab}
            onOpenGlossary={handleOpenGlossary}
            onOpenNewABC={() => setIsAddABCModalOpen(true)}
            onOpenWordUpload={() => setIsWordUploadOpen(true)}
            totalAbcCount={abcLogs.length}
            logs={abcLogs}
            profile={therapistProfile}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
          />
        )}

        {activeTab === 'abc-registry' && (
          <ABCRegistry
            logs={abcLogs}
            onOpenNewABC={() => setIsAddABCModalOpen(true)}
            onOpenWordUpload={() => setIsWordUploadOpen(true)}
            onOpenGlossary={handleOpenGlossary}
            onOpenPrintSummary={handleOpenPrintSummary}
          />
        )}

        {activeTab === 'cases' && (
          <CaseStudiesView
            caseStudies={caseStudies}
            onOpenGlossary={handleOpenGlossary}
            onSelectCategory={handleNavigateToABCWithFilter}
          />
        )}

        {activeTab === 'categories' && (
          <BehaviorCategoriesView
            onNavigateToABCWithFilter={handleNavigateToABCWithFilter}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'codex' && (
          <AbbreviationsCodex
            abbreviations={abbreviations}
          />
        )}

        {activeTab === 'bip' && (
          <BIPArchitect
            onOpenGlossary={handleOpenGlossary}
            profile={therapistProfile}
          />
        )}
      </main>

      {/* Quick Access Abbreviation Drawer */}
      <AbbreviationDrawer
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        abbreviations={abbreviations}
        selectedAcronym={selectedAcronym}
      />

      {/* Add New ABC Observation Modal */}
      <AddABCModal
        isOpen={isAddABCModalOpen}
        onClose={() => setIsAddABCModalOpen(false)}
        onAdd={handleAddABC}
      />

      {/* Word / Text Document Import Modal */}
      <WordDocumentUploadModal
        isOpen={isWordUploadOpen}
        onClose={() => setIsWordUploadOpen(false)}
        onImportLogs={handleImportLogs}
      />

      {/* Print Clinical MDT Summary Modal */}
      <PrintSummaryModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        logs={printLogs}
        profile={therapistProfile}
      />

      {/* Edit Profile & Credentials Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={therapistProfile}
        onSave={setTherapistProfile}
      />

      {/* Clean Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">
                {therapistProfile.name}{therapistProfile.credentials ? ` · ${therapistProfile.credentials}` : ''}
              </span>
              <span aria-hidden="true">·</span>
              <span>{therapistProfile.roleTitle} · {therapistProfile.schoolName}</span>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-teal-700 hover:underline ml-1"
              >
                (Edit)
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpenGlossary('ABC')}
                className="hover:text-slate-800 transition-colors"
              >
                ABC Matrix
              </button>
              <button
                onClick={() => handleOpenGlossary('FBA')}
                className="hover:text-slate-800 transition-colors"
              >
                FBA Protocols
              </button>
              <button
                onClick={() => handleOpenGlossary('BIP')}
                className="hover:text-slate-800 transition-colors"
              >
                BIP Standards
              </button>
              <button
                onClick={() => handleOpenGlossary('ATL')}
                className="hover:text-slate-800 transition-colors"
              >
                IB ATL Skills
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              Adheres strictly to the BACB Ethics Code for Behavior Analysts &amp; International Baccalaureate Inclusive Education Guidelines. All student profiles de-identified.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Clinical Behavioral Consultation Portfolio.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
