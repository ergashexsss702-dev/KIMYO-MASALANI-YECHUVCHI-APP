import { GradeInfo, Topic } from '../types';

export const GRADES_DATA: GradeInfo[] = [
  {
    grade: 5,
    title: '5-Sinf: Tabiatshunoslik va Kimyoga kirish',
    subtitle: 'Moddalar dunyosi va ilk ilmiy tushunchalar',
    description: 'Atrofdagi moddalar, ularning xossalari, laboratoriya xavfsizligi va oddiy tajribalar bilan tanishish.',
    topicsCount: 6,
    highlightTopics: ['Moddalar va jismlar', 'Fizik va kimyoviy xossalar', 'Laboratoriya xavfsizligi', 'Oddiy aralashmalar'],
  },
  {
    grade: 6,
    title: '6-Sinf: Atomlar va Molekulalar',
    subtitle: 'Mikrodunyo sirlari va zarrachalar tuzilishi',
    description: 'Atom va molekulalarning mohiyati, oddiy va murakkab moddalar, aralashmalarni tozalash usullari.',
    topicsCount: 6,
    highlightTopics: ['Atom va molekula', 'Oddiy va murakkab moddalar', 'Aralashmalarni ajratish', 'Diffuziya'],
  },
  {
    grade: 7,
    title: '7-Sinf: Boshlang‘ich Kimyo Asoslari',
    subtitle: 'Kimyo tili, formulalar va valentlik',
    description: 'Kimyoviy belgilar, indekslar, moddalarning nisbiy atom va molekulyar massalari, valentlik tushunchasi.',
    topicsCount: 7,
    highlightTopics: ['Kimyoviy belgilar', 'Valentlik', 'Nisbiy molekulyar massa (Mr)', 'Massaning saqlanish qonuni'],
  },
  {
    grade: 8,
    title: '8-Sinf: Anorganik Moddalarning Asosiy Sinflari',
    subtitle: 'Oksidlar, asoslar, kislotalar va tuzlar',
    description: 'Kimyoviy reaksiyalar turlari, tenglashtirish, anorganik birikmalar sinflari va ularning o‘zaro bog‘liqligi.',
    topicsCount: 8,
    highlightTopics: ['Oksidlar va ularning xossalari', 'Asoslar va ishqorlar', 'Kislotalar', 'Tuzlar va ularni olish'],
  },
  {
    grade: 9,
    title: '9-Sinf: Davriy Qonun va Moddalar Tuzilishi',
    subtitle: 'Mendeleyev davriy sistemasi va elementlar oilalari',
    description: 'Davriy qonun, atom tuzilishi, kimyoviy bog‘lanish turlari, metallar va nometallar kimyosi.',
    topicsCount: 8,
    highlightTopics: ['Mendeleyev davriy qonuni', 'Kimyoviy bog‘lanish', 'Oksidlanish darajasi', 'Galogenlar va metallar'],
  },
  {
    grade: 10,
    title: '10-Sinf: Organik Kimyoga Kirish',
    subtitle: 'Uglevodorodlar va ularning hosilalari',
    description: 'A.M. Butlerov tuzilish nazariyasi, to‘yingan va to‘yinmagan uglevodorodlar, kislorodli organik birikmalar.',
    topicsCount: 8,
    highlightTopics: ['Alkanlar va gomologik qator', 'Alkenlar va alkinlar', 'Aromatik uglevodorodlar', 'Spirtlar va kislotalar'],
  },
  {
    grade: 11,
    title: '11-Sinf: Yuqori Molekulyar Birikmalar va Masalalar',
    subtitle: 'Biopolimerlar, eritma hisoblari va DTM darajasidagi masalalar',
    description: 'Uglevodlar, aminokislotalar, oqsillar, polimerlar, eritmalar konsentratsiyasi va chuqurlashtirilgan hisoblashlar.',
    topicsCount: 8,
    highlightTopics: ['Uglevodlar (Glyukoza, Saxaroza)', 'Oqsillar va fermentlar', 'Polimerlar va plastmassalar', 'Eritmalar va stokiometriya'],
  },
];

