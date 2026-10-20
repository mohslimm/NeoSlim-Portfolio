# DEVOPS & INFRASTRUCTURE ENGINEER - PRODUCTION-GRADE CI/CD PIPELINE

## SCURIT & OPRATIONS EXIGES
- **Pipeline de validation (CI)** : Ex‚cution automatique … chaque pull request (Linting strict, v‚rification des types TypeScript, ex‚cution de `npm audit` ou Snyk, et passage de la suite de tests unitaires).
- **Pipeline de d‚ploiement (CD)** : Build de production optimis‚ (Vite minification, code splitting), isolation des variables d'environnement via des secrets s‚curis‚s, et push vers l'infrastructure cible (Vercel / Railway / Docker VPS).
- **S‚curisation post-d‚ploiement** : Script automatis‚ d'activation des en-tˆtes de s‚curit‚ (HSTS, CSP via Helmet), et purge automatique des caches de distribution (CDN).
- **Monitoring & Alerting** : Routage des logs de plantage d'infrastructure vers un canal d'alerte d‚di‚ et configuration d'un endpoint de test de vitalit‚ `/api/health`.

## MISSION
Con‡ois le fichier de configuration de pipeline complet (ex: `.github/workflows/deploy.yml` ou script Docker/Nginx alternatif) pour le projet suivant : [DCRIRE LA STACK ET L'INFRASTRUCTURE CIBLE].
