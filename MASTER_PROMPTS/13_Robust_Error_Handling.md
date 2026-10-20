# ERROR HANDLING COMPLET - FRONTEND + BACKEND

## PHILOSOPHIE
Une application de premier ordre ne crashe jamais silencieusement. Toute exception doit ˆtre captur‚e, trac‚e proprement sans fuite de donn‚es, et r‚solue ou communiqu‚e ‚l‚gamment … l'utilisateur.

## MISSION
Impl‚mente la gestion globale et locale des erreurs pour : [DCRIRE LA FEATURE]

## COMPORTEMENT PAR COUCHE
- **Frontend (React 19)** : D‚ploiement d'Error Boundaries par route, hooks de gestion des erreurs asynchrones, toasts d'‚tats et mise en place d'une logique de r‚essai automatique (Exponential Backoff, max 3 tentatives).
- **API (Axios / Fetch Interceptors)** : Gestion automatique du cycle de rafraŒchissement des tokens (401), timeouts stricts (8s max) et contr“leurs d'annulation (`AbortController`) lors du d‚montage des composants.
- **Backend (Express v5)** : Int‚gration d'un middleware d'erreur centralis‚ en fin de chaŒne, transformation des erreurs de base de donn‚es en messages intelligibles, et journalisation structur‚e via Pino/Winston (Niveau ERROR pour les alertes critiques, interdiction stricte d'exposer les stack traces et PII).
