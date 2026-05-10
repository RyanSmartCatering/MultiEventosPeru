"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Calendar, MapPin,
  MessageCircle, ArrowLeft, Star
} from "lucide-react";
import { UserNav } from "@/components/UserNav";

type MenuItem = { name: string; description: string; image: string; tag?: string };
type Section = { id: string; title: string; items: MenuItem[] };
type Event = {
  title: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  sections: Section[];
};

/* ─────────────────────────────── animations ─────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.4, ease: [0.55, 0, 0.78, 0] as const },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ─────────────────────────────── component ─────────────────────────────── */
export function BookCatalog({ event }: { event: Event }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const totalPages = event.sections.length;
  const currentSection = event.sections[page];

  const paginate = useCallback(
    (dir: number) => {
      const next = page + dir;
      if (next < 0 || next >= totalPages) return;
      setPage([next, dir]);
    },
    [page, totalPages]
  );

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") paginate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") paginate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paginate]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#00040c] text-white flex flex-col">

      {/* ── Global luxury background ── */}
      <div className="bg-dots" />
      <div className="bg-diag" />
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-line-top" />
      <div className="bg-line-bottom" />

      {/* ── Dynamic cover bg (blurred, behind everything) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${page}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={event.coverImage}
            alt=""
            fill
            className="object-cover opacity-[0.08] grayscale scale-110"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════ TOP BAR ══════════════════════ */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.05] bg-[#00040c]/70 backdrop-blur-2xl flex-shrink-0">
        {/* Back button */}
        <Link
          href="/explorar"
          className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] uppercase tracking-[0.3em] hidden sm:block">Explorar</span>
        </Link>

        {/* Center: event title */}
        <div className="flex flex-col items-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-gold/40 mb-0.5">Menú Exclusivo</p>
          <h1 className="text-sm md:text-base font-luxury tracking-wide text-white/80 truncate max-w-[200px] md:max-w-xs">
            {event.title}
          </h1>
        </div>

        {/* Right: UserNav */}
        <UserNav />
      </header>

      {/* ══════════════════════ MAIN BODY ══════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ─────── LEFT PANEL — Cover & Navigation ─────── */}
        <aside className="
          relative flex-shrink-0
          w-full lg:w-[320px] xl:w-[380px]
          h-48 lg:h-full
          overflow-hidden
          border-b lg:border-b-0 lg:border-r border-gold/[0.12]
        ">
          {/* Cover image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cover-${page}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={event.coverImage}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00040c] via-[#00040c]/60 to-[#00040c]/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00040c]/40 z-10" />

          {/* Gold corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/40 z-20 hidden lg:block" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/40 z-20 hidden lg:block" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/40 z-20 hidden lg:block" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/40 z-20 hidden lg:block" />

          {/* Event info (bottom of left panel) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8">
            {/* Stars */}
            <div className="flex gap-1 mb-3 hidden lg:flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold text-gold" />
              ))}
            </div>

            <div className="flex items-center gap-2 mb-2 lg:mb-4 hidden lg:flex">
              <div className="w-6 h-[1px] bg-gold/50" />
              <span className="text-[9px] uppercase tracking-[0.4em] text-gold/60">Ryan Smart Catering</span>
            </div>

            <div className="hidden lg:flex flex-col gap-2 text-white/40 text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-gold/50" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-gold/50" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Chapter dots nav */}
            <div className="flex gap-2 mt-4 lg:mt-8">
              {event.sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > page ? 1 : -1])}
                  title={s.title}
                  className={`transition-all duration-500 rounded-full ${
                    i === page
                      ? "w-8 h-[3px] bg-gold shadow-[0_0_8px_rgba(255,195,0,0.6)]"
                      : "w-[6px] h-[6px] bg-white/20 hover:bg-gold/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* ─────── RIGHT PANEL — Animated Menu Content ─────── */}
        <div className="relative flex-1 flex flex-col overflow-hidden">

          {/* Section header */}
          <div className="flex-shrink-0 px-6 md:px-12 pt-6 pb-4 border-b border-white/[0.04]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`header-${page}`}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-end justify-between"
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-gold/40 mb-1">
                    Capítulo {page + 1} de {totalPages}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-luxury text-white/90 tracking-wide">
                    {currentSection.title}
                  </h2>
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 hidden md:block pb-1">
                  {currentSection.items.length} especialidades
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Items grid — SCROLLABLE only inside this panel */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-6 md:px-12 py-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full"
              >
                {currentSection.items.map((item, idx) => (
                  <motion.div
                    key={`${page}-${idx}`}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    onHoverStart={() => setHoveredItem(idx)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="group relative overflow-hidden rounded-sm border border-white/[0.06] hover:border-gold/30 transition-all duration-500 cursor-default bg-white/[0.02] hover:bg-white/[0.04]"
                    style={{ minHeight: "200px" }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 sepia-[0.2]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00040c]/95 via-[#00040c]/50 to-transparent" />
                    </div>

                    {/* Gold corner accent */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/0 group-hover:border-gold/40 transition-all duration-500 z-10" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/0 group-hover:border-gold/40 transition-all duration-500 z-10" />

                    {/* Tag */}
                    {item.tag && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="text-[8px] uppercase tracking-[0.25em] text-gold border border-gold/30 bg-gold/10 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-5">
                      <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-xl md:text-2xl font-luxury text-white/90 group-hover:text-gold transition-colors duration-300 mb-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-white/35 font-light leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                          {item.description}
                        </p>
                        {/* Expanding gold line */}
                        <div className="mt-3 h-[1px] bg-gold/30 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                      </div>
                    </div>

                    {/* Hover gold glow */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      animate={{ opacity: hoveredItem === idx ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,195,0,0.06) 0%, transparent 70%)" }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Bottom navigation ─── */}
          <div className="flex-shrink-0 px-6 md:px-12 py-4 border-t border-white/[0.04] bg-[#00040c]/50 backdrop-blur-md flex items-center justify-between">
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className="glass-btn flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] disabled:opacity-20 disabled:cursor-not-allowed text-white/60 hover:text-gold hover:border-gold/40 transition-all duration-300 group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Anterior
            </button>

            {/* Progress indicator */}
            <div className="flex items-center gap-1">
              {event.sections.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > page ? 1 : -1])}
                  className={`h-[2px] rounded-full transition-all duration-500 ${
                    i === page ? "w-8 bg-gold" : "w-3 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              disabled={page === totalPages - 1}
              className="glass-btn flex items-center gap-2.5 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] disabled:opacity-20 disabled:cursor-not-allowed text-white/60 hover:text-gold hover:border-gold/40 transition-all duration-300 group"
            >
              Siguiente
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* ── WhatsApp floating button ── */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-gold text-black p-4 rounded-full shadow-[0_0_40px_rgba(255,195,0,0.4)] hover:scale-110 hover:shadow-[0_0_60px_rgba(255,195,0,0.6)] transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
