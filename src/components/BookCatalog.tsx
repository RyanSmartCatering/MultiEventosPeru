"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, ChevronLeft, ChevronRight, Info, MapPin, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type CatalogItem = {
  id?: string;
  name: string;
  desc?: string;
  description?: string;
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

// Mock data (enhanced with diverse images to show off the visual gallery)
const mockCatalog: CatalogEvent = {
  id: "gala-verano-2026",
  title: "Gala de Verano 2026",
  company: "Ryan Smart Catering",
  date: "15 Enero 2026",
  location: "Hacienda Los Ficus, Pachacámac",
  pax: "250 invitados",
  coverImage: "/hero.png",
  description: "Una propuesta integral diseñada exclusivamente para una noche de verano inolvidable. Ingredientes de origen local, presentación vanguardista y un servicio impecable.",
  sections: [
    {
      id: "recepcion",
      title: "Recepción",
      description: "Aperitivos fríos y calientes para recibir a los invitados durante el atardecer.",
      items: [
        { id: "c1", name: "Tartar de Salmón", desc: "Con palta brûlée, alcaparras y emulsión de maracuyá en galleta de sésamo.", image: "/hero.png", tag: "Frio" },
        { id: "c2", name: "Crocante de Pato", desc: "Confit de pato en masa philo con chutney de frutos rojos.", image: "/hero.png", tag: "Caliente" },
        { id: "c3", name: "Ceviche Carretillero VIP", desc: "Pesca del día, leche de tigre al ají amarillo, chicharrón de calamar.", image: "/hero.png", tag: "Fresco" },
        { id: "c4", name: "Tataki de Atún", desc: "Atún aleta amarilla sellado, ponzu trufado, crocante de ajo.", image: "/hero.png", tag: "Frio" },
        { id: "c5", name: "Mini Empanadas", desc: "De lomo saltado clásico con salsa huancaína ahumada.", image: "/hero.png", tag: "Caliente" },
        { id: "c6", name: "Espárragos Trufados", desc: "Envueltos en jamón ibérico con reducción de balsámico.", image: "/hero.png", tag: "Premium" },
        { id: "c7", name: "Conchas a la Parmesana", desc: "Clásico peruano gratinado con queso parmesano madurado.", image: "/hero.png", tag: "Caliente" },
      ]
    },
    {
      id: "plato-fondo",
      title: "Plato de Fondo",
      description: "El momento central de la noche. Opciones cuidadosamente seleccionadas.",
      items: [
        { id: "p1", name: "Asado de Tira Estofado", desc: "Cocción lenta por 48h, puré rústico de papa amarilla y vegetales glaseados.", image: "/hero.png", tag: "Firma" },
        { id: "p2", name: "Salmón en Costra", desc: "Sobre risotto de quinua negra y espárragos al grill.", image: "/hero.png", tag: "Mar" },
        { id: "p3", name: "Ravioles de Zapallo Loche", desc: "En mantequilla de salvia, almendras tostadas y queso grana padano.", image: "/hero.png", tag: "Veg" },
        { id: "p4", name: "Panceta Crujiente", desc: "Con puré de camote y reducción de chicha morada.", image: "/hero.png", tag: "Cerdo" },
      ]
    },
    {
      id: "postres",
      title: "Postres",
      description: "Una sinfonía de dulces finos elaborados artesanalmente.",
      items: [
        { id: "d1", name: "Esfera de Chocolate", desc: "Mousse de chocolate bitter 70%, centro de frambuesa y praliné.", image: "/hero.png" },
        { id: "d2", name: "Suspiro a la Limeña", desc: "Clásico reinventado con tierra de cacao.", image: "/hero.png" },
        { id: "d3", name: "Cheesecake de Frutos", desc: "Base de galleta de almendras y coulis de frutos del bosque.", image: "/hero.png" },
        { id: "d4", name: "Macarons Surtidos", desc: "Pistacho, frambuesa, vainilla y maracuyá.", image: "/hero.png" },
        { id: "d5", name: "Tartaleta Cítrica", desc: "De limón con merengue flameado.", image: "/hero.png" },
      ]
    }
  ]
};

