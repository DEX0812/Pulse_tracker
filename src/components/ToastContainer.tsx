"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRTOStore } from "@/store/useRTOStore";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useEffect } from "react";

export function ToastContainer() {
  const toasts = useRTOStore((state) => state.toasts);
  const dismissToast = useRTOStore((state) => state.dismissToast);

  // Auto-dismiss after 5s
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dismissToast(toasts[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts, dismissToast]);

  return (
    <div className="fixed top-4 right-4 z-[999] flex flex-col space-y-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`pointer-events-auto p-3.5 rounded-lg border backdrop-blur-md shadow-2xl flex items-start space-x-3 text-xs ${
              toast.type === "warning"
                ? "bg-red-500/15 border-red-500/30 text-red-200"
                : toast.type === "success"
                ? "bg-green-500/15 border-green-500/30 text-green-200"
                : "bg-blue-500/15 border-blue-500/30 text-blue-200"
            }`}
          >
            {toast.type === "warning" && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === "success" && <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />}
            {toast.type === "info" && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}

            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-[11px] uppercase tracking-wider">{toast.title}</span>
              <span className="text-[11px] opacity-80 mt-0.5 leading-snug">{toast.message}</span>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="opacity-50 hover:opacity-100 transition-opacity p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
