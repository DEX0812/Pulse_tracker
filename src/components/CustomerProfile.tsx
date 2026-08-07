"use client";

import { User, MapPin, Smartphone, Clock, History, ShoppingBag, HelpCircle, Inbox } from "lucide-react";
import { useRTOStore } from "@/store/useRTOStore";
import { motion } from "framer-motion";

export function CustomerProfile() {
  const selectedOrderId = useRTOStore((state) => state.selectedOrderId);
  const orders = useRTOStore((state) => state.orders);
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;

  if (!selectedOrder) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-center p-4 space-y-3">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Inbox className="w-6 h-6 text-white/30" />
        </div>
        <span className="text-sm font-semibold text-white/70">No Profile Selected</span>
        <span className="text-xs text-white/40 max-w-[220px]">
          Select an order from the stream to inspect IP logs, verification scores, and history.
        </span>
      </div>
    );
  }

  const { customer, items, address } = selectedOrder;

  return (
    <motion.div 
      key={selectedOrder.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col space-y-3.5 p-1"
    >
      {/* Header Info */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-white/70" />
        </div>
        <div className="flex flex-col truncate">
          <span className="text-sm font-bold text-white/90 truncate">{customer.name}</span>
          <span className="text-[10px] text-white/40 font-mono">ID: {customer.id}</span>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        {/* IP Location */}
        <div className="space-y-1 bg-white/5 p-2.5 rounded-lg border border-white/5 hover:border-white/15 transition-colors relative group cursor-help">
          <div className="text-[9px] font-bold uppercase text-white/40 tracking-wider flex items-center justify-between">
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-white/50" /> IP Location</span>
            <HelpCircle className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
          </div>
          <div className={`text-xs font-bold ${customer.isIpMatch ? 'text-green-400' : 'text-red-400'}`}>
            {customer.ipCity}, {customer.ipState}
          </div>
          <div className="text-[9px] text-white/40 truncate">
            Ship: {address.city}, {address.state}
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-0 mb-1.5 hidden group-hover:block w-52 p-2.5 bg-zinc-900 border border-white/20 rounded-lg text-[10px] text-white/90 shadow-2xl z-[200] leading-snug pointer-events-none">
            {customer.isIpMatch 
              ? "IP geolocation matches shipping city. Verified normal checkout behavior."
              : "Location Mismatch: IP city differs from shipping address. Often indicates proxy usage or dropshipping."}
          </div>
        </div>

        {/* Phone Verification */}
        <div className="space-y-1 bg-white/5 p-2.5 rounded-lg border border-white/5 hover:border-white/15 transition-colors relative group cursor-help">
          <div className="text-[9px] font-bold uppercase text-white/40 tracking-wider flex items-center justify-between">
            <span className="flex items-center"><Smartphone className="w-3 h-3 mr-1 text-white/50" /> Phone Score</span>
            <HelpCircle className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
          </div>
          <div className={`text-xs font-bold ${customer.phoneScore >= 7 ? 'text-green-400' : 'text-orange-400'}`}>
            {customer.phoneScore}/10 ({customer.phoneStatus.split(' ')[0]})
          </div>
          <div className="text-[9px] text-white/40 font-mono truncate">{customer.phone}</div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-1.5 hidden group-hover:block w-52 p-2.5 bg-zinc-900 border border-white/20 rounded-lg text-[10px] text-white/90 shadow-2xl z-[200] leading-snug pointer-events-none">
            {customer.phoneScore < 7
              ? "Low phone score: Unverified prepaid SIM or VOIP service. High probability of non-reachable delivery."
              : "Postpaid SIM verified against telecom registry. High reachability."}
          </div>
        </div>

        {/* Account History */}
        <div className="space-y-1 bg-white/5 p-2.5 rounded-lg border border-white/5 hover:border-white/15 transition-colors relative group cursor-help">
          <div className="text-[9px] font-bold uppercase text-white/40 tracking-wider flex items-center justify-between">
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-white/50" /> Account Age</span>
            <HelpCircle className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
          </div>
          <div className="text-xs text-white/90 font-bold">{customer.accountAge}</div>
          <div className="text-[9px] text-white/40">{customer.totalOrders} Lifetime Orders</div>

          {/* Tooltip */}
          <div className="absolute top-full left-0 mt-1.5 hidden group-hover:block w-52 p-2.5 bg-zinc-900 border border-white/20 rounded-lg text-[10px] text-white/90 shadow-2xl z-[200] leading-snug pointer-events-none">
            Newly created accounts with instant high-value COD carts have a 4x higher cancellation rate.
          </div>
        </div>

        {/* Past RTO Rate */}
        <div className="space-y-1 bg-white/5 p-2.5 rounded-lg border border-white/5 hover:border-white/15 transition-colors relative group cursor-help">
          <div className="text-[9px] font-bold uppercase text-white/40 tracking-wider flex items-center justify-between">
            <span className="flex items-center"><History className="w-3 h-3 mr-1 text-white/50" /> Historical RTO</span>
            <HelpCircle className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
          </div>
          <div className={`text-xs font-bold ${customer.pastRtoCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {customer.pastRtoCount} Failed Orders
          </div>
          <div className="text-[9px] text-white/40">
            {customer.pastRtoCount > 0 ? `${Math.round((customer.pastRtoCount/customer.totalOrders)*100)}% Failure Rate` : 'Clean Record'}
          </div>

          {/* Tooltip */}
          <div className="absolute top-full right-0 mt-1.5 hidden group-hover:block w-52 p-2.5 bg-zinc-900 border border-white/20 rounded-lg text-[10px] text-white/90 shadow-2xl z-[200] leading-snug pointer-events-none">
            Past non-deliveries strongly correlate with repeat RTO behavior on cash orders.
          </div>
        </div>
      </div>

      {/* Cart Items Summary */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold flex items-center">
          <ShoppingBag className="w-3 h-3 mr-1" /> CART ITEMS ({items.length})
        </span>
        <div className="space-y-1 max-h-24 overflow-auto">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-[11px] px-2.5 py-1.5 bg-white/5 rounded-md border border-white/5">
              <span className="text-white/90 truncate max-w-[180px] font-medium">{item.name} ({item.size})</span>
              <span className="text-white/60 font-mono font-bold">₹{item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