const ITEMS_PER_PAGE = 6; // 3 columns x 2 rows is extremely elegant for a landscape screen

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event || mockCatalog;
  
  // States
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1); // -1 = Cover Page
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

  const handleNext = () => {
    if (activeSection && currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeSection && currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
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

  // Keyboard support for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSectionIndex, currentPage, totalPages]);

  // Framer Motion Variants for Card Staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const cardVariants = {
    hidden: (dir: number) => ({ opacity: 0, x: dir * 50, filter: "blur(4px)" }),
    show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5 } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -50, filter: "blur(4px)", transition: { duration: 0.4 } })
  };

  return (
    // 100vh, hidden overflow. Acts exactly like a native iPad App.
    <main className="h-[100dvh] w-full bg-[#030305] text-white overflow-hidden flex flex-col relative select-none">
      
      {/* ════════════ BACKGROUND EFFECTS ════════════ */}
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />

      {/* ════════════ TOP NAVIGATION BAR ════════════ */}
      <header className="flex-shrink-0 relative z-50 flex items-center justify-between px-6 md:px-10 h-20 border-b border-white/[0.05] bg-[#030305]/80 backdrop-blur-md">
        
        {/* Back Button */}
        <div className="w-1/4">
          <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="glass-btn inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Volver
          </Link>
        </div>

        {/* Tab Navigation (Center) */}
        <nav className="flex-1 flex justify-center items-center gap-1 overflow-x-auto no-scrollbar mask-edges-horizontal px-4">
          <button
            onClick={() => goToSection(-1)}
            className={`relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
              ${activeSectionIndex === -1 ? "text-white font-bold" : "text-white/40 hover:text-white/80"}`}
          >
            Portada
            {activeSectionIndex === -1 && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 border border-gold/40 rounded-full bg-gold/10" />
            )}
          </button>
          
          {catalog.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className={`relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
                ${activeSectionIndex === idx ? "text-white font-bold" : "text-white/40 hover:text-white/80"}`}
            >
              {sec.title}
              {activeSectionIndex === idx && (
                <motion.div layoutId="nav-pill" className="absolute inset-0 border border-gold/40 rounded-full bg-gold/10" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Right) */}
        <div className="w-1/4 flex justify-end gap-3">
          <button onClick={handleShare} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ════════════ MAIN CANVAS ════════════ */}
      <div className="flex-1 relative w-full flex items-center justify-center px-4 md:px-20 py-6 overflow-hidden">
        
        {/* --- LEFT PAGINATION ARROW --- */}
        <AnimatePresence>
          {activeSectionIndex >= 0 && currentPage > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handlePrev}
              className="absolute left-4 md:left-8 z-40 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full glass-btn text-white/50 hover:text-gold hover:border-gold/50 hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* --- RIGHT PAGINATION ARROW --- */}
        <AnimatePresence>
          {activeSectionIndex >= 0 && currentPage < totalPages - 1 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={handleNext}
              className="absolute right-4 md:right-8 z-40 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full glass-btn text-white/50 hover:text-gold hover:border-gold/50 hover:scale-105 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={direction}>
          
          {/* ================= COVER PAGE ================= */}
          {activeSectionIndex === -1 ? (
            <motion.div
              key="cover"
              custom={direction}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl aspect-video md:aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group"
            >
              <Image 
                src={catalog.coverImage} 
                alt={catalog.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[10px] uppercase tracking-widest mb-4 backdrop-blur-sm">
                  Dossier Oficial
                </span>
                <h1 className="text-4xl md:text-6xl font-luxury text-white mb-4 leading-tight shadow-black drop-shadow-lg">
                  {catalog.title}
                </h1>
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-8 line-clamp-3">
                  {catalog.description}
                </p>

                <div className="flex items-center gap-6 text-xs text-white/60">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> {catalog.location || "-"}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold" /> {catalog.date || "-"}</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> {catalog.pax || "-"}</div>
                </div>
              </div>
            </motion.div>

          ) : activeSection ? (
            
            /* ================= VISUAL GRID GALLERY ================= */
            <motion.div
              key={`${activeSection.id}-${currentPage}`}
              custom={direction}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="w-full max-w-7xl h-full flex flex-col justify-center"
            >
              {/* Header inside the grid area */}
              <div className="text-center mb-6 md:mb-10">
                <h2 className="text-3xl md:text-5xl font-luxury text-white mb-2">{activeSection.title}</h2>
                <p className="text-white/40 text-sm">{activeSection.description}</p>
              </div>

              {/* The Grid (3 columns x 2 rows = 6 items max) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-h-[60vh] lg:max-h-[70vh]">
                {currentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    custom={direction}
                    variants={cardVariants}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-white/[0.02] hover:border-gold/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] transition-all duration-500"
                  >
                    {/* Background Image */}
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Top Tag */}
                    {item.tag && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-gold">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    {/* Bottom Info Content */}
                    <div className="absolute bottom-0 left-0 w-full p-5 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-end mb-2">
                        <h3 className="text-xl md:text-2xl font-luxury text-white group-hover:text-gold transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                          <Info className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="overflow-hidden">
                        <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {item.desc || item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Pagination Indicators */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 transition-all duration-500 rounded-full ${i === currentPage ? "w-6 bg-gold" : "w-1.5 bg-white/20"}`}
                    />
                  ))}
                </div>
              )}

            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
