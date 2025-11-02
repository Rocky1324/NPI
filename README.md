
<div align="center">

# NPI Dashboard – Nouveaux Pays Industrialisés

<p>
  <img alt="Static" src="https://img.shields.io/badge/mode-Statique-blueviolet?style=for-the-badge">
  <img alt="React" src="https://img.shields.io/badge/mode-React-06b6d4?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/license-Educatif-green?style=for-the-badge">
  <img alt="Made with" src="https://img.shields.io/badge/made%20with-HTML%20CSS%20JS%20%2B%20Leaflet%20%2B%20Chart.js-1f2937?style=for-the-badge">
</p>

<p>🌏 Projet éducatif et interactif sur les Nouveaux Pays Industrialisés (NPI)</p>

<p>
  <a href="#-demo-rapide">Demo</a> ·
  <a href="#-objectifs">Objectifs</a> ·
  <a href="#-fonctionnalités">Fonctionnalités</a> ·
  <a href="#%EF%B8%8F-technologies-utilis%C3%A9es">Technologies</a> ·
  <a href="#-d%C3%A9ploiement-local">Local</a> ·
  <a href="#%EF%B8%8F-d%C3%A9ploiement-en-ligne">Déploiement</a>
</p>

</div>

> Ce projet présente les NPI via une interface web moderne, avec des sections sur la définition, les caractéristiques, les vagues historiques, des études de cas et un mini‑quiz.

---

## ✨ Aperçu visuel

<div align="center">

<!-- Placeholders (mettez vos captures réelles) -->
<img src="public/assets/screenshots/home.png" alt="Aperçu Accueil" width="31%" />
<img src="public/assets/screenshots/cours.png" alt="Aperçu Cours" width="31%" />
<img src="public/assets/screenshots/carte.png" alt="Aperçu Carte" width="31%" />

<br/>
<img src="public/assets/screenshots/timeline.png" alt="Aperçu Chronologie" width="31%" />
<img src="public/assets/screenshots/comparaison.png" alt="Aperçu Comparaison" width="31%" />
<img src="public/assets/screenshots/quiz.gif" alt="Animation Quiz" width="31%" />

</div>

---

## 📝 Objectifs

- Fournir un cours interactif sur les NPI pour un public scolaire ou étudiant.
- Visualiser les vagues d’industrialisation et comparer les pays.
- Explorer rapidement via chronologie, carte et comparaisons.
- Tester les connaissances avec un mini‑quiz intégré.

---

## 🚀 Fonctionnalités

- Présentation des NPI avec cartes, graphiques et encadrés.
- Études de cas: Corée du Sud, Chine, Vietnam, Mexique.
- Mini‑quiz interactif (validation, score, réinitialisation).
- Design sombre unifié avec animations et effets de survol.
- Compatible desktop et mobile.

---

## 🛠️ Technologies utilisées

- HTML / CSS / JS (pages statiques dans `public/`).
- TypeScript / React (composants dans `src/`, mode React optionnel).
- Leaflet (carte), Chart.js (graphique de comparaison), scripts custom (chronologie).
- Node / npm pour le développement local.

---

## 📂 Structure du projet (simplifiée)

```
npi-dashboard/
├─ public/
│  ├─ home.html
│  ├─ cours.html
│  ├─ timeline.html
│  ├─ carte.html
│  ├─ comparaison.html
│  ├─ static.html
│  ├─ style-presentation.css      # Thème global (dark, glass, boutons, grids)
│  ├─ ux.js                       # Effets de révélation au scroll
│  ├─ home.js / cours.js / ...    # Scripts page‑spécifiques
│  └─ data/ (si présent)
├─ src/                           # Mode React (optionnel)
│  └─ components/
├─ scripts/                       # Outils (export, etc.)
├─ package.json
└─ README.md
```

---

## 💻 Déploiement local

1) Cloner le projet

```bash
git clone https://github.com/Rocky1324/NPI.git
cd NPI/npi-dashboard
```

2) Installer les dépendances (si vous utilisez le mode React / scripts Node)

```bash
npm install
```

3) Lancer en mode développement (React)

```bash
npm start
```

4) Ouvrir dans le navigateur

- Mode statique: ouvrir les fichiers `.html` du dossier `public/` (via un serveur statique recommandé)
- Mode React: http://localhost:3000

Astuce: pour servir le dossier `public/` rapidement, vous pouvez utiliser un serveur statique (ex: `npx serve public`).

---

## ☁️ Déploiement en ligne

Le projet peut être déployé comme site statique sur:

- GitHub Pages
- Vercel
- Netlify

Attention: si déployé sous un sous‑chemin (GitHub Pages projet), privilégiez des liens relatifs (`./...`) au lieu de chemins absolus (`/...`).

---

## 📚 Références

- Banque mondiale
- OCDE
- ONUDI
- CNUCED

---

## 📝 Licence

Projet open‑source, libre de diffusion pour usage éducatif.

---

## ⚡ Notes

- Les NPI sont présentés en 4 vagues d’industrialisation.
- Études de cas interactives et comparaisons rapides.
- Prévu pour présentation/cours avec design moderne et réactif.

---

Souhaitez‑vous une version du README enrichie avec captures d’écran, GIF et badges ? Je peux l’ajouter.
