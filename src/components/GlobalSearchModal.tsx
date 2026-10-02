import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Calculator, Atom, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOPICS_DATA } from '../data/grades';
import { FORMULAS_DATA } from '../data/formulas';
import { PERIODIC_ELEMENTS } from '../data/periodicTable';
import { SAMPLE_PROBLEMS } from '../data/dailyFacts';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, extraData?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedTopics = q
    ? TOPICS_DATA.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.shortDesc.toLowerCase().includes(q) ||
          `${t.grade}-sinf`.includes(q)
      ).slice(0, 4)
    : [];

  const matchedFormulas = q
    ? FORMULAS_DATA.filter(
        (f) =>
          f.nameUz.toLowerCase().includes(q) ||
          f.formula.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedElements = q
    ? PERIODIC_ELEMENTS.filter(
        (el) =>
          el.symbol.toLowerCase() === q ||
          el.nameUz.toLowerCase().includes(q) ||
          el.nameLatin.toLowerCase().includes(q) ||
          String(el.number) === q
      ).slice(0, 4)
    : [];

  const matchedProblems = q
    ? SAMPLE_PROBLEMS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.text.toLowerCase().includes(q) ||
          p.grade.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasResults =
    matchedTopics.length > 0 ||
    matchedFormulas.length > 0 ||
    matchedElements.length > 0 ||
    matchedProblems.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mavzu, formula, element yoki masala qidirish... (Masalan: CaCO3, kislota, 8-sinf)"
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!q && (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p className="font-medium text-slate-600 dark:text-slate-300 mb-1">
                Tezkor qidiruv takliflari:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Molyar massa', 'CaCO3', 'H2SO4', '8-sinf', 'Alkanlar', 'Eritmalar'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && !hasResults && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-base font-medium text-slate-600 dark:text-slate-300">
                "{query}" bo‘yicha natija topilmadi
              </p>
              <p className="text-xs mt-1 text-slate-400">
                Imloni tekshiring yoki umumiyroq so‘z kiriting (masalan: suv, mol, gaz).
              </p>
            </div>
          )}

          {/* Topics */}
          {matchedTopics.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                Mavzular ({matchedTopics.length})
              </div>
              <div className="space-y-1.5">
                {matchedTopics.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onNavigate('curriculum', { grade: t.grade, topicId: t.id });
                      onClose();
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/10 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-cyan-500">
                        {t.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.grade}-sinf · {t.shortDesc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transform group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas */}
          {matchedFormulas.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                Formulalar ({matchedFormulas.length})
              </div>
              <div className="space-y-1.5">
                {matchedFormulas.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      onNavigate('formulas', { formulaId: f.id });
                      onClose();
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-500/10 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-500">
                        {f.nameUz}
                      </div>
                      <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                        {f.formula}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{f.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Periodic Elements */}
          {matchedElements.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-purple-500" />
                Kimyoviy Elementlar ({matchedElements.length})
              </div>
              <div className="grid grid-cols-2 gap-2">
                {matchedElements.map((el) => (
                  <div
                    key={el.number}
                    onClick={() => {
                      onNavigate('periodic-table', { element: el });
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 hover:bg-purple-500/5 cursor-pointer transition-all flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-300 font-bold flex items-center justify-center font-mono">
                      {el.symbol}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {el.nameUz}
                      </div>
                      <div className="text-xs text-slate-400">
                        №{el.number} · Ar: {el.atomicMass}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solved Problems */}
          {matchedProblems.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                Namunaviy Masalalar ({matchedProblems.length})
              </div>
              <div className="space-y-1.5">
                {matchedProblems.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onNavigate('solver', { problemText: p.text });
                      onClose();
                    }}
                    className="group p-2.5 rounded-xl hover:bg-amber-500/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-amber-500">
                        {p.title}
                      </div>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-mono">
                        {p.answer}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{p.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Qidiruv uchun so‘z yozing</span>
          <span className="flex items-center gap-1">
            Tanlash uchun bosing <CornerDownLeft className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
