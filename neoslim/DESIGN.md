# 🏛️ DESIGN SYSTEM & ARCHITECTURAL SPECIFICATION — AWWWARDS SOTD
**Subject :** Mohamed Slimani — Lead Architect & Systems Engineer | Stepping Stones Agency  
**Target Standard :** Awwwards Site of the Day (SOTD) Score >= 8.2  
**Evaluation Rubric :** Design (40%), Usability (30%), Creativity (20%), Content (10%)  
**Engine & Stack :** React 19 + Vite + Tailwind CSS + Framer Motion 12 + Lenis Smooth Scroll + GSAP Ticker  

---

## 💎 CONCEPT CARD

```yaml
Idea:        "Sovereign Digital Engineering — The Convergence of Quantitative Precision & Monolithic Luxury"
Metaphor:    A high-security private bank vault intersecting an architectural atelier at midnight.
Signature:   "The Kinetic Sovereign Shutter" — a seamless focal transition bridging micro-telemetry HUDs into interactive 3D spatial project cockpits without hard cuts.
Emotion:     Inevitable, silent authority, sub-second execution, deep architectural calm.
Motion verb: "Glide like heavy oiled steel, snap with shutter precision, breathe like warm filament."
Screenshot:  The split-horizon hero where oversized Cormorant display typography interlocks with the live 3D holographic wireframe and real-time 0.74ms IPC telemetry ticker.
```

---

## 🎨 ART DIRECTION & COLOR SYSTEM (QUIET LUXURY)

| Token Role | Hex / Value | Usage & Meaning |
|---|---|---|
| `--bg-void` (Ground) | `#060610` | Obsidian deep ground, infinite contrast |
| `--bg-surface` (Slab) | `#0B0B18` | Monolithic cards, console bays, interactive stages |
| `--bg-elevated` (Plates) | `#121226` | Modals, drawers, flyouts, floating HUDs |
| `--gold-500` (Accent) | `#C5A059` | Brushed champagne gold, primary interactive verb |
| `--gold-400` (Luminous) | `#E8C77A` | Hover bloom, active indicator, focus ring |
| `--gold-glow` (Halo) | `rgba(197, 160, 89, 0.14)` | Ambient volumetric lighting |
| `--text-primary` (Ink) | `#F8FAFC` | Mineral white, AAA contrast ratio > 11:1 |
| `--text-muted` (Shadow) | `rgba(240, 237, 232, 0.55)` | Secondary captions, AA contrast > 5:1 |
| `--border-subtle` (Line) | `rgba(255, 255, 255, 0.08)` | Structural grid hairline dividers |
| `--border-gold` (Conduit) | `rgba(197, 160, 89, 0.35)` | Active selection, focused states |

---

## ✍️ TYPOGRAPHIC ARCHITECTURE

- **Display Headings (`h1`, `h2`, Hero Statements)**:
  - Font: `Cormorant Garamond`, serif, optical sizing.
  - Scale: Fluid `clamp(2.5rem, 6.5vw, 6rem)`, leading `1.02`, tracking `-0.035em`.
  - Editorial rule: Italic styling applied to high-leverage keywords (*Sovereign*, *Quantitative*, *Autonomous*).
- **Body & UI Text**:
  - Font: `Outfit` / `Inter`, sans-serif.
  - Scale: `16px` to `18px`, leading `1.6`, tracking `-0.01em`, weights 300 to 500.
- **Telemetry, Code & Financial Figures**:
  - Font: `JetBrains Mono`, monospace, `tabular-nums` enabled universally.
  - Scale: `12px` to `13px`, uppercase labels, letter-spacing `0.12em`.

---

## ⚡ MOTION CHOREOGRAPHY & MASTER CLOCK

1. **Master Clock**:
   - Single unified ticker synchronizing Lenis smooth scroll and Framer Motion spring physics.
   - Zero independent uncoordinated `setInterval` or `requestAnimationFrame` loops.
2. **Spring Physics**:
   - Mass: `0.8`, Stiffness: `260`, Damping: `28` for monolithic weighty displacement.
   - Micro-press: `whileTap={{ scale: 0.985 }}`.
3. **Reduced Motion Grace**:
   - Strictest conformance to `(prefers-reduced-motion: reduce)`.
   - Freezes dynamic particles, renders all text statically with instant opacity, disables forced scroll dampening.
4. **Continuity Between States**:
   - Hero intro loader $\rightarrow$ Split horizon reveal $\rightarrow$ Interactive project showcase $\rightarrow$ Fullscreen cockpit modal.
   - Zero hard jump-cuts or raw layout thrashing.
