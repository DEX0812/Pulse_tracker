"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Zap, AlertCircle, Inbox, ShieldCheck, ShieldAlert } from "lucide-react";
import { evaluateOrderRisk } from "@/lib/riskEngine";
import { useRTOStore } from "@/store/useRTOStore";
import { motion, AnimatePresence } from "framer-motion";

export function RiskAnalyzer() {
  const selectedOrderId = useRTOStore((state) => state.selectedOrderId);
  const orders = useRTOStore((state) => state.orders);
  const rules = useRTOStore((state) => state.rules);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;
  const analysis = selectedOrder ? evaluateOrderRisk(selectedOrder, rules) : null;

  // Neutral state if no order selected
  if (!selectedOrderId || !analysis) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center p-4 space-y-3">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Inbox className="w-6 h-6 text-white/30" />
        </div>
        <span className="text-sm font-semibold text-white/70">Awaiting Order Selection</span>
        <span className="text-xs text-white/40 max-w-[220px]">
          Click any order in the stream to calculate real-time RTO risk metrics.
        </span>
      </div>
    );
  }

  const { score, factors, recommendedAction } = analysis;

  const data = [
    { name: "Risk", value: score },
    { name: "Safe", value: 100 - score },
  ];

  const isHighRisk = score >= 75;
  const isMediumRisk = score >= 50 && score < 75;

  const colorScheme = isHighRisk ? "#ef4444" : isMediumRisk ? "#f59e0b" : "#3b82f6";
  const COLORS = [colorScheme, "rgba(255, 255, 255, 0.08)"];

  return (
    <div className="flex flex-col items-center justify-between w-full h-full relative p-1">
      {/* Gauge Chart */}
      <div className="w-full h-36 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Ambient Glow */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-16 blur-2xl pointer-events-none rounded-t-full transition-colors duration-500" 
          style={{ backgroundColor: `${colorScheme}40` }}
        />

        {/* Score Display */}
        <motion.div 
          key={selectedOrderId + score}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-1"
        >
          <span 
            className="text-3xl font-extrabold font-mono tracking-tighter transition-colors duration-500"
            style={{ color: colorScheme }}
          >
            {score}%
          </span>
          <span className="text-[9px] uppercase tracking-widest text-white/50 font-bold">RTO SCORE</span>
        </motion.div>
      </div>

      {/* Recommended Action Banner */}
      <div className="w-full my-2">
        <div className={`p-3 rounded-xl border text-xs flex items-start space-x-2.5 transition-colors duration-300 ${
          isHighRisk 
            ? 'bg-red-500/10 border-red-500/30 text-red-300' 
            : isMediumRisk
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
        }`}>
          {isHighRisk ? <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> : <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
          <div className="flex flex-col">
            <span className="font-bold text-[10px] uppercase tracking-wider opacity-80">ENGINE RECOMMENDATION</span>
            <span className="text-xs font-semibold mt-0.5 leading-snug">{recommendedAction}</span>
          </div>
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="w-full flex-1 overflow-auto space-y-1.5 pt-1.5 border-t border-white/10">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold block mb-1">
          CONTRIBUTING RISK FACTORS ({factors.length})
        </span>
        <AnimatePresence mode="popLayout">
          {factors.map((f, idx) => (
            <motion.div 
              key={f.factor + idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-between items-center text-xs p-2 bg-white/5 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
            >
              <div className="flex items-center space-x-2 truncate mr-2">
                <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${f.isNegative ? 'text-red-400' : 'text-green-400'}`} />
                <span className="text-white/90 font-medium truncate text-[11px]">{f.factor}</span>
              </div>
              <span className={`font-mono text-[10px] font-bold shrink-0 ${f.isNegative ? 'text-red-400' : 'text-green-400'}`}>
                {f.isNegative ? `+${f.impact}%` : `${f.impact}%`}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
