import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { npiData } from '../data/npi-data';

const comparisonOptions = [
  { value: 'gdp', label: 'PIB total (milliards $)' },
  { value: 'gdpPerCapita', label: 'PIB par habitant ($)' },
  { value: 'population', label: 'Population (millions)' },
  { value: 'growthRate', label: 'Taux de croissance (%)' },
];

const CountryComparison: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['south-korea']);
  const [comparisonType, setComparisonType] = useState<string>('gdp');
  
  const availableCountries = npiData.countries.filter(
    country => !selectedCountries.includes(country.id)
  );

  const addCountry = (countryId: string) => {
    if (selectedCountries.length < 4 && countryId && !selectedCountries.includes(countryId)) {
      setSelectedCountries([...selectedCountries, countryId]);
    }
  };

  const removeCountry = (countryId: string) => {
    setSelectedCountries(selectedCountries.filter(id => id !== countryId));
  };

  const getChartData = () => {
    const countries = npiData.countries.filter(country => 
      selectedCountries.includes(country.id)
    );

    const labels = Object.keys(countries[0]?.gdp || {}).sort();
    
    const datasets = countries.map(country => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue(`--color-${getWaveColor(country.wave)}`);
      
      return {
        label: country.name,
        data: labels.map(year => {
          if (comparisonType === 'gdp') return country.gdp[year];
          if (comparisonType === 'gdpPerCapita') {
            const gdp = country.gdp[year] * 1000000000; // Convert to dollars
            const population = country.population * (Number(year) / 2024); // Simple estimation
            return Math.round(gdp / population);
          }
          if (comparisonType === 'population') {
            return Math.round(country.population * (Number(year) / 2024) / 1000000);
          }
          return country.growthRate;
        }),
        borderColor: color,
        backgroundColor: `${color}80`,
        tension: 0.3,
        fill: false
      };
    });

    return {
      labels,
      datasets
    };
  };

  const getWaveColor = (wave: number) => {
    switch (wave) {
      case 1: return 'red-500';
      case 2: return 'orange-500';
      case 3: return 'yellow-500';
      default: return 'gray-500';
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: comparisonOptions.find(opt => opt.value === comparisonType)?.label,
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Comparaison des NPI
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Comparez les performances économiques de jusqu'à 4 pays
          </p>
        </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Sélection des pays</h2>
            <div className="space-y-3">
              {selectedCountries.map(countryId => {
                const country = npiData.countries.find(c => c.id === countryId);
                if (!country) return null;
                
                return (
                  <div 
                    key={countryId} 
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-800">{country.name}</span>
                    </div>
                    <button 
                      onClick={() => removeCountry(countryId)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                      aria-label={`Retirer ${country.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
              
              {selectedCountries.length < 4 && (
                <select
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-full bg-white text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 hover:border-blue-300 transition-all"
                  value=""
                  onChange={(e) => addCountry(e.target.value)}
                >
                  <option value="" disabled>+ Ajouter un pays (max 4)</option>
                  {availableCountries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Type de comparaison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comparisonOptions.map(option => (
                <button
                  key={option.value}
                  className={`group flex items-start p-4 rounded-xl text-left border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm ${
                    comparisonType === option.value
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setComparisonType(option.value)}
                  aria-pressed={comparisonType === option.value}
                >
                  <span
                    className={`mt-1 mr-3 inline-block h-3 w-3 rounded-full border ${
                      comparisonType === option.value ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{option.label.split(' ')[0]}</div>
                    <div className="text-sm text-gray-600">{option.label.split(' ').slice(1).join(' ')}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Évolution dans le temps</h2>
        <div className="h-64 sm:h-80 lg:h-96">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Comparaison actuelle (2024)</h2>
        <div className="h-64 sm:h-80 lg:h-96">
          <Bar 
            data={{
              labels: selectedCountries.map(id => npiData.countries.find(c => c.id === id)?.name || ''),
              datasets: [{
                label: comparisonOptions.find(opt => opt.value === comparisonType)?.label,
                data: selectedCountries.map(id => {
                  const country = npiData.countries.find(c => c.id === id);
                  if (!country) return 0;
                  
                  if (comparisonType === 'gdp') return country.gdp['2024'];
                  if (comparisonType === 'gdpPerCapita') return country.gdpPerCapita;
                  if (comparisonType === 'population') return Math.round(country.population / 1000000);
                  return country.growthRate;
                }),
                backgroundColor: selectedCountries.map(id => {
                  const country = npiData.countries.find(c => c.id === id);
                  if (!country) return '#9CA3AF';
                  return `var(--color-${getWaveColor(country.wave)})`;
                })
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg p-5 sm:p-6 border border-blue-100">
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-3">💡 Analyse comparative</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {generateAnalysis(selectedCountries, comparisonType, npiData)}
        </p>
      </div>
      </div>
    </div>
  );
};

const generateAnalysis = (countryIds: string[], metric: string, data: typeof npiData) => {
  if (countryIds.length === 0) return 'Sélectionnez au moins un pays pour voir une analyse.';
  
  const countries = data.countries.filter(c => countryIds.includes(c.id));
  
  if (metric === 'gdp') {
    const highest = [...countries].sort((a, b) => b.gdp['2024'] - a.gdp['2024'])[0];
    return `${highest.name} a le PIB le plus élevé avec $${highest.gdp['2024']} milliards en 2024. ` +
           `Les pays de la première vague (années 60-70) montrent généralement une croissance plus stable.`;
  }
  
  if (metric === 'gdpPerCapita') {
    const highest = [...countries].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)[0];
    return `${highest.name} a le PIB par habitant le plus élevé ($${highest.gdpPerCapita.toLocaleString()}), ` +
           `reflétant une économie plus développée et productive.`;
  }
  
  if (metric === 'population') {
    const largest = [...countries].sort((a, b) => b.population - a.population)[0];
    return `${largest.name} a la plus grande population (${(largest.population / 1000000).toFixed(1)} millions), ` +
           `ce qui peut représenter à la fois un avantage démographique et un défi en termes de développement.`;
  }
  
  if (metric === 'growthRate') {
    const fastest = [...countries].sort((a, b) => b.growthRate - a.growthRate)[0];
    return `${fastest.name} a le taux de croissance le plus élevé (${fastest.growthRate}%), ` +
           `ce qui est typique des économies en phase de rattrapage.`;
  }
  
  return 'Sélectionnez des pays et une métrique pour voir une analyse comparative.';
};

export default CountryComparison;
