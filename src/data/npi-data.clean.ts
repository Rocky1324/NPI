export interface CountryData {
  id: string;
  name: string;
  flag: string;
  capital: string;
  region: string;
  wave: number;
  waveLabel: string;
  coordinates: [number, number];
  gdp: Record<string, number>;
  gdpPerCapita: number;
  population: number;
  growthRate: number;
  keySectors: Array<{
    name: string;
    companies: string[];
    percentage: number;
  }>;
  strategy: string[];
  images: {
    before: string;
    after: string;
  };
  milestones: Array<{
    year: number;
    event: string;
  }>;
}

// Wave 1: 1960s-1970s
export const wave1Countries: CountryData[] = [
  {
    id: 'south-korea',
    name: 'Corée du Sud',
    flag: '🇰🇷',
    capital: 'Séoul',
    region: 'Asie de l\'Est',
    wave: 1,
    waveLabel: '1ère vague (années 1960-1970)',
    coordinates: [37.5665, 126.9780],
    gdp: {
      '1960': 3.9,
      '1970': 9.1,
      '1980': 63.8,
      '1990': 283.4,
      '2000': 561.6,
      '2010': 1140.0,
      '2020': 1646.7,
      '2024': 1700.0
    },
    gdpPerCapita: 33000,
    population: 51700000,
    growthRate: 2.7,
    keySectors: [
      { name: 'Électronique', companies: ['Samsung', 'LG', 'Hyundai'], percentage: 30 },
      { name: 'Automobile', companies: ['Hyundai', 'Kia', 'SsangYong'], percentage: 25 },
      { name: 'Construction navale', companies: ['Hyundai Heavy Industries', 'Daewoo Shipbuilding'], percentage: 15 },
      { name: 'Technologie', companies: ['Samsung Electronics', 'LG Electronics', 'SK Hynix'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Industrialisation orientée vers l\'exportation',
      'Chaebols (conglomérats familiaux)',
      'Investissement massif dans l\'éducation',
      'Politique industrielle ciblée',
      'Développement des infrastructures'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?south-korea-1960s',
      after: 'https://source.unsplash.com/800x600/?seoul-modern'
    },
    milestones: [
      { year: 1961, event: 'Coup d\'État de Park Chung-hee' },
      { year: 1970, event: 'Lancement du programme Saemaul Undong' },
      { year: 1988, event: 'Jeux Olympiques de Séoul' },
      { year: 1996, event: 'Adhésion à l\'OCDE' },
      { year: 2010, event: 'Séoul Capitale mondiale du design' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapour',
    flag: '🇸🇬',
    capital: 'Singapour',
    region: 'Asie du Sud-Est',
    wave: 1,
    waveLabel: '1ère vague (années 1960-1970)',
    coordinates: [1.3521, 103.8198],
    gdp: {
      '1960': 0.7,
      '1970': 1.9,
      '1980': 11.9,
      '1990': 39.1,
      '2000': 95.9,
      '2010': 236.4,
      '2020': 350.0,
      '2024': 400.0
    },
    gdpPerCapita: 65000,
    population: 5700000,
    growthRate: 3.2,
    keySectors: [
      { name: 'Finance', companies: ['DBS Bank', 'OCBC Bank', 'UOB'], percentage: 30 },
      { name: 'Port et logistique', companies: ['PSA International', 'YCH Group'], percentage: 25 },
      { name: 'Électronique', companies: ['Flextronics', 'Venture Corporation'], percentage: 20 },
      { name: 'Chimie', companies: ['Sembcorp', 'Keppel'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Hub commercial et financier mondial',
      'Développement des infrastructures portuaires',
      'Attraction des investissements étrangers',
      'Développement des compétences (SkillsFuture)',
      'Smart Nation Initiative'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?singapore-1960s',
      after: 'https://source.unsplash.com/800x600/?singapore-modern'
    },
    milestones: [
      { year: 1965, event: 'Indépendance de la Malaisie' },
      { year: 1972, event: 'Création de la zone industrielle de Jurong' },
      { year: 1981, event: 'Ouverture de l\'aéroport de Changi' },
      { year: 1990, event: 'Goh Chok Tong devient Premier ministre' },
      { year: 2015, event: '50 ans d\'indépendance' }
    ]
  },
  {
    id: 'taiwan',
    name: 'Taïwan',
    flag: '🇹🇼',
    capital: 'Taipei',
    region: 'Asie de l\'Est',
    wave: 1,
    waveLabel: '1ère vague (années 1960-1970)',
    coordinates: [25.0330, 121.5654],
    gdp: {
      '1960': 1.7,
      '1970': 5.7,
      '1980': 42.3,
      '1990': 166.5,
      '2000': 331.6,
      '2010': 446.1,
      '2020': 669.5,
      '2024': 750.0
    },
    gdpPerCapita: 32000,
    population: 23800000,
    growthRate: 2.7,
    keySectors: [
      { name: 'Semi-conducteurs', companies: ['TSMC', 'UMC', 'MediaTek'], percentage: 40 },
      { name: 'Électronique', companies: ['Foxconn', 'ASUS', 'Acer'], percentage: 30 },
      { name: 'Informatique', companies: ['ASUS', 'Acer', 'MSI'], percentage: 15 },
      { name: 'Biotechnologie', companies: ['TaiMed Biologics', 'Medigen'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Développement des parcs scientifiques',
      'Recherche et développement technologique',
      'Chaîne d\'approvisionnement mondiale en semi-conducteurs',
      'Politique de réunification avec la Chine',
      'Diversification économique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?taiwan-1970s',
      after: 'https://source.unsplash.com/800x600/?taipei-modern'
    },
    milestones: [
      { year: 1971, event: 'Perte du siège de la Chine à l\'ONU' },
      { year: 1987, event: 'Fin de la loi martiale' },
      { year: 1996, event: 'Première élection présidentielle au suffrage direct' },
      { year: 2001, event: 'Adhésion à l\'OMC' },
      { year: 2020, event: 'Réponse à la COVID-19 saluée internationalement' }
    ]
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    flag: '🇭🇰',
    capital: 'Hong Kong',
    region: 'Asie de l\'Est',
    wave: 1,
    waveLabel: '1ère vague (années 1960-1970)',
    coordinates: [22.3193, 114.1694],
    gdp: {
      '1960': 0.6,
      '1970': 2.8,
      '1980': 28.9,
      '1990': 76.9,
      '2000': 171.7,
      '2010': 228.6,
      '2020': 345.7,
      '2024': 370.0
    },
    gdpPerCapita: 49000,
    population: 7500000,
    growthRate: 2.1,
    keySectors: [
      { name: 'Finance', companies: ['HSBC', 'Hang Seng Bank', 'Bank of East Asia'], percentage: 35 },
      { name: 'Commerce', companies: ['Hutchison Whampoa', 'Jardine Matheson'], percentage: 25 },
      { name: 'Immobilier', companies: ['Sun Hung Kai', 'Cheung Kong'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Port franc et libre-échange',
      'Hub financier international',
      'Intégration avec la Chine continentale',
      'Développement des services financiers',
      'Maintien de la règle de droit'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?hong-kong-1960s',
      after: 'https://source.unsplash.com/800x600/?hong-kong-skyline'
    },
    milestones: [
      { year: 1842, event: 'Colonisation britannique' },
      { year: 1984, event: 'Déclaration conjointe sino-britannique' },
      { year: 1997, event: 'Rétrocession à la Chine' },
      { year: 2003, event: 'Accord de libre-échange avec la Chine continentale' },
      { year: 2019, event: 'Mouvements de protestation pro-démocratie' }
    ]
  }
];

// Wave 2: 1970s-1980s
export const wave2Countries: CountryData[] = [
  {
    id: 'malaysia',
    name: 'Malaisie',
    flag: '🇲🇾',
    capital: 'Kuala Lumpur',
    region: 'Asie du Sud-Est',
    wave: 2,
    waveLabel: '2ème vague (années 1970-1980)',
    coordinates: [3.1390, 101.6869],
    gdp: {
      '1970': 3.9,
      '1980': 25.0,
      '1990': 44.0,
      '2000': 93.8,
      '2010': 255.0,
      '2020': 337.0,
      '2024': 400.0
    },
    gdpPerCapita: 11500,
    population: 32700000,
    growthRate: 4.3,
    keySectors: [
      { name: 'Électronique', companies: ['Samsung', 'Intel', 'AMD'], percentage: 30 },
      { name: 'Pétrole et gaz', companies: ['Petronas'], percentage: 20 },
      { name: 'Huile de palme', companies: ['Sime Darby', 'IOI Group'], percentage: 15 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Nouvelle politique économique (NEP)',
      'Développement industriel',
      'Promotion des exportations',
      'Diversification économique',
      'Vision 2020'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?malaysia-1970s',
      after: 'https://source.unsplash.com/800x600/?kuala-lumpur-modern'
    },
    milestones: [
      { year: 1971, event: 'Lancement de la Nouvelle politique économique' },
      { year: 1981, event: 'Mahathir Mohamad devient Premier ministre' },
      { year: 1991, event: 'Lancement de Vision 2020' },
      { year: 1998, event: 'Crise financière asiatique' },
      { year: 2010, event: 'Nouveau modèle économique' }
    ]
  },
  {
    id: 'thailand',
    name: 'Thaïlande',
    flag: '🇹🇭',
    capital: 'Bangkok',
    region: 'Asie du Sud-Est',
    wave: 2,
    waveLabel: '2ème vague (années 1970-1980)',
    coordinates: [13.7563, 100.5018],
    gdp: {
      '1970': 7.1,
      '1980': 32.4,
      '1990': 85.3,
      '2000': 122.7,
      '2010': 318.9,
      '2020': 501.8,
      '2024': 550.0
    },
    gdpPerCapita: 7900,
    population: 70000000,
    growthRate: 3.7,
    keySectors: [
      { name: 'Tourisme', companies: [], percentage: 20 },
      { name: 'Automobile', companies: ['Toyota', 'Honda', 'Isuzu'], percentage: 15 },
      { name: 'Électronique', companies: ['Seagate', 'Western Digital'], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 40 }
    ],
    strategy: [
      'Tourisme et industrie légère',
      'Développement des infrastructures',
      'Promotion des investissements étrangers',
      'Stabilité politique',
      'Thaïlande 4.0'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?thailand-1970s',
      after: 'https://source.unsplash.com/800x600/?bangkok-modern'
    },
    milestones: [
      { year: 1973, event: 'Soulèvement populaire' },
      { year: 1980, event: 'Croissance économique rapide' },
      { year: 1997, event: 'Crise financière asiatique' },
      { year: 2006, event: 'Coup d\'État militaire' },
      { year: 2016, event: 'Décès du roi Bhumibol' }
    ]
  },
  {
    id: 'brazil',
    name: 'Brésil',
    flag: '🇧🇷',
    capital: 'Brasilia',
    region: 'Amérique Latine',
    wave: 2,
    waveLabel: '2ème vague (années 1970-1980)',
    coordinates: [-15.8267, -47.9218],
    gdp: {
      '1970': 42.3,
      '1980': 235.0,
      '1990': 461.9,
      '2000': 644.7,
      '2010': 2208.7,
      '2020': 1444.7,
      '2024': 2100.0
    },
    gdpPerCapita: 9800,
    population: 215000000,
    growthRate: 2.5,
    keySectors: [
      { name: 'Agriculture', companies: ['JBS', 'BRF', 'Cargill Brasil'], percentage: 25 },
      { name: 'Mines et énergie', companies: ['Vale', 'Petrobras'], percentage: 20 },
      { name: 'Aéronautique', companies: ['Embraer'], percentage: 10 },
      { name: 'Automobile', companies: ['Volkswagen Brasil', 'Fiat Chrysler Brasil'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 30 }
    ],
    strategy: [
      'Substitution aux importations et industrialisation',
      'Développement de l\'agro-industrie',
      'Exploitation des ressources naturelles',
      'Plan Real (1994) - stabilisation économique',
      'Expansion des BRICS et leadership régional'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?brazil-1970s',
      after: 'https://source.unsplash.com/800x600/?sao-paulo-modern'
    },
    milestones: [
      { year: 1968, event: 'Début du "miracle économique brésilien"' },
      { year: 1985, event: 'Fin de la dictature militaire' },
      { year: 1994, event: 'Lancement du Plan Real et stabilisation' },
      { year: 2003, event: 'Élection de Lula et politiques sociales' },
      { year: 2016, event: 'Organisation des Jeux Olympiques de Rio' }
    ]
  },
  {
    id: 'chile',
    name: 'Chili',
    flag: '🇨🇱',
    capital: 'Santiago',
    region: 'Amérique Latine',
    wave: 2,
    waveLabel: '2ème vague (années 1970-1980)',
    coordinates: [-33.4489, -70.6693],
    gdp: {
      '1970': 9.0,
      '1980': 27.7,
      '1990': 33.1,
      '2000': 77.8,
      '2010': 217.5,
      '2020': 252.9,
      '2024': 330.0
    },
    gdpPerCapita: 17000,
    population: 19500000,
    growthRate: 2.3,
    keySectors: [
      { name: 'Mines (cuivre)', companies: ['Codelco', 'BHP Billiton Chile'], percentage: 35 },
      { name: 'Agriculture', companies: ['Wines of Chile', 'Concha y Toro'], percentage: 15 },
      { name: 'Services financiers', companies: ['Banco de Chile', 'Banco Santander Chile'], percentage: 20 },
      { name: 'Pêche', companies: ['AquaChile', 'Multiexport Foods'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Réformes néolibérales des "Chicago Boys"',
      'Privatisations et libéralisation',
      'Politique de libre-échange (nombreux accords)',
      'Exploitation du cuivre (1er producteur mondial)',
      'Stabilité macroéconomique et institutions solides'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?santiago-1970s',
      after: 'https://source.unsplash.com/800x600/?santiago-modern'
    },
    milestones: [
      { year: 1973, event: 'Coup d\'État de Pinochet et début des réformes' },
      { year: 1990, event: 'Retour à la démocratie' },
      { year: 2010, event: 'Adhésion à l\'OCDE' },
      { year: 2015, event: 'Signature de l\'accord de libre-échange avec l\'UE' },
      { year: 2018, event: 'Signature du CPTPP' }
    ]
  },
  {
    id: 'argentina',
    name: 'Argentine',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    region: 'Amérique Latine',
    wave: 2,
    waveLabel: '2ème vague (années 1970-1980)',
    coordinates: [-34.6037, -58.3816],
    gdp: {
      '1970': 28.5,
      '1980': 76.9,
      '1990': 141.4,
      '2000': 284.2,
      '2010': 423.6,
      '2020': 383.1,
      '2024': 620.0
    },
    gdpPerCapita: 13500,
    population: 46000000,
    growthRate: 1.5,
    keySectors: [
      { name: 'Agriculture', companies: ['Arcor', 'Molinos Río de la Plata'], percentage: 30 },
      { name: 'Énergie', companies: ['YPF', 'Pampa Energía'], percentage: 20 },
      { name: 'Automobile', companies: ['Toyota Argentina', 'Volkswagen Argentina'], percentage: 15 },
      { name: 'Services', companies: ['Mercado Libre', 'Globant'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Substitution aux importations',
      'Développement de l\'agro-industrie (soja, blé, viande)',
      'Tentatives de stabilisation économique',
      'Développement du secteur technologique',
      'Intégration au Mercosur'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?buenos-aires-1970s',
      after: 'https://source.unsplash.com/800x600/?buenos-aires-modern'
    },
    milestones: [
      { year: 1976, event: 'Coup d\'État militaire' },
      { year: 1983, event: 'Retour à la démocratie' },
      { year: 1991, event: 'Mise en place du plan de convertibilité' },
      { year: 2001, event: 'Crise économique majeure' },
      { year: 2016, event: 'Retour sur les marchés internationaux' }
    ]
  }
];

// Wave 3: 1980s-1990s
export const wave3Countries: CountryData[] = [
  {
    id: 'china',
    name: 'Chine',
    flag: '🇨🇳',
    capital: 'Pékin',
    region: 'Asie de l\'Est',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [39.9042, 116.4074],
    gdp: {
      '1980': 305.4,
      '1990': 360.9,
      '2000': 1211.3,
      '2010': 6087.2,
      '2020': 14722.7,
      '2024': 17900.0
    },
    gdpPerCapita: 12700,
    population: 1425000000,
    growthRate: 5.2,
    keySectors: [
      { name: 'Manufacture', companies: ['Foxconn', 'BYD', 'Lenovo'], percentage: 30 },
      { name: 'Technologie', companies: ['Huawei', 'Alibaba', 'Tencent', 'Xiaomi'], percentage: 25 },
      { name: 'Infrastructure', companies: ['China State Construction', 'China Railway'], percentage: 20 },
      { name: 'Finance', companies: ['ICBC', 'China Construction Bank'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Réformes économiques de Deng Xiaoping (1978)',
      'Zones économiques spéciales (ZES)',
      'Politique de la porte ouverte aux investissements étrangers',
      'Made in China 2025',
      'Initiative "Belt and Road" (Nouvelles Routes de la Soie)'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?china-1980s',
      after: 'https://source.unsplash.com/800x600/?shanghai-modern'
    },
    milestones: [
      { year: 1978, event: 'Début des réformes économiques de Deng Xiaoping' },
      { year: 1980, event: 'Création des premières zones économiques spéciales' },
      { year: 2001, event: 'Adhésion à l\'OMC' },
      { year: 2008, event: 'Jeux Olympiques de Pékin' },
      { year: 2013, event: 'Lancement de l\'initiative Belt and Road' }
    ]
  },
  {
    id: 'indonesia',
    name: 'Indonésie',
    flag: '🇮🇩',
    capital: 'Jakarta',
    region: 'Asie du Sud-Est',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [-6.2088, 106.8456],
    gdp: {
      '1980': 77.1,
      '1990': 114.4,
      '2000': 165.0,
      '2010': 755.1,
      '2020': 1059.6,
      '2024': 1300.0
    },
    gdpPerCapita: 3900,
    population: 273500000,
    growthRate: 5.0,
    keySectors: [
      { name: 'Ressources naturelles', companies: ['Pertamina', 'Freeport'], percentage: 25 },
      { name: 'Agriculture', companies: ['Sinar Mas', 'Astra Agro Lestari'], percentage: 15 },
      { name: 'Mines', companies: ['Freeport', 'Antam'], percentage: 10 },
      { name: 'Manufacture', companies: ['Astra International', 'Indofood'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 30 }
    ],
    strategy: [
      'Libéralisation économique dans les années 1980',
      'Développement des industries orientées vers l\'exportation',
      'Investissements dans les infrastructures',
      'Développement du secteur manufacturier',
      'Promotion du tourisme'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?indonesia-1980s',
      after: 'https://source.unsplash.com/800x600/?jakarta-modern'
    },
    milestones: [
      { year: 1967, event: 'Début du Nouvel Ordre sous Suharto' },
      { year: 1983, event: 'Début de la libéralisation économique' },
      { year: 1997, event: 'Crise financière asiatique et chute de Suharto' },
      { year: 2004, event: 'Élection présidentielle démocratique' },
      { year: 2011, event: 'Lancement du Masterplan pour l\'accélération et l\'expansion du développement économique (MP3EI)' }
    ]
  },
  {
    id: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    capital: 'Manille',
    region: 'Asie du Sud-Est',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [14.5995, 120.9842],
    gdp: {
      '1980': 32.4,
      '1990': 44.3,
      '2000': 81.4,
      '2010': 199.6,
      '2020': 361.5,
      '2024': 430.0
    },
    gdpPerCapita: 3900,
    population: 110000000,
    growthRate: 6.4,
    keySectors: [
      { name: 'Services', companies: ['SM Investments', 'Ayala Corporation'], percentage: 35 },
      { name: 'Manufacture', companies: ['San Miguel', 'JG Summit'], percentage: 25 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'BPO', companies: ['Accenture', 'Concentrix'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Développement des services (BPO)',
      'Envois de fonds des travailleurs à l\'étranger',
      'Réformes économiques',
      'Infrastructures (Build Build Build)',
      'Développement du tourisme'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?philippines-1980s',
      after: 'https://source.unsplash.com/800x600/?manila-modern'
    },
    milestones: [
      { year: 1986, event: 'Révolution du pouvoir populaire' },
      { year: 1991, event: 'Fermeture des bases militaires américaines' },
      { year: 1997, event: 'Crise financière asiatique' },
      { year: 2010, event: 'Élection de Benigno Aquino III' },
      { year: 2016, event: 'Élection de Rodrigo Duterte' }
    ]
  },
  {
    id: 'turkey',
    name: 'Turquie',
    flag: '🇹🇷',
    capital: 'Ankara',
    region: 'Moyen-Orient',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [39.9334, 32.8597],
    gdp: {
      '1980': 68.8,
      '1990': 150.7,
      '2000': 273.0,
      '2010': 771.9,
      '2020': 720.1,
      '2024': 1100.0
    },
    gdpPerCapita: 12800,
    population: 85000000,
    growthRate: 4.5,
    keySectors: [
      { name: 'Textile', companies: ['LC Waikiki', 'Koton'], percentage: 20 },
      { name: 'Automobile', companies: ['Ford Otosan', 'Tofaş', 'Oyak-Renault'], percentage: 18 },
      { name: 'Construction', companies: ['Limak', 'Enka'], percentage: 15 },
      { name: 'Électronique', companies: ['Vestel', 'Arçelik'], percentage: 12 },
      { name: 'Autres', companies: [], percentage: 35 }
    ],
    strategy: [
      'Libéralisation économique des années 1980',
      'Union douanière avec l\'UE (1996)',
      'Développement des infrastructures',
      'Promotion des exportations',
      'Position géostratégique entre Europe et Asie'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?turkey-1980s',
      after: 'https://source.unsplash.com/800x600/?istanbul-modern'
    },
    milestones: [
      { year: 1980, event: 'Coup d\'État militaire et réformes économiques' },
      { year: 1996, event: 'Union douanière avec l\'UE' },
      { year: 2001, event: 'Crise économique et réformes structurelles' },
      { year: 2013, event: 'Ouverture du tunnel sous le Bosphore' },
      { year: 2018, event: 'Inauguration du nouvel aéroport d\'Istanbul' }
    ]
  },
  {
    id: 'south-africa',
    name: 'Afrique du Sud',
    flag: '🇿🇦',
    capital: 'Pretoria',
    region: 'Afrique',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [-25.7479, 28.2293],
    gdp: {
      '1980': 80.4,
      '1990': 111.9,
      '2000': 136.6,
      '2010': 417.8,
      '2020': 301.9,
      '2024': 400.0
    },
    gdpPerCapita: 6600,
    population: 60000000,
    growthRate: 1.8,
    keySectors: [
      { name: 'Mines', companies: ['Anglo American', 'Sibanye-Stillwater', 'Gold Fields'], percentage: 30 },
      { name: 'Finance', companies: ['Standard Bank', 'FirstRand', 'Absa'], percentage: 25 },
      { name: 'Manufacture', companies: ['Sasol', 'ArcelorMittal SA'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Transition post-apartheid (1994)',
      'Développement des infrastructures',
      'Black Economic Empowerment (BEE)',
      'Diversification économique',
      'Leadership régional africain'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?south-africa-1980s',
      after: 'https://source.unsplash.com/800x600/?johannesburg-modern'
    },
    milestones: [
      { year: 1994, event: 'Fin de l\'apartheid et élection de Mandela' },
      { year: 1996, event: 'Adoption de la nouvelle constitution' },
      { year: 2010, event: 'Organisation de la Coupe du Monde de la FIFA' },
      { year: 2011, event: 'Adhésion aux BRICS' },
      { year: 2018, event: 'Zone de libre-échange continentale africaine' }
    ]
  },
  {
    id: 'poland',
    name: 'Pologne',
    flag: '🇵🇱',
    capital: 'Varsovie',
    region: 'Europe de l\'Est',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [52.2297, 21.0122],
    gdp: {
      '1990': 65.0,
      '2000': 171.3,
      '2010': 479.3,
      '2020': 596.6,
      '2024': 720.0
    },
    gdpPerCapita: 19000,
    population: 38000000,
    growthRate: 4.2,
    keySectors: [
      { name: 'Manufacture', companies: ['KGHM', 'PKN Orlen'], percentage: 25 },
      { name: 'Services', companies: ['CD Projekt', 'Allegro'], percentage: 30 },
      { name: 'Agroalimentaire', companies: ['Maspex', 'Grupa Żywiec'], percentage: 15 },
      { name: 'Automobile', companies: ['Volkswagen Poznań', 'Opel Gliwice'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Thérapie de choc après la chute du communisme (1989)',
      'Adhésion à l\'UE (2004)',
      'Utilisation des fonds structurels européens',
      'Développement des infrastructures',
      'Promotion de l\'innovation et de la technologie'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?poland-1990s',
      after: 'https://source.unsplash.com/800x600/?warsaw-modern'
    },
    milestones: [
      { year: 1989, event: 'Chute du communisme et début de la transition' },
      { year: 1990, event: 'Lancement du plan Balcerowicz (thérapie de choc)' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'Union européenne' },
      { year: 2012, event: 'Co-organisation de l\'Euro de football' }
    ]
  },
  {
    id: 'czech-republic',
    name: 'République tchèque',
    flag: '🇨🇿',
    capital: 'Prague',
    region: 'Europe de l\'Est',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [50.0755, 14.4378],
    gdp: {
      '1993': 45.6,
      '2000': 61.5,
      '2010': 207.8,
      '2020': 245.3,
      '2024': 330.0
    },
    gdpPerCapita: 30000,
    population: 10700000,
    growthRate: 3.5,
    keySectors: [
      { name: 'Automobile', companies: ['Škoda Auto', 'TPCA'], percentage: 30 },
      { name: 'Manufacture', companies: ['ČEZ', 'Agrofert'], percentage: 25 },
      { name: 'Services', companies: ['Avast', 'Kiwi.com'], percentage: 25 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Séparation pacifique avec la Slovaquie (1993)',
      'Privatisations et réformes économiques',
      'Adhésion à l\'UE (2004)',
      'Intégration aux chaînes de valeur européennes',
      'Développement du secteur automobile'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?prague-1990s',
      after: 'https://source.unsplash.com/800x600/?prague-modern'
    },
    milestones: [
      { year: 1993, event: 'Création de la République tchèque' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'Union européenne' },
      { year: 2006, event: 'Classée économie développée par la Banque mondiale' },
      { year: 2016, event: 'Taux de chômage le plus bas de l\'UE' }
    ]
  }
];

// Wave 4: 1990s-2000s
export const wave4Countries: CountryData[] = [
  {
    id: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    capital: 'Hanoï',
    region: 'Asie du Sud-Est',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [21.0278, 105.8342],
    gdp: {
      '1990': 6.5,
      '2000': 31.2,
      '2010': 115.9,
      '2020': 340.6,
      '2024': 450.0
    },
    gdpPerCapita: 3500,
    population: 97500000,
    growthRate: 6.8,
    keySectors: [
      { name: 'Manufacture', companies: ['Samsung Electronics Vietnam', 'Viettel'], percentage: 25 },
      { name: 'Agriculture', companies: ['Vinamilk', 'TH True Milk'], percentage: 15 },
      { name: 'Services', companies: ['Vietcombank', 'VietinBank'], percentage: 20 },
      { name: 'Exportations', companies: [], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Doi Moi (renouveau économique)',
      'Attraction des investissements étrangers',
      'Développement des exportations',
      'Intégration régionale (ASEAN)',
      'Industrie 4.0'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?vietnam-war',
      after: 'https://source.unsplash.com/800x600/?ho-chi-minh-city'
    },
    milestones: [
      { year: 1986, event: 'Lancement du Doi Moi' },
      { year: 1995, event: 'Adhésion à l\'ASEAN' },
      { year: 2007, event: 'Adhésion à l\'OMC' },
      { year: 2016, event: 'Élection de Nguyen Xuan Phuc' },
      { year: 2019, event: 'Accord de libre-échange avec l\'UE' }
    ]
  },
  {
    id: 'india',
    name: 'Inde',
    flag: '🇮🇳',
    capital: 'New Delhi',
    region: 'Asie du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [28.6139, 77.2090],
    gdp: {
      '1990': 320.9,
      '2000': 468.4,
      '2010': 1675.6,
      '2020': 2623.0,
      '2024': 3500.0
    },
    gdpPerCapita: 2500,
    population: 1380000000,
    growthRate: 7.0,
    keySectors: [
      { name: 'Services IT', companies: ['Tata Consultancy Services', 'Infosys', 'Wipro'], percentage: 25 },
      { name: 'Pharmaceutique', companies: ['Sun Pharma', 'Dr. Reddy\'s'], percentage: 15 },
      { name: 'Automobile', companies: ['Tata Motors', 'Mahindra'], percentage: 10 },
      { name: 'Technologie', companies: [], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 30 }
    ],
    strategy: [
      'Libéralisation économique de 1991',
      'Développement des services informatiques',
      'Make in India',
      'Réformes structurelles',
      'Développement des infrastructures'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?india-1990s',
      after: 'https://source.unsplash.com/800x600/?mumbai-modern'
    },
    milestones: [
      { year: 1991, event: 'Libéralisation économique' },
      { year: 1998, event: 'Essais nucléaires de Pokhran-II' },
      { year: 2008, event: 'Attentats de Mumbai' },
      { year: 2014, event: 'Élection de Narendra Modi' },
      { year: 2016, event: 'Démonétisation' }
    ]
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
    flag: '🇧🇩',
    capital: 'Dhaka',
    region: 'Asie du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [23.8103, 90.4125],
    gdp: {
      '1990': 30.6,
      '2000': 53.4,
      '2010': 115.3,
      '2020': 324.2,
      '2024': 450.0
    },
    gdpPerCapita: 2600,
    population: 170000000,
    growthRate: 7.2,
    keySectors: [
      { name: 'Textile', companies: ['Square Textiles', 'Beximco Textiles'], percentage: 40 },
      { name: 'Agriculture', companies: ['ACI Limited', 'PRAN-RFL Group'], percentage: 20 },
      { name: 'Pharmaceutique', companies: ['Square Pharmaceuticals', 'Beximco Pharma'], percentage: 15 },
      { name: 'Services', companies: ['Grameenphone', 'bKash'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Industrie du prêt-à-porter (2e exportateur mondial)',
      'Microfinance et inclusion financière (Grameen Bank)',
      'Développement des infrastructures',
      'Vision 2041 pour devenir pays développé',
      'Zones économiques spéciales'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?bangladesh-1990s',
      after: 'https://source.unsplash.com/800x600/?dhaka-modern'
    },
    milestones: [
      { year: 1971, event: 'Indépendance du Bangladesh' },
      { year: 1983, event: 'Création de la Grameen Bank par Muhammad Yunus' },
      { year: 2000, event: 'Boom de l\'industrie textile' },
      { year: 2015, event: 'Dépassement du statut de pays moins avancé' },
      { year: 2021, event: 'Célébration des 50 ans d\'indépendance' }
    ]
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    flag: '🇵🇰',
    capital: 'Islamabad',
    region: 'Asie du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [33.6844, 73.0479],
    gdp: {
      '1990': 40.0,
      '2000': 73.6,
      '2010': 177.4,
      '2020': 263.0,
      '2024': 375.0
    },
    gdpPerCapita: 1600,
    population: 235000000,
    growthRate: 5.8,
    keySectors: [
      { name: 'Textile', companies: ['Nishat Mills', 'Gul Ahmed'], percentage: 35 },
      { name: 'Agriculture', companies: ['Engro Corporation', 'Fauji Fertilizer'], percentage: 25 },
      { name: 'Services', companies: ['Jazz', 'HBL', 'MCB Bank'], percentage: 20 },
      { name: 'Ciment', companies: ['Lucky Cement', 'DG Khan Cement'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Libéralisation économique dans les années 1990',
      'Corridor économique Chine-Pakistan (CPEC)',
      'Développement du textile et de l\'agriculture',
      'Privatisations et réformes structurelles',
      'Zones économiques spéciales'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?pakistan-1990s',
      after: 'https://source.unsplash.com/800x600/?karachi-modern'
    },
    milestones: [
      { year: 1991, event: 'Début des réformes de libéralisation' },
      { year: 1998, event: 'Tests nucléaires' },
      { year: 2001, event: 'Réformes économiques post-9/11' },
      { year: 2013, event: 'Lancement du CPEC avec la Chine' },
      { year: 2018, event: 'Programme d\'aide du FMI' }
    ]
  },
  {
    id: 'egypt',
    name: 'Égypte',
    flag: '🇪🇬',
    capital: 'Le Caire',
    region: 'Afrique du Nord',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [30.0444, 31.2357],
    gdp: {
      '1990': 43.0,
      '2000': 99.8,
      '2010': 218.9,
      '2020': 363.1,
      '2024': 480.0
    },
    gdpPerCapita: 4500,
    population: 110000000,
    growthRate: 5.5,
    keySectors: [
      { name: 'Tourisme', companies: ['Orascom Hotels', 'Travco Group'], percentage: 20 },
      { name: 'Pétrole et gaz', companies: ['Egyptian General Petroleum', 'EGPC'], percentage: 25 },
      { name: 'Construction', companies: ['Orascom Construction', 'Arab Contractors'], percentage: 20 },
      { name: 'Agriculture', companies: ['Daltex', 'Cairo Poultry'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Réformes économiques des années 1990',
      'Développement du canal de Suez',
      'Zones économiques spéciales',
      'Méga-projets d\'infrastructure (nouvelle capitale)',
      'Diversification économique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?egypt-1990s',
      after: 'https://source.unsplash.com/800x600/?cairo-modern'
    },
    milestones: [
      { year: 1991, event: 'Programme de réformes économiques avec le FMI' },
      { year: 2002, event: 'Privatisations massives' },
      { year: 2011, event: 'Printemps arabe' },
      { year: 2015, event: 'Inauguration du nouveau canal de Suez' },
      { year: 2020, event: 'Construction de la nouvelle capitale administrative' }
    ]
  },
  {
    id: 'morocco',
    name: 'Maroc',
    flag: '🇲🇦',
    capital: 'Rabat',
    region: 'Afrique du Nord',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [34.0209, -6.8416],
    gdp: {
      '1990': 26.5,
      '2000': 38.8,
      '2010': 93.2,
      '2020': 112.9,
      '2024': 150.0
    },
    gdpPerCapita: 4000,
    population: 37500000,
    growthRate: 4.1,
    keySectors: [
      { name: 'Automobile', companies: ['Renault Maroc', 'PSA Maroc'], percentage: 25 },
      { name: 'Agriculture', companies: ['Cosumar', 'Centrale Laitière'], percentage: 20 },
      { name: 'Tourisme', companies: ['ONMT'], percentage: 15 },
      { name: 'Textile', companies: ['Dewhirst Maroc'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 25 }
    ],
    strategy: [
      'Plan d\'émergence industrielle',
      'Développement de l\'industrie automobile',
      'Énergies renouvelables (solaire)',
      'Accords de libre-échange (UE, USA)',
      'Développement des infrastructures portuaires'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?morocco-1990s',
      after: 'https://source.unsplash.com/800x600/?casablanca-modern'
    },
    milestones: [
      { year: 1999, event: 'Accession du roi Mohammed VI' },
      { year: 2006, event: 'Accord de libre-échange avec les USA' },
      { year: 2011, event: 'Nouvelle constitution' },
      { year: 2018, event: 'Lancement de la ligne TGV Al Boraq' },
      { year: 2020, event: 'Lancement du port Tanger Med II' }
    ]
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    capital: 'Abuja',
    region: 'Afrique de l\'Ouest',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [9.0765, 7.3986],
    gdp: {
      '1990': 30.5,
      '2000': 46.4,
      '2010': 369.1,
      '2020': 432.3,
      '2024': 500.0
    },
    gdpPerCapita: 2400,
    population: 220000000,
    growthRate: 3.2,
    keySectors: [
      { name: 'Pétrole et gaz', companies: ['NNPC', 'Shell Nigeria'], percentage: 40 },
      { name: 'Agriculture', companies: ['Dangote Group', 'Flour Mills'], percentage: 25 },
      { name: 'Services', companies: ['MTN Nigeria', 'Guaranty Trust Bank'], percentage: 20 },
      { name: 'Télécommunications', companies: ['Airtel Nigeria', '9mobile'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Économie pétrolière dominante',
      'Diversification économique (agriculture, services)',
      'Développement de Nollywood (cinéma)',
      'Hub technologique africain (Lagos)',
      'Croissance démographique comme atout'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?nigeria-1990s',
      after: 'https://source.unsplash.com/800x600/?lagos-modern'
    },
    milestones: [
      { year: 1999, event: 'Retour à la démocratie civile' },
      { year: 2005, event: 'Annulation d\'une grande partie de la dette' },
      { year: 2014, event: 'Devient la première économie africaine' },
      { year: 2016, event: 'Récession due à la chute des prix du pétrole' },
      { year: 2021, event: 'Lancement de l\'eNaira (monnaie numérique)' }
    ]
  },
  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    capital: 'Nairobi',
    region: 'Afrique de l\'Est',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [-1.2864, 36.8172],
    gdp: {
      '1990': 8.6,
      '2000': 12.7,
      '2010': 40.0,
      '2020': 101.0,
      '2024': 130.0
    },
    gdpPerCapita: 2400,
    population: 54000000,
    growthRate: 5.5,
    keySectors: [
      { name: 'Agriculture', companies: ['Kakuzi', 'Sasini'], percentage: 30 },
      { name: 'Services financiers', companies: ['Safaricom', 'Equity Bank'], percentage: 25 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Technologie', companies: ['M-Pesa', 'iHub'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Hub technologique africain (Silicon Savannah)',
      'Innovation en finance mobile (M-Pesa)',
      'Vision 2030 pour l\'industrialisation',
      'Développement des infrastructures (chemin de fer SGR)',
      'Centre d\'affaires pour l\'Afrique de l\'Est'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?kenya-1990s',
      after: 'https://source.unsplash.com/800x600/?nairobi-modern'
    },
    milestones: [
      { year: 2007, event: 'Lancement de M-Pesa' },
      { year: 2008, event: 'Vision 2030 lancée' },
      { year: 2010, event: 'Nouvelle constitution' },
      { year: 2017, event: 'Inauguration du chemin de fer SGR' },
      { year: 2021, event: 'Nairobi hub technologique africain' }
    ]
  },
  {
    id: 'colombia',
    name: 'Colombie',
    flag: '🇨🇴',
    capital: 'Bogotá',
    region: 'Amérique Latine',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [4.7110, -74.0721],
    gdp: {
      '1990': 40.3,
      '2000': 99.9,
      '2010': 287.0,
      '2020': 271.4,
      '2024': 380.0
    },
    gdpPerCapita: 7400,
    population: 52000000,
    growthRate: 3.5,
    keySectors: [
      { name: 'Pétrole', companies: ['Ecopetrol'], percentage: 25 },
      { name: 'Agriculture', companies: ['Grupo Nutresa', 'Postobón'], percentage: 20 },
      { name: 'Services', companies: ['Bancolombia', 'Avianca'], percentage: 30 },
      { name: 'Manufacture', companies: ['Bavaria', 'Carvajal'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Ouverture économique des années 1990',
      'Accords de paix et stabilisation',
      'Adhésion à l\'OCDE (2020)',
      'Développement du secteur des services',
      'Innovation et entrepreneuriat (startups)'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?colombia-1990s',
      after: 'https://source.unsplash.com/800x600/?bogota-modern'
    },
    milestones: [
      { year: 1991, event: 'Nouvelle constitution' },
      { year: 2006, event: 'Accords de libre-échange avec les USA' },
      { year: 2016, event: 'Accord de paix avec les FARC' },
      { year: 2018, event: 'Adhésion à l\'OCDE' },
      { year: 2020, event: 'Devient membre de l\'OCDE' }
    ]
  },
  {
    id: 'peru',
    name: 'Pérou',
    flag: '🇵🇪',
    capital: 'Lima',
    region: 'Amérique Latine',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [-12.0464, -77.0428],
    gdp: {
      '1990': 26.4,
      '2000': 53.3,
      '2010': 153.9,
      '2020': 203.2,
      '2024': 280.0
    },
    gdpPerCapita: 8300,
    population: 34000000,
    growthRate: 2.8,
    keySectors: [
      { name: 'Mines', companies: ['Southern Copper', 'Antamina'], percentage: 30 },
      { name: 'Agriculture', companies: ['Backus', 'Gloria'], percentage: 20 },
      { name: 'Pêche', companies: ['Copeinca', 'Hayduk'], percentage: 15 },
      { name: 'Services', companies: ['Interbank', 'BCP'], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Réformes néolibérales des années 1990',
      'Exploitation minière (cuivre, or, argent)',
      'Diversification vers l\'agriculture d\'exportation',
      'Accords de libre-échange',
      'Stabilité macroéconomique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?peru-1990s',
      after: 'https://source.unsplash.com/800x600/?lima-modern'
    },
    milestones: [
      { year: 1990, event: 'Élection de Fujimori et réformes' },
      { year: 2000, event: 'Retour à la démocratie' },
      { year: 2009, event: 'Accord de libre-échange avec les USA' },
      { year: 2015, event: 'Taux de croissance parmi les plus élevés d\'Amérique Latine' },
      { year: 2021, event: 'Membre du CPTPP' }
    ]
  },
  {
    id: 'romania',
    name: 'Roumanie',
    flag: '🇷🇴',
    capital: 'Bucarest',
    region: 'Europe de l\'Est',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [44.4268, 26.1025],
    gdp: {
      '1990': 38.3,
      '2000': 37.3,
      '2010': 167.4,
      '2020': 250.1,
      '2024': 350.0
    },
    gdpPerCapita: 18000,
    population: 19000000,
    growthRate: 4.8,
    keySectors: [
      { name: 'Automobile', companies: ['Dacia (Renault)', 'Ford Craiova'], percentage: 25 },
      { name: 'IT', companies: ['UiPath', 'Bitdefender'], percentage: 20 },
      { name: 'Agriculture', companies: ['Agricover', 'Holde Agri'], percentage: 15 },
      { name: 'Énergie', companies: ['OMV Petrom', 'Romgaz'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Transition post-communiste',
      'Adhésion à l\'UE (2007)',
      'Développement de l\'industrie automobile',
      'Hub IT en Europe de l\'Est',
      'Utilisation des fonds structurels européens'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?romania-1990s',
      after: 'https://source.unsplash.com/800x600/?bucharest-modern'
    },
    milestones: [
      { year: 1989, event: 'Chute du régime Ceaușescu' },
      { year: 2004, event: 'Adhésion à l\'OTAN' },
      { year: 2007, event: 'Adhésion à l\'Union européenne' },
      { year: 2019, event: 'Sommet UE à Sibiu' },
      { year: 2024, event: 'Croissance économique soutenue' }
    ]
  },
  {
    id: 'hungary',
    name: 'Hongrie',
    flag: '🇭🇺',
    capital: 'Budapest',
    region: 'Europe de l\'Est',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [47.4979, 19.0402],
    gdp: {
      '1990': 33.1,
      '2000': 46.8,
      '2010': 131.3,
      '2020': 155.7,
      '2024': 210.0
    },
    gdpPerCapita: 21500,
    population: 9700000,
    growthRate: 3.8,
    keySectors: [
      { name: 'Automobile', companies: ['Audi Hungaria', 'Mercedes-Benz Hungary'], percentage: 30 },
      { name: 'Électronique', companies: ['Samsung Hungary', 'Bosch Hungary'], percentage: 20 },
      { name: 'Pharmaceutique', companies: ['Richter Gedeon', 'Teva Hungary'], percentage: 15 },
      { name: 'Services', companies: ['OTP Bank', 'MOL Group'], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Transition réussie vers l\'économie de marché',
      'Adhésion à l\'UE (2004)',
      'Attraction des IDE (fiscalité avantageuse)',
      'Développement de l\'industrie automobile',
      'Hub logistique en Europe centrale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?hungary-1990s',
      after: 'https://source.unsplash.com/800x600/?budapest-modern'
    },
    milestones: [
      { year: 1989, event: 'Chute du communisme' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'Union européenne' },
      { year: 2012, event: 'Développement de l\'industrie automobile' },
      { year: 2020, event: 'Hub technologique régional' }
    ]
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    capital: 'Colombo',
    region: 'Asie du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [6.9271, 79.8612],
    gdp: {
      '1990': 8.0,
      '2000': 16.3,
      '2010': 59.4,
      '2020': 84.0,
      '2024': 95.0
    },
    gdpPerCapita: 4200,
    population: 22000000,
    growthRate: 4.5,
    keySectors: [
      { name: 'Textile', companies: ['MAS Holdings', 'Brandix'], percentage: 30 },
      { name: 'Tourisme', companies: ['Aitken Spence', 'John Keells Holdings'], percentage: 20 },
      { name: 'Thé', companies: ['Dilmah', 'Ceylon Tea'], percentage: 15 },
      { name: 'Services', companies: ['Commercial Bank', 'Dialog Axiata'], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Ouverture économique dans les années 1990',
      'Développement du textile et du tourisme',
      'Hub logistique (port de Colombo)',
      'Fin de la guerre civile (2009) et reconstruction',
      'Diversification économique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?sri-lanka-1990s',
      after: 'https://source.unsplash.com/800x600/?colombo-modern'
    },
    milestones: [
      { year: 1977, event: 'Début des réformes de libéralisation' },
      { year: 2009, event: 'Fin de la guerre civile' },
      { year: 2010, event: 'Boom économique post-guerre' },
      { year: 2019, event: 'Attentats de Pâques' },
      { year: 2022, event: 'Crise économique majeure' }
    ]
  }
];

// Wave 5: 2000s-2010s (Nouveaux émergents)
export const wave5Countries: CountryData[] = [
  {
    id: 'cambodia',
    name: 'Cambodge',
    flag: '🇰🇭',
    capital: 'Phnom Penh',
    region: 'Asie du Sud-Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [11.5564, 104.9282],
    gdp: {
      '2000': 3.7,
      '2010': 11.2,
      '2020': 26.9,
      '2024': 32.0
    },
    gdpPerCapita: 1900,
    population: 17000000,
    growthRate: 7.5,
    keySectors: [
      { name: 'Textile', companies: ['Cambo Unisoll', 'Worldbridge Garment'], percentage: 40 },
      { name: 'Tourisme', companies: [], percentage: 25 },
      { name: 'Agriculture', companies: ['Angkor Beer', 'CP Cambodia'], percentage: 20 },
      { name: 'Construction', companies: ['Chip Mong Group'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Reconstruction post-Khmers rouges',
      'Développement de l\'industrie textile',
      'Tourisme (Angkor Wat)',
      'Investissements chinois massifs',
      'Zone économique spéciale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?cambodia-2000s',
      after: 'https://source.unsplash.com/800x600/?phnom-penh-modern'
    },
    milestones: [
      { year: 1993, event: 'Rétablissement de la monarchie constitutionnelle' },
      { year: 1999, event: 'Adhésion à l\'ASEAN' },
      { year: 2004, event: 'Adhésion à l\'OMC' },
      { year: 2016, event: 'Fin du statut de pays moins avancé visé' },
      { year: 2023, event: 'Croissance économique soutenue' }
    ]
  },
  {
    id: 'laos',
    name: 'Laos',
    flag: '🇱🇦',
    capital: 'Vientiane',
    region: 'Asie du Sud-Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [17.9757, 102.6331],
    gdp: {
      '2000': 1.7,
      '2010': 7.2,
      '2020': 19.1,
      '2024': 21.0
    },
    gdpPerCapita: 2800,
    population: 7500000,
    growthRate: 6.2,
    keySectors: [
      { name: 'Hydroélectricité', companies: ['Électricité du Laos'], percentage: 30 },
      { name: 'Mines', companies: ['Phu Bia Mining', 'Sepon Gold'], percentage: 25 },
      { name: 'Agriculture', companies: ['Lao Brewery'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Réformes économiques depuis 1986',
      'Développement hydroélectrique ("batterie de l\'Asie")',
      'Chemin de fer Chine-Laos (2021)',
      'Adhésion à l\'ASEAN',
      'Corridor économique Nord-Sud'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?laos-2000s',
      after: 'https://source.unsplash.com/800x600/?vientiane-modern'
    },
    milestones: [
      { year: 1986, event: 'Lancement des réformes économiques' },
      { year: 1997, event: 'Adhésion à l\'ASEAN' },
      { year: 2013, event: 'Adhésion à l\'OMC' },
      { year: 2021, event: 'Inauguration du chemin de fer Chine-Laos' },
      { year: 2024, event: 'Développement hydroélectrique massif' }
    ]
  },
  {
    id: 'myanmar',
    name: 'Myanmar (Birmanie)',
    flag: '🇲🇲',
    capital: 'Naypyidaw',
    region: 'Asie du Sud-Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [19.7633, 96.1686],
    gdp: {
      '2000': 8.9,
      '2010': 49.5,
      '2020': 76.1,
      '2024': 65.0
    },
    gdpPerCapita: 1200,
    population: 54000000,
    growthRate: 3.0,
    keySectors: [
      { name: 'Agriculture', companies: ['Myanmar Awba Group'], percentage: 30 },
      { name: 'Gaz naturel', companies: ['Myanmar Oil and Gas Enterprise'], percentage: 25 },
      { name: 'Textile', companies: ['CMP Myanmar'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Ouverture économique (2011-2020)',
      'Réformes démocratiques temporaires',
      'Développement des ressources naturelles',
      'Zone économique spéciale de Thilawa',
      'Instabilité politique post-2021'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?myanmar-2000s',
      after: 'https://source.unsplash.com/800x600/?yangon-modern'
    },
    milestones: [
      { year: 2011, event: 'Début de la transition démocratique' },
      { year: 2012, event: 'Levée partielle des sanctions' },
      { year: 2015, event: 'Premières élections libres' },
      { year: 2016, event: 'Gouvernement civil d\'Aung San Suu Kyi' },
      { year: 2021, event: 'Coup d\'État militaire' }
    ]
  },
  {
    id: 'ethiopia',
    name: 'Éthiopie',
    flag: '🇪🇹',
    capital: 'Addis-Abeba',
    region: 'Afrique de l\'Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [9.0320, 38.7469],
    gdp: {
      '2000': 8.2,
      '2010': 29.9,
      '2020': 107.6,
      '2024': 130.0
    },
    gdpPerCapita: 1100,
    population: 120000000,
    growthRate: 6.8,
    keySectors: [
      { name: 'Agriculture', companies: ['Ethiopian Coffee', 'MIDROC Ethiopia'], percentage: 40 },
      { name: 'Textile', companies: ['Hawassa Industrial Park'], percentage: 20 },
      { name: 'Construction', companies: ['Sur Construction', 'CGC Overseas'], percentage: 15 },
      { name: 'Services', companies: ['Ethiopian Airlines'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Plan de croissance et transformation',
      'Développement des parcs industriels',
      'Grand barrage de la Renaissance',
      'Ethiopian Airlines comme fleuron national',
      'Vision industrielle Manufacturing 2025'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ethiopia-2000s',
      after: 'https://source.unsplash.com/800x600/?addis-ababa-modern'
    },
    milestones: [
      { year: 2010, event: 'Lancement du Plan de croissance et transformation' },
      { year: 2011, event: 'Début de la construction du barrage de la Renaissance' },
      { year: 2018, event: 'Arrivée d\'Abiy Ahmed et réformes' },
      { year: 2019, event: 'Ouverture de secteurs aux investissements' },
      { year: 2020, event: 'Conflit au Tigré' }
    ]
  },
  {
    id: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    capital: 'Accra',
    region: 'Afrique de l\'Ouest',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [5.6037, -0.1870],
    gdp: {
      '2000': 5.0,
      '2010': 32.2,
      '2020': 72.4,
      '2024': 80.0
    },
    gdpPerCapita: 2500,
    population: 33000000,
    growthRate: 5.0,
    keySectors: [
      { name: 'Cacao', companies: ['Cocoa Processing Company'], percentage: 25 },
      { name: 'Or', companies: ['AngloGold Ashanti Ghana', 'Newmont Ghana'], percentage: 30 },
      { name: 'Pétrole', companies: ['Ghana National Petroleum', 'Tullow Oil Ghana'], percentage: 20 },
      { name: 'Services', companies: ['MTN Ghana', 'Ecobank Ghana'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Démocratie stable depuis 1992',
      'Exploitation pétrolière (depuis 2010)',
      'Hub financier ouest-africain',
      'Programme Ghana Beyond Aid',
      'Industrialisation et diversification'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ghana-2000s',
      after: 'https://source.unsplash.com/800x600/?accra-modern'
    },
    milestones: [
      { year: 2007, event: 'Découverte de pétrole offshore' },
      { year: 2010, event: 'Début de la production pétrolière' },
      { year: 2017, event: 'Lancement du programme Ghana Beyond Aid' },
      { year: 2019, event: 'Zone de libre-échange continentale africaine' },
      { year: 2022, event: 'Crise économique et appel au FMI' }
    ]
  },
  {
    id: 'tanzania',
    name: 'Tanzanie',
    flag: '🇹🇿',
    capital: 'Dodoma',
    region: 'Afrique de l\'Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [-6.1630, 35.7516],
    gdp: {
      '2000': 9.1,
      '2010': 31.3,
      '2020': 64.4,
      '2024': 80.0
    },
    gdpPerCapita: 1300,
    population: 63000000,
    growthRate: 6.5,
    keySectors: [
      { name: 'Agriculture', companies: ['Tanzania Breweries'], percentage: 30 },
      { name: 'Mines', companies: ['Acacia Mining', 'Petra Diamonds'], percentage: 25 },
      { name: 'Tourisme', companies: [], percentage: 20 },
      { name: 'Télécommunications', companies: ['Vodacom Tanzania', 'Airtel Tanzania'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Libéralisation économique depuis 1990',
      'Développement du tourisme (Serengeti, Kilimandjaro)',
      'Exploitation minière (or, diamants)',
      'Vision de développement 2025',
      'Corridor central (chemin de fer SGR)'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?tanzania-2000s',
      after: 'https://source.unsplash.com/800x600/?dar-es-salaam-modern'
    },
    milestones: [
      { year: 2000, event: 'Lancement de la Vision de développement 2025' },
      { year: 2005, event: 'Élection de Jakaya Kikwete et réformes' },
      { year: 2015, event: 'Élection de John Magufuli' },
      { year: 2017, event: 'Construction du chemin de fer SGR' },
      { year: 2021, event: 'Première femme présidente (Samia Suluhu)' }
    ]
  },
  {
    id: 'uganda',
    name: 'Ouganda',
    flag: '🇺🇬',
    capital: 'Kampala',
    region: 'Afrique de l\'Est',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [0.3476, 32.5825],
    gdp: {
      '2000': 6.2,
      '2010': 20.2,
      '2020': 37.4,
      '2024': 50.0
    },
    gdpPerCapita: 1050,
    population: 48000000,
    growthRate: 6.0,
    keySectors: [
      { name: 'Agriculture', companies: ['Uganda Breweries', 'Kakira Sugar'], percentage: 35 },
      { name: 'Services', companies: ['MTN Uganda', 'Stanbic Bank Uganda'], percentage: 30 },
      { name: 'Pétrole (en développement)', companies: ['TotalEnergies Uganda'], percentage: 15 },
      { name: 'Manufacture', companies: ['Roofings Group'], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Stabilisation économique depuis les années 1990',
      'Développement du secteur pétrolier',
      'Vision 2040 pour pays à revenu intermédiaire',
      'Hub régional pour les services',
      'Développement des infrastructures'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?uganda-2000s',
      after: 'https://source.unsplash.com/800x600/?kampala-modern'
    },
    milestones: [
      { year: 2006, event: 'Découverte de pétrole au lac Albert' },
      { year: 2010, event: 'Vision 2040 lancée' },
      { year: 2013, event: 'Boom des télécommunications mobiles' },
      { year: 2020, event: 'Début de la construction du pipeline pétrolier' },
      { year: 2025, event: 'Production pétrolière prévue' }
    ]
  },
  {
    id: 'cote-ivoire',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    capital: 'Yamoussoukro',
    region: 'Afrique de l\'Ouest',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [6.8270, -5.2893],
    gdp: {
      '2000': 10.4,
      '2010': 24.9,
      '2020': 61.3,
      '2024': 80.0
    },
    gdpPerCapita: 2900,
    population: 28000000,
    growthRate: 7.0,
    keySectors: [
      { name: 'Cacao', companies: ['Barry Callebaut', 'Cargill Cocoa'], percentage: 30 },
      { name: 'Agriculture', companies: ['SIFCA', 'Sucrivoire'], percentage: 20 },
      { name: 'Pétrole', companies: ['Petroci'], percentage: 15 },
      { name: 'Services', companies: ['Orange CI', 'Ecobank CI'], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Stabilisation post-crise (2011)',
      'Premier producteur mondial de cacao',
      'Plan national de développement',
      'Hub économique régional',
      'Diversification industrielle'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ivory-coast-2000s',
      after: 'https://source.unsplash.com/800x600/?abidjan-modern'
    },
    milestones: [
      { year: 2011, event: 'Fin de la crise post-électorale' },
      { year: 2012, event: 'Début de la reconstruction et boom économique' },
      { year: 2016, event: 'Plan national de développement 2016-2020' },
      { year: 2020, event: 'Parmi les économies à plus forte croissance en Afrique' },
      { year: 2024, event: 'Hub financier et commercial ouest-africain' }
    ]
  },
  {
    id: 'senegal',
    name: 'Sénégal',
    flag: '🇸🇳',
    capital: 'Dakar',
    region: 'Afrique de l\'Ouest',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [14.6928, -17.4467],
    gdp: {
      '2000': 4.7,
      '2010': 13.5,
      '2020': 27.6,
      '2024': 35.0
    },
    gdpPerCapita: 2000,
    population: 17500000,
    growthRate: 5.5,
    keySectors: [
      { name: 'Agriculture', companies: ['Senhuile', 'CSS'], percentage: 25 },
      { name: 'Pêche', companies: ['Grande Côte Operations'], percentage: 20 },
      { name: 'Services', companies: ['Sonatel', 'Banque Atlantique'], percentage: 30 },
      { name: 'Mines', companies: ['Industries Chimiques du Sénégal'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Plan Sénégal Émergent (PSE)',
      'Développement gazier et pétrolier (découverte 2014)',
      'Hub aérien et maritime régional',
      'Démocratie stable en Afrique',
      'Développement des infrastructures (TER, autoroutes)'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?senegal-2000s',
      after: 'https://source.unsplash.com/800x600/?dakar-modern'
    },
    milestones: [
      { year: 2012, event: 'Élection de Macky Sall' },
      { year: 2014, event: 'Lancement du Plan Sénégal Émergent et découverte de gaz' },
      { year: 2019, event: 'Inauguration du TER (train express régional)' },
      { year: 2023, event: 'Début de la production de gaz' },
      { year: 2024, event: 'Élection de Bassirou Diomaye Faye' }
    ]
  },
  {
    id: 'uzbekistan',
    name: 'Ouzbékistan',
    flag: '🇺🇿',
    capital: 'Tachkent',
    region: 'Asie Centrale',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [41.2995, 69.2401],
    gdp: {
      '2000': 13.8,
      '2010': 39.0,
      '2020': 57.7,
      '2024': 90.0
    },
    gdpPerCapita: 2600,
    population: 35000000,
    growthRate: 5.8,
    keySectors: [
      { name: 'Agriculture', companies: ['Uzbekistan Cotton'], percentage: 25 },
      { name: 'Mines', companies: ['Navoi Mining', 'Almalyk Mining'], percentage: 30 },
      { name: 'Gaz naturel', companies: ['Uzbekneftegaz'], percentage: 20 },
      { name: 'Automobile', companies: ['UzAuto Motors (GM)'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Transition post-soviétique',
      'Réformes économiques depuis 2016',
      'Libéralisation du taux de change',
      'Ouverture aux investissements étrangers',
      'Initiative Routes de la Soie'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?uzbekistan-2000s',
      after: 'https://source.unsplash.com/800x600/?tashkent-modern'
    },
    milestones: [
      { year: 1991, event: 'Indépendance de l\'URSS' },
      { year: 2016, event: 'Décès de Karimov et arrivée de Mirziyoyev' },
      { year: 2017, event: 'Début des réformes économiques majeures' },
      { year: 2019, event: 'Libéralisation du taux de change' },
      { year: 2022, event: 'Réformes constitutionnelles' }
    ]
  },
  {
    id: 'bolivia',
    name: 'Bolivie',
    flag: '🇧🇴',
    capital: 'La Paz',
    region: 'Amérique Latine',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [-16.5000, -68.1500],
    gdp: {
      '2000': 8.4,
      '2010': 19.7,
      '2020': 36.7,
      '2024': 47.0
    },
    gdpPerCapita: 3900,
    population: 12000000,
    growthRate: 4.5,
    keySectors: [
      { name: 'Gaz naturel', companies: ['YPFB'], percentage: 30 },
      { name: 'Mines', companies: ['Comibol', 'San Cristóbal'], percentage: 25 },
      { name: 'Agriculture', companies: ['PIL Andina'], percentage: 20 },
      { name: 'Services', companies: ['Entel Bolivia'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Nationalisation des ressources naturelles (2006)',
      'Réduction de la pauvreté sous Evo Morales',
      'Exploitation du lithium (réserves importantes)',
      'Diversification économique',
      'Intégration régionale sud-américaine'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?bolivia-2000s',
      after: 'https://source.unsplash.com/800x600/?la-paz-modern'
    },
    milestones: [
      { year: 2006, event: 'Élection d\'Evo Morales et nationalisations' },
      { year: 2009, event: 'Nouvelle constitution' },
      { year: 2014, event: 'Croissance économique soutenue' },
      { year: 2019, event: 'Crise politique et départ de Morales' },
      { year: 2020, event: 'Élection de Luis Arce' }
    ]
  },
  {
    id: 'jordan',
    name: 'Jordanie',
    flag: '🇯🇴',
    capital: 'Amman',
    region: 'Moyen-Orient',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [31.9454, 35.9284],
    gdp: {
      '2000': 8.5,
      '2010': 26.4,
      '2020': 43.7,
      '2024': 52.0
    },
    gdpPerCapita: 4800,
    population: 11000000,
    growthRate: 2.5,
    keySectors: [
      { name: 'Services', companies: ['Arab Bank', 'Zain Jordan'], percentage: 30 },
      { name: 'Tourisme', companies: ['Royal Jordanian'], percentage: 20 },
      { name: 'Mines', companies: ['Arab Potash', 'Jordan Phosphate'], percentage: 20 },
      { name: 'Textile', companies: ['Zones franches'], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Stabilité politique régionale',
      'Zones de qualification industrielle (QIZ)',
      'Hub de services au Moyen-Orient',
      'Tourisme (Pétra, Mer Morte)',
      'Accords de libre-échange'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?jordan-2000s',
      after: 'https://source.unsplash.com/800x600/?amman-modern'
    },
    milestones: [
      { year: 1999, event: 'Accession du roi Abdallah II' },
      { year: 2000, event: 'Accord de libre-échange avec les USA' },
      { year: 2011, event: 'Printemps arabe (stabilité maintenue)' },
      { year: 2016, event: 'Accueil de réfugiés syriens' },
      { year: 2022, event: 'Vision de modernisation économique' }
    ]
  },
  {
    id: 'tunisia',
    name: 'Tunisie',
    flag: '🇹🇳',
    capital: 'Tunis',
    region: 'Afrique du Nord',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [36.8065, 10.1815],
    gdp: {
      '2000': 21.5,
      '2010': 44.0,
      '2020': 39.2,
      '2024': 50.0
    },
    gdpPerCapita: 4100,
    population: 12000000,
    growthRate: 2.0,
    keySectors: [
      { name: 'Textile', companies: ['Groupe Chakira'], percentage: 25 },
      { name: 'Agriculture', companies: ['CHO Group'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Services', companies: ['Tunisie Telecom', 'Banque de Tunisie'], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Révolution de jasmin (2011) et transition démocratique',
      'Offshore manufacturing pour l\'Europe',
      'Développement du secteur tertiaire',
      'Partenariats avec l\'UE',
      'Difficultés économiques post-révolution'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?tunisia-2000s',
      after: 'https://source.unsplash.com/800x600/?tunis-modern'
    },
    milestones: [
      { year: 2011, event: 'Révolution de jasmin et chute de Ben Ali' },
      { year: 2014, event: 'Nouvelle constitution démocratique' },
      { year: 2015, event: 'Prix Nobel de la paix au Quartet du dialogue national' },
      { year: 2021, event: 'Crise politique et constitutionnelle' },
      { year: 2023, event: 'Restructuration économique' }
    ]
  }
];

// Export final
export const npiData: { countries: CountryData[] } = {
  countries: [
    ...wave1Countries, 
    ...wave2Countries, 
    ...wave3Countries, 
    ...wave4Countries,
    ...wave5Countries
  ]
};

// Calculate global stats based on actual data
export const globalStats = {
  totalGDP: npiData.countries.reduce((sum, country) => {
    const latestYear = Object.keys(country.gdp).sort().pop() || '';
    return sum + (parseFloat(country.gdp[latestYear]?.toString() || '0') * 1000000000);
  }, 0),
  totalPopulation: npiData.countries.reduce((sum, country) => sum + (country.population || 0), 0),
  averageGrowth: npiData.countries.length > 0 
    ? npiData.countries.reduce((sum, country) => sum + (country.growthRate || 0), 0) / npiData.countries.length 
    : 0,
  numberOfCountries: npiData.countries.length
};
