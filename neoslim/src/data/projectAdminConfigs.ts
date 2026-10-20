export interface ProjectStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  bg: string;
  description: string;
}

export interface ProjectQuickAction {
  id: string;
  label: string;
  iconName: string;
  actionText: string;
  actionToast: string;
}

export interface ProjectLead {
  name: string;
  companyOrLocation: string;
  type: string;
  value: string;
  date: string;
  phone?: string;
  email?: string;
  status: 'new' | 'contacted' | 'proposal' | 'won';
}

export interface ProjectAdminConfig {
  projectId: string;
  operatorRole: string;
  headline: string;
  notice: string;
  stats: ProjectStat[];
  quickActions: ProjectQuickAction[];
  recentLeads: ProjectLead[];
}

export const projectAdminConfigs: Record<string, ProjectAdminConfig> = {
  'aegis-alpha-mt5': {
    projectId: 'aegis-alpha-mt5',
    operatorRole: 'Quantitative Portfolio Lead',
    headline: 'High-Frequency Algorithmic Execution Cockpit',
    notice: 'Risk Shield Hardware Breaker is active at 2.0% max daily drawdown. IPC latency to MetaTrader 5 terminal is 0.74ms.',
    stats: [
      { label: 'Daily Floating PnL', value: '+€4,850.20', change: '+18.4%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Gold & EURUSD positions' },
      { label: 'MT5 IPC Latency', value: '0.74 ms', change: '-35%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Zero socket delay' },
      { label: 'Risk Shield Breaker', value: 'ARMED 2.0%', change: 'Optimal', trend: 'neutral', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'Auto-liquidation active' },
      { label: 'Executed Orders', value: '342 Orders', change: '+24%', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: '100% fill rate' },
    ],
    quickActions: [
      { id: 'arm-shield', label: 'Verify Risk Shield Circuit', iconName: 'ShieldAlert', actionText: 'Test Circuit', actionToast: 'Risk Shield circuit breaker verified: Drawdown capped at 2.0%.' },
      { id: 'tick-stream', label: 'Flush Canvas Tick Buffer', iconName: 'Activity', actionText: 'Flush 60FPS', actionToast: 'Canvas 60FPS tick stream re-synchronized.' },
      { id: 'telegram-telemetry', label: 'Dispatch Telemetry to Telegram', iconName: 'Send', actionText: 'Send Alert', actionToast: 'Instant PnL and trade log pushed to VIP Telegram channel.' },
      { id: 'export-ledger', label: 'Export MQL5 IPC Trade Audit', iconName: 'FileText', actionText: 'Download CSV', actionToast: 'Audit ledger downloaded.' },
    ],
    recentLeads: [
      { name: 'Swiss Heritage Capital', companyOrLocation: 'Geneva', type: 'Discretionary MT5 Sub-Account', value: '€250,000 AUM', date: '40m ago', email: 'trading@swissheritage.ch', phone: '+41 22 819 0000', status: 'won' },
      { name: 'Al-Rayyan Private Wealth', companyOrLocation: 'Dubai DIFC', type: 'Gold Scalping Strategy', value: '€500,000 AUM', date: '3h ago', email: 'invest@alrayyan.ae', phone: '+971 4 362 7000', status: 'new' },
      { name: 'Monaco Alpha Partners', companyOrLocation: 'Monte Carlo', type: 'Multi-Broker FIX Bridge', value: '€180,000 AUM', date: 'Yesterday', email: 'exec@monacoalpha.mc', phone: '+377 98 06 20 00', status: 'proposal' },
    ]
  },

  'el-mouhami-pro': {
    projectId: 'el-mouhami-pro',
    operatorRole: 'Bâtonnier & Legal AI Administrator',
    headline: 'Bilingual Voice Intake & Litigation Triage Hub',
    notice: 'Web Speech API and Darija/French linguistic models running with 98.4% legal entity recognition accuracy.',
    stats: [
      { label: 'Bilingual Intakes Today', value: '28 Dossiers', change: '+32%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Arabe & Français' },
      { label: 'Triage Accuracy', value: '98.4%', change: '+4.2%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Domain classification' },
      { label: 'Urgent Filings (24h)', value: '6 Contentieux', change: 'Flagged', trend: 'neutral', color: 'text-rose-400', bg: 'bg-rose-500/10', description: 'Pénal & Référé' },
      { label: 'WhatsApp Dispatches', value: '24 Transmis', change: '+18%', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'Bordereaux pièces' },
    ],
    quickActions: [
      { id: 'simulate-voice', label: 'Test Voice Waveform Simulation', iconName: 'Mic', actionText: 'Test Darija Voice', actionToast: 'Voice AI synthesized greeting in Algerian Darija: qualification active.' },
      { id: 'generate-brief', label: 'Compile Encrypted Counsel Brief', iconName: 'FileCheck', actionText: 'Compile PDF', actionToast: 'Legal instruction brief compiled with 256-bit AES encryption.' },
      { id: 'sync-supabase', label: 'Revalidate Supabase RLS Policies', iconName: 'Lock', actionText: 'Check Security', actionToast: 'Row-Level Security validated: 100% confidential isolation.' },
      { id: 'whatsapp-batch', label: 'Send WhatsApp Document Link', iconName: 'MessageSquare', actionText: 'Notify Client', actionToast: 'Secure document upload link dispatched to client WhatsApp.' },
    ],
    recentLeads: [
      { name: 'SARL Atlas Agro-Industrie', companyOrLocation: 'Blida & Alger', type: 'Litige Commercial & Recouvrement', value: '4 800 €', date: '1h ago', email: 'direction@atlasagro.dz', phone: '+213 550 44 22 11', status: 'new' },
      { name: 'Dr. Karim Benmansour', companyOrLocation: 'Oran', type: 'Droit Médical & Foncier', value: '3 500 €', date: '4h ago', email: 'k.benmansour@cliniqueoran.dz', phone: '+213 661 20 30 40', status: 'contacted' },
      { name: 'Cabinet d\'Affaires Haussmann', companyOrLocation: 'Paris 8e', type: 'Droit des Sociétés Transfrontalier', value: '7 200 €', date: 'Yesterday', email: 'contact@haussmann-avocats.fr', phone: '+33 1 42 68 00 00', status: 'won' },
    ]
  },

  'kachef': {
    projectId: 'kachef',
    operatorRole: 'Fraud Prevention Director',
    headline: '58 Wilayas COD Radar & Fake Order Neutralizer',
    notice: 'Collaborative blacklists across 58 wilayas updated 12 minutes ago. 82% bogus delivery reduction maintained.',
    stats: [
      { label: 'Fraud Detection Rate', value: '82.0%', change: '-82% loss', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Ghost order reduction' },
      { label: 'Wilayas Synchronized', value: '58 / 58', change: '100% live', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'National coverage' },
      { label: 'Verified Phone Leads', value: '1,420 Numbers', change: '+44%', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'Algerian carriers' },
      { label: 'Saved Shipping Costs', value: '840,000 DZD', change: '+28%', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Prevented returns' },
    ],
    quickActions: [
      { id: 'scan-radar', label: 'Scan 58 Wilayas Fraud Matrix', iconName: 'Radar', actionText: 'Run Deep Scan', actionToast: '58 Wilayas radar refreshed: 14 fraudulent clusters isolated.' },
      { id: 'verify-bulk', label: 'Verify Phone Number Callset', iconName: 'CheckCircle', actionText: 'Verify Batch', actionToast: 'Batch of 150 customer numbers checked: 142 valid, 8 flagged.' },
      { id: 'whatsapp-score', label: 'Broadcast Anti-Fraud Flag', iconName: 'AlertTriangle', actionText: 'Sync Network', actionToast: 'Merchant collective notified of newly identified fake buyer.' },
      { id: 'export-report', label: 'Generate COD Logistics Audit', iconName: 'Download', actionText: 'Export Audit', actionToast: 'Full logistics efficiency audit exported.' },
    ],
    recentLeads: [
      { name: 'E-Shop DzTech Flagship', companyOrLocation: 'Alger Centre', type: 'Intégration API Kachef 58 Wilayas', value: '2 800 €', date: '25m ago', email: 'contact@dztech.store', phone: '+213 555 12 34 56', status: 'new' },
      { name: 'Nordic Electronics Algérie', companyOrLocation: 'Sétif & Constantine', type: 'Module Anti-Colis Piégé Prestashop', value: '3 200 €', date: '5h ago', email: 'sales@nordicdz.com', phone: '+213 662 98 76 54', status: 'proposal' },
      { name: 'Express Atlas Couriers', companyOrLocation: 'Oran', type: 'Partenariat Transporteur National', value: '6 500 €', date: '2d ago', email: 'direction@atlascouriers.dz', phone: '+213 770 11 22 33', status: 'won' },
    ]
  },

  'stonelink': {
    projectId: 'stonelink',
    operatorRole: 'AI Infrastructure Architect',
    headline: 'OmniRoute Multi-Model Gateway & Voice Softphone',
    notice: 'Multi-LLM routing cluster operational: Claude 3.5 Sonnet, Gemini 2.5 Pro, GPT-4o, DeepSeek R1 with sub-150ms failover.',
    stats: [
      { label: 'Cluster Resilience', value: '99.99%', change: 'Zero drop', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Automated fallback' },
      { label: 'Average Dispatch Latency', value: '142 ms', change: '-45ms', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Fastest model route' },
      { label: 'Token Compression (RTK)', value: '68.4%', change: '+12%', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Caveman algorithm' },
      { label: 'VoIP Softphone Minutes', value: '412 Min', change: '+38%', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Twilio WebRTC' },
    ],
    quickActions: [
      { id: 'test-fallback', label: 'Simulate Primary Provider Outage', iconName: 'Shuffle', actionText: 'Test Failover', actionToast: 'OmniRoute fallback triggered: switched from Claude to Gemini in 28ms.' },
      { id: 'compress-cache', label: 'Purge & Prime RTK Token Cache', iconName: 'Zap', actionText: 'Prime Cache', actionToast: 'RTK token cache primed: 68.4% context compression achieved.' },
      { id: 'webrtc-call', label: 'Ping Twilio WebRTC Softphone', iconName: 'PhoneCall', actionText: 'Dial Echo Test', actionToast: 'Twilio WebRTC audio pipeline connected with 42ms round-trip.' },
      { id: 'export-tokens', label: 'Download Multi-LLM Usage Telemetry', iconName: 'FileSpreadsheet', actionText: 'Download CSV', actionToast: 'Full token breakdown downloaded.' },
    ],
    recentLeads: [
      { name: 'Fintech Velocity Europe', companyOrLocation: 'Paris & London', type: 'Passerelle Multi-LLM Enterprise', value: '14 000 €', date: '1h ago', email: 'tech@velocityfin.eu', phone: '+33 1 70 80 90 00', status: 'new' },
      { name: 'Agence B2B Scale Hub', companyOrLocation: 'Montréal', type: 'Prospection Multi-Agents & VoIP', value: '8 500 €', date: '3h ago', email: 'founders@scalehub.ca', phone: '+1 514 800 0000', status: 'contacted' },
      { name: 'DataCore Private Cloud', companyOrLocation: 'Zurich', type: 'Routage Souverain On-Premise', value: '18 500 €', date: 'Yesterday', email: 'security@datacore.ch', phone: '+41 44 200 0000', status: 'won' },
    ]
  },

  'anis-phone': {
    projectId: 'anis-phone',
    operatorRole: 'Luxury Commerce Director',
    headline: 'Titanium Mobile Store & 3D Topography Logistics',
    notice: 'Three.js 60FPS configurator running with hardware-accelerated shaders. 58 Wilayas sub-24h COD courier pipeline connected.',
    stats: [
      { label: 'Gross Volume (Monthly)', value: '48.2M DZD', change: '+36%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Flagship devices' },
      { label: '3D Configurator Sessions', value: '1,840 Visits', change: '+52%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Three.js interaction' },
      { label: '58 Wilayas Dispatches', value: '89 Orders Today', change: '+14%', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'COD Express Hub' },
      { label: 'Dispute / Return Rate', value: '0.8%', change: 'Industry low', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Escrow protected' },
    ],
    quickActions: [
      { id: 'dispatch-batch', label: 'Authorize 58 Wilayas Courier Batch', iconName: 'Truck', actionText: 'Dispatch Orders', actionToast: '89 flagship smartphones dispatched with tamper-evident seal.' },
      { id: 'r3f-rebuild', label: 'Recompile 3D Smartphone Shaders', iconName: 'Box', actionText: 'Recompile 60FPS', actionToast: 'Three.js shaders compiled: optimal frame latency on mobile.' },
      { id: 'escrow-confirm', label: 'Trigger SMS OTP Delivery Code', iconName: 'Key', actionText: 'Send Codes', actionToast: 'Biometric pickup codes sent to 89 awaiting customers.' },
      { id: 'stock-sync', label: 'Synchronize Supabase Inventory', iconName: 'RefreshCw', actionText: 'Sync Stock', actionToast: 'Live stock reconciled across Algiers & Oran vaults.' },
    ],
    recentLeads: [
      { name: 'Corporate Fleet Order (SARL)', companyOrLocation: 'Hydra, Alger', type: '25x iPhone 16 Pro Max 1TB', value: '5,375,000 DZD', date: '30m ago', email: 'procurement@elwatan-group.dz', phone: '+213 550 99 88 77', status: 'won' },
      { name: 'VIP Private Client', companyOrLocation: 'Constantine', type: 'Galaxy Z Fold 6 Special Gold Edition', value: '380,000 DZD', date: '2h ago', email: 'vip@oranlux.dz', phone: '+213 661 55 44 33', status: 'contacted' },
      { name: 'Tech Store Partner', companyOrLocation: 'Annaba', type: 'Apple Ecosystem Package Bundle', value: '1,450,000 DZD', date: 'Yesterday', email: 'contact@annabagadgets.com', phone: '+213 770 44 33 22', status: 'proposal' },
    ]
  },

  'gestia': {
    projectId: 'gestia',
    operatorRole: 'Head of PropTech & Asset Management',
    headline: 'AI Rental Property & Biometric Tenant OS',
    notice: '100% automated rent receipting active. AI OCR lease ingestion parsing documents with zero human intervention.',
    stats: [
      { label: 'Portfolio Occupancy', value: '96.2%', change: '+3.8%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: '18 trophy residences' },
      { label: 'Unpaid Rent / Arrears', value: '0.00 €', change: 'Zero debt', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Automated reminders' },
      { label: 'AI OCR Lease Parsed', value: '42 Leases', change: '+100%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Sub-second parsing' },
      { label: 'Active Mobile Keys', value: '38 Keyless', change: '+8 Passes', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'Biometric credentials' },
    ],
    quickActions: [
      { id: 'ocr-parse', label: 'Process Scanned Lease Agreement', iconName: 'FileSearch', actionText: 'Run AI OCR', actionToast: 'Lease scanned: extracted rent, deposits, guarantor and expiry.' },
      { id: 'receipt-batch', label: 'Issue Monthly Rent Receipts', iconName: 'Receipt', actionText: 'Batch Generate', actionToast: '18 certified digital receipts dispatched with QR code timestamp.' },
      { id: 'keyless-grant', label: 'Generate Biometric Keyless Pass', iconName: 'Fingerprint', actionText: 'Grant Access', actionToast: 'Encrypted mobile pass delivered to incoming VIP tenant.' },
      { id: 'arrears-bot', label: 'Run Automated WhatsApp Reminder', iconName: 'BellRing', actionText: 'Send Notice', actionToast: 'Polite graduated payment reminder scheduled.' },
    ],
    recentLeads: [
      { name: 'Monaco Prestige Living', companyOrLocation: 'Monaco Fontvieille', type: 'Gestion Intégrale 12 Penthouses', value: '12 500 €', date: '1h ago', email: 'admin@monacoprestige.mc', phone: '+377 98 06 00 00', status: 'proposal' },
      { name: 'Bailleur Privé Île Saint-Louis', companyOrLocation: 'Paris 4e', type: 'PropTech & Encaissement Loyers', value: '4 200 €', date: '6h ago', email: 'saintlouis@parisinvest.fr', phone: '+33 1 43 25 00 00', status: 'new' },
      { name: 'Résidence Palmeraie', companyOrLocation: 'Cannes', type: 'Conciergerie Automatisée & Clés', value: '6 800 €', date: '2d ago', email: 'palmeraie@cannesvillas.fr', phone: '+33 4 93 39 00 00', status: 'won' },
    ]
  },

  'resortos': {
    projectId: 'resortos',
    operatorRole: 'Hospitality & Marina Operations Director',
    headline: 'Multi-Tenant Luxury Resort & Yacht Marina ERP',
    notice: 'Multi-tenant schema isolation verified across 18 private estates. Real-time RevPAR telemetry at €1,840.00/night.',
    stats: [
      { label: 'Portfolio RevPAR', value: '€1,840 / Nt', change: '+14.2%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Peak summer rate' },
      { label: 'Mooring Berth Occupancy', value: '94.6%', change: '+8.0%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Superyacht marina' },
      { label: 'Multi-Tenant Schemas', value: '18 Isolated DBs', change: '100% secure', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Zero cross-talk' },
      { label: 'Room Service SLA', value: '8.4 Minutes', change: '-2.1m', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Ultra-luxury target' },
    ],
    quickActions: [
      { id: 'berth-assign', label: 'Assign Superyacht Berth & Power', iconName: 'Anchor', actionText: 'Assign Mooring', actionToast: 'Berth Alpha 02 assigned to M/Y Eclipse: shore power & water armed.' },
      { id: 'sommelier-order', label: 'Dispatch VIP Wine Tasting Request', iconName: 'Wine', actionText: 'Notify Cellar', actionToast: 'Dom Pérignon P2 2004 tasting prepared for Suite 402.' },
      { id: 'helipad-clear', label: 'Grant Helipad Clearance & Flight Path', iconName: 'Navigation', actionText: 'Clear Helipad', actionToast: 'Helipad Alpha cleared: transfer from Nice Airport approved.' },
      { id: 'consolidate-revpar', label: 'Consolidate Global Financials', iconName: 'FileText', actionText: 'Run Audit', actionToast: 'Financial consolidation complete across all 18 resort tenants.' },
    ],
    recentLeads: [
      { name: 'Villa Santa Monica Resort', companyOrLocation: 'Saint-Jean-Cap-Ferrat', type: 'Déploiement ERP & Marina 30 Anneaux', value: '28 000 €', date: '45m ago', email: 'director@santamonica-capferrat.com', phone: '+33 4 93 76 00 00', status: 'won' },
      { name: 'Porto Cervo Luxury Marina', companyOrLocation: 'Sardinia, Italy', type: 'Gestion d\'Amarrage & Télémétrie Météo', value: '22 500 €', date: '4h ago', email: 'harbor@portocervo.it', phone: '+39 0789 905111', status: 'proposal' },
      { name: 'Ibiza Private Atoll Estates', companyOrLocation: 'Balearic Islands', type: 'Conciergerie Multi-Tenant & Clés VIP', value: '16 000 €', date: 'Yesterday', email: 'vip@ibiza-estates.es', phone: '+34 971 31 00 00', status: 'contacted' },
    ]
  },

  'commercia': {
    projectId: 'commercia',
    operatorRole: 'Retail Systems & POS Architect',
    headline: 'Offline-First POS & ESC/POS Hardware Console',
    notice: 'Local SQLite offline buffer synchronized. ESC/POS thermal printers, barcode scanners and cash drawers operating at zero latency.',
    stats: [
      { label: 'Gross Volume (Daily)', value: '221,102 DZD', change: '+22%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Flagship Store' },
      { label: 'Offline Resilience', value: '100% SQLite', change: 'Zero lag', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Local cache active' },
      { label: 'ESC/POS Printer Status', value: 'READY (80mm)', change: 'Connected', trend: 'neutral', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Thermal printer' },
      { label: 'Barcode Scan Speed', value: '42 ms', change: 'Instant', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: 'USB/Serial drivers' },
    ],
    quickActions: [
      { id: 'print-test', label: 'Print ESC/POS Thermal Test Receipt', iconName: 'Printer', actionText: 'Print Receipt', actionToast: 'ESC/POS test receipt printed: cash drawer pulse signal sent.' },
      { id: 'sync-cloud', label: 'Synchronize Local SQLite to Cloud', iconName: 'CloudUpload', actionText: 'Sync Transactions', actionToast: '142 offline transactions reconciled with central PostgreSQL.' },
      { id: 'barcode-scan', label: 'Simulate Barcode SKU Ingestion', iconName: 'Barcode', actionText: 'Scan SKU', actionToast: 'SKU-9902 scanned: Barista Grade Espresso Machine added to ticket.' },
      { id: 'cash-close', label: 'Generate Daily Z-Report & Cash Close', iconName: 'Calculator', actionText: 'Generate Z-Report', actionToast: 'Official fiscal Z-report compiled: cash counted matches receipts.' },
    ],
    recentLeads: [
      { name: 'Chaîne de Cafés & Torréfaction', companyOrLocation: 'Alger & Blida (6 boutiques)', type: 'Équipement 6 Caisses POS & CRM', value: '4 800 €', date: '1h ago', email: 'gestion@torrefaction-dz.com', phone: '+213 550 33 44 55', status: 'new' },
      { name: 'Supermarché Gourmet Sidi Yahia', companyOrLocation: 'Hydra, Alger', type: 'Migration Caisse Tactile & Lecteurs', value: '3 600 €', date: '5h ago', email: 'direction@gourmet-sidiyahia.dz', phone: '+213 661 77 88 99', status: 'won' },
      { name: 'Boutique Mode & Maroquinerie', companyOrLocation: 'Oran', type: 'Système POS avec application mobile', value: '2 400 €', date: 'Yesterday', email: 'contact@oranfashion.dz', phone: '+213 770 22 11 00', status: 'contacted' },
    ]
  },

  'nexus-horizon': {
    projectId: 'nexus-horizon',
    operatorRole: 'Chief Technology Officer',
    headline: 'Sovereign Desktop Enterprise Operating System',
    notice: 'Zero-Knowledge Enclave active. Hybrid offline-local SQLite synced bidirectionally to Dockerized PostgreSQL cluster.',
    stats: [
      { label: 'Data Cluster Health', value: '100% Sovereign', change: 'Air-gapped', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Zero cloud leaks' },
      { label: 'Active Modules', value: '4 Sandboxes', change: 'Isolated', trend: 'neutral', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Finance, HR, ERP, DB' },
      { label: 'Encrypted Payroll Vault', value: '256-bit AES', change: 'Compliant', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Confidential ledger' },
      { label: 'Sync Replication Lag', value: '0.00 ms', change: 'Instant', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Prisma ORM IPC' },
    ],
    quickActions: [
      { id: 'airgap-sync', label: 'Verify Air-Gap Database Replication', iconName: 'Database', actionText: 'Run Check', actionToast: 'Air-gap sync verified: zero unauthorized egress packets.' },
      { id: 'sandbox-audit', label: 'Audit Module Security Sandboxes', iconName: 'ShieldCheck', actionText: 'Run Audit', actionToast: 'Electron context isolation & CSP: 100% compliant.' },
      { id: 'ledger-close', label: 'Close Financial Month in Ledger', iconName: 'BookOpen', actionText: 'Lock Month', actionToast: 'Double-entry ledger closed and sealed with cryptographic hash.' },
      { id: 'docker-rebuild', label: 'Trigger Enclave Re-Encryption', iconName: 'Lock', actionText: 'Re-encrypt', actionToast: 'Enclave master keys rotated successfully.' },
    ],
    recentLeads: [
      { name: 'Société Nationale d\'Ingénierie', companyOrLocation: 'Alger', type: 'ERP Souverain Décentralisé & RH', value: '35 000 €', date: '2h ago', email: 'dsi@sni-algerie.dz', phone: '+213 21 69 00 00', status: 'new' },
      { name: 'Holding d\'Investissement Privé', companyOrLocation: 'Genève & Paris', type: 'Système Comptable & Coffre-Fort', value: '24 000 €', date: 'Yesterday', email: 'board@holding-geneve.ch', phone: '+41 22 700 00 00', status: 'proposal' },
      { name: 'Laboratoires Pharmaceutiques', companyOrLocation: 'Constantine', type: 'Gestion de Stocks & Traçabilité Lots', value: '18 000 €', date: '3d ago', email: 'qualite@pharmaconstantine.dz', phone: '+213 31 90 00 00', status: 'won' },
    ]
  },

  'menuflow': {
    projectId: 'menuflow',
    operatorRole: 'Executive Chef & Maître d\'Hôtel',
    headline: 'Gourmet QR Menu & Smart Floorplan Matrix',
    notice: 'Table turnover accelerated by +34%. Live kitchen display showing zero wait dispatch across pastry, larder and hot line.',
    stats: [
      { label: 'Table Turnover Speed', value: '+34.0%', change: 'Accelerated', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Table matrix flow' },
      { label: 'Active Reservations', value: '28 / 30 Tables', change: '93% full', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'VIP Terrace full' },
      { label: 'Average Spend / Seat', value: '€ 185.00', change: '+24%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Wine pairings active' },
      { label: 'Twilio SMS Booking Confirm', value: '99.8%', change: 'Automated', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Sub-second reply' },
    ],
    quickActions: [
      { id: 'sommelier-pair', label: 'Suggest Vintage Wine Pairing for Table 14', iconName: 'Wine', actionText: 'Recommend', actionToast: 'Table 14 Wagyu A5 paired with Château Margaux 2015 Premier Grand Cru.' },
      { id: 'kitchen-fire', label: 'Fire Hot Line Order to Expediter', iconName: 'Flame', actionText: 'Fire Table', actionToast: 'Order #241 sent to hot line: 2x Wagyu A5 cooking now.' },
      { id: 'sms-blast', label: 'Send Twilio VIP Confirmation SMS', iconName: 'MessageCircle', actionText: 'Send SMS', actionToast: 'Reservation confirmed via Twilio SMS: table held for 15 minutes.' },
      { id: 'qr-regenerate', label: 'Update Dynamic QR Menu Prices', iconName: 'QrCode', actionText: 'Update Menu', actionToast: 'Digital QR menus refreshed with daily market specials.' },
    ],
    recentLeads: [
      { name: 'Le Pavillon de Sologne', companyOrLocation: 'Loir-et-Cher, France', type: 'Déploiement Réservation & Menu QR', value: '4 800 €', date: '30m ago', email: 'direction@pavillon-sologne.fr', phone: '+33 2 54 00 00 00', status: 'won' },
      { name: 'Restaurant L\'Écrin d\'Or', companyOrLocation: 'Hydra, Alger', type: 'Plan de Salle & Commande Sommelier', value: '3 200 €', date: '4h ago', email: 'reservation@ecrindor-alger.com', phone: '+213 550 77 66 55', status: 'new' },
      { name: 'Lounge Club Marina Bay', companyOrLocation: 'Cannes', type: 'Menu Digital VIP & Alertes SMS', value: '5 400 €', date: 'Yesterday', email: 'vip@marinabay-cannes.fr', phone: '+33 4 93 00 00 00', status: 'contacted' },
    ]
  },

  'livreur-cash': {
    projectId: 'livreur-cash',
    operatorRole: 'Chief Logistics Officer',
    headline: 'COD Route Settlement & Biometric Cash Vault',
    notice: '148,500 DZD collected today with 0.0% variance. IoT tamper-evident box geofenced to distribution hub.',
    stats: [
      { label: 'Cash in Transit Today', value: '148,500 DZD', change: '100% Match', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Zero discrepancy' },
      { label: 'Completed Deliveries', value: '28 / 29 Drops', change: '96.5% rate', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Algiers North Zone' },
      { label: 'SMS OTP Verified', value: '100.0%', change: 'Encrypted', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Customer sign-off' },
      { label: 'IoT Vault Status', value: 'LOCKED & GEOFENCED', change: 'Secure', trend: 'neutral', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'GPS perimeter active' },
    ],
    quickActions: [
      { id: 'vault-unlock', label: 'Unlock IoT Vault at Depot Gate', iconName: 'Unlock', actionText: 'Unlock Vault', actionToast: 'Geofence validated at depot: biometric vault opened for cash drop.' },
      { id: 'sms-otp', label: 'Dispatch Customer Signature SMS Code', iconName: 'Key', actionText: 'Send OTP', actionToast: 'OTP dispatched to buyer: delivery receipt signed cryptographically.' },
      { id: 'reconcile-all', label: 'Reconcile Rider Daily Shift Cash', iconName: 'FileCheck', actionText: 'Reconcile', actionToast: 'Daily ledger closed: collected funds match order invoices exactly.' },
      { id: 'reroute-driver', label: 'Optimize Driver Fuel Route via GPS', iconName: 'Navigation', actionText: 'Recalculate', actionToast: 'Next 4 stops re-ordered: 18 minutes driving time saved.' },
    ],
    recentLeads: [
      { name: 'Messagerie & Fret Express Algérie', companyOrLocation: 'Alger, Blida, Tipaza', type: 'Flotte de 45 Chauffeurs COD', value: '7 500 €', date: '1h ago', email: 'logistique@fretexpress-dz.com', phone: '+213 555 88 99 00', status: 'new' },
      { name: 'Relais Express E-Commerce', companyOrLocation: 'Oran', type: 'Sécurisation Coffre IoT & OTP', value: '5 200 €', date: '6h ago', email: 'direction@relaisexpress.dz', phone: '+213 661 11 22 33', status: 'proposal' },
      { name: 'Atlas Distribution Wilayas', companyOrLocation: 'Sétif', type: 'Application Chauffeur & Rapprochement', value: '4 600 €', date: '2d ago', email: 'contact@atlasdistribution.dz', phone: '+213 770 99 00 11', status: 'won' },
    ]
  },

  'autoshine-pro': {
    projectId: 'autoshine-pro',
    operatorRole: 'Concours Detailing Director',
    headline: '9H Ceramic Coating & Paint Correction Studio',
    notice: 'Studio bay curing booth running at 84°C. Gtechniq Crystal Serum Ultra applied to Porsche 911 GT3 RS with 99.8 GU gloss.',
    stats: [
      { label: 'Active Studio Bays', value: '4 / 4 Full', change: '100% capacity', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Prestige supercars' },
      { label: 'Mirror Gloss Metric', value: '99.8 GU', change: 'Flawless', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Paint depth measured' },
      { label: 'Ceramic Warranty Passports', value: '14 Issued', change: '+100%', trend: 'up', color: 'text-blue-400', bg: 'bg-blue-500/10', description: '10-Year guarantee' },
      { label: 'Average Booking Ticket', value: '€ 1,450.00', change: '+18%', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Full PPF & Ceramic' },
    ],
    quickActions: [
      { id: 'inspect-gloss', label: 'Log Digital Paint Thickness & Gloss', iconName: 'Search', actionText: 'Log Metrics', actionToast: 'Paint depth measured at 134 microns: 99.8 GU mirror gloss confirmed.' },
      { id: 'cure-booth', label: 'Cycle Infrared Curing Lamps (84°C)', iconName: 'Sun', actionText: 'Cycle Booth', actionToast: 'Infrared lamps engaged: dual-layer quartz ceramic curing cycle active.' },
      { id: 'warranty-passport', label: 'Issue Digital Concours Passport', iconName: 'Award', actionText: 'Sign Passport', actionToast: 'Signed 10-year warranty passport generated with QR verification.' },
      { id: 'before-after', label: 'Export 4K Inspection Gallery', iconName: 'Image', actionText: 'Export Photos', actionToast: '4K before/after paint correction comparison exported.' },
    ],
    recentLeads: [
      { name: 'Propriétaire Ferrari 296 GTB', companyOrLocation: 'Monaco', type: 'Full Body PPF & Céramique 9H', value: '4 200 €', date: '1h ago', email: 'owner@ferrari-monaco.mc', phone: '+377 98 00 00 00', status: 'new' },
      { name: 'Collectionneur Porsche Privé', companyOrLocation: 'Genève', type: 'Restauration Peinture Concours (911 GT3 RS)', value: '3 600 €', date: '3h ago', email: 'porsche@collector-ch.com', phone: '+41 22 700 11 22', status: 'won' },
      { name: 'Concessionnaire Aston Martin', companyOrLocation: 'Cannes', type: 'Contrat Préparation Véhicules Neufs', value: '8 500 €', date: 'Yesterday', email: 'sales@aston-cannes.fr', phone: '+33 4 93 00 11 22', status: 'proposal' },
    ]
  },

  'parfait-voyage': {
    projectId: 'parfait-voyage',
    operatorRole: 'VIP Aviation & Travel Director',
    headline: 'Private Jet Charters & Bespoke World Itineraries',
    notice: 'Falcon 8X flight corridor cleared Paris -> Dubai -> Maldives. Bespoke palace suites confirmed for VIP members.',
    stats: [
      { label: 'Private Jet Charters', value: '6 Booked', change: '+50%', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Falcon 8X & Global 7500' },
      { label: 'Curated Tour Volume', value: '€ 142,000', change: '+28%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'All-inclusive packages' },
      { label: 'Palace Suite Allocation', value: '12 Confirmed', change: '100% luxury', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Cheval Blanc & Bulgari' },
      { label: 'VIP Concierge SLA', value: '4 Minutes', change: '24/7 priority', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Dedicated butler' },
    ],
    quickActions: [
      { id: 'flight-plan', label: 'File Private Airway Flight Plan', iconName: 'Plane', actionText: 'File Plan', actionToast: 'Flight plan filed: Le Bourget -> Dubai DWC cleared for takeoff.' },
      { id: 'concierge-dispatch', label: 'Confirm Rolls-Royce Tarmac Chauffeur', iconName: 'Car', actionText: 'Assign Chauffeur', actionToast: 'Chauffeur and VIP airport tarmac greeting confirmed.' },
      { id: 'yacht-tender', label: 'Reserve Private Maldives Yacht Tender', iconName: 'Anchor', actionText: 'Book Tender', actionToast: 'Yacht tender reserved for private coral reef island excursion.' },
      { id: 'itinerary-pdf', label: 'Generate Gold-Embossed Itinerary Brief', iconName: 'FileText', actionText: 'Download Itinerary', actionToast: 'Bespoke VIP itinerary compiled with personalized schedule.' },
    ],
    recentLeads: [
      { name: 'Famille Royale & Délégation', companyOrLocation: 'Dubaï & Paris', type: 'Séjour Privé Maldives & Jet Falcon 8X', value: '54 000 €', date: '40m ago', email: 'protocol@royal-dubai.ae', phone: '+971 4 000 0000', status: 'won' },
      { name: 'Directeur Général Groupe Financier', companyOrLocation: 'Zurich & Genève', type: 'Weekend Haute Couture Paris Le Meurice', value: '24 500 €', date: '5h ago', email: 'ceo@zurich-finance.ch', phone: '+41 44 888 0000', status: 'new' },
      { name: 'Entrepreneur Tech Californie', companyOrLocation: 'San Francisco', type: 'Circuit Méditerranée & Yacht Privé', value: '38 000 €', date: 'Yesterday', email: 'founder@techsf.com', phone: '+1 415 555 0000', status: 'proposal' },
    ]
  },

  'allamea': {
    projectId: 'allamea',
    operatorRole: 'Global Freight & Commodities Director',
    headline: 'Maritime Freight & Multilingual Trade Gateway',
    notice: 'Trilingual portal active (Arabic RTL, French, English). 4 international maritime corridors operating with automated port clearance.',
    stats: [
      { label: 'Active Maritime Corridors', value: '4 Shipping Lines', change: '100% on schedule', trend: 'up', color: 'text-emerald-400', bg: 'bg-emerald-500/10', description: 'Marseille, Dubai, Shanghai' },
      { label: 'Customs Clearance Velocity', value: '12 Hours', change: '-35%', trend: 'up', color: 'text-[#e8c77a]', bg: 'bg-[#c5a059]/10', description: 'Automated declarations' },
      { label: 'Monthly Freight Volume', value: '480 TEU', change: '+22%', trend: 'up', color: 'text-cyan-400', bg: 'bg-cyan-500/10', description: 'Container cargo' },
      { label: 'Trilingual RFQs Received', value: '42 Dossiers', change: '+40%', trend: 'up', color: 'text-purple-400', bg: 'bg-purple-500/10', description: 'Arabic, French, English' },
    ],
    quickActions: [
      { id: 'customs-declare', label: 'File Automated Customs Declaration', iconName: 'FileCheck', actionText: 'Submit Filing', actionToast: 'Customs declaration filed: Algiers Port automated clearance armed.' },
      { id: 'vessel-track', label: 'Ping Satellite Maritime AIS Coordinates', iconName: 'Ship', actionText: 'Track Fleet', actionToast: 'Vessel CMA CGM Corneille tracked: ETA Algiers Port 04:30 UTC.' },
      { id: 'lc-validate', label: 'Verify Letter of Credit (LC) Escrow', iconName: 'CreditCard', actionText: 'Verify Escrow', actionToast: 'Bank of Algeria LC verified: 100% compliant with trading contract.' },
      { id: 'rtl-switch', label: 'Audit Arabic RTL Layout Rendering', iconName: 'Globe', actionText: 'Audit i18n', actionToast: 'Arabic RTL layout audited: flawless typography and contrast.' },
    ],
    recentLeads: [
      { name: 'Société d\'Import-Export Méditerranée', companyOrLocation: 'Marseille & Alger', type: 'Fret Maritime 60 Conteneurs Port Alger', value: '18 500 €', date: '1h ago', email: 'logistique@med-import.fr', phone: '+33 4 91 00 00 00', status: 'new' },
      { name: 'Gulf Petrochemical Sourcing Group', companyOrLocation: 'Dubai Jebel Ali', type: 'Fourniture Polymères & Matières Premières', value: '45 000 €', date: '4h ago', email: 'trade@gulfpetro.ae', phone: '+971 4 881 0000', status: 'proposal' },
      { name: 'Négoce Agroalimentaire Continental', companyOrLocation: 'Valence, Espagne', type: 'Ligne Régulière Fret Agro & Douanes', value: '22 000 €', date: '2d ago', email: 'operaciones@agrocontinental.es', phone: '+34 963 00 00 00', status: 'won' },
    ]
  }
};

import type { ProjectItem } from './projectsData';

export function getProjectAdminConfig(project: ProjectItem): ProjectAdminConfig {
  if (projectAdminConfigs[project.id]) {
    return projectAdminConfigs[project.id];
  }

  // Dynamic Stepping Stones-style generation for any project or niche
  const isNiche = project.isNichePack || project.category === 'niches';
  const sector = project.nicheSector || project.title;
  const location = project.location || 'International';

  return {
    projectId: project.id,
    operatorRole: isNiche ? 'Managing Partner & Principal Director' : 'Lead Architect & Technical Founder',
    headline: `${project.title} — Executive Operational Console`,
    notice: `Stepping Stones Agency quiet luxury standard active. Lighthouse Core Web Vitals target: 100/100. Location: ${location}.`,
    stats: [
      {
        label: isNiche ? 'Client Inquiries (30d)' : 'Active System Nodes',
        value: isNiche ? '34 Dossiers' : '12 Services',
        change: '+28.4%',
        trend: 'up',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        description: isNiche ? 'High-ticket UHNW leads' : 'Sub-second response'
      },
      {
        label: isNiche ? 'Estimated Pipeline' : 'Antigravity Score',
        value: isNiche ? '$480,000' : `${project.antigravityScore} / 100`,
        change: '+15.2%',
        trend: 'up',
        color: 'text-[#e8c77a]',
        bg: 'bg-[#c5a059]/10',
        description: isNiche ? 'Curated commissions' : 'Top Tier Engineering'
      },
      {
        label: 'Lead Conversion Rate',
        value: '42.8%',
        change: '+6.1%',
        trend: 'up',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        description: 'Vetted private inquiries'
      },
      {
        label: 'Client Satisfaction (NPS)',
        value: '99.4%',
        change: 'Uncompromised',
        trend: 'neutral',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        description: 'Quiet Luxury delivery'
      }
    ],
    quickActions: [
      {
        id: 'dispatch-dossier',
        label: `Generate ${sector} Executive Dossier`,
        iconName: 'FileText',
        actionText: 'Generate Dossier',
        actionToast: `Confidential ${sector} executive specification brief compiled.`
      },
      {
        id: 'verify-telemetry',
        label: 'Audit Security & Row-Level Permissions',
        iconName: 'ShieldCheck',
        actionText: 'Run Security Audit',
        actionToast: 'Security audit complete: 100% compliant with Stepping Stones doctrine.'
      },
      {
        id: 'contact-pipeline',
        label: 'Schedule Client Consultation Call',
        iconName: 'Calendar',
        actionText: 'Schedule Call',
        actionToast: 'Client VIP consultation calendar slot opened with encrypted link.'
      },
      {
        id: 'export-kpis',
        label: 'Export Real-Time Analytics Ledger',
        iconName: 'Download',
        actionText: 'Download CSV',
        actionToast: `Full operational KPIs for ${project.title} exported.`
      }
    ],
    recentLeads: [
      {
        name: 'Private Client Advisory',
        companyOrLocation: location,
        type: sector,
        value: '$25,000+',
        date: '1h ago',
        email: `inquiry@${project.id}.com`,
        phone: '+1 212 555 0199',
        status: 'new'
      },
      {
        name: 'Heritage Family Office',
        companyOrLocation: 'Geneva & London',
        type: 'Mandat Exclusif & Rénovation',
        value: '$48,000',
        date: '4h ago',
        email: 'partners@heritage-fo.ch',
        phone: '+41 22 555 0122',
        status: 'proposal'
      },
      {
        name: 'Institutional Partner Group',
        companyOrLocation: 'Paris & Dubai',
        type: 'Contrat Cadre Annuel',
        value: '$85,000',
        date: 'Yesterday',
        email: 'board@institutional-group.fr',
        phone: '+33 1 40 00 00 00',
        status: 'won'
      }
    ]
  };
}

