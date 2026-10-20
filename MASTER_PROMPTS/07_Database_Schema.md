# DATABASE SCHEMA DESIGN - MONGODB ATLAS + MONGOOSE

## CONTEXTE
ODM : Mongoose 8+ | Pattern : Database-per-feature (Privil‚gier les documents, ‚viter les jointures)

## DIRECTIVE DESIGN (Embed vs Reference)
- **EMBED** : Si les donn‚es sont lues ensemble, sous-document < 16MB, cardinalit‚ 1:1 ou 1:few.
- **REFERENCE** : Si lecture ind‚pendante, cardinalit‚ 1:many / many-to-many, ou mises … jour hautement concurrentes.

## MISSION
Mod‚lise le sch‚ma complet pour : [DCRIRE L'ENTIT ICI]

## LIVRABLES ATTENDUS
1. Sch‚ma Mongoose complet avec types, hooks de pr‚-sauvegarde, indexes explicit‚s, et `timestamps: true`.
2. Sch‚ma Zod associ‚ pour validation en couche API.
3. Sch‚ma de r‚ponse ‚pur‚ (masquage de la tuyauterie interne).
4. Jeu de donn‚es fictives r‚alistes (Seed data) et exemples d'agr‚gations courantes.
