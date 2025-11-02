import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { npiData } from '../data/npi-data';

// Define the decades we want to show in the timeline
const decades = [
  { year: 1960, label: '1960s', start: 1960, end: 1969 },
  { year: 1970, label: '1970s', start: 1970, end: 1979 },
  { year: 1980, label: '1980s', start: 1980, end: 1989 },
  { year: 1990, label: '1990s', start: 1990, end: 1999 },
  { year: 2000, label: '2000s', start: 2000, end: 2009 },
  { year: 2010, label: '2010s', start: 2010, end: 2019 },
  { year: 2020, label: '2020s', start: 2020, end: 2024 },
];

// Key events in NPI history
const keyEvents = [
  { year: 1960, title: 'Début des 4 dragons asiatiques', description: 'Corée du Sud, Taïwan, Hong Kong et Singapour entament leur transformation économique.' },
  { year: 1973, title: 'Premier choc pétrolier', description: 'La crise pétrolière affecte les économies mondiales mais profite aux NPI exportateurs de pétrole.' },
  { year: 1980, title: 'Ouverture économique de la Chine', description: 'Deng Xiaoping lance les réformes économiques en Chine.' },
  { year: 1997, title: 'Crise financière asiatique', description: 'Une crise financière frappe plusieurs économies asiatiques, affectant particulièrement la Thaïlande, l\'Indonésie et la Corée du Sud.' },
  { year: 2001, title: 'Entrée de la Chine dans l\'OMC', description: 'La Chine rejoint l\'Organisation mondiale du commerce, accélérant son intégration dans l\'économie mondiale.' },
  { year: 2008, title: 'Crise financière mondiale', description: 'La crise des subprimes affecte les économies mondiales, mais plusieurs NPI montrent une résilience remarquable.' },
  { year: 2020, title: 'Pandémie de COVID-19', description: 'La pandémie mondiale perturbe les chaînes d\'approvisionnement mondiales, avec des impacts variés sur les NPI.' },
];

