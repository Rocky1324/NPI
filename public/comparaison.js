(function(){
  const $ = (s)=>document.querySelector(s);
  let data = [];
  let selected = [];
  let chart;

  function getAllYears(countries){
    const years = new Set();
    countries.forEach(c=> Object.keys(c.gdp||{}).forEach(y=> years.add(Number(y))));
    return Array.from(years).sort((a,b)=>a-b);
  }

  function renderSelected(){
    const box = $('#selected');
    box.innerHTML = '';
    selected.forEach(id=>{
      const c = data.find(x=> x.id===id);
      if(!c) return;
      const pill = document.createElement('div');
      pill.className = 'pill';
      pill.innerHTML = `<span>${c.flag} ${c.name}</span> <button title="Retirer">✕</button>`;
      pill.querySelector('button').addEventListener('click', ()=>{
        selected = selected.filter(x=> x!==id);
        updateChart();
        renderSelected();
        renderSelect();
      });
      box.appendChild(pill);
    });
    // Show/hide export and share buttons
    const hasSelection = selected.length > 0;
    $('#exportBtn').style.display = hasSelection ? 'inline-block' : 'none';
    $('#shareBtn').style.display = hasSelection ? 'inline-block' : 'none';
  }

  function renderSelect(){
    const sel = $('#countrySelect');
    sel.innerHTML = '<option value="">+ Ajouter un pays (max 4)</option>';
    data.filter(c=> !selected.includes(c.id)).forEach(c=>{
      const opt = document.createElement('option');
      opt.value = c.id; opt.textContent = `${c.flag} ${c.name}`;
      sel.appendChild(opt);
    });
  }

  function colorFor(idx){
    const palette = ['#2563eb','#16a34a','#f59e0b','#ef4444'];
    return palette[idx % palette.length];
  }

  function buildDatasets(years){
    return selected.map((id, idx)=>{
      const c = data.find(x=> x.id===id);
      const points = years.map(y=> (c.gdp && c.gdp[String(y)]) || null);
      return {
        label: `${c.flag} ${c.name}`,
        data: points,
        borderColor: colorFor(idx),
        backgroundColor: colorFor(idx) + '33',
        spanGaps: true,
        tension: 0.25
      };
    });
  }

  function updateChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    const countries = data.filter(c=> selected.includes(c.id));
    const years = getAllYears(countries);
    const datasets = buildDatasets(years);

    if(chart){ chart.destroy(); }
    chart = new Chart(ctx, {
      type: 'line',
      data: { labels: years, datasets },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: (ctx)=>`${ctx.dataset.label}: ${ctx.parsed.y ?? '—'} (Mds$)` } }
        },
        scales: {
          y: { title: { display:true, text:'PIB (milliards USD)' } },
          x: { title: { display:true, text:'Année' } }
        }
      }
    });
  }

  async function init(){
    try{
      const res = await fetch('/data/npi-data.json');
      const json = await res.json();
      data = (json && json.countries) || [];
      renderSelect();
      renderSelected();

      $('#countrySelect').addEventListener('change', (e)=>{
        const id = e.target.value;
        if(id && !selected.includes(id) && selected.length < 4){
          selected.push(id);
          renderSelected();
          renderSelect();
          updateChart();
        }
        e.target.value = '';
      });

      $('#clearBtn').addEventListener('click', ()=>{
        selected = [];
        renderSelected();
        renderSelect();
        updateChart();
      });

      // Export PNG handler
      $('#exportBtn').addEventListener('click', ()=>{
        if(!chart) return;
        const url = chart.toBase64Image();
        const link = document.createElement('a');
        link.download = `comparaison-npi-${Date.now()}.png`;
        link.href = url;
        link.click();
      });

      // Share URL handler
      $('#shareBtn').addEventListener('click', async ()=>{
        if(selected.length === 0) return;
        const params = new URLSearchParams();
        selected.forEach(id => params.append('country', id));
        const shareUrl = `${location.origin}${location.pathname}?${params.toString()}`;
        if(navigator.clipboard && navigator.clipboard.writeText){
          try{
            await navigator.clipboard.writeText(shareUrl);
            const btn = $('#shareBtn');
            const orig = btn.textContent;
            btn.textContent = '✓ Copié !';
            setTimeout(()=> btn.textContent = orig, 2000);
          } catch(e){
            prompt('Copiez cette URL:', shareUrl);
          }
        } else {
          prompt('Copiez cette URL:', shareUrl);
        }
      });

      // Preselect from query ?country=id1&country=id2...
      const params = new URLSearchParams(location.search);
      const qList = params.getAll('country');
      if(qList.length > 0){
        qList.forEach(q=>{
          const exists = data.find(c=> c.id===q);
          if(exists && !selected.includes(q) && selected.length < 4){ selected.push(q); }
        });
        renderSelected();
        renderSelect();
      }
      updateChart();
    } catch(e){ console.error('Failed to load npi-data.json', e); }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
