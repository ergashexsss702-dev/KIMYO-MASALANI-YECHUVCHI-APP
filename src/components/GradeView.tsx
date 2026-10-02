import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Bookmark,
  Layers,
  Sparkles,
  ArrowLeft,
  Calculator,
} from 'lucide-react';
import { GRADES_DATA, TOPICS_DATA } from '../data/grades';
import { GradeLevel, Topic } from '../types';
import {
  getUserProgress,
  markTopicCompleted,
  isFavorite,
  toggleFavorite,
} from '../utils/storage';
import { formatChemicalFormula } from '../utils/chemistry';

interface GradeViewProps {
  initialGrade?: GradeLevel;
  initialTopicId?: string;
  onNavigateToQuiz?: (grade: GradeLevel) => void;
  onNavigateToSolver?: (problemText: string) => void;
}

export const GradeView: React.FC<GradeViewProps> = ({
  initialGrade,
  initialTopicId,
  onNavigateToQuiz,
  onNavigateToSolver,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(initialGrade || null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(() => {
    if (initialTopicId) {
      return TOPICS_DATA.find((t) => t.id === initialTopicId) || null;
    }
    return null;
  });

  const progress = getUserProgress();
  const completedSet = new Set(progress.completedTopics);

  const handleSelectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    markTopicCompleted(topic.id);
  };

  const currentGradeTopics = selectedGrade
    ? TOPICS_DATA.filter((t) => t.grade === selectedGrade)
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Grade Details or Topic View Navigation Breadcrumb */}
      {selectedGrade && (
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => {
              setSelectedGrade(null);
              setSelectedTopic(null);
            }}
            className="hover:text-cyan-500 flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Barcha sinflar
          </button>
          <span>/</span>
          <button
            onClick={() => setSelectedTopic(null)}
            className={`hover:text-cyan-500 font-medium ${!selectedTopic ? 'text-cyan-600 dark:text-cyan-400' : ''}`}
          >
            {selectedGrade}-sinf dasturi
          </button>
          {selectedTopic && (
            <>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">
                {selectedTopic.title}
              </span>
            </>
          )}
        </div>
      )}

      {/* 1. Grade Cards List (When no grade is selected) */}
      {!selectedGrade && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Maktab Kimyo Dasturi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Sinfni tanlang
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              5-sinfdan 11-sinfgacha kimyo fani mavzulari, formulalar, tushuntirishlar va yechilgan namunaviy masalalar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
            {GRADES_DATA.map((item) => (
              <div
                key={item.grade}
                onClick={() => handleSelectGrade(item.grade)}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-extrabold text-xl font-mono flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform">
                      {item.grade}
                    </div>
                    <span className="text-xs font-medium text-slate-400 font-mono">
                      {item.topicsCount} ta mavzu
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    {item.highlightTopics.slice(0, 3).map((hl, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <span>Kirish</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Topics List inside Selected Grade (When grade chosen, topic not yet chosen) */}
      {selectedGrade && !selectedTopic && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {selectedGrade}-Sinf Kimyo Mavzulari
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                O‘quv rejasi bo‘yicha nazariy qoidalar va yechilgan masalalar bilan tanishing
              </p>
            </div>

            {onNavigateToQuiz && (
              <button
                onClick={() => onNavigateToQuiz(selectedGrade)}
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <HelpCircle className="w-4 h-4" />
                {selectedGrade}-sinf testini topshirish
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGradeTopics.map((topic) => {
              const isDone = completedSet.has(topic.id);

              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                        {topic.difficulty}
                      </span>
                      {isDone && (
                        <span className="flex items-center gap-1 text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                          <CheckCircle className="w-3.5 h-3.5" />
                          O‘rganildi
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-500 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {topic.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-cyan-500 transition-colors">
                    <span>Mavzuni ochish</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Single Topic Detailed Reader (When topic chosen) */}
      {selectedTopic && (
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                {selectedTopic.grade}-sinf · Qiyinlik: {selectedTopic.difficulty}
              </span>
              <span className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                O‘rganilgan deb belgilandi
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {selectedTopic.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {selectedTopic.shortDesc}
            </p>
          </div>

          {/* Theory Sections */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
              Nazariy tushunchalar va qoidalar
            </div>
            <div className="space-y-2.5 pt-1">
              {selectedTopic.theory.map((para, i) => (
                <p key={i} className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Key Formulas */}
          {selectedTopic.keyFormulas.length > 0 && (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-blue-500" />
                Asosiy formulalar va munosabatlar
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {selectedTopic.keyFormulas.map((form, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-300"
                  >
                    {formatChemicalFormula(form)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solved Examples */}
          {selectedTopic.examples.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Yechilgan namunaviy masalalar
              </div>

              {selectedTopic.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {ex.title}
                    </span>
                    {onNavigateToSolver && (
                      <button
                        onClick={() => onNavigateToSolver(ex.problem)}
                        className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                      >
                        Kalkulyatorda yechish <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <p className="text-sm font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {ex.problem}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <span className="font-semibold text-slate-500 block">Yechish yo‘li:</span>
                    {ex.solution.map((s, i) => (
                      <div key={i} className="text-slate-600 dark:text-slate-300 font-mono">
                        {formatChemicalFormula(s)}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                    Javob: {formatChemicalFormula(ex.answer)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Practical Life Uses */}
          {selectedTopic.practicalUses && (
            <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-600 dark:text-cyan-400 block">
                Kundalik hayotda va amaliyotda qo‘llanilishi:
              </span>
              <p>{selectedTopic.practicalUses}</p>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Mavzular ro‘yxatiga qaytish
            </button>

            {onNavigateToQuiz && (
              <button
                onClick={() => onNavigateToQuiz(selectedTopic.grade)}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                Ushbu mavzu bo‘yicha test ishlash
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
