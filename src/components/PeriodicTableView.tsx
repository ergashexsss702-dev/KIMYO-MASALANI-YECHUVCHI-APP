import React, { useState } from 'react';
import {
  Atom,
  Search,
  X,
  Info,
  Sparkles,
  Layers,
  Zap,
  Check,
} from 'lucide-react';
import { PERIODIC_ELEMENTS } from '../data/periodicTable';
import { ChemicalElement } from '../types';

interface PeriodicTableViewProps {
  initialElement?: ChemicalElement | null;
}

export const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({ initialElement }) => {
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(
    initialElement || PERIODIC_ELEMENTS[0] // Hydrogen by default
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'ishqoriy-metall', label: 'Ishqoriy metallar', color: 'border-rose-500/40 text-rose-500' },
    { id: 'ishqoriy-yer-metall', label: 'Ishqoriy-yer', color: 'border-orange-500/40 text-orange-500' },
    { id: 'otish-metalli', label: 'O‘tish metallari', color: 'border-blue-500/40 text-blue-500' },
    { id: 'post-otish-metalli', label: 'Post-o‘tish', color: 'border-cyan-500/40 text-cyan-500' },
    { id: 'metalloid', label: 'Metalloidlar', color: 'border-emerald-500/40 text-emerald-500' },
    { id: 'nometall', label: 'Nometallar', color: 'border-amber-500/40 text-amber-500' },
    { id: 'galogen', label: 'Galogenlar', color: 'border-teal-500/40 text-teal-500' },
    { id: 'nodir-gaz', label: 'Nodir gazlar', color: 'border-purple-500/40 text-purple-500' },
  ];

  const filteredElements = PERIODIC_ELEMENTS.filter((el) => {
    const matchesSearch =
      el.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.nameLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(el.number) === searchQuery.trim();

    const matchesCategory = categoryFilter === 'all' || el.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'ishqoriy-metall':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
      case 'ishqoriy-yer-metall':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'otish-metalli':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'post-otish-metalli':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';
      case 'metalloid':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'nometall':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'galogen':
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30';
      case 'nodir-gaz':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Atom className="w-3.5 h-3.5" />
          <span>Mendeleyev Davriy Sistemasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Interaktiv davriy jadval
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Elementlarni tanlang, ularning atom massasi, elektron konfiguratsiyasi, valentligi va qiziqarli xususiyatlarini o‘rganing.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Elementni qidirish (O, Fe, Oltin, 8)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === c.id
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid + Detail Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Elements Grid (2 Columns on Desktop) */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-semibold text-slate-400">
              Elementlar ({filteredElements.length})
            </span>
            <span className="text-xs text-slate-500">Tafsilotlar uchun bosing</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {filteredElements.map((el) => {
              const isSelected = selectedElement?.number === el.number;
              const colorClasses = getCategoryColor(el.category);

              return (
                <div
                  key={el.number}
                  onClick={() => setSelectedElement(el)}
                  className={`group relative p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between aspect-square select-none ${
                    isSelected
                      ? 'border-cyan-500 ring-2 ring-cyan-500/30 scale-105 z-10 bg-cyan-50 dark:bg-cyan-950/40 shadow-lg'
                      : `${colorClasses} hover:scale-102 hover:shadow-md`
                  }`}
                >
                  <div className="flex justify-between items-start text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{el.number}</span>
                    <span className="truncate max-w-[36px]">{el.atomicMass}</span>
                  </div>

                  <div className="text-center my-auto">
                    <span className="font-extrabold text-lg sm:text-xl font-mono leading-none block">
                      {el.symbol}
                    </span>
                    <span className="text-[10px] font-medium block truncate mt-1">
                      {el.nameUz}
                    </span>
                  </div>

                  <div className="text-[9px] text-right text-slate-400 truncate font-mono">
                    {el.period}-{el.group}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Element Detailed Inspector Card (Right Column) */}
        <div className="sticky top-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          {selectedElement ? (
            <div className="space-y-6 animate-fade-in">
              {/* Element Header Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-extrabold text-2xl font-mono flex items-center justify-center border border-cyan-500/30 shadow-inner">
                  {selectedElement.symbol}
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedElement.nameUz}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {selectedElement.nameLatin} · №{selectedElement.number}
                  </div>
                  <div className="mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {selectedElement.category}
                  </div>
                </div>
              </div>

              {/* Element Properties Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Nisbiy atom massasi:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {selectedElement.atomicMass}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Davr va Guruh:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {selectedElement.period}-davr · {selectedElement.group}-guruh
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Valentlik:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {selectedElement.valency}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Oksidlanish darajasi:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {selectedElement.oxidationStates}
                  </span>
                </div>
              </div>

              {/* Electron Configuration */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Elektron konfiguratsiyasi:
                </span>
                <span className="font-mono text-sm text-cyan-600 dark:text-cyan-400 block font-semibold">
                  {selectedElement.electronConfig}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Element haqida ma’lumot
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedElement.descriptionUz}
                </p>
              </div>

              {/* Interesting Fact */}
              {selectedElement.interestingFact && (
                <div className="p-3.5 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 space-y-1">
                  <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Qiziqarli fakt:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedElement.interestingFact}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Element ustiga bosing
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
