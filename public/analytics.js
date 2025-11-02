// Educational Analytics - Privacy-first local tracking
(function(){
  const STORAGE_KEY = 'npi_analytics';
  const SESSION_KEY = 'npi_session';
  
  let sessionId = null;
  let pageStartTime = Date.now();

  // Generate session ID
  function generateSessionId(){
    return `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get or create session
  function getSession(){
    let session = sessionStorage.getItem(SESSION_KEY);
    if(!session){
      session = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, session);
    }
    return session;
  }

  // Get analytics data from localStorage
  function getData(){
    try{
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { events: [], sessions: [] };
    } catch(e){
      console.warn('[Analytics] Parse error:', e);
      return { events: [], sessions: [] };
    }
  }

  // Save analytics data
  function saveData(data){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch(e){
      console.warn('[Analytics] Storage error:', e);
    }
  }

  // Track event
  function track(eventType, eventData = {}){
    const data = getData();
    const event = {
      id: `e_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      session: sessionId,
      type: eventType,
      timestamp: Date.now(),
      page: location.pathname,
      data: eventData
    };
    
    data.events.push(event);
    
    // Limit to last 1000 events to avoid storage overflow
    if(data.events.length > 1000){
      data.events = data.events.slice(-1000);
    }
    
    saveData(data);
    console.log('[Analytics]', eventType, eventData);
  }

  // Track page view
  function trackPageView(){
    const page = location.pathname || '/';
    track('page_view', {
      page,
      title: document.title,
      referrer: document.referrer
    });
  }

  // Track page duration on unload
  function trackPageDuration(){
    const duration = Date.now() - pageStartTime;
    track('page_duration', {
      page: location.pathname,
      duration: Math.round(duration / 1000) // seconds
    });
  }

  // Track guide interaction
  function trackGuideOpen(){
    track('guide_open', { page: location.pathname });
  }

  function trackGuideStep(step){
    track('guide_step', { step, page: location.pathname });
  }

  // Track quiz interaction
  function trackQuizAttempt(question, answer, correct){
    track('quiz_attempt', { question, answer, correct });
  }

  function trackQuizComplete(score, total){
    track('quiz_complete', { score, total, percentage: Math.round((score/total)*100) });
  }

  // Track map interaction
  function trackMapFilter(wave){
    track('map_filter', { wave });
  }

  function trackMapCountryClick(country){
    track('map_country_click', { country });
  }

  // Track comparison
  function trackComparisonCreate(countries){
    track('comparison_create', { countries, count: countries.length });
  }

  function trackComparisonExport(){
    track('comparison_export', { page: location.pathname });
  }

  function trackComparisonShare(){
    track('comparison_share', { page: location.pathname });
  }

  // Track timeline interaction
  function trackTimelinePlay(){
    track('timeline_play');
  }

  function trackTimelineDecade(decade){
    track('timeline_decade', { decade });
  }

  // Get stats summary
  function getStats(){
    const data = getData();
    const events = data.events || [];
    
    const stats = {
      totalEvents: events.length,
      pageViews: events.filter(e => e.type === 'page_view').length,
      guidesOpened: events.filter(e => e.type === 'guide_open').length,
      quizAttempts: events.filter(e => e.type === 'quiz_attempt').length,
      quizCompleted: events.filter(e => e.type === 'quiz_complete').length,
      comparisonsCreated: events.filter(e => e.type === 'comparison_create').length,
      exports: events.filter(e => e.type === 'comparison_export').length,
      shares: events.filter(e => e.type === 'comparison_share').length,
      
      // Page breakdown
      pageBreakdown: {},
      
      // Quiz stats
      quizStats: {
        attempts: 0,
        correct: 0,
        incorrect: 0,
        avgScore: 0
      },
      
      // Time stats
      avgPageDuration: 0,
      
      events: events.sort((a, b) => b.timestamp - a.timestamp) // Most recent first
    };

    // Calculate page breakdown
    events.filter(e => e.type === 'page_view').forEach(e => {
      const page = e.data.page || e.page;
      stats.pageBreakdown[page] = (stats.pageBreakdown[page] || 0) + 1;
    });

    // Calculate quiz stats
    const quizAttempts = events.filter(e => e.type === 'quiz_attempt');
    stats.quizStats.attempts = quizAttempts.length;
    stats.quizStats.correct = quizAttempts.filter(e => e.data.correct).length;
    stats.quizStats.incorrect = quizAttempts.length - stats.quizStats.correct;
    
    const quizCompleted = events.filter(e => e.type === 'quiz_complete');
    if(quizCompleted.length > 0){
      const totalPercentage = quizCompleted.reduce((sum, e) => sum + (e.data.percentage || 0), 0);
      stats.quizStats.avgScore = Math.round(totalPercentage / quizCompleted.length);
    }

    // Calculate average page duration
    const durations = events.filter(e => e.type === 'page_duration' && e.data.duration);
    if(durations.length > 0){
      const totalDuration = durations.reduce((sum, e) => sum + e.data.duration, 0);
      stats.avgPageDuration = Math.round(totalDuration / durations.length);
    }

    return stats;
  }

  // Clear all analytics data
  function clearData(){
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    console.log('[Analytics] Data cleared');
  }

  // Export data as JSON
  function exportData(){
    const data = getData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `npi-analytics-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Initialize
  function init(){
    sessionId = getSession();
    trackPageView();

    // Track page duration on unload
    window.addEventListener('beforeunload', trackPageDuration);

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', ()=>{
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if(scrollPercent > maxScroll){
        maxScroll = scrollPercent;
        if(scrollPercent === 100){
          track('scroll_complete', { page: location.pathname });
        }
      }
    });
  }

  // Public API
  window.analytics = {
    track,
    trackGuideOpen,
    trackGuideStep,
    trackQuizAttempt,
    trackQuizComplete,
    trackMapFilter,
    trackMapCountryClick,
    trackComparisonCreate,
    trackComparisonExport,
    trackComparisonShare,
    trackTimelinePlay,
    trackTimelineDecade,
    getStats,
    clearData,
    exportData
  };

  // Auto-init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
