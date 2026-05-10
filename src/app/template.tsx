"use client";

import { motion } from "framer-motion";

/**
 * template.tsx — Se ejecuta en CADA cambio de ruta.
 * Animación: fade + scale sutil, elegante y cinematográfico.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
