# 🎬 Tour Guidé Automatisé - Documentation

## Vue d'ensemble

Le système de tour guidé automatisé (`demo.js`) permet de démontrer automatiquement toutes les fonctionnalités de l'application NPI Dashboard. Lorsqu'un utilisateur clique sur "Start Demo", le système navigue automatiquement à travers les différentes pages et fonctionnalités avec des explications visuelles.

---

## 🚀 Comment l'utiliser

### Démarrer la démo

1. **Ouvrez la page d'accueil** (`/home.html`)
2. **Cliquez sur le bouton flottant** "🎬 Start Demo" en bas à droite
3. **Laissez la démo se dérouler** - elle naviguera automatiquement à travers toutes les pages

### Contrôles disponibles

Pendant la démo, vous avez accès à deux boutons de contrôle :

- **⏸️ Pause** : Met la démo en pause (devient ▶️ Resume)
- **⏹️ Stop** : Arrête complètement la démo

---

## 📋 Parcours de la démo

### 1. Page d'accueil (`home.html`)
- **Étape 1** : Présentation du titre et de l'application
- **Étape 2** : Explication des statistiques en temps réel
- **Étape 3** : Navigation vers la carte interactive

### 2. Carte Interactive (`carte.html`)
- **Étape 1** : Introduction à la carte mondiale des NPI
- **Étape 2** : Explication des marqueurs et indicateurs
- **Étape 3** : Démonstration des filtres et indicateurs
- **Étape 4** : Navigation vers la chronologie

### 3. Frise Chronologique (`timeline.html`)
- **Étape 1** : Présentation des 4 vagues d'industrialisation
- **Étape 2** : Explication du système de chronologie
- **Étape 3** : Démonstration du filtrage par vague
- **Étape 4** : Navigation vers l'outil de comparaison

### 4. Outil de Comparaison (`comparaison.html`)
- **Étape 1** : Introduction à l'outil de comparaison
- **Étape 2** : Sélection automatique de 3 pays (Corée, Taiwan, Singapore)
- **Étape 3** : Explication des graphiques comparatifs
- **Étape 4** : Démonstration de l'export des données
- **Étape 5** : Navigation vers le cours interactif

### 5. Cours Interactif (`cours.html`)
- **Étape 1** : Présentation du cours sur les NPI
- **Étape 2** : Explication du contenu pédagogique
- **Étape 3** : Navigation automatique entre les slides
- **Étape 4** : Découverte du quiz interactif
- **Étape 5** : Navigation vers les statistiques

### 6. Tableau de Bord Statistiques (`stats.html`)
- **Étape 1** : Présentation des statistiques d'utilisation
- **Étape 2** : Explication des indicateurs clés
- **Étape 3** : Visualisation des graphiques détaillés
- **Étape 4** : Retour à la page d'accueil

---

## 🎨 Éléments visuels

### Overlay sombre
Un fond semi-transparent (rgba(0, 0, 0, 0.7)) recouvre toute la page pour focaliser l'attention sur l'élément en cours de démonstration.

### Spotlight
Une bordure cyan brillante (`#06b6d4`) met en évidence l'élément ciblé avec :
- Bordure de 3px
- Ombre portée étendue
- Animation fluide (transition cubique)
- Padding de 10-20px selon le type d'élément

### Tooltip
Une infobulle élégante affiche :
- **Titre** : Message principal (18px, gras)
- **Description** : Explication détaillée (14px)
- **Progression** : "Étape X sur Y" (12px, semi-transparent)
- Design : Gradient cyan-violet, coins arrondis (16px)
- Animation : Fade-in avec translation verticale

### Boutons de contrôle
Positionnés en bas à droite avec :
- Design moderne (coins arrondis, ombres)
- Couleurs distinctives (orange pour pause, rouge pour stop)
- Effets de hover (élévation)
- Animations fluides

---

## ⚙️ Configuration technique

