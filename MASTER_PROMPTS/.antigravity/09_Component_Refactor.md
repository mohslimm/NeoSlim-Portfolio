# SENIOR REFACTOR - REACT 19 COMPONENT

## OBJECTIF
Prendre un composant complexe et le refactorer pour le rendre modulaire, hautement performant, testable et lisible en moins de 5 minutes par un tiers.

## ARCHITECTURE CIBLE DU COMPOSANT
NomDuComposant/
ÃÄÄ index.tsx          (Point d'entr‚e, composition propre)
ÃÄÄ NomDuComposant.tsx  (Rendu d'interface pur)
ÃÄÄ useNomDuComposant.ts (Gestion fine des ‚tats, custom hook m‚tier)
ÃÄÄ NomDuComposant.types.ts (Interfaces et types stricts)
ÀÄÄ NomDuComposant.test.tsx (Fichier de tests unitaires)

## RÔGLES DE REFACTORING
- **D‚composition** : Si le fichier d‚passe 150 lignes, isolation des sous-composants.
- **Gestion d'‚tat** : Externalisation du state serveur via React Query/SWR, usage de Zustand uniquement si l'‚tat est global, calcul des ‚tats d‚riv‚s en render.
- **Logique m‚tier** : Extraction complŠte de la couche UI vers un hook ou un fichier de service d‚di‚.

## LIVRABLE
Fournis le code refactor‚ selon la structure modulaire et une comparaison des m‚triques avant/aprŠs.
