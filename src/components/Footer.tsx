import React from 'react';
import { FlaskConical, Heart, Sparkles, BookOpen, Calculator, Atom, Camera } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, extra?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors mt-20 pb-20 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                KIMYO 5–11 SINF
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Kimyoni oson, tushunarli va zamonaviy usulda o‘rganing. 5-sinfdan 11-sinfgacha maktab o‘quvchilari uchun interaktiv masalalar, kalkulyatorlar va AI yechimlari.
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              O‘zbekiston ta’lim standartlari asosida ishlab chiqilgan
            </div>
          </div>

          {/* Sinflar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Sinflar
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                <li key={g}>
                  <button
                    onClick={() => onNavigate('curriculum', { grade: g })}
                    className="hover:text-cyan-500 transition-colors text-left"
                  >
                    {g}-sinf dasturi
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Asboblar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Asboblar
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('camera')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  📷 Kamera orqali yechish
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('solver')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Masala yechish
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculators')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Molyar massa kalkulyatori
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('periodic-table')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Davriy jadval
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('formulas')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Formulalar banki
                </button>
              </li>
            </ul>
          </div>

          {/* Amaliyot va Profil */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Amaliyot
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('practice')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Testlar va mashqlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('progress')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Mening natijalarim
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('progress')}
                  className="hover:text-cyan-500 transition-colors"
                >
                  Masalalar tarixi
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} KIMYO 5–11 SINF. Kimyoni o‘rganish endi yanada oson.
          </div>
          <div className="flex items-center gap-1">
            <span>O‘quvchilar uchun mehr bilan yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