const Timeline: React.FC = () => {
  const [currentDecade, setCurrentDecade] = useState(decades[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEvent, setShowEvent] = useState<typeof keyEvents[0] | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter NPI countries that were active in the current decade
  const activeCountries = npiData.countries.filter(country => {
    const startYear = Math.max(1960, Math.min(...Object.keys(country.gdp).map(Number)));
    return startYear <= currentDecade.end;
  });

  // Group countries by wave for display
  const countriesByWave = activeCountries.reduce((acc, country) => {
    if (!acc[country.wave]) {
      acc[country.wave] = [];
    }
    acc[country.wave].push(country);
    return acc;
  }, {} as Record<number, typeof npiData.countries>);

  // Handle play/pause of the timeline
  useEffect(() => {
    if (isPlaying) {
      playTimeoutRef.current = setTimeout(() => {
        const currentIndex = decades.findIndex(d => d.year === currentDecade.year);
        const nextIndex = (currentIndex + 1) % decades.length;
        setCurrentDecade(decades[nextIndex]);
        
        // Show key event if any for this decade
        const event = keyEvents.find(e => Math.floor(e.year / 10) * 10 === Math.floor(decades[nextIndex].year / 10) * 10);
        if (event) {
          setShowEvent(event);
          setTimeout(() => setShowEvent(null), 5000); // Hide after 5 seconds
        }
      }, 3000); // Change decade every 3 seconds
    }
    
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
    };
  }, [isPlaying, currentDecade]);

  // Handle decade change
  const handleDecadeChange = (decade: typeof decades[0]) => {
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }
    setIsPlaying(false);
    setCurrentDecade(decade);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get color for wave
  const getWaveColor = (wave: number) => {
    switch (wave) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Get wave label
  const getWaveLabel = (wave: number) => {
    switch (wave) {
      case 1: return '1ère vague (années 60-70)';
      case 2: return '2ème vague (années 80-90)';
      case 3: return '3ème vague (années 2000+)';
      default: return 'Autre';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Évolution des NPI dans le temps
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explorez l'évolution historique des Nouveaux Pays Industrialisés depuis les années 1960
          </p>
        </div>
        
        {/* Timeline Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {currentDecade.label}
              </h2>
              <span className="inline-block mt-1 text-sm sm:text-base text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                {activeCountries.length} pays actifs
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={togglePlay}
                className="flex items-center justify-center gap-2 px-7 py-3 text-base bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-pressed={isPlaying}
                aria-label={isPlaying ? 'Mettre en pause la chronologie' : 'Lire la chronologie'}
              >
                {isPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Pause</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold">Lecture</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <button 
                  onClick={() => {
                    const currentIndex = decades.findIndex(d => d.year === currentDecade.year);
                    const prevIndex = (currentIndex - 1 + decades.length) % decades.length;
                    handleDecadeChange(decades[prevIndex]);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Décennie précédente"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="mx-3 sm:mx-4 text-gray-700 font-semibold min-w-[60px] text-center">
                  {currentDecade.label}
                </div>
                
                <button 
                  onClick={() => {
                    const currentIndex = decades.findIndex(d => d.year === currentDecade.year);
                    const nextIndex = (currentIndex + 1) % decades.length;
                    handleDecadeChange(decades[nextIndex]);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Décennie suivante"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Timeline Slider */}
          <div className="relative pt-4">
            <div className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 shadow-md" 
                style={{ 
                  width: `${((currentDecade.year - 1960) / (2020 - 1960)) * 100}%` 
                }}
              ></div>
            </div>
            
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-gray-100 rounded-full p-2">
                {decades.map((decade) => (
                  <button
                    key={decade.year}
                    onClick={() => handleDecadeChange(decade)}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      decade.year === currentDecade.year
                        ? 'bg-white text-blue-700 shadow border border-blue-200'
                        : 'text-gray-700 hover:bg-white/70'
                    }`}
                    style={{
                      marginLeft: decade === decades[0] ? '0' : undefined,
                    }}
                    aria-pressed={decade.year === currentDecade.year}
                    aria-label={`Décennie ${decade.label}`}
                  >
                    {decade.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500 font-medium">
              <span>1960</span>
              <span>2024</span>
            </div>
          </div>
        </div>
        
        {/* Key Events Overlay */}
        <AnimatePresence>
          {showEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-xl max-w-sm z-50 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg mb-2">📅 {showEvent.year}: {showEvent.title}</h3>
                <button 
                  onClick={() => setShowEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-700">{showEvent.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Countries by Wave */}
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(countriesByWave).map(([wave, countries]) => (
            <div key={wave} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className={`${getWaveColor(parseInt(wave))} px-4 sm:px-6 py-4 bg-gradient-to-r`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-bold text-base sm:text-lg md:text-xl flex items-center">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 text-sm sm:text-base">
                      {wave}
                    </span>
                    {getWaveLabel(parseInt(wave))}
                  </h2>
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {countries.length} pays
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {countries.map(country => {
                  const gdpData = Object.entries(country.gdp)
                    .sort(([a], [b]) => Number(a) - Number(b));
                  
                  const startYear = Math.max(1960, parseInt(gdpData[0][0]));
                  const endYear = Math.min(2024, parseInt(gdpData[gdpData.length - 1][0]));
                  const isActive = currentDecade.start >= startYear && currentDecade.start <= endYear;
                  
                  // Find GDP for current decade or closest available
                  let gdp = 0;
                  let gdpYear = currentDecade.start;
                  
                  while (gdpYear >= startYear && !country.gdp[gdpYear]) {
                    gdpYear--;
                  }
                  
                  if (gdpYear >= startYear) {
                    gdp = country.gdp[gdpYear];
                  }
                  
                  return (
                    <motion.div
                      key={country.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0.6,
                        y: 0,
                        scale: isActive ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative overflow-hidden rounded-xl p-4 sm:p-5 transition-all ${
                        isActive 
                          ? 'bg-gradient-to-br from-white to-blue-50 shadow-lg border-2 border-blue-200 hover:shadow-xl' 
                          : 'bg-white border border-gray-200 opacity-70'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                            <span className="text-2xl sm:text-3xl">{country.flag}</span>
                            <span className="text-gray-800">{country.name}</span>
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">
                            {startYear}-{endYear}
                          </p>
                        </div>
                        {isActive && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-400 to-green-600 text-white shadow-sm">
                            ● Actif
                          </span>
                        )}
                      </div>
                      
                      {isActive && gdp > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>PIB ({gdpYear})</span>
                            <span className="font-medium">${gdp} milliards</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-full rounded-full ${getWaveColor(parseInt(wave))}`}
                              style={{ 
                                width: `${Math.min(100, (gdp / 2000) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {!isActive && (
                        <div className="mt-2 text-sm text-gray-500">
                          {currentDecade.start < startYear 
                            ? `Émergence prévue dans les années ${startYear}s`
                            : `Période d'activité terminée`}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Decade Summary */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-lg p-5 sm:p-8 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            Contexte des années {currentDecade.label}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {getDecadeSummary(currentDecade.year)}
          </p>
        </div>
      </div>
    </div>
  );
};

const getDecadeSummary = (year: number) => {
  switch (year) {
    case 1960:
      return "Les années 1960 marquent le début de l'émergence des Nouveaux Pays Industrialisés (NPI) avec les 'Quatre Dragons Asiatiques' (Corée du Sud, Taïwan, Hong Kong et Singapour) qui entament leur décollage économique grâce à des politiques industrielles volontaristes et une orientation vers l'exportation.";
    case 1970:
      return "Dans les années 1970, les premiers NPI consolident leur croissance malgré les chocs pétroliers. Leur modèle économique axé sur les exportations de biens manufacturés commence à porter ses fruits, attirant les investissements étrangers.";
    case 1980:
      return "Les années 1980 voient l'émergence d'une deuxième vague de NPI en Asie du Sud-Est (Malaisie, Thaïlande) et en Amérique latine. La mondialisation s'accélère, favorisant la délocalisation des industries vers ces pays à main-d'œuvre compétitive.";
    case 1990:
      return "La décennie 1990 est marquée par la crise financière asiatique de 1997 qui affecte durement plusieurs NPI. Cependant, ces pays rebondissent rapidement, renforçant leurs systèmes financiers et diversifiant leurs économies.";
    case 2000:
      return "Les années 2000 voient l'émergence spectaculaire de la Chine comme puissance économique majeure, ainsi que l'essor d'autres économies comme le Vietnam et l'Inde. Les NPI deviennent des acteurs clés des chaînes de valeur mondiales.";
    case 2010:
      return "Dans les années 2010, les NPI continuent leur croissance malgré le ralentissement économique mondial. Ils investissent massivement dans les nouvelles technologies et l'innovation, réduisant progressivement leur écart avec les pays développés.";
    case 2020:
      return "Les années 2020 commencent avec la pandémie de COVID-19 qui perturbe les chaînes d'approvisionnement mondiales. Les NPI démontrent une certaine résilience, avec certains pays comme la Corée du Sud et Taïwan tirant leur épingle du jeu grâce à leurs secteurs technologiques performants.";
    default:
      return "Sélectionnez une décennie pour voir un résumé des événements marquants pour les NPI.";
  }
};

export default Timeline;
