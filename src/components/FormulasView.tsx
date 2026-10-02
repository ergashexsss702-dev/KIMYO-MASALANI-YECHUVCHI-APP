import React, { useState } from 'react';
import {
  Calculator,
  Search,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { FORMULAS_DATA } from '../data/formulas';
import { FormulaItem } from '../types';
import { isFavorite, toggleFavorite } from '../utils/storage';
import { formatChemicalFormula } from '../utils/chemistry';

interface FormulasViewProps {
  initialFormulaId?: string;
  onNavigateToSolver?: (problemText: string) => void;
}

export const FormulasView: React.FC<FormulasViewProps> = ({
  initialFormulaId,
  onNavigateToSolver,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Asosiy', 'Gazlar', 'Eritmalar', 'Organik', 'Termokimyo'];

  const filtered = FORMULAS_DATA.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      item.nameUz.toLowerCase().includes(q) ||
      item.formula.toLowerCase().includes(q) ||
      item.explanation.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopyFormula = (id: string, formulaStr: string) => {
    navigator.clipboard.writeText(formulaStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>Kimyoviy Formulalar Banki</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Formulalar ma’lumotnomasi
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Molyar massa, modda miqdori, eritmalar, gaz qonunlari va organik kimyo formulalari, kattaliklar va amaliy misollar.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Formula yoki mavzuni qidirish (n = m/M, w, zichlik)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat === 'all' ? 'Barcha kategoriyalar' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => {
          const isCopied = copiedId === item.id;
          const isFav = isFavorite('formulas', item.id);

          return (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/40 hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Card header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                      {item.nameUz}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyFormula(item.id, item.formula)}
                      className="p-2 rounded-xl text-slate-400 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 transition-colors"
                      title="Formuladan nusxa olish"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Big Formula Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center font-mono text-xl sm:text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 select-all">
                  {formatChemicalFormula(item.formula)}
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.explanation}
                </p>

                {/* Variables list */}
                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="font-semibold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                    Belgilar tavsifi:
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    {item.variables.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-lg"
                      >
                        <span className="font-bold text-cyan-600 dark:text-cyan-400">
                          {v.symbol}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 truncate mx-2">
                          {v.meaning}
                        </span>
                        <span className="text-slate-400">{v.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Problem & Action */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-xs bg-cyan-500/5 dark:bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/20 space-y-1">
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400 block text-[11px]">
                    Namunaviy misol:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">{item.sampleProblem}</p>
                  <p className="font-mono text-teal-600 dark:text-teal-400 font-medium">
                    {item.sampleSolution}
                  </p>
                </div>

                {onNavigateToSolver && (
                  <button
                    onClick={() => onNavigateToSolver(item.sampleProblem)}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Ushbu namunani yechish oynasida ochish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
