(function(){
  const $ = (s)=>document.querySelector(s);

  function formatB(n){
    if(!isFinite(n) || n<=0) return '—';
    return `${Math.round(n)}B`;
  }

  function formatPopulation(total){
    if(!isFinite(total) || total<=0) return null;
    if(total >= 1_000_000_000) return `${(total/1_000_000_000).toFixed(2)}B`;
    if(total >= 1_000_000) return `${Math.round(total/1_000_000)}M`;
    return String(Math.round(total));
  }

  function cagrFromSeries(series){
    // series: Record<year, value> with values in billions
    const years = Object.keys(series||{}).map(Number).filter(n=>!isNaN(n)).sort((a,b)=>a-b);
    if(years.length < 2) return null;
    const first = years[0];
    const last = years[years.length-1];
    const v0 = Number(series[String(first)]);
    const v1 = Number(series[String(last)]);
    if(!(v0>0) || !(v1>0) || last===first) return null;
    const t = last - first;
    const cagr = Math.pow(v1/v0, 1/t) - 1;
    return cagr * 100; // percent
  }

  async function load(){
    try{
      const res = await fetch('/data/npi-data.json');
      const json = await res.json();
      const countries = json.countries || [];

      // compute stats similar to React HomePage
      const numberOfCountries = countries.length;

      const totalGDP = countries.reduce((sum, c)=>{
        const years = c.gdp ? Object.keys(c.gdp).map(Number).sort((a,b)=>a-b) : [];
        const latest = years.length ? years[years.length-1] : null;
        const v = latest!=null ? Number(c.gdp[String(latest)]||0) : 0;
        return sum + (isFinite(v) ? v : 0);
      }, 0);

      const totalPopulationRaw = countries.reduce((sum,c)=> sum + (Number(c.population)||0), 0);
      const popDisplay = formatPopulation(totalPopulationRaw);

      // Prefer CAGR from GDP series; fallback to provided growthRate
      const growthCandidates = countries.map(c=> {
        const fromSeries = cagrFromSeries(c.gdp||{});
        if(isFinite(fromSeries)) return fromSeries;
        const gr = Number(c.growthRate);
        return isFinite(gr) ? gr : null;
      }).filter(v=> v!=null && isFinite(v));
      const averageGrowth = growthCandidates.length ? (growthCandidates.reduce((a,b)=>a+b,0)/growthCandidates.length) : null;

      const stats = [
        { label: 'Pays NPI', value: String(numberOfCountries), icon: '🌍' },
        { label: 'PIB combiné', value: formatB(totalGDP), icon: '💰' },
        // include population only if we have a meaningful value
        ...(popDisplay ? [{ label: 'Population totale', value: popDisplay, icon: '👥' }] : []),
        ...(isFinite(averageGrowth) ? [{ label: 'Croissance moyenne', value: `${averageGrowth.toFixed(1)}%`, icon: '📈' }] : []),
      ];

      const root = $('#stats');
      root.innerHTML = '';
      stats.forEach(s=>{
        const card = document.createElement('div');
        card.className = 'stat reveal-on-scroll';
        card.innerHTML = `
          <div class="icon">${s.icon}</div>
          <div class="value">${s.value}</div>
          <div class="label">${s.label}</div>
        `;
        root.appendChild(card);
      });
      document.documentElement.classList.add('reveal');
    }catch(e){
      console.error('Failed to load stats', e);
      const root = $('#stats');
      if(root){ root.innerHTML = '<div class="muted">Impossible de charger les statistiques.</div>'; }
    }
  }

  document.addEventListener('DOMContentLoaded', load);
})();
