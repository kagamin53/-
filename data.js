// ============================================================
// World Cup 2026 AI Lab - Data File
// ============================================================

// --------------------------------------------------
// 1. TEAMS - All 48 World Cup 2026 Teams
// --------------------------------------------------
const TEAMS = [
  // Group A
  { name: 'アメリカ', nameEn: 'USA', flag: '🇺🇸', group: 'A', fifaRanking: 11, confederation: 'CONCACAF', colors: { primary: '#002868', secondary: '#BF0A30' } },
  { name: 'クロアチア', nameEn: 'Croatia', flag: '🇭🇷', group: 'A', fifaRanking: 7, confederation: 'UEFA', colors: { primary: '#FF0000', secondary: '#FFFFFF' } },
  { name: 'パナマ', nameEn: 'Panama', flag: '🇵🇦', group: 'A', fifaRanking: 43, confederation: 'CONCACAF', colors: { primary: '#DA121A', secondary: '#FFFFFF' } },
  { name: 'ケニア', nameEn: 'Kenya', flag: '🇰🇪', group: 'A', fifaRanking: 98, confederation: 'CAF', colors: { primary: '#006600', secondary: '#BB0000' } },

  // Group B
  { name: 'ブラジル', nameEn: 'Brazil', flag: '🇧🇷', group: 'B', fifaRanking: 3, confederation: 'CONMEBOL', colors: { primary: '#FFDF00', secondary: '#009C3B' } },
  { name: 'コロンビア', nameEn: 'Colombia', flag: '🇨🇴', group: 'B', fifaRanking: 12, confederation: 'CONMEBOL', colors: { primary: '#FCD116', secondary: '#003893' } },
  { name: 'カナダ', nameEn: 'Canada', flag: '🇨🇦', group: 'B', fifaRanking: 40, confederation: 'CONCACAF', colors: { primary: '#FF0000', secondary: '#FFFFFF' } },
  { name: 'ニュージーランド', nameEn: 'New Zealand', flag: '🇳🇿', group: 'B', fifaRanking: 93, confederation: 'OFC', colors: { primary: '#FFFFFF', secondary: '#000000' } },

  // Group C
  { name: 'アルゼンチン', nameEn: 'Argentina', flag: '🇦🇷', group: 'C', fifaRanking: 1, confederation: 'CONMEBOL', colors: { primary: '#75AADB', secondary: '#FFFFFF' } },
  { name: 'ペルー', nameEn: 'Peru', flag: '🇵🇪', group: 'C', fifaRanking: 32, confederation: 'CONMEBOL', colors: { primary: '#D91023', secondary: '#FFFFFF' } },
  { name: 'エジプト', nameEn: 'Egypt', flag: '🇪🇬', group: 'C', fifaRanking: 36, confederation: 'CAF', colors: { primary: '#C8102E', secondary: '#FFFFFF' } },
  { name: 'オーストラリア', nameEn: 'Australia', flag: '🇦🇺', group: 'C', fifaRanking: 24, confederation: 'AFC', colors: { primary: '#FFB81C', secondary: '#008751' } },

  // Group D
  { name: 'フランス', nameEn: 'France', flag: '🇫🇷', group: 'D', fifaRanking: 2, confederation: 'UEFA', colors: { primary: '#002395', secondary: '#FFFFFF' } },
  { name: 'エクアドル', nameEn: 'Ecuador', flag: '🇪🇨', group: 'D', fifaRanking: 33, confederation: 'CONMEBOL', colors: { primary: '#FFD100', secondary: '#003DA5' } },
  { name: 'サウジアラビア', nameEn: 'Saudi Arabia', flag: '🇸🇦', group: 'D', fifaRanking: 56, confederation: 'AFC', colors: { primary: '#006C35', secondary: '#FFFFFF' } },
  { name: '中国', nameEn: 'China', flag: '🇨🇳', group: 'D', fifaRanking: 78, confederation: 'AFC', colors: { primary: '#DE2910', secondary: '#FFFFFF' } },

  // Group E
  { name: 'スペイン', nameEn: 'Spain', flag: '🇪🇸', group: 'E', fifaRanking: 5, confederation: 'UEFA', colors: { primary: '#AA151B', secondary: '#F1BF00' } },
  { name: 'チリ', nameEn: 'Chile', flag: '🇨🇱', group: 'E', fifaRanking: 35, confederation: 'CONMEBOL', colors: { primary: '#D52B1E', secondary: '#FFFFFF' } },
  { name: 'カメルーン', nameEn: 'Cameroon', flag: '🇨🇲', group: 'E', fifaRanking: 48, confederation: 'CAF', colors: { primary: '#007A5E', secondary: '#CE1126' } },
  { name: 'セルビア', nameEn: 'Serbia', flag: '🇷🇸', group: 'E', fifaRanking: 25, confederation: 'UEFA', colors: { primary: '#C6363C', secondary: '#FFFFFF' } },

  // Group F
  { name: 'イングランド', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'F', fifaRanking: 4, confederation: 'UEFA', colors: { primary: '#FFFFFF', secondary: '#002F6C' } },
  { name: 'イラン', nameEn: 'Iran', flag: '🇮🇷', group: 'F', fifaRanking: 21, confederation: 'AFC', colors: { primary: '#FFFFFF', secondary: '#DA0000' } },
  { name: 'メキシコ', nameEn: 'Mexico', flag: '🇲🇽', group: 'F', fifaRanking: 15, confederation: 'CONCACAF', colors: { primary: '#006847', secondary: '#FFFFFF' } },
  { name: 'スコットランド', nameEn: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'F', fifaRanking: 39, confederation: 'UEFA', colors: { primary: '#003082', secondary: '#FFFFFF' } },

  // Group G
  { name: 'ドイツ', nameEn: 'Germany', flag: '🇩🇪', group: 'G', fifaRanking: 6, confederation: 'UEFA', colors: { primary: '#FFFFFF', secondary: '#000000' } },
  { name: '韓国', nameEn: 'South Korea', flag: '🇰🇷', group: 'G', fifaRanking: 22, confederation: 'AFC', colors: { primary: '#C60C30', secondary: '#FFFFFF' } },
  { name: 'ボリビア', nameEn: 'Bolivia', flag: '🇧🇴', group: 'G', fifaRanking: 82, confederation: 'CONMEBOL', colors: { primary: '#007A33', secondary: '#FFFFFF' } },
  { name: 'アルバニア', nameEn: 'Albania', flag: '🇦🇱', group: 'G', fifaRanking: 62, confederation: 'UEFA', colors: { primary: '#E41E20', secondary: '#000000' } },

  // Group H
  { name: 'ポルトガル', nameEn: 'Portugal', flag: '🇵🇹', group: 'H', fifaRanking: 8, confederation: 'UEFA', colors: { primary: '#FF0000', secondary: '#006600' } },
  { name: '日本', nameEn: 'Japan', flag: '🇯🇵', group: 'H', fifaRanking: 14, confederation: 'AFC', colors: { primary: '#000080', secondary: '#FFFFFF' } },
  { name: 'トルコ', nameEn: 'Turkey', flag: '🇹🇷', group: 'H', fifaRanking: 26, confederation: 'UEFA', colors: { primary: '#E30A17', secondary: '#FFFFFF' } },
  { name: 'インドネシア', nameEn: 'Indonesia', flag: '🇮🇩', group: 'H', fifaRanking: 130, confederation: 'AFC', colors: { primary: '#FF0000', secondary: '#FFFFFF' } },

  // Group I
  { name: 'ベルギー', nameEn: 'Belgium', flag: '🇧🇪', group: 'I', fifaRanking: 9, confederation: 'UEFA', colors: { primary: '#ED2939', secondary: '#000000' } },
  { name: 'パラグアイ', nameEn: 'Paraguay', flag: '🇵🇾', group: 'I', fifaRanking: 50, confederation: 'CONMEBOL', colors: { primary: '#DA121A', secondary: '#FFFFFF' } },
  { name: 'モロッコ', nameEn: 'Morocco', flag: '🇲🇦', group: 'I', fifaRanking: 13, confederation: 'CAF', colors: { primary: '#C1272D', secondary: '#006233' } },
  { name: '南アフリカ', nameEn: 'South Africa', flag: '🇿🇦', group: 'I', fifaRanking: 59, confederation: 'CAF', colors: { primary: '#FFB81C', secondary: '#007749' } },

  // Group J
  { name: 'オランダ', nameEn: 'Netherlands', flag: '🇳🇱', group: 'J', fifaRanking: 10, confederation: 'UEFA', colors: { primary: '#FF6600', secondary: '#FFFFFF' } },
  { name: 'セネガル', nameEn: 'Senegal', flag: '🇸🇳', group: 'J', fifaRanking: 17, confederation: 'CAF', colors: { primary: '#FFFFFF', secondary: '#009639' } },
  { name: 'ジャマイカ', nameEn: 'Jamaica', flag: '🇯🇲', group: 'J', fifaRanking: 64, confederation: 'CONCACAF', colors: { primary: '#FFD100', secondary: '#009B3A' } },
  { name: 'カタール', nameEn: 'Qatar', flag: '🇶🇦', group: 'J', fifaRanking: 42, confederation: 'AFC', colors: { primary: '#8B1A1A', secondary: '#FFFFFF' } },

  // Group K
  { name: 'イタリア', nameEn: 'Italy', flag: '🇮🇹', group: 'K', fifaRanking: 9, confederation: 'UEFA', colors: { primary: '#0066B2', secondary: '#FFFFFF' } },
  { name: 'ウルグアイ', nameEn: 'Uruguay', flag: '🇺🇾', group: 'K', fifaRanking: 16, confederation: 'CONMEBOL', colors: { primary: '#5CBFEB', secondary: '#FFFFFF' } },
  { name: 'コスタリカ', nameEn: 'Costa Rica', flag: '🇨🇷', group: 'K', fifaRanking: 55, confederation: 'CONCACAF', colors: { primary: '#DA121A', secondary: '#FFFFFF' } },
  { name: 'ナイジェリア', nameEn: 'Nigeria', flag: '🇳🇬', group: 'K', fifaRanking: 28, confederation: 'CAF', colors: { primary: '#008751', secondary: '#FFFFFF' } },

  // Group L
  { name: 'デンマーク', nameEn: 'Denmark', flag: '🇩🇰', group: 'L', fifaRanking: 18, confederation: 'UEFA', colors: { primary: '#C60C30', secondary: '#FFFFFF' } },
  { name: 'チュニジア', nameEn: 'Tunisia', flag: '🇹🇳', group: 'L', fifaRanking: 44, confederation: 'CAF', colors: { primary: '#E70013', secondary: '#FFFFFF' } },
  { name: 'ウェールズ', nameEn: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', group: 'L', fifaRanking: 37, confederation: 'UEFA', colors: { primary: '#FF0000', secondary: '#FFFFFF' } },
  { name: 'ホンジュラス', nameEn: 'Honduras', flag: '🇭🇳', group: 'L', fifaRanking: 72, confederation: 'CONCACAF', colors: { primary: '#FFFFFF', secondary: '#0051A5' } }
];

// --------------------------------------------------
// 2. GROUPS - Group mappings
// --------------------------------------------------
const GROUPS = {
  A: TEAMS.filter(t => t.group === 'A'),
  B: TEAMS.filter(t => t.group === 'B'),
  C: TEAMS.filter(t => t.group === 'C'),
  D: TEAMS.filter(t => t.group === 'D'),
  E: TEAMS.filter(t => t.group === 'E'),
  F: TEAMS.filter(t => t.group === 'F'),
  G: TEAMS.filter(t => t.group === 'G'),
  H: TEAMS.filter(t => t.group === 'H'),
  I: TEAMS.filter(t => t.group === 'I'),
  J: TEAMS.filter(t => t.group === 'J'),
  K: TEAMS.filter(t => t.group === 'K'),
  L: TEAMS.filter(t => t.group === 'L')
};

// --------------------------------------------------
// 3. AI_PREDICTIONS - AI predicted results
// --------------------------------------------------
const AI_PREDICTIONS = {
  groupWinners: {
    A: { first: 'クロアチア', second: 'アメリカ' },
    B: { first: 'ブラジル', second: 'コロンビア' },
    C: { first: 'アルゼンチン', second: 'オーストラリア' },
    D: { first: 'フランス', second: 'エクアドル' },
    E: { first: 'スペイン', second: 'セルビア' },
    F: { first: 'イングランド', second: 'メキシコ' },
    G: { first: 'ドイツ', second: '韓国' },
    H: { first: 'ポルトガル', second: '日本' },
    I: { first: 'モロッコ', second: 'ベルギー' },
    J: { first: 'オランダ', second: 'セネガル' },
    K: { first: 'イタリア', second: 'ウルグアイ' },
    L: { first: 'デンマーク', second: 'ウェールズ' }
  },
  quarterfinalists: [
    'ブラジル', 'フランス', 'アルゼンチン', 'イングランド',
    'スペイン', 'ポルトガル', 'ドイツ', '日本'
  ],
  semifinalists: ['ブラジル', 'フランス', 'アルゼンチン', 'スペイン'],
  finalists: ['アルゼンチン', 'フランス'],
  champion: 'アルゼンチン',
  goldenBoot: { player: 'エムバペ', goals: 7 },
  goldenBall: 'メッシ',
  bestYoungPlayer: 'ベリンガム',
  darkHorse: '日本',
  confidenceLevel: 0.72
};

// --------------------------------------------------
// 4. QUIZ_QUESTIONS - Player DNA Diagnosis
// --------------------------------------------------
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'チームが1点ビハインド。残り10分。あなたはどうする？',
    options: [
      { text: 'ドリブルで仕掛けて一人で打開する', stats: { speed: 3, technique: 3, power: 0, intelligence: 0, stamina: 1, leadership: 0 } },
      { text: 'チームメイトを鼓舞して全員で攻める', stats: { speed: 0, technique: 0, power: 1, intelligence: 1, stamina: 1, leadership: 4 } },
      { text: '冷静にパスを回してチャンスを作る', stats: { speed: 0, technique: 2, power: 0, intelligence: 4, stamina: 0, leadership: 1 } },
      { text: 'フィジカルを活かしてパワープレー', stats: { speed: 1, technique: 0, power: 4, intelligence: 0, stamina: 2, leadership: 0 } }
    ]
  },
  {
    id: 2,
    question: '理想のゴールはどれ？',
    options: [
      { text: '5人抜きスーパードリブルからのゴール', stats: { speed: 2, technique: 4, power: 0, intelligence: 0, stamina: 1, leadership: 0 } },
      { text: 'ロングシュートがゴール隅に突き刺さる', stats: { speed: 0, technique: 2, power: 4, intelligence: 0, stamina: 0, leadership: 1 } },
      { text: 'ワンツーで崩してラストパスからタップイン', stats: { speed: 1, technique: 1, power: 0, intelligence: 4, stamina: 0, leadership: 1 } },
      { text: 'カウンターで全力疾走してGKとの1対1を制す', stats: { speed: 4, technique: 1, power: 1, intelligence: 0, stamina: 1, leadership: 0 } }
    ]
  },
  {
    id: 3,
    question: '普段の練習で一番好きなメニューは？',
    options: [
      { text: 'ダッシュ＆スプリント系トレーニング', stats: { speed: 4, technique: 0, power: 1, intelligence: 0, stamina: 2, leadership: 0 } },
      { text: 'リフティングやフェイント練習', stats: { speed: 0, technique: 4, power: 0, intelligence: 1, stamina: 0, leadership: 0 } },
      { text: 'ウェイトトレーニングやフィジカル強化', stats: { speed: 0, technique: 0, power: 4, intelligence: 0, stamina: 3, leadership: 0 } },
      { text: '試合映像の分析と戦術理解', stats: { speed: 0, technique: 0, power: 0, intelligence: 4, stamina: 0, leadership: 3 } }
    ]
  },
  {
    id: 4,
    question: 'チームメイトからどう言われたい？',
    options: [
      { text: '「あいつにボール渡せば何とかしてくれる」', stats: { speed: 1, technique: 3, power: 0, intelligence: 1, stamina: 0, leadership: 2 } },
      { text: '「あいつがいるとチームが安定する」', stats: { speed: 0, technique: 1, power: 0, intelligence: 3, stamina: 1, leadership: 2 } },
      { text: '「あいつのスピードには誰もついていけない」', stats: { speed: 4, technique: 0, power: 0, intelligence: 0, stamina: 2, leadership: 1 } },
      { text: '「あいつは最後まで絶対に諦めない」', stats: { speed: 0, technique: 0, power: 2, intelligence: 0, stamina: 4, leadership: 1 } }
    ]
  },
  {
    id: 5,
    question: '好きなサッカーのシーンは？',
    options: [
      { text: 'スルーパスが通った瞬間', stats: { speed: 0, technique: 2, power: 0, intelligence: 4, stamina: 0, leadership: 1 } },
      { text: 'ヘディングで豪快に決める瞬間', stats: { speed: 0, technique: 0, power: 4, intelligence: 0, stamina: 1, leadership: 2 } },
      { text: 'DFを置き去りにする加速', stats: { speed: 4, technique: 1, power: 1, intelligence: 0, stamina: 1, leadership: 0 } },
      { text: 'キャプテンがチームを鼓舞する姿', stats: { speed: 0, technique: 0, power: 1, intelligence: 1, stamina: 1, leadership: 4 } }
    ]
  },
  {
    id: 6,
    question: 'もし自分のチームを作るなら、最優先するのは？',
    options: [
      { text: '攻撃力 - とにかく点を取りたい', stats: { speed: 2, technique: 2, power: 2, intelligence: 0, stamina: 0, leadership: 1 } },
      { text: '守備力 - 失点ゼロが最強', stats: { speed: 0, technique: 1, power: 2, intelligence: 2, stamina: 1, leadership: 1 } },
      { text: 'チームワーク - 連携が全て', stats: { speed: 0, technique: 1, power: 0, intelligence: 2, stamina: 1, leadership: 3 } },
      { text: '個の力 - スーパースターが勝敗を決める', stats: { speed: 1, technique: 3, power: 1, intelligence: 1, stamina: 0, leadership: 1 } }
    ]
  },
  {
    id: 7,
    question: '試合前のルーティンは？',
    options: [
      { text: '音楽を聴いてテンションを上げる', stats: { speed: 2, technique: 1, power: 1, intelligence: 0, stamina: 1, leadership: 2 } },
      { text: '相手チームのデータを徹底分析', stats: { speed: 0, technique: 0, power: 0, intelligence: 4, stamina: 0, leadership: 3 } },
      { text: 'ストレッチと瞑想で集中力を高める', stats: { speed: 1, technique: 2, power: 0, intelligence: 2, stamina: 2, leadership: 0 } },
      { text: 'チームメイトと談笑してリラックス', stats: { speed: 0, technique: 0, power: 0, intelligence: 1, stamina: 1, leadership: 3 } }
    ]
  }
];

