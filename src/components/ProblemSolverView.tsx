import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Lightbulb,
  Send,
  BookOpen,
} from 'lucide-react';
import { solveChemistryProblem } from '../services/aiSolver';
import { SolvedProblem } from '../types';
import { saveProblemToHistory } from '../utils/storage';
import { SolutionCard } from './SolutionCard';
import { SAMPLE_PROBLEMS } from '../data/dailyFacts';

interface ProblemSolverViewProps {
  initialProblemText?: string;
}

export const ProblemSolverView: React.FC<ProblemSolverViewProps> = ({
  initialProblemText = '',
}) => {
  const [problemText, setProblemText] = useState(initialProblemText);
  const [selectedGrade, setSelectedGrade] = useState('8-sinf');
  const [isLoading, setIsLoading] = useState(false);
  const [solution, setSolution] = useState<SolvedProblem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSolve = async (customText?: string) => {
    const textToSolve = (customText !== undefined ? customText : problemText).trim();
    if (!textToSolve) {
      setErrorMessage('Iltimos, avval masala matnini kiriting.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const result = await solveChemistryProblem({
        problemText: textToSolve,
        grade: selectedGrade,
      });

      setSolution(result);
      if (result.confidence !== 'unclear') {
        saveProblemToHistory(result);
      }
    } catch (err: any) {
      setErrorMessage(
        'Masalani yechishda xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring yoki formulalarni to‘g‘rilang.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sampleText: string) => {
    setProblemText(sampleText);
    setSolution(null);
    handleSolve(sampleText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interaktiv Kimyo Masalasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Masala yechish
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Masalani yozing — tizim berilganlar, formulalar va hisoblashlarni bosqichma-bosqich o‘zbek tilida tushuntirib beradi.
        </p>
      </div>

      {/* Grade Selector */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-medium">Sinf:</span>
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          {['5-sinf', '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedGrade === g
                  ? 'bg-cyan-500 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Masala shartini kiriting
        </label>

        <div className="relative">
          <textarea
            rows={4}
            value={problemText}
            onChange={(e) => {
              setProblemText(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Masalan: 10 g CaCO3 parchalanganda necha g CO2 hosil bo‘ladi? Yoki 50 g suvda 10 g tuz eritilganda foiz konsentratsiyasi qancha?"
            className="w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y"
          />
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Formulalarni H2O, CaCO3, CO2 kabi oddiy yozsangiz ham bo‘ladi</span>
          </div>

          <button
            onClick={() => handleSolve()}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-bold text-sm shadow-md shadow-cyan-500/20 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Yechilmoqda...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Yechimni ko‘rish
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggested Quick Sample Problems */}
      {!solution && !isLoading && (
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
            Namunaviy masalalarni sinab ko‘ring:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SAMPLE_PROBLEMS.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSelectSample(s.text)}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {s.title}
                    </span>
                    <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                      {s.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {s.text}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                  <span>Yechish</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Solved Result Card */}
      {solution && (
        <div className="pt-2">
          <SolutionCard
            solution={solution}
            onSolveAnother={() => {
              setSolution(null);
              setProblemText('');
            }}
          />
        </div>
      )}
    </div>
  );
};
