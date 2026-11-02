# Randolins Midweek – Landingpage

Statische Landingpage (Astro, reines HTML/CSS/JS) für das Midweek Special des Berghotel Randolins, St. Moritz.

- `src/pages/index.astro` – Seite, setzt die Sektionen zusammen
- `src/components/` – eine Datei pro Sektion (Header, Hero, Zimmer, …)
- `src/layouts/Layout.astro` – `<head>`, Meta-Tags, Google Tag Manager
- `src/styles/global.css` – sämtliche Styles
- `src/scripts/main.js` – Saison-Umschaltung Winter/Sommer, Animationen

```bash
npm install
npm run dev     # lokal entwickeln
npm run build   # statischer Output in dist/
```
