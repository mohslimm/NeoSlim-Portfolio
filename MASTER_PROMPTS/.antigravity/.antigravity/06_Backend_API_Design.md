# SENIOR API DESIGN - EXPRESS V5 + MONGODB ATLAS

## CONVENTIONS REST
  GET    /api/resources           liste paginÇe (limit/skip ou cursor)
  GET    /api/resources/:id       dÇtail d'une ressource
  POST   /api/resources           crÇation
  PATCH  /api/resources/:id       mise Ö jour partielle
  DELETE /api/resources/:id       suppression

## RESPONSE STRUCTURE
- Succäs : `{ "success": true, "data": {...}, "meta": { "page": 1, "total": 42 } }`
- Erreur : `{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": {} } }`

## STANDARDS OBLIGATOIRES
1. **Validation** : Zod systÇmatique sur body, params et query (types stricts, sanitisation).
2. **Gestion d'erreurs** : blocs try/catch sur tout le async, middleware global, codes HTTP sÇmantiques, masquage des traces en prod.
3. **SÇcuritÇ** : Middleware d'authentification et de vÇrification stricte de l'ownership d'entitÇ.
4. **Mongoose Performance** : Usage de `.lean()` en lecture seule, `.select()` restrictif (sÇcuritÇ des mots de passe), indexation et transactions multi-collections.

## MISSION
CrÇe la route et le controller complets pour : [DêCRIRE ICI]