export const TOPICS_DATA: Topic[] = [
  // 5-SINF
  {
    id: 'top-5-1',
    grade: 5,
    title: 'Moddalar va jismlar',
    shortDesc: 'Jism va modda orasidagi asosiy farqlar, moddalarning uch holati.',
    difficulty: 'Oson',
    theory: [
      'Bizni o‘rab turgan barcha narsalar jismlar deyiladi (masalan, stakan, qalam, mix).',
      'Jismlar nimadan tuzilgan bo‘lsa, o‘sha narsa modda deyiladi. Masalan: shisha (modda) → stakan (jism); temir (modda) → mix (jism).',
      'Moddalar tabiatda uch asosiy agregat holatda uchraydi: qattiq, suyuq va gazsimon.',
    ],
    keyFormulas: ['Jism = Shakl + Hajm', 'Modda = Zarrachalar to‘plami'],
    importantRules: [
      'Jismlarning aniq shakli va hajmi bo‘ladi.',
      'Bitta moddadan bir necha xil jism yasash mumkin (masalan, loydan piyola va ko‘za).',
    ],
    examples: [
      {
        title: 'Misol 1: Jism va moddani ajrating',
        problem: 'Quyidagilardan qaysilari jism va qaysilari modda: temir, mix, suv, stakan, mis qoshiq?',
        given: ['Ro‘yxat: temir, mix, suv, stakan, mis qoshiq'],
        solution: [
          'Jismlar (aniq shaklga ega buyumlar): mix, stakan, mis qoshiq.',
          'Moddalar (jismlarni tashkil qilgan material): temir, suv, mis.',
        ],
        answer: 'Jismlar: mix, stakan, qoshiq. Moddalar: temir, suv, mis.',
      },
    ],
    practicalUses: 'Oshxonadagi idishlar, qurilish materiallari va tabiat hodisalarini tushunishda poydevor hisoblanadi.',
  },
  {
    id: 'top-5-2',
    grade: 5,
    title: 'Fizik va kimyoviy hodisalar',
    shortDesc: 'Moddaning o‘zi o‘zgarmaydigan va yangi moddaga aylanadigan jarayonlar.',
    difficulty: 'Oson',
    theory: [
      'Fizik hodisalarda moddaning tarkibi o‘zgarmaydi, faqat shakli yoki agregat holati o‘zgaradi (masalan, muzning erishi, qog‘ozning yirtilishi).',
      'Kimyoviy hodisalarda (reaksiyalarda) bir moddadan butunlay yangi moddalar hosil bo‘ladi (masalan, temirning zanglashi, yog‘ochning yonishi, sutning achishi).',
      'Kimyoviy hodisalarning belgilari: rang o‘zgarishi, gaz ajralishi, cho‘kma tushishi, issiqlik yoki yorug‘lik chiqishi.',
    ],
    keyFormulas: ['Fizik hodisa: A (holat 1) ⇄ A (holat 2)', 'Kimyoviy hodisa: A + B → C + D'],
    importantRules: [
      'Agar yangi xid, rang yoki issiqlik paydo bo‘lsa — bu ko‘pincha kimyoviy jarayon.',
      'Suv bug‘langanda yana suv bo‘lib qoladi — bu fizik hodisa.',
    ],
    examples: [
      {
        title: 'Misol 1: Hodisa turini aniqlash',
        problem: 'Muzning erishi va qandning kuyishi qanday hodisalarga kiradi?',
        given: ['Jarayon 1: Muzning erishi', 'Jarayon 2: Qandning kuyishi'],
        solution: [
          'Muz eriganda H₂O suyuq H₂O ga aylanadi, yangi modda hosil bo‘lmaydi. Demak, bu fizik hodisa.',
          'Qand qizdirilganda qorayadi, kuyik hidi chiqadi va ko‘mirga aylanadi. Bu kimyoviy hodisa.',
        ],
        answer: 'Muz erishi — fizik hodisa; Qand kuyishi — kimyoviy hodisa.',
      },
    ],
    practicalUses: 'Ovqat pishirish, metallarni zangdan asrash va sovitkichlar ishlash prinsipini bilishda kerak.',
  },

  // 7-SINF
  {
    id: 'top-7-1',
    grade: 7,
    title: 'Kimyoviy belgilar va nisbiy atom massasi (Ar)',
    shortDesc: 'Elementlar belgilanishi, lotincha nomlar va massalar.',
    difficulty: 'Oson',
    theory: [
      'Har bir kimyoviy element o‘zining qisqa lotincha belgisi bilan yoziladi (I. Berselius taklifi bo‘yicha).',
      'Nisbiy atom massasi (Ar) — atom massasining uglerod birligi (uglerod-12 atomi massasining 1/12 qismi)ga nisbati.',
      'Ar o‘lchovsiz birlik bo‘lib, Mendeleyev davriy jadvalidan olinadi va odatda yaxlitlanadi (faqat Cl = 35.5 olinadi).',
    ],
    keyFormulas: ['Ar(E) = m_atom / (1/12 · m(¹²C))', 'Ar(H) ≈ 1', 'Ar(O) ≈ 16', 'Ar(Fe) ≈ 56'],
    importantRules: [
      'Uglerod atomining 1/12 qismi = 1.66 × 10⁻²⁴ g.',
      'Xlor uchun Ar = 35.5 deb qabul qilingan.',
    ],
    examples: [
      {
        title: 'Misol: Nisbiy atom massalarini topish',
        problem: 'Kislorod, Natriy va Kalsiy elementlarining Ar qiymatlarini aniqlang.',
        given: ['Elementlar: O, Na, Ca'],
        solution: [
          'Davriy jadvaldan qaraymiz:',
          'O: 15.999 ≈ 16',
          'Na: 22.990 ≈ 23',
          'Ca: 40.078 ≈ 40',
        ],
        answer: 'Ar(O) = 16, Ar(Na) = 23, Ar(Ca) = 40.',
      },
    ],
    practicalUses: 'Barcha kimyoviy hisob-kitoblar va farmatsevtik dorilar tayyorlashning asosiy tayanchi.',
  },
  {
    id: 'top-7-2',
    grade: 7,
    title: 'Nisbiy molekulyar massa (Mr) va valentlik',
    shortDesc: 'Moddalarning Mr qiymatini hisoblash va formulalar tuzish.',
    difficulty: "O'rta",
    theory: [
      'Nisbiy molekulyar massa (Mr) — molekulani tashkil etgan barcha atomlarning nisbiy atom massalari yig‘indisiga teng.',
      'Valentlik — bir element atomining boshqa element atomlarining ma’lum sonini o‘ziga biriktirib olish yoki o‘rnini olish xossasi.',
      'Vodorod doimo I valentli, Kislorod doimo II valentli deb qabul qilingan.',
    ],
    keyFormulas: [
      'Mr(AxBy) = x · Ar(A) + y · Ar(B)',
      'Valentlik: I, II, III, IV, V, VI, VII',
      'w(E) = (n · Ar(E) / Mr) · 100%',
    ],
    importantRules: [
      'Binar birikmalarda bir element valentligi bilan atomlar soni ko‘paytmasi ikkinchi elementnikiga teng bo‘lishi kerak.',
      'Mr hisoblanganda indekslar atom massalariga ko‘paytiriladi.',
    ],
    examples: [
      {
        title: 'Misol 1: H₂SO₄ ning Mr ini hisoblash',
        problem: 'Sulfat kislota (H₂SO₄) ning nisbiy molekulyar massasini hisoblang.',
        given: ['Formula: H₂SO₄', 'Ar(H) = 1, Ar(S) = 32, Ar(O) = 16'],
        solution: [
          'Mr(H₂SO₄) = 2 · Ar(H) + 1 · Ar(S) + 4 · Ar(O)',
          'Mr(H₂SO₄) = 2 · 1 + 32 + 4 · 16 = 2 + 32 + 64 = 98',
        ],
        answer: 'Mr(H₂SO₄) = 98',
      },
      {
        title: 'Misol 2: Kislorodning massa ulushini topish',
        problem: 'Suv (H₂O) tarkibidagi kislorodning massa ulushini foizda hisoblang.',
        given: ['H₂O', 'Mr(H₂O) = 18', 'Ar(O) = 16'],
        solution: [
          'w(O) = (1 · 16 / 18) · 100%',
          'w(O) = 16 / 18 · 100% ≈ 88.89%',
        ],
        answer: 'w(O) = 88.89%',
      },
    ],
    practicalUses: 'O‘g‘itlardagi foydali ozuqa moddalari foizini hisoblashda qo‘llaniladi.',
  },

  // 8-SINF
  {
    id: 'top-8-1',
    grade: 8,
    title: 'Modda miqdori (Mol), Molyar massa (M) va Avogadro soni',
    shortDesc: 'Stokiometriyaning eng muhim qonuni: n, m, M, N, NA.',
    difficulty: "O'rta",
    theory: [
      'Modda miqdori (n) — berilgan namunadagi mikrozarrachalar (atom, molekula) sonini ifodalovchi kattalik. Birligi: mol.',
      '1 mol moddada 6.02 × 10²³ ta zarracha bo‘ladi. Bu son Avogadro doimiysi (NA) deyiladi.',
      'Molyar massa (M) — 1 mol moddaning massasi bo‘lib, son jihatdan Mr ga teng, birligi g/mol.',
      'Gazlarning normal sharoitdagi molyar hajmi Vm = 22.4 l/mol ga teng.',
    ],
    keyFormulas: [
      'n = m / M',
      'm = n · M',
      'n = N / NA  (NA = 6.02 × 10²³ mol⁻¹)',
      'n = V / Vm  (Vm = 22.4 l/mol n.sh.da)',
    ],
    importantRules: [
      '1 mol har qanday gaz normal sharoitda (0°C va 101.3 kPa) 22.4 litr hajm egallaydi.',
      'Son jihatdan M(g/mol) = Mr.',
    ],
    examples: [
      {
        title: 'Misol: 36 g suvda necha mol modda bor?',
        problem: '36 g suvning (H₂O) modda miqdorini va molekulalar sonini hisoblang.',
        given: ['m(H₂O) = 36 g', 'M(H₂O) = 18 g/mol', 'NA = 6.02 × 10²³ mol⁻¹'],
        solution: [
          '1. Modda miqdorini topamiz: n = m / M = 36 g / 18 g/mol = 2 mol.',
          '2. Molekulalar sonini topamiz: N = n · NA = 2 · 6.02 × 10²³ = 1.204 × 10²⁴ ta molekula.',
        ],
        answer: 'n = 2 mol, N = 1.204 × 10²⁴ ta molekula.',
      },
    ],
    practicalUses: 'Kimyoviy zavodlarda xomashyo sarfini hisoblash va reaktorlarni to‘ldirishda asosiy vosita.',
  },
  {
    id: 'top-8-2',
    grade: 8,
    title: 'Oksidlar, kislotalar, asoslar va tuzlar',
    shortDesc: 'Anorganik birikmalarning to‘rtta asosiy sinfi va ularning reaksiyalari.',
    difficulty: 'Murakkab',
    theory: [
      'Oksidlar — ikki elementdan tashkil topgan, biri kislorod bo‘lgan murakkab moddalar (asosli: CaO, kislotali: SO₃, amfoter: Al₂O₃).',
      'Asoslar — metall atomi va gidroksid guruh(lar)idan tashkil topgan moddalar (NaOH, Ca(OH)₂). Suvda eriydigan asoslar ishqorlar deyiladi.',
      'Kislotalar — vodorod atomi va kislota qoldig‘idan iborat moddalar (HCl, H₂SO₄, HNO₃).',
      'Tuzlar — metall atomi va kislota qoldig‘idan tashkil topgan birikmalar (NaCl, CaCO₃, CuSO₄).',
    ],
    keyFormulas: [
      'Asosli oksid + Kislota → Tuz + Suv',
      'Kislotali oksid + Asos → Tuz + Suv',
      'Kislota + Asos → Tuz + Suv (Neytrallanish)',
      'Tuz + Ishqor → Cho‘kma/Yangi tuz + Yangi asos',
    ],
    importantRules: [
      'Neytrallanish reaksiyasi: H⁺ + OH⁻ → H₂O.',
      'Kislotada lakmus qizaradi, ishqorda ko‘karadi, fenolftalein esa ishqorda malina rangga kiradi.',
    ],
    examples: [
      {
        title: 'Misol: Reaksiyani yakunlash',
        problem: 'Kalsiy oksidi va sulfat kislota orasidagi reaksiyani yozing va tenglashtiring.',
        given: ['CaO + H₂SO₄ → ?'],
        solution: [
          'Asosli oksid + kislota reaksiyaga kirishib tuz va suv beradi.',
          'CaO + H₂SO₄ → CaSO₄ + H₂O',
          'Koeffitsientlar 1:1:1:1 teng holatda.',
        ],
        answer: 'CaO + H₂SO₄ → CaSO₄ + H₂O',
      },
    ],
    practicalUses: 'Tuproqning kislotaliligini ohaklash orqali kamaytirish, akkumulyator kislotasi va osh tuzi ishlab chiqarish.',
  },

  // 9-SINF
  {
    id: 'top-9-1',
    grade: 9,
    title: 'Mendeleyev davriy qonuni va atom tuzilishi',
    shortDesc: 'Elektron qobiqlar, davriy qonuniyatlar va elementlar xossalari.',
    difficulty: "O'rta",
    theory: [
      'Elementlar va ular hosil qilgan oddiy va murakkab moddalarning xossalari atom yadrosi zaryadining ortib borishiga davriy bog‘liqdir.',
      'Atom markazida musbat zaryadlangan yadro (protonlar p⁺ va neytronlar n⁰) va uning atrofida aylanuvchi elektronlar e⁻ mavjud.',
      'Yadro zaryadi = Tartib raqam = Protonlar soni = Elektronlar soni.',
      'Davr raqami — energetik pog‘onalar (qobiqlar) sonini ko‘rsatadi.',
      'Guruh raqami — asosiy guruhcha elementlarining tashqi qavatidagi elektronlar sonini ko‘rsatadi.',
    ],
    keyFormulas: [
      'Z = N(p⁺) = N(e⁻)',
      'A = Z + N(n⁰)  (Neytronlar soni = A - Z)',
      'Maksimal elektronlar: N = 2n²',
    ],
    importantRules: [
      'Davrda chapdan o‘ngga qarab: metallik xossa kamayadi, nometallik kuchayadi, elektromanfiylik ortadi.',
      'Guruhda yuqoridan pastga qarab: atom radiusi kattalashadi, metallik xossasi kuchayadi.',
    ],
    examples: [
      {
        title: 'Misol: Xlor atomining tuzilishi',
        problem: 'Xlor (¹⁷Cl, Ar=35.5 ≈ 35) atomidagi proton, neytron va elektronlar sonini toping.',
        given: ['Element: Cl', 'Tartib raqami Z = 17', 'Massa soni A = 35'],
        solution: [
          'Protonlar soni: p⁺ = Z = 17',
          'Elektronlar soni: e⁻ = Z = 17',
          'Neytronlar soni: n⁰ = A - Z = 35 - 17 = 18',
        ],
        answer: '17 ta proton, 18 ta neytron, 17 ta elektron.',
      },
    ],
    practicalUses: 'Yangi materiallar, yarimo‘tkazgichlar va nanomateriallar sintezida yo‘naltiruvchi kompas.',
  },
  {
    id: 'top-9-2',
    grade: 9,
    title: 'Eritmalar va erigan moddaning massa ulushi (w)',
    shortDesc: 'Foiz konsentratsiyasi, suv va tuz massalarini hisoblash.',
    difficulty: "O'rta",
    theory: [
      'Eritma — ikki yoki undan ortiq moddalardan tashkil topgan bir jinsli (gomogen) sistema.',
      'Eritma massasi = Erigan modda massasi + Erituvchi (suv) massasi.',
      'Erigan moddaning massa ulushi (w) — erigan modda massasining eritma umumiy massasiga nisbati.',
    ],
    keyFormulas: [
      'm(eritma) = m(erigan modda) + m(suv)',
      'w = (m(erigan) / m(eritma)) · 100%',
      'm(erigan) = m(eritma) · (w / 100%)',
      'm(suv) = m(eritma) - m(erigan)',
    ],
    importantRules: [
      'Suvning zichligi ρ = 1 g/ml bo‘lgani uchun 100 ml suv = 100 g suv deb olinadi.',
      'Ikki eritma aralashtirilganda: m₁w₁ + m₂w₂ = (m₁ + m₂)w_aralashma.',
    ],
    examples: [
      {
        title: 'Misol: 10% li eritma tayyorlash',
        problem: '200 g 10% li tuz eritmasi tayyorlash uchun necha gramm tuz va necha gramm suv kerak?',
        given: ['m(eritma) = 200 g', 'w = 10%'],
        solution: [
          '1. Erigan tuz massasini topamiz: m(tuz) = 200 · (10 / 100) = 20 g.',
          '2. Suv massasini topamiz: m(suv) = m(eritma) - m(tuz) = 200 - 20 = 180 g.',
        ],
        answer: '20 g tuz va 180 g (yoki 180 ml) suv kerak.',
      },
    ],
    practicalUses: 'Tibbiyotda fiziologik eritma (0.9% NaCl), qishloq xo‘jaligida dorilar va oziq-ovqat konservalashda keng qo‘llaniladi.',
  },

  // 10-SINF
  {
    id: 'top-10-1',
    grade: 10,
    title: 'To‘yingan uglevodorodlar: Alkanlar',
    shortDesc: 'Metan qatori uglevodorodlari, gomologiya, izomeriya va reaksiyalar.',
    difficulty: "O'rta",
    theory: [
      'Alkanlar (parafinlar) — umumiy formulasi CnH₂n+₂ bo‘lgan, molekulasidagi uglerod atomlari faqat oddiy (σ - sigma) bog‘lar bilan bog‘langan to‘yingan uglevodorodlar.',
      'Gomologik qator: Metan (CH₄), Etan (C₂H₆), Propan (C₃H₈), Butan (C₄H₁₀), Pentan (C₅H₁₂), Geksan (C₆H₁₄) va h.k.',
      'Gibridlanish: sp³ gibridlangan, bog‘ burchagi 109°28\', fazoviy tuzilishi tetraedr.',
      'Kimyoviy xossalari: radikal almashinish reaksiyalari (galogenlanish), yonish, degidrogenlanish va kreking.',
    ],
    keyFormulas: [
      'Umumiy formula: CnH₂n+₂',
      'Yonish: CnH₂n+₂ + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O',
      'Xlorlanish: CH₄ + Cl₂ → CH₃Cl + HCl (yorug‘lik ta’sirida)',
    ],
    importantRules: [
      'Alkanlar birikish reaksiyasiga kirishmaydi, chunki barcha valentliklar to‘yingan.',
      'Izomeriya C₄H₁₀ (butan) dan boshlanadi (n-butan va izobutan).',
    ],
    examples: [
      {
        title: 'Misol: 1 mol propan yonganda ajraladigan CO₂',
        problem: '44 g propan (C₃H₈) to‘liq yonganda necha litr (n.sh.) karbonat angidrid hosil bo‘ladi?',
        given: ['m(C₃H₈) = 44 g', 'M(C₃H₈) = 44 g/mol', 'Vm = 22.4 l/mol'],
        solution: [
          '1. Reaksiya tenglamasi: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
          '2. Propan modda miqdori: n = 44 / 44 = 1 mol.',
          '3. Tenglama bo‘yicha: 1 mol C₃H₈ dan 3 mol CO₂ chiqadi.',
          '4. Hajmni hisoblaymiz: V(CO₂) = 3 mol · 22.4 l/mol = 67.2 litr.',
        ],
        answer: 'V(CO₂) = 67.2 litr.',
      },
    ],
    practicalUses: 'Tabiiy gaz (metan), suyultirilgan gaz balonlari (propan-butan), benzin va kerosin yoqilg‘ilari.',
  },
  {
    id: 'top-10-2',
    grade: 10,
    title: 'Kislorodli organik moddalar: Spirtlar va Karbon kislotalar',
    shortDesc: 'Etanol, sirka kislota, vodorod bog‘lanish va efirlanish reaksiyasi.',
    difficulty: 'Murakkab',
    theory: [
      'Bir atomli spirtlar — umumiy formulasi CnH₂n+₁OH bo‘lgan, uglevodorod radikaliga gidroksil guruhi (-OH) birikkan moddalar (metanol CH₃OH, etanol C₂H₅OH).',
      'Karbon kislotalar — molekulasida karboksil guruhi (-COOH) tutgan moddalar (chumoli kislota HCOOH, sirka kislota CH₃COOH).',
      'Efirlanish reaksiyasi: spirt va karbon kislota sulfat kislota ishtirokida reaksiyaga kirishib murakkab efir va suv hosil qiladi.',
    ],
    keyFormulas: [
      'Spirtlar: R-OH (CnH₂n+₁OH)',
      'Karbon kislotalar: R-COOH (CnH₂n+₁COOH)',
      'Efirlanish: R-COOH + R\'-OH ⇄ R-COO-R\' + H₂O',
    ],
    importantRules: [
      'Spirtlar molekulalari orasida vodorod bog‘ mavjud bo‘lgani uchun qaynash harorati yuqori.',
      'Metanol (CH₃OH) kuchli zahar, ko‘rish qobiliyatini yo‘qotadi va o‘limga olib keladi.',
    ],
    examples: [
      {
        title: 'Misol: Sirka etil efiri olinishi',
        problem: 'Sirka kislota va etil spirtining efirlanish reaksiyasini yozing.',
        given: ['CH₃COOH + C₂H₅OH'],
        solution: [
          'CH₃COOH + C₂H₅OH ⇄ CH₃COOC₂H₅ + H₂O',
          'Natijada etilatsetat (xushbo‘y hidli murakkab efir) va suv hosil bo‘ladi.',
        ],
        answer: 'CH₃COOC₂H₅ (sirka etil efiri) hosil bo‘ladi.',
      },
    ],
    practicalUses: 'Atir-upa, erituvchilar, dori vositalari va oziq-ovqat sirkasi tayyorlash.',
  },

  // 11-SINF
  {
    id: 'top-11-1',
    grade: 11,
    title: 'Yuqori molekulyar birikmalar va Polimerlar',
    shortDesc: 'Polimerlanish, polikondensatlanish, plastmassalar va sintetik tolalar.',
    difficulty: "O'rta",
    theory: [
      'Polimerlar — ko‘p sonli monomer zarrachalarning bir-biri bilan kimyoviy bog‘lanishi natijasida hosil bo‘lgan ulkan molekulalar.',
      'Monomer — polimer hosil qiluvchi dastlabki quyi molekulyar modda (masalan, etilen CH₂=CH₂).',
      'Polimerlanish darajasi (n) — polimer makromolekulasidagi takrorlanuvchi elementar bo‘g‘inlar soni.',
      'Plastmassalar: Polietilen, polipropilen, teflon, polivinilxlorid (PVX).',
    ],
    keyFormulas: [
      'n CH₂=CH₂ → (-CH₂-CH₂-)n  (Polietilen)',
      'M(polimer) = n · M(monomer)',
      'n = M(polimer) / M(monomer)',
    ],
    importantRules: [
      'Polimerlanishda qo‘shimcha kichik molekula ajralmaydi.',
      'Polikondensatlanishda esa polimer bilan birga suv (H₂O) yoki ammiak (NH₃) kabi qo‘shimcha moddalar ajraladi.',
    ],
    examples: [
      {
        title: 'Misol: Polimerlanish darajasini topish',
        problem: 'Molyar massasi 56 000 g/mol bo‘lgan polietilenning polimerlanish darajasini aniqlang.',
        given: ['M(polimer) = 56 000 g/mol', 'Monomer: Etilen C₂H₄', 'M(C₂H₄) = 28 g/mol'],
        solution: [
          'n = M(polimer) / M(monomer)',
          'n = 56 000 / 28 = 2000',
        ],
        answer: 'Polimerlanish darajasi n = 2000 ta bo‘g‘in.',
      },
    ],
    practicalUses: 'Kiyim tolalari (neylon, kapron), plastik quvurlar, tibbiy shpritslar va zamonaviy kompozit materiallar.',
  },
  {
    id: 'top-11-2',
    grade: 11,
    title: 'Biokimyoviy moddalar: Uglevodlar, Oqsillar va Fermentlar',
    shortDesc: 'Hayotning kimyoviy asoslari: glyukoza, fotosintez, aminokislotalar va peptid bog‘lar.',
    difficulty: 'Murakkab',
    theory: [
      'Uglevodlar — umumiy formulasi Cn(H₂O)m bo‘lgan organik birikmalar. Monosaxaridlar (glyukoza C₆H₁₂O₆), disaxaridlar (saxaroza C₁₂H₂₂O₁₁) va polisaxaridlar (kraxmal, sellyuloza).',
      'Fotosintez jarayoni: 6CO₂ + 6H₂O + quyosh nuri → C₆H₁₂O₆ + 6O₂.',
      'Oqsillar — α-aminokislotalarning peptid (-CO-NH-) bog‘lari orqali bog‘lanishidan hosil bo‘lgan biopolimerlar.',
      'Fermentlar — organizmdagi biokimyoviy jarayonlarni millionlab marta tezlashtiruvchi oqsil tabiatli biologik katalizatorlar.',
    ],
    keyFormulas: [
      'Fotosintez: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
      'Glyukozaning achishi: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑',
      'Peptid bog‘i: -CO-NH-',
    ],
    importantRules: [
      'Kraxmal yod ta’sirida ko‘k rang beradi (sifat reaksiyasi).',
      'Oqsillar yuqori harorat, kislota yoki og‘ir metallar ta’sirida denaturatsiyaga uchraydi (tuzilishi buziladi).',
    ],
    examples: [
      {
        title: 'Misol: Fotosintezda ajralgan kislorod',
        problem: 'O‘simlik 180 g glyukoza (C₆H₁₂O₆) hosil qilishi uchun necha litr (n.sh.) O₂ havoga chiqaradi?',
        given: ['m(C₆H₁₂O₆) = 180 g', 'M(C₆H₁₂O₆) = 180 g/mol', 'Vm = 22.4 l/mol'],
        solution: [
          '1. Reaksiya: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
          '2. Glyukoza miqdori: n = 180 / 180 = 1 mol.',
          '3. 1 mol glyukoza uchun 6 mol O₂ ajraladi.',
          '4. V(O₂) = 6 · 22.4 = 134.4 litr.',
        ],
        answer: 'V(O₂) = 134.4 litr kislorod hosil bo‘ladi.',
      },
    ],
    practicalUses: 'Tibbiyot, biotexnologiya, non yopish va oziq-ovqat sanoati.',
  },
];
