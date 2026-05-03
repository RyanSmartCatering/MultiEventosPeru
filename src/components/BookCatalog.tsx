"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, MapPin, MessageCircle, BookOpen } from "lucide-react";

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

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    rotateY: direction > 0 ? 35 : -35,
    filter: "blur(5px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    rotateY: direction > 0 ? -35 : 35,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: "easeIn" as const },
  }),
};

export function BookCatalog({ event }: { event: Event }) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextPage = page + newDirection;
    if (nextPage < 0 || nextPage >= event.sections.length) return;
    setPage([nextPage, newDirection]);
  };

  const currentSection = event.sections[page];

  return (
    <div className="min-h-screen bg-[#00040c] text-white flex flex-col relative overflow-hidden">
      {/* Dot grid + orbs + gold accent */}
      <div className="fixed inset-0 dot-bg pointer-events-none" />
      <div className="fixed top-[-20vh] left-[-10vw] w-[55vw] h-[55vh] bg-gold/[0.05] rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-20vh] right-[-10vw] w-[45vw] h-[45vh] bg-midnight/80 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent pointer-events-none" />

      {/* ── BACK BUTTON ── */}
      <Link
        href="/empresa/ryan-smart-catering"
        className="glass-btn absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] text-white/70 hover:text-gold"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Volver
      </Link>

      {/* ── MAIN BOOK ── */}
      <div className="book-perspective flex-1 flex items-center justify-center px-2 md:px-6 py-6 md:py-8">
        <div className="w-full max-w-[1500px]">
          {/* Book container */}
          <div className="flex flex-col lg:flex-row w-full min-h-screen lg:min-h-[94vh] rounded-none overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8),_0_0_0_1px_rgba(255,195,0,0.12)]">

            {/* ── LEFT PAGE: Cover & Event Info (static) ── */}
            <div className="w-full lg:w-[42%] relative flex flex-col justify-between p-8 md:p-14 bg-[#000810] border-r border-gold/10 min-h-[50vh] lg:min-h-auto overflow-hidden">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <Image src={event.coverImage} alt={event.title} fill className="object-cover opacity-[0.18] grayscale sepia-[0.4] scale-105" priority />
                <div className="absolute inset-0 bg-gradient-to-br from-[#000810]/60 via-[#000810]/80 to-[#000810]" />
              </div>

              {/* Gold corner ornaments */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-gold/30 z-10" />
              <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-gold/30 z-10" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-gold/30 z-10" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-gold/30 z-10" />

              {/* Content */}
              <div className="relative z-10 mt-8">
                <div className="flex items-center gap-3 mb-8 opacity-60">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Menú Exclusivo</span>
                </div>
                <div className="w-20 h-[1px] bg-gold mb-8" />
                <h1 className="text-4xl md:text-6xl font-luxury mb-8 leading-[1.1] tracking-tight text-white/90">
                  {event.title}
                </h1>
                <div className="flex flex-col gap-3 text-xs uppercase tracking-widest text-white/40 mb-10 font-light border-l border-gold/20 pl-5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold/60" /><span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gold/60" /><span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Description at bottom */}
              <div className="relative z-10 mb-4">
                <p className="text-sm font-light leading-relaxed text-white/40 italic">
                  &ldquo;{event.description}&rdquo;
                </p>
                {/* Chapter index dots */}
                <div className="flex gap-2 mt-8">
                  {event.sections.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage([i, i > page ? 1 : -1])}
                      className={`h-[2px] transition-all duration-500 ${i === page ? 'w-8 bg-gold' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT PAGE: Animated Menu Content ── */}
            <div className="w-full lg:w-[58%] bg-[#00070f] relative overflow-hidden flex flex-col">
              {/* Chapter header */}
              <div className="px-8 md:px-14 pt-10 pb-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold/50 mb-1">
                    Capítulo {page + 1} / {event.sections.length}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={`title-${page}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" as const }}
                      className="text-3xl font-luxury text-gold tracking-wide"
                    >
                      {currentSection.title}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </div>

              {/* Animated items */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-8 md:px-14 py-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-8"
                  >
                    {currentSection.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center py-6 border-b border-white/5 last:border-0"
                      >
                        {/* Image */}
                        <div className="relative w-full sm:w-32 h-52 sm:h-32 flex-shrink-0 overflow-hidden rounded-sm border border-gold/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                          <Image
                            src={item.image} alt={item.name} fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 sepia-[0.15]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          {item.tag && (
                            <span className="inline-block text-[9px] uppercase tracking-[0.25em] text-gold border border-gold/25 px-3 py-1 mb-3 bg-gold/5 rounded-sm">
                              {item.tag}
                            </span>
                          )}
                          <h3 className="text-2xl font-luxury text-white/90 group-hover:text-gold transition-colors duration-300 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-white/40 font-light leading-relaxed max-w-md">
                            {item.description}
                          </p>
                          <div className="mt-4 w-6 h-[1px] bg-gold/30 group-hover:w-14 transition-all duration-500" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Page navigation controls ── */}
              <div className="px-8 md:px-14 py-6 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => paginate(-1)}
                  disabled={page === 0}
                  className="glass-btn flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] disabled:opacity-20 disabled:cursor-not-allowed text-white/70 hover:text-gold"
                >
                  <ChevronLeft className="w-4 h-4" /> Anterior
                </button>

                <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                  {currentSection.title}
                </span>

                <button
                  onClick={() => paginate(1)}
                  disabled={page === event.sections.length - 1}
                  className="glass-btn flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] disabled:opacity-20 disabled:cursor-not-allowed text-white/70 hover:text-gold"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WhatsApp floating button ── */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-gold text-black p-4 rounded-full shadow-[0_0_40px_rgba(255,195,0,0.35)] hover:scale-110 hover:shadow-[0_0_60px_rgba(255,195,0,0.5)] transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
