
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
<img width="31%" alt="acceuil" src="https://github.com/user-attachments/assets/9750320e-3ede-461a-8991-db50d3505f93" />
<img width="31%" alt="image" src="https://github.com/user-attachments/assets/83fcd60a-3855-4ded-bb8b-95b29ddffcdb" />
<img  width="31%" alt="carte" src="https://github.com/user-attachments/assets/79c57cc3-2043-48a6-8f41-d5abc22261a9" />

<br/>
<img width="31%" alt="image" src="https://github.com/user-attachments/assets/eb806fc1-072e-4a53-935d-05b96b33ca16" />
<img width="31%" alt="image" src="https://github.com/user-attachments/assets/f8242dde-fe6f-4a12-8e63-d798bcb95816" />

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
git clone https://github.com/Rocky1324/NPI
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

## 🧭 Mini‑guide interactif (sans API)

- Widget pédagogique léger, accessible via une bulle « ❓ » en bas à droite sur toutes les pages statiques.
- Contenu 100% local (pas d’API) avec un petit parcours: définition, caractéristiques, vagues, études de cas, quiz express.

Fichiers
- Script: `public/guide.js`
- Styles: inclus dans `public/style-presentation.css` (et fallback inline dans `guide.js`)

Personnaliser
- Éditez le tableau `steps` dans `public/guide.js` (titres, messages, boutons, enchaînements).
- Ajustez la position/couleurs via les classes `.guide-fab` et `.guide-panel` dans `style-presentation.css`.

Désactiver sur une page
- Retirez simplement la balise `<script src="/guide.js"></script>` de la page concernée.

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
