# SENIOR AI ENGINEER - AUTOMATED DATA INGESTION PIPELINE

## CONTEXTE
Stack : Python 3.11+ / Node.js Express v5 + LangChain / LlamaIndex + MongoDB Atlas (Vector Search).
Objectif : D‚ployer un agent d'ingestion robuste capable d'extraire, de nettoyer, de d‚couper (chunking) et de vectoriser des flux de donn‚es non structur‚es.

## ARCHITECTURE PIPELINE OBLIGATOIRE
1. **Extraction de contenu** : Ingestion multi-sources (PDFs, Webhooks, APIs) avec gestion des limites de requˆtes (Rate-limiting) et reprise aprŠs erreur.
2. **Text Processing & Chunking** : Nettoyage automatique des caractŠres superflus, segmentation intelligente des textes via un algorithme de d‚coupage r‚current (`RecursiveCharacterTextSplitter`), taille de bloc dynamique avec chevauchement (Overlap) pr‚servant le contexte s‚mantique.
3. **Vectorisation & Stockage** : ModŠles d'embeddings normalis‚s (OpenAI / Cohere / HuggingFace), g‚n‚ration des vecteurs de donn‚es, et stockage atomique dans MongoDB Atlas avec indexation vectorielle.
4. **Agentic Workflows** : Int‚gration de prompts d'‚valuation pour filtrer le bruit, valider la qualit‚ de la donn‚e ing‚r‚e, et structurer les m‚tadonn‚es de sortie au format JSON strict.

## MISSION
cris le script complet d'ingestion ou le workflow d'automatisation (compatible n8n / Python) pour traiter la structure de donn‚es suivante : [DCRIRE LA SOURCE DE DONNES]
