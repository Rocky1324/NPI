import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isReactMode = location.pathname.startsWith('/react')
    || ['/timeline', '/carte', '/comparaison', '/cours'].some(p => location.pathname.startsWith(p));
  const navItems = isReactMode ? [
    { path: '/react-home', label: 'Accueil', icon: '🏠' },
    { path: '/carte', label: 'Carte Interactive', icon: '🌍' },
    { path: '/comparaison', label: 'Comparaison', icon: '📊' },
    { path: '/timeline', label: 'Chronologie', icon: '⏳' },
    { path: '/cours', label: 'Cours NPI', icon: '📚' },
  ] : [
    { path: '/home.html', label: 'Accueil', icon: '🏠' },
    { path: '/carte.html', label: 'Carte Interactive', icon: '🌍' },
    { path: '/comparaison.html', label: 'Comparaison', icon: '📊' },
    { path: '/timeline.html', label: 'Chronologie', icon: '⏳' },
    { path: '/cours.html', label: 'Cours NPI', icon: '📚' },
  ];

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1rem',
        height: '4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none'
          }} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
            NPI Explorer
          </Link>
          
          <div style={{
            display: 'none',
            marginLeft: '1.5rem',
            gap: '2rem'
          }} className="desktop-nav">
            {navItems.map((item) => {
              const commonStyle: React.CSSProperties = {
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.5rem 0',
                borderBottom: `2px solid ${location.pathname === item.path ? '#3b82f6' : 'transparent'}`,
                color: location.pathname === item.path ? '#111827' : '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease-in-out'
              };
              const onOver = (e: React.MouseEvent<HTMLElement>) => {
                (e.currentTarget as HTMLElement).style.color = '#111827';
                if (location.pathname !== item.path) {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = '#d1d5db';
                }
              };
              const onOut = (e: React.MouseEvent<HTMLElement>) => {
                (e.currentTarget as HTMLElement).style.color = location.pathname === item.path ? '#111827' : '#6b7280';
                if (location.pathname !== item.path) {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
                }
              };
              const content = (
                <>
                  <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                  {item.label}
                </>
              );
              const isStatic = item.path.endsWith('.html');
              return isStatic ? (
                <a
                  key={item.path}
                  href={item.path}
                  style={commonStyle}
                  onMouseOver={onOver}
                  onMouseOut={onOut}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  style={commonStyle}
                  onMouseOver={onOver}
                  onMouseOut={onOut}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            color: '#9ca3af',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          className="mobile-menu-button focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div style={{
        display: isMenuOpen ? 'block' : 'none',
        padding: '0.5rem 0'
      }} className="mobile-menu" id="mobile-menu" role="navigation" aria-label="Navigation mobile">
        {navItems.map((item) => {
          const commonStyle: React.CSSProperties = {
            display: 'block',
            padding: '0.5rem 1rem',
            margin: '0.25rem 0',
            color: location.pathname === item.path ? '#1d4ed8' : '#374151',
            backgroundColor: location.pathname === item.path ? '#eff6ff' : 'transparent',
            textDecoration: 'none',
            borderLeft: `4px solid ${location.pathname === item.path ? '#3b82f6' : 'transparent'}`,
            transition: 'all 0.2s ease-in-out'
          };
          const content = (
            <>
              <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
              {item.label}
            </>
          );
          const isStatic = item.path.endsWith('.html');
          return isStatic ? (
            <a
              key={item.path}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={commonStyle}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
            >
              {content}
            </a>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={commonStyle}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
            >
              {content}
            </Link>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (min-width: 768px) {
            .mobile-menu-button {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
            .desktop-nav {
              display: flex !important;
            }
          }
          @media (max-width: 767px) {
            .desktop-nav {
              display: none !important;
            }
          }
        `
      }} />
    </nav>
  );
};

export default Navbar;
