import React from 'react';
import { Home, BookOpen, Camera, HelpCircle, User } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Asosiy', icon: Home },
    { id: 'curriculum', label: 'Sinflar', icon: BookOpen },
    { id: 'camera', label: 'Kamera', icon: Camera, special: true },
    { id: 'solver', label: 'Masalalar', icon: HelpCircle },
    { id: 'progress', label: 'Profil', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {items.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          if (item.special) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative -top-4 flex flex-col items-center group focus:outline-none"
                aria-label="Kamera orqali yechish"
              >
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/30 group-active:scale-95 transition-transform flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Camera className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                  AI Kamera
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-full transition-colors ${
                isActive
                  ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
