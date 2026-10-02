/**
 * Kimyo hisoblashlari va formulalar bo'yicha yordamchi modullar
 */

export const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007,
  O: 15.999, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982,
  Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098,
  Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938,
  Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723,
  Ge: 72.63, As: 74.922, Se: 78.96, Br: 79.904, Kr: 83.798, Rb: 85.468,
  Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Tc: 98,
  Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82,
  Sn: 118.71, Sb: 121.76, Te: 127.60, I: 126.90, Xe: 131.29, Cs: 132.91,
  Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24, W: 183.84,
  Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, Bi: 208.98, U: 238.03,
};

export const ELEMENT_NAMES_UZ: Record<string, string> = {
  H: 'Vodorod', He: 'Geliy', Li: 'Litiy', Be: 'Berilliy', B: 'Bor', C: 'Uglerod',
  N: 'Azot', O: 'Kislorod', F: 'Ftor', Ne: 'Neon', Na: 'Natriy', Mg: 'Magniy',
  Al: 'Alyuminiy', Si: 'Kremniy', P: 'Fosfor', S: 'Oltingugurt', Cl: 'Xlor',
  Ar: 'Argon', K: 'Kaliy', Ca: 'Kalsiy', Sc: 'Skandiy', Ti: 'Titan', V: 'Vanadiy',
  Cr: 'Xrom', Mn: 'Marganes', Fe: 'Temir', Co: 'Kobalt', Ni: 'Nikel', Cu: 'Mis',
  Zn: 'Rux', Ga: 'Galliy', Ge: 'Germaniy', As: 'Mishyak', Se: 'Selen', Br: 'Brom',
  Kr: 'Kripton', Rb: 'Rubidiy', Sr: 'Stronsiy', Ag: 'Kumush', Sn: 'Qalay',
  I: 'Yod', Ba: 'Bariy', W: 'Volfram', Pt: 'Platina', Au: 'Oltin', Hg: 'Simob',
  Pb: 'Qo‘rg‘oshin', U: 'Uran'
};

/**
 * Format string to chemistry subscript representation: e.g. H2SO4 -> H₂SO₄
 */
export function formatChemicalFormula(formula: string): string {
  if (!formula) return '';
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  };
  
  // Replace numbers that follow an element letter or closing parenthesis with subscripts
  return formula.replace(/(?<=[A-Za-z\)])\d+/g, (match) => {
    return match.split('').map(d => subscripts[d] || d).join('');
  });
}

export interface FormulaBreakdown {
  element: string;
  nameUz: string;
  count: number;
  atomicMass: number;
  totalMass: number;
  percentage: number;
}

export interface MolarMassResult {
  formula: string;
  formattedFormula: string;
  totalMolarMass: number;
  breakdown: FormulaBreakdown[];
  isValid: boolean;
  errorMessage?: string;
}

/**
 * Molyar massani aniq hisoblash (qavslar va kristalogidratlarni qo'llab-quvvatlaydi, masalan: CuSO4*5H2O)
 */
export function calculateMolarMass(rawFormula: string): MolarMassResult {
  const formula = rawFormula.trim().replace(/\s+/g, '');
  if (!formula) {
    return {
      formula: '',
      formattedFormula: '',
      totalMolarMass: 0,
      breakdown: [],
      isValid: false,
      errorMessage: 'Formula kiritilmadi',
    };
  }

  try {
    const elementCounts: Record<string, number> = {};

    // Support hydrate notation: e.g. CuSO4*5H2O or FeSO4.7H2O
    const hydrateParts = formula.split(/[\*\.]/);

    for (let pIdx = 0; pIdx < hydrateParts.length; pIdx++) {
      const part = hydrateParts[pIdx];
      let multiplier = 1;
      let partFormula = part;

      if (pIdx > 0) {
        const match = part.match(/^(\d+)(.*)$/);
        if (match) {
          multiplier = parseInt(match[1], 10);
          partFormula = match[2];
        }
      }

      const partCounts = parseFormulaSection(partFormula);
      for (const [el, count] of Object.entries(partCounts)) {
        elementCounts[el] = (elementCounts[el] || 0) + count * multiplier;
      }
    }

    let totalMass = 0;
    const breakdown: FormulaBreakdown[] = [];

    for (const [el, count] of Object.entries(elementCounts)) {
      const mass = ATOMIC_WEIGHTS[el];
      if (mass === undefined) {
        return {
          formula,
          formattedFormula: formatChemicalFormula(formula),
          totalMolarMass: 0,
          breakdown: [],
          isValid: false,
          errorMessage: `Noma'lum element: "${el}". Iltimos, kimyoviy belgini to'g'ri kiriting (masalan, Fe, Na, Ca).`,
        };
      }
      const elTotal = mass * count;
      totalMass += elTotal;
    }

    for (const [el, count] of Object.entries(elementCounts)) {
      const mass = ATOMIC_WEIGHTS[el];
      const elTotal = mass * count;
      const percentage = totalMass > 0 ? (elTotal / totalMass) * 100 : 0;
      breakdown.push({
        element: el,
        nameUz: ELEMENT_NAMES_UZ[el] || el,
        count,
        atomicMass: mass,
        totalMass: Number(elTotal.toFixed(3)),
        percentage: Number(percentage.toFixed(2)),
      });
    }

    // Sort by mass descending
    breakdown.sort((a, b) => b.totalMass - a.totalMass);

    return {
      formula,
      formattedFormula: formatChemicalFormula(formula),
      totalMolarMass: Number(totalMass.toFixed(3)),
      breakdown,
      isValid: true,
    };
  } catch (err: any) {
    return {
      formula,
      formattedFormula: formatChemicalFormula(formula),
      totalMolarMass: 0,
      breakdown: [],
      isValid: false,
      errorMessage: err.message || "Formulani o'qishda xatolik yuz berdi.",
    };
  }
}

