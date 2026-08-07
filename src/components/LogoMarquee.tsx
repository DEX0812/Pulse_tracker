"use client";

import { useRTOStore } from "@/store/useRTOStore";

const LOGOS = [
  { name: "Vortex", letter: "V" },
  { name: "Nimbus", letter: "N" },
  { name: "Prysma", letter: "P" },
  { name: "Cirrus", letter: "C" },
  { name: "Kynder", letter: "K" },
  { name: "Halcyn", letter: "H" },
];

// Duplicate for seamless infinite loop
const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

interface LogoMarqueeProps {
  onOpenAnalytics: () => void;
}

export function LogoMarquee({ onOpenAnalytics }: LogoMarqueeProps) {
  const isSimulating = useRTOStore((state) => state.isSimulating);
  const toggleSimulation = useRTOStore((state) => state.toggleSimulation);
  const orders = useRTOStore((state) => state.orders);

  return (
    <div className="w-full z-20 pb-10 select-none">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        {/* Left Side: Static Text */}
        <div className="text-white/50 text-sm font-medium shrink-0 text-center md:text-left leading-tight">
          Relied on by brands <br />
          across the globe
        </div>

        {/* Right Side: Infinite Marquee Window */}
        <div className="flex-1 overflow-hidden relative">
          {/* Gradient Masks for Edge Fading */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-hsl(260,87%,3%) to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-hsl(260,87%,3%) to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex items-center space-x-16 animate-marquee w-max py-2">
            {MARQUEE_LOGOS.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                onClick={onOpenAnalytics}
                className="flex items-center space-x-3 cursor-pointer group shrink-0 hover:scale-105 transition-transform"
              >
                <div className="w-6 h-6 rounded-lg liquid-glass flex items-center justify-center text-xs font-bold text-indigo-300">
                  {logo.letter}
                </div>
                <span className="text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
