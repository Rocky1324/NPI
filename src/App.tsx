import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './components/HomePage';
import InteractiveMap from './components/InteractiveMap';
import CountryComparison from './components/CountryComparison';
import Timeline from './components/Timeline';
import Navbar from './components/Navbar';
import NPIClass from './components/NPIClass';
import StaticCoursPage from './components/StaticCoursPage';
import ModeSelector from './components/ModeSelector';

// Create a client for React Query
const queryClient = new QueryClient();

// Main App component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f9fafb'
        }}>
          <Navbar />
          <main style={{
            flex: '1',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '2rem 1rem'
          }}>
            <Routes>
              <Route path="/" element={<ModeSelector />} />
              <Route path="/react-home" element={<HomePage />} />
              <Route path="/carte" element={<InteractiveMap />} />
              <Route path="/comparaison" element={<CountryComparison />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/cours" element={<StaticCoursPage />} />
            </Routes>
          </main>
          
          <footer style={{
            backgroundColor: 'white',
            borderTop: '1px solid #e5e7eb',
            marginTop: '3rem',
            padding: '1.5rem 1rem'
          }}>
            <div style={{
              maxWidth: '1280px',
              margin: '0 auto',
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              &copy; {new Date().getFullYear()} NPI Explorer - Tous droits réservés
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
