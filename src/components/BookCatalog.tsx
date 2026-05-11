"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type CatalogItem = {
  id?: string;
  name: string;
  desc?: string;
  description?: string;
  image: string;
  tag?: string;
};

type CatalogSection = {
  id: string;
  title: string;
  description?: string;
  items: CatalogItem[];
  coverImage?: string; // Specific image for the left panel for this section
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

// Mock data
const mockCatalog: CatalogEvent = {
  id: "gala-verano-2026",
  title: "Gala de Verano 2026",
  company: "Ryan Smart Catering",
  date: "15 Enero 2026",
  location: "Hacienda Los Ficus, Pachacámac",
  pax: "250 invitados",
  coverImage: "/hero.png",
  description: "Una propuesta integral diseñada exclusivamente para una noche de verano inolvidable. Ingredientes de origen local, presentación vanguardista y un servicio impecable que elevará cada momento de la celebración.",
  sections: [
    {
      id: "recepcion",
      title: "Recepción y Cóctel",
      description: "Aperitivos fríos y calientes para recibir a los invitados durante el atardecer.",
      coverImage: "/hero.png",
      items: [
        { id: "c1", name: "Tartar de Salmón", desc: "Con palta brûlée, alcaparras y emulsión de maracuyá en galleta de sésamo.", image: "/hero.png", tag: "Frio" },
        { id: "c2", name: "Crocante de Pato", desc: "Confit de pato en masa philo con chutney de frutos rojos.", image: "/hero.png", tag: "Caliente" },
        { id: "c3", name: "Ceviche Carretillero VIP", desc: "Pesca del día, leche de tigre al ají amarillo, chicharrón de calamar.", image: "/hero.png", tag: "Fresco" },
        { id: "c4", name: "Tataki de Atún", desc: "Atún aleta amarilla sellado, ponzu trufado, crocante de ajo.", image: "/hero.png", tag: "Frio" },
        { id: "c5", name: "Mini Empanadas", desc: "De lomo saltado clásico con salsa huancaína ahumada.", image: "/hero.png", tag: "Caliente" },
        { id: "c6", name: "Espárragos Trufados", desc: "Envueltos en jamón ibérico con reducción de balsámico.", image: "/hero.png", tag: "Premium" },
      ]
    },
    {
      id: "plato-fondo",
      title: "Platos de Fondo",
      description: "El momento central de la noche. Opciones cuidadosamente seleccionadas para deleitar a los paladares más exigentes.",
      coverImage: "/hero.png",
      items: [
        { id: "p1", name: "Asado de Tira Estofado", desc: "Cocción lenta por 48h, puré rústico de papa amarilla y vegetales glaseados.", image: "/hero.png", tag: "Firma" },
        { id: "p2", name: "Salmón en Costra", desc: "Sobre risotto de quinua negra y espárragos al grill.", image: "/hero.png", tag: "Mar" },
        { id: "p3", name: "Ravioles de Zapallo Loche", desc: "En mantequilla de salvia, almendras tostadas y queso grana padano.", image: "/hero.png", tag: "Veg" },
        { id: "p4", name: "Panceta Crujiente", desc: "Con puré de camote y reducción de chicha morada.", image: "/hero.png", tag: "Clásico" },
      ]
    },
    {
      id: "postres",
      title: "Mesa de Postres",
      description: "Una sinfonía de dulces finos elaborados artesanalmente para coronar la cena.",
      coverImage: "/hero.png",
      items: [
        { id: "d1", name: "Esfera de Chocolate", desc: "Mousse de chocolate bitter 70%, centro de frambuesa y praliné.", image: "/hero.png" },
        { id: "d2", name: "Suspiro a la Limeña", desc: "Clásico reinventado con tierra de cacao y merengue suizo.", image: "/hero.png" },
        { id: "d3", name: "Cheesecake de Frutos Rojos", desc: "Base de galleta de almendras y coulis de frutos del bosque.", image: "/hero.png" },
        { id: "d4", name: "Macarons Surtidos", desc: "Pistacho, frambuesa, vainilla y maracuyá.", image: "/hero.png" },
        { id: "d5", name: "Tartaleta Cítrica", desc: "De limón con merengue flameado y ralladura de lima.", image: "/hero.png" },
      ]
    }
  ]
};

// We show 5 items per text page to keep it extremely elegant and spaced out
const ITEMS_PER_PAGE = 5;

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event || mockCatalog;
  
  // States
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1); // -1 means "Cover"
  const [currentPage, setCurrentPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  
  const totalPages = activeSection 
    ? Math.ceil(activeSection.items.length / ITEMS_PER_PAGE) 
    : 0;

  const currentItems = activeSection 
    ? activeSection.items.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    : [];

  const handleNext = () => {
    if (activeSection && currentPage < totalPages - 1) {
      // Next text page within the same section
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    } else if (activeSectionIndex < catalog.sections.length - 1) {
      // Next section
      setDirection(1);
      setActiveSectionIndex(prev => prev + 1);
      setCurrentPage(0);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      // Prev text page within the same section
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    } else if (activeSectionIndex >= 0) {
      // Prev section
      setDirection(-1);
      const prevIndex = activeSectionIndex - 1;
      setActiveSectionIndex(prevIndex);
      if (prevIndex >= 0) {
        const prevSection = catalog.sections[prevIndex];
        setCurrentPage(Math.ceil(prevSection.items.length / ITEMS_PER_PAGE) - 1);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSectionIndex, currentPage]);

  // Determine current main image for the left panel
  const currentCoverImage = activeSectionIndex === -1 
    ? catalog.coverImage 
    : (activeSection?.coverImage || activeSection?.items[0]?.image || catalog.coverImage);

  return (
    // FULL SCREEN FIXED LAYOUT - NO SCROLL
    <main className="h-[100dvh] w-full bg-[#00040a] text-white overflow-hidden flex flex-col md:flex-row relative">
      
      {/* ══════════════════════ LEFT PANEL: THE ARTWORK ══════════════════════ */}
      <div className="w-full h-1/3 md:h-full md:w-1/2 relative flex-shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCoverImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={currentCoverImage} 
              alt="Section Cover" 
              fill 
              className="object-cover" 
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays to blend the image perfectly into the dark background */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#00040a] via-[#00040a]/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ══════════════════════ RIGHT PANEL: THE EDITORIAL MENU ══════════════════════ */}
      <div className="w-full h-2/3 md:h-full md:w-1/2 relative flex flex-col items-center justify-center bg-[#00040a] px-8 md:px-16 lg:px-24">
        
        {/* Subtle grid background for the right panel */}
        <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

        {/* Top Navigation Overlay */}
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
          <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="text-[10px] uppercase tracking-[0.3em] text-white/50 hover:text-gold transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Atrás
          </Link>
          <button onClick={handleShare} className="text-white/50 hover:text-gold transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </header>

        {/* Content Container */}
        <div className="w-full max-w-xl z-10 relative">
          <AnimatePresence mode="wait" custom={direction}>
            
            {activeSectionIndex === -1 ? (
              
              /* ── PAGE 0: EDITORIAL COVER ── */
              <motion.div
                key="cover"
                custom={direction}
                initial={{ opacity: 0, y: direction * 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col text-center items-center"
              >
                <div className="mb-4">
                  <div className="h-12 w-[1px] bg-gold/50 mx-auto mb-4" />
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold">Dossier Exclusivo</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-luxury text-white mb-8 leading-[1.1]">
                  {catalog.title}
                </h1>
                
                <p className="text-white/40 text-sm max-w-sm leading-relaxed font-light mb-12 italic">
                  "{catalog.description}"
                </p>

                <div className="w-full grid grid-cols-3 gap-4 border-y border-white/[0.05] py-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] uppercase tracking-widest text-gold/60 mb-1">Fecha</span>
                    <span className="text-xs text-white/80 font-light">{catalog.date || "-"}</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/[0.05]">
                    <span className="text-[8px] uppercase tracking-widest text-gold/60 mb-1">Locación</span>
                    <span className="text-xs text-white/80 font-light text-center px-2">{catalog.location || "-"}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] uppercase tracking-widest text-gold/60 mb-1">Asistentes</span>
                    <span className="text-xs text-white/80 font-light">{catalog.pax || "-"}</span>
                  </div>
                </div>
              </motion.div>

            ) : activeSection ? (
              
              /* ── PAGES 1+: THE MENU LAYOUT ── */
              <motion.div
                key={`${activeSection.id}-${currentPage}`}
                custom={direction}
                initial={{ opacity: 0, y: direction * 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -40 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col w-full"
              >
                {/* Minimalist Section Header */}
                <div className="mb-10 text-center relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-luxury tracking-widest">
                    {String(activeSectionIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-luxury text-white inline-block">
                    {activeSection.title}
                  </h2>
                </div>

                {/* The Fine-Dining Menu List */}
                <div className="flex flex-col gap-6 md:gap-8">
                  {currentItems.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                      className="group"
                    >
                      {/* Name and Tag row */}
                      <div className="flex items-end justify-between w-full mb-1 gap-4">
                        <h3 className="text-base md:text-lg font-luxury text-white/90 group-hover:text-gold transition-colors whitespace-nowrap">
                          {item.name}
                        </h3>
                        
                        {/* The dotted leader line */}
                        <div className="flex-1 border-b border-dotted border-white/20 mb-[6px] opacity-30 group-hover:opacity-60 transition-opacity" />
                        
                        {item.tag && (
                          <span className="text-[8px] uppercase tracking-widest text-gold whitespace-nowrap">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      
                      {/* Description (Italic, soft) */}
                      <p className="text-xs text-white/40 font-light leading-relaxed italic w-5/6">
                        {item.desc || item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ══════════════════════ BOTTOM PAGINATION ══════════════════════ */}
        <div className="absolute bottom-8 left-0 right-0 px-8 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={activeSectionIndex === -1}
            className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] transition-all
              ${activeSectionIndex === -1 ? "text-white/10 cursor-not-allowed" : "text-white/40 hover:text-gold"}`}
          >
            <ChevronLeft className="w-3 h-3" /> Anterior
          </button>

          {/* Minimal dots for section progress */}
          {activeSection && (
            <div className="flex gap-1.5 items-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 transition-all duration-500 rounded-full ${i === currentPage ? "w-4 bg-gold" : "w-1 bg-white/20"}`}
                />
              ))}
            </div>
          )}

          <button 
            onClick={handleNext}
            disabled={activeSectionIndex === catalog.sections.length - 1 && currentPage === totalPages - 1}
            className={`flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] transition-all
              ${activeSectionIndex === catalog.sections.length - 1 && currentPage === totalPages - 1 ? "text-white/10 cursor-not-allowed" : "text-white/40 hover:text-gold"}`}
          >
            Siguiente <ChevronRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </main>
  );
}
