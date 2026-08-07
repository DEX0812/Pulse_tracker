"use client";

import { ChevronDown, Shield, Activity, BarChart2, Zap, LayoutGrid } from "lucide-react";
import { useRTOStore } from "@/store/useRTOStore";

interface HeroNavbarProps {
  onOpenConsult: () => void;
  onOpenAnalytics: () => void;
  onOpenDocs: () => void;
  onSwitchToSpatial: () => void;
}

export function HeroNavbar({
  onOpenConsult,
  onOpenAnalytics,
  onOpenDocs,
  onSwitchToSpatial,
}: HeroNavbarProps) {
  const toggleSimulation = useRTOStore((state) => state.toggleSimulation);
  const isSimulating = useRTOStore((state) => state.isSimulating);

  return (
    <header className="w-full z-20 relative select-none">
      <div className="w-full py-5 px-8 flex flex-row items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={onSwitchToSpatial}>
          <div className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-semibold text-lg tracking-tight font-sans text-white/90">
            Pulse <span className="text-gradient-ai font-bold">Tracker</span>
          </span>
        </div>

        {/* Center: Functional Nav Items */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
          {/* 1. Live Stream Button */}
          <button
            onClick={() => {
              toggleSimulation();
            }}
            className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors py-1 px-2 rounded-md hover:bg-white/5"
          >
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Live Stream</span>
            {isSimulating && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1" />}
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>

          {/* 2. AI Analysis Button */}
          <button
            onClick={onOpenAnalytics}
            className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors py-1 px-2 rounded-md hover:bg-white/5"
          >
            <BarChart2 className="w-4 h-4 text-purple-400" />
            <span>AI Analysis</span>
          </button>

          {/* 3. Interventions Button */}
          <button
            onClick={onSwitchToSpatial}
            className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors py-1 px-2 rounded-md hover:bg-white/5"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Interventions</span>
          </button>

          {/* 4. Learning & Docs Button */}
          <button
            onClick={onOpenDocs}
            className="flex items-center space-x-1.5 hover:text-indigo-300 transition-colors py-1 px-2 rounded-md hover:bg-white/5"
          >
            <span>Docs</span>
            <ChevronDown className="w-4 h-4 opacity-70" />
          </button>
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSwitchToSpatial}
            className="liquid-glass rounded-full px-4 py-2 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all flex items-center space-x-2"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
            <span>Launch Desktop</span>
          </button>

          <button
            onClick={onOpenConsult}
            className="rounded-full px-4 py-2 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-95 shadow-lg shadow-indigo-500/20 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* 1px Divider Line with Gradient */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-[3px]" />
    </header>
  );
}