// --------------------------------------------------
// 5. PLAYER_ARCHETYPES - Diagnosis Results
// --------------------------------------------------
const PLAYER_ARCHETYPES = [
  {
    id: 'messi',
    name: 'メッシタイプ',
    subtitle: '天才的ファンタジスタ',
    description: 'ボールを持てば魔法が起きる。狭いスペースでも自在にボールを操り、誰にも真似できないプレーでゴールを生み出す天才型。直感とテクニックで試合を支配するあなたは、まさにピッチの魔術師。',
    stats: { speed: 80, technique: 99, power: 55, intelligence: 95, stamina: 70, leadership: 75 },
    famousPlayer: 'リオネル・メッシ',
    requiredStats: { technique: 'high', intelligence: 'high' },
    color: '#75AADB'
  },
  {
    id: 'ronaldo',
    name: 'クリロナタイプ',
    subtitle: '最強のストライカー',
    description: 'ゴールへの執念は誰にも負けない。圧倒的なフィジカルとスピードで敵陣を切り裂き、ここぞという場面で必ず結果を出す。努力と才能を兼ね備えた究極の点取り屋。',
    stats: { speed: 90, technique: 85, power: 95, intelligence: 75, stamina: 90, leadership: 85 },
    famousPlayer: 'クリスティアーノ・ロナウド',
    requiredStats: { power: 'high', speed: 'high' },
    color: '#C60C30'
  },
  {
    id: 'modric',
    name: 'モドリッチタイプ',
    subtitle: '魔法の司令塔',
    description: '試合全体を見渡し、完璧なパスでチームを操る知的プレーヤー。派手さはなくても、あなたがいなければチームは機能しない。ゲームの流れを読む力は天下一品。',
    stats: { speed: 72, technique: 90, power: 60, intelligence: 99, stamina: 85, leadership: 88 },
    famousPlayer: 'ルカ・モドリッチ',
    requiredStats: { intelligence: 'high', leadership: 'high' },
    color: '#002F6C'
  },
  {
    id: 'mbappe',
    name: 'エムバペタイプ',
    subtitle: '超音速アタッカー',
    description: '圧倒的なスピードとキレで相手DFを置き去りにする。カウンターアタックの申し子であり、一瞬の閃きでゴールを奪う。次世代のサッカーを体現する爆速ストライカー。',
    stats: { speed: 99, technique: 88, power: 78, intelligence: 80, stamina: 85, leadership: 65 },
    famousPlayer: 'キリアン・エムバペ',
    requiredStats: { speed: 'high', technique: 'medium' },
    color: '#002395'
  },
  {
    id: 'debruyne',
    name: 'デブライネタイプ',
    subtitle: '完璧なゲームメーカー',
    description: '正確無比なパスとビジョンで攻撃を組み立てる。両足から繰り出されるスルーパスは芸術的で、アシストもゴールもハイレベル。知性とスキルを高次元で融合させた万能型。',
    stats: { speed: 76, technique: 92, power: 72, intelligence: 96, stamina: 82, leadership: 80 },
    famousPlayer: 'ケビン・デブライネ',
    requiredStats: { intelligence: 'high', technique: 'high' },
    color: '#5CBFEB'
  },
  {
    id: 'haaland',
    name: 'ハーランドタイプ',
    subtitle: '破壊的ストライカー',
    description: 'ゴール前での決定力は異次元。恵まれたフィジカルを活かしたパワフルなプレーで、どんなDFも吹き飛ばす。ボックス内では最も危険な存在。得点マシーンの称号にふさわしい。',
    stats: { speed: 85, technique: 75, power: 99, intelligence: 72, stamina: 80, leadership: 60 },
    famousPlayer: 'アーリング・ハーランド',
    requiredStats: { power: 'high', stamina: 'medium' },
    color: '#FFD100'
  },
  {
    id: 'virgil',
    name: 'ファンダイクタイプ',
    subtitle: '鉄壁の守護神',
    description: '冷静沈着な判断力と圧倒的なフィジカルで最終ラインを統率する。読みの鋭さとリーダーシップで味方を導き、相手の攻撃を完封する。チームの心臓であり盾。',
    stats: { speed: 70, technique: 68, power: 92, intelligence: 90, stamina: 82, leadership: 95 },
    famousPlayer: 'フィルジル・ファンダイク',
    requiredStats: { leadership: 'high', power: 'high' },
    color: '#FF6600'
  },
  {
    id: 'kante',
    name: 'カンテタイプ',
    subtitle: '無限のスタミナ戦士',
    description: 'ピッチ全体を走り回り、攻守両面でチームを支える。驚異的なスタミナとボール奪取力で、相手の攻撃の芽を摘む。縁の下の力持ちであり、チームの原動力。',
    stats: { speed: 82, technique: 75, power: 70, intelligence: 85, stamina: 99, leadership: 78 },
    famousPlayer: 'エンゴロ・カンテ',
    requiredStats: { stamina: 'high', speed: 'medium' },
    color: '#002395'
  }
];

