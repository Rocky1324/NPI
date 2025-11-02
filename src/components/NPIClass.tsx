import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { npiData, wave1Countries, wave2Countries, wave3Countries, wave4Countries } from '../data/npi-data';

const Section: React.FC<{ title: string; children: React.ReactNode; icon?: string }> = ({ title, children, icon }) => (
  <motion.section 
    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-10 hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 flex items-center gap-3">
      {icon && <span className="text-3xl">{icon}</span>}
      {title}
    </h2>
    <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-5 [&>ul]:grid [&>ul]:grid-cols-1 [&>ul]:gap-2 [&>ul>li]:block [&>ol]:grid [&>ol]:grid-cols-1 [&>ol]:gap-2">
      {children}
    </div>
  </motion.section>
);

const Pill: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
      {children}
    </span>
  );
};

const CTAButton: React.FC<{ to: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }> = ({ to, children, variant = 'primary' }) => {
  const variantClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
    : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50';
  
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variantClasses}`}
    >
      {children}
    </Link>
  );
};

const InfoCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-shadow duration-200">
    <div className="text-3xl mb-3">{icon}</div>
    <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
  </div>
);

const buildSparkPath = (values: number[], width = 200, height = 60, padding = 6) => {
  if (!values.length) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1e-6, max - min);
  const stepX = (width - padding * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = padding + i * stepX;
    const y = height - padding - ((v - min) / span) * (height - padding * 2);
    return [x, y];
  });
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
};

const WaveMiniChart: React.FC<{ color: string; data: number[] }> = ({ color, data }) => {
  const path = useMemo(() => buildSparkPath(data), [data]);
  return (
    <svg viewBox="0 0 200 60" className="w-full h-20">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={`${path} L200,60 L0,60 Z`} fill={`url(#gradient-${color})`} />
      <path d={path} fill="none" stroke={color} strokeWidth={3} />
    </svg>
  );
};

const buildWaveSeries = (waveCountries: { gdp: Record<string, number> }[]) => {
  const yearsSet = new Set<string>();
  waveCountries.forEach(c => Object.keys(c.gdp).forEach(y => yearsSet.add(y)));
  const years = Array.from(yearsSet).map(Number).sort((a, b) => a - b).map(String);
  const series = years.map(y => waveCountries.reduce((sum, c) => sum + (c.gdp[y] || 0), 0));
  return { years, series };
};

