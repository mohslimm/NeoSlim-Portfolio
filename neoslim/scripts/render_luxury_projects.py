"""
High-End Quiet Luxury Render Generator for Mohamed Slimani Portfolio
Renders 10 flagship projects in 16:9 ultra-HD (1920x1080) matching the
exact Stepping Stones Agency Quiet Luxury doctrine:
- Void: #060610
- Surface: #0f0f20
- Brushed Gold: #c5a059
- Bright Gold: #e8c77a
- Mineral White: #f0ede8
- Emerald Success: #22c55e
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r"C:\Projects\01_Websites\NeoSlim Portfolio\neoslim\public\projects"
AGENCY_DIR = r"C:\Projects\01_Websites\SteppingStones-Agency\server\public\projects"

WIDTH = 1920
HEIGHT = 1080

# Color Palette
C_VOID = (6, 6, 16)
C_PRIMARY = (10, 10, 20)
C_SURFACE = (15, 15, 32)
C_ELEVATED = (20, 20, 42)
C_GOLD = (197, 160, 89)
C_GOLD_LIGHT = (232, 199, 122)
C_GOLD_DARK = (130, 100, 50)
C_TEXT = (240, 237, 232)
C_MUTED = (160, 155, 145)
C_BORDER = (255, 255, 255, 25)
C_BORDER_GOLD = (197, 160, 89, 70)
C_EMERALD = (34, 197, 94)
C_CYAN = (56, 189, 248)

# Font loading helpers
def get_font(size, bold=False, mono=False):
    fonts_dir = "C:/Windows/Fonts"
    try:
        if mono:
            name = "consola.ttf" if not bold else "consolab.ttf"
        elif bold:
            name = "georgiab.ttf"
        else:
            name = "georgia.ttf"
        path = os.path.join(fonts_dir, name)
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    except Exception:
        pass
    try:
        name = "arialbd.ttf" if bold else "arial.ttf"
        return ImageFont.truetype(os.path.join(fonts_dir, name), size)
    except Exception:
        return ImageFont.load_default()

def create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=C_GOLD, glow_radius=700, intensity=0.25):
    """Creates a 1920x1080 canvas with subtle radial gold ambient glow and grid pattern."""
    img = Image.new("RGBA", (WIDTH, HEIGHT), C_VOID + (255,))
    
    # Radial glow array
    y, x = np.ogrid[:HEIGHT, :WIDTH]
    dist_sq = (x - glow_center[0])**2 + (y - glow_center[1])**2
    sigma = glow_radius**2
    glow_arr = np.exp(-dist_sq / (2 * sigma)) * intensity
    
    # Create glow image
    glow_rgb = np.zeros((HEIGHT, WIDTH, 4), dtype=np.uint8)
    for i in range(3):
        glow_rgb[:, :, i] = int(glow_color[i])
    glow_rgb[:, :, 3] = np.clip(glow_arr * 255, 0, 255).astype(np.uint8)
    glow_layer = Image.fromarray(glow_rgb, "RGBA")
    img = Image.alpha_composite(img, glow_layer)
    
    # Subtle dot matrix / grid
    grid_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw_grid = ImageDraw.Draw(grid_layer)
    step = 60
    for gx in range(0, WIDTH, step):
        for gy in range(0, HEIGHT, step):
            draw_grid.ellipse((gx - 1, gy - 1, gx + 1, gy + 1), fill=(255, 255, 255, 8))
    img = Image.alpha_composite(img, grid_layer)
    
    # Ambient gold dust particles
    np.random.seed(42)
    particle_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(particle_layer)
    for _ in range(80):
        px = np.random.randint(50, WIDTH - 50)
        py = np.random.randint(50, HEIGHT - 50)
        pr = np.random.uniform(1.0, 3.5)
        p_alpha = np.random.randint(15, 65)
        p_draw.ellipse((px - pr, py - pr, px + pr, py + pr), fill=(C_GOLD_LIGHT[0], C_GOLD_LIGHT[1], C_GOLD_LIGHT[2], p_alpha))
    
    img = Image.alpha_composite(img, particle_layer)
    return img

def draw_glass_card(draw, box, radius=18, border_color=(197, 160, 89, 70), fill_color=(15, 15, 32, 220)):
    """Draws a rounded glass card with subtle border and metallic specular edge."""
    x0, y0, x1, y1 = box
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill_color, outline=border_color, width=1)
    # Top edge highlight (specular white/gold reflection)
    draw.line([(x0 + radius, y0), (x1 - radius, y0)], fill=(255, 255, 255, 60), width=1)
    draw.line([(x0 + radius, y0 + 1), (x1 - radius, y0 + 1)], fill=(C_GOLD_LIGHT[0], C_GOLD_LIGHT[1], C_GOLD_LIGHT[2], 30), width=1)

def draw_badge(draw, text, pos, bg_color=(197, 160, 89, 35), border_color=C_GOLD, text_color=C_GOLD_LIGHT, font_size=16):
    font = get_font(font_size, bold=True, mono=True)
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    px, py = 14, 6
    x0, y0 = pos
    x1, y1 = x0 + tw + px * 2, y0 + th + py * 2
    draw.rounded_rectangle([x0, y0, x1, y1], radius=999, fill=bg_color, outline=border_color, width=1)
    draw.text((x0 + px, y0 + py - bbox[1]), text, fill=text_color, font=font)
    return x1, y1

# ==========================================
# 1. STONELINK & OMNIROUTE RENDER
# ==========================================
def render_stonelink():
    print("Rendering: StoneLink & OmniRoute...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=C_GOLD, glow_radius=650, intensity=0.35)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left Telemetry Panel
    draw_glassCard = draw_glass_card(draw, (120, 120, 720, 960), radius=20, border_color=(197, 160, 89, 80), fill_color=(12, 12, 26, 235))
    
    # Header
    draw_badge(draw, "OMNIROUTE ENGINE v3.8.51", (160, 160), bg_color=(197, 160, 89, 40), border_color=C_GOLD, text_color=C_GOLD_LIGHT, font_size=14)
    draw.text((160, 210), "StoneLink AI Gateway", fill=C_TEXT, font=get_font(38, bold=True))
    draw.text((160, 260), "Multi-Provider LLM Intelligent Failover & Routing", fill=C_MUTED, font=get_font(18))
    
    # Metrics
    metrics = [
        ("GLOBAL ROUTE RESILIENCE", "99.99%", C_EMERALD),
        ("AVERAGE DISPATCH LATENCY", "142 ms", C_GOLD_LIGHT),
        ("TOKEN COMPRESSION (RTK)", "68.4%", C_CYAN),
        ("ACTIVE AGENTS IN CLUSTER", "12 Nodes", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(metrics):
        my = 330 + i * 110
        draw.rounded_rectangle([160, my, 680, my + 85], radius=12, fill=(20, 20, 40, 180), outline=(255, 255, 255, 20), width=1)
        draw.text((185, my + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((185, my + 38), val, fill=col, font=get_font(28, bold=True, mono=True))
        # Status pulse dot
        draw.ellipse((640, my + 36, 652, my + 48), fill=col)
    
    # Right Diagram: 3D Holographic Model Hub
    hub_cx, hub_cy = 1320, 540
    # Central Gateway Core
    draw.ellipse((hub_cx - 130, hub_cy - 130, hub_cx + 130, hub_cy + 130), fill=(25, 22, 45, 240), outline=C_GOLD, width=3)
    draw.ellipse((hub_cx - 110, hub_cy - 110, hub_cx + 110, hub_cy + 110), fill=(15, 15, 30, 255), outline=(197, 160, 89, 120), width=1)
    draw.text((hub_cx - 65, hub_cy - 35), "OMNI", fill=C_GOLD_LIGHT, font=get_font(32, bold=True))
    draw.text((hub_cx - 75, hub_cy + 5), "ROUTE", fill=C_TEXT, font=get_font(32, bold=True))
    draw.text((hub_cx - 50, hub_cy + 45), "CORE v3.8", fill=C_MUTED, font=get_font(14, mono=True))
    
    # Satellite Nodes (Claude, Gemini, GPT, DeepSeek, Twilio, Redis)
    nodes = [
        ("Claude 3.5 Sonnet", 0, "Anthropic API", C_GOLD_LIGHT),
        ("Gemini 2.5 Pro", math.pi / 3, "Google Vertex", C_CYAN),
        ("GPT-4o Omnichannel", 2 * math.pi / 3, "OpenAI Cluster", C_EMERALD),
        ("DeepSeek R1 Local", math.pi, "Ollama / PentAG", (245, 158, 11)),
        ("Twilio WebRTC Voice", 4 * math.pi / 3, "VoIP Softphone", (239, 68, 68)),
        ("Redis BullMQ Pipeline", 5 * math.pi / 3, "Queue Engine", (168, 85, 247)),
    ]
    radius = 350
    for name, angle, sub, col in nodes:
        nx = int(hub_cx + radius * math.cos(angle))
        ny = int(hub_cy + radius * math.sin(angle))
        
        # Conduits
        draw.line([(hub_cx, hub_cy), (nx, ny)], fill=(col[0], col[1], col[2], 90), width=2)
        # Pulsing midpoint particle
        mx = (hub_cx + nx) // 2
        my = (hub_cy + ny) // 2
        draw.ellipse((mx - 5, my - 5, mx + 5, my + 5), fill=col)
        
        # Node Card
        w, h = 230, 80
        draw.rounded_rectangle([nx - w // 2, ny - h // 2, nx + w // 2, ny + h // 2], radius=14, fill=(18, 18, 36, 240), outline=(col[0], col[1], col[2], 180), width=2)
        draw.text((nx - w // 2 + 18, ny - 24), name, fill=C_TEXT, font=get_font(16, bold=True))
        draw.text((nx - w // 2 + 18, ny + 4), sub, fill=col, font=get_font(13, mono=True))
        draw.ellipse((nx + w // 2 - 25, ny - 6, nx + w // 2 - 13, ny + 6), fill=col)

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 2. ANIS PHONE & ATLAS DELIVERY RENDER
# ==========================================
def render_anis_phone():
    print("Rendering: Anis Phone & Atlas Delivery...")
    img = create_base_canvas(glow_center=(1000, 540), glow_color=(232, 199, 122), glow_radius=600, intensity=0.30)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left: Luxury Specs & 58 Wilayas Coverage
    draw_glass_card(draw, (120, 140, 720, 940), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "ALGERIA 58 WILAYAS LOGISTICS", (160, 180), font_size=14)
    draw.text((160, 230), "ANIS PHONE & ATLAS", fill=C_TEXT, font=get_font(36, bold=True))
    draw.text((160, 280), "Ultra-Luxury Smartphone E-Commerce & 3D Configurator", fill=C_MUTED, font=get_font(18))
    
    specs = [
        ("COD DELIVERY VELOCITY", "Sub-24h Direct 58 Wilayas", C_EMERALD),
        ("INTERACTIVE 3D ENGINE", "Three.js / WebGL 60 FPS", C_GOLD_LIGHT),
        ("BACKEND ARCHITECTURE", "Supabase SSR + Row Security", C_CYAN),
        ("AVERAGE CART VALUE", "185,000 DZD Flagship Tier", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(specs):
        my = 350 + i * 110
        draw.rounded_rectangle([160, my, 680, my + 85], radius=12, fill=(20, 20, 42, 180), outline=(255, 255, 255, 20), width=1)
        draw.text((185, my + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((185, my + 38), val, fill=col, font=get_font(24, bold=True, mono=True))
        draw.ellipse((640, my + 36, 652, my + 48), fill=col)

    # Right: Titanium Borderless Smartphone Mockup
    px0, py0, px1, py1 = 940, 120, 1480, 960
    # Outer titanium bezel
    draw.rounded_rectangle([px0 - 12, py0 - 12, px1 + 12, py1 + 12], radius=48, fill=(35, 35, 45, 255), outline=C_GOLD, width=3)
    # OLED Screen
    draw.rounded_rectangle([px0, py0, px1, py1], radius=40, fill=(8, 8, 16, 255))
    
    # Phone Top Speaker / Dynamic Island
    draw.rounded_rectangle([1150, py0 + 16, 1270, py0 + 44], radius=14, fill=(0, 0, 0, 255), outline=(197, 160, 89, 80), width=1)
    draw.ellipse((1165, py0 + 24, 1177, py0 + 36), fill=(20, 30, 50))
    
    # Phone Content: 3D Algeria Map with Glowing Hubs
    draw.text((px0 + 40, py0 + 80), "ATLAS LOGISTICS 58 WILAYAS", fill=C_GOLD_LIGHT, font=get_font(16, bold=True, mono=True))
    draw.text((px0 + 40, py0 + 110), "Real-Time Express Dispatch", fill=C_MUTED, font=get_font(14))
    
    # Draw stylized map routes across Algeria
    algiers = (1190, py0 + 240)
    oran = (1080, py0 + 290)
    constantine = (1300, py0 + 260)
    annaba = (1360, py0 + 230)
    setif = (1260, py0 + 280)
    ouargla = (1240, py0 + 450)
    ghardaia = (1170, py0 + 470)
    tamanrasset = (1200, py0 + 720)
    
    cities = [
        ("Alger (HQ)", algiers, C_GOLD_LIGHT, True),
        ("Oran Hub", oran, C_CYAN, False),
        ("Constantine Hub", constantine, C_CYAN, False),
        ("Annaba Port", annaba, C_CYAN, False),
        ("Setif Express", setif, C_CYAN, False),
        ("Ouargla South", ouargla, C_EMERALD, False),
        ("Ghardaia Gate", ghardaia, C_EMERALD, False),
        ("Tamanrasset Terminal", tamanrasset, C_GOLD, False),
    ]
    
    for _, c_pos, col, is_hq in cities:
        draw.line([algiers, c_pos], fill=(col[0], col[1], col[2], 80), width=2)
        r = 9 if is_hq else 6
        draw.ellipse((c_pos[0] - r, c_pos[1] - r, c_pos[0] + r, c_pos[1] + r), fill=col, outline=C_TEXT, width=1)
        # Pulse ring
        draw.ellipse((c_pos[0] - r - 6, c_pos[1] - r - 6, c_pos[0] + r + 6, c_pos[1] + r + 6), outline=(col[0], col[1], col[2], 90), width=1)
    
    # Interactive HUD card over phone bottom
    draw.rounded_rectangle([px0 + 30, py1 - 180, px1 - 30, py1 - 30], radius=16, fill=(18, 18, 36, 230), outline=C_GOLD, width=1)
    draw.text((px0 + 50, py1 - 160), "CURRENT DISPATCH : BATCH #8492", fill=C_GOLD_LIGHT, font=get_font(13, mono=True))
    draw.text((px0 + 50, py1 - 135), "Titanium Pro Max 1TB (Dark Obsidian)", fill=C_TEXT, font=get_font(16, bold=True))
    draw.text((px0 + 50, py1 - 105), "En Route -> Oran Express Carrier | Escrow Secured", fill=C_EMERALD, font=get_font(13))
    
    # Right Float Card: Packaging & Escrow
    draw_glass_card(draw, (1530, 360, 1840, 720), radius=16, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw.text((1560, 400), "ESCROW GUARANTEE", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    draw.text((1560, 430), "Cash On Delivery\nVerification", fill=C_TEXT, font=get_font(22, bold=True))
    draw.text((1560, 500), "- Unbox & inspect before payment\n- SMS OTP validation\n- 100% genuine IMEI tracking\n- Instant refund guarantee", fill=C_MUTED, font=get_font(15))
    draw_badge(draw, "100% COD VERIFIED", (1560, 640), bg_color=(34, 197, 94, 30), border_color=C_EMERALD, text_color=C_EMERALD, font_size=12)

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 3. RESORT OS & SUPERYACHT MARINA RENDER
# ==========================================
def render_resort_os():
    print("Rendering: Resort OS & Superyacht Marina...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(140, 180, 220), glow_radius=700, intensity=0.25)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Header Bar
    draw_glass_card(draw, (120, 80, 1800, 160), radius=16, border_color=(197, 160, 89, 80), fill_color=(12, 12, 26, 230))
    draw_badge(draw, "HOSPITALITY & MARINA SUITE", (150, 102), font_size=13)
    draw.text((450, 100), "ResortOS — Luxury Estate & Yacht Berth Management", fill=C_TEXT, font=get_font(26, bold=True))
    draw.text((1500, 108), "TENANT: VILLA SANTA MONICA", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    
    # Left: Marina Berths Visualizer
    draw_glass_card(draw, (120, 190, 1080, 980), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw.text((160, 230), "SUPER-YACHT MARINA BERTH ALLOCATION", fill=C_GOLD_LIGHT, font=get_font(16, bold=True, mono=True))
    
    berths = [
        ("Berth Alpha 01", "M/Y ECLIPSE II (68m)", "Occupied", "VIP Concierge Requested", C_EMERALD),
        ("Berth Alpha 02", "S/Y AEGEAN BREEZE (42m)", "Occupied", "Provisions Dispatched", C_EMERALD),
        ("Berth Alpha 03", "Available (Max 55m)", "Open", "Reserved ETA 18:30", C_GOLD_LIGHT),
        ("Berth Beta 01", "M/Y MONACO SUN (52m)", "Occupied", "Helipad Clearance OK", C_EMERALD),
        ("Berth Beta 02", "Available (Max 40m)", "Open", "Daily Rate €12,500", C_GOLD_LIGHT),
        ("Private Villa Dock", "CRAFT TENDER 09 (14m)", "Stationed", "Guest Transfer Ready", C_CYAN),
    ]
    for i, (berth, yacht, status, note, col) in enumerate(berths):
        by = 280 + i * 105
        draw.rounded_rectangle([160, by, 1040, by + 85], radius=12, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((190, by + 16), berth, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((190, by + 40), yacht, fill=C_TEXT, font=get_font(20, bold=True))
        draw.text((620, by + 30), note, fill=C_MUTED, font=get_font(14))
        draw_badge(draw, status.upper(), (880, by + 24), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)

    # Right: Telemetry & Financial Cockpit
    draw_glass_card(draw, (1120, 190, 1800, 980), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw.text((1160, 230), "RESORT OPERATIONAL TELEMETRY", fill=C_GOLD_LIGHT, font=get_font(16, bold=True, mono=True))
    
    kpis = [
        ("TOTAL REVPAR (PORTFOLIO)", "€1,840.00 / Night", C_GOLD_LIGHT),
        ("CURRENT OCCUPANCY RATE", "94.6% Season Peak", C_EMERALD),
        ("MULTI-TENANT SCHEMAS", "18 Isolated DBs", C_CYAN),
        ("DIGITAL KEYLESS PASSES", "142 Active Mobile Keys", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(kpis):
        ky = 280 + i * 115
        draw.rounded_rectangle([1160, ky, 1760, ky + 90], radius=14, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((1190, ky + 16), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((1190, ky + 42), val, fill=col, font=get_font(24, bold=True, mono=True))

    # VIP Concierge Task Queue
    draw.rounded_rectangle([1160, 760, 1760, 940], radius=14, fill=(24, 22, 44, 230), outline=C_GOLD, width=1)
    draw.text((1190, 785), "LIVE VIP CONCIERGE FEED", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    draw.text((1190, 820), "• Suite 402: Private Sommelier Tasting (Dom Pérignon P2)", fill=C_TEXT, font=get_font(15))
    draw.text((1190, 855), "• Berth Alpha 01: Offshore Deep Sea Fishing Charter (06:00)", fill=C_TEXT, font=get_font(15))
    draw.text((1190, 890), "• Helipad Alpha: Transfer to Nice Côte d'Azur Airport (14:30)", fill=C_TEXT, font=get_font(15))

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 4. COMMERCIA POS & SALES HUB RENDER
# ==========================================
def render_commercia():
    print("Rendering: Commercia POS & Sales Hub...")
    img = create_base_canvas(glow_center=(960, 540), glow_color=C_GOLD, glow_radius=600, intensity=0.28)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left: Terminal Cockpit
    draw_glass_card(draw, (120, 140, 920, 940), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "HARDWARE-CONNECTED POS & CRM", (160, 180), font_size=14)
    draw.text((160, 230), "COMMERCIA SALES HUB", fill=C_TEXT, font=get_font(36, bold=True))
    draw.text((160, 280), "Next-Gen Retail POS, ESC/POS Thermal & Offline SQLite", fill=C_MUTED, font=get_font(18))
    
    items = [
        ("OFFLINE RESILIENCE", "100% Local SQLite Buffer", C_EMERALD),
        ("HARDWARE INTEGRATION", "ESC/POS Thermal & Barcode Scanners", C_GOLD_LIGHT),
        ("MULTI-OUTLET SYNC", "Sub-Second WebSocket Reconcile", C_CYAN),
        ("MONTHLY GROSS VOLUME", "48.2M DZD Retail Pipeline", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(items):
        iy = 350 + i * 110
        draw.rounded_rectangle([160, iy, 880, iy + 85], radius=12, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((190, iy + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((190, iy + 38), val, fill=col, font=get_font(24, bold=True, mono=True))
        draw.ellipse((840, iy + 36, 852, iy + 48), fill=col)

    # Right: Live POS Cashier Interface
    draw_glass_card(draw, (960, 140, 1800, 940), radius=20, border_color=(197, 160, 89, 80), fill_color=(15, 15, 32, 240))
    draw.text((1000, 180), "REGISTER #01 — FLAGSHIP STORE ALGIERS", fill=C_GOLD_LIGHT, font=get_font(15, mono=True))
    
    # Cart items
    cart = [
        ("Barista Grade Espresso Machine", "1x", "145,000 DZD", "SKU-9902"),
        ("Single Origin Ethiopian Beans 1kg", "4x", "18,400 DZD", "SKU-3120"),
        ("Porcelain Ceramic Demitasse Set", "2x", "12,600 DZD", "SKU-5441"),
        ("Hand-Crafted Brass Tamper 58mm", "1x", "9,800 DZD", "SKU-1822"),
    ]
    for j, (name, qty, price, sku) in enumerate(cart):
        cy = 240 + j * 90
        draw.rounded_rectangle([1000, cy, 1760, cy + 75], radius=10, fill=(22, 22, 44, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((1025, cy + 14), name, fill=C_TEXT, font=get_font(18, bold=True))
        draw.text((1025, cy + 42), f"{sku} • Qty: {qty}", fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((1560, cy + 24), price, fill=C_GOLD_LIGHT, font=get_font(20, bold=True, mono=True))

    # Total & Checkout Action Bar
    draw.rounded_rectangle([1000, 620, 1760, 890], radius=16, fill=(24, 22, 45, 230), outline=C_GOLD, width=2)
    draw.text((1030, 650), "SUBTOTAL (HT)", fill=C_MUTED, font=get_font(16))
    draw.text((1560, 650), "185,800 DZD", fill=C_TEXT, font=get_font(18, mono=True))
    draw.text((1030, 690), "TVA (19%)", fill=C_MUTED, font=get_font(16))
    draw.text((1560, 690), "35,302 DZD", fill=C_TEXT, font=get_font(18, mono=True))
    draw.line([(1030, 735), (1730, 735)], fill=(255, 255, 255, 30), width=1)
    
    draw.text((1030, 760), "NET TOTAL (TTC)", fill=C_GOLD_LIGHT, font=get_font(22, bold=True))
    draw.text((1440, 755), "221,102 DZD", fill=C_GOLD_LIGHT, font=get_font(32, bold=True, mono=True))
    
    # Print Receipt & Cash Drawer Trigger
    draw_badge(draw, "ESC/POS PRINTER READY", (1030, 830), bg_color=(34, 197, 94, 30), border_color=C_EMERALD, text_color=C_EMERALD, font_size=13)
    draw_badge(draw, "OFFLINE CACHE ACTIVE", (1270, 830), bg_color=(197, 160, 89, 30), border_color=C_GOLD, text_color=C_GOLD_LIGHT, font_size=13)

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 5. NEXUS HORIZON ERP RENDER
# ==========================================
def render_nexus_horizon():
    print("Rendering: Nexus Horizon ERP...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(80, 120, 200), glow_radius=650, intensity=0.30)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Header
    draw_glass_card(draw, (120, 120, 1800, 210), radius=16, border_color=(197, 160, 89, 80), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "SOVEREIGN DESKTOP OS", (160, 145), font_size=13)
    draw.text((430, 142), "Nexus Horizon ERP — Modular Enterprise Platform", fill=C_TEXT, font=get_font(26, bold=True))
    draw.text((1420, 148), "ZERO-KNOWLEDGE SECURITY", fill=C_EMERALD, font=get_font(13, mono=True))
    
    # 4 Modular Pods
    modules = [
        ("FINANCIAL GENERAL LEDGER", "Accounting & Balance Sheets", "Multi-Currency (EUR, DZD, USD)", "Double-entry compliance", C_GOLD_LIGHT),
        ("SUPPLY CHAIN & LOGISTICS", "Inventory & Warehouse Hub", "Barcoded Pallet Tracking", "Sub-lot tracing enabled", C_CYAN),
        ("HUMAN CAPITAL & PAYROLL", "HR & Talent Administration", "Confidential Salary Vault", "Encrypted contract storage", C_EMERALD),
        ("SOVEREIGN DATA CLUSTER", "Hybrid PostgreSQL / SQLite", "Bidirectional Cloud-Local", "Automatic air-gap sync", (168, 85, 247)),
    ]
    for idx, (title, sub, feat1, feat2, col) in enumerate(modules):
        r = idx // 2
        c = idx % 2
        bx0 = 120 + c * 860
        by0 = 240 + r * 350
        bx1 = bx0 + 820
        by1 = by0 + 320
        
        draw_glass_card(draw, (bx0, by0, bx1, by1), radius=18, border_color=(col[0], col[1], col[2], 90), fill_color=(15, 15, 32, 235))
        draw_badge(draw, f"MODULE #{idx+1:02d}", (bx0 + 30, by0 + 25), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)
        draw.text((bx0 + 30, by0 + 75), title, fill=C_TEXT, font=get_font(22, bold=True))
        draw.text((bx0 + 30, by0 + 112), sub, fill=C_MUTED, font=get_font(16))
        
        # Features box
        draw.rounded_rectangle([bx0 + 30, by0 + 160, bx1 - 30, by1 - 30], radius=12, fill=(20, 20, 40, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((bx0 + 50, by0 + 185), f"• {feat1}", fill=C_TEXT, font=get_font(16))
        draw.text((bx0 + 50, by0 + 225), f"• {feat2}", fill=C_MUTED, font=get_font(15))
        draw.ellipse((bx1 - 65, by0 + 195, bx1 - 50, by0 + 210), fill=col)

    # Bottom Footer Status Strip
    draw_glass_card(draw, (120, 950, 1800, 1020), radius=12, border_color=(255, 255, 255, 20), fill_color=(12, 12, 26, 220))
    draw.text((150, 970), "PRISMA ORM • EXPRESS v5 • ELECTRON • DOCKER ENCLAVE • TYPESCRIPT STRICT", fill=C_MUTED, font=get_font(14, mono=True))
    draw.text((1520, 970), "SYSTEM STATUS: 100% HEALTHY", fill=C_EMERALD, font=get_font(14, mono=True))

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 6. MENUFLOW AI RENDER
# ==========================================
def render_menuflow():
    print("Rendering: MenuFlow AI...")
    img = create_base_canvas(glow_center=(1200, 540), glow_color=(230, 180, 100), glow_radius=600, intensity=0.30)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left: Hospitality Concept & Features
    draw_glass_card(draw, (120, 140, 800, 940), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "FINE DINING & DIGITAL CONCIERGE", (160, 180), font_size=14)
    draw.text((160, 230), "MENUFLOW AI", fill=C_TEXT, font=get_font(36, bold=True))
    draw.text((160, 280), "Gourmet QR Menu, Table Booking & Kitchen Dispatch", fill=C_MUTED, font=get_font(18))
    
    features = [
        ("TABLE TURNOVER ACCELERATION", "+34% Seating Velocity", C_EMERALD),
        ("INSTANT DIGITAL QR MENU", "Multi-Language & Allergen Filter", C_GOLD_LIGHT),
        ("INTEGRATED SMS / TWILIO", "Autonomous Booking Reminders", C_CYAN),
        ("REAL-TIME KITCHEN HUD", "Paperless Line Cook Dispatch", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(features):
        fy = 350 + i * 110
        draw.rounded_rectangle([160, fy, 760, fy + 85], radius=12, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((190, fy + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((190, fy + 38), val, fill=col, font=get_font(24, bold=True, mono=True))
        draw.ellipse((720, fy + 36, 732, fy + 48), fill=col)

    # Right: Elegant Fine Dining Menu & Floorplan HUD
    draw_glass_card(draw, (840, 140, 1800, 940), radius=20, border_color=(197, 160, 89, 80), fill_color=(15, 15, 32, 240))
    draw.text((880, 180), "TABLE 14 (VIP TERRACE) — GUEST CONVERSATION", fill=C_GOLD_LIGHT, font=get_font(15, mono=True))
    
    menu_items = [
        ("Caviar Impérial de Sologne", "Blinis tièdes, crème crue d'Isigny AOC", "€ 140", "Entrée"),
        ("Homard Bleu Rôti au Beurre Demi-Sel", "Mousseline de panais truffée, jus de carcasse corsé", "€ 95", "Plat Signature"),
        ("Filet de Bœuf Wagyu A5 Miyazaki", "Millefeuille de pommes fondantes, échalotes confites", "€ 130", "Plat"),
        ("Soufflé Chaud au Chocolat Grand Cru", "Glace vanille Bourbon de Madagascar", "€ 32", "Dessert"),
    ]
    for k, (dish, desc, price, cat) in enumerate(menu_items):
        dy = 240 + k * 115
        draw.rounded_rectangle([880, dy, 1760, dy + 95], radius=12, fill=(22, 22, 44, 180), outline=(255, 255, 255, 15), width=1)
        draw_badge(draw, cat.upper(), (910, dy + 16), bg_color=(197, 160, 89, 25), border_color=C_GOLD, text_color=C_GOLD_LIGHT, font_size=11)
        draw.text((910, dy + 48), dish, fill=C_TEXT, font=get_font(20, bold=True))
        draw.text((910, dy + 74), desc, fill=C_MUTED, font=get_font(14))
        draw.text((1630, dy + 32), price, fill=C_GOLD_LIGHT, font=get_font(26, bold=True, mono=True))

    # Kitchen Dispatch Bar
    draw.rounded_rectangle([880, 740, 1760, 900], radius=14, fill=(24, 22, 45, 230), outline=C_GOLD, width=1)
    draw.text((910, 765), "LIVE KITCHEN EXPEDITION DISPLAY", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    draw.text((910, 800), "• Order #241 -> Table 14: Fire 2x Wagyu A5 (Med-Rare) | Station 2 Ready", fill=C_TEXT, font=get_font(16))
    draw.text((910, 835), "• Sommelier Call: 1x Château Margaux 2015 decanted for Table 14", fill=C_EMERALD, font=get_font(16))
    draw_badge(draw, "ZERO WAIT DISPATCH", (1540, 840), bg_color=(34, 197, 94, 30), border_color=C_EMERALD, text_color=C_EMERALD, font_size=12)

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 7. LIVREUR CASH & LOGISTICS RENDER
# ==========================================
def render_livreur_cash():
    print("Rendering: Livreur Cash & Logistics...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(34, 197, 94), glow_radius=600, intensity=0.25)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left: Rider Financial Ledger
    draw_glass_card(draw, (120, 140, 840, 940), radius=20, border_color=(34, 197, 94, 70), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "CASH ON DELIVERY RIDER VAULT", (160, 180), bg_color=(34, 197, 94, 30), border_color=C_EMERALD, text_color=C_EMERALD, font_size=14)
    draw.text((160, 230), "LIVREUR CASH", fill=C_TEXT, font=get_font(36, bold=True))
    draw.text((160, 280), "Courier Route Settlement & Fraud-Free COD Escrow", fill=C_MUTED, font=get_font(18))
    
    stats = [
        ("DAILY CASH COLLECTED", "148,500 DZD", C_EMERALD),
        ("RECONCILIATION ACCURACY", "100.0% Audited", C_GOLD_LIGHT),
        ("SUCCESSFUL DROPS TODAY", "28 / 29 Delivered", C_CYAN),
        ("ESCROW SETTLEMENT TIME", "Instant QR Clearance", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(stats):
        sy = 350 + i * 110
        draw.rounded_rectangle([160, sy, 800, sy + 85], radius=12, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((190, sy + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((190, sy + 38), val, fill=col, font=get_font(26, bold=True, mono=True))
        draw.ellipse((760, sy + 36, 772, sy + 48), fill=col)

    # Right: Active Route Dispatch Matrix
    draw_glass_card(draw, (880, 140, 1800, 940), radius=20, border_color=(197, 160, 89, 70), fill_color=(15, 15, 32, 240))
    draw.text((920, 180), "LIVE ROUTE DISPATCH : ALGIERS METROPOLITAN ZONE", fill=C_GOLD_LIGHT, font=get_font(15, mono=True))
    
    stops = [
        ("Drop #18 • Hydra Residential", "iPhone 16 Pro Max 512GB", "215,000 DZD", "DELIVERED ✓", C_EMERALD),
        ("Drop #19 • El Biar Embassy District", "MacBook Pro M4 Max 36GB", "420,000 DZD", "DELIVERED ✓", C_EMERALD),
        ("Drop #20 • Sidi Yahia Boulevard", "AirPods Max Silver Edition", "88,000 DZD", "CURRENT STOP (ETA 4 min)", C_GOLD_LIGHT),
        ("Drop #21 • Dely Ibrahim Tech Park", "Sony FX3 Cinema Camera", "360,000 DZD", "QUEUED (ETA 16:45)", C_CYAN),
    ]
    for k, (loc, pkg, amount, st, col) in enumerate(stops):
        py = 240 + k * 120
        draw.rounded_rectangle([920, py, 1760, py + 100], radius=14, fill=(22, 22, 44, 180), outline=(col[0], col[1], col[2], 90), width=1)
        draw.text((950, py + 18), loc, fill=C_TEXT, font=get_font(18, bold=True))
        draw.text((950, py + 48), pkg, fill=C_MUTED, font=get_font(15))
        draw.text((950, py + 72), f"Amount to Collect: {amount}", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
        draw_badge(draw, st, (1420, py + 30), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)

    # Security Lock Box
    draw.rounded_rectangle([920, 750, 1760, 900], radius=14, fill=(20, 26, 40, 230), outline=C_EMERALD, width=1)
    draw.text((950, 775), "BIOMETRIC VAULT STATUS", fill=C_EMERALD, font=get_font(14, mono=True))
    draw.text((950, 810), "All cash collections are locked in an IoT tamper-proof telemetry box.", fill=C_TEXT, font=get_font(16))
    draw.text((950, 845), "Automatic GPS geofencing unlocks deposit upon arrival at distribution depot.", fill=C_MUTED, font=get_font(14))

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 8. PARFAIT VOYAGE VIP RENDER
# ==========================================
def render_parfait_voyage():
    print("Rendering: Parfait Voyage VIP...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(200, 170, 100), glow_radius=650, intensity=0.28)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Header
    draw_glass_card(draw, (120, 100, 1800, 180), radius=16, border_color=(197, 160, 89, 80), fill_color=(12, 12, 26, 230))
    draw_badge(draw, "PRIVATE AVIATION & BESPOKE TOURS", (160, 122), font_size=13)
    draw.text((530, 120), "PARFAIT VOYAGE VIP CONCIERGE", fill=C_TEXT, font=get_font(26, bold=True))
    draw.text((1460, 126), "MEMBER ID: #PV-8809", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    
    # 3 Curated Luxury Travel Cards
    tours = [
        ("PARIS HAUTE COUTURE", "Private Runway Access, Le Meurice Palace, Michelin 3-Star Dinners", "€ 24,500 / Guest", "Jet Falcon 8X Included", C_GOLD_LIGHT),
        ("DUBAI ROYAL SKYLINE", "Bulgari Resort Penthouse, Desert Falconry Safari, Helipad Dinner", "€ 18,900 / Guest", "Chauffeur Rolls-Royce", C_CYAN),
        ("MALDIVES OVERWATER ATOLL", "Cheval Blanc Randheli, Private Coral Reef Dive, Yacht Charter", "€ 38,000 / Couple", "Seaplane VIP Transfer", C_EMERALD),
    ]
    for idx, (dest, desc, price, perk, col) in enumerate(tours):
        tx0 = 120 + idx * 570
        ty0 = 220
        tx1 = tx0 + 540
        ty1 = 940
        
        draw_glass_card(draw, (tx0, ty0, tx1, ty1), radius=20, border_color=(col[0], col[1], col[2], 90), fill_color=(15, 15, 32, 235))
        draw_badge(draw, f"ITINERARY #{idx+1:02d}", (tx0 + 30, ty0 + 30), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)
        draw.text((tx0 + 30, ty0 + 80), dest, fill=C_TEXT, font=get_font(22, bold=True))
        
        # Details Box
        draw.rounded_rectangle([tx0 + 25, ty0 + 130, tx1 - 25, ty1 - 180], radius=14, fill=(20, 20, 42, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((tx0 + 45, ty0 + 160), "CURATED PRIVILEGES:", fill=C_MUTED, font=get_font(13, mono=True))
        
        # Split desc
        lines = desc.split(", ")
        for li, l in enumerate(lines):
            draw.text((tx0 + 45, ty0 + 200 + li * 40), f"• {l}", fill=C_TEXT, font=get_font(15))
            
        draw.text((tx0 + 45, ty0 + 360), f"✓ {perk}", fill=col, font=get_font(15, bold=True))
        
        # Price and CTA
        draw.text((tx0 + 30, ty1 - 140), "ALL-INCLUSIVE INVESTMENT", fill=C_MUTED, font=get_font(12, mono=True))
        draw.text((tx0 + 30, ty1 - 110), price, fill=col, font=get_font(26, bold=True, mono=True))
        draw_badge(draw, "RESERVE SUITE", (tx0 + 30, ty1 - 60), bg_color=(col[0], col[1], col[2], 40), border_color=col, text_color=col, font_size=13)

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 9. AUTOSHINE PRO RENDER
# ==========================================
def render_autoshine():
    print("Rendering: Autoshine Pro...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(220, 180, 80), glow_radius=600, intensity=0.28)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Left: Studio Aesthetics & Detailing Science
    draw_glass_card(draw, (120, 140, 820, 940), radius=20, border_color=(197, 160, 89, 70), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "CERAMIC COATING & PAINT CORRECTION", (160, 180), font_size=14)
    draw.text((160, 230), "AUTOSHINE PRO", fill=C_TEXT, font=get_font(36, bold=True))
    draw.text((160, 280), "Ultra-Luxury Automotive Detailing & Paint Protection Studio", fill=C_MUTED, font=get_font(18))
    
    pillars = [
        ("9H CERAMIC HARDNESS", "10-Year Molecular Glass Bond", C_GOLD_LIGHT),
        ("PAINT CORRECTION DEPTH", "100% Swirl & Scratch Elimination", C_EMERALD),
        ("SEL-HEALING PPF FILM", "Military Grade Urethane Armor", C_CYAN),
        ("STUDIO LIGHTING MATRIX", "6500K CRI 98 Color Inspection", C_TEXT),
    ]
    for i, (label, val, col) in enumerate(pillars):
        py = 350 + i * 110
        draw.rounded_rectangle([160, py, 780, py + 85], radius=12, fill=(18, 20, 38, 200), outline=(255, 255, 255, 20), width=1)
        draw.text((190, py + 14), label, fill=C_MUTED, font=get_font(13, mono=True))
        draw.text((190, py + 38), val, fill=col, font=get_font(24, bold=True, mono=True))
        draw.ellipse((740, py + 36, 752, py + 48), fill=col)

    # Right: Treatment Packages & Inspection HUD
    draw_glass_card(draw, (860, 140, 1800, 940), radius=20, border_color=(197, 160, 89, 80), fill_color=(15, 15, 32, 240))
    draw.text((900, 180), "CURRENT TREATMENT IN PROGRESS : PORSCHE 911 GT3 RS", fill=C_GOLD_LIGHT, font=get_font(15, mono=True))
    
    steps = [
        ("Step 01 • Decontamination & Snow Foam Wash", "pH Neutral Snow Foam + Iron fallout remover", "COMPLETED ✓", C_EMERALD),
        ("Step 02 • 3-Stage Rotary Machine Polish", "Rupes BigFoot 21 + Menzerna 400 compound", "COMPLETED ✓", C_EMERALD),
        ("Step 03 • Gtechniq Crystal Serum Ultra 9H", "Dual-layer quartz ceramic coating applied", "CURING IN BOOTH (84°C)", C_GOLD_LIGHT),
        ("Step 04 • Interior Leather Hide Rejuvenation", "Swissvax Leather Milk + UV barrier protection", "QUEUED", C_CYAN),
    ]
    for k, (step, desc, st, col) in enumerate(steps):
        sy = 240 + k * 120
        draw.rounded_rectangle([900, sy, 1760, sy + 100], radius=14, fill=(22, 22, 44, 180), outline=(col[0], col[1], col[2], 90), width=1)
        draw.text((930, sy + 18), step, fill=C_TEXT, font=get_font(18, bold=True))
        draw.text((930, sy + 48), desc, fill=C_MUTED, font=get_font(15))
        draw_badge(draw, st, (1400, sy + 30), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)

    # Guarantee Seal
    draw.rounded_rectangle([900, 750, 1760, 900], radius=14, fill=(24, 22, 45, 230), outline=C_GOLD, width=1)
    draw.text((930, 775), "CERTIFICATE OF CONCOURS AUTHENTICITY", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    draw.text((930, 810), "Every vehicle receives a signed warranty passport and digital paint gauge report.", fill=C_TEXT, font=get_font(16))
    draw.text((930, 845), "Hydrophobic contact angle: 118° • UV Protection: 100% • Mirror Gloss: 99.8 GU", fill=C_MUTED, font=get_font(14))

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

# ==========================================
# 10. AL-LAMEA GLOBAL TRADE RENDER
# ==========================================
def render_allamea():
    print("Rendering: Al-Lamea Global...")
    img = create_base_canvas(glow_center=(WIDTH // 2, HEIGHT // 2), glow_color=(200, 160, 80), glow_radius=650, intensity=0.28)
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Header
    draw_glass_card(draw, (120, 120, 1800, 210), radius=16, border_color=(197, 160, 89, 80), fill_color=(12, 12, 26, 235))
    draw_badge(draw, "GLOBAL FREIGHT & COMMODITY TRADING", (160, 145), font_size=13)
    draw.text((540, 142), "Al-Lamea International — Trilingual Enterprise Portal", fill=C_TEXT, font=get_font(26, bold=True))
    draw.text((1420, 148), "TRILINGUAL: AR • FR • EN", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))
    
    # 4 Trade Corridors
    corridors = [
        ("MEDITERRANEAN MARITIME CORRIDOR", "Marseille / Valencia -> Algiers Port", "Container Cargo & Bulk Grain", "Daily Automated Port Clearance", C_GOLD_LIGHT),
        ("MIDDLE EAST ENERGY & RAW MATERIALS", "Dubai (Jebel Ali) -> North Africa", "Petrochemicals, Polymers & Steel", "Letter of Credit (LC) Secured", C_CYAN),
        ("TRANS-SAHARAN FREIGHT LOGISTICS", "Algiers -> Tamanrasset -> Niger", "Heavy Truck Fleets & Overland Routes", "Real-Time Satellite Telemetry", C_EMERALD),
        ("EAST ASIA INDUSTRIAL SOURCING", "Shanghai / Ningbo -> Mediterranean", "Electronics & Specialized Machinery", "ISO 9001 / Bureau Veritas Certified", (168, 85, 247)),
    ]
    for idx, (title, route, cargo, compliance, col) in enumerate(corridors):
        r = idx // 2
        c = idx % 2
        bx0 = 120 + c * 860
        by0 = 240 + r * 350
        bx1 = bx0 + 820
        by1 = by0 + 320
        
        draw_glass_card(draw, (bx0, by0, bx1, by1), radius=18, border_color=(col[0], col[1], col[2], 90), fill_color=(15, 15, 32, 235))
        draw_badge(draw, f"CORRIDOR #{idx+1:02d}", (bx0 + 30, by0 + 25), bg_color=(col[0], col[1], col[2], 30), border_color=col, text_color=col, font_size=12)
        draw.text((bx0 + 30, by0 + 75), title, fill=C_TEXT, font=get_font(20, bold=True))
        draw.text((bx0 + 30, by0 + 110), route, fill=C_MUTED, font=get_font(15))
        
        # Details Box
        draw.rounded_rectangle([bx0 + 30, by0 + 155, bx1 - 30, by1 - 30], radius=12, fill=(20, 20, 40, 180), outline=(255, 255, 255, 15), width=1)
        draw.text((bx0 + 50, by0 + 180), f"• Cargo: {cargo}", fill=C_TEXT, font=get_font(15))
        draw.text((bx0 + 50, by0 + 220), f"• Protocol: {compliance}", fill=col, font=get_font(14, mono=True))
        draw.ellipse((bx1 - 65, by0 + 195, bx1 - 50, by0 + 210), fill=col)

    # Bottom Footer Strip
    draw_glass_card(draw, (120, 950, 1800, 1020), radius=12, border_color=(255, 255, 255, 20), fill_color=(12, 12, 26, 220))
    draw.text((150, 970), "REACT 19 • GSAP 3 • i18n RTL SUPPORT • LIGHTHOUSE 98% • REST API", fill=C_MUTED, font=get_font(14, mono=True))
    draw.text((1480, 970), "INTERNATIONAL ACCREDITED ✓", fill=C_GOLD_LIGHT, font=get_font(14, mono=True))

    img = Image.alpha_composite(img, overlay)
    return img.convert("RGB")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if os.path.exists(AGENCY_DIR):
        os.makedirs(AGENCY_DIR, exist_ok=True)
        
    renders = [
        ("stonelink-render.jpg", render_stonelink),
        ("anis-phone-render.jpg", render_anis_phone),
        ("resort-os-render.jpg", render_resort_os),
        ("commercia-render.jpg", render_commercia),
        ("nexus-horizon-render.jpg", render_nexus_horizon),
        ("menuflow-render.jpg", render_menuflow),
        ("livreur-cash-render.jpg", render_livreur_cash),
        ("parfait-voyage-render.jpg", render_parfait_voyage),
        ("autoshine-render.jpg", render_autoshine),
        ("allamea-render.jpg", render_allamea),
    ]
    
    for filename, fn in renders:
        out_path = os.path.join(OUTPUT_DIR, filename)
        im = fn()
        im.save(out_path, "JPEG", quality=95, optimize=True)
        print(f"Saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")
        
        # Also copy to agency if directory exists
        if os.path.exists(AGENCY_DIR):
            agency_path = os.path.join(AGENCY_DIR, filename)
            im.save(agency_path, "JPEG", quality=95, optimize=True)
            print(f"Synced to Agency: {agency_path}")

    print("\nALL 10 LUXURY RENDERS COMPLETED SUCCESSFULLY!")

if __name__ == "__main__":
    main()
