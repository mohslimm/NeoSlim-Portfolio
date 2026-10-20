import re

path = r"C:\Projects\01_Websites\NeoSlim Portfolio\neoslim\src\data\projectsData.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace images
replacements = [
    ("image: '/projects/anis-phone-atlas-cover.svg',", "image: '/projects/anis-phone-render.jpg',"),
    ("'/projects/anis-phone.png',", "'/projects/anis-phone-render.jpg',\n      '/projects/anis-phone.png',"),
    ("image: '/projects/stonelink-omniroute-cover.svg',", "image: '/projects/stonelink-render.jpg',"),
    ("gallery: ['/projects/stonelink.png', '/projects/nebula.jpg'],", "gallery: ['/projects/stonelink-render.jpg', '/projects/stonelink.png', '/projects/nebula.jpg'],"),
    ("image: '/projects/quantum.jpg',", "image: '/projects/nexus-horizon-render.jpg',"),
    ("gallery: ['/projects/quantum.jpg'],", "gallery: ['/projects/nexus-horizon-render.jpg', '/projects/quantum.jpg'],"),
    ("image: '/projects/resort-os-cover.svg',", "image: '/projects/resort-os-render.jpg',"),
    ("gallery: ['/projects/resortos.png'],", "gallery: ['/projects/resort-os-render.jpg', '/projects/resortos.png', '/projects/tropicalboat-1.png'],"),
    ("image: '/projects/commercia-banner.png',", "image: '/projects/commercia-render.jpg',"),
    ("gallery: ['/projects/commercia-banner.png', '/projects/commercia.png'],", "gallery: ['/projects/commercia-render.jpg', '/projects/commercia-banner.png', '/projects/commercia.png'],"),
    ("image: '/projects/autoshine.png',", "image: '/projects/autoshine-render.jpg',"),
    ("gallery: ['/projects/autoshine.png', '/projects/autoshine-card.png'],", "gallery: ['/projects/autoshine-render.jpg', '/projects/autoshine-card.png', '/projects/autoshine.png'],"),
    ("image: '/projects/parfait-voyage.jpg',", "image: '/projects/parfait-voyage-render.jpg',"),
    ("gallery: ['/projects/parfait-voyage.jpg'],", "gallery: ['/projects/parfait-voyage-render.jpg', '/projects/parfait-voyage.jpg'],"),
    ("image: '/projects/allamea.png',", "image: '/projects/allamea-render.jpg',"),
    ("gallery: ['/projects/allamea.png'],", "gallery: ['/projects/allamea-render.jpg', '/projects/allamea.png'],"),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"Replaced: {old[:30]}...")
    else:
        print(f"NOT FOUND: {old[:30]}...")

new_projects = """  {
    id: 'menuflow',
    title: 'MenuFlow AI — Fine Dining & QR Matrix',
    category: 'development',
    antigravityScore: 98,
    year: '2025 - 2026',
    image: '/projects/menuflow-render.jpg',
    gallery: ['/projects/menuflow-render.jpg'],
    tags: ['Next.js 15', 'Supabase PostgreSQL', 'Twilio SMS', 'QR Menu Dynamic', 'Table Matrix', 'Tailwind CSS v4'],
    descriptionFr: 'Système d\\'exploitation gastronomique et réservation intelligente pour établissements de haute cuisine : menu QR dynamique, plan de salle interactif et alertes SMS Twilio.',
    descriptionEn: 'Gastronomic operating system & intelligent table reservations for fine dining venues: dynamic QR menus, interactive floorplan matrix, and Twilio SMS orchestration.',
    taglineFr: 'Réservation de tables et carte QR dynamique pour la haute gastronomie.',
    taglineEn: 'Fine dining reservations and dynamic digital QR menus for luxury restaurants.',
    fullDescriptionFr: 'MenuFlow fluidifie l\\'expérience des restaurants gastronomiques et hôtels de prestige. Propulsé par Next.js 15 et Supabase, il offre un plan de salle temps réel, la commande par QR code avec filtres d\\'allergènes et accords mets-vins, ainsi qu\\'un dispatch cuisine sans papier avec synchronisation SMS Twilio pour confirmer les réservations instantanément.',
    fullDescriptionEn: 'MenuFlow streamlines fine dining and boutique hospitality workflows. Built on Next.js 15 and Supabase, it provides real-time table management, QR-driven curated menus with sommelier pairing recommendations, and paperless kitchen dispatch with automated Twilio SMS booking confirmations.',
    keyAchievementFr: 'Accélération du Chiffre d\\'Affaires (+34%) & Plan de Salle Temps Réel',
    keyAchievementEn: '+34% Table Turnover Acceleration & Real-Time Floorplan Matrix',
    githubUrl: 'https://github.com/mohslimm/menuflow-luxury',
    demoUrl: 'https://menuflow.neoslim.online',
    isFlagship: true,
  },
  {
    id: 'livreur-cash',
    title: 'Livreur Cash Logistics Hub',
    category: 'productivity',
    antigravityScore: 97,
    year: '2025 - 2026',
    image: '/projects/livreur-cash-render.jpg',
    gallery: ['/projects/livreur-cash-render.jpg'],
    tags: ['React 19', 'Offline-First SQLite', 'IoT Geofencing', 'Cash On Delivery Escrow', 'Tailwind CSS v4'],
    descriptionFr: 'Hub mobile de réconciliation financière et coffre-fort numérique pour coursiers et chauffeurs livreurs COD en Algérie (58 wilayas) : zéro divergence de caisse et clôture instantanée.',
    descriptionEn: 'Mobile financial reconciliation hub & tamper-evident digital vault for Cash-on-Delivery couriers across Algeria: zero cash discrepancies and instant route settlement.',
    taglineFr: 'Hub de gestion de trésorerie et réconciliation de caisse COD pour livreurs.',
    taglineEn: 'Mobile COD cash reconciliation and tamper-evident courier route settlement hub.',
    fullDescriptionFr: 'Livreur Cash élimine les litiges financiers entre e-commerçants et transporteurs. L\\'application mobile calcule en temps réel le montant exact collecté, valide chaque remise contre signature et code SMS, et s\\'intègre à des boîtes de sécurité IoT avec déverrouillage géofencé dès l\\'arrivée au centre de tri.',
    fullDescriptionEn: 'Livreur Cash eradicates financial friction between online merchants and logistics couriers. The mobile application tracks cash collected in real-time, validates drops via SMS OTP authentication, and integrates with IoT geofenced lockboxes that safely deposit collected sums upon depot arrival.',
    keyAchievementFr: 'Réconciliation à 100% sans Écart & Sécurisation IoT Géolocalisée',
    keyAchievementEn: '100% Flawless Cash Reconciliation & Geofenced IoT Vault Integration',
    githubUrl: 'https://github.com/mohslimm/livreur-cash',
    demoUrl: 'https://livreurcash.neoslim.online',
  },
"""

marker = "// STEPPING STONES AGENCY — BESPOKE NICHE PACK"
if "id: 'menuflow'" not in content:
    idx = content.find(marker)
    if idx != -1:
        # find the line start
        line_start = content.rfind("\n", 0, idx)
        line_start = content.rfind("\n", 0, line_start)
        content = content[:line_start+1] + new_projects + content[line_start+1:]
        print("Injected MenuFlow and Livreur Cash!")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done updating projectsData.ts!")
