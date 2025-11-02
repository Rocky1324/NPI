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
  }
];

// Wave 3: 1980s-1990s
export const wave3Countries: CountryData[] = [
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
    id: 'chile',
    name: 'Chili',
    flag: '🇨🇱',
    capital: 'Santiago',
    region: 'Amérique du Sud',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [-33.4489, -70.6693],
    gdp: {
      '1980': 32.4,
      '1990': 44.3,
      '2000': 81.4,
      '2010': 199.6,
      '2020': 252.9,
      '2024': 300.0
    },
    gdpPerCapita: 15000,
    population: 19100000,
    growthRate: 3.0,
    keySectors: [
      { name: 'Mines', companies: ['Codelco', 'Antofagasta', 'SQM'], percentage: 35 },
      { name: 'Agriculture', companies: [], percentage: 15 },
      { name: 'Services', companies: [], percentage: 25 },
      { name: 'Manufacture', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Libéralisation économique',
      'Stabilité macroéconomique',
      'Accords de libre-échange',
      'Diversification économique',
      'Innovation et entrepreneuriat'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?chile-1980s',
      after: 'https://source.unsplash.com/800x600/?santiago-chile'
    },
    milestones: [
      { year: 1973, event: 'Coup d\'État d\'Augusto Pinochet' },
      { year: 1980, event: 'Nouvelle Constitution' },
      { year: 1990, event: 'Retour à la démocratie' },
      { year: 2010, event: 'Adhésion à l\'OCDE' },
      { year: 2019, event: 'Mouvements sociaux' }
    ]
  },
  {
    id: 'argentina',
    name: 'Argentine',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    region: 'Amérique du Sud',
    wave: 3,
    waveLabel: '3ème vague (années 1980-1990)',
    coordinates: [-34.6037, -58.3816],
    gdp: {
      '1980': 200.1,
      '1990': 141.4,
      '2000': 284.2,
      '2010': 423.6,
      '2020': 383.1,
      '2024': 450.0
    },
    gdpPerCapita: 10000,
    population: 45000000,
    growthRate: -2.0,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 20 },
      { name: 'Industrie', companies: ['Techint', 'Arcor'], percentage: 30 },
      { name: 'Services', companies: ['MercadoLibre', 'Globant'], percentage: 40 },
      { name: 'Mines', companies: ['Barrick Gold'], percentage: 5 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Substitution aux importations',
      'Développement industriel',
      'Exportations agricoles',
      'Intégration régionale (Mercosur)',
      'Innovation technologique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?argentina-1980s',
      after: 'https://source.unsplash.com/800x600/?buenos-aires-modern'
    },
    milestones: [
      { year: 1982, event: 'Guerre des Malouines' },
      { year: 1989, event: 'Hyperinflation' },
      { year: 2001, event: 'Crise économique' },
      { year: 2015, event: 'Élection de Mauricio Macri' },
      { year: 2020, event: 'Régime de contrôle des changes' }
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
    id: 'turkey',
    name: 'Turquie',
    flag: '🇹🇷',
    capital: 'Ankara',
    region: 'Moyen-Orient',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [39.9334, 32.8597],
    gdp: {
      '1990': 150.7,
      '2000': 266.6,
      '2010': 731.2,
      '2020': 717.1,
      '2024': 850.0
    },
    gdpPerCapita: 9500,
    population: 84000000,
    growthRate: 5.9,
    keySectors: [
      { name: 'Industrie', companies: ['Koc Holding', 'Sabanci Holding'], percentage: 30 },
      { name: 'Services', companies: ['Turkish Airlines', 'Garanti Bank'], percentage: 35 },
      { name: 'Agriculture', companies: [], percentage: 15 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Union douanière avec l\'UE',
      'Développement des infrastructures',
      'Croissance par les exportations',
      'Tourisme',
      'Innovation technologique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?turkey-1990s',
      after: 'https://source.unsplash.com/800x600/?istanbul-modern'
    },
    milestones: [
      { year: 1995, event: 'Union douanière avec l\'UE' },
      { year: 2001, event: 'Crise économique' },
      { year: 2005, event: 'Début des négociations d\'adhésion à l\'UE' },
      { year: 2016, event: 'Tentative de coup d\'État' },
      { year: 2020, event: 'Conflit en Syrie' }
    ]
  },
  {
    id: 'south-africa',
    name: 'Afrique du Sud',
    flag: '🇿🇦',
    capital: 'Pretoria',
    region: 'Afrique',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [-25.7479, 28.2293],
    gdp: {
      '1990': 111.3,
      '2000': 136.4,
      '2010': 375.3,
      '2020': 301.9,
      '2024': 350.0
    },
    gdpPerCapita: 5900,
    population: 60000000,
    growthRate: 0.2,
    keySectors: [
      { name: 'Mines', companies: ['Anglo American', 'De Beers'], percentage: 20 },
      { name: 'Finance', companies: ['Standard Bank', 'FirstRand'], percentage: 25 },
      { name: 'Manufacture', companies: ['Sasol', 'Naspers'], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 30 }
    ],
    strategy: [
      'Transition démocratique',
      'Black Economic Empowerment (BEE)',
      'Développement des infrastructures',
      'Tourisme',
      'Énergies renouvelables'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?south-africa-1990s',
      after: 'https://source.unsplash.com/800x600/?johannesburg-modern'
    },
    milestones: [
      { year: 1994, event: 'Fin de l\'apartheid' },
      { year: 1996, event: 'Adoption de la nouvelle constitution' },
      { year: 2010, event: 'Coupe du monde de football' },
      { year: 2018, event: 'Réforme agraire' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'poland',
    name: 'Pologne',
    flag: '🇵🇱',
    capital: 'Varsovie',
    region: 'Europe de l\'Est',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [52.2297, 21.0122],
    gdp: {
      '1990': 65.9,
      '2000': 171.9,
      '2010': 479.8,
      '2020': 594.2,
      '2024': 700.0
    },
    gdpPerCapita: 18500,
    population: 38000000,
    growthRate: 4.1,
    keySectors: [
      { name: 'Manufacture', companies: ['PKN Orlen', 'PZU'], percentage: 30 },
      { name: 'Services', companies: ['PKO Bank', 'Pekao'], percentage: 35 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Transition vers l\'économie de marché',
      'Adhésion à l\'UE',
      'Développement des infrastructures',
      'Innovation technologique',
      'Croissance verte'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?poland-1990s',
      after: 'https://source.unsplash.com/800x600/?warsaw-modern'
    },
    milestones: [
      { year: 1989, event: 'Chute du communisme' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'UE' },
      { year: 2015, event: 'Élection du parti Droit et Justice' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'czech-republic',
    name: 'République tchèque',
    flag: '🇨🇿',
    capital: 'Prague',
    region: 'Europe centrale',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [50.0755, 14.4378],
    gdp: {
      '1990': 40.6,
      '2000': 61.6,
      '2010': 198.5,
      '2020': 245.3,
      '2024': 280.0
    },
    gdpPerCapita: 22600,
    population: 10700000,
    growthRate: 2.3,
    keySectors: [
      { name: 'Industrie', companies: ['Skoda Auto', 'CEZ'], percentage: 35 },
      { name: 'Services', companies: ['CSOB', 'Komercni Banka'], percentage: 45 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Agriculture', companies: [], percentage: 5 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Transition vers l\'économie de marché',
      'Attraction des investissements étrangers',
      'Développement industriel',
      'Innovation technologique',
      'Croissance verte'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?czech-republic-1990s',
      after: 'https://source.unsplash.com/800x600/?prague-modern'
    },
    milestones: [
      { year: 1989, event: 'Révolution de velours' },
      { year: 1993, event: 'Partition de la Tchécoslovaquie' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'UE' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2000': 74.9,
      '2010': 177.4,
      '2020': 300.4,
      '2024': 350.0
    },
    gdpPerCapita: 1600,
    population: 225000000,
    growthRate: 3.9,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Textile', companies: [], percentage: 20 },
      { name: 'Services', companies: [], percentage: 35 },
      { name: 'Industrie', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Libéralisation économique',
      'Développement des infrastructures',
      'Croissance démographique',
      'Énergie',
      'Sécurité'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?pakistan-1990s',
      after: 'https://source.unsplash.com/800x600/?islamabad-modern'
    },
    milestones: [
      { year: 1998, event: 'Essais nucléaires' },
      { year: 2001, event: 'Guerre en Afghanistan' },
      { year: 2007, event: 'Retour à la démocratie' },
      { year: 2018, event: 'Élection d\'Imran Khan' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2024': 450.0
    },
    gdpPerCapita: 3600,
    population: 104000000,
    growthRate: 5.6,
    keySectors: [
      { name: 'Pétrole et gaz', companies: ['EGPC', 'ENPPI'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 15 },
      { name: 'Industrie', companies: [], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 25 }
    ],
    strategy: [
      'Libéralisation économique',
      'Développement des infrastructures',
      'Tourisme',
      'Zone économique du canal de Suez',
      'Nouvelle capitale administrative'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?egypt-1990s',
      after: 'https://source.unsplash.com/800x600/?cairo-modern'
    },
    milestones: [
      { year: 1991, event: 'Guerre du Golfe' },
      { year: 2004, event: 'Accord de libre-échange qualifié avec les États-Unis' },
      { year: 2011, event: 'Révolution égyptienne' },
      { year: 2015, event: 'Inauguration du nouveau canal de Suez' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '1990': 29.0,
      '2000': 36.9,
      '2010': 91.7,
      '2020': 112.9,
      '2024': 140.0
    },
    gdpPerCapita: 3500,
    population: 37000000,
    growthRate: 3.0,
    keySectors: [
      { name: 'Agriculture', companies: ['Lesieur Cristal', 'Cosumar'], percentage: 15 },
      { name: 'Phosphates', companies: ['OCP'], percentage: 10 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Industrie', companies: ['SNI', 'Managem'], percentage: 20 },
      { name: 'Autres', companies: [], percentage: 40 }
    ],
    strategy: [
      'Stabilité politique',
      'Développement des infrastructures',
      'Énergies renouvelables',
      'Tourisme',
      'Développement industriel'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?morocco-1990s',
      after: 'https://source.unsplash.com/800x600/?casablanca-modern'
    },
    milestones: [
      { year: 1999, event: 'Intronisation de Mohammed VI' },
      { year: 2004, event: 'Plan Émergence' },
      { year: 2011, event: 'Nouvelle constitution' },
      { year: 2016, event: 'Retour à l\'Union africaine' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
    coordinates: [9.0820, 8.6753],
    gdp: {
      '1990': 54.0,
      '2000': 69.5,
      '2010': 361.9,
      '2020': 432.3,
      '2024': 500.0
    },
    gdpPerCapita: 2200,
    population: 211000000,
    growthRate: 2.2,
    keySectors: [
      { name: 'Pétrole et gaz', companies: ['NNPC', 'Dangote Group'], percentage: 30 },
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Services', companies: ['MTN Nigeria', 'Airtel'], percentage: 25 },
      { name: 'Industrie', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Diversification économique',
      'Développement des infrastructures',
      'Croissance démographique',
      'Énergie',
      'Lutte contre la corruption'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?nigeria-1990s',
      after: 'https://source.unsplash.com/800x600/?lagos-modern'
    },
    milestones: [
      { year: 1999, event: 'Retour à la démocratie' },
      { year: 2007, event: 'Élection d\'Umaru Yar\'Adua' },
      { year: 2014, event: 'Épidémie d\'Ebola' },
      { year: 2015, event: 'Élection de Muhammadu Buhari' },
      { year: 2020, event: 'Mouvement #EndSARS' }
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
    coordinates: [-1.2921, 36.8219],
    gdp: {
      '1990': 8.1,
      '2000': 12.7,
      '2010': 40.7,
      '2020': 98.8,
      '2024': 120.0
    },
    gdpPerCapita: 1900,
    population: 54000000,
    growthRate: 5.4,
    keySectors: [
      { name: 'Agriculture', companies: ['Kakuzi', 'Sasini'], percentage: 30 },
      { name: 'Services', companies: ['Safaricom', 'KCB Group'], percentage: 40 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Industrie', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Vision 2030',
      'Technologie mobile (M-Pesa)',
      'Développement des infrastructures',
      'Tourisme',
      'Intégration régionale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?kenya-1990s',
      after: 'https://source.unsplash.com/800x600/?nairobi-modern'
    },
    milestones: [
      { year: 1991, event: 'Fin du parti unique' },
      { year: 2002, event: 'Élection de Mwai Kibaki' },
      { year: 2007, event: 'Crise post-électorale' },
      { year: 2010, event: 'Nouvelle constitution' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'colombia',
    name: 'Colombie',
    flag: '🇨🇴',
    capital: 'Bogotá',
    region: 'Amérique du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [4.7110, -74.0721],
    gdp: {
      '1990': 40.5,
      '2000': 99.9,
      '2010': 286.6,
      '2020': 271.3,
      '2024': 330.0
    },
    gdpPerCapita: 6500,
    population: 51000000,
    growthRate: 3.3,
    keySectors: [
      { name: 'Pétrole et gaz', companies: ['Ecopetrol'], percentage: 25 },
      { name: 'Mines', companies: [], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 15 },
      { name: 'Services', companies: ['Bancolombia', 'Avianca'], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Sécurité démocratique',
      'Accords de paix avec les FARC',
      'Diversification économique',
      'Infrastructures',
      'Innovation'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?colombia-1990s',
      after: 'https://source.unsplash.com/800x600/?bogota-modern'
    },
    milestones: [
      { year: 1991, event: 'Nouvelle constitution' },
      { year: 2000, event: 'Plan Colombie' },
      { year: 2016, event: 'Accord de paix avec les FARC' },
      { year: 2018, event: 'Élection d\'Iván Duque' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'peru',
    name: 'Pérou',
    flag: '🇵🇪',
    capital: 'Lima',
    region: 'Amérique du Sud',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [-12.0464, -77.0428],
    gdp: {
      '1990': 26.4,
      '2000': 51.3,
      '2010': 153.5,
      '2020': 202.0,
      '2024': 250.0
    },
    gdpPerCapita: 6300,
    population: 33000000,
    growthRate: 2.2,
    keySectors: [
      { name: 'Mines', companies: ['Buenaventura', 'Southern Copper'], percentage: 30 },
      { name: 'Pêche', companies: [], percentage: 10 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Services', companies: ['Interbank', 'Credicorp'], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Stabilité macroéconomique',
      'Développement des infrastructures',
      'Lutte contre la pauvreté',
      'Diversification économique',
      'Innovation technologique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?peru-1990s',
      after: 'https://source.unsplash.com/800x600/?lima-modern'
    },
    milestones: [
      { year: 1990, event: 'Élection d\'Alberto Fujimori' },
      { year: 2000, event: 'Chute de Fujimori' },
      { year: 2009, event: 'Accord de libre-échange avec les États-Unis' },
      { year: 2016, event: 'Élection de Pedro Pablo Kuczynski' },
      { year: 2020, event: 'Crise politique et pandémie de COVID-19' }
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
      '1990': 40.2,
      '2000': 37.2,
      '2010': 167.0,
      '2020': 250.1,
      '2024': 300.0
    },
    gdpPerCapita: 12900,
    population: 19000000,
    growthRate: 4.1,
    keySectors: [
      { name: 'Industrie', companies: ['Dacia', 'Petrom'], percentage: 30 },
      { name: 'Services', companies: ['Banca Transilvania', 'Banca Comercială Română'], percentage: 45 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Transition vers l\'économie de marché',
      'Adhésion à l\'UE',
      'Développement des infrastructures',
      'Innovation technologique',
      'Croissance verte'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?romania-1990s',
      after: 'https://source.unsplash.com/800x600/?bucharest-modern'
    },
    milestones: [
      { year: 1989, event: 'Révolution roumaine' },
      { year: 2004, event: 'Adhésion à l\'OTAN' },
      { year: 2007, event: 'Adhésion à l\'UE' },
      { year: 2019, event: 'Présidence du Conseil de l\'UE' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'hungary',
    name: 'Hongrie',
    flag: '🇭🇺',
    capital: 'Budapest',
    region: 'Europe centrale',
    wave: 4,
    waveLabel: '4ème vague (années 1990-2000)',
    coordinates: [47.4979, 19.0402],
    gdp: {
      '1990': 33.0,
      '2000': 46.9,
      '2010': 130.7,
      '2020': 156.4,
      '2024': 180.0
    },
    gdpPerCapita: 15800,
    population: 9700000,
    growthRate: 4.6,
    keySectors: [
      { name: 'Industrie', companies: ['MOL Group', 'OTP Bank'], percentage: 30 },
      { name: 'Services', companies: ['Richter Gedeon', 'Magyar Telekom'], percentage: 50 },
      { name: 'Agriculture', companies: [], percentage: 5 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Transition vers l\'économie de marché',
      'Adhésion à l\'UE',
      'Développement industriel',
      'Innovation technologique',
      'Croissance verte'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?hungary-1990s',
      after: 'https://source.unsplash.com/800x600/?budapest-modern'
    },
    milestones: [
      { year: 1989, event: 'Transition démocratique' },
      { year: 1999, event: 'Adhésion à l\'OTAN' },
      { year: 2004, event: 'Adhésion à l\'UE' },
      { year: 2010, event: 'Élection de Viktor Orbán' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2010': 56.7,
      '2020': 84.0,
      '2024': 100.0
    },
    gdpPerCapita: 3800,
    population: 22000000,
    growthRate: 2.3,
    keySectors: [
      { name: 'Textile', companies: [], percentage: 30 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 20 },
      { name: 'Services', companies: [], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Développement des infrastructures',
      'Tourisme',
      'Agriculture',
      'Industrie légère',
      'Intégration régionale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?sri-lanka-1990s',
      after: 'https://source.unsplash.com/800x600/?colombo-modern'
    },
    milestones: [
      { year: 1983, event: 'Début de la guerre civile' },
      { year: 2004, event: 'Tsunami de l\'océan Indien' },
      { year: 2009, event: 'Fin de la guerre civile' },
      { year: 2019, event: 'Attentats de Pâques' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2020': 25.8,
      '2024': 30.0
    },
    gdpPerCapita: 1600,
    population: 16700000,
    growthRate: 7.1,
    keySectors: [
      { name: 'Textile', companies: [], percentage: 35 },
      { name: 'Tourisme', companies: [], percentage: 20 },
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Développement des exportations',
      'Tourisme',
      'Agriculture',
      'Infrastructures',
      'Intégration régionale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?cambodia-2000s',
      after: 'https://source.unsplash.com/800x600/?phnom-penh-modern'
    },
    milestones: [
      { year: 1998, event: 'Fin du régime des Khmers rouges' },
      { year: 2004, event: 'Adhésion à l\'OMC' },
      { year: 2015, event: 'Tensions politiques' },
      { year: 2018, event: 'Élections contestées' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2010': 7.1,
      '2020': 19.1,
      '2024': 25.0
    },
    gdpPerCapita: 2600,
    population: 7400000,
    growthRate: 6.5,
    keySectors: [
      { name: 'Hydroélectricité', companies: [], percentage: 25 },
      { name: 'Mines', companies: [], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Développement hydroélectrique',
      'Extraction minière',
      'Infrastructures',
      'Tourisme',
      'Intégration régionale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?laos-2000s',
      after: 'https://source.unsplash.com/800x600/?vientiane-modern'
    },
    milestones: [
      { year: 1975, event: 'République démocratique populaire lao' },
      { year: 1997, event: 'Adhésion à l\'ASEAN' },
      { year: 2011, event: 'Inauguration du premier barrage hydroélectrique' },
      { year: 2016, event: 'Élection de Bounnhang Vorachith' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
    coordinates: [19.7633, 96.0785],
    gdp: {
      '2000': 9.0,
      '2010': 49.5,
      '2020': 81.3,
      '2024': 100.0
    },
    gdpPerCapita: 1400,
    population: 54000000,
    growthRate: 6.8,
    keySectors: [
      { name: 'Gaz naturel', companies: [], percentage: 20 },
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Manufacture', companies: [], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Transition démocratique',
      'Ouverture économique',
      'Développement des infrastructures',
      'Tourisme',
      'Intégration régionale'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?myanmar-2000s',
      after: 'https://source.unsplash.com/800x600/?yangon-modern'
    },
    milestones: [
      { year: 1988, event: 'Soulèvement populaire' },
      { year: 2010, event: 'Premières élections démocratiques' },
      { year: 2015, event: 'Victoire de la LND aux élections' },
      { year: 2021, event: 'Coup d\'État militaire' },
      { year: 2022, event: 'Crise politique' }
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
    coordinates: [9.1450, 40.4897],
    gdp: {
      '2000': 8.2,
      '2010': 29.9,
      '2020': 95.6,
      '2024': 120.0
    },
    gdpPerCapita: 1100,
    population: 120000000,
    growthRate: 6.1,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 35 },
      { name: 'Manufacture', companies: [], percentage: 15 },
      { name: 'Services', companies: [], percentage: 30 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Plan de croissance et de transformation',
      'Développement des infrastructures',
      'Zone industrielle et investissement',
      'Développement de l\'énergie',
      'Transformation agricole'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ethiopia-2000s',
      after: 'https://source.unsplash.com/800x600/?addis-ababa-modern'
    },
    milestones: [
      { year: 2000, event: 'Guerre avec l\'Érythrée' },
      { year: 2012, event: 'Décès de Meles Zenawi' },
      { year: 2018, event: 'Abiy Ahmed devient Premier ministre' },
      { year: 2019, event: 'Prix Nobel de la paix pour Abiy Ahmed' },
      { year: 2020, event: 'Conflit du Tigré' }
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
      '2000': 4.9,
      '2010': 32.2,
      '2020': 68.5,
      '2024': 85.0
    },
    gdpPerCapita: 2200,
    population: 32000000,
    growthRate: 6.5,
    keySectors: [
      { name: 'Pétrole', companies: ['GNPC', 'Tullow Oil'], percentage: 20 },
      { name: 'Or', companies: ['AngloGold Ashanti', 'Gold Fields'], percentage: 15 },
      { name: 'Cacao', companies: [], percentage: 15 },
      { name: 'Services', companies: ['MTN Ghana', 'Ecobank'], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 20 }
    ],
    strategy: [
      'Découverte et exploitation pétrolière',
      'Stabilité démocratique',
      'Développement des infrastructures',
      'Agriculture moderne',
      'Transformation numérique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ghana-2000s',
      after: 'https://source.unsplash.com/800x600/?accra-modern'
    },
    milestones: [
      { year: 2007, event: 'Découverte de pétrole' },
      { year: 2010, event: 'Début de la production pétrolière' },
      { year: 2017, event: 'Élection de Nana Akufo-Addo' },
      { year: 2019, event: 'Année du retour' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2000': 10.3,
      '2010': 32.2,
      '2020': 62.4,
      '2024': 80.0
    },
    gdpPerCapita: 1100,
    population: 61000000,
    growthRate: 6.0,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 30 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Mines', companies: ['Barrick Gold', 'AngloGold Ashanti'], percentage: 10 },
      { name: 'Services', companies: [], percentage: 30 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Développement des infrastructures',
      'Croissance industrielle',
      'Tourisme',
      'Agriculture commerciale',
      'Exploitation minière'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?tanzania-2000s',
      after: 'https://source.unsplash.com/800x600/?dodoma-modern'
    },
    milestones: [
      { year: 1996, event: 'Début de la libéralisation économique' },
      { year: 2005, event: 'Élection de Jakaya Kikwete' },
      { year: 2015, event: 'Élection de John Magufuli' },
      { year: 2020, event: 'Découverte de gaz naturel' },
      { year: 2021, event: 'Décès de John Magufuli' }
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
      '2010': 19.9,
      '2020': 37.4,
      '2024': 50.0
    },
    gdpPerCapita: 900,
    population: 47000000,
    growthRate: 6.8,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 35 },
      { name: 'Services', companies: ['MTN Uganda', 'Stanbic Bank'], percentage: 30 },
      { name: 'Industrie', companies: [], percentage: 20 },
      { name: 'Construction', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Développement pétrolier',
      'Infrastructures',
      'Agriculture commerciale',
      'Tourisme',
      'Développement industriel'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?uganda-2000s',
      after: 'https://source.unsplash.com/800x600/?kampala-modern'
    },
    milestones: [
      { year: 1986, event: 'Prise de pouvoir de Yoweri Museveni' },
      { year: 2006, event: 'Découverte de pétrole' },
      { year: 2011, event: 'Manifestations Walk to Work' },
      { year: 2016, event: 'Réélection de Museveni' },
      { year: 2021, event: 'Élection présidentielle contestée' }
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
    coordinates: [6.8276, -5.2893],
    gdp: {
      '2000': 10.7,
      '2010': 25.2,
      '2020': 61.3,
      '2024': 80.0
    },
    gdpPerCapita: 2300,
    population: 27000000,
    growthRate: 7.4,
    keySectors: [
      { name: 'Cacao', companies: [], percentage: 25 },
      { name: 'Agriculture', companies: [], percentage: 20 },
      { name: 'Services', companies: ['MTN Côte d\'Ivoire', 'Ecobank'], percentage: 35 },
      { name: 'Industrie', companies: [], percentage: 15 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Diversification économique',
      'Développement des infrastructures',
      'Agriculture moderne',
      'Énergie',
      'Transformation numérique'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?ivory-coast-2000s',
      after: 'https://source.unsplash.com/800x600/?abidjan-modern'
    },
    milestones: [
      { year: 2002, event: 'Début de la crise politico-militaire' },
      { year: 2011, event: 'Crise post-électorale' },
      { year: 2015, event: 'Élection d\'Alassane Ouattara' },
      { year: 2020, event: 'Élection présidentielle controversée' },
      { year: 2021, event: 'Poursuite des réformes économiques' }
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
    coordinates: [14.7167, -17.4677],
    gdp: {
      '2000': 4.6,
      '2010': 12.9,
      '2020': 24.6,
      '2024': 35.0
    },
    gdpPerCapita: 1600,
    population: 17000000,
    growthRate: 6.0,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 15 },
      { name: 'Services', companies: ['Sonatel', 'Canal+'], percentage: 45 },
      { name: 'Industrie', companies: [], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Plan Sénégal Émergent',
      'Développement des infrastructures',
      'Agriculture et agro-industrie',
      'Énergie',
      'Tourisme'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?senegal-2000s',
      after: 'https://source.unsplash.com/800x600/?dakar-modern'
    },
    milestones: [
      { year: 2000, event: 'Élection d\'Abdoulaye Wade' },
      { year: 2012, event: 'Élection de Macky Sall' },
      { year: 2014, event: 'Lancement du Plan Sénégal Émergent' },
      { year: 2019, event: 'Découverte de pétrole et de gaz' },
      { year: 2020, event: 'Pandémie de COVID-19' }
    ]
  },
  {
    id: 'uzbekistan',
    name: 'Ouzbékistan',
    flag: '🇺🇿',
    capital: 'Tachkent',
    region: 'Asie centrale',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [41.2995, 69.2401],
    gdp: {
      '2000': 13.7,
      '2010': 39.2,
      '2020': 57.9,
      '2024': 80.0
    },
    gdpPerCapita: 1800,
    population: 35000000,
    growthRate: 5.5,
    keySectors: [
      { name: 'Agriculture', companies: [], percentage: 25 },
      { name: 'Industrie', companies: ['Uzbekneftegaz', 'Navoi Mining'], percentage: 30 },
      { name: 'Services', companies: [], percentage: 35 },
      { name: 'Construction', companies: [], percentage: 5 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Réformes économiques',
      'Libéralisation',
      'Diversification',
      'Investissements étrangers',
      'Développement des infrastructures'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?uzbekistan-2000s',
      after: 'https://source.unsplash.com/800x600/?tashkent-modern'
    },
    milestones: [
      { year: 1991, event: 'Indépendance de l\'URSS' },
      { year: 2016, event: 'Décès d\'Islam Karimov' },
      { year: 2017, event: 'Élection de Shavkat Mirziyoyev' },
      { year: 2019, event: 'Ouverture des frontières avec le Kirghizistan' },
      { year: 2021, event: 'Réélection de Mirziyoyev' }
    ]
  },
  {
    id: 'bolivia',
    name: 'Bolivie',
    flag: '🇧🇴',
    capital: 'La Paz',
    region: 'Amérique du Sud',
    wave: 5,
    waveLabel: '5ème vague (années 2000-2010)',
    coordinates: [-16.4897, -68.1193],
    gdp: {
      '2000': 8.4,
      '2010': 19.6,
      '2020': 36.7,
      '2024': 45.0
    },
    gdpPerCapita: 3200,
    population: 12000000,
    growthRate: 2.2,
    keySectors: [
      { name: 'Gaz naturel', companies: ['YPFB'], percentage: 25 },
      { name: 'Mines', companies: ['Comibol', 'Sinchi Wayra'], percentage: 20 },
      { name: 'Agriculture', companies: [], percentage: 20 },
      { name: 'Services', companies: [], percentage: 25 },
      { name: 'Autres', companies: [], percentage: 10 }
    ],
    strategy: [
      'Nationalisation des ressources naturelles',
      'Industrialisation',
      'Développement des infrastructures',
      'Agriculture durable',
      'Tourisme'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?bolivia-2000s',
      after: 'https://source.unsplash.com/800x600/?lapaz-bolivia'
    },
    milestones: [
      { year: 2005, event: 'Élection d\'Evo Morales' },
      { year: 2006, event: 'Nationalisation des hydrocarbures' },
      { year: 2009, event: 'Nouvelle constitution' },
      { year: 2019, event: 'Démission d\'Evo Morales' },
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
      '2010': 26.5,
      '2020': 43.7,
      '2024': 50.0
    },
    gdpPerCapita: 4300,
    population: 11000000,
    growthRate: 2.0,
    keySectors: [
      { name: 'Services', companies: ['Arab Bank', 'Zain Jordan'], percentage: 45 },
      { name: 'Industrie', companies: ['JPMC', 'JPMC'], percentage: 20 },
      { name: 'Tourisme', companies: [], percentage: 15 },
      { name: 'Agriculture', companies: [], percentage: 5 },
      { name: 'Autres', companies: [], percentage: 15 }
    ],
    strategy: [
      'Stabilité politique',
      'Réformes économiques',
      'Développement des infrastructures',
      'Tourisme',
      'Énergie renouvelable'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?jordan-2000s',
      after: 'https://source.unsplash.com/800x600/?amman-modern'
    },
    milestones: [
      { year: 1999, event: 'Accession au trône d\'Abdallah II' },
      { year: 2011, event: 'Printemps arabe' },
      { year: 2016, event: 'Accord avec le FMI' },
      { year: 2018, event: 'Mouvements de protestation' },
      { year: 2020, event: 'Pandémie de COVID-19' }
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
      '2000': 21.6,
      '2010': 44.3,
      '2020': 39.2,
      '2024': 45.0
    },
    gdpPerCapita: 3500,
    population: 12000000,
    growthRate: 1.0,
    keySectors: [
      { name: 'Services', companies: ['Tunisie Telecom', 'BIAT'], percentage: 50 },
      { name: 'Industrie', companies: [], percentage: 25 },
      { name: 'Agriculture', companies: [], percentage: 10 },
      { name: 'Tourisme', companies: [], percentage: 10 },
      { name: 'Autres', companies: [], percentage: 5 }
    ],
    strategy: [
      'Transition démocratique',
      'Réformes économiques',
      'Développement régional',
      'Tourisme',
      'Énergies renouvelables'
    ],
    images: {
      before: 'https://source.unsplash.com/800x600/?tunisia-2000s',
      after: 'https://source.unsplash.com/800x600/?tunis-modern'
    },
    milestones: [
      { year: 2011, event: 'Révolution de Jasmin' },
      { year: 2014, event: 'Nouvelle constitution' },
      { year: 2015, event: 'Attentats terroristes' },
      { year: 2019, event: 'Élection de Kaïs Saïed' },
      { year: 2021, event: 'Crise politique' }
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
