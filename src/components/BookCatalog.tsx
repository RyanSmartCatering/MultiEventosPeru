"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Update mock to simulate a LARGE catalog
const mockCatalog = {
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
    },
    {
      id: "bar",
      title: "Bar Premium",
      description: "Coctelería de autor y clásicos atemporales.",
      items: [
        { id: "b1", name: "Pisco Sour Catedral", desc: "Pisco Quebranta, limón tahití, jarabe de goma artesanal.", image: "/hero.png" },
        { id: "b2", name: "Gin Tonic Botánico", desc: "Gin Tanqueray Ten, tónica premium, pepino, bayas de enebro.", image: "/hero.png" },
        { id: "b3", name: "Aperol Spritz", desc: "Aperol, prosecco, soda y rodaja de naranja.", image: "/hero.png" },
        { id: "b4", name: "Margarita Spicy", desc: "Tequila reposado, cointreau, limón y borde de sal con ají limo.", image: "/hero.png" },
      ]
    },
    {
      id: "mobiliario",
      title: "Mobiliario y Menaje",
      description: "El setup físico que acompañará el evento.",
      items: [
        { id: "m1", name: "Mesas Imperiales", desc: "Madera rústica lavada, sin mantel, ideales para 12 personas.", image: "/hero.png" },
        { id: "m2", name: "Sillas Dior", desc: "Acrílico transparente con cojín de terciopelo beige.", image: "/hero.png" },
        { id: "m3", name: "Menaje Gold", desc: "Platos base dorados, cubertería de acero inoxidable bañada en oro 24k.", image: "/hero.png" },
        { id: "m4", name: "Copas de Cristal de Bohemia", desc: "Línea premium para agua, vino tinto y vino blanco.", image: "/hero.png" },
      ]
    }
  ]
};

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

export function BookCatalog({ event }: { event: CatalogEvent }) {
  // Use event if provided, otherwise fallback to mock (for testing)
  const catalog = event || mockCatalog;
  const [activeSection, setActiveSection] = useState(catalog.sections[0]?.id || "");
  const [copied, setCopied] = useState(false);
  
  // Ref array to track sections for scrollspy
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by visibility ratio
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="h-full w-full bg-[#00040a] text-white overflow-hidden relative flex flex-col">
      {/* ══════════════════════ GLOBAL BACKGROUNDS ══════════════════════ */}
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-diag pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />

      {/* ══════════════════════ ABSOLUTE HEADER ══════════════════════ */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00040a]/90 via-[#00040a]/40 to-transparent pointer-events-none" />
        
        <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="relative z-10 glass-btn flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </Link>

        <div className="relative z-10 flex gap-3">
          <button onClick={handleShare} className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button className="glass-btn w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-gold transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ══════════════════════ MAIN SCROLLABLE AREA ══════════════════════ */}
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 scroll-smooth pb-32">
        
        {/* ── HERO COVER ── */}
        <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end">
          <div className="absolute inset-0">
            <Image src={catalog.coverImage} alt="Cover" fill className="object-cover sepia-[0.15]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00040a] via-[#00040a]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00040a]/80 to-transparent" />
          </div>

          <div className="relative z-10 px-6 md:px-16 pb-16 max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="glass-btn px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] text-gold">
                Propuesta Oficial
              </span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest">{catalog.company || "Catering Premium"}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury text-white mb-6 leading-[1.1]">
              {catalog.title}
            </h1>
            
            <p className="text-white/50 md:text-lg max-w-2xl leading-relaxed mb-8 font-light">
              {catalog.description}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
              {[
                { icon: Calendar, text: catalog.date || "Fecha por definir" },
                { icon: MapPin, text: catalog.location || "Lugar del evento" },
                { icon: Clock, text: catalog.pax || "Invitados" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-white/60">
                  <item.icon className="w-4 h-4 text-gold/70" />
                  <span className="tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPLIT LAYOUT (SIDEBAR + CONTENT) ── */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* LEFT SIDEBAR (Sticky Nav) */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28 hidden lg:block border-l border-white/[0.05] py-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-6 pl-6">Índice del Evento</h3>
              <nav className="flex flex-col gap-1">
                {catalog.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left px-6 py-2.5 text-xs tracking-wider transition-all duration-300 border-l-[3px]
                      ${activeSection === sec.id 
                        ? "border-gold text-white bg-white/[0.03] font-medium" 
                        : "border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.01]"
                      }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile horizontal nav */}
            <div className="lg:hidden flex overflow-x-auto scrollbar-hide border-b border-white/[0.05] pb-1 -mx-6 px-6 sticky top-0 bg-[#00040a]/95 backdrop-blur z-40">
              {catalog.sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex-shrink-0 px-4 py-4 text-[11px] uppercase tracking-wider transition-all border-b-2 whitespace-nowrap
                    ${activeSection === sec.id ? "border-gold text-gold" : "border-transparent text-white/40"}`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT CONTENT (Sections & Items) */}
          <div className="flex-1 pb-32">
            {catalog.sections.map((section, secIdx) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="mb-24 scroll-mt-32"
                ref={el => { sectionRefs.current[secIdx] = el }}
              >
                {/* Section Header */}
                <div className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gold/50 font-luxury text-xl">
                      {String(secIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-luxury text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-white/40 text-sm">{section.description}</p>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {section.items.map((item) => (
                    <div key={item.id} className="group flex gap-5 p-4 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/[0.05] transition-all duration-300">
                      
                      {/* Thumbnail */}
                      <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden bg-white/5">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover sepia-[0.2] group-hover:sepia-0 group-hover:scale-110 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-md" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-base font-luxury text-white/90 group-hover:text-gold transition-colors leading-tight">
                            {item.name}
                          </h3>
                          {item.tag && (
                            <span className="flex-shrink-0 text-[8px] uppercase tracking-widest text-gold/60 border border-gold/20 px-1.5 py-0.5 rounded-sm">
                              {item.tag}
                           </span>
                          )}
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                          {item.desc || item.description}
                        </p>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
