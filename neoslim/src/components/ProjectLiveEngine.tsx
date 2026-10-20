import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Trash2,
  Radar,
  Sparkles,
} from 'lucide-react';

interface ProjectLiveEngineProps {
  projectId: string;
  projectTitle: string;
}

export const ProjectLiveEngine = memo(({ projectId, projectTitle }: ProjectLiveEngineProps) => {
  // ==========================================
  // 1. AEGIS ALPHA / MT5 ENGINE SIMULATOR
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mt5Price, setMt5Price] = useState(2648.50);
  const [mt5Drawdown, setMt5Drawdown] = useState(0.42);
  const [mt5BreakerTripped, setMt5BreakerTripped] = useState(false);
  const [mt5Orders, setMt5Orders] = useState([
    { id: '#ORD-9021', symbol: 'XAUUSD', type: 'BUY', lots: 1.5, openPrice: 2645.20, pnl: '+€495.00' },
    { id: '#ORD-9022', symbol: 'EURUSD', type: 'SELL', lots: 3.0, openPrice: 1.0842, pnl: '+€180.50' },
  ]);

  // Live Canvas Tick Stream
  useEffect(() => {
    if (projectId !== 'aegis-alpha-mt5' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const ticks: number[] = [];
    for (let i = 0; i < 50; i++) {
      ticks.push(2645 + Math.sin(i * 0.3) * 5 + Math.random() * 2);
    }

    const render = () => {
      ctx.fillStyle = '#0a0a16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 30; y < canvas.height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Add new tick
      const last = ticks[ticks.length - 1];
      const delta = (Math.random() - 0.49) * 0.8;
      const nextPrice = Math.max(2630, Math.min(2670, last + delta));
      ticks.push(nextPrice);
      if (ticks.length > 70) ticks.shift();

      // Draw Candlestick / Line Chart
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const step = canvas.width / (ticks.length - 1);
      const minP = Math.min(...ticks) - 2;
      const maxP = Math.max(...ticks) + 2;

      ticks.forEach((t, i) => {
        const x = i * step;
        const y = canvas.height - ((t - minP) / (maxP - minP)) * (canvas.height - 40) - 20;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Glowing dot on last price
      const lastX = (ticks.length - 1) * step;
      const lastY = canvas.height - ((nextPrice - minP) / (maxP - minP)) * (canvas.height - 40) - 20;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath(); ctx.arc(lastX, lastY, 4, 0, Math.PI * 2); ctx.fill();

      setMt5Price(Number(nextPrice.toFixed(2)));
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [projectId]);

  const triggerRiskShock = () => {
    setMt5Drawdown(2.45);
    setMt5BreakerTripped(true);
    setMt5Orders([]);
  };

  const resetRiskShield = () => {
    setMt5Drawdown(0.42);
    setMt5BreakerTripped(false);
    setMt5Orders([
      { id: '#ORD-9023', symbol: 'XAUUSD', type: 'BUY', lots: 1.0, openPrice: 2648.00, pnl: '+€120.00' }
    ]);
  };

  // ==========================================
  // 2. KACHEF 58 WILAYAS FRAUD RADAR
  // ==========================================
  const [kachefPhone, setKachefPhone] = useState('0550123456');
  const [kachefResult, setKachefResult] = useState<{
    phone: string;
    riskScore: number;
    status: 'trusted' | 'suspicious' | 'blacklisted';
    recommendation: string;
  } | null>(null);

  const verifyPhoneNumber = () => {
    const isSuspicious = kachefPhone.endsWith('99') || kachefPhone.endsWith('00');
    const isBlacklisted = kachefPhone.endsWith('666');
    if (isBlacklisted) {
      setKachefResult({
        phone: kachefPhone,
        riskScore: 94,
        status: 'blacklisted',
        recommendation: 'Refuser la commande COD : client identifié sur liste noire inter-marchands (4 retours récents non acquittés).'
      });
    } else if (isSuspicious) {
      setKachefResult({
        phone: kachefPhone,
        riskScore: 68,
        status: 'suspicious',
        recommendation: 'Exiger une avance ou confirmation vocale préalable avant expédition.'
      });
    } else {
      setKachefResult({
        phone: kachefPhone,
        riskScore: 12,
        status: 'trusted',
        recommendation: 'Client fiable : 98% de taux de livraison réussie sur les 12 derniers mois. Expédition recommandée.'
      });
    }
  };

  // ==========================================
  // 3. COMMERCIA POS WORKING CASHIER
  // ==========================================
  const [posCart, setPosCart] = useState<{ id: string; name: string; price: number; qty: number }[]>([
    { id: 'SKU-01', name: 'Machine Espresso Barista', price: 145000, qty: 1 },
    { id: 'SKU-02', name: 'Café de Spécialité 1kg', price: 4600, qty: 2 },
  ]);
  const [posReceiptPrinted, setPosReceiptPrinted] = useState(false);

  const posSubtotal = posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const posTva = Math.round(posSubtotal * 0.19);
  const posTotal = posSubtotal + posTva;

  const addPosItem = (name: string, price: number) => {
    setPosCart((prev) => [...prev, { id: `SKU-${Date.now()}`, name, price, qty: 1 }]);
    setPosReceiptPrinted(false);
  };

  const removePosItem = (idx: number) => {
    setPosCart((prev) => prev.filter((_, i) => i !== idx));
    setPosReceiptPrinted(false);
  };

  // ==========================================
  // 4. STONELINK OMNIROUTE SIMULATOR
  // ==========================================
  const [routingPrompt, setRoutingPrompt] = useState('Audit de sécurité et extraction des coordonnées de décideurs B2B');
  const [routedResult, setRoutedResult] = useState<{
    selectedModel: string;
    latency: string;
    tokenCompression: string;
    costPerK: string;
    fallbackChain: string[];
  } | null>(null);

  const simulateRouting = () => {
    setRoutedResult({
      selectedModel: 'Claude 3.5 Sonnet (Direct via OmniRoute)',
      latency: '138 ms',
      tokenCompression: '68.2% via RTK Caveman',
      costPerK: '$0.0030 / 1k tokens',
      fallbackChain: ['Claude 3.5 Sonnet', 'Gemini 2.5 Pro', 'DeepSeek R1 Local']
    });
  };

  // ==========================================
  // 5. MENUFLOW TABLE FLOORPLAN
  // ==========================================
  const [tables, setTables] = useState([
    { id: 1, name: 'Table 01', seats: 2, status: 'occupied', guest: 'M. Benali (Wagyu A5)', spend: '€240' },
    { id: 2, name: 'Table 02', seats: 4, status: 'available', guest: 'Disponible', spend: '€0' },
    { id: 3, name: 'Table 03 (Terrasse)', seats: 6, status: 'reserved', guest: 'Délégation Haussmann (20h)', spend: '€550' },
    { id: 4, name: 'Table 04 VIP', seats: 4, status: 'occupied', guest: 'Table Sommelier (Dom Pérignon)', spend: '€720' },
  ]);

  const toggleTableStatus = (id: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const next = t.status === 'occupied' ? 'available' : t.status === 'available' ? 'reserved' : 'occupied';
          return { ...t, status: next };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* 1. MT5 Algorithmic Terminal Engine */}
      {projectId === 'aegis-alpha-mt5' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#c5a059] uppercase tracking-wider block">MOTEUR HFT TEMPS RÉEL</span>
              <h3 className="text-xl font-display font-medium text-white flex items-center gap-3">
                Flux de Ticks IPC MetaTrader 5 &bull; XAUUSD
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                  {mt5Price} USD
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${mt5BreakerTripped ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'}`}>
                  Drawdown: {mt5Drawdown.toFixed(2)}%
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {!mt5BreakerTripped ? (
                <button
                  onClick={triggerRiskShock}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-400 text-xs font-mono flex items-center gap-2 transition-all"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Simuler Choc & Drawdown &gt; 2%</span>
                </button>
              ) : (
                <button
                  onClick={resetRiskShield}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réarmer le Risk Shield</span>
                </button>
              )}
            </div>
          </div>

          {/* Breaker Alert Banner */}
          {mt5BreakerTripped && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span>DISJONCTEUR RISK SHIELD DÉCLENCHÉ : Drawdown atteint 2.45%. 100% des positions liquidées sans slippage.</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">CAPITAL PROTÉGÉ</span>
            </div>
          )}

          {/* Tick Chart Canvas */}
          <div className="h-56 w-full rounded-xl overflow-hidden border border-white/10 relative">
            <canvas ref={canvasRef} width={900} height={220} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 text-[11px] font-mono text-white/50 bg-black/60 px-2 py-1 rounded">
              Taux de rafraîchissement: 60 FPS &bull; Socket IPC &lt; 1ms
            </div>
          </div>

          {/* Live Orders Table */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-3">Positions Ouvertes en Direct ({mt5Orders.length})</h4>
            <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-black/20">
              {mt5Orders.length > 0 ? (
                mt5Orders.map((o) => (
                  <div key={o.id} className="p-3.5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${o.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {o.type}
                      </span>
                      <span className="text-white font-bold">{o.symbol}</span>
                      <span className="text-white/40">Lots: {o.lots}</span>
                      <span className="text-white/40">Prix: {o.openPrice}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">{o.pnl}</span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-white/40 font-mono">
                  Aucune position ouverte. Risk Shield en attente de réarmement.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. KACHEF 58 WILAYAS FRAUD RADAR */}
      {projectId === 'kachef' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-[#c5a059] uppercase tracking-wider block">OUTIL D'INSPECTION FRAUDE 58 WILAYAS</span>
            <h3 className="text-xl font-display font-medium text-white mt-1">
              Testeur & Détecteur de Commandes Fantômes COD
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={kachefPhone}
              onChange={(e) => setKachefPhone(e.target.value)}
              placeholder="Numéro de téléphone client (ex: 0550123456 ou terminer par 666 pour tester liste noire)"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#c5a059]"
            />
            <button
              onClick={verifyPhoneNumber}
              className="px-5 py-2.5 rounded-xl bg-[#c5a059] text-black font-semibold font-mono text-xs hover:bg-[#e8c77a] transition-all flex items-center gap-2 shrink-0"
            >
              <Radar className="w-4 h-4" />
              <span>Vérifier Fiabilité</span>
            </button>
          </div>

          {kachefResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl border text-xs font-mono space-y-2 ${
                kachefResult.status === 'trusted'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : kachefResult.status === 'suspicious'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">RÉSULTAT RADAR : {kachefResult.phone}</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase">
                  SCORE DE RISQUE : {kachefResult.riskScore} %
                </span>
              </div>
              <p className="text-white/80 leading-relaxed font-sans">{kachefResult.recommendation}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { wilaya: '16. Alger', risk: 'Faible (6%)', col: 'text-emerald-400' },
              { wilaya: '31. Oran', risk: 'Faible (8%)', col: 'text-emerald-400' },
              { wilaya: '25. Constantine', risk: 'Modéré (14%)', col: 'text-amber-400' },
              { wilaya: '19. Sétif', risk: 'Faible (9%)', col: 'text-emerald-400' },
            ].map((w, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono">
                <span className="text-white/40 block">{w.wilaya}</span>
                <span className={`${w.col} font-bold`}>{w.risk}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. COMMERCIA WORKING POS CASHIER */}
      {projectId === 'commercia' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#c5a059] uppercase tracking-wider block">TERMINAL DE CAISSE EN DIRECT</span>
              <h3 className="text-xl font-display font-medium text-white mt-1">
                Commercia POS &bull; Caisse 01 Flagship
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              ESC/POS THERMIQUE PRÊT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Catalog */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-white/50 mb-2">Catalogue d'Articles</h4>
              {[
                { name: 'Moulin à Café Professionnel', price: 68000 },
                { name: 'Tasse Céramique Artisanale', price: 2400 },
                { name: 'Filtre Précision 58mm', price: 3800 },
                { name: 'Détartrant Spécialisé 1L', price: 1950 },
              ].map((prod, idx) => (
                <button
                  key={idx}
                  onClick={() => addPosItem(prod.name, prod.price)}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#c5a059]/10 border border-white/10 hover:border-[#c5a059]/40 text-xs flex items-center justify-between transition-all"
                >
                  <span className="text-white/80">{prod.name}</span>
                  <span className="font-mono text-[#e8c77a] font-bold">+{prod.price} DZD</span>
                </button>
              ))}
            </div>

            {/* Current Cart */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono text-white/40 pb-2 border-b border-white/10">
                  <span>DÉSIGNATION</span>
                  <span>MONTANT</span>
                </div>

                {posCart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1">
                    <span className="text-white/80">{item.name} (x{item.qty})</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#c5a059] font-bold">{(item.price * item.qty).toLocaleString()} DZD</span>
                      <button onClick={() => removePosItem(idx)} className="text-white/30 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-white/10 text-xs font-mono space-y-1">
                  <div className="flex justify-between text-white/50">
                    <span>SOUS-TOTAL HT</span>
                    <span>{posSubtotal.toLocaleString()} DZD</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>TVA (19%)</span>
                    <span>{posTva.toLocaleString()} DZD</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#e8c77a] pt-1">
                    <span>TOTAL TTC</span>
                    <span>{posTotal.toLocaleString()} DZD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPosReceiptPrinted(true)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#140e02] font-semibold font-mono text-xs uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer Ticket de Caisse ESC/POS</span>
                </button>
              </div>

              {posReceiptPrinted && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Reçu imprimé avec succès sur imprimante thermique 80mm & tiroir-caisse déclenché.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. STONELINK OMNIROUTE SIMULATOR */}
      {projectId === 'stonelink' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-[#c5a059] uppercase tracking-wider block">ROUTEUR MULTI-LLM HAUTE RÉSILIENCE</span>
            <h3 className="text-xl font-display font-medium text-white mt-1">
              StoneLink OmniRoute Gateway Simulator
            </h3>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-mono text-white/60">Prompt / Intention à Acheminer :</label>
            <textarea
              value={routingPrompt}
              onChange={(e) => setRoutingPrompt(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#c5a059]"
            />
            <button
              onClick={simulateRouting}
              className="px-5 py-2.5 rounded-xl bg-[#c5a059] text-black font-semibold font-mono text-xs hover:bg-[#e8c77a] transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Calculer le Meilleur Chemin LLM</span>
            </button>
          </div>

          {routedResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-[#0f0f24] border border-[#c5a059]/40 space-y-3 text-xs font-mono"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">FOURNISSEUR SÉLECTIONNÉ</span>
                <span className="text-[#e8c77a] font-bold">{routedResult.selectedModel}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">LATENCE DE ROUTAGE</span>
                <span className="text-emerald-400 font-bold">{routedResult.latency}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">COMPRESSION TOKENS (RTK)</span>
                <span className="text-cyan-400 font-bold">{routedResult.tokenCompression}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">CHAÎNE DE SECOURS (FAILOVER)</span>
                <span className="text-white/70">{routedResult.fallbackChain.join(' -> ')}</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 5. MENUFLOW TABLE MATRIX */}
      {projectId === 'menuflow' && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#c5a059] uppercase tracking-wider block">PLAN DE SALLE INTERACTIF</span>
              <h3 className="text-xl font-display font-medium text-white mt-1">MenuFlow &bull; Tables & Réservations</h3>
            </div>
            <span className="text-xs font-mono text-white/50">Cliquez pour modifier le statut</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tables.map((tbl) => (
              <div
                key={tbl.id}
                onClick={() => toggleTableStatus(tbl.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all ${
                  tbl.status === 'occupied'
                    ? 'bg-emerald-500/10 border-emerald-500/40 hover:border-emerald-500'
                    : tbl.status === 'reserved'
                    ? 'bg-[#c5a059]/10 border-[#c5a059]/40 hover:border-[#c5a059]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-white">{tbl.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    tbl.status === 'occupied' ? 'bg-emerald-500 text-black' : tbl.status === 'reserved' ? 'bg-[#c5a059] text-black' : 'bg-white/10 text-white/60'
                  }`}>
                    {tbl.status}
                  </span>
                </div>
                <p className="text-xs text-white/60">{tbl.guest}</p>
                <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-[11px] font-mono">
                  <span className="text-white/40">{tbl.seats} Couverts</span>
                  <span className="text-[#e8c77a] font-bold">{tbl.spend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback default simulator for other projects */}
      {!['aegis-alpha-mt5', 'kachef', 'commercia', 'stonelink', 'menuflow'].includes(projectId) && (
        <div className="p-8 rounded-2xl bg-[#0a0a16] border border-white/10 shadow-2xl space-y-4 text-center">
          <Sparkles className="w-8 h-8 text-[#c5a059] mx-auto animate-pulse" />
          <h3 className="text-lg font-display text-white font-medium">Banc d'Essai Opérationnel Dédié : {projectTitle}</h3>
          <p className="text-xs text-white/50 max-w-lg mx-auto font-sans leading-relaxed">
            Module de contrôle et d'audit en direct conforme à la doctrine Stepping Stones Agency. Tous les flux de données transitent avec chiffrement de bout en bout et isolation par schéma.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              ● API READY
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
              ZERO-LATENCY MOCK ENGINE
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

ProjectLiveEngine.displayName = 'ProjectLiveEngine';
