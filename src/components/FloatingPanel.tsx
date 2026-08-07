"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRTOStore } from "@/store/useRTOStore";

interface FloatingPanelProps {
  title: string;
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  width?: number;
  height?: number;
  className?: string;
  isWarning?: boolean;
}

export function FloatingPanel({ 
  title, 
  children, 
  initialX = 100, 
  initialY = 100,
  width,
  height,
  className,
  isWarning = false,
}: FloatingPanelProps) {
  const resetKey = useRTOStore((state) => state.resetKey);
  const [pos, setPos] = useState({ x: initialX, y: initialY });

  // Reset to initial coordinates when resetDashboard is invoked
  useEffect(() => {
    setPos({ x: initialX, y: initialY });
  }, [resetKey, initialX, initialY]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{ left: 10, top: 10, right: 1200, bottom: 600 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 250, 
        damping: 25,
      }}
      onDragEnd={(_, info) => {
        setPos((prev) => ({
          x: Math.max(10, Math.min(1200, prev.x + info.offset.x)),
          y: Math.max(10, Math.min(650, prev.y + info.offset.y)),
        }));
      }}
      whileHover={{ boxShadow: isWarning ? "0 0 30px rgba(239, 68, 68, 0.35)" : "0 16px 45px 0 rgba(0, 0, 0, 0.6)" }}
      whileDrag={{ scale: 1.015, cursor: "grabbing" }}
      className={cn(
        "glass-panel absolute overflow-hidden flex flex-col cursor-grab transition-all duration-300",
        isWarning && "border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.3)] animate-pulse",
        className
      )}
      style={{ width, height, originX: 0.5, originY: 0.5 }}
    >
      {/* Title Bar */}
      <div className={cn(
        "px-4 py-2.5 border-b text-[10px] font-bold uppercase tracking-widest select-none flex items-center justify-between transition-colors duration-300",
        isWarning 
          ? "border-red-500/25 bg-red-500/10 text-red-300" 
          : "border-white/10 bg-white/5 text-white/80"
      )}>
        <div className="flex items-center space-x-2">
          <span className={cn(
            "w-2 h-2 rounded-full",
            isWarning ? "bg-red-400 animate-ping" : "bg-indigo-400"
          )} />
          <span>{title}</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-auto relative cursor-auto p-4">
        {children}
      </div>
    </motion.div>
  );
}
