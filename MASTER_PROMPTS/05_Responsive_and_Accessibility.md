# RESPONSIVE & ACCESSIBILITY AUDIT - WCAG 2.1 AA

## BREAKPOINTS STANDARD (Tailwind v4)
  xs  : 375px   (iPhone SE)
  sm  : 640px   (Mobile large)
  md  : 768px   (Tablette portrait)
  lg  : 1024px  (Tablette paysage / petit laptop)
  xl  : 1280px  (Desktop standard)
  2xl : 1536px  (Large desktop)

## RESPONSIVE CHECKLIST
- [ ] Aucun overflow horizontal sur mobile (overflow-x: hidden sur root)
- [ ] Grilles qui collapsent correctement (4col  2col  1col)
- [ ] Touch targets : minimum 44x44px sur mobile (Apple HIG standard)
- [ ] Pas de hover-only interactions sur mobile (remplac‚es par touch/tap feedback)
- [ ] Respect des zones de s‚curit‚ iOS (env(safe-area-inset-bottom))
- [ ] Navigation adaptative : Bottom nav fixe sur mobile (64px), Sidebar persistante ou repliable sur tablette/desktop

## ACCESSIBILITY CHECKLIST (WCAG 2.1 AA)
- [ ] Structure s‚mantique HTML stricte (<main>, <nav>, <header>, <footer>) et hi‚rarchie logique des titres (un seul h1)
- [ ] Ratio de contraste des couleurs minimum de 4.5:1 pour le texte normal (Quiet Luxury Palette respect‚e sans blanc pur)
- [ ] Formulaires : Chaque input est li‚ … un <label> explicite (pas de placeholder-only) avec aria-describedby pour les erreurs
- [ ] Navigation au clavier : Focus visible (focus-visible ring) sur tous les ‚l‚ments interactifs et pi‚geage du focus dans les modals
- [ ] M‚dias & Mouvements : Balises alt descriptives et gestion de `prefers-reduced-motion` pour d‚sactiver les animations complexes
