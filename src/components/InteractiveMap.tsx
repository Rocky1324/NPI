import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { npiData, CountryData } from '../data/npi-data';
import CountryGDPChart from './charts/CountryGDPChart';

// Fix for TypeScript: Ensure npiData is an array
const countriesData = Array.isArray(npiData) ? npiData : npiData.countries || [];

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
  if (population > 1000000000) return 20;  // India, China
  if (population > 500000000) return 16;   
  if (population > 100000000) return 14;   // Indonesia, Pakistan
  if (population > 50000000) return 12;    // Vietnam, Philippines
  if (population > 10000000) return 10;    // South Korea, Taiwan
  return 8;                                // Smaller countries
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

  // Format population number to a more readable format (local version)
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

  // Add global styles for the map
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        border-radius: 0.5rem;
        padding: 0;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      
      .leaflet-popup-content {
        margin: 0;
        line-height: 1.5;
      }
      
      .leaflet-popup-tip-container {
        margin-top: -1px;
      }
      
      .leaflet-popup-close-button {
        display: none;
      }
      
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 0.5rem;
        overflow: hidden;
      }
      
      .custom-popup .leaflet-popup-content {
        margin: 0;
        padding: 0;
      }
      
      .custom-popup .leaflet-popup-tip {
        background: white;
        border: 1px solid #e5e7eb;
        border-top-color: transparent;
        border-left-color: transparent;
      }
      
      .hover-bg-gray-100:hover {
        background-color: #f3f4f6;
      }
      
      .hover-border-gray-300:hover {
        border-color: #d1d5db;
      }
      
      .hover-shadow-sm:hover {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
      }
      
      .hover-text-gray-700:hover {
        color: #374151;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    position: 'relative',
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
    <div style={containerStyle}>
      {/* Map Container */}
      <div style={{
        flex: 1, 
        position: 'relative',
        marginRight: '1rem',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}>
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          position: 'relative'
        }}>
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ 
              height: '100%', 
              width: '100%',
              zIndex: 1
            }}
            zoomControl={false}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            zoomSnap={0.5}
            zoomDelta={0.5}
            minZoom={2}
            maxZoom={8}
            maxBounds={[
              [-60, -180],
              [85, 190]
            ]}
            maxBoundsViscosity={1.0}
          >
            <ChangeView center={mapCenter} zoom={mapZoom} />
            
            {/* Base Map Tile Layer */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
              minZoom={2}
            />
            
            {/* Country Markers and Circles */}
            {countriesData.map((country: CountryData) => {
              const color = waveColors[country.wave] || '#9ca3af';
              const radius = getRadius(country.population);
              const isSelected = selectedCountry?.id === country.id;
              
              return (
                <React.Fragment key={`${country.id}-fragment`}>
                  {/* Circle for the country */}
                  <Circle
                    center={selectedCountry ? selectedCountry.coordinates : [0, 0]}
                    radius={radius * 100000}
                    pathOptions={{
                      fillColor: color,
                      fillOpacity: isSelected ? 0.3 : 0.2,
                      color: color,
                      opacity: isSelected ? 1 : 0.7,
                      weight: isSelected ? 3 : 2,
                    }}
                    eventHandlers={{
                      mouseover: (e) => {
                        const layer = e.target;
                        if (layer) {
                          layer.setStyle({
                            fillOpacity: 0.4,
                            opacity: 1,
                            weight: 3
                          });
                        }
                      },
                      mouseout: (e) => {
                        const layer = e.target;
                        if (layer) {
                          layer.setStyle({
                            fillOpacity: isSelected ? 0.3 : 0.2,
                            opacity: isSelected ? 1 : 0.7,
                            weight: isSelected ? 3 : 2
                          });
                        }
                      },
                      click: () => {
                        setSelectedCountry(country);
                      }
                    }}
                  />
                  
                  {/* Marker with Popup */}
                  <Marker
                    position={country.coordinates}
                    icon={createCustomIcon(color)}
                    eventHandlers={{
                      click: () => {
                        setSelectedCountry(country);
                      }
                    }}
                    key={`${country.id}-marker`}
                  >
                    <Popup 
                      closeButton={false}
                      className="custom-popup"
                      minWidth={200}
                      maxWidth={250}
                    >
                      <div style={{ 
                        minWidth: '200px',
                        padding: '0.75rem'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            marginRight: '0.5rem',
                            flexShrink: 0
                          }} />
                          <h3 style={{ 
                            fontSize: '1rem',
                            fontWeight: 600,
                            margin: 0,
                            color: '#111827'
                          }}>
                            {country.name}
                          </h3>
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '0.5rem',
                          fontSize: '0.8125rem',
                          color: '#4b5563'
                        }}>
                          <div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              marginBottom: '0.125rem'
                            }}>
                              Population
                            </div>
                            <div style={{
                              fontWeight: 500,
                              color: '#111827'
                            }}>
                              {formatPopulationLocal(country.population)}
                            </div>
                          </div>
                          <div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              marginBottom: '0.125rem'
                            }}>
                              Wave
                            </div>
                            <div style={{
                              fontWeight: 500,
                              color: color
                            }}>
                              {country.wave}
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedCountry(country)}
                          style={{
                            display: 'block',
                            width: '100%',
                            marginTop: '0.75rem',
                            padding: '0.375rem 0.75rem',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            border: '1px solid #e5e7eb',
                            borderRadius: '0.375rem',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                </React.Fragment>
              );
            })}
          </MapContainer>
          
          {/* Custom Zoom Controls */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            overflow: 'hidden'
          }}>
            <button 
              onClick={() => {
                const map = document.querySelector('.leaflet-container') as any;
                if (map && map._leaflet_map) {
                  map._leaflet_map.zoomIn(1);
                }
              }}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: 'none',
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                padding: 0
              }}
              className="hover-bg-gray-100"
              aria-label="Zoom in"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19M3 9H21M3 15H21" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              onClick={() => {
                const map = document.querySelector('.leaflet-container') as any;
                if (map && map._leaflet_map) {
                  map._leaflet_map.zoomOut(1);
                }
              }}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              className="hover-bg-gray-100"
              aria-label="Zoom out"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
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
              <button 
                onClick={() => setSelectedCountry(null)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
                className="hover-text-gray-700 hover-bg-gray-100"
                aria-label="Close details"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              <div 
                className="hover-border-gray-300 hover-shadow-sm"
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '0.875rem',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  border: '1px solid #f3f4f6'
                }}
              >
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  marginBottom: '0.375rem',
                  fontWeight: 500,
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase'
                }}>
                  Population
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: 1.2
                }}>
                  {formatPopulationLocal(selectedCountry.population)}
                </div>
              </div>
              
              <div 
                className="hover-border-gray-300 hover-shadow-sm"
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '0.875rem',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  border: '1px solid #f3f4f6'
                }}
              >
                <div style={{
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  marginBottom: '0.375rem',
                  fontWeight: 500,
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase'
                }}>
                  Wave
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: waveColors[selectedCountry.wave] || '#6b7280',
                  lineHeight: 1.2
                }}>
                  {selectedCountry.waveLabel}
                </div>
              </div>
            </div>
            
            {/* Key Sectors */}
            <div style={{ 
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: 600,
                margin: '0 0 1rem 0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
                  <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 3V21M3 9H21M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secteurs Clés
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {selectedCountry.keySectors.map((sector, i) => (
                  <div 
                    key={i}
                    style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      border: '1px solid #f3f4f6',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#111827'
                      }}>
                        {sector.name}
                      </span>
                      <span style={{ 
                        backgroundColor: waveColors[selectedCountry.wave] + '20',
                        color: waveColors[selectedCountry.wave],
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px'
                      }}>
                        {sector.percentage}%
                      </span>
                    </div>
                    {sector.companies.length > 0 && (
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280',
                        lineHeight: '1.4'
                      }}>
                        {sector.companies.join(' • ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* GDP Chart */}
            <div style={{ 
              margin: '2rem 0',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600,
                margin: '0 0 1rem 0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '4px',
                  height: '1rem',
                  backgroundColor: waveColors[selectedCountry.wave],
                  marginRight: '0.5rem',
                  borderRadius: '2px'
                }}></span>
                Évolution du PIB
              </h3>
              <div style={{ height: '250px' }}>
                <CountryGDPChart country={selectedCountry} />
              </div>
            </div>
            
            {/* Development Strategy */}
            <div style={{ 
              marginBottom: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600,
                margin: '0 0 1rem 0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '4px',
                  height: '1rem',
                  backgroundColor: waveColors[selectedCountry.wave],
                  marginRight: '0.5rem',
                  borderRadius: '2px'
                }}></span>
                Stratégies de Développement
              </h3>
              <ul style={{ 
                margin: 0, 
                padding: '0 0 0 1.25rem',
                listStyleType: 'disc'
              }}>
                {selectedCountry.strategy.map((item, i) => (
                  <li key={i} style={{ 
                    marginBottom: '0.5rem',
                    fontSize: '0.9375rem',
                    lineHeight: '1.5',
                    color: '#374151'
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div style={{ 
              marginBottom: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600,
                margin: '0 0 1rem 0',
                color: '#111827',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '4px',
                  height: '1rem',
                  backgroundColor: waveColors[selectedCountry.wave],
                  marginRight: '0.5rem',
                  borderRadius: '2px'
                }}></span>
                📅 Chronologie du Développement
              </h3>
              <div style={{
                position: 'relative',
                paddingLeft: '1.5rem',
                marginLeft: '0.75rem',
                borderLeft: `2px dashed ${waveColors[selectedCountry.wave]}40`
              }}>
                {selectedCountry.milestones.map((milestone, i) => {
                  const isLast = i === selectedCountry.milestones.length - 1;
                  return (
                    <div key={i} style={getTimelineItemStyle(isLast)}>
                      <div style={{
                        position: 'absolute',
                        left: '-9px',
                        top: '0',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border: `2px solid ${waveColors[selectedCountry.wave]}`,
                        zIndex: 1
                      }} />
                      <div style={{
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{
                          display: 'inline-block',
                          backgroundColor: waveColors[selectedCountry.wave] + '20',
                          color: waveColors[selectedCountry.wave],
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          marginBottom: '0.5rem'
                        }}>
                          {milestone.year}
                        </div>
                        <div style={{
                          fontSize: '0.9375rem',
                          lineHeight: '1.5',
                          color: '#374151',
                          }}>
{milestone.event}
</div>
</div>
</div>
);
})}
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
textAlign: 'center',
padding: '2rem'
}}>
<svg
width="64"
height="64"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
style={{ marginBottom: '1rem', color: '#9ca3af' }}
>
<path 
             d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
             stroke="currentColor" 
             strokeWidth="2" 
             strokeLinecap="round" 
             strokeLinejoin="round"
           />
<path 
             d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" 
             stroke="currentColor" 
             strokeWidth="2" 
             strokeLinecap="round" 
             strokeLinejoin="round"
           />
</svg>
<h2 style={{
fontSize: '1.5rem',
fontWeight: 700,
color: '#111827',
marginBottom: '0.5rem'
}}>
Tableau de Bord NPI
</h2>
<p style={{
fontSize: '0.9375rem',
color: '#6b7280',
lineHeight: '1.5',
marginBottom: '1.5rem'
}}>
Cliquez sur un pays sur la carte pour voir ses informations détaillées
</p>
        {/* Legend */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          padding: '1rem',
          width: '100%',
          marginTop: '1rem'
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#111827',
            marginBottom: '0.75rem',
            textAlign: 'left'
          }}>
            Légende des vagues
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {Object.entries(waveColors).map(([wave, color]) => {
              const waveLabels: Record<string, string> = {
                '1': '1ère vague (1960-1970)',
                '2': '2ème vague (1970-1980)',
                '3': '3ème vague (1980-1990)',
                '4': '4ème vague (1990-2000)',
                '5': '5ème vague (2000-2010)'
              };
              
              return (
                <div 
                  key={wave}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8125rem',
                    color: '#374151'
                  }}
                >
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    marginRight: '0.5rem',
                    flexShrink: 0
                  }} />
                  <span>{waveLabels[wave]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          width: '100%',
          marginTop: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '0.875rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '0.25rem'
            }}>
              40
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              fontWeight: 500
            }}>
              Pays NPI
            </div>
          </div>
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '0.875rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '0.25rem'
            }}>
              5
            </div>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              fontWeight: 500
            }}>
              Vagues
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
);
};

export default InteractiveMap;