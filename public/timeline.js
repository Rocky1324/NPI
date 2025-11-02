(function(){
  const $ = (sel)=>document.querySelector(sel);
  const svgDraw = (id, series, color)=>{
    const svg = document.getElementById(id);
    if(!svg || !series || !series.length) return;
    const width = 200, height = 60, pad = 6;
    const min = Math.min(...series), max = Math.max(...series);
    const span = Math.max(1e-6, max - min);
    const stepX = (width - pad*2) / Math.max(1, series.length - 1);
    let d = '';
    series.forEach((v,i)=>{
      const x = pad + i*stepX;
      const y = height - pad - ((v - min)/span)*(height - pad*2);
      d += (i===0? 'M':'L') + x + ',' + y + ' ';
    });
    svg.setAttribute('viewBox', '0 0 200 60');
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    area.setAttribute('d', d + ' L200,60 L0,60 Z');
    area.setAttribute('fill', color.replace('1)', '0.15)').replace(')', ',0.15)'));
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', d);
    line.setAttribute('fill','none');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width','3');
    svg.innerHTML = '';
    svg.appendChild(area);
    svg.appendChild(line);
  };

  const decades = [1960,1970,1980,1990,2000,2010,2020,2024];
  let currentIdx = 0;
  let playing = false;
  let timer = null;
  let countries = [];
  let currentCountryId = null;

  function renderDecades(){
    const root = $('#decades');
    root.innerHTML = '';
    decades.forEach((y, idx)=>{
      const b = document.createElement('button');
      b.className = 'pill' + (idx===currentIdx? ' active':'');
      b.textContent = String(y);
      b.addEventListener('click', ()=>{ currentIdx = idx; updateProgress(); renderDecades(); });
      root.appendChild(b);
    });
  }

  function updateProgress(){
    const pct = (currentIdx) / (decades.length-1) * 100;
    $('#progress').style.width = pct + '%';
    const year = decades[currentIdx];
    const label = $('#yearLabel');
    if(label) label.textContent = 'Année: ' + year;
    updateDetails();
  }

  function tick(){
    if(!playing) return;
    currentIdx = (currentIdx + 1) % decades.length;
    updateProgress();
    renderDecades();
  }

  function setPlaying(p){
    playing = p;
    const btn = $('#playBtn');
    btn.textContent = playing ? '⏸️ Pause' : '▶️ Lecture';
    if(playing){
      if(timer) clearInterval(timer);
      timer = setInterval(tick, 1200);
    } else {
      if(timer) clearInterval(timer);
      timer = null;
    }
  }

  async function init(){
    $('#prevBtn').addEventListener('click', ()=>{ currentIdx = (currentIdx - 1 + decades.length) % decades.length; updateProgress(); renderDecades(); });
    $('#nextBtn').addEventListener('click', ()=>{ currentIdx = (currentIdx + 1) % decades.length; updateProgress(); renderDecades(); });
    $('#playBtn').addEventListener('click', ()=> setPlaying(!playing));

    updateProgress();
    renderDecades();

    try {
      const res = await fetch('/data/waves.json');
      const waves = await res.json();
      svgDraw('w1', waves.wave1.series, 'rgba(37,99,235,1)');
      svgDraw('w2', waves.wave2.series, 'rgba(245,158,11,1)');
      svgDraw('w3', waves.wave3.series, 'rgba(234,179,8,1)');
      svgDraw('w4', waves.wave4.series, 'rgba(16,185,129,1)');
    } catch(e){
      console.error('Failed to load waves.json', e);
    }

    try {
      const res2 = await fetch('/data/npi-data.json');
      const json = await res2.json();
      countries = json.countries || [];
      populateCountrySelect();
      const params = new URLSearchParams(location.search);
      const q = params.get('country');
      if(q && countries.find(c=>c.id===q)) currentCountryId = q;
      if(!currentCountryId && countries.length){ currentCountryId = countries[0].id; }
      reflectCountryInUI();
      updateDetails();
    } catch(e){ console.error('Failed to load npi-data.json', e); }
  }

  function populateCountrySelect(){
    const sel = document.getElementById('countrySelect');
    if(!sel) return;
    sel.innerHTML = '';
    const opt0 = document.createElement('option');
    opt0.value = ''; opt0.textContent = '— Choisir un pays —';
    sel.appendChild(opt0);
    countries.forEach(c=>{
      const o = document.createElement('option');
      o.value = c.id; o.textContent = `${c.flag||''} ${c.name}`;
      sel.appendChild(o);
    });
    sel.addEventListener('change', (e)=>{
      currentCountryId = e.target.value || null;
      reflectCountryInUI();
      updateDetails();
    });
  }

  function reflectCountryInUI(){
    const sel = document.getElementById('countrySelect');
    if(sel) sel.value = currentCountryId || '';
    const link = document.getElementById('openMap');
    if(link) link.href = currentCountryId ? `/carte.html?country=${encodeURIComponent(currentCountryId)}` : '/carte.html';
    const summary = document.getElementById('countrySummary');
    const c = countries.find(x=> x.id===currentCountryId);
    if(summary){ summary.textContent = c ? `${c.flag||''} ${c.name}` : 'Sélectionnez un pays pour afficher ses informations.'; }
  }

  function updateDetails(){
    const c = countries.find(x=> x.id===currentCountryId);
    const year = decades[currentIdx];
    const gdpNow = document.getElementById('gdpNow');
    const strategyList = document.getElementById('strategyList');
    const sectorsList = document.getElementById('sectorsList');
    const milestonesList = document.getElementById('milestonesList');
    const milestoneNow = document.getElementById('milestoneNow');
    if(!c){
      if(gdpNow) gdpNow.textContent = '';
      if(strategyList) strategyList.innerHTML='';
      if(sectorsList) sectorsList.innerHTML='';
      if(milestonesList) milestonesList.innerHTML='';
      if(milestoneNow) milestoneNow.textContent = '';
      return;
    }
    const gdpVal = c.gdp ? c.gdp[String(year)] : undefined;
    if(gdpNow) gdpNow.textContent = typeof gdpVal==='number' ? `PIB ${year}: ${gdpVal} (Mds USD)` : `PIB ${year}: —`;
    if(strategyList){
      strategyList.innerHTML = '';
      (c.strategy||[]).forEach(s=>{
        const li = document.createElement('li'); li.textContent = s; strategyList.appendChild(li);
      });
    }
    if(sectorsList){
      sectorsList.innerHTML = '';
      (c.keySectors||[]).forEach(sec=>{
        const li = document.createElement('li');
        li.textContent = `${sec.name} ${typeof sec.percentage==='number' ? `(${sec.percentage}%)` : ''}`;
        sectorsList.appendChild(li);
      });
    }
    if(milestonesList){
      milestonesList.innerHTML = '';
      const items = (c.milestones||[]).filter(m => (m.year||0) <= year).sort((a,b)=>a.year-b.year);
      items.forEach(m => { const li = document.createElement('li'); li.textContent = `${m.year} — ${m.event}`; milestonesList.appendChild(li); });
      if(items.length===0){ const li = document.createElement('li'); li.textContent = 'Aucun jalon jusqu\'à cette année.'; milestonesList.appendChild(li); }
    }
    if(milestoneNow){
      const exact = (c.milestones||[]).find(m=> m.year===year);
      if(exact){ milestoneNow.textContent = `${exact.year} — ${exact.event}`; }
      else {
        const prev = (c.milestones||[]).filter(m=>m.year<=year).sort((a,b)=>b.year-a.year)[0];
        milestoneNow.textContent = prev ? `${prev.year} — ${prev.event}` : '';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
