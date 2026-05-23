"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, CheckCircle2, ChevronDown, Menu, X } from "lucide-react";
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

  // -1 es la portada.
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Accordion state (qué sección está expandida en el índice)
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  const activeItem = activeSection ? activeSection.items[activeItemIndex] : null;

  const goToItem = (sectionIdx: number, itemIdx: number) => {
    setActiveSectionIndex(sectionIdx);
    setActiveItemIndex(itemIdx);
    setIsMobileMenuOpen(false); // Cerrar menú en móvil al seleccionar
  };

  const goToCover = () => {
    setActiveSectionIndex(-1);
    setIsMobileMenuOpen(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeSection) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (activeItemIndex < activeSection.items.length - 1) {
          setActiveItemIndex(prev => prev + 1);
        } else if (activeSectionIndex < catalog.sections.length - 1) {
          // Salto a la siguiente sección
          goToItem(activeSectionIndex + 1, 0);
          setExpandedSection(activeSectionIndex + 1);
        }
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (activeItemIndex > 0) {
          setActiveItemIndex(prev => prev - 1);
        } else if (activeSectionIndex > 0) {
          // Salto a la sección anterior (último ítem)
          const prevSec = catalog.sections[activeSectionIndex - 1];
          goToItem(activeSectionIndex - 1, prevSec.items.length - 1);
          setExpandedSection(activeSectionIndex - 1);
        } else if (activeSectionIndex === 0) {
          goToCover();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, activeItemIndex, activeSectionIndex, catalog.sections]);

  const companySlug = (catalog.company || "ryan-smart-catering").toLowerCase().replace(/ /g, "-");

  // Efectos de transición 3D
  const pageTransition = {
    initial: { opacity: 0, scale: 0.96, filter: "blur(8px)", y: 20 },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, scale: 1.04, filter: "blur(8px)", y: -20 },
    transition: { duration: 0.4, ease: "easeInOut" as const }
  };

  return (
    <main className="h-[100dvh] w-full bg-[#00050f] text-white overflow-hidden flex flex-col relative font-sans">
      
      {/* Background Universal */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src={catalog.coverImage} alt="fondo" fill className="object-cover opacity-[0.03] mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00050f]/95 via-[#00050f]/90 to-[#000105]" />
      </div>

      {/* ── TOP BAR (Global) ── */}
      <header className="relative z-50 flex-none flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/[0.04] bg-[#00050f]/80 backdrop-blur-2xl">
        <div className="flex items-center gap-4">
          <Link href={`/empresa/${companySlug}`} className="group w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all">
            <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-[#D4AF37] transition-colors" />
          </Link>
          
          <div className="hidden md:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-bold mb-1">{catalog.company}</p>
            <h1 className="text-sm font-luxury text-white truncate max-w-[300px]">{catalog.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botón de Índice en Móvil */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]"
          >
            <Menu className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Índice</span>
          </button>

          <button onClick={handleShare} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all bg-white/[0.02]">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-white/60" />}
          </button>
          <button className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all bg-white/[0.02]">
            <Download className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </header>

      {/* ── SPLIT VIEW LAYOUT ── */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        
        {/* ═══ PANEL IZQUIERDO: ÍNDICE (Desktop/Tablet) ═══ */}
        <aside className="hidden md:flex w-72 lg:w-80 border-r border-white/[0.04] bg-[#020617]/40 flex-col">
          <div className="p-6 border-b border-white/[0.04]">
            <h3 className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">Índice del Catálogo</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
            
            {/* Botón Portada */}
            <button
              onClick={goToCover}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                activeSectionIndex === -1 ? "bg-[#D4AF37]/15 border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)]" : "hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeSectionIndex === -1 ? "bg-[#D4AF37]" : "bg-white/20"}`} />
              <span className={`text-sm font-luxury ${activeSectionIndex === -1 ? "text-[#D4AF37]" : "text-white/70"}`}>Portada Principal</span>
            </button>

            {/* Secciones (Accordion) */}
            {catalog.sections.map((sec, secIdx) => {
              const isExpanded = expandedSection === secIdx;
              const isActiveSection = activeSectionIndex === secIdx;

              return (
                <div key={sec.id} className="pt-2">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : secIdx)}
                    className="w-full flex items-center justify-between px-2 py-2 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-luxury ${isActiveSection ? "text-[#D4AF37]" : "text-white/40 group-hover:text-white/70 transition-colors"}`}>
                        {String(secIdx + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-sm font-medium tracking-wide ${isActiveSection ? "text-white" : "text-white/60 group-hover:text-white transition-colors"}`}>
                        {sec.title}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-6 pl-3 border-l border-white/10 mt-2 space-y-1"
                      >
                        {sec.items.map((item, itemIdx) => {
                          const isSelectedItem = isActiveSection && activeItemIndex === itemIdx;
                          return (
                            <button
                              key={item.id ?? itemIdx}
                              onClick={() => goToItem(secIdx, itemIdx)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                isSelectedItem ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium" : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                              }`}
                            >
                              <span className="text-xs">{item.name}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ═══ PANEL DERECHO: PÁGINA (Inmersiva) ═══ */}
        <div className="flex-1 overflow-hidden relative bg-[#00050f]/30">
          <AnimatePresence mode="wait">
            
            {/* --- PORTADA --- */}
            {activeSectionIndex === -1 ? (
              <motion.div key="cover-page" {...pageTransition} className="absolute inset-0 overflow-y-auto custom-scrollbar px-6 md:px-16 py-12 md:py-20 flex flex-col justify-center">
                <div className="max-w-4xl mx-auto w-full">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold">Dossier Técnico Oficial</span>
                  </div>

                  <h2 className="text-5xl md:text-7xl font-luxury text-white leading-[1.1] mb-6 drop-shadow-xl">{catalog.title}</h2>
                  <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-12 max-w-3xl">{catalog.description}</p>

                  <div className="flex flex-wrap gap-5 mb-16">
                    {catalog.location && (
                      <div className="flex items-center gap-4 bg-[#050B14]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-full md:w-auto">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/70 font-bold mb-1">Locación</p>
                          <p className="text-sm md:text-base text-white font-medium">{catalog.location}</p>
                        </div>
                      </div>
                    )}
                    {catalog.date && (
                      <div className="flex items-center gap-4 bg-[#050B14]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-full md:w-auto">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/70 font-bold mb-1">Fecha</p>
                          <p className="text-sm md:text-base text-white font-medium">{catalog.date}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => { setExpandedSection(0); goToItem(0, 0); }}
                    className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  >
                    Empezar Lectura
                  </button>
                </div>
              </motion.div>

            ) : activeSection && activeItem ? (

              /* --- PÁGINA DE CONTENIDO --- */
              <motion.div key={`item-${activeSectionIndex}-${activeItemIndex}`} {...pageTransition} className="absolute inset-0 overflow-y-auto custom-scrollbar">
                
                {/* Imagen Hero (si la tiene) */}
                {activeItem.image && (
                  <div className="w-full h-[30vh] md:h-[40vh] relative flex-none">
                    <Image src={activeItem.image} alt={activeItem.name} fill className="object-cover opacity-60" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00050f] via-[#00050f]/60 to-transparent" />
                  </div>
                )}

                <div className={`px-6 md:px-16 pb-20 max-w-4xl mx-auto ${activeItem.image ? '-mt-24 relative z-10' : 'pt-16'}`}>
                  
                  {/* Breadcrumb & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#D4AF37]/70 font-bold">
                      {activeSection.title} <span className="mx-2 text-white/20">/</span> {activeItemIndex + 1} de {activeSection.items.length}
                    </p>
                    {activeItem.tag && (
                      <span className="px-3 py-1.5 border border-[#D4AF37]/40 bg-[#D4AF37]/10 rounded-full text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold backdrop-blur-md">
                        {activeItem.tag}
                      </span>
                    )}
                  </div>

                  <h2 className="text-4xl md:text-5xl font-luxury text-white mb-6 leading-[1.1]">{activeItem.name}</h2>

                  {(activeItem.desc || activeItem.description) && (
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10">
                      {activeItem.desc || activeItem.description}
                    </p>
                  )}

                  {activeItem.price && (
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 mb-10 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                      <span className="text-base font-bold text-white tracking-wide">{activeItem.price}</span>
                    </div>
                  )}

                  {activeItem.longText && activeItem.longText.length > 0 && (
                    <div className="space-y-6 mb-12">
                      {activeItem.longText.map((p, i) => (
                        <p key={i} className="text-base md:text-lg text-white/60 font-light leading-[1.8]">{p}</p>
                      ))}
                    </div>
                  )}

                  {activeItem.features && activeItem.features.length > 0 && (
                    <div className="mt-10 pt-10 border-t border-white/[0.06]">
                      <h3 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-8">Detalles Específicos</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {activeItem.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#050B14]/60 border border-white/[0.05] hover:border-[#D4AF37]/30 hover:bg-[#050B14] transition-all">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                            <span className="text-sm md:text-base text-white/80 font-light leading-relaxed">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mobile Next Item Button */}
                  <div className="mt-16 flex justify-end md:hidden">
                    <button 
                      onClick={() => {
                        const event = new KeyboardEvent('keydown', { 'key': 'ArrowRight' });
                        window.dispatchEvent(event);
                      }}
                      className="flex items-center gap-3 text-[#D4AF37] font-bold text-xs uppercase tracking-widest bg-[#D4AF37]/10 px-6 py-3 rounded-full border border-[#D4AF37]/30"
                    >
                      Siguiente <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

      </div>

      {/* ── MOBILE OVERLAY MENU ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">Índice del Catálogo</h3>
              <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <button
                onClick={goToCover}
                className={`w-full text-left px-5 py-4 rounded-xl border ${activeSectionIndex === -1 ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]" : "bg-white/5 border-transparent text-white"}`}
              >
                <span className="text-lg font-luxury">Portada Principal</span>
              </button>

              {catalog.sections.map((sec, secIdx) => {
                const isExpanded = expandedSection === secIdx;
                const isActiveSection = activeSectionIndex === secIdx;

                return (
                  <div key={sec.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/5">
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : secIdx)}
                      className="w-full flex items-center justify-between p-5"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-base font-luxury ${isActiveSection ? "text-[#D4AF37]" : "text-white/50"}`}>{String(secIdx + 1).padStart(2, "0")}</span>
                        <span className={`text-lg font-medium ${isActiveSection ? "text-white" : "text-white/80"}`}>{sec.title}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-black/40">
                          {sec.items.map((item, itemIdx) => (
                            <button
                              key={item.id ?? itemIdx}
                              onClick={() => goToItem(secIdx, itemIdx)}
                              className="w-full text-left px-12 py-4 border-l-2 border-transparent focus:bg-[#D4AF37]/10 active:bg-[#D4AF37]/20"
                              style={{ borderColor: activeSectionIndex === secIdx && activeItemIndex === itemIdx ? "#D4AF37" : "transparent" }}
                            >
                              <span className={`text-sm ${activeSectionIndex === secIdx && activeItemIndex === itemIdx ? "text-[#D4AF37] font-bold" : "text-white/60"}`}>
                                {item.name}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
