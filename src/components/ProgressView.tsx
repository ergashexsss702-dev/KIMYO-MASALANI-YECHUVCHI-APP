import React, { useState, useEffect } from 'react';
import {
  Flame,
  Award,
  BookOpen,
  History,
  Bookmark,
  Trash2,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  getUserProgress,
  getStoredHistory,
  deleteHistoryItem,
  clearHistory,
} from '../utils/storage';
import { SolvedProblem, UserProgressData } from '../types';
import { TOPICS_DATA } from '../data/grades';
import { FORMULAS_DATA } from '../data/formulas';
import { SolutionCard } from './SolutionCard';

interface ProgressViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'favorites'>('overview');
  const [progress, setProgress] = useState<UserProgressData>(() => getUserProgress());
  const [historyList, setHistoryList] = useState<SolvedProblem[]>(() => getStoredHistory());
  const [activePreviewSolution, setActivePreviewSolution] = useState<SolvedProblem | null>(null);

  useEffect(() => {
    setProgress(getUserProgress());
    setHistoryList(getStoredHistory());
  }, [activeTab]);

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistoryList(updated);
    if (activePreviewSolution?.id === id) {
      setActivePreviewSolution(null);
    }
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Barcha masalalar tarixini tozalashni xohlaysizmi?')) {
      clearHistory();
      setHistoryList([]);
      setActivePreviewSolution(null);
    }
  };

  const totalTopicsCount = TOPICS_DATA.length;
  const completedTopicsCount = progress.completedTopics.length;
  const topicProgressPercent = Math.min(
    Math.round((completedTopicsCount / totalTopicsCount) * 100),
    100
  );

  const favoriteFormulas = FORMULAS_DATA.filter((f) =>
    progress.favorites.formulas.includes(f.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Award className="w-3.5 h-3.5" />
          <span>O‘quvchi Kabineti</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Mening yutuqlarim va tarixim
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          O‘rganilgan mavzular, yechilgan masalalar statistikasi va saqlab qo‘yilgan qimmatli ma’lumotlar.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('overview');
              setActivePreviewSolution(null);
            }}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Umumiy statistika
          </button>

          <button
            onClick={() => {
              setActiveTab('history');
              setActivePreviewSolution(null);
            }}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            Masalalar tarixi ({historyList.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('favorites');
              setActivePreviewSolution(null);
            }}
            className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saqlanganlar ({favoriteFormulas.length})
          </button>
        </div>
      </div>

      {/* 1. Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {progress.streakDays} kun
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">O‘rganish seriyasi</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {historyList.length} ta
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Yechilgan masalalar</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {completedTopicsCount} ta
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">O‘rganilgan mavzular</div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {progress.quizScores.length} ta
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Topshirilgan testlar</div>
              </div>
            </div>
          </div>

          {/* Curriculum Progress Bar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Kimyo dasturini o‘zlashtirish darajasi:
              </span>
              <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                {topicProgressPercent}%
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(topicProgressPercent, 5)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5-sinf (Boshlang‘ich)</span>
              <span>8-sinf (Asosiy)</span>
              <span>11-sinf (Oliy daraja)</span>
            </div>
          </div>

          {/* Recent Quiz Scores */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Oxirgi test natijalari:
            </h3>

            {progress.quizScores.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">Hali test topshirmagansiz.</p>
            ) : (
              <div className="space-y-2">
                {progress.quizScores.slice(-4).reverse().map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {q.grade}-sinf kimyo testi
                      </span>
                      <span className="text-slate-400 ml-2 font-mono">{q.date}</span>
                    </div>

                    <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400 text-sm">
                      {q.score} / {q.total}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Solved History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Active preview solution */}
          {activePreviewSolution && (
            <div className="space-y-4">
              <button
                onClick={() => setActivePreviewSolution(null)}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
              >
                ← Tarix ro‘yxatiga qaytish
              </button>
              <SolutionCard solution={activePreviewSolution} />
            </div>
          )}

          {!activePreviewSolution && (
            <>
              {historyList.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 mx-auto flex items-center justify-center">
                    <History className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Bu yerda hali saqlangan masalalar yo‘q
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      Kamera orqali rasmga oling yoki matn yozib birinchi masalangizni yeching!
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('solver')}
                    className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
                  >
                    Birinchi masalangizni yeching!
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      Jami {historyList.length} ta yechilgan masala
                    </span>
                    <button
                      onClick={handleClearAllHistory}
                      className="text-xs text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Tarixni tozalash
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {historyList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setActivePreviewSolution(item)}
                        className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                              {item.source === 'camera' ? '📷 Suratdan olingan' : '✏️ Matnli'}
                            </span>
                            <span className="text-slate-400">· {item.dateStr}</span>
                          </div>
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                            {item.problemText}
                          </p>
                          <div className="text-xs font-mono text-teal-600 dark:text-teal-400">
                            Javob: {item.finalAnswer}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => handleDeleteHistory(item.id, e)}
                            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                            title="O‘chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 3. Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Saqlangan formulalar:
          </h3>

          {favoriteFormulas.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              Hali formulalar saqlanmagan. Formulalar bo‘limidan saqlab olishingiz mumkin.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteFormulas.map((f) => (
                <div
                  key={f.id}
                  onClick={() => onNavigate('formulas', { formulaId: f.id })}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {f.nameUz}
                    </span>
                    <span className="text-cyan-500 text-[10px]">{f.category}</span>
                  </div>
                  <div className="font-mono text-base font-bold text-cyan-600 dark:text-cyan-400">
                    {f.formula}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{f.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
