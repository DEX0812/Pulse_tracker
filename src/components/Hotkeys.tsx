"use client";

import { useEffect } from "react";
import { useRTOStore } from "@/store/useRTOStore";

export function Hotkeys() {
  const toggleSimulation = useRTOStore((state) => state.toggleSimulation);
  const selectOrder = useRTOStore((state) => state.selectOrder);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S -> Toggle Simulation
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        toggleSimulation();
      }

      // Escape -> Deselect order (neutral state)
      if (e.key === "Escape") {
        e.preventDefault();
        selectOrder(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSimulation, selectOrder]);

  return null;
}
