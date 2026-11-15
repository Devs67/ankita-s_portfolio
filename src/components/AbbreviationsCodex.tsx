import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Filter, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Layers,
  RotateCcw
} from 'lucide-react';
import { Abbreviation } from '../types/behavioral';
import { searchAbbreviations } from '../utils/behavioralAnalysis';

interface AbbreviationsCodexProps {
  abbreviations: Abbreviation[];
}

export const AbbreviationsCodex: React.FC<AbbreviationsCodexProps> = ({
  abbreviations
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const filtered = searchAbbreviations(abbreviations, searchQuery, selectedDomain);

  const domains = ['all', 'ABA Clinical', 'IB Education', 'Multidisciplinary & SEN'];

  const currentQuizItem = abbreviations[quizIndex % abbreviations.length];

  const handleNextQuiz = () => {
    setShowAnswer(false);
    setQuizIndex((prev) => (prev + 1) % abbreviations.length);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
            <span>Standardized Nomenclature</span>
            <span aria-hidden="true">·</span>
            <span>Applied Behavior Analysis &amp; International Baccalaureate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Clinical Abbreviations &amp; Psychological Codex
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            A comprehensive reference dictionary translating clinical behavioral terminology (BACB standards) and IB pedagogical frameworks into concrete classroom applications.
          </p>
        </div>

        <button
          onClick={() => {
            setQuizMode(!quizMode);
            setShowAnswer(false);
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
            quizMode 
              ? 'bg-teal-800 text-white hover:bg-teal-900' 
              : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{quizMode ? 'Exit LSA Training Quiz' : 'LSA Training Quiz Mode'}</span>
        </button>
      </div>

      {/* Interactive Quiz / Flashcard Mode for Teacher & LSA Professional Development */}
      {quizMode && currentQuizItem && (
        <section aria-labelledby="quiz-section-title" className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-teal-300">
            <span id="quiz-section-title" className="font-bold uppercase tracking-wider">
              Staff Training Flashcard · Card {quizIndex + 1} of {abbreviations.length}
            </span>
            <span>Domain: {currentQuizItem.domain}</span>
          </div>

          <div className="text-center py-6 space-y-3">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Identify the Term &amp; Clinical Application
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-wider">
              {currentQuizItem.acronym}
            </div>

            {showAnswer ? (
              <div className="pt-4 max-w-xl mx-auto space-y-3 text-left bg-slate-800/90 p-5 rounded-xl border border-slate-700">
                <div>
                  <span className="text-xs text-teal-400 font-bold block uppercase">Full Name</span>
                  <span className="text-base font-bold text-white">{currentQuizItem.fullName}</span>
                </div>
                <div>
                  <span className="text-xs text-teal-400 font-bold block uppercase">Psychological Definition</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentQuizItem.definition}</p>
                </div>
                <div>
                  <span className="text-xs text-teal-400 font-bold block uppercase">IB School Classroom Application</span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">{currentQuizItem.clinicalApplication}</p>
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shadow-md"
                >
                  Reveal Definition &amp; Application
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => {
                setShowAnswer(false);
                setQuizIndex((prev) => (prev - 1 + abbreviations.length) % abbreviations.length);
              }}
              className="text-slate-400 hover:text-white"
            >
              ← Previous Card
            </button>
            <button
              onClick={handleNextQuiz}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold"
            >
              <span>Next Card</span> →
            </button>
          </div>
        </section>
      )}

      {/* Search and Domain Filter Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search abbreviations, acronyms, or clinical concepts (e.g. ABC, FBA, DRA, ATL, SEAT)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>

        {/* Domain Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedDomain === domain
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {domain === 'all' ? 'All Domains' : domain}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-500 hidden sm:inline">
            {filtered.length} terms cataloged
          </span>
        </div>
      </div>

      {/* Grid of Abbreviations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                      {item.acronym}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">·</span>
                    <span className="text-xs font-semibold text-teal-800">
                      {item.domain}
                    </span>
                  </div>
                  <h2 className="text-xs font-semibold text-slate-700 mt-0.5">
                    {item.fullName}
                  </h2>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.definition}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-800 block text-[11px] mb-0.5">
                  Clinical Application in School:
                </span>
                <span className="text-slate-600 leading-relaxed">{item.clinicalApplication}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-200/60 text-slate-700">
                <span className="font-bold text-teal-900 block text-[11px] mb-0.5">
                  Real-World Example in Classroom:
                </span>
                <span className="italic text-slate-700">&ldquo;{item.exampleInSchool}&rdquo;</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
