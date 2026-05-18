"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CatalogItem = {
  id?: string;
  name: string;
  desc?: string;
  description?: string;
  longText?: string[];
  features?: string[];
  image: string;
  tag?: string;
  price?: string;
};

type CatalogSection = {
  id: string;
  title: string;
  description?: string;
  items: CatalogItem[];
};

type CatalogEvent = {
  id: string;
  title: string;
  company?: string;
  date?: string;
  location?: string;
  pax?: string;
  coverImage: string;
  description: string;
  sections: CatalogSection[];
};

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event!;

  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  const activeItem = activeSection ? activeSection.items[activeItemIndex] : null;

  const goToSection = (index: number) => {
    setActiveSectionIndex(index);
    setActiveItemIndex(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeSection) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        setActiveItemIndex(prev => Math.min(prev + 1, activeSection.items.length - 1));
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        setActiveItemIndex(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  const companySlug = (catalog.company || "ryan-smart-catering").toLowerCase().replace(/ /g, "-");

  return (
    <main className="h-[100dvh] w-full bg-[#00050f] text-white overflow-hidden flex flex-col relative">

      {/* Background image — baja opacidad */}
      <div className="absolute inset-0 z-0">
        <Image src={catalog.coverImage} alt="fondo" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00050f]/95 via-[#00050f]/85 to-[#00050f]/95" />
      </div>
      <div className="bg-dots" style={{ opacity: 0.4 }} />
      <div className="bg-line-top" />

      {/* ── TOP BAR ── */}
      <header className="relative z-50 flex-none flex items-center justify-between px-5 md:px-8 py-3 border-b border-white/[0.06] bg-[#00050f]/60 backdrop-blur-xl">
        <Link href={`/empresa/${companySlug}`} className="group flex items-center gap-2 text-white/40 hover:text-gold transition-colors">
          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center group-hover:border-gold/40 bg-white/5">
            <ArrowLeft className="w-3 h-3" />
          </div>
          <span className="hidden md:block text-[10px] uppercase tracking-[0.3em]">Volver</span>
        </Link>

        {/* Title */}
        <div className="text-center">
          <p className="text-[8px] uppercase tracking-[0.4em] text-gold/50">{catalog.company}</p>
          <h1 className="text-sm font-luxury text-white/80 truncate max-w-[280px]">{catalog.title}</h1>
        </div>

        <div className="flex gap-2">
          <button onClick={handleShare} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/30 transition-all bg-white/5 backdrop-blur-md">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-white/50" />}
          </button>
          <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/30 transition-all bg-white/5 backdrop-blur-md">
            <Download className="w-3.5 h-3.5 text-white/50" />
          </button>
        </div>
      </header>

      {/* ── THREE-PANEL LAYOUT ── */}
      <div className="relative z-10 flex-1 flex overflow-hidden">

        {/* ═══ PANEL 1: SECCIONES (izquierda) ═══ */}
        <div className="flex-none w-44 md:w-52 border-r border-white/[0.06] flex flex-col bg-[#00050f]/40 backdrop-blur-sm">
          <div className="px-4 py-4 border-b border-white/[0.05]">
            <p className="text-[8px] uppercase tracking-[0.4em] text-gold/40">Secciones</p>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
            {/* Portada */}
            <button
              onClick={() => goToSection(-1)}
              className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center gap-3 ${
                activeSectionIndex === -1
                  ? "bg-gold/10 border-r-2 border-gold text-gold"
                  : "text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
              }`}
            >
              <span className="text-[9px] font-luxury uppercase tracking-wide">Portada</span>
            </button>

            {catalog.sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => goToSection(idx)}
                className={`w-full text-left px-4 py-3 transition-all duration-200 border-r-2 ${
                  activeSectionIndex === idx
                    ? "bg-gold/10 border-gold text-gold"
                    : "border-transparent text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
              >
                <p className="text-[9px] font-luxury uppercase tracking-wide leading-tight">{sec.title}</p>
                <p className="text-[8px] text-current opacity-50 mt-0.5">{sec.items.length} {sec.items.length === 1 ? "ítem" : "ítems"}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ PANEL 2: ÍTEMS (centro) — solo visible cuando hay sección activa ═══ */}
        <AnimatePresence mode="wait">
          {activeSectionIndex >= 0 && activeSection ? (
            <motion.div
              key={`items-${activeSectionIndex}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-none w-44 md:w-56 border-r border-white/[0.06] flex flex-col bg-[#00050f]/20"
            >
              <div className="px-4 py-4 border-b border-white/[0.05]">
                <p className="text-[8px] uppercase tracking-[0.35em] text-gold/40 mb-0.5">Ítems</p>
                <p className="text-xs font-luxury text-white/60 truncate">{activeSection.title}</p>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
                {activeSection.items.map((item, idx) => (
                  <button
                    key={item.id ?? idx}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`w-full text-left px-4 py-3 transition-all duration-200 border-r-2 relative ${
                      activeItemIndex === idx
                        ? "bg-white/[0.06] border-gold/60 text-white"
                        : "border-transparent text-white/35 hover:text-white/70 hover:bg-white/[0.03]"
                    }`}
                  >
                    {activeItemIndex === idx && (
                      <motion.div layoutId="item-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gold rounded-r-full" />
                    )}
                    <p className="text-[10px] font-medium leading-tight">{item.name}</p>
                    {item.tag && (
                      <span className="text-[8px] uppercase tracking-wider text-gold/50">{item.tag}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex-none px-4 py-3 border-t border-white/[0.05]">
                <p className="text-[8px] text-white/20 uppercase tracking-widest">↑ ↓ para navegar</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* ═══ PANEL 3: DETALLE / PORTADA (derecha) ═══ */}
        <div className="flex-1 overflow-hidden flex flex-col min-w-0">
          <AnimatePresence mode="wait">

            {/* ── PORTADA ── */}
            {activeSectionIndex === -1 ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col justify-center px-8 md:px-14 py-8 overflow-y-auto scrollbar-hide"
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-gold/25 bg-gold/8 backdrop-blur-md mb-6 w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">Dossier Oficial</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-luxury text-white leading-[1.08] mb-4">{catalog.title}</h2>
                <p className="text-base md:text-lg text-white/55 font-light leading-relaxed mb-8 max-w-2xl">{catalog.description}</p>

                <div className="flex flex-wrap gap-4 mb-10">
                  {catalog.location && (
                    <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                      <MapPin className="w-4 h-4 text-gold" />
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-gold/60">Locación</p>
                        <p className="text-xs text-white font-medium">{catalog.location}</p>
                      </div>
                    </div>
                  )}
                  {catalog.date && (
                    <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                      <Calendar className="w-4 h-4 text-gold" />
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-gold/60">Fecha</p>
                        <p className="text-xs text-white font-medium">{catalog.date}</p>
                      </div>
                    </div>
                  )}
                  {catalog.pax && (
                    <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3">
                      <Clock className="w-4 h-4 text-gold" />
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-gold/60">Asistentes</p>
                        <p className="text-xs text-white font-medium">{catalog.pax}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tabla de contenidos */}
                <div className="border-t border-white/[0.06] pt-6">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-4">Contenido del dossier</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {catalog.sections.map((sec, idx) => (
                      <button
                        key={sec.id}
                        onClick={() => goToSection(idx)}
                        className="group flex items-center gap-3 text-left p-3 rounded-lg border border-white/[0.06] hover:border-gold/30 hover:bg-gold/[0.04] transition-all"
                      >
                        <span className="text-xs font-luxury text-gold/40 group-hover:text-gold transition-colors">{String(idx + 1).padStart(2, "0")}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white/60 group-hover:text-white transition-colors truncate">{sec.title}</p>
                          <p className="text-[8px] text-white/25">{sec.items.length} ítems</p>
                        </div>
                        <ChevronDown className="w-3 h-3 text-white/20 group-hover:text-gold -rotate-90 transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

            ) : activeSection && activeItem ? (

              /* ── DETALLE DE ÍTEM ── */
              <motion.div
                key={`detail-${activeSectionIndex}-${activeItemIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex-1 overflow-y-auto scrollbar-hide px-6 md:px-10 py-8 custom-scrollbar"
              >
                {/* Section breadcrumb */}
                <p className="text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-4">
                  {activeSection.title} / ítem {activeItemIndex + 1} de {activeSection.items.length}
                </p>

                {/* Tag */}
                {activeItem.tag && (
                  <span className="inline-block px-3 py-1 border border-gold/25 rounded-full text-[9px] uppercase tracking-[0.3em] text-gold mb-4">
                    {activeItem.tag}
                  </span>
                )}

                {/* Title */}
                <h2 className="text-2xl md:text-4xl font-luxury text-white mb-3 leading-tight">{activeItem.name}</h2>

                {/* Subtitle */}
                {(activeItem.desc || activeItem.description) && (
                  <p className="text-base md:text-lg text-white/65 font-light leading-relaxed mb-6">
                    {activeItem.desc || activeItem.description}
                  </p>
                )}

                {/* Price / highlight */}
                {activeItem.price && (
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gold/8 border border-gold/20 mb-6">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium text-white">{activeItem.price}</span>
                  </div>
                )}

                {/* Long text paragraphs */}
                {activeItem.longText && activeItem.longText.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {activeItem.longText.map((p, i) => (
                      <p key={i} className="text-sm text-white/60 font-light leading-loose">{p}</p>
                    ))}
                  </div>
                )}

                {/* Features list */}
                {activeItem.features && activeItem.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/[0.07]">
                    <p className="text-[9px] uppercase tracking-[0.35em] text-white/30 mb-5 font-bold">Detalle / Incluye</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeItem.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                          <span className="text-xs text-white/70 font-light leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
