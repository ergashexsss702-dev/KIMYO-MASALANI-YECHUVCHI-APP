import React from 'react';
import {
  Camera,
  BookOpen,
  HelpCircle,
  Calculator,
  Atom,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Zap,
  FlaskConical,
  Award,
} from 'lucide-react';
import { GRADES_DATA } from '../data/grades';
import { DAILY_FACTS, SAMPLE_PROBLEMS } from '../data/dailyFacts';
import { GradeLevel } from '../types';

interface HomeViewProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const dailyFact = DAILY_FACTS[0];
  const todaysProblem = SAMPLE_PROBLEMS[0];

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 text-center max-w-4xl mx-auto px-4">
        {/* Futuristic badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zamonaviy interaktiv kimyo ta’lim platformasi</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Kimyo{' '}
          <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            5–11 Sinf
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          5-sinfdan 11-sinfgacha kimyo fanini o‘rganing, masalalarni yeching va bilimlaringizni mustahkamlang.
        </p>

        {/* Main CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Primary CTA: Camera AI Solver */}
          <button
            onClick={() => onNavigate('camera')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 group cursor-pointer"
          >
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Rasm orqali yechish</span>
          </button>

          {/* Secondary CTA: Manual Problem Solver */}
          <button
            onClick={() => onNavigate('solver')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <HelpCircle className="w-4 h-4 text-cyan-500" />
            <span>Masalani yechish</span>
          </button>

          {/* Tertiary CTA: Curriculum */}
          <button
            onClick={() => onNavigate('curriculum')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Kimyoni o‘rganish</span>
          </button>
        </div>

        {/* Feature badges row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>Bosqichma-bosqich yechim</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>10 xil kalkulyator</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>Davriy jadval & Mr hisoblagich</span>
          </div>
        </div>
      </section>

      {/* 2. Today's Chemistry Highlights (Bugungi masala & Kunlik fakt) */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bugungi masala */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Bugungi masala
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{todaysProblem.grade}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {todaysProblem.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 font-medium">
              "{todaysProblem.text}"
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
              Javob: {todaysProblem.answer}
            </span>
            <button
              onClick={() => onNavigate('solver', { problemText: todaysProblem.text })}
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 flex items-center gap-1"
            >
              To‘liq yechimni ko‘rish <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Kunlik kimyoviy fakt */}
        <div className="p-6 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-transparent border border-cyan-500/20 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Kunlik kimyoviy fakt
              </span>
              <span className="text-slate-400 text-[11px]">{dailyFact.category}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {dailyFact.title}
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {dailyFact.fact}
            </p>
          </div>

          <div className="pt-2 border-t border-cyan-500/15 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Har kuni yangi ilmiy kashfiyotlar</span>
            <button
              onClick={() => onNavigate('periodic-table')}
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Elementlarni o‘rganish →
            </button>
          </div>
        </div>
      </section>

      {/* 3. Class Selection (Sinflar 5-11) */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              O‘quv dasturi
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Sinfni tanlang
            </h2>
          </div>
          <button
            onClick={() => onNavigate('curriculum')}
            className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
          >
            Barcha mavzularni ko‘rish <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GRADES_DATA.map((item) => (
            <div
              key={item.grade}
              onClick={() => onNavigate('curriculum', { grade: item.grade })}
              className="group p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 font-extrabold text-lg font-mono flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    {item.grade}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.topicsCount} mavzu
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {item.grade}-SINF
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <span>Kirish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Interactive Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Foydali instrumentlar
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Tezkor asboblar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Tool 1 */}
          <div
            onClick={() => onNavigate('calculators')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 hover:shadow-lg cursor-pointer transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
              Molyar massa kalkulyatori
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ixtiyoriy kimyoviy formulani kiriting (masalan H₂SO₄, CaCO₃) — molyar massa va har bir element foizini hisoblab beradi.
            </p>
          </div>

          {/* Tool 2 */}
          <div
            onClick={() => onNavigate('periodic-table')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 hover:shadow-lg cursor-pointer transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-500 flex items-center justify-center">
              <Atom className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
              Davriy jadval
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Mendeleyev davriy jadvalidagi barcha elementlar, ularning xossalari, elektron qobiqlari va qiziqarli faktlar.
            </p>
          </div>

          {/* Tool 3 */}
          <div
            onClick={() => onNavigate('practice')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 hover:shadow-lg cursor-pointer transition-all space-y-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-500 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-500 transition-colors">
              Testlar va mashqlar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Sinf va qiyinlik darajasiga mos testlar. Xatolaringizni tahlil qiling va bilimlaringizni mustahkamlang.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
