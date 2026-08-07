"use client";

import { useState, useEffect } from "react";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { HeroNavbar } from "@/components/HeroNavbar";
import { HeroContent } from "@/components/HeroContent";
import { LogoMarquee } from "@/components/LogoMarquee";
import { InteractiveModal } from "@/components/InteractiveModal";
import { FloatingPanel } from "@/components/FloatingPanel";
import { LiveOrderStream } from "@/components/LiveOrderStream";
import { RiskAnalyzer } from "@/components/RiskAnalyzer";
import { CustomerProfile } from "@/components/CustomerProfile";
import { InterventionEngine } from "@/components/InterventionEngine";
import { ToastContainer } from "@/components/ToastContainer";
import { Hotkeys } from "@/components/Hotkeys";
import { useRTOStore } from "@/store/useRTOStore";
import { evaluateOrderRisk } from "@/lib/riskEngine";
import { RefreshCw, Play, Pause, Sparkles, Home as HomeIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [viewMode, setViewMode] = useState<"hero" | "spatial">("hero");
  const [activeModal, setActiveModal] = useState<"consult" | "analytics" | "docs" | null>(null);

  const selectedOrderId = useRTOStore((state) => state.selectedOrderId);
  const orders = useRTOStore((state) => state.orders);
  const rules = useRTOStore((state) => state.rules);
  const isSimulating = useRTOStore((state) => state.isSimulating);
  const pushSimulatedOrder = useRTOStore((state) => state.pushSimulatedOrder);
  const resetDashboard = useRTOStore((state) => state.resetDashboard);
  const toggleSimulation = useRTOStore((state) => state.toggleSimulation);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || null;
  const analysis = selectedOrder ? evaluateOrderRisk(selectedOrder, rules) : null;
  const isHighRisk = analysis ? analysis.score >= 75 : false;

  // Simulation Interval Loop
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        pushSimulatedOrder();
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isSimulating, pushSimulatedOrder]);

  return (
    <main className="w-full min-h-screen relative overflow-hidden select-none bg-hsl(260,87%,3%)">
      <ToastContainer />
      <Hotkeys />

      {/* Interactive Modal Handler */}
      <InteractiveModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        type={activeModal || "consult"}
      />

      <AnimatePresence mode="wait">
        {viewMode === "hero" ? (
          /* ========================================== */
          /*         FULL-SCREEN DARK HERO SECTION      */
          /* ========================================== */
          <motion.div
            key="hero-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen flex flex-col relative z-10 overflow-visible"
          >
            {/* Loop Video Background & Blur Shape */}
            <BackgroundVideo />

            {/* Navbar */}
            <HeroNavbar
              onOpenConsult={() => setActiveModal("consult")}
              onOpenAnalytics={() => setActiveModal("analytics")}
              onOpenDocs={() => setActiveModal("docs")}
              onSwitchToSpatial={() => setViewMode("spatial")}
            />

            {/* Hero Content (Vertically Centered) */}
            <HeroContent
              onOpenConsult={() => setActiveModal("consult")}
              onSwitchToSpatial={() => setViewMode("spatial")}
            />

            {/* Logo Marquee & Live Stats (Pinned Bottom) */}
            <LogoMarquee onOpenAnalytics={() => setActiveModal("analytics")} />
          </motion.div>
        ) : (
          /* ========================================== */
          /*            SPATIAL DESKTOP CANVAS          */
          /* ========================================== */
          <motion.div
            key="spatial-view"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-screen relative overflow-hidden"
          >
            {/* Ambient Lighting */}
            <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
              isHighRisk ? 'bg-red-500/15' : 'bg-indigo-500/15'
            }`} />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Live Order Stream Panel */}
            <FloatingPanel title="Live Order Stream" initialX={40} initialY={60} width={320} height={560}>
              <LiveOrderStream />
            </FloatingPanel>

            {/* AI Risk Analyzer Panel */}
            <FloatingPanel 
              title="AI Risk Analyzer" 
              initialX={390} 
              initialY={60} 
              width={370} 
              height={340}
              isWarning={isHighRisk}
            >
              <RiskAnalyzer />
            </FloatingPanel>

            {/* Customer Profile Panel */}
            <FloatingPanel title="Customer Profile" initialX={390} initialY={420} width={370} height={320}>
              <CustomerProfile />
            </FloatingPanel>

            {/* Intervention Engine Panel */}
            <FloatingPanel title="Intervention Engine" initialX={790} initialY={60} width={340} height={460}>
              <InterventionEngine />
            </FloatingPanel>

            {/* Bottom Spatial Status Bar */}
            <div className="absolute bottom-0 left-0 w-full h-9 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-4 text-xs text-white/60 font-mono z-[100]">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode("hero")}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all font-sans font-medium text-xs cursor-pointer"
                >
                  <HomeIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Return to Hero View</span>
                </button>

                <span className="text-gradient-ai font-bold font-sans text-sm hidden sm:inline">Pulse Tracker Engine</span>
                <span className="hidden sm:inline text-white/40">v3.0</span>
                
                {/* Simulation Toggle Pill */}
                <button
                  onClick={toggleSimulation}
                  className={`flex items-center px-2 py-0.5 rounded text-[10px] border transition-colors cursor-pointer ${
                    isSimulating 
                      ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                      : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isSimulating ? <Pause className="w-2.5 h-2.5 mr-1" /> : <Play className="w-2.5 h-2.5 mr-1" />}
                  {isSimulating ? 'Simulating' : 'Start Simulation'} (Ctrl+S)
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[10px] text-white/40 hidden md:inline">
                  Esc to clear selection
                </span>

                {/* Reset Dashboard Button */}
                <button
                  onClick={resetDashboard}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-xs cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Layout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