### Délais par défaut
```javascript
DEMO_CONFIG = {
  stepDelay: 3000,          // Délai entre les étapes (ms)
  animationDelay: 800,      // Délai pour les animations (ms)
  navigationDelay: 2000,    // Délai après navigation (ms)
  typingSpeed: 50           // Vitesse de typing (ms/caractère)
}
```

### Positions des tooltips
Les tooltips peuvent être positionnées :
- `'top'` : Au-dessus de l'élément
- `'bottom'` : En dessous de l'élément
- `'left'` : À gauche de l'élément
- `'right'` : À droite de l'élément

Le système ajuste automatiquement la position si la tooltip sortirait de l'écran.

---

## 🔧 Actions automatisées

### Types d'actions disponibles

#### 1. Click (`action: 'click'`)
Simule un clic sur l'élément avec animation de scaling :
```javascript
element.style.transform = 'scale(0.95)';
setTimeout(() => {
  element.style.transform = 'scale(1)';
  element.click();
}, 200);
```

#### 2. Interact (`action: 'interact'`)
Interagit avec les éléments de formulaire :
- **Select** : Change la sélection (passe à l'option 2)
- **Checkbox/Radio** : Toggle l'état checked
- Déclenche l'événement `change` approprié

#### 3. Select Countries (`action: 'selectCountries'`)
Action spéciale pour la page de comparaison :
- Sélectionne automatiquement 3 pays : Corée, Taiwan, Singapore
- Ajoute un délai de 800ms entre chaque sélection
- Déclenche les événements de changement

---

## 💾 Persistance

### LocalStorage
Le système utilise le localStorage pour maintenir l'état de la démo lors de la navigation entre pages :

```javascript
localStorage.setItem('demoRunning', 'true');      // Démo en cours
localStorage.setItem('demoPage', currentPage);    // Page actuelle
localStorage.setItem('demoStep', stepNumber);     // Étape actuelle
```

### Continuation automatique
Lorsque vous naviguez vers une nouvelle page, le script :
1. Vérifie si une démo est en cours (`localStorage.getItem('demoRunning')`)
2. Récupère la page et l'étape sauvegardées
3. Reprend automatiquement la démo après un délai de 2 secondes

---

## 🎯 Structure d'une étape

Chaque étape du scénario suit cette structure :

```javascript
{
  target: '.element-selector',              // Sélecteur CSS de l'élément à mettre en évidence
  message: 'Titre principal',               // Titre affiché dans la tooltip
  description: 'Explication détaillée...',  // Description complète
  position: 'bottom',                       // Position de la tooltip (top/bottom/left/right)
  duration: 3000,                           // Durée d'affichage en millisecondes
  action: 'click',                          // Action à exécuter (optionnel)
  highlight: true                           // Spotlight agrandi (optionnel)
}
```

---

## 📦 Dépendances

Le système de démo est **entièrement autonome** et ne nécessite aucune bibliothèque externe :
- ✅ Vanilla JavaScript pur
- ✅ Pas de dépendances tierces
- ✅ Compatible avec tous les navigateurs modernes
- ✅ Poids léger (~15 KB non minifié)

---

## 🔍 API publique

Le script expose une API globale `window.DemoTour` :

```javascript
// Démarrer la démo programmatiquement
window.DemoTour.start();

// Arrêter la démo
window.DemoTour.stop();

// Mettre en pause / reprendre
window.DemoTour.pause();

// Vérifier si la démo est en cours
if (window.DemoTour.isRunning()) {
  console.log('Démo en cours...');
}
```

---

## 🎨 Personnalisation

### Modifier les couleurs
Dans `createDemoElements()`, vous pouvez personnaliser :
- **Overlay** : `background: rgba(0, 0, 0, 0.7)`
- **Spotlight** : `border: 3px solid #06b6d4`
- **Tooltip** : `background: linear-gradient(135deg, #06b6d4, #7c3aed)`

### Ajouter de nouvelles étapes
Dans `DEMO_SCENARIOS`, ajoutez un nouveau scénario pour une page :

```javascript
nouveauPage: [
  {
    target: '.mon-element',
    message: 'Mon message',
    description: 'Ma description',
    position: 'bottom',
    duration: 3000
  },
  // ... autres étapes
]
```

### Modifier les délais
Dans `DEMO_CONFIG`, ajustez les timings selon vos besoins :
- Augmenter `stepDelay` pour ralentir la démo
- Réduire `navigationDelay` pour accélérer les transitions

---

## 🐛 Dépannage

### La démo ne démarre pas
- Vérifiez que vous êtes sur `/home.html`
- Ouvrez la console pour voir les erreurs
- Vérifiez que tous les scripts sont chargés

### La démo s'arrête sur une page
- Vérifiez que l'élément ciblé existe (`target` CSS selector)
- Consultez les warnings dans la console
- Vérifiez le localStorage pour l'état de la démo

### Les tooltips sont mal positionnées
- Le système ajuste automatiquement si hors écran
- Testez sur différentes tailles d'écran
- Modifiez le `position` dans le scénario si nécessaire

### La navigation automatique ne fonctionne pas
- Vérifiez que les liens href sont corrects
- Confirmez que `action: 'click'` est bien défini
- Vérifiez les délais de navigation

---

## 📱 Responsive

Le système s'adapte automatiquement aux différentes tailles d'écran :
- Les tooltips évitent les bords de l'écran
- Le spotlight s'ajuste à la taille des éléments
- Les boutons de contrôle restent accessibles

---

## ♿ Accessibilité

Améliorations prévues :
- Support du clavier (Esc pour arrêter, Espace pour pause)
- Annonces pour les lecteurs d'écran
- Mode ralenti pour les utilisateurs ayant besoin de plus de temps
- Possibilité de désactiver les animations

---

## 🚀 Performance

Optimisations implémentées :
- **Transition CSS** : Animations GPU-accelerated
- **Timeouts** : Nettoyage automatique à l'arrêt
- **DOM minimal** : Seulement 4 éléments créés
- **Event listeners** : Attachés uniquement quand nécessaire

---

## 📝 Exemple d'utilisation avancée

### Créer une démo personnalisée

```javascript
// Ajouter un nouveau scénario
DEMO_SCENARIOS.maDemoPersonnalisee = [
  {
    target: '#mon-titre',
    message: 'Bienvenue !',
    description: 'Ceci est ma démo personnalisée',
    position: 'bottom',
    duration: 2000
  },
  {
    target: '#mon-bouton',
    message: 'Cliquez ici',
    description: 'Ce bouton fait quelque chose d\'incroyable',
    position: 'left',
    duration: 3000,
    action: 'click'
  }
];

// Démarrer la démo sur une page spécifique
demoState.currentPage = 'maDemoPersonnalisee';
window.DemoTour.start();
```

---

## 📄 Licence

Ce système de tour guidé fait partie de l'application NPI Dashboard et suit la même licence que le projet principal.

---

## 👥 Contribution

Pour améliorer le système de démo :
1. Ajoutez de nouveaux scénarios dans `DEMO_SCENARIOS`
2. Créez de nouvelles actions dans `executeAction()`
3. Améliorez les animations dans les styles CSS
4. Testez sur différents navigateurs et appareils

---

## 🔮 Améliorations futures

Fonctionnalités prévues :
- [ ] Mode pas-à-pas (avancer manuellement)
- [ ] Vitesse ajustable (lent/normal/rapide)
- [ ] Export de la démo en vidéo
- [ ] Traductions multilingues
- [ ] Analytics de la démo (taux de complétion)
- [ ] Démo ciblée par fonctionnalité
- [ ] Mode découverte (hints sans automation)

---

## 📞 Support

Pour toute question ou problème :
- Consultez la console du navigateur pour les logs
- Vérifiez les warnings sur les éléments non trouvés
- Testez les sélecteurs CSS dans DevTools

---

**Bonne démonstration ! 🎉**
