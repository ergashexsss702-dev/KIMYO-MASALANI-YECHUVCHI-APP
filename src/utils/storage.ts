import { SolvedProblem, UserProgressData } from '../types';

const THEME_KEY = 'kimyo_theme';
const HISTORY_KEY = 'kimyo_solved_history';
const PROGRESS_KEY = 'kimyo_user_progress';

const DEFAULT_PROGRESS: UserProgressData = {
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  solvedCount: 0,
  completedTopics: ['top-5-1', 'top-7-1'],
  quizScores: [
    { id: 'initial-1', grade: 7, score: 3, total: 3, date: new Date().toLocaleDateString('uz-UZ') }
  ],
  favorites: {
    formulas: ['f-molar-mass', 'f-gas-volume'],
    topics: ['top-7-2'],
    problems: [],
  },
};

export function getStoredTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  const val = localStorage.getItem(THEME_KEY);
  if (val === 'light' || val === 'dark') return val;
  return 'dark'; // futuristic dark default
}

export function setStoredTheme(theme: 'dark' | 'light'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
}

export function getStoredHistory(): SolvedProblem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveProblemToHistory(problem: SolvedProblem): SolvedProblem[] {
  if (typeof window === 'undefined') return [];
  try {
    const history = getStoredHistory();
    // Prepend new problem, keep last 50
    const updated = [problem, ...history.filter(h => h.id !== problem.id)].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    incrementSolvedCounter();
    return updated;
  } catch {
    return [];
  }
}

export function deleteHistoryItem(id: string): SolvedProblem[] {
  if (typeof window === 'undefined') return [];
  try {
    const history = getStoredHistory().filter(h => h.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getUserProgress(): UserProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(DEFAULT_PROGRESS));
      return DEFAULT_PROGRESS;
    }
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function incrementSolvedCounter(): void {
  const p = getUserProgress();
  p.solvedCount = (p.solvedCount || 0) + 1;
  updateStreak(p);
  saveUserProgress(p);
}

export function markTopicCompleted(topicId: string): void {
  const p = getUserProgress();
  if (!p.completedTopics.includes(topicId)) {
    p.completedTopics.push(topicId);
    saveUserProgress(p);
  }
}

export function saveQuizResult(grade: any, score: number, total: number): void {
  const p = getUserProgress();
  p.quizScores.push({
    id: `quiz-${Date.now()}`,
    grade,
    score,
    total,
    date: new Date().toLocaleDateString('uz-UZ'),
  });
  updateStreak(p);
  saveUserProgress(p);
}

export function toggleFavorite(type: 'formulas' | 'topics' | 'problems', id: string): boolean {
  const p = getUserProgress();
  const list = p.favorites[type] || [];
  const index = list.indexOf(id);
  let isFav = false;
  if (index >= 0) {
    list.splice(index, 1);
    isFav = false;
  } else {
    list.push(id);
    isFav = true;
  }
  p.favorites[type] = list;
  saveUserProgress(p);
  return isFav;
}

export function isFavorite(type: 'formulas' | 'topics' | 'problems', id: string): boolean {
  const p = getUserProgress();
  return (p.favorites[type] || []).includes(id);
}

function updateStreak(progress: UserProgressData): void {
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastActiveDate !== today) {
    const lastDate = new Date(progress.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      progress.streakDays += 1;
    } else if (diffDays > 1) {
      progress.streakDays = 1;
    }
    progress.lastActiveDate = today;
  }
}
