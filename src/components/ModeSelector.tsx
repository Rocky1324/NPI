import React from 'react';
import { Link } from 'react-router-dom';

const Card: React.FC<{title:string; desc:string; to?:string; href?:string; emoji:string;}> = ({ title, desc, to, href, emoji }) => {
  const common = {
    display: 'block',
    padding: '1.25rem',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    background: 'linear-gradient(180deg,#f8fafc,#ffffff)',
    boxShadow: '0 6px 24px rgba(2,6,23,.05)',
    textDecoration: 'none',
    color: '#0f172a'
  } as React.CSSProperties;
  const inner = (
    <div>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
      <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.25rem' }}>{title}</div>
      <div style={{ color: '#475569' }}>{desc}</div>
    </div>
  );
  return href ? (
    <a href={href} style={common}>{inner}</a>
  ) : (
    <Link to={to || '#'} style={common}>{inner}</Link>
  );
};

const ModeSelector: React.FC = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ textAlign: 'center', margin: '2rem 0 1rem' }}>
        <div style={{ fontSize: '3rem' }}>🧭</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0.5rem 0' }}>Choisir le mode</h1>
        <p style={{ color: '#475569' }}>Sélectionnez la version que vous souhaitez utiliser.</p>
      </div>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Card
          emoji="⚛️"
          title="Version React (SPA)"
          desc="Interface pilotée par React et les routes existantes."
          to="/react-home"
        />
        <Card
          emoji="🧩"
          title="Version Statique (HTML/CSS/JS)"
          desc="Pages statiques performantes avec un design uniforme."
          href="/home.html"
        />
      </div>
    </div>
  );
};

export default ModeSelector;
