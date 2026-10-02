import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { ChemistryCanvasBg } from './components/ChemistryCanvasBg';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { HomeView } from './components/HomeView';
import { GradeView } from './components/GradeView';
import { ProblemSolverView } from './components/ProblemSolverView';
import { CameraScannerView } from './components/CameraScannerView';
import { CalculatorsView } from './components/CalculatorsView';
import { PeriodicTableView } from './components/PeriodicTableView';
import { FormulasView } from './components/FormulasView';
import { PracticeQuizView } from './components/PracticeQuizView';
import { ProgressView } from './components/ProgressView';
import { getStoredTheme, setStoredTheme } from './utils/storage';
import { GradeLevel } from './types';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentView, setCurrentView] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Extra route navigation parameters
  const [navParams, setNavParams] = useState<{
    grade?: GradeLevel;
    topicId?: string;
    formulaId?: string;
    problemText?: string;
    element?: any;
  }>({});

  // Initialize theme from storage on mount
  useEffect(() => {
    const saved = getStoredTheme();
    setTheme(saved);
    applyThemeToDoc(saved);
  }, []);

  const applyThemeToDoc = (t: 'dark' | 'light') => {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setStoredTheme(next);
    applyThemeToDoc(next);
  };

  const handleNavigate = (view: string, extra?: any) => {
    setCurrentView(view);
    if (extra) {
      setNavParams(extra);
    } else {
      setNavParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Background scientific canvas */}
      <ChemistryCanvasBg theme={theme} />

      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}

        {currentView === 'curriculum' && (
          <GradeView
            initialGrade={navParams.grade}
            initialTopicId={navParams.topicId}
            onNavigateToQuiz={(g) => handleNavigate('practice', { grade: g })}
            onNavigateToSolver={(txt) => handleNavigate('solver', { problemText: txt })}
          />
        )}

        {currentView === 'solver' && (
          <ProblemSolverView initialProblemText={navParams.problemText || ''} />
        )}

        {currentView === 'camera' && <CameraScannerView onNavigate={handleNavigate} />}

        {currentView === 'calculators' && <CalculatorsView />}

        {currentView === 'periodic-table' && (
          <PeriodicTableView initialElement={navParams.element || null} />
        )}

        {currentView === 'formulas' && (
          <FormulasView
            initialFormulaId={navParams.formulaId}
            onNavigateToSolver={(txt) => handleNavigate('solver', { problemText: txt })}
          />
        )}

        {currentView === 'practice' && (
          <PracticeQuizView
            initialGrade={navParams.grade || 8}
            onNavigateToTopic={(g) => handleNavigate('curriculum', { grade: g })}
          />
        )}

        {currentView === 'progress' && <ProgressView onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Bottom Mobile Navigation Bar */}
      <MobileNav currentView={currentView} onNavigate={handleNavigate} />

      {/* Global Instant Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