const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<{[k:string]: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const correct: {[k:string]: string} = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'b',
  };
  const score = Object.keys(correct).reduce((s, k) => s + (answers[k] === correct[k] ? 1 : 0), 0);
  
  const questions = [
    {
      id: 'q1',
      question: 'Un NPI se caractérise principalement par...',
      options: [
        { v: 'a', t: "Une économie centrée sur l'agriculture" },
        { v: 'b', t: 'Une industrialisation rapide et des exportations' },
        { v: 'c', t: 'Une fermeture commerciale' },
        { v: 'd', t: 'Une stagnation du PIB' },
      ]
    },
    {
      id: 'q2',
      question: "La « 1ère vague » concerne surtout...",
      options: [
        { v: 'a', t: "Amérique latine années 2000" },
        { v: 'b', t: "Afrique subsaharienne années 90" },
        { v: 'c', t: "Asie de l'Est années 60-70 (dragons)" },
        { v: 'd', t: "Europe de l'Est années 80" },
      ]
    },
    {
      id: 'q3',
      question: 'Un risque souvent cité pour les NPI est...',
      options: [
        { v: 'a', t: "Le piège du revenu intermédiaire" },
        { v: 'b', t: 'La disparition des IDE' },
        { v: 'c', t: "L'absence d'urbanisation" },
        { v: 'd', t: 'Une baisse de la productivité partout' },
      ]
    },
    {
      id: 'q4',
      question: 'Quel facteur est crucial pour la réussite des NPI ?',
      options: [
        { v: 'a', t: "L'isolement commercial" },
        { v: 'b', t: "L'investissement en capital humain et R&D" },
        { v: 'c', t: "La dépendance aux matières premières" },
        { v: 'd', t: "La limitation de l'urbanisation" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <div key={q.id} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200">
          <div className="font-semibold text-gray-900 mb-3 flex items-start gap-2">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              {idx + 1}
            </span>
            <span className="pt-0.5">{q.question}</span>
          </div>
          <div className="grid grid-cols-1 gap-2 pl-9">
            {q.options.map(opt => {
              const isSelected = answers[q.id] === opt.v;
              const isCorrect = correct[q.id] === opt.v;
              const showResult = submitted;
              
              let borderColor = 'border-gray-300';
              let bgColor = 'bg-white hover:bg-gray-50';
              
              if (showResult) {
                if (isCorrect) {
                  borderColor = 'border-green-500';
                  bgColor = 'bg-green-50';
                } else if (isSelected && !isCorrect) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-50';
                }
              } else if (isSelected) {
                borderColor = 'border-blue-500';
                bgColor = 'bg-blue-50';
              }
              
              return (
                <label key={opt.v} className={`flex items-center gap-3 p-3 rounded-lg border-2 ${borderColor} ${bgColor} cursor-pointer transition-all duration-200`}>
                  <input 
                    type="radio" 
                    name={q.id} 
                    value={opt.v} 
                    checked={isSelected} 
                    onChange={(e) => setAnswers(a => ({...a, [q.id]: e.target.value}))}
                    disabled={submitted}
                    className="w-4 h-4"
                  />
                  <span className="flex-1">{opt.t}</span>
                  {showResult && isCorrect && <span className="text-green-600 font-bold">✓</span>}
                  {showResult && isSelected && !isCorrect && <span className="text-red-600 font-bold">✗</span>}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="flex items-center gap-4 pt-2">
        <button
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          onClick={() => setSubmitted(true)}
          disabled={submitted || Object.keys(answers).length < questions.length}
        >
          {submitted ? 'Quiz terminé' : 'Vérifier mes réponses'}
        </button>
        {submitted && (
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-900">
              Score: {score}/{questions.length}
            </span>
            <span className="text-2xl">
              {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
            </span>
          </div>
        )}
        {submitted && (
          <button
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors duration-200"
            onClick={() => { setAnswers({}); setSubmitted(false); }}
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
};

const NPIClass: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-8 sm:space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="text-6xl sm:text-7xl mb-4">🌏</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Nouveaux Pays Industrialisés
            </h1>
          </motion.div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'histoire fascinante des pays qui ont transformé leurs économies en quelques décennies, 
            passant de nations en développement à des puissances industrielles mondiales.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Pill color="blue">📈 Croissance rapide</Pill>
            <Pill color="green">🏭 Industrialisation</Pill>
            <Pill color="purple">🌐 Mondialisation</Pill>
            <Pill color="orange">💡 Innovation</Pill>
          </div>
        </div>

        {/* Introduction Section */}
        <Section title="Qu'est-ce qu'un NPI ?" icon="📚">
          <p className="text-lg font-medium text-gray-800 mb-4">
            Les <strong>Nouveaux Pays Industrialisés (NPI)</strong> représentent un phénomène économique majeur de la seconde moitié du XXe siècle.
          </p>
          <p>
            Ces pays ont réussi une transformation spectaculaire de leur structure économique, passant d'économies principalement agricoles 
            et de subsistance à des économies dynamiques centrées sur l'industrie manufacturière, les services modernes et l'exportation. 
            Ce processus, souvent qualifié de « miracle économique », s'est généralement déroulé sur une période de 20 à 40 ans, 
            avec des taux de croissance du PIB dépassant fréquemment 7-10% par an.
          </p>
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border-l-4 border-blue-600">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>💡</span> Point clé
            </h4>
            <p className="text-gray-700">
              Les NPI ne sont pas simplement des pays qui se développent : ce sont des nations qui ont réussi à 
              s'intégrer activement dans l'économie mondiale en devenant des acteurs majeurs du commerce international 
              et des chaînes de valeur globales.
            </p>
          </div>
        </Section>

        {/* Caractéristiques Section */}
        <Section title="Caractéristiques distinctives" icon="🎯">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoCard 
              icon="📊"
              title="Croissance économique soutenue"
              description="Augmentation du PIB de 5-10% par an sur plusieurs décennies, avec multiplication du PIB par habitant."
            />
            <InfoCard 
              icon="🏭"
              title="Transformation structurelle"
              description="Passage d'une économie agricole (>50% du PIB) à une économie industrielle et de services (>70%)."
            />
            <InfoCard 
              icon="📦"
              title="Orientation export"
              description="Les exportations représentent 30-60% du PIB, avec une diversification croissante des produits."
            />
            <InfoCard 
              icon="🌆"
              title="Urbanisation rapide"
              description="Taux d'urbanisation passant de 20-30% à 60-80% en quelques décennies."
            />
          </div>
          
          <h4 className="font-bold text-gray-900 mb-3 text-lg">Critères économiques détaillés :</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
              <div>
                <strong className="text-gray-900">Hausse soutenue du PIB et du revenu par habitant</strong>
                <p className="text-gray-600 text-sm mt-1">Croissance annuelle moyenne supérieure à 5% pendant au moins 2-3 décennies.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
              <div>
                <strong className="text-gray-900">Part croissante de l'industrie manufacturière</strong>
                <p className="text-gray-600 text-sm mt-1">L'industrie passe de 10-15% à 30-40% du PIB, avec montée en gamme technologique.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
              <div>
                <strong className="text-gray-900">Ouverture commerciale et compétitivité</strong>
                <p className="text-gray-600 text-sm mt-1">Intégration aux marchés mondiaux avec gains de parts de marché dans les secteurs clés.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">4</span>
              <div>
                <strong className="text-gray-900">Investissements massifs et diversifiés</strong>
                <p className="text-gray-600 text-sm mt-1">IDE, infrastructures (ports, routes, énergie), éducation (taux de scolarisation &gt;90%), R&amp;D (&gt;1% du PIB).</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">5</span>
              <div>
                <strong className="text-gray-900">Transition démographique</strong>
                <p className="text-gray-600 text-sm mt-1">Baisse de la mortalité puis de la natalité, création d'un « dividende démographique » avec une population active importante.</p>
              </div>
            </li>
          </ul>
        </Section>

        {/* Waves Section */}
        <Section title="Les quatre vagues d'industrialisation" icon="🌊">
          <p className="mb-6">
            L'émergence des NPI s'est produite par vagues successives, chacune caractérisée par des contextes géopolitiques, 
            des stratégies économiques et des opportunités technologiques spécifiques.
          </p>
          
          <div className="space-y-6">
            {(() => {
              const w1 = buildWaveSeries(wave1Countries);
              const w2 = buildWaveSeries(wave2Countries);
              const w3 = buildWaveSeries(wave3Countries);
              const w4 = buildWaveSeries(wave4Countries);
              
              const waves = [
                {
                  title: '1ère vague : Les Dragons Asiatiques',
                  period: 'Années 1960-1970',
                  icon: '🐉',
                  countries: 'Corée du Sud, Taïwan, Hong Kong, Singapour',
                  description: 'La première vague marque le début du « miracle asiatique ». Ces pays, appelés les « Quatre Dragons », ont mis en œuvre des stratégies de développement dirigées par l\'État avec des politiques industrielles ciblées.',
                  features: [
                    'Modèle de « l\'État développeur » : planification stratégique et soutien aux industries naissantes',
                    'Investissements massifs dans l\'éducation (taux d\'alphabétisation >95% en 20 ans)',
                    'Zones économiques spéciales et promotion des exportations',
                    'Montée en gamme rapide : du textile aux semi-conducteurs en une génération'
                  ],
                  color: '#2563eb',
                  data: w1.series
                },
                {
                  title: '2ème vague : Diversification géographique',
                  period: 'Années 1980-1990',
                  icon: '🏭',
                  countries: 'Malaisie, Thaïlande, Indonésie, Mexique, Chili, Turquie',
                  description: 'Cette vague se caractérise par une diversification géographique et l\'émergence de nouveaux modèles. L\'industrialisation est davantage tirée par les IDE et l\'intégration aux chaînes de valeur mondiales.',
                  features: [
                    'Délocalisation d\'industries des Dragons vers des pays à coûts plus faibles',
                    'Rôle croissant des firmes multinationales et IDE',
                    'Accords commerciaux régionaux (ALENA pour le Mexique, ASEAN en Asie)',
                    'Spécialisation dans des segments de production (assemblage, composants)'
                  ],
                  color: '#f59e0b',
                  data: w2.series
                },
                {
                  title: '3ème vague : Les Géants émergents',
                  period: 'Années 2000+',
                  icon: '🚀',
                  countries: 'Chine, Vietnam, Inde, Indonésie, Philippines',
                  description: 'La troisième vague est dominée par l\'ascension spectaculaire de la Chine, devenue « l\'usine du monde », et l\'émergence de nouveaux géants démographiques. Cette période voit une intégration sans précédent aux chaînes de valeur globales.',
                  features: [
                    'La Chine : réformes de Deng Xiaoping, zones économiques spéciales, entrée à l\'OMC (2001)',
                    'Révolution numérique et « saut technologique » (leapfrogging)',
                    'Développement des services TI (Inde : Bangalore, Hyderabad)',
                    'Montée en puissance technologique : de l\'assemblage à l\'innovation (Huawei, Alibaba)'
                  ],
                  color: '#eab308',
                  data: w3.series
                },
                {
                  title: '4ème vague : Nouvelle génération',
                  period: 'Années 2010+',
                  icon: '🌐',
                  countries: 'Bangladesh, Pakistan, Éthiopie, Kenya, pays d\'Afrique subsaharienne',
                  description: 'La quatrième vague représente les nouveaux candidats à l\'industrialisation, bénéficiant de la délocalisation d\'industries à faible valeur ajoutée depuis la Chine (dont les coûts augmentent) vers des pays à très faible revenu.',
                  features: [
                    'Secteur textile et confection (Bangladesh : 2ème exportateur mondial)',
                    'Opportunités liées au dividende démographique africain',
                    'Technologies mobiles et économie numérique',
                    'Défis : infrastructures limitées, stabilité politique, formation'
                  ],
                  color: '#10b981',
                  data: w4.series
                }
              ];
              
              return waves.map((wave, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                    <div className="lg:col-span-3 space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl flex items-center gap-3 mb-2">
                          <span className="text-3xl">{wave.icon}</span>
                          {wave.title}
                        </h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
                            {wave.period}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">{wave.countries}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{wave.description}</p>
                      <ul className="space-y-2">
                        {wave.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="flex-shrink-0 text-blue-600 font-bold mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="p-4 rounded-xl bg-white border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Évolution du PIB agrégé</div>
                        <WaveMiniChart color={wave.color} data={wave.data} />
                      </div>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
            <h4 className="font-bold text-xl mb-3">🔍 Explorer les données en détail</h4>
            <p className="mb-4 text-blue-50">
              Visualisez les trajectoires de ces pays à travers nos outils interactifs : chronologies détaillées, cartes géographiques et comparaisons multidimensionnelles.
            </p>
            <div className="flex flex-wrap gap-3">
              <CTAButton to="/timeline" variant="secondary">📅 Chronologie interactive</CTAButton>
              <CTAButton to="/carte" variant="secondary">🗺️ Carte mondiale</CTAButton>
              <CTAButton to="/comparaison" variant="secondary">📊 Comparer les pays</CTAButton>
            </div>
          </div>
        </Section>

        {/* Success Factors */}
        <Section title="Facteurs clés de réussite" icon="🔑">
          <p className="mb-6">
            Les recherches académiques et les études de cas ont identifié plusieurs facteurs récurrents dans les trajectoires de succès des NPI :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                État stratège et gouvernance
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>Soutien aux industries naissantes (protection temporaire, subventions ciblées)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span>Planification stratégique et vision à long terme (plans quinquennaux)</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Capital humain et éducation
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2 w-full">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Investissements massifs dans l'éducation primaire et secondaire (&gt;4% du PIB)</span>
                </li>
                <li className="flex items-start gap-2 w-full">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Formation technique et professionnelle adaptée aux besoins industriels</span>
                </li>
                <li className="flex items-start gap-2 w-full">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Développement de centres de R&D et d'universités de recherche</span>
                </li>
                <li className="flex items-start gap-2 w-full">
                  <span className="text-green-600 mt-1">→</span>
                  <span>Programmes d'envoi d'étudiants à l'étranger et transfert de connaissances</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚄</span>
                Infrastructures modernes
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">→</span>
                  <span>Ports et zones logistiques de classe mondiale (Singapour, Busan, Shanghai)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">→</span>
                  <span>Réseaux de transport efficaces (routes, trains à grande vitesse)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">→</span>
                  <span>Accès fiable à l'énergie et aux télécommunications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">→</span>
                  <span>Parcs industriels et zones économiques spéciales bien équipées</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Insertion internationale
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Attraction des IDE par un environnement des affaires favorable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Participation aux chaînes de valeur globales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Accords commerciaux bilatéraux et régionaux (ASEAN, ALENA, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Diversification progressive des marchés d'exportation</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span>⚠️</span> Important à noter
            </h4>
            <p className="text-gray-700 text-sm">
              Il n'existe pas de « recette unique » pour devenir un NPI. Chaque pays a adapté ces facteurs à son contexte 
              spécifique (géographie, histoire, culture, dotations en ressources). La combinaison optimale varie selon les 
              périodes et les conditions géopolitiques globales.
            </p>
          </div>
        </Section>

        {/* Case Studies */}
        <Section title="Études de cas approfondies" icon="🔬">
          <p className="mb-6">
            Quatre trajectoires emblématiques qui illustrent les différentes voies vers l'industrialisation :
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { 
                id: 'south-korea', 
                name: 'Corée du Sud 🇰🇷', 
                flag: '🐉',
                period: '1960-1990',
                summary: "Du pays ravagé par la guerre au leader technologique mondial",
                details: [
                  'PIB par habitant : $100 (1960) → $6,000 (1990) → $35,000+ (2020)',
                  'Stratégie des chaebols (Samsung, Hyundai, LG) soutenus par l\'État',
                  'Investissement en R&D : 0.4% (1970) → 4.8% du PIB (2020) - leader mondial',
                  'Montée en gamme : textile → acier → électronique → semi-conducteurs → IA',
                  'Taux d\'alphabétisation : 71% (1960) → 98%+ (1990)'
                ]
              },
              { 
                id: 'china', 
                name: 'Chine 🇨🇳', 
                flag: '🚀',
                period: '1978-présent',
                summary: "L'ascension spectaculaire vers la 2ème économie mondiale",
                details: [
                  'Réformes de Deng Xiaoping (1978) : « économie socialiste de marché »',
                  'Zones économiques spéciales : Shenzhen, Shanghai, etc.',
                  'Croissance moyenne : 9-10% par an pendant 40 ans',
                  'Population sortie de la pauvreté : 800+ millions de personnes',
                  'Transition : « usine du monde » → économie de l\'innovation (Huawei, Alibaba, Tencent)',
                  'Initiatives : Made in China 2025, Belt and Road Initiative'
                ]
              },
              { 
                id: 'vietnam', 
                name: 'Vietnam 🇻🇳', 
                flag: '🌟',
                period: '1986-présent',
                summary: "Réformes Đổi Mới et intégration aux chaînes de valeur",
                details: [
                  'Đổi Mới (1986) : transition vers l\'économie de marché',
                  'Croissance : 6-7% par an depuis 1990',
                  'Diversification : textile → électronique (Samsung, Apple)',
                  'Accords commerciaux : CPTPP, EVFTA, RCEP',
                  'IDE massifs : 15-20 milliards USD/an',
                  'Population jeune et bien formée (taux d\'alphabétisation >95%)'
                ]
              },
              { 
                id: 'mexico', 
                name: 'Mexique 🇲🇽', 
                flag: '🏭',
                period: '1980-présent',
                summary: "Maquiladoras et intégration nord-américaine",
                details: [
                  'Programme Maquiladora (1965) : zones franches frontalières',
                  'ALENA/USMCA : intégration profonde avec USA/Canada',
                  'Industrie automobile : 4ème exportateur mondial',
                  'Aéronautique : hub majeur (Bombardier, Airbus)',
                  'Défis : inégalités régionales, dépendance au marché US',
                  'Nearshoring : opportunités post-COVID'
                ]
              }
            ].map(country => (
              <div key={country.id} className="p-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-1 flex items-center gap-2">
                      <span className="text-2xl">{country.flag}</span>
                      {country.name}
                    </h4>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{country.period}</span>
                  </div>
                </div>
                <p className="text-gray-700 font-medium mb-4 italic">{country.summary}</p>
                <div className="space-y-2 mb-5">
                  {country.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                  <CTAButton to={`/timeline?country=${country.id}`}>📅 Chronologie</CTAButton>
                  <CTAButton to={`/comparaison?country=${country.id}`}>📊 Comparer</CTAButton>
                  <CTAButton to={`/carte?country=${country.id}`}>🗺️ Carte</CTAButton>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Challenges and Debates */}
        <Section title="Limites, défis et débats contemporains" icon="⚖️">
          <p className="mb-6">
            Si le modèle NPI a produit des succès remarquables, il fait face à des limites structurelles et soulève 
            d'importants débats académiques et politiques :
          </p>
          
          <div className="space-y-5">
            <div className="p-5 rounded-xl bg-red-50 border-l-4 border-red-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Le piège du revenu intermédiaire
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                De nombreux NPI peinent à franchir le seuil des pays à revenu élevé (~$12,000-15,000 par habitant). 
                Ils perdent leur avantage de coûts bas sans acquérir les capacités d'innovation des pays avancés.
              </p>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Exemples :</strong> Malaisie, Thaïlande, Mexique stagnent depuis 20 ans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span><strong>Causes :</strong> Sous-investissement en R&D, éducation insuffisante, institutions faibles</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-orange-50 border-l-4 border-orange-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">📉</span>
                Vulnérabilité aux chocs externes
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                La forte dépendance aux exportations rend les NPI vulnérables aux crises mondiales 
                (crise asiatique 1997-98, crise financière 2008, COVID-19, tensions commerciales).
              </p>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">•</span>
                  <span><strong>Risque de change :</strong> Crises de dette en devises étrangères</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600">•</span>
                  <span><strong>Dépendance :</strong> Ralentissement de la demande mondiale = récession locale</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-purple-50 border-l-4 border-purple-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                Inégalités et coûts sociaux
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                La croissance rapide s'accompagne souvent d'inégalités croissantes et de conditions de travail difficiles.
              </p>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Inégalités régionales :</strong> Zones urbaines riches vs. zones rurales pauvres</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Conditions de travail :</strong> Salaires bas, horaires longs, sécurité insuffisante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">•</span>
                  <span><strong>Exclusion :</strong> Certains groupes (femmes, minorités) moins bénéficiaires</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-green-50 border-l-4 border-green-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                Défis environnementaux
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                L'industrialisation rapide a souvent eu lieu sans contrôles environnementaux suffisants.
              </p>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Pollution :</strong> Air, eau, sols contaminés (Chine, Inde)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Émissions CO₂ :</strong> Contribution majeure au changement climatique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span><strong>Défi :</strong> Concilier croissance et transition écologique</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl bg-blue-50 border-l-4 border-blue-500">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🤔</span>
                Débat : État vs. Marché
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Quel est le rôle optimal de l'État dans le développement ? Les économistes restent divisés.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">👍 Pro État développeur</div>
                  <p className="text-gray-700">Les succès des Dragons montrent qu'une intervention étatique stratégique peut corriger les défaillances de marché et accélérer le développement.</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">👎 Pro Marché libre</div>
                  <p className="text-gray-700">Les interventions étatiques créent des distorsions, de la corruption et des inefficiences. Mieux vaut laisser le marché allouer les ressources.</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-3 italic">
                Consensus émergent : Un « État intelligent » qui combine soutien stratégique et discipline de marché, 
                avec institutions transparentes et évaluations rigoureuses.
              </p>
            </div>
          </div>
        </Section>

        {/* Interactive Tools */}
        <Section title="Explorer avec nos outils interactifs" icon="🛠️">
          <p className="mb-6">
            Passez de la théorie à la pratique en explorant les données réelles des NPI à travers nos trois outils interactifs :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Link to="/timeline" className="group p-6 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="font-bold text-xl mb-2">Chronologie</h4>
              <p className="text-blue-100 text-sm">
                Visualisez l'évolution temporelle des indicateurs économiques : PIB, exportations, phases de développement.
              </p>
            </Link>
            
            <Link to="/carte" className="group p-6 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="font-bold text-xl mb-2">Carte interactive</h4>
              <p className="text-purple-100 text-sm">
                Explorez la géographie des NPI et comparez les performances régionales à travers le monde.
              </p>
            </Link>
            
            <Link to="/comparaison" className="group p-6 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-xl mb-2">Comparaison</h4>
              <p className="text-green-100 text-sm">
                Comparez directement plusieurs pays sur différents indicateurs pour identifier patterns et divergences.
              </p>
            </Link>
          </div>
        </Section>

        {/* Glossary */}
        <Section title="Glossaire des concepts clés" icon="📖">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { term: 'PIB (Produit Intérieur Brut)', def: 'Valeur totale des biens et services produits dans un pays sur une période donnée. Principal indicateur de richesse nationale.' },
              { term: 'PIB par habitant', def: 'PIB divisé par la population. Mesure le niveau de vie moyen. Critère clé pour classer les pays (bas, moyen, élevé revenu).' },
              { term: 'IDE (Investissements Directs Étrangers)', def: 'Investissements réalisés par des entreprises étrangères dans le pays (usines, acquisitions). Source majeure de capital et de technologie.' },
              { term: 'Montée en gamme', def: 'Passage à des productions à plus forte valeur ajoutée : du textile aux semi-conducteurs, de l\'assemblage à l\'innovation.' },
              { term: 'Chaînes de valeur mondiales', def: 'Fragmentation de la production entre pays : conception (pays A), composants (pays B), assemblage (pays C), vente (pays D).' },
              { term: 'Zones économiques spéciales (ZES)', def: 'Territoires avec régimes fiscaux et réglementaires favorables pour attirer les IDE et promouvoir les exportations.' },
              { term: 'Substitution aux importations', def: 'Stratégie visant à produire localement ce qui était importé, en protégeant les industries naissantes (barrières tarifaires).' },
              { term: 'Promotion des exportations', def: 'Stratégie inverse : orienter la production vers les marchés mondiaux pour bénéficier d\'économies d\'échelle et de compétitivité.' },
              { term: 'Dividende démographique', def: 'Période où la population active (15-64 ans) croît plus vite que la population totale, créant un potentiel de croissance.' },
              { term: 'R&D (Recherche et Développement)', def: 'Investissements dans l\'innovation technologique. Les pays avancés investissent 2-4% de leur PIB en R&D.' },
              { term: 'Piège du revenu intermédiaire', def: 'Difficulté à passer du statut de revenu moyen à revenu élevé. Le pays perd son avantage de coûts sans acquérir l\'innovation.' },
              { term: 'Chaebol', def: 'Conglomérats familiaux sud-coréens (Samsung, Hyundai, LG) qui ont joué un rôle central dans l\'industrialisation du pays.' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-2">{item.term}</h5>
                <p className="text-gray-700 text-sm">{item.def}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* References */}
        <Section title="Références et ressources" icon="📚">
          <p className="mb-4">
            Pour approfondir vos connaissances sur les NPI, consultez ces sources académiques et institutionnelles de référence :
          </p>
          
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h5 className="font-semibold text-gray-900 mb-2">🏛️ Organisations internationales</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="https://data.worldbank.org/" target="_blank" rel="noreferrer">
                    Banque mondiale (World Bank)
                  </a>
                  <span className="text-gray-600"> — Données économiques, rapports sur le développement</span>
                </li>
                <li>
                  <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="https://www.oecd.org/" target="_blank" rel="noreferrer">
                    OCDE
                  </a>
                  <span className="text-gray-600"> — Analyses comparatives, politiques économiques</span>
                </li>
                <li>
                  <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="https://stat.unido.org/" target="_blank" rel="noreferrer">
                    ONUDI (UNIDO)
                  </a>
                  <span className="text-gray-600"> — Statistiques sur l'industrie manufacturière mondiale</span>
                </li>
                <li>
                  <a className="text-blue-600 hover:text-blue-800 hover:underline font-medium" href="https://unctad.org/" target="_blank" rel="noreferrer">
                    CNUCED (UNCTAD)
                  </a>
                  <span className="text-gray-600"> — Commerce international, IDE, développement</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <h5 className="font-semibold text-gray-900 mb-2">📖 Ouvrages de référence</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <span><strong>Rodrik, D.</strong> (2007). <em>One Economics, Many Recipes: Globalization, Institutions, and Economic Growth</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <span><strong>Amsden, A.</strong> (1989). <em>Asia's Next Giant: South Korea and Late Industrialization</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span>
                  <span><strong>Wade, R.</strong> (1990). <em>Governing the Market: Economic Theory and the Role of Government</em></span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Key Takeaways */}
        <Section title="🎯 Points clés à retenir" icon="">
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <h4 className="font-bold text-xl mb-3">Synthèse du cours</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">1️⃣</span>
                  <div>
                    <strong className="block mb-1">Les NPI suivent des trajectoires d'industrialisation rapides</strong>
                    <span className="text-blue-100 text-sm">Passant d'économies agricoles à des puissances industrielles en 2-4 décennies, avec des taux de croissance de 7-10% par an.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">2️⃣</span>
                  <div>
                    <strong className="block mb-1">Quatre vagues successives avec des contextes différents</strong>
                    <span className="text-blue-100 text-sm">Dragons asiatiques (60-70), diversification (80-90), géants émergents (2000+), nouvelle génération (2010+).</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">3️⃣</span>
                  <div>
                    <strong className="block mb-1">Facteurs clés : État, capital humain, infrastructures, ouverture</strong>
                    <span className="text-blue-100 text-sm">Pas de recette unique, mais des combinaisons adaptées au contexte de chaque pays.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">4️⃣</span>
                  <div>
                    <strong className="block mb-1">Défis persistants : piège du revenu intermédiaire, inégalités, environnement</strong>
                    <span className="text-blue-100 text-sm">Le modèle NPI fait face à des limites structurelles qui nécessitent des adaptations continues.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-2xl">5️⃣</span>
                  <div>
                    <strong className="block mb-1">L'avenir : innovation, durabilité, inclusion</strong>
                    <span className="text-blue-100 text-sm">Les NPI de demain devront concilier croissance économique, justice sociale et transition écologique.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl border-2 border-blue-200 bg-blue-50">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-xl">💭</span>
                Questions de réflexion
              </h4>
              <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Le modèle des Dragons asiatiques peut-il être répliqué en Afrique subsaharienne aujourd'hui ? Quels obstacles spécifiques ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Comment les NPI peuvent-ils échapper au piège du revenu intermédiaire ? Quels exemples de succès ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>L'automatisation et l'IA remettent-elles en question le modèle traditionnel d'industrialisation par la main-d'œuvre à bas coûts ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>Comment concilier objectifs de croissance rapide et impératifs de développement durable ?</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Quiz */}
        <Section title="Quiz de validation des connaissances" icon="✅">
          <p className="mb-6">
            Testez votre compréhension du cours avec ce quiz interactif. Répondez aux 4 questions pour évaluer vos acquis.
          </p>
          <Quiz />
          
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🎓</span>
              Aller plus loin
            </h4>
            <p className="text-gray-700 text-sm mb-4">
              Félicitations pour avoir complété ce cours ! Pour approfondir vos connaissances :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link to="/timeline" className="p-4 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="font-semibold text-gray-900 text-sm">Explorer la chronologie</div>
              </Link>
              <Link to="/carte" className="p-4 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 text-center">
                <div className="text-3xl mb-2">🗺️</div>
                <div className="font-semibold text-gray-900 text-sm">Carte interactive</div>
              </Link>
              <Link to="/comparaison" className="p-4 rounded-lg bg-white border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-gray-900 text-sm">Comparer les pays</div>
              </Link>
            </div>
          </div>
        </Section>

        {/* Footer Navigation */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Continuez votre exploration des NPI</h3>
            <p className="text-gray-300 text-sm">
              Utilisez nos outils interactifs pour analyser les données en profondeur
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/timeline" 
              className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">📅</div>
              <h4 className="font-bold text-lg mb-2">Chronologie interactive</h4>
              <p className="text-gray-300 text-sm">
                Suivez l'évolution historique des indicateurs économiques pays par pays
              </p>
              <div className="mt-4 text-blue-300 text-sm font-semibold flex items-center gap-2">
                Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
            
            <Link 
              to="/carte" 
              className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="font-bold text-lg mb-2">Carte mondiale</h4>
              <p className="text-gray-300 text-sm">
                Visualisez la géographie des NPI et leurs performances régionales
              </p>
              <div className="mt-4 text-purple-300 text-sm font-semibold flex items-center gap-2">
                Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
            
            <Link 
              to="/comparaison" 
              className="group p-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-bold text-lg mb-2">Comparaison détaillée</h4>
              <p className="text-gray-300 text-sm">
                Comparez plusieurs pays sur différents indicateurs économiques
              </p>
              <div className="mt-4 text-green-300 text-sm font-semibold flex items-center gap-2">
                Explorer <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-gray-400 text-sm">
              Ce cours fait partie du tableau de bord interactif sur les Nouveaux Pays Industrialisés
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPIClass;