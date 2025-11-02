import React from 'react';

const StaticCoursPage: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 64px)', width: '100%' }}>
      <iframe
        title="Cours NPI"
        src="/cours.html"
        style={{ border: 'none', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default StaticCoursPage;
