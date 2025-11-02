// Stats Dashboard - Authentication and Visualization
(function(){
  const AUTH_KEY = 'npi_stats_auth';
  
  // Authorized users (normalized for comparison)
  const AUTHORIZED_USERS = [
    'amicy christian',
    'saina dasque',
    'dorotti opont',
    'shekinah shery',
    'rock khyshnert',
    'delor karine',
    'hilary pierre-louis'
  ];

  let charts = {};

  // Normalize name for comparison
  function normalizeName(name){
    return (name || '').toLowerCase().trim().replace(/\s+/g, ' ');
  }

  // Check if user is authorized
  function isAuthorized(name){
    const normalized = normalizeName(name);
    return AUTHORIZED_USERS.includes(normalized);
  }

  // Check authentication
  function checkAuth(){
    const savedAuth = sessionStorage.getItem(AUTH_KEY);
    if(savedAuth && isAuthorized(savedAuth)){
      return savedAuth;
    }
    return null;
  }

  // Show authentication screen
  function showAuthScreen(){
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
  }

  // Show dashboard
  function showDashboard(userName){
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    sessionStorage.setItem(AUTH_KEY, userName);
    loadStats();
  }

  // Handle authentication
  function handleAuth(){
    const input = document.getElementById('nameInput');
    const error = document.getElementById('authError');
    const name = input.value.trim();

    if(!name){
      error.textContent = 'Veuillez entrer votre nom.';
      error.style.display = 'block';
      return;
    }

    if(isAuthorized(name)){
      showDashboard(normalizeName(name));
    } else {
      error.textContent = 'Accès refusé. Nom non autorisé.';
      error.style.display = 'block';
      input.value = '';
    }
  }

  // Format date/time
  function formatDateTime(timestamp){
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Format event type
  function formatEventType(type){
    const labels = {
      page_view: 'Page vue',
      guide_open: 'Guide ouvert',
      guide_step: 'Guide étape',
      quiz_attempt: 'Quiz tentative',
      quiz_complete: 'Quiz complété',
      comparison_create: 'Comparaison',
      comparison_export: 'Export PNG',
      comparison_share: 'Partage',
      map_filter: 'Carte filtre',
      map_country_click: 'Pays cliqué',
      timeline_play: 'Timeline lecture',
      timeline_decade: 'Timeline décennie',
      scroll_complete: 'Scroll complet',
      page_duration: 'Durée page'
    };
    return labels[type] || type;
  }

  // Create summary stats cards
  function createStatsCards(stats){
    const grid = document.getElementById('statsGrid');
    grid.innerHTML = '';

    const cards = [
      { value: stats.totalEvents, label: 'Événements totaux', icon: '📊' },
      { value: stats.pageViews, label: 'Pages vues', icon: '👁️' },
      { value: stats.guidesOpened, label: 'Guides ouverts', icon: '❓' },
      { value: stats.quizAttempts, label: 'Quiz tentatives', icon: '✏️' },
      { value: stats.quizCompleted, label: 'Quiz complétés', icon: '✅' },
      { value: stats.quizStats.avgScore + '%', label: 'Score moyen quiz', icon: '🎯' },
      { value: stats.comparisonsCreated, label: 'Comparaisons', icon: '📈' },
      { value: stats.avgPageDuration + 's', label: 'Temps moyen/page', icon: '⏱️' }
    ];

    cards.forEach(card => {
      const div = document.createElement('div');
      div.className = 'stat-card';
      div.innerHTML = `
        <div class="icon">${card.icon}</div>
        <div class="value">${card.value}</div>
        <div class="label">${card.label}</div>
      `;
      grid.appendChild(div);
    });
  }

  // Create page breakdown chart
  function createPageChart(stats){
    const ctx = document.getElementById('pageChart').getContext('2d');
    
    if(charts.pageChart) charts.pageChart.destroy();

    const pages = Object.keys(stats.pageBreakdown);
    const counts = Object.values(stats.pageBreakdown);

    charts.pageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: pages.map(p => p.replace('/','').replace('.html','') || 'home'),
        datasets: [{
          label: 'Vues',
          data: counts,
          backgroundColor: '#06b6d4',
          borderColor: '#0891b2',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }

  // Create quiz stats chart
  function createQuizChart(stats){
    const ctx = document.getElementById('quizChart').getContext('2d');
    
    if(charts.quizChart) charts.quizChart.destroy();

    charts.quizChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Correctes', 'Incorrectes'],
        datasets: [{
          data: [stats.quizStats.correct, stats.quizStats.incorrect],
          backgroundColor: ['#22c55e', '#ef4444'],
          borderColor: ['#16a34a', '#dc2626'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  // Create events table
  function createEventsTable(stats){
    const tbody = document.getElementById('eventsBody');
    tbody.innerHTML = '';

    const recentEvents = stats.events.slice(0, 50);

    if(recentEvents.length === 0){
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:40px">Aucun événement enregistré</td></tr>';
      return;
    }

    recentEvents.forEach(event => {
      const tr = document.createElement('tr');
      
      const typeTd = document.createElement('td');
      typeTd.innerHTML = `<span class="event-type ${event.type}">${formatEventType(event.type)}</span>`;
      
      const pageTd = document.createElement('td');
      pageTd.textContent = event.page || '-';
      
      const detailsTd = document.createElement('td');
      const details = [];
      if(event.data){
        if(event.data.countries) details.push(`Pays: ${event.data.countries.join(', ')}`);
        if(event.data.wave) details.push(`Vague: ${event.data.wave}`);
        if(event.data.country) details.push(`Pays: ${event.data.country}`);
        if(event.data.step) details.push(`Étape: ${event.data.step}`);
        if(event.data.score !== undefined) details.push(`Score: ${event.data.score}/${event.data.total}`);
        if(event.data.decade) details.push(`Décennie: ${event.data.decade}`);
        if(event.data.duration) details.push(`${event.data.duration}s`);
      }
      detailsTd.textContent = details.length > 0 ? details.join(' · ') : '-';
      detailsTd.style.color = 'var(--muted)';
      detailsTd.style.fontSize = '13px';
      
      const timeTd = document.createElement('td');
      timeTd.textContent = formatDateTime(event.timestamp);
      timeTd.style.whiteSpace = 'nowrap';
      
      tr.append(typeTd, pageTd, detailsTd, timeTd);
      tbody.appendChild(tr);
    });
  }

  // Load and display stats
  function loadStats(){
    if(!window.analytics){
      console.error('[Stats] Analytics not loaded');
      return;
    }

    const stats = window.analytics.getStats();
    console.log('[Stats] Loaded:', stats);

    createStatsCards(stats);
    createPageChart(stats);
    createQuizChart(stats);
    createEventsTable(stats);
  }

  // Initialize
  function init(){
    const authenticated = checkAuth();
    
    if(authenticated){
      showDashboard(authenticated);
    } else {
      showAuthScreen();
    }

    // Setup auth button
    document.getElementById('authBtn').addEventListener('click', handleAuth);
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
      if(e.key === 'Enter') handleAuth();
    });

    // Setup action buttons
    document.getElementById('refreshBtn').addEventListener('click', loadStats);
    
    document.getElementById('exportBtn').addEventListener('click', () => {
      if(window.analytics) window.analytics.exportData();
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
      if(confirm('Êtes-vous sûr de vouloir effacer toutes les données analytics ? Cette action est irréversible.')){
        if(window.analytics){
          window.analytics.clearData();
          loadStats();
        }
      }
    });
  }

  // Auto-init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