// --------------------------------------------------
// 6. STAR_PLAYERS - Notable players at the tournament
// --------------------------------------------------
const STAR_PLAYERS = [
  // Argentina
  { name: 'Lionel Messi', nameJa: 'リオネル・メッシ', team: 'アルゼンチン', position: 'FW', rating: 93, stats: { speed: 80, technique: 99, power: 55, intelligence: 95, stamina: 70, leadership: 90 } },
  { name: 'Julian Alvarez', nameJa: 'フリアン・アルバレス', team: 'アルゼンチン', position: 'FW', rating: 87, stats: { speed: 84, technique: 86, power: 75, intelligence: 85, stamina: 88, leadership: 70 } },

  // Brazil
  { name: 'Vinicius Jr', nameJa: 'ヴィニシウス・ジュニオール', team: 'ブラジル', position: 'FW', rating: 92, stats: { speed: 96, technique: 92, power: 68, intelligence: 82, stamina: 82, leadership: 65 } },
  { name: 'Rodrygo', nameJa: 'ロドリゴ', team: 'ブラジル', position: 'FW', rating: 87, stats: { speed: 88, technique: 87, power: 70, intelligence: 83, stamina: 80, leadership: 68 } },
  { name: 'Endrick', nameJa: 'エンドリッキ', team: 'ブラジル', position: 'FW', rating: 82, stats: { speed: 85, technique: 82, power: 80, intelligence: 75, stamina: 78, leadership: 55 } },

  // France
  { name: 'Kylian Mbappe', nameJa: 'キリアン・エムバペ', team: 'フランス', position: 'FW', rating: 94, stats: { speed: 99, technique: 90, power: 80, intelligence: 85, stamina: 85, leadership: 75 } },
  { name: 'Antoine Griezmann', nameJa: 'アントワーヌ・グリーズマン', team: 'フランス', position: 'FW', rating: 87, stats: { speed: 78, technique: 88, power: 65, intelligence: 90, stamina: 85, leadership: 80 } },
  { name: 'Aurelien Tchouameni', nameJa: 'オーレリアン・チュアメニ', team: 'フランス', position: 'MF', rating: 86, stats: { speed: 78, technique: 82, power: 85, intelligence: 86, stamina: 88, leadership: 72 } },

  // England
  { name: 'Jude Bellingham', nameJa: 'ジュード・ベリンガム', team: 'イングランド', position: 'MF', rating: 91, stats: { speed: 82, technique: 88, power: 82, intelligence: 90, stamina: 90, leadership: 82 } },
  { name: 'Bukayo Saka', nameJa: 'ブカヨ・サカ', team: 'イングランド', position: 'FW', rating: 89, stats: { speed: 88, technique: 89, power: 72, intelligence: 85, stamina: 86, leadership: 70 } },
  { name: 'Phil Foden', nameJa: 'フィル・フォーデン', team: 'イングランド', position: 'MF', rating: 89, stats: { speed: 84, technique: 92, power: 62, intelligence: 90, stamina: 82, leadership: 68 } },
  { name: 'Harry Kane', nameJa: 'ハリー・ケイン', team: 'イングランド', position: 'FW', rating: 89, stats: { speed: 70, technique: 85, power: 88, intelligence: 92, stamina: 78, leadership: 88 } },

  // Spain
  { name: 'Lamine Yamal', nameJa: 'ラミン・ヤマル', team: 'スペイン', position: 'FW', rating: 88, stats: { speed: 92, technique: 90, power: 60, intelligence: 85, stamina: 80, leadership: 55 } },
  { name: 'Pedri', nameJa: 'ペドリ', team: 'スペイン', position: 'MF', rating: 89, stats: { speed: 75, technique: 92, power: 60, intelligence: 94, stamina: 82, leadership: 75 } },
  { name: 'Gavi', nameJa: 'ガビ', team: 'スペイン', position: 'MF', rating: 86, stats: { speed: 80, technique: 85, power: 72, intelligence: 88, stamina: 90, leadership: 78 } },

  // Germany
  { name: 'Florian Wirtz', nameJa: 'フロリアン・ヴィルツ', team: 'ドイツ', position: 'MF', rating: 89, stats: { speed: 82, technique: 91, power: 65, intelligence: 90, stamina: 80, leadership: 68 } },
  { name: 'Jamal Musiala', nameJa: 'ジャマル・ムシアラ', team: 'ドイツ', position: 'MF', rating: 89, stats: { speed: 85, technique: 93, power: 62, intelligence: 88, stamina: 82, leadership: 65 } },

  // Portugal
  { name: 'Cristiano Ronaldo', nameJa: 'クリスティアーノ・ロナウド', team: 'ポルトガル', position: 'FW', rating: 85, stats: { speed: 72, technique: 85, power: 88, intelligence: 82, stamina: 75, leadership: 95 } },
  { name: 'Bruno Fernandes', nameJa: 'ブルーノ・フェルナンデス', team: 'ポルトガル', position: 'MF', rating: 88, stats: { speed: 75, technique: 90, power: 72, intelligence: 90, stamina: 85, leadership: 82 } },
  { name: 'Rafael Leao', nameJa: 'ラファエル・レオン', team: 'ポルトガル', position: 'FW', rating: 87, stats: { speed: 95, technique: 86, power: 75, intelligence: 78, stamina: 80, leadership: 58 } },

  // Netherlands
  { name: 'Cody Gakpo', nameJa: 'コーディ・ガクポ', team: 'オランダ', position: 'FW', rating: 86, stats: { speed: 86, technique: 85, power: 78, intelligence: 82, stamina: 82, leadership: 68 } },
  { name: 'Frenkie de Jong', nameJa: 'フレンキー・デヨング', team: 'オランダ', position: 'MF', rating: 87, stats: { speed: 78, technique: 90, power: 68, intelligence: 92, stamina: 84, leadership: 72 } },

  // Belgium
  { name: 'Kevin De Bruyne', nameJa: 'ケビン・デブライネ', team: 'ベルギー', position: 'MF', rating: 91, stats: { speed: 76, technique: 93, power: 72, intelligence: 96, stamina: 80, leadership: 85 } },

  // Italy
  { name: 'Nicolo Barella', nameJa: 'ニコロ・バレッラ', team: 'イタリア', position: 'MF', rating: 88, stats: { speed: 80, technique: 86, power: 78, intelligence: 88, stamina: 90, leadership: 80 } },
  { name: 'Federico Chiesa', nameJa: 'フェデリコ・キエーザ', team: 'イタリア', position: 'FW', rating: 84, stats: { speed: 90, technique: 85, power: 72, intelligence: 80, stamina: 78, leadership: 65 } },

  // Croatia
  { name: 'Luka Modric', nameJa: 'ルカ・モドリッチ', team: 'クロアチア', position: 'MF', rating: 87, stats: { speed: 72, technique: 92, power: 58, intelligence: 96, stamina: 80, leadership: 92 } },

  // Japan
  { name: 'Takefusa Kubo', nameJa: '久保建英', team: '日本', position: 'FW', rating: 84, stats: { speed: 84, technique: 88, power: 62, intelligence: 86, stamina: 80, leadership: 65 } },
  { name: 'Kaoru Mitoma', nameJa: '三笘薫', team: '日本', position: 'FW', rating: 83, stats: { speed: 90, technique: 86, power: 65, intelligence: 82, stamina: 84, leadership: 62 } },
  { name: 'Wataru Endo', nameJa: '遠藤航', team: '日本', position: 'MF', rating: 82, stats: { speed: 68, technique: 78, power: 80, intelligence: 88, stamina: 90, leadership: 88 } },
  { name: 'Ritsu Doan', nameJa: '堂安律', team: '日本', position: 'FW', rating: 80, stats: { speed: 82, technique: 84, power: 70, intelligence: 80, stamina: 82, leadership: 68 } },
  { name: 'Daichi Kamada', nameJa: '鎌田大地', team: '日本', position: 'MF', rating: 81, stats: { speed: 76, technique: 84, power: 68, intelligence: 86, stamina: 82, leadership: 70 } },

  // South Korea
  { name: 'Son Heung-min', nameJa: 'ソン・フンミン', team: '韓国', position: 'FW', rating: 88, stats: { speed: 90, technique: 88, power: 72, intelligence: 86, stamina: 85, leadership: 85 } },

  // USA
  { name: 'Christian Pulisic', nameJa: 'クリスティアン・プリシッチ', team: 'アメリカ', position: 'FW', rating: 84, stats: { speed: 86, technique: 85, power: 68, intelligence: 82, stamina: 84, leadership: 72 } },

  // Colombia
  { name: 'Luis Diaz', nameJa: 'ルイス・ディアス', team: 'コロンビア', position: 'FW', rating: 86, stats: { speed: 92, technique: 86, power: 70, intelligence: 80, stamina: 85, leadership: 65 } },

  // Uruguay
  { name: 'Federico Valverde', nameJa: 'フェデリコ・バルベルデ', team: 'ウルグアイ', position: 'MF', rating: 89, stats: { speed: 88, technique: 84, power: 85, intelligence: 86, stamina: 92, leadership: 78 } },
  { name: 'Darwin Nunez', nameJa: 'ダルウィン・ヌニェス', team: 'ウルグアイ', position: 'FW', rating: 86, stats: { speed: 90, technique: 78, power: 88, intelligence: 72, stamina: 85, leadership: 62 } },

  // Morocco
  { name: 'Achraf Hakimi', nameJa: 'アシュラフ・ハキミ', team: 'モロッコ', position: 'DF', rating: 87, stats: { speed: 93, technique: 82, power: 72, intelligence: 84, stamina: 88, leadership: 72 } },

  // Senegal
  { name: 'Sadio Mane', nameJa: 'サディオ・マネ', team: 'セネガル', position: 'FW', rating: 84, stats: { speed: 88, technique: 85, power: 75, intelligence: 82, stamina: 86, leadership: 80 } },

  // Nigeria
  { name: 'Victor Osimhen', nameJa: 'ヴィクター・オシムヘン', team: 'ナイジェリア', position: 'FW', rating: 88, stats: { speed: 88, technique: 80, power: 90, intelligence: 78, stamina: 84, leadership: 70 } },

  // Denmark
  { name: 'Christian Eriksen', nameJa: 'クリスティアン・エリクセン', team: 'デンマーク', position: 'MF', rating: 83, stats: { speed: 68, technique: 90, power: 62, intelligence: 92, stamina: 75, leadership: 82 } },

  // Mexico
  { name: 'Hirving Lozano', nameJa: 'イルビング・ロサーノ', team: 'メキシコ', position: 'FW', rating: 82, stats: { speed: 90, technique: 82, power: 68, intelligence: 78, stamina: 80, leadership: 65 } }
];

