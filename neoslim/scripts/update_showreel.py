import os

path = r"C:\Projects\01_Websites\NeoSlim Portfolio\neoslim\public\showreel.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace the PROJECTS array definition
old_projects_start = "const PROJECTS = ["
old_projects_end = "    ];\n\n    // Preload available images"
if old_projects_end not in html:
    old_projects_end = "    ];\r\n\r\n    // Preload available images"

new_projects_code = """const PROJECTS = [
      {
        id: "aegis-alpha",
        category: "FINTECH • ALGORITHMIC TRADING",
        title: "Aegis Alpha",
        titleAccent: "MT5 Terminal",
        subtitle: "Passerelle HFT ultra-basse latence connectée à MetaTrader 5 via IPC natif. Graphique de ticks haute fréquence et disjoncteur Risk Shield 2%.",
        tech: ["MetaTrader 5 IPC", "Python 3.11", "HTML5 Canvas 60FPS", "Risk Shield"],
        imageSrc: "/projects/aegis-alpha-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.04 + Math.sin(t * 0.0005) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.22)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "el-mouhami",
        category: "LEGAL AI • AUTONOMOUS INTAKE",
        title: "El Mouhami Pro",
        titleAccent: "المحامي برو",
        subtitle: "Agent vocal d'accueil juridique bilingue (Arabe/Français). Qualification 24/7 des contentieux, évaluation de l'urgence et fiches d'instruction chiffrées.",
        tech: ["Web Speech API", "React 19", "Voice AI Waveform", "Supabase RLS"],
        imageSrc: "/projects/el-mouhami-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.06 + Math.sin(t * 0.0006) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.25)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "gestia",
        category: "PROPTECH • VOICE CONCIERGE",
        title: "Gestia Conciergerie",
        titleAccent: "Smart Property OS",
        subtitle: "Gestionnaire immobilier de prestige avec réceptionniste IA vocal 24/7, signature de baux biométrique et suivi des loyers en direct.",
        tech: ["Supabase PostgreSQL", "Stripe Connect", "Retell Voice AI", "Tailwind v4"],
        imageSrc: "/projects/gestia-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.05 + Math.sin(t * 0.0005) * 0.05;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.28)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "kachef",
        category: "DATA INTELLIGENCE • RADAR B2B",
        title: "Kachef OS",
        titleAccent: "Radar Prospection B2B",
        subtitle: "Scraper intelligent de registres de commerce et moteurs de recherche. Scoring anti-retour et enrichisseur automatique de leads WhatsApp.",
        tech: ["Tauri Desktop", "Node.js Scraping", "Scoring Engine", "WhatsApp Cloud"],
        imageSrc: "/projects/kachef-radar-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.07 + Math.sin(t * 0.0004) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.25)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "stonelink",
        category: "AI INFRASTRUCTURE • GATEWAY",
        title: "StoneLink",
        titleAccent: "OmniRoute AI Gateway",
        subtitle: "Routeur multi-LLM d'agence à haute résilience (Claude, Gemini, OpenAI). Compression de tokens par algorithmes Caveman & RTK.",
        tech: ["OmniRoute Engine", "FastAPI / Hono", "Multi-Provider Free Tier", "RTK Cache"],
        imageSrc: "/projects/stonelink-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.05 + Math.sin(t * 0.0005) * 0.05;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.24)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "anis-phone",
        category: "LUXURY COMMERCE • ATLAS LOGISTICS",
        title: "Anis Phone Prestige",
        titleAccent: "Atlas Delivery 58 Wilayas",
        subtitle: "Storefront mobile pour smartphones haut de gamme couplé au hub logistique national et configurateur 3D temps réel Three.js.",
        tech: ["Next.js 16", "Interactive 3D Three.js", "58 Wilayas COD", "Supabase SSR"],
        imageSrc: "/projects/anis-phone-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.06 + Math.sin(t * 0.0006) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.22)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "resort-os",
        category: "HOSPITALITY • SUPERYACHT MARINA",
        title: "Resort OS",
        titleAccent: "Riviera & Marina ERP",
        subtitle: "Système de conciergerie et d'amarrage pour resorts 5 étoiles, superyachts et domaines privés. Télémétrie météo et facturation automatisée.",
        tech: ["NestJS Enterprise", "Prisma ORM", "Docker Microservices", "Tailwind v4"],
        imageSrc: "/projects/resort-os-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.05 + Math.sin(t * 0.0004) * 0.05;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.25)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "commercia",
        category: "RETAIL TECH • HARDWARE POS",
        title: "Commercia POS",
        titleAccent: "Sales Hub Algeria",
        subtitle: "Système POS de caisse et CRM omnicanal avec synchronisation temps réel, persistance locale SQLite et pilotes ESC/POS thermiques natifs.",
        tech: ["React 19", "ESC/POS Thermal", "Offline SQLite", "Capacitor Mobile"],
        imageSrc: "/projects/commercia-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.05 + Math.sin(t * 0.0005) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.24)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "nexus-horizon",
        category: "ENTERPRISE • SOVEREIGN OS",
        title: "Nexus Horizon ERP",
        titleAccent: "Sovereign Desktop Suite",
        subtitle: "Système d'exploitation d'entreprise souverain pour environnement desktop : modules isolés, base relationnelle locale et hub décentralisé.",
        tech: ["Electron", "Express v5", "Prisma ORM", "PostgreSQL Enclave"],
        imageSrc: "/projects/nexus-horizon-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.04 + Math.sin(t * 0.0004) * 0.04;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.25)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      },
      {
        id: "menuflow",
        category: "FINE DINING • DIGITAL CONCIERGE",
        title: "MenuFlow AI",
        titleAccent: "Gourmet QR & Floorplan",
        subtitle: "Système d'exploitation gastronomique et réservation intelligente pour établissements de haute cuisine : menu QR dynamique et dispatch cuisine.",
        tech: ["Next.js 15", "Supabase", "Twilio SMS", "Paperless Kitchen HUD"],
        imageSrc: "/projects/menuflow-render.jpg",
        draw: (ctx, t, w, h, img) => {
          if (img && img.complete && img.naturalWidth > 0) {
            const scale = 1.05 + Math.sin(t * 0.0005) * 0.05;
            const iw = w * scale, ih = h * scale;
            ctx.drawImage(img, (w - iw) / 2, (h - ih) / 2, iw, ih);
            ctx.fillStyle = "rgba(6, 6, 16, 0.24)";
            ctx.fillRect(0, 0, w, h);
          }
        }
      }
    ];"""

# Replace in html
idx_start = html.find(old_projects_start)
idx_end = html.find("// Preload available images")

if idx_start != -1 and idx_end != -1:
    html = html[:idx_start] + new_projects_code + "\n\n    // Preload available images" + html[idx_end + len("// Preload available images"):]
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("showreel.html updated successfully with all 10 projects!")
else:
    print(f"Could not locate markers: start={idx_start}, end={idx_end}")
