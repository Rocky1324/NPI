// i18n - Internationalization engine for NPI Dashboard
(function(){
  const STORAGE_KEY = 'npi_language';
  const SUPPORTED_LANGS = ['fr', 'en'];
  const DEFAULT_LANG = 'fr';
  
  let currentLang = DEFAULT_LANG;
  let translations = {};

  // Detect browser language
  function detectLanguage(){
    const stored = localStorage.getItem(STORAGE_KEY);
    if(stored && SUPPORTED_LANGS.includes(stored)) return stored;
    
    const browserLang = (navigator.language || navigator.userLanguage || '').split('-')[0];
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
  }

  // Load translation dictionary
  async function loadTranslations(lang){
    try{
      const res = await fetch(`/i18n/${lang}.json`);
      if(!res.ok) throw new Error(`Failed to load ${lang}.json`);
      return await res.json();
    } catch(e){
      console.error('[i18n] Load error:', e);
      if(lang !== DEFAULT_LANG){
        return loadTranslations(DEFAULT_LANG);
      }
      return {};
    }
  }

  // Get translation by key path (e.g., "home.title")
  function t(key){
    const parts = key.split('.');
    let value = translations;
    for(const part of parts){
      if(!value || typeof value !== 'object') return key;
      value = value[part];
    }
    return value || key;
  }

  // Translate all elements with data-i18n attribute
  function translatePage(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      
      // Handle different element types
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){
        if(el.placeholder) el.placeholder = translated;
      } else if(el.hasAttribute('aria-label')){
        el.setAttribute('aria-label', translated);
      } else {
        el.textContent = translated;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
  }

  // Switch language
  async function setLanguage(lang){
    if(!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    translations = await loadTranslations(lang);
    translatePage();
    
    // Update language switcher UI
    updateLanguageSwitcher();
    
    // Dispatch event for custom handling
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang, translations } }));
  }

  // Update language switcher buttons
  function updateLanguageSwitcher(){
    document.querySelectorAll('[data-lang-switch]').forEach(btn=>{
      const btnLang = btn.getAttribute('data-lang-switch');
      btn.classList.toggle('active', btnLang === currentLang);
      btn.setAttribute('aria-pressed', btnLang === currentLang);
    });
  }

  // Initialize i18n
  async function init(){
    const detectedLang = detectLanguage();
    await setLanguage(detectedLang);

    // Setup language switcher buttons
    document.querySelectorAll('[data-lang-switch]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const lang = btn.getAttribute('data-lang-switch');
        setLanguage(lang);
      });
    });
  }

  // Export public API
  window.i18n = {
    init,
    t,
    setLanguage,
    getLanguage: ()=> currentLang,
    getSupportedLanguages: ()=> SUPPORTED_LANGS
  };

  // Auto-init on DOMContentLoaded
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
