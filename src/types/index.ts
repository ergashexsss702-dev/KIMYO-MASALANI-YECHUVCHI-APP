export type GradeLevel = 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface GradeInfo {
  grade: GradeLevel;
  title: string;
  subtitle: string;
  description: string;
  topicsCount: number;
  highlightTopics: string[];
}

export interface TopicExample {
  title: string;
  problem: string;
  given: string[];
  solution: string[];
  answer: string;
}

export interface Topic {
  id: string;
  grade: GradeLevel;
  title: string;
  shortDesc: string;
  difficulty: 'Oson' | "O'rta" | 'Murakkab';
  theory: string[];
  keyFormulas: string[];
  importantRules: string[];
  examples: TopicExample[];
  practicalUses: string;
}

export interface ChemicalElement {
  number: number;
  symbol: string;
  nameUz: string;
  nameLatin: string;
  atomicMass: number;
  period: number;
  group: number;
  category: 
    | 'ishqoriy-metall'
    | 'ishqoriy-yer-metall'
    | 'otish-metalli'
    | 'post-otish-metalli'
    | 'metalloid'
    | 'nometall'
    | 'galogen'
    | 'nodir-gaz'
    | 'lantanoid'
    | 'aktinoid';
  state: 'qattiq' | 'suyuq' | 'gaz';
  valency: string;
  oxidationStates: string;
  electronConfig: string;
  descriptionUz: string;
  interestingFact: string;
}

export interface FormulaItem {
  id: string;
  nameUz: string;
  formula: string;
  category: 'Asosiy' | 'Kislota va Asoslar' | 'Tuzlar' | 'Eritmalar' | 'Gazlar' | 'Organik' | 'Termokimyo';
  variables: {
    symbol: string;
    meaning: string;
    unit: string;
  }[];
  explanation: string;
  sampleProblem: string;
  sampleSolution: string;
}

export interface QuizQuestion {
  id: string;
  grade: GradeLevel;
  topicId?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'choice' | 'calculation' | 'balancing';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SolutionStep {
  stepNumber: number;
  title: string;
  calculation: string;
  resultText: string;
}

export interface SolvedProblem {
  id: string;
  timestamp: number;
  dateStr: string;
  source: 'manual' | 'camera' | 'sample';
  problemText: string;
  given: string[];
  toFind: string;
  reactionEquation?: string;
  formulasUsed: string[];
  solutionSteps: SolutionStep[];
  finalAnswer: string;
  explanation: string;
  confidence?: 'high' | 'medium' | 'low' | 'unclear';
  errorTip?: string;
  imageThumbnail?: string;
  grade?: string;
  topic?: string;
}

export interface UserProgressData {
  streakDays: number;
  lastActiveDate: string;
  solvedCount: number;
  completedTopics: string[];
  quizScores: {
    id: string;
    grade: GradeLevel;
    score: number;
    total: number;
    date: string;
  }[];
  favorites: {
    formulas: string[];
    topics: string[];
    problems: string[];
  };
}
