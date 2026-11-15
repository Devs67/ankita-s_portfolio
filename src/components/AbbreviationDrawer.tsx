import React, { useState, useEffect } from 'react';
import { X, Search, Bookmark, ExternalLink } from 'lucide-react';
import { Abbreviation } from '../types/behavioral';
import { searchAbbreviations } from '../utils/behavioralAnalysis';

interface AbbreviationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  abbreviations: Abbreviation[];
  selectedAcronym?: string | null;
  onSelectAcronym?: (acronym: string) => void;
}

export const AbbreviationDrawer: React.FC<AbbreviationDrawerProps> = ({
  isOpen,
  onClose,
  abbreviations,
  selectedAcronym
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('all');

  useEffect(() => {
    if (selectedAcronym) {
      setSearchQuery(selectedAcronym);
    }
  }, [selectedAcronym]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = searchAbbreviations(abbreviations, searchQuery, domainFilter);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-teal-800" />
                <h2 id="drawer-title" className="text-base font-semibold text-slate-900 tracking-tight">
                  Clinical &amp; IB Abbreviations Codex
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Close abbreviations panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Quick psychological reference for ABA, FBA, and IB school nomenclature.
            </p>

            {/* Search Input */}
            <div className="mt-3 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search acronym (e.g. ABC, FCT, ATL, DRA, SEAT)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
              />
            </div>

            {/* Domain Filter Pills (Functional Buttons) */}
            <div className="mt-2.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
              {['all', 'ABA Clinical', 'IB Education', 'Multidisciplinary & SEN'].map((domain) => (
                <button
                  key={domain}
                  onClick={() => setDomainFilter(domain)}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    domainFilter === domain
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {domain === 'all' ? 'All Domains' : domain}
                </button>
              ))}
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No abbreviations matched &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filtered.map((item) => (
                <article
                  key={item.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm tracking-tight">
                          {item.acronym}
                        </span>
                        <span className="text-slate-400" aria-hidden="true">·</span>
                        <span className="text-xs font-medium text-teal-800">
                          {item.domain}
                        </span>
                      </div>
                      <h3 className="text-xs font-semibold text-slate-700 mt-0.5">
                        {item.fullName}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.definition}
                  </p>

                  <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                    <div>
                      <span className="font-medium text-slate-800">Clinical Application: </span>
                      <span className="text-slate-600">{item.clinicalApplication}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-200 text-slate-600 italic">
                      <span className="font-medium not-italic text-slate-700">School Context: </span>
                      &ldquo;{item.exampleInSchool}&rdquo;
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500">
            Standardized per BACB Ethics Code &amp; International Baccalaureate Standards.
          </div>
        </div>
      </div>
    </div>
  );
};
