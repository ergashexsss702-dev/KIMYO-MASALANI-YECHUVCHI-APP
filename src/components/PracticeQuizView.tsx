import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Trophy,
  Award,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { GradeLevel, QuizQuestion } from '../types';
import { saveQuizResult } from '../utils/storage';
import { formatChemicalFormula } from '../utils/chemistry';

interface PracticeQuizViewProps {
  initialGrade?: GradeLevel;
  onNavigateToTopic?: (grade: GradeLevel) => void;
}

export const PracticeQuizView: React.FC<PracticeQuizViewProps> = ({
  initialGrade = 8,
  onNavigateToTopic,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Filter questions according to grade and difficulty
  const questions: QuizQuestion[] = QUIZ_QUESTIONS.filter((q) => {
    const matchesGrade = q.grade === selectedGrade;
    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesGrade && matchesDiff;
  });

  const handleSelectOption = (qIndex: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);
    saveQuizResult(selectedGrade, correctCount, questions.length);

    if (correctCount > 0 && correctCount >= Math.ceil(questions.length * 0.7)) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Bilimni Sinash va Mustahkamlash</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Test va mashqlar
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Sinf va qiyinlik darajasini tanlang, savollarga javob bering va xatolaringiz ustida ishlang.
        </p>
      </div>

      {/* Filter Options (Grade & Difficulty) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Grade selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium">Sinf:</span>
          {[5, 6, 7, 8, 9, 10, 11].map((g) => (
            <button
              key={g}
              onClick={() => {
                setSelectedGrade(g as GradeLevel);
                handleResetQuiz();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedGrade === g
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Difficulty selector */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium">Daraja:</span>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'easy', label: '🟢 Oson' },
            { id: 'medium', label: '🟡 O‘rta' },
            { id: 'hard', label: '🔴 Qiyin' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDifficulty(d.id as any);
                handleResetQuiz();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedDifficulty === d.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz questions view */}
      {questions.length === 0 ? (
        <div className="py-12 text-center text-slate-400 space-y-3 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-base font-semibold text-slate-600 dark:text-slate-300">
            Tanlangan parametrlar bo‘yicha savollar topilmadi
          </p>
          <p className="text-xs text-slate-400">
            Boshqa sinf yoki qiyinlik darajasini tanlab ko‘ring.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Result summary banner if submitted */}
          {isSubmitted && (
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-white shadow-xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-8 h-8 text-amber-300" />
                  <div>
                    <h3 className="text-lg font-bold">Natijangiz tayyor!</h3>
                    <p className="text-xs text-cyan-100">
                      {score === questions.length
                        ? 'Ajoyib natija! Barcha savollarga to‘g‘ri javob berdingiz!'
                        : score >= Math.ceil(questions.length * 0.7)
                        ? 'Yaxshi bilim! Xatolaringiz ustida ishlab oling.'
                        : 'Mavzuni yana bir bor takrorlab chiqish tavsiya etiladi.'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold font-mono">
                    {score} / {questions.length}
                  </div>
                  <div className="text-xs text-cyan-100">
                    {Math.round((score / questions.length) * 100)}% to‘g‘ri
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/20 flex justify-end">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-cyan-50 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Qaytadan topshirish
                </button>
              </div>
            </div>
          )}

          {/* Questions list */}
          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userPick = selectedAnswers[qIndex];
              const hasAnswered = userPick !== undefined;
              const isCorrect = userPick === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-rose-500/40 bg-rose-500/5'
                      : 'border-slate-200 dark:border-slate-800 shadow-sm'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                      Savol {qIndex + 1} / {questions.length}
                    </span>
                    <span className="text-slate-400">
                      {q.difficulty === 'easy'
                        ? '🟢 Oson'
                        : q.difficulty === 'medium'
                        ? '🟡 O‘rta'
                        : '🔴 Qiyin'}
                    </span>
                  </div>

                  {/* Question text */}
                  <p className="text-base font-semibold text-slate-900 dark:text-white mb-4">
                    {formatChemicalFormula(q.question)}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isPicked = userPick === optIdx;
                      let optionStyle =
                        'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200';

                      if (isSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle =
                            'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold';
                        } else if (isPicked && !isCorrect) {
                          optionStyle =
                            'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 line-through';
                        } else {
                          optionStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                        }
                      } else if (isPicked) {
                        optionStyle =
                          'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 font-semibold ring-2 ring-cyan-500/20';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(qIndex, optIdx)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                        >
                          <span className="font-mono">{formatChemicalFormula(opt)}</span>
                          {isSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-2" />
                          )}
                          {isSubmitted && isPicked && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card after submit */}
                  {isSubmitted && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1 animate-fade-in">
                      <span className="font-semibold text-cyan-600 dark:text-cyan-400 block">
                        💡 Javob tushuntirishi:
                      </span>
                      <p>{formatChemicalFormula(q.explanation)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit button */}
          {!isSubmitted && (
            <div className="text-center pt-2">
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-opacity disabled:opacity-40 cursor-pointer"
              >
                Testni yakunlash va tekshirish
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
