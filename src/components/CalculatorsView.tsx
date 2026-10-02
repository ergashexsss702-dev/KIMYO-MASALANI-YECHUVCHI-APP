import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Beaker,
  Scale,
  Gauge,
  Percent,
  Wind,
  Layers,
  FlaskRound,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { calculateMolarMass, MolarMassResult, formatChemicalFormula } from '../utils/chemistry';
import { balanceEquationWithAI } from '../services/aiSolver';

export const CalculatorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('molar-mass');

  // Calculator 1 & 9: Molar Mass / Mr
  const [formulaInput, setFormulaInput] = useState('H2SO4');
  const [molarResult, setMolarResult] = useState<MolarMassResult | null>(() =>
    calculateMolarMass('H2SO4')
  );

  // Calculator 2: Amount of substance (n)
  const [nMode, setNMode] = useState<'mass' | 'volume' | 'particles'>('mass');
  const [nMass, setNMass] = useState('98');
  const [nMolarMass, setNMolarMass] = useState('98');
  const [nVolume, setNVolume] = useState('22.4');
  const [nParticles, setNParticles] = useState('6.02e23');
  const [nResult, setNResult] = useState<number | null>(1);

  // Calculator 3: Mass (m)
  const [mMode, setMMode] = useState<'mol' | 'density'>('mol');
  const [mMoles, setMMoles] = useState('2');
  const [mMolarMass, setMMolarMass] = useState('18');
  const [mVolume, setMVolume] = useState('100');
  const [mDensity, setMDensity] = useState('1.2');
  const [mResult, setMResult] = useState<number | null>(36);

  // Calculator 4: Volume (V)
  const [vMoles, setVMoles] = useState('0.5');
  const [vResult, setVResult] = useState<number | null>(11.2);

  // Calculator 5: Density (ρ = m / V)
  const [rhoMass, setRhoMass] = useState('120');
  const [rhoVolume, setRhoVolume] = useState('100');
  const [rhoResult, setRhoResult] = useState<number | null>(1.2);

  // Calculator 6: Molar Concentration (CM = n / V)
  const [cmMoles, setCmMoles] = useState('1');
  const [cmVolLiters, setCmVolLiters] = useState('0.5');
  const [cmResult, setCmResult] = useState<number | null>(2);

  // Calculator 7: Percentage Concentration (w = m_erigan / m_eritma * 100)
  const [wSolute, setWSolute] = useState('20');
  const [wSolution, setWSolution] = useState('200');
  const [wResult, setWResult] = useState<number | null>(10);

  // Calculator 8: Gas Volume & normal conditions
  const [gasMoles, setGasMoles] = useState('2.5');
  const [gasResult, setGasResult] = useState<number | null>(56);

  // Calculator 10: Equation Balancer Helper
  const [eqInput, setEqInput] = useState('H2 + O2 -> H2O');
  const [eqBalancing, setEqBalancing] = useState(false);
  const [eqResult, setEqResult] = useState<{
    balanced: string;
    reactionType: string;
    explanationSteps: string[];
  } | null>({
    balanced: '2H₂ + O₂ → 2H₂O',
    reactionType: 'Birikish reaksiyasi',
    explanationSteps: [
      'Reagent tomonida 2 ta O atomi bor, mahsulotda (H₂O) esa 1 ta O atomi bor.',
      'H₂O oldiga 2 qo‘yiladi: H₂ + O₂ → 2H₂O',
      'Chapdagi H₂ oldiga 2 qo‘yib vodorodlar tenglashtiriladi: 2H₂ + O₂ → 2H₂O',
    ],
  });

  const calculatorsList = [
    { id: 'molar-mass', title: 'Molyar massa & Mr', icon: FlaskRound },
    { id: 'substance-amount', title: 'Modda miqdori (n)', icon: Scale },
    { id: 'mass-calc', title: 'Massa (m)', icon: Gauge },
    { id: 'volume-calc', title: 'Hajm (V)', icon: Wind },
    { id: 'density-calc', title: 'Zichlik (ρ)', icon: Layers },
    { id: 'molar-conc', title: 'Molyar konsentratsiya (CM)', icon: Beaker },
    { id: 'percent-conc', title: 'Foiz konsentratsiya (w)', icon: Percent },
    { id: 'gas-volume', title: 'Gazlar hajmi (Vm)', icon: Wind },
    { id: 'equation-balancer', title: 'Reaksiya tenglashtirish', icon: Sparkles },
  ];

  // Actions
  const handleCalcMolar = () => {
    const res = calculateMolarMass(formulaInput);
    setMolarResult(res);
  };

  const handleCalcSubstance = () => {
    if (nMode === 'mass') {
      const m = parseFloat(nMass);
      const M = parseFloat(nMolarMass);
      setNResult(M > 0 ? Number((m / M).toFixed(4)) : null);
    } else if (nMode === 'volume') {
      const v = parseFloat(nVolume);
      setNResult(Number((v / 22.4).toFixed(4)));
    } else {
      const N = parseFloat(nParticles);
      setNResult(Number((N / 6.02e23).toFixed(4)));
    }
  };

  const handleCalcMass = () => {
    if (mMode === 'mol') {
      const n = parseFloat(mMoles);
      const M = parseFloat(mMolarMass);
      setMResult(Number((n * M).toFixed(4)));
    } else {
      const V = parseFloat(mVolume);
      const rho = parseFloat(mDensity);
      setMResult(Number((V * rho).toFixed(4)));
    }
  };

  const handleCalcVolume = () => {
    const n = parseFloat(vMoles);
    setVResult(Number((n * 22.4).toFixed(4)));
  };

  const handleCalcDensity = () => {
    const m = parseFloat(rhoMass);
    const v = parseFloat(rhoVolume);
    setRhoResult(v > 0 ? Number((m / v).toFixed(4)) : null);
  };

  const handleCalcMolarConc = () => {
    const n = parseFloat(cmMoles);
    const v = parseFloat(cmVolLiters);
    setCmResult(v > 0 ? Number((n / v).toFixed(4)) : null);
  };

  const handleCalcPercentConc = () => {
    const m1 = parseFloat(wSolute);
    const mTot = parseFloat(wSolution);
    setWResult(mTot > 0 ? Number(((m1 / mTot) * 100).toFixed(3)) : null);
  };

  const handleCalcGasVolume = () => {
    const n = parseFloat(gasMoles);
    setGasResult(Number((n * 22.4).toFixed(3)));
  };

  const handleBalanceEquation = async () => {
    if (!eqInput.trim()) return;
    setEqBalancing(true);
    try {
      const res = await balanceEquationWithAI(eqInput);
      setEqResult(res);
    } finally {
      setEqBalancing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interaktiv Kimyo Kalkulyatorlari</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Kimyoviy kalkulyatorlar
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Molyar massa, modda miqdori, eritmalar, gazlar va reaksiyalarni tenglashtirish uchun aniq hisoblagichlar.
        </p>
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {calculatorsList.map((calc) => {
          const Icon = calc.icon;
          const isActive = activeTab === calc.id;
          return (
            <button
              key={calc.id}
              onClick={() => setActiveTab(calc.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {calc.title}
            </button>
          );
        })}
      </div>

      {/* Calculator Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        {/* 1. Molar Mass / Mr Calculator */}
        {activeTab === 'molar-mass' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Molyar massa va Mr kalkulyatori
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: Mr = Σ(n · Ar) | M = m / n (g/mol)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Input section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Kimyoviy formula:
                  </label>
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    placeholder="Masalan: H2SO4, CaCO3, Al2(SO4)3, CuSO4*5H2O"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                {/* Quick Formula chips */}
                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">Mashhur formulalar:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['H2O', 'CO2', 'H2SO4', 'CaCO3', 'NaOH', 'Al2(SO4)3', 'C6H12O6'].map((f) => (
                      <button
                        key={f}
                        onClick={() => {
                          setFormulaInput(f);
                          setMolarResult(calculateMolarMass(f));
                        }}
                        className="px-2 py-0.5 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-500 transition-colors"
                      >
                        {formatChemicalFormula(f)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleCalcMolar}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    Hisoblash
                  </button>
                  <button
                    onClick={() => {
                      setFormulaInput('');
                      setMolarResult(null);
                    }}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Result card */}
              <div>
                {molarResult && molarResult.isValid ? (
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-semibold text-slate-400">
                        {molarResult.formattedFormula} molyar massasi:
                      </span>
                      <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                        Mr = {molarResult.totalMolarMass}
                      </span>
                    </div>

                    <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                      {molarResult.totalMolarMass}{' '}
                      <span className="text-base font-normal text-slate-500">g/mol</span>
                    </div>

                    {/* Percentage Breakdown */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Elementlarning massaviy ulushi (w%):
                      </div>
                      <div className="space-y-2">
                        {molarResult.breakdown.map((item) => (
                          <div key={item.element} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-mono text-slate-800 dark:text-slate-200">
                                {item.element} ({item.nameUz}) × {item.count}
                              </span>
                              <span className="font-mono font-medium text-cyan-600 dark:text-cyan-400">
                                {item.percentage}% ({item.totalMass} g)
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : molarResult && !molarResult.isValid ? (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{molarResult.errorMessage}</span>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
                    Formula kiriting va "Hisoblash" tugmasini bosing
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Amount of Substance (n) */}
        {activeTab === 'substance-amount' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Modda miqdori kalkulyatori (n)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: n = m / M = V / Vm = N / NA
              </p>
            </div>

            {/* Mode switch */}
            <div className="flex gap-2">
              <button
                onClick={() => setNMode('mass')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  nMode === 'mass'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Massa orqali (n = m / M)
              </button>
              <button
                onClick={() => setNMode('volume')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  nMode === 'volume'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Hajm orqali (n = V / 22.4)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                {nMode === 'mass' ? (
                  <>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Massa (m, gramm):</label>
                      <input
                        type="number"
                        value={nMass}
                        onChange={(e) => setNMass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        Molyar massa (M, g/mol):
                      </label>
                      <input
                        type="number"
                        value={nMolarMass}
                        onChange={(e) => setNMolarMass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Gaz hajmi (V, litr, n.sh.):
                    </label>
                    <input
                      type="number"
                      value={nVolume}
                      onChange={(e) => setNVolume(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                    />
                  </div>
                )}

                <button
                  onClick={handleCalcSubstance}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Modda miqdori (n):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {nResult !== null ? `${nResult} mol` : '-'}
                </div>
                <p className="text-xs text-slate-500">
                  Molekulalar soni: ≈{' '}
                  {nResult ? (nResult * 6.02).toFixed(2) + ' × 10²³ dona' : '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Mass Calculator (m) */}
        {activeTab === 'mass-calc' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Massa kalkulyatori (m)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: m = n · M yoki m = V · ρ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Modda miqdori (n, mol):</label>
                  <input
                    type="number"
                    value={mMoles}
                    onChange={(e) => setMMoles(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Molyar massa (M, g/mol):</label>
                  <input
                    type="number"
                    value={mMolarMass}
                    onChange={(e) => setMMolarMass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcMass}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Modda massasi (m):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {mResult !== null ? `${mResult} g` : '-'}
                </div>
                <p className="text-xs text-slate-500">
                  m = {mMoles} mol × {mMolarMass} g/mol = {mResult} g
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Volume Calculator (V) */}
        {activeTab === 'volume-calc' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Hajm kalkulyatori (V)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: V = n · 22.4 L (normal sharoitda)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Gaz miqdori (n, mol):</label>
                  <input
                    type="number"
                    value={vMoles}
                    onChange={(e) => setVMoles(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcVolume}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Gaz hajmi (V):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {vResult !== null ? `${vResult} L` : '-'}
                </div>
                <p className="text-xs text-slate-500">Normal sharoitda: 1 mol = 22.4 litr</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Density Calculator (ρ = m / V) */}
        {activeTab === 'density-calc' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Zichlik kalkulyatori (ρ)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: ρ = m / V
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Massa (m, gramm):</label>
                  <input
                    type="number"
                    value={rhoMass}
                    onChange={(e) => setRhoMass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Hajm (V, ml yoki cm³):
                  </label>
                  <input
                    type="number"
                    value={rhoVolume}
                    onChange={(e) => setRhoVolume(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcDensity}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Modda zichligi (ρ):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {rhoResult !== null ? `${rhoResult} g/ml` : '-'}
                </div>
                <p className="text-xs text-slate-500">
                  {rhoResult && rhoResult > 1 ? 'Suvdan og‘ir (cho‘kadi)' : 'Suvdan yengil (suzadi)'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Molar Concentration (CM = n / V) */}
        {activeTab === 'molar-conc' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Molyar konsentratsiya kalkulyatori (CM)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: CM = n / V_eritma (mol/L)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Erigan modda miqdori (n, mol):
                  </label>
                  <input
                    type="number"
                    value={cmMoles}
                    onChange={(e) => setCmMoles(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Eritma hajmi (V, litr):
                  </label>
                  <input
                    type="number"
                    value={cmVolLiters}
                    onChange={(e) => setCmVolLiters(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcMolarConc}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Molyarlik (CM):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {cmResult !== null ? `${cmResult} M` : '-'}
                </div>
                <p className="text-xs text-slate-500">1 litr eritmada {cmResult} mol modda bor</p>
              </div>
            </div>
          </div>
        )}

        {/* 7. Percentage Concentration (w = m1 / m_tot * 100) */}
        {activeTab === 'percent-conc' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Foiz konsentratsiya (Massa ulushi, w)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: w = (m_erigan / m_eritma) · 100%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Erigan modda massasi (m_erigan, g):
                  </label>
                  <input
                    type="number"
                    value={wSolute}
                    onChange={(e) => setWSolute(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Eritmaning umumiy massasi (m_eritma, g):
                  </label>
                  <input
                    type="number"
                    value={wSolution}
                    onChange={(e) => setWSolution(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcPercentConc}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Foiz konsentratsiya (w):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {wResult !== null ? `${wResult}%` : '-'}
                </div>
                <p className="text-xs text-slate-500">
                  100 g eritmada {wResult} g toza erigan modda bor
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 8. Gas Volume (V = n · 22.4) */}
        {activeTab === 'gas-volume' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Gazlarning normal sharoitdagi hajmi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Formula: V = n · 22.4 L/mol (Avogadro qonuni)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Gaz miqdori (n, mol):
                  </label>
                  <input
                    type="number"
                    value={gasMoles}
                    onChange={(e) => setGasMoles(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={handleCalcGasVolume}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors"
                >
                  Hisoblash
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-xs uppercase text-slate-400">Hajm (n.sh.):</span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {gasResult !== null ? `${gasResult} L` : '-'}
                </div>
                <p className="text-xs text-slate-500">Harorat 0°C va bosim 101.3 kPa da</p>
              </div>
            </div>
          </div>
        )}

        {/* 10. Equation Balancer Helper */}
        {activeTab === 'equation-balancer' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Reaksiya tenglashtirish yordamchisi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Kimyoviy tenglamadagi atomlarni muvozanatlash va tushuntirish
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Reaksiya tenglamasini kiriting:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={eqInput}
                    onChange={(e) => setEqInput(e.target.value)}
                    placeholder="Masalan: H2 + O2 -> H2O yoki Al + HCl -> AlCl3 + H2"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <button
                    onClick={handleBalanceEquation}
                    disabled={eqBalancing}
                    className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all flex items-center gap-2"
                  >
                    {eqBalancing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Tenglashtirish
                  </button>
                </div>
              </div>

              {/* Sample Equations */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400">Namunalar:</span>
                {['H2 + O2 -> H2O', 'CH4 + O2 -> CO2 + H2O', 'Al + HCl -> AlCl3 + H2', 'Fe + O2 -> Fe2O3'].map(
                  (sample) => (
                    <button
                      key={sample}
                      onClick={() => {
                        setEqInput(sample);
                      }}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-500 transition-colors"
                    >
                      {sample}
                    </button>
                  )
                )}
              </div>

              {/* Balanced output card */}
              {eqResult && (
                <div className="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-semibold text-slate-400">
                      Tenglashtirilgan reaksiya:
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-medium border border-cyan-500/20">
                      {eqResult.reactionType}
                    </span>
                  </div>

                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-600 dark:text-cyan-300 py-2">
                    {formatChemicalFormula(eqResult.balanced)}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                      Qanday tenglashtirildi? (Tushuntirish):
                    </div>
                    <ul className="space-y-1.5">
                      {eqResult.explanationSteps.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                          <span>{formatChemicalFormula(step)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
