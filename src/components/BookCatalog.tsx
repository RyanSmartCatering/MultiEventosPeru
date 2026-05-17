"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, Download, Check, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
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

// Extremely heavy mock data to simulate a 10-page Word document
const mockCatalog: CatalogEvent = {
  id: "boda-imperial-2026",
  title: "Boda Imperial Verano 2026",
  company: "Ryan Smart Catering",
  date: "15 Enero 2026",
  location: "Hacienda Los Ficus, Pachacámac",
  pax: "250 invitados",
  coverImage: "/hero.png",
  description: "Una propuesta integral diseñada exclusivamente para un matrimonio de ultra lujo. Este documento detalla cada aspecto del servicio, desde el mobiliario arquitectónico hasta el menú degustación a 5 tiempos.",
  sections: [
    {
      id: "recepcion",
      title: "Recepción (Bocaditos)",
      description: "Aperitivos fríos y calientes paseados por mozos de guante blanco durante 2 horas.",
      items: [
        { 
          id: "r1", 
          name: "Ronda Marina Fría", 
          desc: "Selección premium de la pesca del día.",
          longText: [
            "Nuestra ronda marina está diseñada para refrescar a los invitados mientras llegan a la locación. Utilizamos exclusivamente pesca del día de origen certificado.",
            "Servido en estaciones de hielo esculpido y bandejas de espejo negro, acompañado de nitrógeno líquido para un efecto visual impactante al acercarse al invitado."
          ],
          features: [
            "Cucharitas de Ceviche de Lenguado con espuma de ají amarillo",
            "Tartar de Atún aleta amarilla con ponzu trufado",
            "Ostras frescas con vinagreta de chalotas y limón sutil",
            "Tiradito apaltado con crujiente de quinua negra"
          ],
          image: "/hero.png", 
          tag: "Premium" 
        },
        { 
          id: "r2", 
          name: "Bocados Calientes Peruanos", 
          desc: "Clásicos reinventados con técnicas modernas.",
          longText: [
            "Para contrastar con la ronda fría, servimos opciones reconfortantes pero sofisticadas. Cada bocado está diseñado para comerse en un solo movimiento, sin riesgo de manchar vestidos de gala."
          ],
          features: [
            "Mini empanaditas de lomo saltado jugoso con azúcar glass",
            "Tequeños de lomo fino con salsa de palta y huacatay",
            "Crocante de pato en masa philo con chutney de frutos rojos",
            "Causitas limeñas en panko con pulpa de cangrejo flameada"
          ],
          image: "/hero.png", 
          tag: "Caliente" 
        }
      ]
    },
    {
      id: "plato-fondo",
      title: "Cena a 3 Tiempos",
      description: "El banquete principal servido en mesa.",
      items: [
        { 
          id: "p1", 
          name: "Fondo: Asado de Tira Estofado", 
          desc: "El corte más jugoso, en cocción lenta de 48 horas.",
          longText: [
            "Nuestro plato bandera absoluto. El asado de tira se cocina al vacío (sous-vide) a temperatura controlada durante 48 horas, logrando una textura que no requiere cuchillo.",
            "La salsa es una reducción de sus propios jugos con vino tinto Cabernet Sauvignon y toques de romero fresco. Una experiencia gastronómica que los invitados recordarán por años."
          ],
          features: [
            "Corte de Asado de Tira sin hueso (250g por porción)",
            "Puré rústico de papa amarilla con mantequilla avellanada y aceite de trufa blanca",
            "Vegetales bebé glaseados (zanahorias orgánicas, espárragos, cebollitas francesas)",
            "Opción vegetariana disponible bajo previa solicitud"
          ],
          image: "/hero.png", 
          tag: "Firma" 
        },
        { 
          id: "p2", 
          name: "Entrada: Carpaccio de Lomo", 
          desc: "Finas láminas de lomo angus con aliño secreto.",
          longText: [
            "Para abrir el apetito, una entrada ligera pero llena de carácter. Cortado al momento del emplatado para garantizar frescura extrema."
          ],
          features: [
            "Lomo Angus calidad Prime",
            "Láminas de queso Grana Padano DOP",
            "Alcaparras fritas y hojas de rúcula selvática",
            "Aceite de oliva extra virgen primera prensada"
          ],
          image: "/hero.png", 
          tag: "Fresco" 
        }
      ]
    },
    {
      id: "barra-libre",
      title: "Barra Libre (8 Horas)",
      description: "Barra iluminada LED con coctelería de autor y licores premium.",
      items: [
        { 
          id: "b1", 
          name: "Selección de Licores Premium", 
          desc: "Servicio continuo sin límite durante las 8 horas del evento.",
          longText: [
            "Entendemos que el bar es el corazón de la fiesta. Por eso no utilizamos licores de baja gama ni escatimamos en las marcas. Nuestro servicio de barra libre incluye coctelería acrobática a solicitud y un barman certificado por cada 50 invitados para garantizar que nadie haga cola."
          ],
          features: [
            "Whisky JW Black Label 12 años y Chivas Regal 12",
            "Ron Flor de Caña 12 años y Havana Club 7 años",
            "Vodka Grey Goose y Absolut",
            "Gin Bombay Sapphire y Tanqueray",
            "Pisco Cuatro Gallos Acholado y Quebranta",
            "Cervezas Corona y Stella Artois",
            "Vinos Intipalka Reserva (Tinto y Blanco)",
            "Gaseosas, tónicas, ginger ale, red bull y jugos naturales"
          ],
          image: "/hero.png", 
          tag: "Premium",
          price: "Incluido en Paquete Oro"
        },
        { 
          id: "b2", 
          name: "Coctelería de Autor", 
          desc: "Tragos diseñados exclusivamente para los novios.",
          longText: [
            "Además de los clásicos (Cuba Libre, Chilcano, Gin Tonic), ofrecemos una carta de cócteles diseñados a la medida de la pareja."
          ],
          features: [
            "'El Novio': Mezcal, jugo de piña ahumada, sal de gusano",
            "'La Novia': Gin, sirope de rosas, lychee, polvo de oro",
            "Margaritas de maracuyá y frutos del bosque",
            "Mojitos de fresa, menta y albahaca"
          ],
          image: "/hero.png"
        }
      ]
    },
    {
      id: "mobiliario",
      title: "Mobiliario y Arquitectura",
      description: "Transformación total de la locación.",
      items: [
        { 
          id: "m1", 
          name: "Salón Imperial Principal", 
          desc: "Estructuras, mesas, sillas y pistas de baile.",
          longText: [
            "Detalle exhaustivo de cada elemento estructural y decorativo que montaremos en el evento. El montaje comienza 48 horas antes de la boda.",
            "Toda la iluminación está mapeada y controlada por un ingeniero de luces profesional. La decoración floral utiliza exclusivamente flores de exportación."
          ],
          features: [
            "Mesas imperiales de madera rústica nogal (para 12 personas)",
            "Mesas redondas con mantel de lino belga blanco óptico",
            "Sillas Crossback de madera para mesas imperiales",
            "Sillas Dior acrílicas para mesas redondas",
            "Menaje de lujo: Platos base dorados, cubiertos de acero color oro, copas de cristal labrado",
            "Pista de baile de 8x8 metros en vinil brillante personalizado con iniciales",
            "Estructura de toldo arquitectónico de 5 metros de alto con tela tensada color crema",
            "Candelabros colgantes de cristal estilo Luis XV (6 unidades)"
          ],
          image: "/hero.png",
          tag: "Estructural"
        }
      ]
    },
    {
      id: "condiciones",
      title: "Condiciones y Cronograma",
      description: "Reglas de juego claras.",
      items: [
        { 
          id: "c1", 
          name: "Términos Comerciales", 
          desc: "Políticas de pago, penalidades y requisitos.",
          longText: [
            "La transparencia es nuestro principal valor. A continuación, detallamos las políticas comerciales que rigen esta cotización. Al aceptar esta propuesta, ambas partes acuerdan los siguientes términos vinculantes."
          ],
          features: [
            "Firma de contrato y reserva de fecha: 30% del presupuesto total",
            "Segundo pago: 40% a 60 días antes del evento",
            "Saldo final: 30% a 15 días antes del evento (fecha límite de confirmación de invitados)",
            "Gastos de rotura o pérdida de menaje no están incluidos y se facturarán post-evento",
            "Si la locación requiere pago de garantía, este es asumido por el cliente",
            "Horario de servicio de 8:00 PM a 4:00 AM (8 horas)",
            "Hora extra: $800 USD (incluye personal, comida de trasnoche y barra)"
          ],
          image: "/hero.png",
          tag: "Legal"
        }
      ]
    }
  ]
};

