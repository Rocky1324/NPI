(function(){
  function el(t, a, c){
    const e = document.createElement(t);
    if(a){
      const { dataset, ...rest } = a;
      Object.assign(e, rest);
      if(dataset && e.dataset){
        for(const k in dataset){ try{ e.dataset[k] = dataset[k]; }catch(_){} }
      }
    }
    if(c) e.append(...c);
    return e;
  }
  // Ensure minimal styles exist (fallback for pages not loading global CSS)
  function ensureStyles(){
    if(getComputedStyle(document.documentElement).getPropertyValue('--accent')=== ''){
      const r = document.documentElement.style;
      r.setProperty('--accent','#06b6d4');
      r.setProperty('--accent-2','#7c3aed');
      r.setProperty('--border','rgba(255,255,255,0.08)');
    }
    if(!document.getElementById('guide-inline-css')){
      const css = `
      .guide-overlay{ position:fixed; inset:0; background:rgba(0,0,0,0.25); backdrop-filter:saturate(120%) blur(2px); z-index:999 }
      .guide-fab{ position:fixed; right:18px; bottom:18px; z-index:1000; border:0; border-radius:9999px; width:48px; height:48px; font-size:22px; font-weight:800; cursor:pointer; box-shadow:0 10px 30px rgba(2,6,23,.6); background:linear-gradient(90deg,var(--accent),var(--accent-2)); color:#021223 }
      .guide-fab:hover{ filter:brightness(1.05) }
      .guide-panel{ position:fixed; right:18px; bottom:78px; width:min(360px, 92vw); max-height:70vh; background:rgba(6,16,28,0.96); border:1px solid var(--border); border-radius:14px; box-shadow:0 24px 60px rgba(2,6,23,.7); display:flex; flex-direction:column; overflow:hidden; z-index:1000; color:#e6eef6; font-family: inherit }
      .guide-head{ display:flex; align-items:center; justify-content:space-between; padding:10px 12px; background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border) }
      .guide-title{ font-weight:800 }
      .guide-close{ border:0; background:transparent; color:#e6eef6; font-size:20px; cursor:pointer }
      .guide-body{ padding:12px; display:grid; gap:8px; overflow:auto }
      .guide-section{ font-weight:800; color:#e6eef6 }
      .guide-msg{ display:flex; gap:8px; color:#d7e2eb; font-size:14px }
      .guide-msg .dot{ color:var(--accent) }
      .guide-actions{ padding:10px 12px; border-top:1px solid var(--border) }
      .guide-choices{ display:flex; flex-wrap:wrap; gap:8px }
      .btn.small{ padding:8px 10px; font-size:12px }
      .btn.secondary{ background:transparent; color:#dff6fb; border:1px solid var(--border); border-radius:999px }
      `;
      const s = document.createElement('style'); s.id='guide-inline-css'; s.textContent = css; document.head.appendChild(s);
    }
  }
  function pageContext(){
    const path = (location.pathname || '').toLowerCase();
    const isCours = !!document.querySelector('.slides');
    const isCarte = /carte\.html$/.test(path) || !!document.getElementById('map');
    const isCompare = /comparaison\.html$/.test(path) || !!document.getElementById('chart');
    const isTimeline = /timeline\.html$/.test(path) || !!document.getElementById('decades');
    const tips = [];
    if(isCours){ tips.push("Astuce présentation: naviguez avec ← →, Home/End, et ‘T’ pour la table des matières."); }
    if(isCarte){ tips.push("Carte: utilisez les boutons de vagues pour filtrer et cliquez sur un pays pour voir sa fiche."); }
    if(isCompare){ tips.push("Comparaison: ajoutez jusqu’à 4 pays puis interprétez le graphique Chart.js."); }
    if(isTimeline){ tips.push("Chronologie: utilisez ▶️, ‘Décennie suivante’ et les pastilles pour naviguer rapidement."); }
    if(!tips.length){ tips.push("Parcourez les pages via le menu et explorez les sections interactives."); }
    return tips;
  }

  const randomExamples = [
    "Corée: État développeur, R&D > 4% PIB, champions industriels.",
    "Chine: ZES, IDE massifs, montée en gamme, rôle des GVC.",
    "Vietnam: Đổi Mới, accords (CPTPP/EVFTA), électronique.",
    "Mexique: intégration nord-américaine, maquiladoras, nearshoring.",
  ];

  const steps = [
    { k:"intro", t:"Bienvenue !", m:["Je suis le mini‑guide des NPI.", "Souhaitez‑vous une définition rapide ou un aperçu des vagues ?"], q:[{l:"Définition", n:"definition"},{l:"Vagues", n:"vagues"},{l:"Exemples", n:"exemples"}] },
    { k:"definition", t:"Définition", m:["Un NPI est un pays qui connaît une industrialisation rapide et une montée en gamme productive, souvent tirée par les exportations."], q:[{l:"Caractéristiques", n:"caracs"},{l:"Revenir", n:"intro"}] },
    { k:"caracs", t:"Caractéristiques", m:["• Orientation export","• Investissements et montée en compétences","• Intégration aux chaînes de valeur (GVC)","• Transition sectorielle (industrie, puis services)"] , q:[{l:"Vagues historiques", n:"vagues"},{l:"Études de cas", n:"exemples"},{l:"Revenir", n:"intro"}]},
    { k:"vagues", t:"Vagues historiques", m:["V1: Tigres asiatiques (Corée, Taïwan, Singapour, Hong Kong)","V2: Pays émergents industriels (ex: Malaisie, Thaïlande)","V3: Chine, Mexique, etc.","V4: Nouveaux entrants (Vietnam, Bangladesh, etc.)"], q:[{l:"Études de cas", n:"exemples"},{l:"Quiz", n:"quiz"},{l:"Revenir", n:"intro"}] },
    { k:"exemples", t:"Études de cas", m:["Corée: État développeur, champions industriels, forte R&D","Chine: ZES, IDE, montée en gamme","Vietnam: intégration rapide aux GVC"], q:[{l:"Quiz", n:"quiz"},{l:"Revenir", n:"intro"}] },
    { k:"quiz", t:"Quiz express", m:["Question: Combien de vagues présentées ici ? (Indice: ≥ 3)","Choisissez la réponse correcte."], q:[{l:"3", n:"quiz_res_3"},{l:"4", n:"quiz_res_4"},{l:"Revenir", n:"intro"}] },
    { k:"quiz_res_3", t:"Réponse", m:["Presque ! Ici, on présente généralement 4 vagues."], q:[{l:"Voir vagues", n:"vagues"},{l:"Revenir", n:"intro"}] },
    { k:"quiz_res_4", t:"Réponse", m:["Bravo ! 4 vagues sont couramment présentées dans ce cours."], q:[{l:"Voir vagues", n:"vagues"},{l:"Revenir", n:"intro"}] }
  ];
  function adjustPosition(fabEl, panelEl){
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const safe = 'calc(env(safe-area-inset-bottom, 0px) + 18px)';
    fabEl.style.bottom = mobile ? safe : '18px';
    panelEl.style.bottom = mobile ? 'calc(env(safe-area-inset-bottom, 0px) + 78px)' : '78px';
    // Avoid overlap with the slide hint on cours.html (bottom-right)
    const hint = document.querySelector('.hint');
    if(hint && getComputedStyle(hint).display !== 'none'){
      fabEl.style.bottom = mobile ? '120px' : '96px';
      panelEl.style.bottom = mobile ? '180px' : '156px';
    }
  }

  function buildUI(){
    ensureStyles();
    const fab = el('button',{className:'guide-fab',type:'button',ariaLabel:'Ouvrir le guide',innerText:'❓'});
    const overlay = el('div',{className:'guide-overlay',hidden:true,role:'presentation','aria-hidden':'true'});
    const panel = el('div',{className:'guide-panel',hidden:true,role:'dialog','aria-modal':'true','aria-labelledby':'guide-title'});
    const header = el('div',{className:'guide-head'},[
      el('div',{className:'guide-title',id:'guide-title',innerText:'Guide NPI'}),
      el('button',{className:'guide-close',type:'button',innerText:'×','aria-label':'Fermer le guide',role:'button',tabIndex:0})
    ]);
    const body = el('div',{className:'guide-body'});
    const footer = el('div',{className:'guide-actions'});
    panel.append(header,body,footer);
    document.body.append(fab,overlay,panel);
    let current = 'intro';
    function open(){ 
      panel.hidden=false; overlay.hidden=false; 
      panel.style.display='flex'; overlay.style.display='block'; 
      panel.setAttribute('aria-hidden', 'false'); overlay.setAttribute('aria-hidden', 'false');
      render(current); 
      // Focus first interactive element (close button)
      setTimeout(()=> header.querySelector('.guide-close')?.focus(), 50);
    }
    function close(){ 
      panel.hidden=true; overlay.hidden=true; 
      panel.style.display='none'; overlay.style.display='none'; 
      panel.setAttribute('aria-hidden', 'true'); overlay.setAttribute('aria-hidden', 'true');
      // Return focus to FAB
      fab.focus();
    }
    function render(k){
      const s = steps.find(x=>x.k===k)||steps[0];
      current = s.k;
      body.replaceChildren();
      footer.replaceChildren();
      const title = el('div',{className:'guide-section',innerText:s.t});
      body.append(title);
      // Base messages
      s.m.forEach(line=> body.append(el('div',{className:'guide-msg'},[el('span',{className:'dot',innerText:'•'}),el('span',{innerText:line})])));
      // Context-aware tips on intro
      if(s.k === 'intro'){
        pageContext().forEach(line=> body.append(el('div',{className:'guide-msg'},[el('span',{className:'dot',innerText:'•'}),el('span',{innerText:line})])));
        // Random example snippet
        const rand = randomExamples[Math.floor(Math.random()*randomExamples.length)];
        body.append(el('div',{className:'guide-msg'},[el('span',{className:'dot',innerText:'•'}),el('span',{innerText:`Exemple: ${rand}`})]));
      }
      const wrap = el('div',{className:'guide-choices'});
      s.q.forEach(q=>{ const b = el('button',{className:'btn secondary small',type:'button',innerText:q.l}); b.addEventListener('click',()=>render(q.n)); wrap.append(b); });
      footer.append(wrap);
    }
    fab.addEventListener('click', open);
    // Robust close handlers
    overlay.addEventListener('click', close);
    // Direct listener on the close button (most reliable)
    const closeBtn = header.querySelector('.guide-close');
    if(closeBtn){
      const act = (e)=>{ e.preventDefault(); e.stopPropagation(); close(); };
      closeBtn.addEventListener('click', act);
      closeBtn.addEventListener('pointerdown', act);
      closeBtn.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ act(e); } });
    }
    // Delegation fallback inside panel
    panel.addEventListener('click', (e)=>{
      const t = e.target;
      if(!t) return;
      if((t.matches && t.matches('.guide-close')) || (t.closest && t.closest('[data-guide-close]'))){
        e.preventDefault(); e.stopPropagation(); close();
      }
    });
    window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !panel.hidden){ close(); } });
    // Global fallback (in case of event interference)
    document.addEventListener('click', (e)=>{
      const t = e.target;
      if(!t) return;
      const el = (t.closest ? t.closest('.guide-close') : null);
      if(el && !panel.hidden){ e.preventDefault(); e.stopPropagation(); close(); }
    }, true);
    document.addEventListener('pointerdown', (e)=>{
      const t = e.target;
      if(!t) return;
      const el = (t.closest ? t.closest('.guide-close') : null);
      if(el && !panel.hidden){ e.preventDefault(); e.stopPropagation(); close(); }
    }, true);
    adjustPosition(fab,panel);
    window.addEventListener('resize',()=>adjustPosition(fab,panel));
    return {fab,panel,overlay,render}
  }
  function safeInit(){ try{ buildUI(); } catch(e){ console && console.error && console.error('guide init error', e); } }
  if(document.readyState==='complete' || document.readyState==='interactive') safeInit(); else document.addEventListener('DOMContentLoaded', safeInit);
})();
