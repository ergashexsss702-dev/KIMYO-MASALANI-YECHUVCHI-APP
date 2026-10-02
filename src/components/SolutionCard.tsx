import React, { useState } from 'react';
import {
  Copy,
  Check,
  Printer,
  Share2,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
  HelpCircle,
  FileCheck2,
  Calculator,
  Beaker,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SolvedProblem } from '../types';
import { isFavorite, toggleFavorite } from '../utils/storage';
import { formatChemicalFormula } from '../utils/chemistry';

interface SolutionCardProps {
  solution: SolvedProblem;
  onSolveAnother?: () => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, onSolveAnother }) => {
  const [copied, setCopied] = useState(false);
  const [favSaved, setFavSaved] = useState(() => isFavorite('problems', solution.id));

  const handleCopySolution = () => {
    const textToCopy = `KIMYO 5-11 SINF - MASALA YECHIMI
MASALA: ${solution.problemText}
BERILGAN: ${solution.given.join(', ')}
TOPISH KERAK: ${solution.toFind}
${solution.reactionEquation ? `REAKSIYA: ${solution.reactionEquation}\n` : ''}
FORMULALAR: ${solution.formulasUsed.join(', ')}
YECHISH BOSQICHLARI:
${solution.solutionSteps.map((s) => `${s.stepNumber}. ${s.title}: ${s.calculation} -> ${s.resultText}`).join('\n')}
JAVOB: ${solution.finalAnswer}
TUSHUNTIRISH: ${solution.explanation}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = () => {
    const state = toggleFavorite('problems', solution.id);
    setFavSaved(state);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kimyo masalasi yechimi',
          text: `${solution.problemText}\nJavob: ${solution.finalAnswer}`,
          url: window.location.href,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      handleCopySolution();
    }
  };

  if (solution.confidence === 'unclear') {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 md:p-8 text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Masalani aniqlab bo‘lmadi
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          {solution.errorTip ||
            'Rasmni aniqroq oling yoki masalani matn ko‘rinishida kiriting. Yaxshi yorug‘likda faqat kimyo masalasini suratga oling.'}
        </p>
        {solution.imageThumbnail && (
          <div className="max-w-xs mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <img
              src={solution.imageThumbnail}
              alt="Yuklangan rasm"
              className="w-full h-auto object-cover max-h-48"
            />
          </div>
        )}
        {onSolveAnother && (
          <button
            onClick={onSolveAnother}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-sm transition-colors"
          >
            Qayta suratga olish yoki yozish
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              AI tomonidan yechim
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {solution.dateStr} {solution.grade ? `· ${solution.grade}` : ''}
            </p>
          </div>
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopySolution}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors flex items-center gap-1.5 text-xs"
            title="Nusxa olish"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
          </button>

          <button
            onClick={handleToggleFav}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="Saqlash"
          >
            {favSaved ? (
              <BookmarkCheck className="w-4 h-4 text-cyan-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="Chop etish"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="Ulashish"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Solution Cards Grid */}
      <div className="space-y-4">
        {/* Masala matni */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
            Masala sharti
          </div>
          <p className="text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed">
            {solution.problemText}
          </p>
          {solution.imageThumbnail && (
            <div className="mt-3 inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <img
                src={solution.imageThumbnail}
                alt="Masala fotosurati"
                className="max-h-48 w-auto object-contain bg-slate-950"
              />
            </div>
          )}
        </div>

        {/* Berilgan & Topish kerak (2 ustun) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-teal-500" />
              Berilgan
            </div>
            <ul className="space-y-1.5">
              {solution.given.map((item, idx) => (
                <li
                  key={idx}
                  className="font-mono text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  {formatChemicalFormula(item)}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              Topish kerak
            </div>
            <div className="font-mono text-base font-semibold text-amber-600 dark:text-amber-400">
              {formatChemicalFormula(solution.toFind)}
            </div>
          </div>
        </div>

        {/* Reaksiya tenglamasi (mavjud bo'lsa) */}
        {solution.reactionEquation && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-500/20">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5" />
              Reaksiya tenglamasi
            </div>
            <div className="font-mono text-base md:text-lg font-bold text-slate-900 dark:text-white py-1">
              {formatChemicalFormula(solution.reactionEquation)}
            </div>
          </div>
        )}

        {/* Formulalar */}
        {solution.formulasUsed.length > 0 && (
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-blue-500" />
              Qo‘llanilgan formulalar
            </div>
            <div className="flex flex-wrap gap-2">
              {solution.formulasUsed.map((form, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 font-mono text-sm text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-slate-700"
                >
                  {formatChemicalFormula(form)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Qadamma-qadam yechish */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
            Yechish bosqichlari
          </div>

          <div className="space-y-3">
            {solution.solutionSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center justify-center font-mono">
                    {step.stepNumber}
                  </span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {step.title}
                  </span>
                </div>
                <div className="ml-7 space-y-1">
                  <div className="font-mono text-sm text-cyan-700 dark:text-cyan-300 font-medium">
                    {formatChemicalFormula(step.calculation)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {step.resultText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yakuniy javob kartasi */}
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white shadow-lg shadow-cyan-500/20">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-100 mb-1">
            Yakuniy javob
          </div>
          <div className="text-2xl md:text-3xl font-extrabold font-mono tracking-wide">
            {formatChemicalFormula(solution.finalAnswer)}
          </div>
        </div>

        {/* Tushuntirish kartasi */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            O‘quvchi uchun tushuntirish va xulosa
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {solution.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
