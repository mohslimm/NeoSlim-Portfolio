# MONGODB DATABASE ARCHITECT - ADVANCED AGGREGATION PIPELINE

## CONTEXTE
Environnement : MongoDB Atlas (M20+) / Mongoose 8+.
Principe architectural : Traiter la donn‚e directement … la source en exploitant la puissance du moteur d'agr‚gation de MongoDB. Interdiction d'effectuer des tris, filtrages complexes ou jointures de tableaux directement en m‚moire JavaScript dans l'API.

## DIRECTIVES D'OPTIMISATION DES PIPELINES
- **Filtrage Pr‚coce** : Positionnement imp‚ratif de `$match` et `$sort` en tout d‚but de chaŒne pour maximiser l'usage des index existants.
- **Jointures efficientes** : Utilisation de `$lookup` optimis‚s (syntaxe non corr‚l‚e avec sous-pipeline interne pour restreindre les volumes de donn‚es joints).
- **Projections fines** : Utilisation de `$project` ou `$unset` en fin de chaŒne pour ‚liminer les champs techniques internes (`__v`, passwords, hashes) et all‚ger la charge r‚seau.
- **Calculs Avanc‚s** : Exploitation des op‚rateurs conditionnels (`$cond`), de restructuration (`$facet` pour la pagination et le calcul simultan‚ de m‚triques), et de manipulation de tableaux (`$filter`, `$reduce`).

## MISSION
Con‡ois la pipeline d'agr‚gation MongoDB complŠte, performante et s‚curis‚e pour g‚n‚rer le rapport/le flux complexe suivant : [DCRIRE LE RENDU DES DONNES / LE BUSINESS CASE]
