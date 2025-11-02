import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { npiData, CountryData } from '../data/npi-data';
import CountryGDPChart from './charts/CountryGDPChart';

// Ensure npiData is an array and has the correct type
const countriesData: CountryData[] = Array.isArray(npiData) ? npiData : [];

// Define wave colors
const waveColors: Record<number, string> = {
  1: '#3B82F6', // blue-500
  2: '#10B981', // emerald-500
  3: '#F59E0B', // amber-500
  4: '#8B5CF6', // violet-500
  5: '#EC4899', // pink-500
};

// Fix for default marker icons in Leaflet with Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Format population number with commas
const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('en-US').format(population);
};

// Calculate appropriate radius based on population
const getRadius = (population: number): number => {
  if (population > 1000000000) return 20;
  if (population > 500000000) return 16;
  if (population > 100000000) return 14;
  if (population > 50000000) return 12;
  if (population > 10000000) return 10;
  return 8;
};

// Create a custom marker icon with the specified color
const createCustomIcon = (color: string): L.DivIcon => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Component to handle view changes in the map
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Main InteractiveMap component
const InteractiveMap: React.FC = () => {
  // State management
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [mapCenter] = useState<[number, number]>([20, 100]);
  const [mapZoom] = useState(3);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Update map height based on viewport and header
  useEffect(() => {
    const updateMapHeight = () => {
      if (mapContainerRef.current) {
        const headerHeight = document.querySelector('header')?.clientHeight || 0;
        mapContainerRef.current.style.height = `calc(100vh - ${headerHeight}px)`;
      }
    };

    updateMapHeight();
    window.addEventListener('resize', updateMapHeight);
    return () => window.removeEventListener('resize', updateMapHeight);
  }, []);

  // Format population number to a more readable format
  const formatPopulationLocal = useCallback((pop: number): string => {
    if (pop >= 1000000000) return `${(pop / 1000000000).toFixed(1)}B`;
    if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
    if (pop >= 1000) return `${(pop / 1000).toFixed(1)}K`;
    return pop.toString();
  }, []);

  // Get timeline item style based on whether it's the last item
  const getTimelineItemStyle = useCallback((isLast: boolean): CSSProperties => ({
    position: 'relative',
    paddingBottom: isLast ? '0.5rem' : '1.5rem',
    paddingLeft: '1rem',
    borderLeft: '2px solid #e5e7eb',
    marginLeft: '0.75rem',
  }), []);

  // Add global styles for hover effects
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .timeline-item:hover {
        background-color: #f9fafb;
      }
      .sector-item:hover {
        background-color: #f9fafb;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Container styles
  const containerStyle: CSSProperties = {
    display: 'flex',
    height: '100vh',
    margin: 0,
    padding: '1rem',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f3f4f6',
    boxSizing: 'border-box'
  };

  const sidePanelStyle: CSSProperties = {
    width: '400px',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 2rem)',
    boxSizing: 'border-box',
    position: 'relative' as const,
    flexShrink: 0
  };

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
    position: 'relative'
  };

  return (
    <div style={containerStyle} ref={mapContainerRef}>
      {/* Map Container */}
      <div style={{
        flex: 1,
        position: 'relative',
        marginRight: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0 // Fixes flexbox overflow issue
      }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {countriesData.map((country) => {
            if (!country.coordinates) return null;
            
            const color = waveColors[country.wave] || '#9ca3af';
            const radius = getRadius(country.population);
            
            return (
              <Circle
                key={`${country.id}-circle`}
                center={country.coordinates}
                radius={radius * 1000}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.2,
                  color: color,
                  opacity: 0.8,
                  weight: 2
                }}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      weight: 3,
                      fillOpacity: 0.3
                    });
                    layer.bringToFront();
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      weight: 2,
                      fillOpacity: 0.2
                    });
                  },
                  click: () => {
                    setSelectedCountry(country);
                  }
                }}
              />
            );
          })}
          
          {countriesData.map((country) => {
            if (!country.coordinates) return null;
            
            const color = waveColors[country.wave] || '#9ca3af';
            
            return (
              <Marker
                key={`${country.id}-marker`}
                position={country.coordinates}
                icon={createCustomIcon(color)}
                eventHandlers={{
                  click: () => {
                    setSelectedCountry(country);
                  }
                }}
              >
                <Popup closeButton={false}>
                  <div style={{ padding: '0.5rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{country.name}</div>
                    <div>Population: {formatPopulation(country.population)}</div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          <ChangeView center={mapCenter} zoom={mapZoom} />
        </MapContainer>
      </div>
      
      {/* Side Panel */}
      <div style={sidePanelStyle}>
        {selectedCountry ? (
          <div>
            {/* Header with Country Name */}
            <div style={headerStyle}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: waveColors[selectedCountry.wave] || '#9ca3af',
                marginRight: '0.75rem',
                flexShrink: 0,
                border: '2px solid white',
                boxShadow: `0 0 0 2px ${waveColors[selectedCountry.wave] || '#9ca3af'}`
              }} />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: 0,
                color: '#111827',
                lineHeight: 1.2
              }}>
                {selectedCountry.name}
              </h2>
            </div>
            
            {/* Country Info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Population</div>
                  <div style={{ fontWeight: 500 }}>{formatPopulation(selectedCountry.population)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>GDP per Capita</div>
                  <div style={{ fontWeight: 500 }}>${selectedCountry.gdpPerCapita.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Wave</div>
                  <div style={{ fontWeight: 500 }}>Wave {selectedCountry.wave}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem' }}>Region</div>
                  <div style={{ fontWeight: 500 }}>{selectedCountry.region}</div>
                </div>
              </div>
              
              {/* GDP Chart */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: '0 0 1rem 0',
                  color: '#111827'
                }}>
                  GDP Growth
                </h3>
                <div style={{ height: '200px' }}>
                  <CountryGDPChart country={selectedCountry} />
                </div>
              </div>
              
              {/* Sectors */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: '0 0 1rem 0',
                  color: '#111827'
                }}>
                  Key Sectors
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem'
                }}>
                  {selectedCountry.keySectors.map((sector, index) => (
                    <div
                      key={index}
                      className="sector-item"
                      style={{
                        padding: '0.75rem',
                        borderRadius: '0.375rem',
                        backgroundColor: '#f9fafb',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{sector.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {sector.percentage}% of GDP
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#6b7280',
            textAlign: 'center',
            padding: '2rem 0'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12L15 15" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              margin: '0 0 0.5rem 0',
              color: '#111827'
            }}>
              Select a country
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Click on a country on the map to view detailed information
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
