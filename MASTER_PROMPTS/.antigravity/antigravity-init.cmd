@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo ----------------------------------------------------
echo  ANTIGRAVITY FORTRESS — INITIALISATION AUTOMATIQUE
echo ----------------------------------------------------

:: 1. Définition des chemins sources et cibles
SET "SOURCE_DIR=C:\Users\moham\OneDrive\Bureau\MASTER PROMPTS"
SET "TARGET_DIR=%CD%\.antigravity"

:: 2. Vérification de la source
IF NOT EXIST "%SOURCE_DIR%" (
    echo [ERREUR] Le dossier source MASTER PROMPTS est introuvable.
    exit /b 1
)

:: 3. Copie flash des prompts dans le projet cible
echo ^> Infiltration des Master Prompts dans .antigravity/...
robocopy "%SOURCE_DIR%" "%TARGET_DIR%" /E /XD .git /R:1 /W:1 /NFL /NDL /NJH /NJS

:: 4. Génération instantanée de la Checklist de suivi à la racine
echo ^> Déploiement de la grille de suivi SIGN_OFF.md...
(
echo # 🏁 GRILLE DE PROGRES ^& ATTRIBUTION DE SIGN-OFF PROJET
echo Projet : %~nxCD% ^| Date d'initialisation : %date%
echo.
echo ---
echo.
echo ## 🛠️ PHASE 1 — ARCHITECTURE ^& DATABASE SCHEMA
echo - [ ] Choix architectural posé et validé ^(Monolithe modulaire / BFF^).
echo - [ ] Structure de dossiers initialisée ^(`src/components`, `src/features`^).
echo - [ ] Schéma de base de données modélisé dans Mongoose ^(Indexes, `timestamps: true`^).
echo - [ ] Variables d'environnement répertoriées dans `.env.example`.
echo - [ ] Validateur de variables d'environnement actif au démarrage ^(Crash-fast^).
echo.
echo ## 🎨 PHASE 2 — DESIGN SYSTEM ^& VISUAL FABRIC ^(QUIET LUXURY^)
echo - [ ] Intégration des polices Display ^(Cormorant^) et Body ^(Outfit/Inter^).
echo - [ ] Configuration des variables de design tokens Tailwind v4.
echo - [ ] Implémentation des composants atomiques fondations ^(Buttons, Inputs, Badges^).
echo - [ ] Validation visuelle : Zéro pixel de blanc pur ^(#FFF^) sur fond sombre.
echo - [ ] Configuration globale de la directive CSS `@media ^(prefers-reduced-motion: reduce^)`.
echo.
echo ## 🌐 PHASE 3 — INTERNATIONALIZATION ^(I18N^) ^& RTL ENGINE
echo - [ ] Création du LanguageContext autonome et du hook `useLang`.
echo - [ ] Dictionnaire de traduction complet à 100%% ^(EN · FR · ع^).
echo - [ ] Liaison dynamique des attributs `lang` et `dir` sur `^<html^>`.
echo - [ ] Refactoring complet du balisage avec les classes logiques Tailwind ^(`ms-*`, `pe-*`^).
echo - [ ] Validation visuelle du retournement de layout complet en mode Arabe.
echo.
echo ## 📱 PHASE 4 — RESPONSIVE REFINEMENT ^& ACCESSIBILITY ^(A11Y^)
echo - [ ] Test de mise en page mobile à 375px ^(Zéro overflow horizontal toléré^).
echo - [ ] Validation de la taille des cibles tactiles mobiles ^(minimum 44x44px^).
echo - [ ] Configuration de l'affichage adaptatif ^(Bottom nav sur mobile / Sidebar sur Desktop^).
echo - [ ] Vérification de la structure sémantique et hiérarchie des titres ^(H1-H6^).
echo - [ ] Validation des ratios de contraste via Axe / WebAIM.
echo.
echo ## 🔒 PHASE 5 — ANTIGRAVITY FORTRESS SECURITY AUDIT
echo - [ ] Validation de schémas Zod sur toutes les entrées de l'API.
echo - [ ] Requêtes paramétrées ^(Aucune concaténation de chaînes en base de données^).
echo - [ ] Configuration de Helmet.js et définition d'une politique CSP stricte.
echo - [ ] Cookies d'authentification paramétrés ^(HttpOnly, Secure, SameSite=Strict^).
echo - [ ] Algorithmes JWT verrouillés ^(Rejet strict de l'option 'none'^).
echo - [ ] Validation du téléversement ^(Magic Bytes via file-type, UUID, hors webroot^).
echo.
echo ## 🚀 PHASE 6 — PERFORMANCE OPTIMIZATION ^& SEO
echo - [ ] Implémentation du découpage de code ^(Code Splitting via React.lazy^(^)^).
echo - [ ] Balises d'optimisation d'affichage sur les images ^(loading="lazy", dimensions^).
echo - [ ] Optimisation de l'élément visuel critique ^(LCP^) par preload.
echo - [ ] Audit de bundle exécuté pour éliminer les dépendances mortes.
echo - [ ] Injection dynamique des meta-tags SEO ^(Titres, Descriptions, OpenGraph^).
echo.
echo ## 📊 PHASE 7 — MONITORING, QUALITY ASSURANCE ^& SIGN-OFF
echo - [ ] Journalisation structurée active ^(Logs sécurité sans fuite PII^).
echo - [ ] Exécution de `npm audit` ^(0 vulnérabilité critique^).
echo - [ ] Passage au vert de la suite de tests automatisés ^(Unitaires et Intégration^).
echo - [ ] Validation finale Lighthouse ^(Score ^> 95 sur Perf, A11y, SEO^).
echo - [ ] Signature et autorisation finale pour le déploiement.
) > "%CD%\SIGN_OFF.md"

echo.
echo ----------------------------------------------------
echo [SUCCÈS] Forteresse configurée pour ce projet.
echo - Dossier des prompts : .antigravity/
echo - Suivi d'avancement  : SIGN_OFF.md
echo ----------------------------------------------------