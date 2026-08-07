"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, BadgeIndianRupee } from "lucide-react";
import { useRTOStore } from "@/store/useRTOStore";
import { evaluateOrderRisk } from "@/lib/riskEngine";
import { cn } from "@/lib/utils";

export function LiveOrderStream() {
  const { orders, selectedOrderId, selectOrder, rules, isSimulating } = useRTOStore();

  return (
    <div className="flex flex-col h-full select-none">
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] uppercase font-mono tracking-wider">
        <span className="text-white/50 font-bold">LIVE STREAM ({orders.length})</span>
        {isSimulating ? (
          <span className="flex items-center text-green-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-ping" />
            SIMULATING
          </span>
        ) : (
          <span className="text-white/40">PAUSED</span>
        )}
      </div>

      {/* Stream List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <AnimatePresence initial={false}>
          {orders.map((order) => {
            const isSelected = order.id === selectedOrderId;
            const riskResult = evaluateOrderRisk(order, rules);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: -15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={() => selectOrder(order.id)}
                className={cn(
                  "p-3 rounded-xl border transition-all cursor-pointer relative group",
                  isSelected
                    ? "bg-white/10 border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                    : "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                )}

                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-xs font-bold text-white/90 font-mono tracking-tight">{order.id}</span>
                  <div className="flex items-center space-x-1.5">
                    {order.paymentMethod === "COD" ? (
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                        COD
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                        PREPAID
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1 text-xs text-white/70">
                  <div className="flex items-center text-white/90 font-semibold truncate">
                    <span className="w-4 h-4 mr-2 bg-white/10 rounded-full flex items-center justify-center text-[10px] text-white/80 shrink-0 font-bold">
                      {order.customer.name.charAt(0)}
                    </span>
                    <span className="truncate">{order.customer.name}</span>
                  </div>
                  
                  <div className="flex items-center text-[11px] text-white/50 truncate">
                    <MapPin className="w-3 h-3 mr-1 text-white/40 shrink-0" />
                    <span className="truncate">{order.address.city}, {order.address.state}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <div className="flex items-center text-green-400/90 font-mono text-[11px] font-bold">
                      <BadgeIndianRupee className="w-3 h-3 mr-0.5" />
                      {order.cartValue.toLocaleString()}
                    </div>
                    <div className={cn(
                      "font-mono text-[10px] px-2 py-0.5 rounded-md font-bold",
                      riskResult.score >= 75 
                        ? "text-red-400 bg-red-500/15 border border-red-500/30" 
                        : riskResult.score >= 50
                        ? "text-amber-400 bg-amber-500/15 border border-amber-500/30"
                        : "text-indigo-300 bg-indigo-500/15 border border-indigo-500/30"
                    )}>
                      Risk: {riskResult.score}%
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
