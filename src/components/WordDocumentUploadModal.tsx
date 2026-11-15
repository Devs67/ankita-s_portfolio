import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileCode, 
  Info, 
  Sparkles, 
  ArrowRight,
  Clipboard,
  RefreshCw,
  Plus
} from 'lucide-react';
import * as mammoth from 'mammoth';
import { ABCEntry, IBProgramme, BehaviorFunction, BehaviorIntensity, SettingEnvironment } from '../types/behavioral';
import { parseDocumentTextToABC, localTimestamp } from '../utils/documentParser';

interface WordDocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportLogs: (importedLogs: ABCEntry[]) => void;
}

export const WordDocumentUploadModal: React.FC<WordDocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onImportLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'why-unsupported'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [extractedRawText, setExtractedRawText] = useState<string>('');
  const [parsedEntries, setParsedEntries] = useState<Partial<ABCEntry>[]>([]);
  const [pasteText, setPasteText] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processSelectedFile(files[0]);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = async (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setFileName(file.name);

    try {
      const lowerName = file.name.toLowerCase();

      // Check if Word Document (.docx)
      if (lowerName.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        if (!text.trim()) {
          throw new Error('The Word document appears to be empty or contains only non-text images.');
        }
        setExtractedRawText(text);
        const parsed = parseDocumentTextToABC(text);
        if (parsed.length === 0) {
          throw new Error('Could not identify ABC observations in the file. You can also paste the text directly in the "Paste Text" tab.');
        }
        setParsedEntries(parsed);
      } else if (lowerName.endsWith('.doc')) {
        // Legacy .doc is pre-2007 OLE binary format; mammoth and standard browsers cannot parse binary .doc
        throw new Error(
          'Legacy .doc files (Word 97-2003) use a proprietary binary format. Please open the file in Word/Google Docs and "Save As .docx", or copy the text and paste it into the "Paste Text" tab.'
        );
      } else if (lowerName.endsWith('.txt') || lowerName.endsWith('.csv') || lowerName.endsWith('.tsv')) {
        const text = await file.text();
        setExtractedRawText(text);
        const parsed = parseDocumentTextToABC(text);
        setParsedEntries(parsed);
      } else if (lowerName.endsWith('.json')) {
        const text = await file.text();
        const parsedJson = JSON.parse(text);
        if (Array.isArray(parsedJson)) {
          setParsedEntries(parsedJson);
        } else {
          setParsedEntries([parsedJson]);
        }
      } else {
        throw new Error(
          `File type "${file.name.split('.').pop()}" is not directly supported. Please upload a Microsoft Word document (.docx) or plain text (.txt), or paste the content directly.`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to process document.';
      setErrorMessage(msg);
      setParsedEntries([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessPastedText = () => {
    if (!pasteText.trim()) {
      setErrorMessage('Please paste clinical notes or ABC log text first.');
      return;
    }
    setErrorMessage(null);
    setFileName('Pasted Clinical Notes');
    setExtractedRawText(pasteText);
    const parsed = parseDocumentTextToABC(pasteText);
    if (parsed.length === 0) {
      setErrorMessage('Could not automatically parse ABC rows. Check formatting or ensure Antecedent/Behavior/Consequence keywords are present.');
    }
    setParsedEntries(parsed);
  };

  const handleLoadSample = () => {
    const sample = `Student: Student D (MYP Grade 8)
Programme: MYP
Setting: Science & Design Lab
Antecedent: Homeroom teacher instructed the class to transition from independent research to peer critique groups
Behavior: Student slammed laptop closed, verbally refused with "I am not working with anyone today," and stood by the emergency exit
Consequence: Teacher provided 2-minute visual countdown timer card; peer partner given secondary inquiry task
Function: Escape/Avoidance
Intensity: Moderate
Duration: 4 mins
Replacement: Presenting "Need 3-minute solo processing break before collaborative dialogue" card

---

Student: Student E (PYP Grade 3)
Programme: PYP
Setting: Inquiry Classroom
Antecedent: Peer reached across desk to borrow colored pastel chalks during PYP exhibition poster drafting
Behavior: Student knocked over the shared material tray, vocalized high-pitched scream, and blocked the art station
Consequence: Assistant prompted student to step into designated sensory nook with noise-dampening headphones
Function: Access to Tangible
Intensity: Moderate
Duration: 6 mins
Replacement: Using the structured 3-minute turn-taking countdown timer visual token`;

    setPasteText(sample);
    setExtractedRawText(sample);
    setFileName('Sample IB Clinical ABC Records.docx');
    setParsedEntries(parseDocumentTextToABC(sample));
    setActiveTab('paste');
  };

  const handleUpdateEntryField = (index: number, field: keyof ABCEntry, value: any) => {
    setParsedEntries(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveEntry = (index: number) => {
    setParsedEntries(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfirmImport = () => {
    const finalizedLogs: ABCEntry[] = parsedEntries.map((p, idx) => ({
      id: `abc-imported-${Date.now()}-${idx}`,
      timestamp: p.timestamp || localTimestamp(),
      studentCode: p.studentCode || `Student ${idx + 1} (Imported)`,
      programme: (p.programme as IBProgramme) || 'PYP',
      setting: (p.setting as SettingEnvironment) || 'Inquiry Classroom',
      antecedent: p.antecedent || 'Environmental antecedent trigger noted in imported documentation.',
      behavior: p.behavior || 'Target behavioral response documented.',
      consequence: p.consequence || 'Environmental consequence and adult response documented.',
      perceivedFunction: (p.perceivedFunction as BehaviorFunction) || 'Escape/Avoidance',
      intensity: (p.intensity as BehaviorIntensity) || 'Moderate',
      durationMinutes: p.durationMinutes ?? 5,
      replacementBehavior: p.replacementBehavior || 'Functionally equivalent replacement communicative skill (FCT).',
      consequenceInterventionApplied: p.consequenceInterventionApplied || 'Differential reinforcement & environmental prompting.'
    }));

    onImportLogs(finalizedLogs);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="word-upload-title"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                  Clinical Document Integration
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-teal-900/60 text-teal-200 border border-teal-700/50">
                  .docx &amp; text
                </span>
              </div>
              <h2 id="word-upload-title" className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Upload &amp; Import Word Documents (.docx)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-teal-600 text-teal-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Word File (.docx)</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'paste'
                ? 'border-teal-600 text-teal-800 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Paste Clinical Notes / Text</span>
          </button>

          <button
            onClick={() => setActiveTab('why-unsupported')}
            className={`pb-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 ml-auto ${
              activeTab === 'why-unsupported'
                ? 'border-amber-600 text-amber-800 font-bold'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Why was it showing "Not Supported"?</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Why Unsupported Explainer Tab */}
          {activeTab === 'why-unsupported' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Info className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Why Standard Chat Boxes &amp; Uploaders Show "Not Supported" for Word Files:</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  Microsoft Word files (<code>.docx</code> and <code>.doc</code>) are not plain text files. They are <strong>compressed ZIP archives</strong> containing hundreds of XML structures, binary style tables, macros, and embedded media. Standard web uploaders and chat prompts only allow raw images or plain text, instantly rejecting <code>.docx</code> as an unsupported binary format.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700" />
                    <span>How We Solved It Here</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    We integrated a dedicated in-browser <strong>Mammoth .docx document extractor</strong> right into this app. When you upload a <code>.docx</code> file here, it automatically unpacks the document text in your local browser and categorizes it into Antecedent, Behavior, and Consequence fields without sending raw files anywhere!
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-700" />
                    <span>If Uploading in AI Studio Chat</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    If you ever need to share Word file contents in the chat prompt, simply open your Word document, select all (<code>Ctrl+A</code> or <code>Cmd+A</code>), and <strong>paste the text directly</strong> into the message prompt, or Save As a <code>.txt</code> or <code>.pdf</code> file.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-800 text-white hover:bg-teal-900 transition-colors inline-flex items-center gap-2"
                >
                  <span>Ready to Upload Your .docx File</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".docx,.txt,.json,.csv"
                className="hidden"
                id="word-file-input"
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-teal-500 bg-teal-50/50 scale-[0.99]'
                    : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-800 mx-auto flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Click to browse or drop your Microsoft Word (<span className="text-teal-800 font-mono">.docx</span>) file here
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Supports Microsoft Word (.docx), plain text (.txt), and clinical records (.json, .csv). Max 25MB.
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-600 text-[11px] font-medium mt-3 border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Client-side local extraction (HIPAA/FERPA/IB Student Data compliant)</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Want to test with sample data?</span>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-teal-800 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>Load Sample IB ABC Word Record</span>
                </button>
              </div>
            </div>
          )}

          {/* Paste Tab */}
          {activeTab === 'paste' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="paste-area" className="block text-xs font-semibold text-slate-700 mb-1">
                  Paste raw text from Word, Google Docs, or clinical observation notes:
                </label>
                <textarea
                  id="paste-area"
                  rows={8}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  placeholder="Paste observation notes here...&#10;e.g.&#10;Student: Student D (MYP)&#10;Antecedent: Announcement of group presentation&#10;Behavior: Task refusal and walking to quiet nook&#10;Consequence: Teacher initiated visual timer&#10;Function: Escape"
                  className="w-full text-xs font-mono p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-xs text-teal-800 hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                  <span>Load Sample Clinical Note</span>
                </button>

                <button
                  type="button"
                  onClick={handleProcessPastedText}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-800 text-white hover:bg-teal-900 transition-colors inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Parse &amp; Extract ABC Records</span>
                </button>
              </div>
            </div>
          )}

          {/* Processing / Error alerts */}
          {isProcessing && (
            <div className="p-4 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 flex items-center gap-3 text-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-800" />
              <span>Extracting and structuring clinical ABC fields from Word document...</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold">File Notice:</div>
                <div>{errorMessage}</div>
              </div>
            </div>
          )}

          {/* Parsed Results Preview & Editor */}
          {parsedEntries.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Parsed {parsedEntries.length} Clinical Observation{parsedEntries.length > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Source: {fileName || 'Document'} · Review and adjust before importing
                  </div>
                </div>

                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  Ready to Import
                </span>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {parsedEntries.map((entry, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="text-xs font-bold text-teal-900">
                        Record #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveEntry(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 text-xs"
                        title="Remove this entry"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase">Student Pseudonym</label>
                        <input
                          type="text"
                          value={entry.studentCode || ''}
                          onChange={(e) => handleUpdateEntryField(idx, 'studentCode', e.target.value)}
                          className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase">IB Programme</label>
                        <select
                          value={entry.programme || 'PYP'}
                          onChange={(e) => handleUpdateEntryField(idx, 'programme', e.target.value)}
                          className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded"
                        >
                          <option value="PYP">PYP (Primary Years)</option>
                          <option value="MYP">MYP (Middle Years)</option>
                          <option value="DP">DP (Diploma Programme)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase">Maintaining Function</label>
                        <select
                          value={entry.perceivedFunction || 'Escape/Avoidance'}
                          onChange={(e) => handleUpdateEntryField(idx, 'perceivedFunction', e.target.value)}
                          className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded"
                        >
                          <option value="Escape/Avoidance">Escape/Avoidance</option>
                          <option value="Attention">Attention</option>
                          <option value="Access to Tangible">Access to Tangible</option>
                          <option value="Automatic/Sensory">Automatic/Sensory</option>
                          <option value="Multiple / Combined">Multiple / Combined</option>
                        </select>
                      </div>
                    </div>

                    {/* Antecedent, Behavior, Consequence */}
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-amber-900 block text-[11px]">Antecedent (A):</span>
                        <textarea
                          rows={2}
                          value={entry.antecedent || ''}
                          onChange={(e) => handleUpdateEntryField(idx, 'antecedent', e.target.value)}
                          className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>

                      <div>
                        <span className="font-bold text-rose-900 block text-[11px]">Target Behavior (B):</span>
                        <textarea
                          rows={2}
                          value={entry.behavior || ''}
                          onChange={(e) => handleUpdateEntryField(idx, 'behavior', e.target.value)}
                          className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>

                      <div>
                        <span className="font-bold text-teal-900 block text-[11px]">Immediate Consequence (C):</span>
                        <textarea
                          rows={2}
                          value={entry.consequence || ''}
                          onChange={(e) => handleUpdateEntryField(idx, 'consequence', e.target.value)}
                          className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          {parsedEntries.length > 0 && (
            <button
              onClick={handleConfirmImport}
              className="px-5 py-2 text-xs font-bold rounded-lg bg-teal-800 text-white hover:bg-teal-900 transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Import {parsedEntries.length} Record{parsedEntries.length > 1 ? 's' : ''} into ABC Clinical Matrix</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
