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
      description: "El momento central de la noche. Opciones cuidadosamente seleccionadas.",
      items: [
        { id: "p1", name: "Asado de Tira Estofado", desc: "Cocción lenta por 48h, puré rústico de papa amarilla y vegetales glaseados.", image: "/hero.png", tag: "Carne" },
        { id: "p2", name: "Salmón en Costra de Finas Hierbas", desc: "Sobre risotto de quinua negra y espárragos al grill.", image: "/hero.png", tag: "Pescado" },
        { id: "p3", name: "Ravioles de Zapallo Loche", desc: "En mantequilla de salvia, almendras tostadas y queso grana padano.", image: "/hero.png", tag: "Vegetariano" },
        { id: "p4", name: "Panceta Crujiente", desc: "Con puré de camote y reducción de chicha morada.", image: "/hero.png", tag: "Cerdo" },
      ]
    },
    {
      id: "postres",
      title: "Mesa de Postres",
      description: "Una sinfonía de dulces para coronar la cena.",
      items: [
        { id: "d1", name: "Esfera de Chocolate", desc: "Mousse de chocolate bitter 70%, centro de frambuesa y praliné.", image: "/hero.png" },
        { id: "d2", name: "Suspiro a la Limeña de Lúcuma", desc: "Clásico reinventado con tierra de cacao.", image: "/hero.png" },
        { id: "d3", name: "Cheesecake de Frutos Rojos", desc: "Base de galleta de almendras y coulis de frutos del bosque.", image: "/hero.png" },
        { id: "d4", name: "Macarons Surtidos", desc: "Pistacho, frambuesa, vainilla y maracuyá.", image: "/hero.png" },
        { id: "d5", name: "Mini Tartaletas", desc: "De limón con merengue suizo flameado.", image: "/hero.png" },
      ]
    }
  ]
};

