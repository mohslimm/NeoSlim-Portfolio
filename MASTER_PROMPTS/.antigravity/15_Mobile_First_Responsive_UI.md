# MOBILE-FIRST RESPONSIVE ENGINE - NATIVE APPS EXPERIENCE

## 1. RÔGLES DE CONCEPTION PAR RUPTURE (Tailwind v4)
- **Mobile (xs/sm < 640px)** : Navigation via Bottom Nav Bar fixe (64px) int‚grant le padding `safe-area-inset-bottom`. Targets de clic de minimum 44x44px (Norme Apple HIG). Largeur d'‚l‚ments … 100%%, typographie de corps de texte … 16px minimum pour contrer le zoom forc‚ d'iOS sur les champs d'entr‚e. En-tˆtes collants avec effet de flou (`backdrop-filter: blur(20px)`).
- **Tablette (lg/xl 768px-1279px)** : Transition vers une barre de navigation lat‚rale (Sidebar). Affichage en grilles multi-colonnes, panneaux lat‚raux d'action … la place des modals plein ‚cran. Activation des micro-interactions au survol (Hover states) tout en pr‚servant l'ergonomie tactile.
- **Desktop (2xl 1280px+)** : Navigation persistante d‚velopp‚e, tableaux de bord complexes multi-colonnes, int‚gration de tooltips fins et de menus contextuels complets au clic droit.

## 2. STANDARDS CINMATIQUES (Framer Motion)
- **Transitions de routes** : Configuration globale via `AnimatePresence mode="wait"`. Effet de glissement vers le haut (slide-up) sur mobile, fondu enchaŒn‚ combin‚ … une mise … l'‚chelle subtile (scale/fade) sur grand ‚cran.
- **Listes & Entr‚es** : Chargement s‚quentiel ordonn‚ avec un facteur de d‚calage (`staggerChildren: 0.07`). tats de chargement simul‚s par des ‚crans squelettes (Skeletons) dot‚s d'un effet de miroitement (shimmer CSS pur).
- **Feedback Tactile** : Utilisation syst‚matique de la directive `whileTap={{ scale: 0.95, opacity: 0.85 }}` sur les ‚l‚ments tactiles mobiles. Isolation stricte des hovers pour ‚viter l'effet d'accroche visuelle persistante lors du toucher sur mobile.

## MISSION
G‚nŠre le code complet et responsive du module d'application suivant : [DCRIRE LA FEATURE/PAGE]
