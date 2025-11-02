import React from 'react';
import { motion } from 'framer-motion';
import { globalStats } from '../data/npi-data';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Pays NPI', value: globalStats.numberOfCountries, icon: '🌍' },
  { label: 'PIB combiné', value: `$${(globalStats.totalGDP / 1000000000).toFixed(0)}B`, icon: '💰' },
  { label: 'Population totale', value: `${(globalStats.totalPopulation / 1000000000).toFixed(2)}B`, icon: '👥' },
  { label: 'Croissance moyenne', value: `${globalStats.averageGrowth}%`, icon: '📈' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #eff6ff, #ffffff)',
    width: '100%',
  };

  const sectionStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '5rem 1rem',
    textAlign: 'center' as const,
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  };

  const paragraphStyle = {
    fontSize: '1.25rem',
    color: '#4b5563',
    maxWidth: '48rem',
    margin: '0 auto 3rem',
    lineHeight: 1.6,
  };

  const buttonStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 700,
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.125rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    padding: '3rem 1rem',
    backgroundColor: 'white',
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
  };

  const ctaSectionStyle = {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '5rem 1rem',
    textAlign: 'center' as const,
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <motion.h1 
          style={headingStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NPI : La Révolution Économique du XXe Siècle
        </motion.h1>
        
        <motion.p 
          style={paragraphStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explorez l'essor économique des Nouveaux Pays Industrialisés à travers des données interactives et des analyses approfondies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button 
            onClick={() => navigate('/carte')}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            Commencer l'exploration
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={statsContainerStyle}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          padding: '0 1rem',
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              style={statCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.875rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ color: '#6b7280', fontSize: '1rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSectionStyle}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
          }}>Prêt à explorer les données ?</h2>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '42rem',
            margin: '0 auto 2rem',
            opacity: 0.9,
            lineHeight: 1.6,
          }}>
            Découvrez comment les NPI ont transformé leur économie et leur société au fil des décennies.
          </p>
          <button 
            onClick={() => navigate('/carte')}
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              fontWeight: 700,
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontSize: '1.125rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8fafc';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Accéder à la carte interactive
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