const ITEMS_PER_PAGE = 4;

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event || mockCatalog;
  
  // States
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1); // -1 means "Cover"
  const [currentPage, setCurrentPage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState(1);

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  
  const totalPages = activeSection 
    ? Math.ceil(activeSection.items.length / ITEMS_PER_PAGE) 
    : 0;

  const currentItems = activeSection 
    ? activeSection.items.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)
    : [];

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    } else if (activeSectionIndex < catalog.sections.length - 1) {
      // Go to next section
      setDirection(1);
      setActiveSectionIndex(prev => prev + 1);
      setCurrentPage(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    } else if (activeSectionIndex >= 0) {
      // Go to previous section
      setDirection(-1);
      setActiveSectionIndex(prev => prev - 1);
      if (activeSectionIndex - 1 >= 0) {
        // Find last page of previous section
        const prevSection = catalog.sections[activeSectionIndex - 1];
        if (prevSection) {
          setCurrentPage(Math.ceil(prevSection.items.length / ITEMS_PER_PAGE) - 1);
        }
      }
    }
  };

  const goToSection = (index: number) => {
    setDirection(index > activeSectionIndex ? 1 : -1);
    setActiveSectionIndex(index);
    setCurrentPage(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextPage();
      if (e.key === "ArrowLeft") handlePrevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSectionIndex, currentPage]);

  return (
    // FULL SCREEN FIXED LAYOUT - NO SCROLL
    <main className="h-full w-full bg-[#00040a] text-white overflow-hidden relative flex flex-col">
      
      {/* ══════════════════════ GLOBAL BACKGROUNDS ══════════════════════ */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#00040a] to-transparent z-10 pointer-events-none" />
      
      {/* Dynamic Background Image with Blur (Changes based on section) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSectionIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
        >
          <Image 
            src={activeSection ? activeSection.items[0]?.image || catalog.coverImage : catalog.coverImage} 
            alt="Background" 
            fill 
            className="object-cover blur-[10px]" 
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-[#00040a] via-[#00040a]/80 to-[#00040a]/40 pointer-events-none" />

      {/* ══════════════════════ TOP BAR ══════════════════════ */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="glass-btn flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </Link>

        <div className="flex gap-3">
          <button onClick={handleShare} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ══════════════════════ MAIN CONTENT AREA ══════════════════════ */}
      <div className="flex-1 flex flex-col md:flex-row relative z-20 h-full pt-20 pb-6 px-6 md:px-10 gap-8 md:gap-16">
        
        {/* ────── LEFT PANEL: INDEX ────── */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col justify-center">
          <div className="pl-4 border-l border-white/[0.05]">
            <h3 className="text-[9px] uppercase tracking-[0.4em] text-gold mb-8">Índice del Catálogo</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => goToSection(-1)}
                className={`text-left py-2.5 text-xs tracking-widest uppercase transition-all duration-300 relative group
                  ${activeSectionIndex === -1 ? "text-gold font-bold" : "text-white/40 hover:text-white/80"}`}
              >
                {activeSectionIndex === -1 && (
                  <motion.div layoutId="active-indicator" className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-gold" />
                )}
                Portada
              </button>

              {catalog.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  onClick={() => goToSection(idx)}
                  className={`text-left py-2.5 text-xs tracking-widest uppercase transition-all duration-300 relative group
                    ${activeSectionIndex === idx ? "text-gold font-bold" : "text-white/40 hover:text-white/80"}`}
                >
                  {activeSectionIndex === idx && (
                    <motion.div layoutId="active-indicator" className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-gold" />
                  )}
                  {sec.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ────── RIGHT PANEL: THE "BOOK" PAGES ────── */}
        <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
          
          <AnimatePresence mode="wait" custom={direction}>
            {activeSectionIndex === -1 ? (
              
              /* ── PAGE: COVER ── */
              <motion.div
                key="cover"
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-4xl"
              >
                <div className="mb-8">
                  <span className="glass-btn px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] text-gold mb-6 inline-block">
                    Propuesta Oficial
                  </span>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury text-white mb-6 leading-none">
                    {catalog.title}
                  </h1>
                  <p className="text-white/50 md:text-lg max-w-2xl leading-relaxed mb-10 font-light">
                    {catalog.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm border-t border-white/[0.05] pt-10">
                  {[
                    { icon: Calendar, label: "FECHA", text: catalog.date || "Por definir" },
                    { icon: MapPin, label: "LOCACIÓN", text: catalog.location || "Por definir" },
                    { icon: Clock, label: "ASISTENTES", text: catalog.pax || "Por definir" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-2">{item.label}</p>
                      <div className="flex items-center gap-2 text-white/80">
                        <item.icon className="w-4 h-4 text-white/20" />
                        <span className="font-light tracking-wide">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            ) : activeSection ? (
              
              /* ── PAGE: SECTION CONTENT ── */
              <motion.div
                key={`${activeSection.id}-page-${currentPage}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction * -40, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-5xl h-full flex flex-col"
              >
                {/* Section Header */}
                <div className="mb-8 flex-shrink-0">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-gold/50 font-luxury text-lg">
                      {String(activeSectionIndex + 1).padStart(2, "0")}
                    </span>
                    <div className="h-[1px] w-12 bg-gradient-to-r from-gold/50 to-transparent" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-luxury text-white mb-2">
                    {activeSection.title}
                  </h2>
                  <p className="text-white/40 text-sm max-w-2xl">{activeSection.description}</p>
                </div>

                {/* Items Grid (Max 4 per page to fit on screen) */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 content-start">
                  {currentItems.map((item) => (
                    <div key={item.id} className="group flex gap-5 p-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05] transition-all duration-500">
                      
                      {/* Thumbnail */}
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative rounded-lg overflow-hidden bg-white/5">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 sepia-[0.1]" 
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg pointer-events-none" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-luxury text-white/90 group-hover:text-gold transition-colors leading-tight">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs md:text-sm text-white/40 leading-relaxed font-light line-clamp-3">
                          {item.desc || item.description}
                        </p>
                        {item.tag && (
                          <div className="mt-3">
                            <span className="text-[9px] uppercase tracking-widest text-gold border border-gold/20 px-2 py-1 rounded-sm">
                              {item.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  ))}
                </div>
              </motion.div>

            ) : null}
          </AnimatePresence>

          {/* ────── PAGINATION CONTROLS (Bottom Right) ────── */}
          <div className="absolute bottom-0 right-0 flex items-center gap-4">
            {activeSectionIndex >= 0 && (
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mr-2">
                Página {currentPage + 1} de {totalPages}
              </span>
            )}
            
            <button 
              onClick={handlePrevPage}
              disabled={activeSectionIndex === -1}
              className={`glass-btn w-12 h-12 flex items-center justify-center rounded-full transition-all
                ${activeSectionIndex === -1 ? "opacity-20 cursor-not-allowed" : "hover:text-gold hover:border-gold/40"}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleNextPage}
              disabled={activeSectionIndex === catalog.sections.length - 1 && currentPage === totalPages - 1}
              className={`glass-btn w-12 h-12 flex items-center justify-center rounded-full transition-all
                ${activeSectionIndex === catalog.sections.length - 1 && currentPage === totalPages - 1 ? "opacity-20 cursor-not-allowed" : "hover:text-gold hover:border-gold/40"}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
