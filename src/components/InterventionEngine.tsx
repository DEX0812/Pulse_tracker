"use client";

import { Zap, CheckCircle2, ShieldAlert, Play, Pause } from "lucide-react";
import { useRTOStore } from "@/store/useRTOStore";
import { evaluateOrderRisk } from "@/lib/riskEngine";

export function InterventionEngine() {
  const selectedOrderId = useRTOStore((state) => state.selectedOrderId);
  const orders = useRTOStore((state) => state.orders);
  const rules = useRTOStore((state) => state.rules);
  const updateRules = useRTOStore((state) => state.updateRules);
  const isSimulating = useRTOStore((state) => state.isSimulating);
  const toggleSimulation = useRTOStore((state) => state.toggleSimulation);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;
  const analysis = selectedOrder ? evaluateOrderRisk(selectedOrder, rules) : null;

  return (
    <div className="flex flex-col space-y-4 p-1 select-none">
      {/* Simulation Controller Banner */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white/90">Live Simulation Mode</span>
          <span className="text-[9px] text-white/40">Inject orders every 3.5s (Ctrl+S)</span>
        </div>
        <button
          onClick={toggleSimulation}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
            isSimulating
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30'
          }`}
        >
          {isSimulating ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Start</span>
            </>
          )}
        </button>
      </div>

      {/* Threshold Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-white/80 font-semibold">Intervention Threshold</span>
          <span className="text-red-400 font-mono font-extrabold text-sm">{rules.threshold}%</span>
        </div>
        <input 
          type="range" 
          min="30" 
          max="95" 
          value={rules.threshold} 
          onChange={(e) => updateRules({ threshold: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[9px] text-white/40 uppercase tracking-widest font-bold">
          <span>Aggressive (30%)</span>
          <span>Conservative (95%)</span>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Actions */}
      <div className="space-y-3">
        <div className="text-[10px] uppercase text-white/50 tracking-widest font-bold flex items-center">
          <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> AUTOMATED ACTIONS
        </div>
        
        {/* Discount Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs text-white/80 font-medium">
            <span>Prepaid Switch Discount</span>
            <span className="text-indigo-400 font-mono font-bold">{rules.discount}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="20" 
            step="1"
            value={rules.discount} 
            onChange={(e) => updateRules({ discount: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-xs text-white/90 font-semibold">Require WhatsApp OTP</span>
            <span className="text-[9px] text-white/40">Address & SIM verification</span>
          </div>
          <button 
            onClick={() => updateRules({ requireOTP: !rules.requireOTP })}
            className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${rules.requireOTP ? 'bg-indigo-500' : 'bg-white/15'}`}
          >
            <span className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${rules.requireOTP ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/90 font-semibold">Auto-block High Risk</span>
            <span className="text-[9px] text-white/40">Reject COD if risk &gt; 85%</span>
          </div>
          <button 
            onClick={() => updateRules({ blockHighRisk: !rules.blockHighRisk })}
            className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${rules.blockHighRisk ? 'bg-red-500' : 'bg-white/15'}`}
          >
            <span className={`absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform ${rules.blockHighRisk ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* Live Status Indicator */}
      <div className={`p-3 border rounded-xl flex items-center justify-center space-x-2 text-xs font-bold transition-colors ${
        analysis && analysis.score >= rules.threshold 
          ? 'bg-amber-500/15 border-amber-500/35 text-amber-300' 
          : 'bg-indigo-500/15 border-indigo-500/35 text-indigo-300'
      }`}>
        {analysis && analysis.score >= rules.threshold ? <ShieldAlert className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
        <span className="truncate">
          {analysis && analysis.score >= rules.threshold 
            ? `Intervention Triggered (${rules.discount}% Off Offered)` 
            : 'Within Safe Parameters'}
        </span>
      </div>
    </div>
  );
}
