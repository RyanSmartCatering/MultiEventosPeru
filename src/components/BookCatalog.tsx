"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
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
  description: "Una propuesta integral diseñada exclusivamente para una noche de verano inolvidable. Ingredientes de origen local, presentación vanguardista y un servicio impecable.",
  sections: [
    {
      id: "recepcion",
      title: "Recepción",
      description: "Aperitivos fríos y calientes para recibir a los invitados.",
      items: [
        { id: "c1", name: "Tartar de Salmón", desc: "Con palta brûlée, alcaparras y emulsión de maracuyá en galleta de sésamo negra.", image: "/hero.png", tag: "Frio" },
        { id: "c2", name: "Crocante de Pato", desc: "Confit de pato en masa philo crujiente con chutney de frutos rojos orgánicos.", image: "/hero.png", tag: "Caliente" },
        { id: "c3", name: "Ceviche Carretillero VIP", desc: "Pesca del día hiper fresca, leche de tigre al ají amarillo ahumado, y chicharrón de calamar.", image: "/hero.png", tag: "Fresco" },
        { id: "c4", name: "Tataki de Atún", desc: "Atún aleta amarilla sellado a la perfección, ponzu trufado, y un crocante de ajo laminado.", image: "/hero.png", tag: "Frio" },
        { id: "c5", name: "Mini Empanadas de Lomo", desc: "Masa hojaldrada rellena del clásico lomo saltado jugoso, servida con salsa huancaína.", image: "/hero.png", tag: "Caliente" },
        { id: "c6", name: "Espárragos Trufados", desc: "Tiernos espárragos envueltos en jamón ibérico de bellota con reducción de balsámico de Módena.", image: "/hero.png", tag: "Premium" },
      ]
    },
    {
      id: "plato-fondo",
      title: "Plato de Fondo",
      description: "El momento central de la noche.",
      items: [
        { id: "p1", name: "Asado de Tira Estofado", desc: "Cocción lenta por 48 horas en sus propios jugos. Se deshace al tacto. Acompañado de puré rústico trufado.", image: "/hero.png", tag: "Firma" },
        { id: "p2", name: "Salmón en Costra", desc: "Piel crujiente sobre un risotto meloso de quinua negra salvaje y espárragos al grill.", image: "/hero.png", tag: "Mar" },
        { id: "p3", name: "Ravioles de Zapallo Loche", desc: "Rellenos de zapallo loche asado, bañados en mantequilla avellanada de salvia y almendras tostadas.", image: "/hero.png", tag: "Veg" },
      ]
    },
    {
      id: "postres",
      title: "Mesa de Postres",
      description: "Una sinfonía de dulces.",
      items: [
        { id: "d1", name: "Esfera de Chocolate", desc: "Mousse de chocolate bitter 70% amazónico, centro líquido de frambuesa fresca y base de praliné crujiente.", image: "/hero.png", tag: "Cacao" },
        { id: "d2", name: "Suspiro a la Limeña", desc: "La receta clásica de las abuelas limeñas, reinventada con un sutil toque de oporto y canela Ceylán.", image: "/hero.png", tag: "Clásico" },
        { id: "d3", name: "Cheesecake de Frutos", desc: "Horneado a baja temperatura sobre base de galleta de almendras y bañado en coulis de frutos del bosque.", image: "/hero.png", tag: "Fresco" },
      ]
    }
  ]
};

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event || mockCatalog;
  
  // States
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1); // -1 = Cover Page
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  const activeItem = activeSection ? activeSection.items[activeItemIndex] : null;

  // Reset item index when section changes
  useEffect(() => {
    setActiveItemIndex(0);
  }, [activeSectionIndex]);

  // Determine current main background image
  const currentBackgroundImage = activeSectionIndex === -1 
    ? catalog.coverImage 
    : (activeItem?.image || activeSection?.items[0]?.image || catalog.coverImage);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToSection = (index: number) => {
    setActiveSectionIndex(index);
  };

  // Keyboard navigation for items
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeSection) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setActiveItemIndex(prev => Math.min(prev + 1, activeSection.items.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setActiveItemIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, activeItemIndex]);

  return (
    // FULL SCREEN FIXED LAYOUT - NO SCROLL
    <main className="h-[100dvh] w-full bg-[#00040a] text-white overflow-hidden relative select-none font-sans">
      
      {/* ════════════ BACKGROUND IMAGE (FULL BLEED) ════════════ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBackgroundImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src={currentBackgroundImage} 
            alt="Fondo de pantalla" 
            fill 
            className="object-cover" 
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Heavy Gradient Overlays for perfect text readability anywhere */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none md:w-3/4" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none h-full" />
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* ════════════ TOP NAVIGATION BAR ════════════ */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6">
        {/* Back Button */}
        <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="group flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 hover:text-gold transition-colors">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 bg-black/20 backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="hidden md:inline">Volver</span>
        </Link>

        {/* Tab Navigation (Center) */}
        <nav className="hidden md:flex justify-center items-center gap-2 px-8 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <button
            onClick={() => goToSection(-1)}
            className={`relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
              ${activeSectionIndex === -1 ? "text-gold font-bold" : "text-white/60 hover:text-white"}`}
          >
            Portada
            {activeSectionIndex === -1 && (
              <motion.div layoutId="nav-pill" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gold rounded-t-full" />
            )}
          </button>
          
          {catalog.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className={`relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
                ${activeSectionIndex === idx ? "text-gold font-bold" : "text-white/60 hover:text-white"}`}
            >
              {sec.title}
              {activeSectionIndex === idx && (
                <motion.div layoutId="nav-pill" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gold rounded-t-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions (Right) */}
        <div className="flex justify-end gap-3">
          <button onClick={handleShare} className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 bg-black/20 backdrop-blur-md border border-white/10 transition-all">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 bg-black/20 backdrop-blur-md border border-white/10 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Navigation (Only visible on small screens) */}
      <div className="md:hidden absolute top-20 left-0 right-0 z-50 px-6 py-2 overflow-x-auto no-scrollbar mask-edges-horizontal">
        <div className="flex gap-2 min-w-max pb-2">
          <button
            onClick={() => goToSection(-1)}
            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${
              activeSectionIndex === -1 ? "bg-gold border-gold text-black font-bold" : "bg-black/50 border-white/20 text-white/70 backdrop-blur-md"
            }`}
          >
            Portada
          </button>
          {catalog.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${
                activeSectionIndex === idx ? "bg-gold border-gold text-black font-bold" : "bg-black/50 border-white/20 text-white/70 backdrop-blur-md"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════ MAIN CONTENT AREA ════════════ */}
      <div className="relative z-20 h-full w-full flex flex-col md:flex-row items-end md:items-center px-6 md:px-16 lg:px-24 pb-12 md:pb-0 pt-32 md:pt-0">
        
        {/* ================= COVER PAGE ================= */}
        <AnimatePresence mode="wait">
          {activeSectionIndex === -1 ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">Dossier de Evento Oficial</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury text-white leading-[1.1] mb-6 drop-shadow-2xl">
                {catalog.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed drop-shadow-md mb-12">
                {catalog.description}
              </p>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gold/80 mb-1">Locación</p>
                    <p className="text-white font-light">{catalog.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gold/80 mb-1">Fecha</p>
                    <p className="text-white font-light">{catalog.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-gold/80 mb-1">Asistentes</p>
                    <p className="text-white font-light">{catalog.pax}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          ) : activeSection && activeItem ? (
            
            /* ================= MASTER-DETAIL VIEW ================= */
            <div className="w-full h-full flex flex-col md:flex-row justify-between items-end md:items-stretch py-12 md:py-32 gap-10">
              
              {/* --- LEFT PANEL: THE MASTER INDEX --- */}
              <div className="order-2 md:order-1 w-full md:w-1/3 max-w-sm flex flex-col justify-end md:justify-center z-30">
                <h3 className="text-gold font-luxury text-2xl md:text-3xl mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-gold" />
                  {activeSection.title}
                </h3>
                
                <div className="flex flex-col gap-1 max-h-[40vh] md:max-h-[60vh] overflow-y-auto no-scrollbar pr-4 mask-edges-vertical">
                  {activeSection.items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveItemIndex(idx)}
                      className={`text-left group relative py-4 px-5 rounded-2xl transition-all duration-300 border ${
                        activeItemIndex === idx 
                          ? "bg-black/60 backdrop-blur-xl border-white/20 shadow-2xl" 
                          : "bg-transparent border-transparent hover:bg-black/40 hover:backdrop-blur-lg hover:border-white/10"
                      }`}
                    >
                      {activeItemIndex === idx && (
                        <motion.div layoutId="active-item-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full" />
                      )}
                      
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm md:text-base font-medium transition-colors ${
                          activeItemIndex === idx ? "text-gold" : "text-white/70 group-hover:text-white"
                        }`}>
                          {String(idx + 1).padStart(2, '0')}. {item.name}
                        </span>
                        
                        {/* Mobile chevron indicator */}
                        <ChevronRight className={`w-4 h-4 md:hidden transition-opacity ${activeItemIndex === idx ? "opacity-100 text-gold" : "opacity-0"}`} />
                      </div>
                      
                      {item.tag && (
                        <span className="text-[8px] uppercase tracking-widest text-white/40">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- RIGHT/CENTER PANEL: THE MASSIVE DETAIL TEXT --- */}
              <motion.div 
                key={`${activeSection.id}-${activeItem.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1 md:order-2 flex-1 flex flex-col justify-end md:justify-center max-w-3xl md:pl-20 z-20 pb-4 md:pb-0"
              >
                {activeItem.tag && (
                  <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-white/80 mb-6 w-max backdrop-blur-md">
                    {activeItem.tag}
                  </span>
                )}
                
                {/* GIANT, ULTRA READABLE TYPOGRAPHY */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-luxury text-white mb-6 leading-[1.05] drop-shadow-2xl">
                  {activeItem.name}
                </h2>
                
                <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-lg max-w-2xl">
                  {activeItem.desc || activeItem.description}
                </p>
                
                <div className="hidden md:flex items-center gap-6 mt-12 text-white/50 text-xs tracking-widest uppercase">
                  <span>Scroll u Flechas</span>
                  <div className="flex gap-1">
                    <span className="w-6 h-6 rounded border border-white/20 flex items-center justify-center bg-black/20">↑</span>
                    <span className="w-6 h-6 rounded border border-white/20 flex items-center justify-center bg-black/20">↓</span>
                  </div>
                  <span>para navegar</span>
                </div>
              </motion.div>

            </div>
          ) : null}
        </AnimatePresence>
      </div>

    </main>
  );
}
