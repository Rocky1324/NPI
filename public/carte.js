(function(){
  const $ = (s)=>document.querySelector(s);
  let data = [];
  let currentWave = 'all';
  let map, markersLayer;
  let currentId = null;

  const waveColors = {
    1: '#2563eb',
    2: '#f59e0b',
    3: '#eab308',
    4: '#10b981'
  };

  function ensureMap(){
    if(map) return;
    map = L.map('map', { zoomControl: true }).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
  }

  function renderMarkers(){
    ensureMap();
    markersLayer.clearLayers();
    const filtered = currentWave==='all' ? data : data.filter(c=>String(c.wave)===String(currentWave));
    filtered.forEach(c=>{
      if(!c.coordinates) return;
      const [lat, lon] = c.coordinates;
      const color = waveColors[c.wave] || '#6366f1';
      const m = L.circleMarker([lat, lon], {
        radius: 7,
        color,
        fillColor: color,
        fillOpacity: 0.8,
        weight: 1
      }).addTo(markersLayer);
      m.bindPopup(`<strong>${c.flag || ''} ${c.name}</strong><br/>Vague ${c.wave}`);
      m.on('click', ()=>{
        currentId = c.id;
        updateDetails();
      });
    });
  }

  async function init(){
    try{
      const res = await fetch('/data/npi-data.json');
      const json = await res.json();
      data = json.countries || [];
      renderMarkers();
    }catch(e){ console.error('Failed to load npi-data.json', e); }

    document.querySelectorAll('[data-wave]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        currentWave = btn.getAttribute('data-wave') || 'all';
        renderMarkers();
      });
    });

    const params = new URLSearchParams(location.search);
    const q = params.get('country');
    if(q && (data||[]).find(c=> c.id===q)){
      currentId = q;
      updateDetails();
    }
  }
  document.addEventListener('DOMContentLoaded', init);

  function latestGDP(gdp){
    if(!gdp) return null;
    const ys = Object.keys(gdp).map(Number).sort((a,b)=>a-b);
    const y = ys[ys.length-1];
    return { year: y, value: gdp[String(y)] };
  }

  function updateDetails(){
    const c = (data||[]).find(x=> x.id===currentId);
    const header = $('#countryHeader');
    const gdpEl = $('#gdpLatest');
    const strategyList = $('#strategyList');
    const sectorsList = $('#sectorsList');
    const milestonesList = $('#milestonesList');
    const openTimeline = $('#openTimeline');
    const openCompare = $('#openCompare');

    if(!c){
      if(header) header.textContent = 'Sélectionnez un pays sur la carte.';
      if(gdpEl) gdpEl.textContent = '';
      if(strategyList) strategyList.innerHTML = '';
      if(sectorsList) sectorsList.innerHTML = '';
      if(milestonesList) milestonesList.innerHTML = '';
      if(openTimeline) openTimeline.href = '/timeline.html';
      if(openCompare) openCompare.href = '/comparaison.html';
      return;
    }
    if(header) header.textContent = `${c.flag || ''} ${c.name}`;
    const lg = latestGDP(c.gdp);
    if(gdpEl) gdpEl.textContent = lg ? `PIB ${lg.year}: ${lg.value} (Mds USD)` : 'PIB: —';
    if(openTimeline) openTimeline.href = `/timeline.html?country=${encodeURIComponent(c.id)}`;
    if(openCompare) openCompare.href = `/comparaison.html?country=${encodeURIComponent(c.id)}`;

    if(strategyList){
      strategyList.innerHTML = '';
      (c.strategy || []).forEach(s=>{ const li = document.createElement('li'); li.textContent = s; strategyList.appendChild(li); });
      if((c.strategy || []).length===0){ const li = document.createElement('li'); li.textContent = '—'; strategyList.appendChild(li); }
    }
    if(sectorsList){
      sectorsList.innerHTML = '';
      (c.keySectors || []).forEach(sec=>{ const li = document.createElement('li'); li.textContent = `${sec.name} ${sec.percentage?`(${sec.percentage}%)`:''}`; sectorsList.appendChild(li); });
      if((c.keySectors || []).length===0){ const li = document.createElement('li'); li.textContent = '—'; sectorsList.appendChild(li); }
    }
    if(milestonesList){
      milestonesList.innerHTML = '';
      (c.milestones || []).sort((a,b)=>a.year-b.year).forEach(m=>{ const li = document.createElement('li'); li.textContent = `${m.year} — ${m.event}`; milestonesList.appendChild(li); });
      if((c.milestones || []).length===0){ const li = document.createElement('li'); li.textContent = '—'; milestonesList.appendChild(li); }
    }
  }
})();