export function BookCatalog({ event }: { event?: CatalogEvent }) {
  const catalog = event || mockCatalog;
  
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeSection = activeSectionIndex >= 0 ? catalog.sections[activeSectionIndex] : null;
  const activeItem = activeSection ? activeSection.items[activeItemIndex] : null;

  // Reset item index is handled inside goToSection to avoid setState-in-effect lint error

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
    setActiveItemIndex(0);
  };

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
  }, [activeSection]);

  return (
    <main className="h-[100dvh] w-full bg-[#00040a] text-white overflow-hidden relative select-none font-sans flex flex-col">
      
      {/* BACKGROUND IMAGE - Fixed position behind everything */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBackgroundImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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

      {/* GRADIENTS: Heavier on the right where the text goes, and at the top for nav */}
      <div className="absolute inset-0 z-10 bg-gradient-to-l from-black/95 via-black/80 to-transparent pointer-events-none md:w-3/5 right-0 ml-auto" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 z-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* TOP NAVIGATION BAR */}
      <header className="relative z-50 flex-none flex items-center justify-between px-6 md:px-12 py-6">
        <Link href={`/empresa/${(catalog.company || 'ryan-smart-catering').toLowerCase().replace(/ /g, '-')}`} className="group flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 hover:text-gold transition-colors">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/50 bg-black/40 backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
          <span className="hidden md:inline">Volver</span>
        </Link>

        {/* Tab Navigation (Center) - Desktop */}
        <nav className="hidden md:flex justify-center items-center gap-2 px-6 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 max-w-2xl overflow-x-auto no-scrollbar mask-edges-horizontal">
          <button
            onClick={() => goToSection(-1)}
            className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
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
              className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap
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
          <button onClick={handleShare} className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 bg-black/40 backdrop-blur-md border border-white/10 transition-all">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-gold hover:bg-white/5 bg-black/40 backdrop-blur-md border border-white/10 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Navigation */}
      <div className="md:hidden relative z-50 px-6 pb-2 mb-4 overflow-x-auto no-scrollbar mask-edges-horizontal flex-none">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => goToSection(-1)}
            className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${
              activeSectionIndex === -1 ? "bg-gold border-gold text-black font-bold" : "bg-black/60 border-white/20 text-white/70 backdrop-blur-md"
            }`}
          >
            Portada
          </button>
          {catalog.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${
                activeSectionIndex === idx ? "bg-gold border-gold text-black font-bold" : "bg-black/60 border-white/20 text-white/70 backdrop-blur-md"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA - Takes remaining height */}
      <div className="relative z-20 flex-1 w-full flex flex-col md:flex-row px-6 md:px-12 lg:px-24 pb-6 md:pb-12 gap-10 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {/* ================= COVER PAGE ================= */}
          {activeSectionIndex === -1 ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full flex flex-col justify-center max-w-4xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md mb-8 w-max">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gold font-bold">Dossier Oficial Extendido</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-luxury text-white leading-[1.05] mb-6 drop-shadow-2xl">
                {catalog.title}
              </h1>
              
              <p className="text-lg md:text-2xl text-white/80 max-w-3xl font-light leading-relaxed drop-shadow-md mb-12">
                {catalog.description}
              </p>

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 w-max">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold/80 mb-1">Locación</p>
                    <p className="text-white font-medium">{catalog.location}</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold/80 mb-1">Fecha</p>
                    <p className="text-white font-medium">{catalog.date}</p>
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gold/80 mb-1">Asistentes</p>
                    <p className="text-white font-medium">{catalog.pax}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          ) : activeSection && activeItem ? (
            
            /* ================= MASTER-DETAIL VIEW ================= */
            <div className="w-full h-full flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 lg:gap-16">
              
              {/* --- LEFT PANEL: THE MASTER INDEX --- */}
              <div className="order-2 md:order-1 w-full md:w-[350px] flex-none flex flex-col md:justify-center z-30 h-max md:h-full pb-8 md:pb-0">
                <h3 className="text-gold font-luxury text-2xl md:text-3xl mb-6 flex items-center gap-3 drop-shadow-md">
                  <span className="w-8 h-[1px] bg-gold" />
                  {activeSection.title}
                </h3>
                
                <div className="flex flex-col gap-2 max-h-[35vh] md:max-h-[60vh] overflow-y-auto no-scrollbar pr-4 mask-edges-vertical">
                  {activeSection.items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveItemIndex(idx)}
                      className={`text-left group relative py-4 px-5 rounded-2xl transition-all duration-300 border ${
                        activeItemIndex === idx 
                          ? "bg-black/80 backdrop-blur-xl border-white/30 shadow-2xl" 
                          : "bg-black/30 border-white/5 hover:bg-black/60 hover:backdrop-blur-lg hover:border-white/20"
                      }`}
                    >
                      {activeItemIndex === idx && (
                        <motion.div layoutId="active-item-indicator" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full" />
                      )}
                      
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm md:text-base font-medium transition-colors ${
                          activeItemIndex === idx ? "text-gold" : "text-white/80 group-hover:text-white"
                        }`}>
                          {item.name}
                        </span>
                      </div>
                      
                      {item.tag && (
                        <span className="text-[9px] uppercase tracking-widest text-white/50">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Keyboard hints */}
                <div className="hidden md:flex items-center gap-4 mt-8 text-white/40 text-[10px] tracking-widest uppercase px-4">
                  <div className="flex gap-1">
                    <span className="w-5 h-5 rounded border border-white/20 flex items-center justify-center bg-black/20">↑</span>
                    <span className="w-5 h-5 rounded border border-white/20 flex items-center justify-center bg-black/20">↓</span>
                  </div>
                  <span>Navegar</span>
                </div>
              </div>

              {/* --- RIGHT PANEL: LONG-FORM READING PANE --- */}
              <motion.div 
                key={`${activeSection.id}-${activeItem.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="order-1 md:order-2 flex-1 w-full h-full flex flex-col justify-start md:justify-center z-20"
              >
                {/* SCROLLABLE TEXT AREA FOR MASSIVE WORD DOCUMENTS */}
                <div className="w-full max-w-3xl md:ml-auto bg-black/40 md:bg-black/20 backdrop-blur-lg border border-white/10 md:border-transparent rounded-3xl p-6 md:p-12 md:max-h-[75vh] overflow-y-auto custom-scrollbar">
                  
                  {activeItem.tag && (
                    <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-gold mb-6 w-max backdrop-blur-md">
                      {activeItem.tag}
                    </span>
                  )}
                  
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-luxury text-white mb-6 leading-[1.05] drop-shadow-2xl">
                    {activeItem.name}
                  </h2>
                  
                  {(activeItem.desc || activeItem.description) && (
                    <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow-lg mb-8">
                      {activeItem.desc || activeItem.description}
                    </p>
                  )}

                  {/* Pricing / Highlighted Information */}
                  {activeItem.price && (
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gold/10 border border-gold/20 mb-8">
                      <CheckCircle2 className="w-5 h-5 text-gold" />
                      <span className="text-sm font-medium tracking-wide text-white">{activeItem.price}</span>
                    </div>
                  )}

                  {/* Long descriptive paragraphs */}
                  {activeItem.longText && activeItem.longText.length > 0 && (
                    <div className="space-y-6 mb-10">
                      {activeItem.longText.map((paragraph, i) => (
                        <p key={i} className="text-sm md:text-base text-white/70 font-light leading-loose text-justify md:text-left">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Massive Lists / Bullet points / Inclusions */}
                  {activeItem.features && activeItem.features.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">Incluye / Detalles Exactos</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {activeItem.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-none" />
                            <span className="text-sm text-white/80 font-light leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </motion.div>

            </div>
          ) : null}
        </AnimatePresence>
      </div>

    </main>
  );
}
