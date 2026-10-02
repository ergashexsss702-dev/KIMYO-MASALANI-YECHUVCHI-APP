export interface DailyFact {
  id: string;
  title: string;
  fact: string;
  category: 'Koinot' | 'Tirik tabiat' | 'Tarix' | 'Kundalik hayot';
}

export const DAILY_FACTS: DailyFact[] = [
  {
    id: 'f-1',
    title: 'Odam tanasidagi oltin',
    fact: '70 kg vaznga ega inson tanasida taxminan 0.2 milligramm sof oltin mavjud bo‘lib, uning katta qismi qonda aylanadi.',
    category: 'Tirik tabiat',
  },
  {
    id: 'f-2',
    title: 'Koinotdagi suv zaxirasi',
    fact: 'Astronomlar Yer yuzidagi barcha okeanlar suvidan 140 trillion marta ko‘p bo‘lgan ulkan suv bug‘i bulutini kashf qilishgan.',
    category: 'Koinot',
  },
  {
    id: 'f-3',
    title: 'G‘alati element: Galliy',
    fact: 'Galliy (Ga) metallining erish harorati atigi 29.76°C. Agar uni kaftingizga qo‘ysangiz, tana harorati ta’sirida qo‘lingizda erib suyuqlikka aylanadi.',
    category: 'Kundalik hayot',
  },
  {
    id: 'f-4',
    title: 'Olmos va Qalam o‘rtasidagi sir',
    fact: 'Tabiatdagi eng qattiq mineral bo‘lgan olmos va daftaringizga yozadigan yumshoq grafit bitta element — uglerod (C) atomlaridan iborat!',
    category: 'Tarix',
  },
];

export interface SampleProblem {
  id: string;
  title: string;
  grade: string;
  text: string;
  given: string[];
  toFind: string;
  equation?: string;
  formulas: string[];
  steps: { stepNumber: number; title: string; calculation: string; resultText: string }[];
  answer: string;
  explanation: string;
}

export const SAMPLE_PROBLEMS: SampleProblem[] = [
  {
    id: 'sample-1',
    title: 'Kalsiy karbonat parchalanishi',
    grade: '8-sinf',
    text: '10 g CaCO₃ qizdirib to‘liq parchalanganda necha gramm CO₂ hosil bo‘ladi?',
    given: ['m(CaCO₃) = 10 g', 'M(CaCO₃) = 100 g/mol', 'M(CO₂) = 44 g/mol'],
    toFind: 'm(CO₂) = ? (g)',
    equation: 'CaCO₃ → CaO + CO₂↑',
    formulas: ['n = m / M', 'm = n · M'],
    steps: [
      {
        stepNumber: 1,
        title: 'CaCO₃ ning modda miqdorini topish',
        calculation: 'n(CaCO₃) = 10 g / 100 g/mol = 0.1 mol',
        resultText: '0.1 mol CaCO₃ parchalangan.',
      },
      {
        stepNumber: 2,
        title: 'Reaksiya tenglamasi bo‘yicha CO₂ miqdorini aniqlash',
        calculation: '1 mol CaCO₃ dan 1 mol CO₂ hosil bo‘ladi. Demak: n(CO₂) = n(CaCO₃) = 0.1 mol.',
        resultText: '0.1 mol CO₂ gazi hosil bo‘ladi.',
      },
      {
        stepNumber: 3,
        title: 'CO₂ ning massasini hisoblash',
        calculation: 'm(CO₂) = n · M = 0.1 mol · 44 g/mol = 4.4 g',
        resultText: 'Hosil bo‘lgan CO₂ massasi 4.4 gramm.',
      },
    ],
    answer: '4.4 g CO₂',
    explanation: 'Kalsiy karbonat parchalanishi so‘ndirilmagan ohak va karbonat angidrid beradi. 100 g CaCO₃ dan 44 g CO₂ chiqadi, 10 grammidan esa mos ravishda 4.4 g ajraladi.',
  },
  {
    id: 'sample-2',
    title: 'Eritmaning foiz konsentratsiyasi',
    grade: '9-sinf',
    text: '50 g suvda 10 g osh tuzi eritildi. Hosil bo‘lgan eritmaning foiz konsentratsiyasini (w) toping.',
    given: ['m(suv) = 50 g', 'm(tuz) = 10 g'],
    toFind: 'w(tuz) = ? (%)',
    formulas: ['m(eritma) = m(erigan) + m(erituvchi)', 'w = (m_erigan / m_eritma) · 100%'],
    steps: [
      {
        stepNumber: 1,
        title: 'Eritmaning umumiy massasini aniqlash',
        calculation: 'm(eritma) = 50 g + 10 g = 60 g',
        resultText: 'Eritmaning umumiy og‘irligi 60 gramm.',
      },
      {
        stepNumber: 2,
        title: 'Massa ulushini (w) hisoblash',
        calculation: 'w = (10 g / 60 g) · 100% = 16.67%',
        resultText: 'Tuzning foizdagi miqdori 16.67% ga teng.',
      },
    ],
    answer: 'w = 16.67%',
    explanation: 'Ko‘pchilik o‘quvchilar xatolik bilan 10 ni 50 ga bo‘lishadi. Ammo maxrajda albatta umumiy eritma massasi (suv + tuz) bo‘lishi shart!',
  },
  {
    id: 'sample-3',
    title: 'Gazlar hajmi va mol hisobi',
    grade: '8-sinf',
    text: 'Normal sharoitda 5.6 litr kislorod (O₂) ning modda miqdori (n) va massasini (m) toping.',
    given: ['V(O₂) = 5.6 L', 'Vm = 22.4 L/mol', 'M(O₂) = 32 g/mol'],
    toFind: 'n(O₂) = ? (mol), m(O₂) = ? (g)',
    formulas: ['n = V / Vm', 'm = n · M'],
    steps: [
      {
        stepNumber: 1,
        title: 'Kislorodning modda miqdorini topish',
        calculation: 'n = 5.6 L / 22.4 L/mol = 0.25 mol',
        resultText: '5.6 litr gaz 0.25 molni tashkil qiladi.',
      },
      {
        stepNumber: 2,
        title: 'Kislorod massasini topish',
        calculation: 'm = 0.25 mol · 32 g/mol = 8 g',
        resultText: '0.25 mol kislorod 8 gramm og‘irlikka ega.',
      },
    ],
    answer: 'n = 0.25 mol, m = 8 g',
    explanation: 'Normal sharoitda har qanday gazning 1 moli 22.4 litr bo‘lgani uchun, 5.6 litr bu 1 molning to‘rtdan bir qismidir (0.25 mol).',
  },
];