// --------------------------------------------------
// 7. FORMATIONS - Tactical formation coordinates
// --------------------------------------------------
const FORMATIONS = {
  '4-3-3': {
    name: '4-3-3',
    description: '攻撃的な布陣。ウイングを活用した幅のある攻撃が特徴。',
    positions: [
      { role: 'GK', x: 50, y: 92 },
      { role: 'RB', x: 85, y: 75 },
      { role: 'CB', x: 62, y: 78 },
      { role: 'CB', x: 38, y: 78 },
      { role: 'LB', x: 15, y: 75 },
      { role: 'CM', x: 65, y: 55 },
      { role: 'CM', x: 50, y: 50 },
      { role: 'CM', x: 35, y: 55 },
      { role: 'RW', x: 80, y: 28 },
      { role: 'ST', x: 50, y: 20 },
      { role: 'LW', x: 20, y: 28 }
    ]
  },
  '4-4-2': {
    name: '4-4-2',
    description: 'バランスの取れたクラシックな布陣。2トップのコンビネーションが鍵。',
    positions: [
      { role: 'GK', x: 50, y: 92 },
      { role: 'RB', x: 85, y: 75 },
      { role: 'CB', x: 62, y: 78 },
      { role: 'CB', x: 38, y: 78 },
      { role: 'LB', x: 15, y: 75 },
      { role: 'RM', x: 82, y: 50 },
      { role: 'CM', x: 60, y: 52 },
      { role: 'CM', x: 40, y: 52 },
      { role: 'LM', x: 18, y: 50 },
      { role: 'ST', x: 60, y: 22 },
      { role: 'ST', x: 40, y: 22 }
    ]
  },
  '3-5-2': {
    name: '3-5-2',
    description: '中盤を厚くした攻守バランス型。ウイングバックの運動量がカギ。',
    positions: [
      { role: 'GK', x: 50, y: 92 },
      { role: 'CB', x: 70, y: 78 },
      { role: 'CB', x: 50, y: 80 },
      { role: 'CB', x: 30, y: 78 },
      { role: 'RWB', x: 88, y: 55 },
      { role: 'CM', x: 65, y: 52 },
      { role: 'CDM', x: 50, y: 58 },
      { role: 'CM', x: 35, y: 52 },
      { role: 'LWB', x: 12, y: 55 },
      { role: 'ST', x: 60, y: 22 },
      { role: 'ST', x: 40, y: 22 }
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    description: '現代サッカーの主流。守備的MF2枚で安定させ、トップ下が攻撃を牽引。',
    positions: [
      { role: 'GK', x: 50, y: 92 },
      { role: 'RB', x: 85, y: 75 },
      { role: 'CB', x: 62, y: 78 },
      { role: 'CB', x: 38, y: 78 },
      { role: 'LB', x: 15, y: 75 },
      { role: 'CDM', x: 60, y: 60 },
      { role: 'CDM', x: 40, y: 60 },
      { role: 'RAM', x: 75, y: 40 },
      { role: 'CAM', x: 50, y: 38 },
      { role: 'LAM', x: 25, y: 40 },
      { role: 'ST', x: 50, y: 18 }
    ]
  },
  '5-3-2': {
    name: '5-3-2',
    description: '堅守速攻型。5バックで守りを固め、カウンターで一気に攻める。',
    positions: [
      { role: 'GK', x: 50, y: 92 },
      { role: 'RWB', x: 88, y: 68 },
      { role: 'CB', x: 68, y: 78 },
      { role: 'CB', x: 50, y: 80 },
      { role: 'CB', x: 32, y: 78 },
      { role: 'LWB', x: 12, y: 68 },
      { role: 'CM', x: 65, y: 52 },
      { role: 'CM', x: 50, y: 48 },
      { role: 'CM', x: 35, y: 52 },
      { role: 'ST', x: 60, y: 22 },
      { role: 'ST', x: 40, y: 22 }
    ]
  }
};

// --------------------------------------------------
// 8. CHAT_RESPONSES - AI Chat response database
// --------------------------------------------------
const CHAT_RESPONSES = {
  history: {
    keywords: ['歴史', '過去', 'ワールドカップの歴史', '初めて', '第1回'],
    response: '⚽ ワールドカップの歴史は1930年ウルグアイ大会から始まりました。以来、4年に一度開催され、2026年大会で23回目となります。最多優勝はブラジルの5回（1958,1962,1970,1994,2002）。続いてドイツとイタリアが4回ずつ。直近の2022年カタール大会ではアルゼンチンが36年ぶりに優勝し、メッシが念願のトロフィーを手にしました。'
  },
  format2026: {
    keywords: ['フォーマット', '形式', '何チーム', '48チーム', '試合数', 'ルール'],
    response: '🏟️ 2026年大会は史上初の48チーム制！12グループに4チーム。各グループ上位2チームと、3位の中から成績上位8チームの計32チームが決勝トーナメントに進出。ラウンド32→ラウンド16→準々決勝→準決勝→決勝の流れです。試合総数は104試合で、史上最大規模のワールドカップになります！'
  },
  hostCities: {
    keywords: ['開催地', '会場', 'スタジアム', 'どこで', '開催都市', 'ホスト'],
    response: '🌎 2026年大会はアメリカ・カナダ・メキシコの3カ国共催！主な会場：\n・MetLife Stadium（ニューヨーク）- 決勝会場\n・SoFi Stadium（ロサンゼルス）\n・AT&T Stadium（ダラス）\n・Azteca Stadium（メキシコシティ）\n・BMO Field（トロント）\n全16都市で開催される史上最大規模の大会です！'
  },
  japan: {
    keywords: ['日本', '日本代表', 'サムライブルー', '森保', '日本サッカー'],
    response: '🇯🇵 日本代表（サムライブルー）は2026年大会でグループHに入りました。ポルトガル、トルコ、インドネシアと同組。近年アジア予選を圧倒的な強さで突破し、FIFAランキングでもアジア最上位。久保建英、三笘薫、遠藤航を中心に、悲願のベスト8以上を目指します！2022年カタール大会ではドイツ・スペインを破る大金星で世界を驚かせました。'
  },
  brazil: {
    keywords: ['ブラジル', 'セレソン', 'ヴィニシウス', 'ネイマール'],
    response: '🇧🇷 サッカー王国ブラジルは最多5回の優勝を誇る伝統国。2026年大会ではヴィニシウス・ジュニオール、ロドリゴら若きスター軍団で6度目の優勝を狙います。グループBでコロンビア、カナダ、ニュージーランドと対戦。カナリア軍団の華麗なサンバサッカーに注目！'
  },
  argentina: {
    keywords: ['アルゼンチン', 'メッシ', 'アルビセレステ'],
    response: '🇦🇷 ディフェンディングチャンピオンのアルゼンチン！メッシにとって恐らく最後のW杯。2022年カタールでの感動的な優勝を経て、連覇を目指します。アルバレス、エンソ・フェルナンデスら次世代も充実。グループCでペルー、エジプト、オーストラリアと対戦。優勝候補の筆頭です。'
  },
  france: {
    keywords: ['フランス', 'エムバペ', 'レブルー', 'グリーズマン'],
    response: '🇫🇷 前回準優勝のフランスはエムバペを中心に優勝を狙う強豪。2018年優勝、2022年準優勝と直近2大会での安定感は抜群。グリーズマン、チュアメニ、カマヴィンガら才能溢れる選手が揃い、総合力では世界屈指。グループDでエクアドル、サウジアラビア、中国と対戦。'
  },
  england: {
    keywords: ['イングランド', 'ベリンガム', 'サカ', 'ケイン', 'フォーデン'],
    response: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 イングランドは「フットボールの母国」として悲願の優勝を目指す！ベリンガム、サカ、フォーデン、ケインら世界最高クラスの才能が集結。EURO2024準優勝の悔しさを晴らせるか。グループFでメキシコ、イラン、スコットランドと対戦。タレント力は大会随一です。'
  },
  spain: {
    keywords: ['スペイン', 'ヤマル', 'ペドリ', 'ガビ', 'ラ・ロハ'],
    response: '🇪🇸 EURO2024王者スペインは若き才能の宝庫！17歳でEURO MVPを獲得したヤマル、ペドリ、ガビのバルサトリオを軸に、新時代のティキタカで世界に挑みます。グループEでチリ、カメルーン、セルビアと対戦。2010年以来のW杯制覇なるか！'
  },
  germany: {
    keywords: ['ドイツ', 'ムシアラ', 'ヴィルツ', 'ゲルマン魂'],
    response: '🇩🇪 4度の優勝を誇るドイツは、ムシアラ&ヴィルツの最強コンビで復活を狙う！EURO2024自国開催の経験を活かし、グループGで韓国、ボリビア、アルバニアと対戦。技術と規律を兼ね備えたゲルマン魂で、2014年以来の優勝を目指します。'
  },
  darkHorse: {
    keywords: ['ダークホース', '番狂わせ', 'サプライズ', '穴場', '注目チーム'],
    response: '🐴 AI予測のダークホースは日本🇯🇵！2022年大会でドイツ・スペインを撃破した実績、欧州トップリーグで活躍する選手層の厚さが武器。他にも：\n・モロッコ🇲🇦（2022年ベスト4の実力）\n・韓国🇰🇷（ソン・フンミンの爆発力）\n・コロンビア🇨🇴（南米の伏兵）\n波乱の予感がする大会です！'
  },
  goldenBoot: {
    keywords: ['得点王', 'ゴールデンブーツ', '点取り屋', 'トップスコアラー'],
    response: '👟 AI予測の得点王候補：\n1. エムバペ（フランス）- 圧倒的なスピードと決定力\n2. ハーランド（... あ、ノルウェーは不参加）\n3. ヴィニシウス（ブラジル）- 絶好調の点取り屋\n4. ケイン（イングランド）- 安定した得点力\n5. メッシ（アルゼンチン）- 最後の輝き\nAIの最終予測：エムバペが7ゴールで得点王！'
  },
  tactics: {
    keywords: ['戦術', 'フォーメーション', '作戦', 'システム', 'トレンド'],
    response: '📋 2026年のトレンド戦術：\n・ハイプレス＋ポゼッション（スペイン型）\n・カウンタープレス（ドイツ型）\n・5バック堅守速攻（イタリア型）\n・偽9番システム（マンC型）\n・可変フォーメーション（3-2-5↔5-2-3）\n48チーム制で試合数が増えるため、選手のローテーションとスカッドの深さがより重要に！'
  },
  records: {
    keywords: ['記録', 'レコード', '最多', '歴代', '最年少', '最年長'],
    response: '📊 ワールドカップ主要記録：\n・通算最多ゴール：ミロスラフ・クローゼ（16ゴール）\n・1大会最多ゴール：ジュスト・フォンテーヌ（13ゴール/1958年）\n・最多出場：ロータル・マテウス（25試合）\n・最年少ゴール：ペレ（17歳239日/1958年）\n・最多優勝国：ブラジル（5回）\nメッシは2026年で通算ゴール数記録更新なるか！？'
  },
  ai_prediction: {
    keywords: ['予想', '予測', 'AI予測', '優勝予想', 'どこが優勝'],
    response: '🤖 AIの2026年大会予測：\n🥇 優勝：アルゼンチン（連覇！）\n🥈 準優勝：フランス（3大会連続決勝）\n🥉 ベスト4：ブラジル、スペイン\n⭐ ダークホース：日本\n👟 得点王：エムバペ（7ゴール）\n🏅 MVP：メッシ（有終の美）\n\n信頼度：72%\n※サッカーは何が起こるか分からない！それがW杯の魅力です。'
  },
  schedule: {
    keywords: ['日程', 'スケジュール', 'いつ', '開幕', '決勝'],
    response: '📅 2026年ワールドカップ日程：\n・開幕：2026年6月11日\n・グループステージ：6月11日〜6月28日\n・ラウンド32：7月1日〜7月4日\n・ラウンド16：7月5日〜7月8日\n・準々決勝：7月9日〜7月10日\n・準決勝：7月14日〜7月15日\n・3位決定戦：7月18日\n・決勝：7月19日（MetLife Stadium）\n約5週間の熱い戦いです！'
  },
  mascot: {
    keywords: ['マスコット', 'キャラクター', 'シンボル'],
    response: '🎭 歴代の人気マスコット：\n・2022年：ラィーブ（カタール）\n・2018年：ザビワカ（ロシア）\n・2014年：フレコ（ブラジル）\n・2002年：アト、カズ、ニック（日韓）\n2026年大会のマスコットも注目です！3カ国共催ならではのユニークなデザインが期待されます。'
  },
  var: {
    keywords: ['VAR', 'ビデオ', '判定', 'テクノロジー', '半自動オフサイド'],
    response: '🖥️ 2026年のテクノロジー：\n・VAR（ビデオアシスタントレフェリー）継続採用\n・半自動オフサイド判定（2022年から導入）\n・コネクテッドボール（ボール内蔵センサー）\n・AI解析による高精度判定\n・リアルタイムパフォーマンストラッキング\nテクノロジーの進化で、より公正でエキサイティングな試合が期待できます！'
  }
};

// Helper function to find chat response
function findChatResponse(input) {
  const normalizedInput = input.toLowerCase();
  for (const [key, data] of Object.entries(CHAT_RESPONSES)) {
    if (data.keywords.some(kw => normalizedInput.includes(kw.toLowerCase()))) {
      return data.response;
    }
  }
  return '🤔 その質問は難しいですね... ワールドカップについて聞いてみてください！例えば「日本代表について」「優勝予想は？」「開催地はどこ？」などで答えられます。';
}

// --------------------------------------------------
// 9. SUPPORT_MESSAGES - AI support card messages
// --------------------------------------------------
const SUPPORT_MESSAGES = {
  fire: {
    label: '🔥 熱血',
    messages: [
      { text: '🔥 {team}の魂は燃えている！最後まで戦い抜け、勝利は必ずやってくる！！！', mood: 'intense' },
      { text: '⚡ 行けぇぇぇ{team}！！！お前たちの気迫で相手を圧倒しろ！90分間全力だ！！', mood: 'intense' },
      { text: '🔥 {team}を信じろ！不可能を可能にする、それがワールドカップだ！限界を超えろ！！', mood: 'intense' },
      { text: '💪 {team}よ、今こそ歴史を変える時！全世界に見せつけろ、お前たちの本気を！！！', mood: 'intense' },
      { text: '🔥 走れ！戦え！勝て！{team}の誇りを胸に、最後のホイッスルまで燃え尽きろ！！！', mood: 'intense' },
      { text: '⚽ {team}サポーターの声が聞こえるか！？この声援を力に変えて、栄光を掴め！！！', mood: 'intense' }
    ]
  },
  cool: {
    label: '😎 クール',
    messages: [
      { text: '📊 データが示している。{team}の勝率は上昇中。冷静に、確実に、勝利を手にしよう。', mood: 'calm' },
      { text: '🧊 {team}に必要なのは冷静さ。相手の弱点を突き、効率的にゴールを奪う。それだけだ。', mood: 'calm' },
      { text: '💎 {team}のポテンシャルは計り知れない。静かに、しかし確実に世界を驚かせる時が来た。', mood: 'calm' },
      { text: '🎯 {team}は準備万端。あとはピッチで証明するだけ。結果は自ずとついてくる。', mood: 'calm' },
      { text: '📈 {team}のパフォーマンス指標は良好。このまま自分たちのサッカーを貫けば、道は開ける。', mood: 'calm' },
      { text: '🏆 真の強者は語らない。{team}はプレーで全てを語る。見ている者の心を動かすプレーを。', mood: 'calm' }
    ]
  },
  funny: {
    label: '😂 ユーモア',
    messages: [
      { text: '😂 {team}の対戦相手「え、{team}とやるの？...体調不良で帰りたい」← 相手はもうビビってるw', mood: 'funny' },
      { text: '🍕 {team}が勝ったらピザ奢るって約束した友達が青ざめてる。安心しろ、{team}は勝つ。ピザ楽しみ。', mood: 'funny' },
      { text: '📱 {team}の試合中にスマホ見てたやつ、次のゴール見逃すぞ！...あ、もう入った？ほらね！', mood: 'funny' },
      { text: '🐐 {team}のプレーがヤバすぎて、AIの予測モデルがバグった。「計算不能：強すぎます」だってw', mood: 'funny' },
      { text: '🎮 {team}の試合見てたら興奮しすぎてコントローラー握ってた。これ現実だった。', mood: 'funny' },
      { text: '🤖 AI予測「{team}勝利確率68%」 僕の心「{team}勝利確率100%」 ...心の方を信じます。', mood: 'funny' }
    ]
  },
  poetic: {
    label: '🎭 ポエム',
    messages: [
      { text: '🌙 夢を追う者たちよ、{team}の旗の下に集え。汗と涙の先にある栄光の光を、共に見よう。', mood: 'poetic' },
      { text: '🌊 {team}の歴史という大河に、新たな一滴が加わる。その一滴が大きな波を起こすことを信じて。', mood: 'poetic' },
      { text: '⭐ 星空の下、{team}の選手たちが駆ける。その足跡は永遠に語り継がれる伝説の始まり。', mood: 'poetic' },
      { text: '🌸 {team}よ、咲き誇れ。冬を耐えた花がもっとも美しく咲くように、苦難の先に栄光は待つ。', mood: 'poetic' },
      { text: '📖 {team}の物語はまだ終わらない。ページをめくるたびに新しい奇跡が綴られていく。', mood: 'poetic' },
      { text: '🎵 11人の鼓動が一つになる時、{team}のメロディーがスタジアムに響く。さあ、キックオフだ。', mood: 'poetic' }
    ]
  }
};

// --------------------------------------------------
// Utility: Get random support message
// --------------------------------------------------
function getRandomSupportMessage(style, teamName) {
  const styleData = SUPPORT_MESSAGES[style];
  if (!styleData) return '';
  const messages = styleData.messages;
  const msg = messages[Math.floor(Math.random() * messages.length)];
  return msg.text.replace(/\{team\}/g, teamName);
}

// --------------------------------------------------
// Utility: Get team by name (Japanese or English)
// --------------------------------------------------
function getTeamByName(name) {
  return TEAMS.find(t => t.name === name || t.nameEn === name);
}

// --------------------------------------------------
// Utility: Get teams in group
// --------------------------------------------------
function getTeamsInGroup(groupLetter) {
  return GROUPS[groupLetter] || [];
}

// --------------------------------------------------
// Utility: Calculate quiz result
// --------------------------------------------------
function calculateQuizResult(answers) {
  const totalStats = { speed: 0, technique: 0, power: 0, intelligence: 0, stamina: 0, leadership: 0 };

  answers.forEach(answer => {
    Object.keys(totalStats).forEach(stat => {
      totalStats[stat] += answer.stats[stat] || 0;
    });
  });

  // Normalize to 0-100
  const maxPossible = 28; // 7 questions * max 4 per stat
  Object.keys(totalStats).forEach(stat => {
    totalStats[stat] = Math.round((totalStats[stat] / maxPossible) * 100);
  });

  // Find best matching archetype
  let bestMatch = PLAYER_ARCHETYPES[0];
  let bestScore = -Infinity;

  PLAYER_ARCHETYPES.forEach(archetype => {
    let score = 0;
    Object.keys(totalStats).forEach(stat => {
      score -= Math.abs(totalStats[stat] - archetype.stats[stat]);
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = archetype;
    }
  });

  return {
    archetype: bestMatch,
    stats: totalStats
  };
}

// --------------------------------------------------
// Utility: Get star players for a team
// --------------------------------------------------
function getStarPlayersByTeam(teamName) {
  return STAR_PLAYERS.filter(p => p.team === teamName);
}

// --------------------------------------------------
// Log data loaded confirmation
// --------------------------------------------------
console.log('✅ World Cup 2026 AI Lab data loaded:', {
  teams: TEAMS.length,
  groups: Object.keys(GROUPS).length,
  starPlayers: STAR_PLAYERS.length,
  archetypes: PLAYER_ARCHETYPES.length,
  formations: Object.keys(FORMATIONS).length,
  chatTopics: Object.keys(CHAT_RESPONSES).length,
  supportStyles: Object.keys(SUPPORT_MESSAGES).length
});
