# MULTILINGUAL CORE ARCHITECTURE (EN ú FR ú AR)
# Standard : Z‚ro d‚pendance externe (No i18next, No react-intl)
# R“les : Senior Architect & Specialist RTL Layout Systems

## 1. STRATGIE I18N
- **Architecture Context** : Cr‚ation d'un `LanguageProvider` autonome g‚rant l'‚tat de la langue active, la persistance dans le `localStorage` et la d‚tection initiale via le navigateur (`navigator.language`).
- **Synchronisation DOM** : Bascule instantan‚e mettant … jour les attributs `document.documentElement.lang` et `document.documentElement.dir`.

## 2. GESTION DU SYSTÔME RTL (Arabe - 'ar')
- **Retournement de Layout (Tailwind v4)** : Interdiction d'utiliser les classes directionnelles absolues. Usage exclusif des utilitaires logiques : `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `rounded-s`, `rounded-e`, `start-0`, `end-0`.
- **Exceptions** : Forcer `dir="ltr"` sur les ‚l‚ments immuables (code blocks, num‚ros de t‚l‚phone, graphiques).
- **Typographie Arabe** : Injection s‚lective de polices adapt‚es via Google Fonts (`Tajawal` ou `Cairo`). R‚duction syst‚matique de la taille de police de ~10%%, suppression du `letter-spacing` et augmentation du `line-height` … 1.8 pour compenser le rendu de l'alphabet arabe.
- **Composants fluides** : Inversion des menus lat‚raux, des flŠches de retour, et application de la classe `scale-x-[-1]` sur les ic“nes directionnelles en mode RTL.

## 3. COMPOSANTS ET LIVRABLES REQUIS
1. `translations.js` : Dictionnaire complet 3 langues (sans placeholders ou cl‚s manquantes).
2. `LanguageContext.jsx` : Hook `useLang` et logique m‚tier d'initialisation.
3. `LanguageSwitcher.jsx` : Segmented control ou pill group poli (sans balise HTML select), affichant les indicateurs EN ú FR ú ? avec animation de transition via Framer Motion.
