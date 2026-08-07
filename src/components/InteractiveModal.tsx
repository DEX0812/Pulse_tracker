"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2, ShieldCheck, BarChart3, TrendingUp, Cpu } from "lucide-react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "consult" | "analytics" | "docs";
}

export function InteractiveModal({ isOpen, onClose, type }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg liquid-glass rounded-2xl p-6 border border-white/15 bg-zinc-950/90 shadow-2xl z-10 text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Consult Modal */}
          {type === "consult" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-general">Schedule an Enterprise AI Consult</h3>
                  <p className="text-xs text-white/60">Deploy AntiGravity RTO Engine for your e-commerce stack</p>
                </div>
              </div>

              {submitted ? (
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl flex flex-col items-center text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <span className="text-sm font-semibold text-green-300">Consult Request Submitted!</span>
                  <span className="text-xs text-white/60">Our AI solutions architect will reach out within 2 hours.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-3 pt-2"
                >
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Company Name</label>
                    <input
                      required
                      placeholder="Acme Commerce Ltd"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="founder@acme.com"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Monthly Orders Volume</label>
                    <select className="w-full px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500">
                      <option>1,000 - 10,000 Orders/mo</option>
                      <option>10,000 - 50,000 Orders/mo</option>
                      <option>50,000+ Enterprise Orders/mo</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold text-xs text-white hover:opacity-90 transition-opacity mt-2"
                  >
                    Confirm Consultation Booking
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Analytics Modal */}
          {type === "analytics" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-general">AI Risk Performance Metrics</h3>
                  <p className="text-xs text-white/60">Live telemetry across 140+ global e-commerce deployments</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 tracking-wider">Model Accuracy</span>
                  <div className="text-2xl font-bold font-mono text-indigo-400">98.4%</div>
                  <div className="text-[10px] text-green-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> +2.1% this month
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 tracking-wider">RTO Losses Prevented</span>
                  <div className="text-2xl font-bold font-mono text-green-400">₹14.2M</div>
                  <div className="text-[10px] text-white/40">Across 840+ COD conversions</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 tracking-wider">Avg Latency</span>
                  <div className="text-2xl font-bold font-mono text-amber-300">14ms</div>
                  <div className="text-[10px] text-white/40">Real-time edge processing</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-white/40 tracking-wider">Active Engine</span>
                  <div className="text-2xl font-bold font-mono text-purple-400">v3.0 Spatial</div>
                  <div className="text-[10px] text-green-400 flex items-center">
                    <Cpu className="w-3 h-3 mr-1" /> Neural Network Active
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Docs Modal */}
          {type === "docs" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-general">Pulse Tracker Engine Architecture</h3>
                  <p className="text-xs text-white/60">How the spatial risk scoring system works</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-white/80 leading-relaxed pt-2">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="font-semibold text-indigo-300 block mb-0.5">1. Telemetry Ingestion</span>
                  Coordinates IP geolocation, telecom SIM registries, and device fingerprints at checkout.
                </div>
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="font-semibold text-purple-300 block mb-0.5">2. Anomaly Scoring</span>
                  Detects address omissions, duplicate size variants (wardrobing intent), and past non-delivery rates.
                </div>
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-lg">
                  <span className="font-semibold text-amber-300 block mb-0.5">3. Automated Interventions</span>
                  Triggers dynamic discounts or WhatsApp OTP verification to convert high-risk COD to Prepaid.
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
