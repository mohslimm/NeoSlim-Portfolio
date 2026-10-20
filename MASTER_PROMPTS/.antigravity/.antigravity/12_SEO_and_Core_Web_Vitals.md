# SEO & CORE WEB VITALS AUDIT - PRODUCTION STANDARD

## Objectifs : LCP < 2.5s | INP < 200ms | CLS < 0.1 | Performance 95+ | SEO 100

## CRITÔRES DE L'AUDIT TECHNIQUE
1. **SEO On-Page** : Validations des balises de structures (un seul H1), meta-tags (Title 50-60 car., Description 150-160 car., OpenGraph complet, balise canonical), g‚n‚ration dynamique du sitemap.xml et balisage de donn‚es structur‚es Schema.org (JSON-LD).
2. **Optimisation LCP (Largest Contentful Paint)** : Identification de l'‚l‚ment critique, injection de liens de preload dans le head avec `fetchpriority="high"`, service via CDN performant.
3. **Optimisation CLS (Cumulative Layout Shift)** : Attributs width/height explicites sur les m‚dias, gestion des polices via `font-display: optional` ou `swap` pour r‚server l'espace requis.
4. **Optimisation INP (Interaction to Next Paint)** : D‚ferrement des scripts non critiques, d‚coupage des tƒches JavaScript bloquantes (>50ms).

## LIVRABLE
Rapport des scores avant/aprŠs, bloc de code des optimisations appliqu‚es et checklist finale valid‚e.
