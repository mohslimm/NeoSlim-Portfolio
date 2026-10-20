# PERFORMANCE AUDIT - ANTIGRAVITY STANDARD

## COUCHE 1 - BUNDLE ANALYSIS
- [ ] Bundle size analysÇ (vite-bundle-visualizer)
- [ ] Tree-shaking vÇrifiÇ : pas d'imports de librairies entiäres
- [ ] Code splitting : chaque route en lazy import
- [ ] DÇpendances dupliquÇes dÇtectÇes et supprimÇes

## COUCHE 2 - IMAGES & ASSETS
- [ ] Format WebP/AVIF sur toutes les images
- [ ] Lazy loading (loading="lazy") sur images below the fold
- [ ] width et height dÇfinis sur toutes les images (Çvite CLS)
- [ ] Sprites SVG pour les icìnes rÇpÇtitives
- [ ] Fonts : preload + font-display: swap + subset uniquement

## COUCHE 3 - RENDERING
- [ ] Pas de layout shifts (CLS < 0.1)
- [ ] LCP identifiÇ et optimisÇ (preload si image)
- [ ] First Input Delay < 100ms
- [ ] Suspense boundaries correctement placÇs
- [ ] MÇmoãsation : useMemo/useCallback utilisÇs lÖ oó c'est mesurable

## COUCHE 4 - RêSEAU
- [ ] HTTP/2 activÇ sur le serveur
- [ ] Compression gzip/brotli activÇe
- [ ] Cache-Control headers corrects (immutable sur assets hashÇs)
- [ ] DNS prefetch sur les domaines tiers
- [ ] API calls : debounce sur search, cancel sur unmount (AbortController)

## COUCHE 5 - JAVASCRIPT
- [ ] Pas d'ÇvÇnements sans cleanup (addEventListener sans removeEventListener)
- [ ] Timers clearÇs dans useEffect return
- [ ] Observers dÇconnectÇs (IntersectionObserver, ResizeObserver)
- [ ] Pas de re-renders inutiles (React DevTools Profiler vÇrifiÇ)

## COUCHE 6 - CSS
- [ ] CSS critique inlinÇ dans le <head>
- [ ] Purge CSS activÇe en production (Tailwind)
- [ ] Pas de @import CSS (ralentit le parsing)
- [ ] Transitions uniquement sur transform/opacity

## COUCHE 7 - SERVEUR (Express/Node)
- [ ] Compression middleware activÇ
- [ ] Rate limiting en place
- [ ] Indexes MongoDB sur tous les champs de requàte frÇquente
- [ ] Connection pooling configurÇ
- [ ] Health check endpoint /api/health

## FORMAT DE RAPPORT
Pour chaque probläme trouvÇ :
   [SêVêRITê: CRITIQUE/MAJEUR/MINEUR] Description du probläme
   Impact mesurÇ (ms, KB, score)
   Fix exact avec code
   Gain estimÇ apräs fix
