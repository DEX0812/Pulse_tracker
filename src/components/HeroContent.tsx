"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroContentProps {
  onOpenConsult: () => void;
  onSwitchToSpatial: () => void;
}

export function HeroContent({ onOpenConsult, onSwitchToSpatial }: HeroContentProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-4 select-none my-auto">
      {/* Small Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-full px-4 py-1.5 mb-4 inline-flex items-center space-x-2 text-xs font-semibold text-white/80"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Next-Gen Enterprise Pulse Tracker Platform v3.0</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[90px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-normal leading-[1.02] tracking-[-0.024em] font-general text-white"
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        Pulse{" "}
        <span className="text-gradient-ai font-semibold">Tracker</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg leading-8 max-w-md mt-[9px] opacity-80 font-sans"
        style={{ color: "hsl(40, 6%, 82%)" }}
      >
        The most powerful AI ever deployed in talent acquisition & e-commerce risk prevention.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-[25px]"
      >
        <button
          onClick={onOpenConsult}
          className="liquid-glass rounded-full px-[29px] py-[24px] text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-all flex items-center space-x-2 group cursor-pointer"
        >
          <span>Schedule a Consult</span>
          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onSwitchToSpatial}
          className="rounded-full px-[29px] py-[24px] text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer"
        >
          Explore Spatial Canvas
        </button>
      </motion.div>
    </div>
  );
}
