/**
 * DEMO.JS - Système de tour guidé automatisé
 * 
 * Ce fichier gère une démonstration automatique de l'application NPI Dashboard.
 * La démo navigue automatiquement à travers les pages et fonctionnalités,
 * avec des explications visuelles.
 */

(function() {
  'use strict';

  // ==================== CONFIGURATION ====================
  
  const DEMO_CONFIG = {
    // Délai par défaut entre les étapes (ms)
    stepDelay: 3000,
    // Délai pour les animations (ms)
    animationDelay: 800,
    // Délai après navigation vers nouvelle page (ms)
    navigationDelay: 2000,
    // Vitesse de typing simulation (ms par caractère)
    typingSpeed: 50,
    // Mode manuel (true) ou automatique (false)
    manualMode: true,
    // Offset pour le scroll (px au-dessus de l'élément)
    scrollOffset: 100
  };

  // ==================== SCÉNARIOS DE DÉMO ====================
  
  const DEMO_SCENARIOS = {
    // Démo pour la page d'accueil
    home: [
      {
        target: '.hero h1',
        message: 'Bienvenue sur le tableau de bord NPI ! 🌏',
        description: 'Découvrons ensemble les fonctionnalités de cette application interactive.',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '#stats',
        message: 'Statistiques en temps réel',
        description: 'Ces indicateurs montrent les données clés sur les Nouveaux Pays Industrialisés.',
        position: 'top',
        duration: 4000
      },
      {
        target: 'a[href="/carte.html"]',
        message: 'Explorons la carte interactive',
        description: 'Cliquons pour visualiser les NPI sur une carte mondiale...',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ],

    // Démo pour la carte interactive
    carte: [
      {
        target: 'h1',
        message: 'Carte Interactive des NPI 🗺️',
        description: 'Visualisez la distribution géographique des Nouveaux Pays Industrialisés.',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '#map',
        message: 'Carte mondiale interactive',
        description: 'Chaque point représente un NPI. Cliquez sur les marqueurs pour voir les détails de chaque pays.',
        position: 'top',
        duration: 4000,
        highlight: true
      },
      {
        target: '.legend',
        message: 'Légende des vagues',
        description: 'Les couleurs représentent les 4 vagues d\'industrialisation : Dragons (bleu), ASEAN (orange), Émergents (jaune), Nouveaux (vert).',
        position: 'top',
        duration: 3000
      },
      {
        target: 'a[href="/timeline.html"]',
        message: 'Passons à la chronologie',
        description: 'Voyons l\'évolution historique des NPI...',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ],

    // Démo pour la timeline
    timeline: [
      {
        target: 'h1',
        message: 'Frise Chronologique 📅',
        description: 'Découvrez l\'histoire de l\'industrialisation par vagues successives.',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '.controls',
        message: 'Contrôles de navigation',
        description: 'Utilisez ces boutons pour voyager dans le temps et explorer les différentes décennies.',
        position: 'top',
        duration: 3000
      },
      {
        target: '.grid.grid-2',
        message: 'Les 4 vagues d\'industrialisation',
        description: 'Observez l\'évolution de chaque vague : Dragons asiatiques, ASEAN, Émergents, et nouvelles économies.',
        position: 'top',
        duration: 4000,
        highlight: true
      },
      {
        target: 'a[href="/comparaison.html"]',
        message: 'Comparons des pays',
        description: 'Allons comparer les performances de différents NPI...',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ],

    // Démo pour la comparaison
    comparaison: [
      {
        target: 'h1',
        message: 'Outil de Comparaison 📊',
        description: 'Comparez jusqu\'à 4 pays sur différents indicateurs économiques.',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '#countrySelect',
        message: 'Sélection des pays',
        description: 'Ajoutons quelques pays à comparer...',
        position: 'bottom',
        action: 'selectCountries',
        duration: 4000,
        waitForAction: true
      },
      {
        target: '#chart-container',
        message: 'Graphiques comparatifs',
        description: 'Visualisez les différences entre les pays sélectionnés sur plusieurs décennies.',
        position: 'top',
        duration: 4000,
        highlight: true
      },
      {
        target: '.controls',
        message: 'Export et partage',
        description: 'Vous pouvez exporter ces graphiques en PNG ou partager votre comparaison...',
        position: 'top',
        duration: 3000
      },
      {
        target: 'a[href="/cours.html"]',
        message: 'Suivons le cours interactif',
        description: 'Découvrons ensemble comment se sont développés les NPI...',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ],

    // Démo pour le cours
    cours: [
      {
        target: '.slide.show .headline h1',
        message: 'Cours Interactif 🎓',
        description: 'Une présentation complète sur les Nouveaux Pays Industrialisés.',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '.slide.show .content',
        message: 'Contenu pédagogique',
        description: 'Naviguez à travers les slides pour apprendre. Chaque slide contient des informations clés...',
        position: 'top',
        duration: 3000
      },
      {
        target: '.controls',
        message: 'Navigation entre slides',
        description: 'Utilisez ces boutons pour naviguer. Passons à la slide suivante...',
        position: 'top',
        action: 'click',
        actionTarget: '#nextBtn',
        duration: 2000
      },
      {
        target: '#quiz',
        message: 'Quiz interactif',
        description: 'Testez vos connaissances avec un quiz à la fin du cours.',
        position: 'top',
        duration: 3000
      },
      {
        target: 'a[href="/stats.html"]',
        message: 'Consultons les statistiques',
        description: 'Voyons les analyses d\'utilisation de la plateforme...',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ],

    // Démo pour les stats
    stats: [
      {
        target: '#dashboard h1',
        message: 'Tableau de Bord Analytics 📊',
        description: 'Suivez les statistiques d\'utilisation de la plateforme (données locales anonymes).',
        position: 'bottom',
        duration: 3000
      },
      {
        target: '#statsGrid',
        message: 'Résumé des indicateurs',
        description: 'Vues de pages, temps de lecture, quiz tentés... Toutes les métriques importantes en un coup d\'œil.',
        position: 'top',
        duration: 4000
      },
      {
        target: '#pageChart',
        message: 'Graphique des pages visitées',
        description: 'Visualisez quelles pages sont les plus consultées par les utilisateurs.',
        position: 'top',
        duration: 3000,
        highlight: true
      },
      {
        target: 'a[href="/home.html"]',
        message: 'Retour à l\'accueil',
        description: 'Fin de la démonstration ! Explorez librement l\'application.',
        position: 'bottom',
        action: 'click',
        duration: 2000
      }
    ]
  };

  // ==================== ÉTAT DE LA DÉMO ====================
  
  let demoState = {
    isRunning: false,
    isPaused: false,
    currentPage: null,
    currentStep: 0,
    timeout: null,
    currentTarget: null,  // Élément actuellement mis en évidence
    currentHighlight: false,  // Si highlight agrandi
    currentPosition: 'bottom',  // Position de la tooltip
    isTransitioning: false  // Empêche les clics multiples
  };

  // ==================== ÉLÉMENTS DOM ====================
  
  let elements = {
    overlay: null,
    spotlight: null,
    tooltip: null,
    controls: null,
    startButton: null
  };

  // ==================== INITIALISATION ====================
  
  function init() {
    // Créer les éléments de la démo
    createDemoElements();
    
    // Ajouter le bouton "Start Demo" sur la page d'accueil
    if (isHomePage()) {
      createStartButton();
    }
    
    // Détecter la page courante
    detectCurrentPage();
    
    // Écouter les messages entre pages (pour continuer la démo après navigation)
    window.addEventListener('message', handlePageMessage);
    
    // Vérifier si une démo est en cours
    checkDemoContinuation();
  }

  // ==================== CRÉATION DES ÉLÉMENTS ====================
  
  function createDemoElements() {
    // Créer l'overlay (fond sombre semi-transparent)
    elements.overlay = document.createElement('div');
    elements.overlay.id = 'demo-overlay';
    elements.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      z-index: 999998;
      display: none;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(elements.overlay);

    // Créer le spotlight (met en évidence l'élément ciblé)
    elements.spotlight = document.createElement('div');
    elements.spotlight.id = 'demo-spotlight';
    elements.spotlight.style.cssText = `
      position: fixed;
      border: 3px solid #06b6d4;
      border-radius: 12px;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.6);
      z-index: 999999;
      display: none;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(elements.spotlight);

    // Créer la tooltip (message explicatif)
    elements.tooltip = document.createElement('div');
    elements.tooltip.id = 'demo-tooltip';
    elements.tooltip.style.cssText = `
      position: fixed;
      max-width: 400px;
      background: linear-gradient(135deg, #06b6d4, #7c3aed);
      color: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      z-index: 1000000;
      display: none;
      font-family: 'Inter', sans-serif;
      animation: tooltipFadeIn 0.4s ease;
    `;
    elements.tooltip.innerHTML = `
      <div style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" id="demo-tooltip-title"></div>
      <div style="font-size: 14px; line-height: 1.6; opacity: 0.95;" id="demo-tooltip-description"></div>
      <div style="margin-top: 12px; font-size: 12px; opacity: 0.8;" id="demo-tooltip-progress"></div>
    `;
    document.body.appendChild(elements.tooltip);

    // Créer les contrôles de démo
    elements.controls = document.createElement('div');
    elements.controls.id = 'demo-controls';
    elements.controls.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      display: none;
      gap: 10px;
      z-index: 1000001;
    `;
    elements.controls.innerHTML = `
      <button id="demo-prev-btn" style="
        padding: 12px 20px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      ">⬅️ Précédent</button>
      <button id="demo-next-btn" style="
        padding: 12px 20px;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      ">Suivant ➡️</button>
      <button id="demo-mode-btn" style="
        padding: 12px 20px;
        background: #f59e0b;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      ">▶️ Auto</button>
      <button id="demo-stop-btn" style="
        padding: 12px 20px;
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      ">⏹️ Stop</button>
    `;
    document.body.appendChild(elements.controls);

    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes tooltipFadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      #demo-prev-btn:hover, #demo-next-btn:hover, #demo-mode-btn:hover, #demo-stop-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
      }
      #demo-prev-btn:disabled {
        opacity: 0.5 !important;
        cursor: not-allowed !important;
        transform: none !important;
      }
      #demo-start-btn {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7);
        }
        50% {
          box-shadow: 0 0 0 15px rgba(6, 182, 212, 0);
        }
      }
    `;
    document.head.appendChild(style);

    // Ajouter les événements aux contrôles
    document.getElementById('demo-prev-btn').addEventListener('click', previousStep);
    document.getElementById('demo-next-btn').addEventListener('click', nextStepManual);
    document.getElementById('demo-mode-btn').addEventListener('click', toggleMode);
    document.getElementById('demo-stop-btn').addEventListener('click', stopDemo);
    
    // Support du clavier
    document.addEventListener('keydown', handleKeyboard);
    
    // Repositionner les éléments lors du scroll/resize
    window.addEventListener('scroll', repositionElements);
    window.addEventListener('resize', repositionElements);
  }
  
  function handleKeyboard(e) {
    if (!demoState.isRunning) return;
    
    switch(e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        nextStepManual();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        previousStep();
        break;
      case 'Escape':
        e.preventDefault();
        stopDemo();
        break;
      case 'm':
      case 'M':
        e.preventDefault();
        toggleMode();
        break;
    }
  }
  
  // Throttle pour éviter trop d'appels lors du scroll
  let repositionTimeout = null;
  function repositionElements() {
    // Repositionner le spotlight et tooltip si un élément est actuellement mis en évidence
    if (repositionTimeout) return;
    
    repositionTimeout = setTimeout(() => {
      if (demoState.isRunning && demoState.currentTarget) {
        highlightElement(demoState.currentTarget, demoState.currentHighlight);
        // Repositionner aussi la tooltip si elle est visible
        if (elements.tooltip.style.display === 'block') {
          positionTooltip(demoState.currentTarget, demoState.currentPosition);
        }
      }
      repositionTimeout = null;
    }, 100); // Throttle de 100ms
  }

  function createStartButton() {
    // Créer un bouton flottant "Start Demo"
    elements.startButton = document.createElement('button');
    elements.startButton.id = 'demo-start-btn';
    elements.startButton.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 16px 28px;
      background: linear-gradient(135deg, #06b6d4, #7c3aed);
      color: white;
      border: none;
      border-radius: 50px;
      font-weight: 800;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
      z-index: 999999;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
    `;
    elements.startButton.innerHTML = '🎬 Start Demo';
    elements.startButton.addEventListener('click', startDemo);
    elements.startButton.addEventListener('mouseenter', () => {
      elements.startButton.style.transform = 'scale(1.05)';
    });
    elements.startButton.addEventListener('mouseleave', () => {
      elements.startButton.style.transform = 'scale(1)';
    });
    document.body.appendChild(elements.startButton);
  }

  // ==================== DÉTECTION DE PAGE ====================
  
  function isHomePage() {
    return window.location.pathname === '/home.html' || 
           window.location.pathname === '/' || 
           window.location.pathname === '/index.html';
  }

  function detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('home.html') || path === '/') {
      demoState.currentPage = 'home';
    } else if (path.includes('carte.html')) {
      demoState.currentPage = 'carte';
    } else if (path.includes('timeline.html')) {
      demoState.currentPage = 'timeline';
    } else if (path.includes('comparaison.html')) {
      demoState.currentPage = 'comparaison';
    } else if (path.includes('cours.html')) {
      demoState.currentPage = 'cours';
    } else if (path.includes('stats.html')) {
      demoState.currentPage = 'stats';
    }
  }

  // ==================== GESTION DE LA DÉMO ====================
  
  function startDemo() {
    demoState.isRunning = true;
    demoState.isPaused = false;
    demoState.currentStep = 0;

    console.log(`🎬 Demo: Démarrage sur la page ${demoState.currentPage} (Mode: ${DEMO_CONFIG.manualMode ? 'Manuel' : 'Auto'})`);

    // Cacher le bouton Start
    if (elements.startButton) {
      elements.startButton.style.display = 'none';
    }

    // Afficher les contrôles
    elements.controls.style.display = 'flex';
    
    // Mettre à jour l'affichage des boutons selon le mode
    const modeBtn = document.getElementById('demo-mode-btn');
    if (DEMO_CONFIG.manualMode) {
      modeBtn.innerHTML = '▶️ Auto';
      modeBtn.style.background = '#f59e0b';
    } else {
      modeBtn.innerHTML = '⏸️ Manuel';
      modeBtn.style.background = '#6366f1';
    }

    // Sauvegarder l'état pour continuer après navigation
    localStorage.setItem('demoRunning', 'true');
    localStorage.setItem('demoPage', demoState.currentPage);
    localStorage.setItem('demoStep', '0');

    console.log(`💾 Demo: État sauvegardé - page: ${demoState.currentPage}, step: 0`);

    // Démarrer le scénario
    runScenario();
  }

  function stopDemo() {
    demoState.isRunning = false;
    demoState.isPaused = false;
    demoState.currentTarget = null;
    demoState.currentHighlight = false;
    demoState.currentPosition = 'bottom';
    
    // Nettoyer
    clearTimeout(demoState.timeout);
    hideOverlay();
    elements.controls.style.display = 'none';
    
    if (elements.startButton) {
      elements.startButton.style.display = 'block';
    }

    // Nettoyer le localStorage
    localStorage.removeItem('demoRunning');
    localStorage.removeItem('demoPage');
    localStorage.removeItem('demoStep');
  }

  function nextStepManual() {
    if (!DEMO_CONFIG.manualMode) return;
    
    // Empêcher les clics multiples pendant le traitement
    if (demoState.isTransitioning) {
      console.log('Demo: Transition en cours, clic ignoré');
      return;
    }
    
    const scenario = getCurrentScenario();
    if (demoState.currentStep < scenario.length - 1) {
      demoState.isTransitioning = true;
      demoState.currentStep++;
      localStorage.setItem('demoStep', demoState.currentStep.toString());
      executeStep(scenario[demoState.currentStep]);
      updateNavigationButtons();
      
      // Réactiver après un délai court
      setTimeout(() => {
        demoState.isTransitioning = false;
      }, 500);
    } else {
      // Dernière étape - exécuter l'action (navigation)
      const step = scenario[demoState.currentStep];
      if (step.action) {
        const actionElement = step.actionTarget ? 
          document.querySelector(step.actionTarget) : 
          document.querySelector(step.target);
        executeAction(step.action, actionElement);
      }
    }
  }

  function previousStep() {
    if (!DEMO_CONFIG.manualMode || demoState.currentStep <= 0) return;
    
    // Empêcher les clics multiples
    if (demoState.isTransitioning) {
      console.log('Demo: Transition en cours, clic ignoré');
      return;
    }
    
    demoState.isTransitioning = true;
    demoState.currentStep--;
    localStorage.setItem('demoStep', demoState.currentStep.toString());
    const scenario = getCurrentScenario();
    executeStep(scenario[demoState.currentStep]);
    updateNavigationButtons();
    
    setTimeout(() => {
      demoState.isTransitioning = false;
    }, 500);
  }

  function toggleMode() {
    DEMO_CONFIG.manualMode = !DEMO_CONFIG.manualMode;
    const btn = document.getElementById('demo-mode-btn');
    
    if (DEMO_CONFIG.manualMode) {
      btn.innerHTML = '▶️ Auto';
      btn.style.background = '#f59e0b';
      clearTimeout(demoState.timeout);
      updateNavigationButtons();
    } else {
      btn.innerHTML = '⏸️ Manuel';
      btn.style.background = '#6366f1';
      // Reprendre en mode automatique
      nextStep();
    }
  }

  function updateNavigationButtons() {
    const prevBtn = document.getElementById('demo-prev-btn');
    const nextBtn = document.getElementById('demo-next-btn');
    const scenario = getCurrentScenario();
    
    if (!scenario) return;
    
    // Désactiver Précédent si on est à la première étape
    if (demoState.currentStep === 0) {
      prevBtn.style.opacity = '0.5';
      prevBtn.style.cursor = 'not-allowed';
      prevBtn.disabled = true;
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.cursor = 'pointer';
      prevBtn.disabled = false;
    }
    
    // Changer le texte du bouton Suivant si dernière étape
    if (demoState.currentStep === scenario.length - 1) {
      nextBtn.innerHTML = 'Page suivante ➡️';
      nextBtn.style.background = '#7c3aed';
    } else {
      nextBtn.innerHTML = 'Suivant ➡️';
      nextBtn.style.background = '#10b981';
    }
  }

  function checkDemoContinuation() {
    const isRunning = localStorage.getItem('demoRunning');
    if (isRunning === 'true') {
      const savedPage = localStorage.getItem('demoPage');
      const savedStep = parseInt(localStorage.getItem('demoStep') || '0');
      
      console.log(`Demo: Vérification continuation - savedPage: ${savedPage}, currentPage: ${demoState.currentPage}, step: ${savedStep}`);
      
      // Vérifier si on est sur la bonne page
      if (savedPage === demoState.currentPage) {
        demoState.isRunning = true;
        demoState.currentStep = savedStep;
        
        console.log(`Demo: Reprise de la démo sur ${demoState.currentPage} à l'étape ${savedStep}`);
        
        // Attendre que la page soit chargée
        setTimeout(() => {
          elements.controls.style.display = 'flex';
          runScenario();
        }, DEMO_CONFIG.navigationDelay);
      } else {
        console.warn(`Demo: Page mismatch - expected ${savedPage} but on ${demoState.currentPage}`);
      }
    }
  }

  // ==================== EXÉCUTION DU SCÉNARIO ====================
  
  function runScenario() {
    if (!demoState.isRunning || demoState.isPaused) return;

    const scenario = getCurrentScenario();
    if (!scenario) {
      stopDemo();
      return;
    }

    if (demoState.currentStep >= scenario.length) {
      // Scénario terminé pour cette page
      // La navigation vers la page suivante est gérée dans l'action 'click'
      return;
    }

    const step = scenario[demoState.currentStep];
    executeStep(step);
  }

  function executeStep(step) {
    if (!demoState.isRunning) return;

    const target = document.querySelector(step.target);
    
    if (!target) {
      console.warn(`Demo: ⚠️ Target not found: ${step.target} - Skipping to next step`);
      
      // En mode automatique : passer à l'étape suivante
      if (!DEMO_CONFIG.manualMode) {
        nextStep();
      } else {
        // En mode manuel : aussi passer automatiquement (l'utilisateur ne peut rien faire)
        const scenario = getCurrentScenario();
        if (demoState.currentStep < scenario.length - 1) {
          demoState.currentStep++;
          localStorage.setItem('demoStep', demoState.currentStep.toString());
          // Réessayer avec la prochaine étape
          setTimeout(() => {
            executeStep(scenario[demoState.currentStep]);
          }, 300);
        }
      }
      return;
    }

    // Sauvegarder l'élément courant pour le repositionnement
    demoState.currentTarget = target;
    demoState.currentHighlight = step.highlight;
    demoState.currentPosition = step.position;
    
    // Scroller vers l'élément et ATTENDRE que le scroll soit terminé
    scrollToElement(target, () => {
      // Callback appelé quand le scroll est terminé
      
      // Afficher l'overlay et le spotlight
      showOverlay();
      highlightElement(target, step.highlight);

      // Afficher la tooltip
      showTooltip(step, target);

      // Mettre à jour les boutons en mode manuel
      if (DEMO_CONFIG.manualMode) {
        updateNavigationButtons();
      }

      // En mode automatique : exécuter l'action et passer à l'étape suivante
      if (!DEMO_CONFIG.manualMode) {
        // Exécuter l'action si définie
        if (step.action) {
          setTimeout(() => {
            // Utiliser actionTarget si défini, sinon target
            const actionElement = step.actionTarget ? 
              document.querySelector(step.actionTarget) : target;
            executeAction(step.action, actionElement);
          }, step.duration - 500);
        }

        // Passer à l'étape suivante
        demoState.timeout = setTimeout(() => {
          nextStep();
        }, step.duration);
      }
    });
  }

  function scrollToElement(element, callback) {
    const rect = element.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top;
    const offset = DEMO_CONFIG.scrollOffset;
    
    // Calculer la position optimale (centrer l'élément si possible)
    const targetPosition = absoluteTop - offset;
    
    console.log(`Demo: Scroll vers l'élément (top: ${targetPosition}px)`);
    
    // Scroll smooth vers l'élément
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Attendre que le scroll soit terminé avant d'appeler le callback
    // Vérifie périodiquement si on a atteint la position cible
    let lastPosition = window.pageYOffset;
    let samePositionCount = 0;
    
    const checkScrollEnd = setInterval(() => {
      const currentPosition = window.pageYOffset;
      
      // Si la position n'a pas changé depuis 2 vérifications, le scroll est terminé
      if (Math.abs(currentPosition - lastPosition) < 1) {
        samePositionCount++;
        if (samePositionCount >= 2) {
          clearInterval(checkScrollEnd);
          console.log(`Demo: Scroll terminé à ${currentPosition}px`);
          if (callback) callback();
        }
      } else {
        samePositionCount = 0;
      }
      
      lastPosition = currentPosition;
    }, 50); // Vérifie toutes les 50ms
    
    // Timeout de sécurité (max 2 secondes)
    setTimeout(() => {
      clearInterval(checkScrollEnd);
      console.log(`Demo: Scroll timeout, forçage du callback`);
      if (callback) callback();
    }, 2000);
  }

  function nextStep() {
    demoState.currentStep++;
    localStorage.setItem('demoStep', demoState.currentStep.toString());
    runScenario();
  }

  function getCurrentScenario() {
    return DEMO_SCENARIOS[demoState.currentPage] || null;
  }

  // ==================== AFFICHAGE VISUEL ====================
  
  function showOverlay() {
    elements.overlay.style.display = 'block';
    setTimeout(() => {
      elements.overlay.style.opacity = '1';
    }, 10);
  }

  function hideOverlay() {
    elements.overlay.style.opacity = '0';
    elements.spotlight.style.display = 'none';
    elements.tooltip.style.display = 'none';
    setTimeout(() => {
      elements.overlay.style.display = 'none';
    }, 300);
  }

  function highlightElement(element, shouldHighlight) {
    const rect = element.getBoundingClientRect();
    const padding = shouldHighlight ? 20 : 10;

    elements.spotlight.style.display = 'block';
    elements.spotlight.style.top = (rect.top - padding) + 'px';
    elements.spotlight.style.left = (rect.left - padding) + 'px';
    elements.spotlight.style.width = (rect.width + padding * 2) + 'px';
    elements.spotlight.style.height = (rect.height + padding * 2) + 'px';
  }

  function showTooltip(step, targetElement) {
    const title = document.getElementById('demo-tooltip-title');
    const description = document.getElementById('demo-tooltip-description');
    const progress = document.getElementById('demo-tooltip-progress');

    title.textContent = step.message;
    description.textContent = step.description;
    
    const scenario = getCurrentScenario();
    progress.textContent = `Étape ${demoState.currentStep + 1} sur ${scenario.length}`;

    elements.tooltip.style.display = 'block';

    // Positionner la tooltip
    positionTooltip(targetElement, step.position);
  }

  function positionTooltip(targetElement, position) {
    const rect = targetElement.getBoundingClientRect();
    const tooltipRect = elements.tooltip.getBoundingClientRect();
    const padding = 20;

    let top, left;

    switch (position) {
      case 'top':
        top = rect.top - tooltipRect.height - padding;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = rect.bottom + padding;
        left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.left - tooltipRect.width - padding;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.right + padding;
        break;
      default:
        top = rect.bottom + padding;
        left = rect.left;
    }

    // Ajuster si hors écran
    if (top < 10) top = 10;
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10;
    }

    elements.tooltip.style.top = top + 'px';
    elements.tooltip.style.left = left + 'px';
  }

  // ==================== ACTIONS ====================
  
  function executeAction(action, target) {
    switch (action) {
      case 'click':
        simulateClick(target);
        break;
      case 'interact':
        simulateInteraction(target);
        break;
      case 'selectCountries':
        selectCountriesDemo();
        break;
      default:
        console.warn(`Demo: Unknown action: ${action}`);
    }
  }

  function simulateClick(element) {
    // Détecter si c'est un lien de navigation interne
    if (element.tagName === 'A' && element.href) {
      const url = new URL(element.href, window.location.origin);
      const path = url.pathname;
      
      // Mapper les URLs vers les noms de pages
      const pageMap = {
        '/carte.html': 'carte',
        '/timeline.html': 'timeline',
        '/comparaison.html': 'comparaison',
        '/cours.html': 'cours',
        '/stats.html': 'stats',
        '/home.html': 'home'
      };
      
      // Si c'est une navigation vers une page de la démo, mettre à jour localStorage
      if (pageMap[path]) {
        localStorage.setItem('demoPage', pageMap[path]);
        localStorage.setItem('demoStep', '0');
        console.log(`Demo: Navigation vers ${pageMap[path]}`);
      }
    }
    
    // Animer le clic
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.click();
    }, 200);
  }

  function simulateInteraction(element) {
    // Simuler une interaction (changement de valeur, etc.)
    if (element.tagName === 'SELECT') {
      // Changer la sélection
      if (element.options.length > 1) {
        element.selectedIndex = 1;
        element.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else if (element.tagName === 'INPUT') {
      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = !element.checked;
        element.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  function selectCountriesDemo() {
    const select = document.getElementById('countrySelect');
    if (!select) {
      console.warn('Demo: countrySelect not found');
      return;
    }

    console.log('Demo: Sélection automatique de 3 pays...');
    
    // Sélectionner automatiquement 3 pays
    const countries = ['korea', 'taiwan', 'singapore'];
    let index = 0;

    const selectNext = () => {
      if (index >= countries.length) {
        console.log('Demo: Sélection terminée !');
        return;
      }
      
      // Trouver l'option
      const option = Array.from(select.options).find(opt => 
        opt.value.toLowerCase().includes(countries[index])
      );
      
      if (option) {
        console.log(`Demo: Sélection de ${option.text}`);
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        console.warn(`Demo: Pays ${countries[index]} non trouvé`);
      }
      
      index++;
      if (index < countries.length) {
        setTimeout(selectNext, 1000); // Augmenté à 1 seconde
      }
    };

    selectNext();
  }

  // ==================== GESTION DES MESSAGES ====================
  
  function handlePageMessage(event) {
    // Gérer la communication entre pages si nécessaire
    if (event.data && event.data.type === 'demo-continue') {
      checkDemoContinuation();
    }
  }

  // ==================== DÉMARRAGE ====================
  
  // Attendre que le DOM soit prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposer l'API publique
  window.DemoTour = {
    start: startDemo,
    stop: stopDemo,
    pause: togglePause,
    isRunning: () => demoState.isRunning
  };

})();