function parseFormulaSection(str: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < str.length) {
    const char = str[i];

    if (char === '(' || char === '[') {
      stack.push({});
      i++;
    } else if (char === ')' || char === ']') {
      i++;
      let numStr = '';
      while (i < str.length && /\d/.test(str[i])) {
        numStr += str[i];
        i++;
      }
      const multiplier = numStr ? parseInt(numStr, 10) : 1;
      const top = stack.pop();
      if (!top) throw new Error("Qavslar noto'g'ri yopilgan.");
      const current = stack[stack.length - 1];
      for (const [el, count] of Object.entries(top)) {
        current[el] = (current[el] || 0) + count * multiplier;
      }
    } else if (/[A-Z]/.test(char)) {
      let el = char;
      i++;
      if (i < str.length && /[a-z]/.test(str[i])) {
        el += str[i];
        i++;
      }
      let numStr = '';
      while (i < str.length && /\d/.test(str[i])) {
        numStr += str[i];
        i++;
      }
      const count = numStr ? parseInt(numStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[el] = (current[el] || 0) + count;
    } else {
      throw new Error(`Kutilmagan belgi: "${char}"`);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Ochilmagan yoki yopilmagan qavslar mavjud.");
  }

  return stack[0];
}

/**
 * Common chemical reaction database and step-by-step balancer for instant student feedback
 */
export interface BalancedResult {
  original: string;
  balanced: string;
  reactionType: string;
  explanationSteps: string[];
}

export const COMMON_BALANCED_REACTIONS: Record<string, BalancedResult> = {
  'h2+o2=h2o': {
    original: 'H₂ + O₂ → H₂O',
    balanced: '2H₂ + O₂ → 2H₂O',
    reactionType: 'Birikish reaksiyasi',
    explanationSteps: [
      'Reagentlar tomonida 2 ta O atomi bor, mahsulotda (H₂O) esa 1 ta O atomi bor.',
      'O atomlarini tenglashtirish uchun H₂O oldiga 2 koeffitsienti qo‘yiladi: H₂ + O₂ → 2H₂O',
      'Endi mahsulotda 4 ta H atomi bo‘ldi. Reagent tomonidagi H₂ oldiga ham 2 qo‘yiladi.',
      'Tenglashgan holat: 2H₂ + O₂ → 2H₂O (4 ta H, 2 ta O teng).'
    ]
  },
  'ch4+o2=co2+h2o': {
    original: 'CH₄ + O₂ → CO₂ + H₂O',
    balanced: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
    reactionType: 'Yonish (Oksidlanish) reaksiyasi',
    explanationSteps: [
      'Uglerod (C) atomlari ikkala tomonda ham 1 tadan, teng.',
      'CH₄ tarkibida 4 ta H bor, mahsulotda H₂O oldiga 2 qo‘yib 4 ta H hosil qilamiz: CH₄ + O₂ → CO₂ + 2H₂O',
      'Endi o‘ng tomonda kislorodlar soni: 2 (CO₂ da) + 2 (2H₂O da) = 4 ta O.',
      'Chap tomondagi O₂ oldiga 2 koeffitsienti qo‘yiladi: CH₄ + 2O₂ → CO₂ + 2H₂O.'
    ]
  },
  'caco3=cao+co2': {
    original: 'CaCO₃ → CaO + CO₂',
    balanced: 'CaCO₃ → CaO + CO₂↑',
    reactionType: 'Parchalanish reaksiyasi',
    explanationSteps: [
      'Chapda: 1 ta Ca, 1 ta C, 3 ta O atomi bor.',
      'O‘ngda: CaO da 1 ta Ca va 1 ta O; CO₂ da 1 ta C va 2 ta O. Jami 1 ta Ca, 1 ta C, 3 ta O.',
      'Barcha atomlar soni teng, koeffitsientlar 1:1:1.'
    ]
  },
  'fe+o2=fe2o3': {
    original: 'Fe + O₂ → Fe₂O₃',
    balanced: '4Fe + 3O₂ → 2Fe₂O₃',
    reactionType: 'Birikish (oksidlanish) reaksiyasi',
    explanationSteps: [
      'Kislorod atomlarini tenglashtiramiz: chapda 2 ta, o‘ngda 3 ta. Eng kichik umumiy karrali 6.',
      'O₂ oldiga 3, Fe₂O₃ oldiga 2 qo‘yiladi: Fe + 3O₂ → 2Fe₂O₃',
      'Endi o‘ng tomonda 2 × 2 = 4 ta Fe bor. Chapdagi Fe oldiga 4 qo‘yiladi.',
      'Yakuniy natija: 4Fe + 3O₂ → 2Fe₂O₃.'
    ]
  },
  'al+hcl=alcl3+h2': {
    original: 'Al + HCl → AlCl₃ + H₂',
    balanced: '2Al + 6HCl → 2AlCl₃ + 3H₂↑',
    reactionType: 'O‘rin olish reaksiyasi',
    explanationSteps: [
      'Cl atomlarini tenglashtirish uchun AlCl₃ va HCl ni solishtiramiz. H₂ va Cl₂ uchun EKUK 6.',
      'HCl oldiga 6 qo‘yiladi: 6 ta H va 6 ta Cl hosil bo‘ladi.',
      'O‘ng tomonda 6 ta Cl hosil qilish uchun 2AlCl₃, 6 ta H hosil qilish uchun 3H₂ qo‘yiladi.',
      'Chapdagi Al oldiga 2 qo‘yiladi: 2Al + 6HCl → 2AlCl₃ + 3H₂↑.'
    ]
  },
  'naoh+hcl=nacl+h2o': {
    original: 'NaOH + HCl → NaCl + H₂O',
    balanced: 'NaOH + HCl → NaCl + H₂O',
    reactionType: 'Neytrallanish (almashinish) reaksiyasi',
    explanationSteps: [
      'Chapda: 1 Na, 1 O, 2 H, 1 Cl.',
      'O‘ngda: 1 Na, 1 Cl, 2 H, 1 O.',
      'Tenglama avvalboshdanoq teng holatda.'
    ]
  },
  'n2+h2=nh3': {
    original: 'N₂ + H₂ → NH₃',
    balanced: 'N₂ + 3H₂ → 2NH₃',
    reactionType: 'Birikish reaksiyasi (Gaber jarayoni)',
    explanationSteps: [
      'Azot (N) chapda 2 ta, o‘ngda NH₃ oldiga 2 qo‘yiladi: N₂ + H₂ → 2NH₃',
      'Endi o‘ngda 2 × 3 = 6 ta H bor. Chapdagi H₂ oldiga 3 qo‘yiladi: N₂ + 3H₂ → 2NH₃.'
    ]
  },
  'kclo3=kcl+o2': {
    original: 'KClO₃ → KCl + O₂',
    balanced: '2KClO₃ → 2KCl + 3O₂↑',
    reactionType: 'Parchalanish reaksiyasi',
    explanationSteps: [
      'Kislorod: chapda 3 ta, o‘ngda 2 ta. EKUK = 6.',
      'KClO₃ oldiga 2, O₂ oldiga 3 qo‘yiladi: 2KClO₃ → KCl + 3O₂',
      'Chapda 2 ta K va 2 ta Cl bo‘lgani uchun KCl oldiga 2 qo‘yiladi: 2KClO₃ → 2KCl + 3O₂↑.'
    ]
  }
};

export function balanceEquationLocally(equation: string): BalancedResult | null {
  const normalized = equation
    .toLowerCase()
    .replace(/→|->|=>/g, '=')
    .replace(/\s+/g, '')
    .replace(/[₀-₉]/g, (d) => {
      const map: Record<string, string> = {
        '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
        '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
      };
      return map[d] || d;
    });

  if (COMMON_BALANCED_REACTIONS[normalized]) {
    return COMMON_BALANCED_REACTIONS[normalized];
  }

  // Try matching without arrows or reverse
  for (const [key, val] of Object.entries(COMMON_BALANCED_REACTIONS)) {
    if (normalized.includes(key.split('=')[0]) && normalized.includes(key.split('=')[1])) {
      return val;
    }
  }

  return null;
}
