"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, MapPin, ChevronRight, SlidersHorizontal, X, ChevronLeft, Award, Crown, ArrowRight } from "lucide-react";
import { UserNav } from "@/components/UserNav";
import { motion, AnimatePresence } from "framer-motion";

const FILTERS = ["Todos", "Bodas", "Corporativo", "Quinceañeros", "Comida", "Nocturnos", "Sociales"];

// 24 empresas demo — en producción vendrán de Supabase con sus relaciones a 'events' (catálogos)
// Cada empresa ahora tiene un arreglo de 'catalogos', y la lógica de filtrado depende de estos.
const baseCompanies = [
  { id:"ryan-smart-catering",  name:"Ryan Smart Catering",   rating:5.0, category:"Gala & Corporativo",  logo:"RS", tag:"Verificado", district:"Miraflores"  },
  { id:"elite-events",         name:"Elite Events Perú",     rating:4.9, category:"Bodas de Lujo",        logo:"EE", tag:"Premium",    district:"San Isidro"  },
  { id:"gourmet-peru",         name:"Gourmet Perú",          rating:4.8, category:"Comida Fusión",        logo:"GP", tag:"Nuevo",      district:"Surco"        },
  { id:"midnight-banquets",    name:"Midnight Banquets",     rating:4.9, category:"Eventos Nocturnos",    logo:"MB",                   district:"La Molina"    },
  { id:"la-gala-catering",     name:"La Gala Catering",      rating:4.7, category:"Quinceañeros",         logo:"LG",                   district:"San Borja"    },
  { id:"sabores-andinos",      name:"Sabores Andinos",        rating:4.8, category:"Comida Peruana",       logo:"SA", tag:"Artesanal",  district:"Barranco"     },
  { id:"prestige-events",      name:"Prestige Events",        rating:4.6, category:"Eventos Sociales",     logo:"PE",                   district:"Jesús María"  },
  { id:"golden-banquet",       name:"Golden Banquet",         rating:4.9, category:"Bodas & Gala",         logo:"GB", tag:"Top",        district:"San Miguel"   },
  { id:"luxe-moments",         name:"Luxe Moments",           rating:4.7, category:"Bodas de Lujo",        logo:"LM", tag:"Exclusivo",  district:"Miraflores"   },
  { id:"fiesta-imperial",      name:"Fiesta Imperial",        rating:4.5, category:"Gala & Corporativo",   logo:"FI",                   district:"San Isidro"   },
  { id:"dulces-momentos",      name:"Dulces Momentos",        rating:4.6, category:"Quinceañeros",         logo:"DM",                   district:"Lince"         },
  { id:"alta-cocina-peru",     name:"Alta Cocina Perú",       rating:4.9, category:"Comida Fusión",        logo:"AC", tag:"Chef Award", district:"Barranco"     },
  { id:"eventos-aurora",       name:"Eventos Aurora",         rating:4.5, category:"Eventos Sociales",     logo:"EA",                   district:"Pueblo Libre" },
  { id:"banquetes-sol",        name:"Banquetes del Sol",      rating:4.4, category:"Comida Peruana",       logo:"BS",                   district:"Surquillo"    },
  { id:"noche-de-gala",        name:"Noche de Gala",          rating:4.8, category:"Eventos Nocturnos",    logo:"NG", tag:"Nuevo",      district:"Chorrillos"   },
  { id:"crystal-events",       name:"Crystal Events",         rating:4.7, category:"Bodas de Lujo",        logo:"CE",                   district:"La Molina"    },
  { id:"chef-andino",          name:"Chef Andino",            rating:4.6, category:"Comida Fusión",        logo:"CA", tag:"Artesanal",  district:"Miraflores"   },
  { id:"elite-quinces",        name:"Elite Quinces Perú",     rating:4.5, category:"Quinceañeros",         logo:"EQ",                   district:"San Borja"    },
  { id:"gran-fiesta",          name:"Gran Fiesta Catering",   rating:4.3, category:"Eventos Sociales",     logo:"GF",                   district:"Magdalena"    },
  { id:"boda-perfecta",        name:"Boda Perfecta Perú",     rating:4.8, category:"Bodas de Lujo",        logo:"BP", tag:"Premium",    district:"San Isidro"   },
  { id:"cocina-del-mar",       name:"Cocina del Mar",         rating:4.6, category:"Comida Fusión",        logo:"CM",                   district:"Barranco"     },
  { id:"imperial-events",      name:"Imperial Events",        rating:4.7, category:"Gala & Corporativo",   logo:"IE",                   district:"Surco"        },
  { id:"fiestas-lima",         name:"Fiestas Lima Premium",   rating:4.5, category:"Eventos Sociales",     logo:"FL",                   district:"Jesús María"  },
  { id:"sabor-y-elegancia",    name:"Sabor y Elegancia",      rating:4.9, category:"Comida Peruana",       logo:"SE", tag:"Top",        district:"Miraflores"   },
];

const premiumImages = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530103862676-de8892ebe6c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
];

// Generamos catálogos múltiples para demostrar que una empresa puede aparecer en varios filtros
const companies = baseCompanies.map((c, i) => {
  // Asignamos catálogos lógicos a algunas empresas clave para la demo
  let catalogos = [];
  if (c.id === "ryan-smart-catering") {
    catalogos = [
      { id: "1", title: "Boda Civil VIP", tipo_evento: "Bodas" },
      { id: "2", title: "Lunch Ejecutivo", tipo_evento: "Corporativo" },
      { id: "3", title: "Cena de Ensayo", tipo_evento: "Sociales" }
    ];
  } else if (c.id === "elite-events") {
    catalogos = [
      { id: "4", title: "Bodas de Oro", tipo_evento: "Bodas" },
      { id: "5", title: "Fiesta Privada", tipo_evento: "Nocturnos" }
    ];
  } else if (c.id === "la-gala-catering") {
    catalogos = [
      { id: "6", title: "Quinces de Ensueño", tipo_evento: "Quinceañeros" },
      { id: "7", title: "Catering Corporativo", tipo_evento: "Corporativo" }
    ];
  } else {
    // Para el resto, generamos 1 o 2 catálogos aleatorios basados en su categoría base para poblar la demo
    const defaultType = c.category.includes("Bodas") ? "Bodas" :
                        c.category.includes("Corp") ? "Corporativo" :
                        c.category.includes("Quince") ? "Quinceañeros" :
                        c.category.includes("Comida") ? "Comida" :
                        c.category.includes("Nocturno") ? "Nocturnos" : "Sociales";
    
    catalogos.push({ id: `c-${i}-1`, title: `Catálogo Principal ${c.name}`, tipo_evento: defaultType });
    
    // 30% de probabilidad de tener un segundo catálogo de otro tipo
    if (i % 3 === 0) {
      const extraTypes = FILTERS.filter(f => f !== "Todos" && f !== defaultType);
      catalogos.push({ id: `c-${i}-2`, title: `Servicios Extra ${c.name}`, tipo_evento: extraTypes[i % extraTypes.length] });
    }
  }

  const image = premiumImages[i % premiumImages.length];

  return { ...c, catalogos, image };
});

const getBadgeClasses = (tag: string) => {
  const lower = tag.toLowerCase();
  if (lower === "verificado") return "text-emerald-300 border-amber-500/50 bg-black/60 shadow-[0_0_15px_rgba(52,211,153,0.2)]";
  if (lower === "nuevo") return "text-blue-300 border-amber-500/50 bg-black/60 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
  if (lower === "premium" || lower === "top" || lower === "exclusivo") return "text-amber-300 border-amber-400/60 bg-black/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]";
  if (lower === "artesanal") return "text-orange-300 border-orange-500/50 bg-black/60 shadow-[0_0_15px_rgba(251,146,60,0.2)]";
  if (lower === "chef award") return "text-rose-300 border-rose-500/50 bg-black/60 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
  return "text-amber-200 border-amber-600/40 bg-black/60"; // fallback
};


const ITEMS_PER_PAGE = 8; // Exactamente 8 cards por página (4 columnas x 2 filas)

export default function ExplorarPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter]);

  const filtered = useMemo(() =>
    companies.filter(c => {
      // 1. LÓGICA PRINCIPAL: Una empresa pasa el filtro si tiene al menos UN catálogo del tipo seleccionado
      const matchCat = activeFilter === "Todos" || c.catalogos.some(cat => cat.tipo_evento === activeFilter);
      
      const matchSearch = !search || 
        c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.district.toLowerCase().includes(search.toLowerCase()) || 
        c.category.toLowerCase().includes(search.toLowerCase());
        
      return matchCat && matchSearch;
    }),
  [search, activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const featuredCompany = companies[0]; // Ryan Smart Catering como destacado

  return (
    <main className="h-[100dvh] w-full bg-[#030712] text-white overflow-hidden flex flex-col relative">
      {/* Fondo inmersivo: Azul Noche Profundo con Polvo de Oro */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071')] bg-cover bg-center opacity-10 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-[#030712]/80 to-[#000000] z-0" />
      
      {/* Nebulosas doradas (Glows asimétricos) */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-800/10 blur-[150px] rounded-full" />

      {/* ── TOP NAV ── */}
      <nav className="relative z-50 flex-none flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/5 bg-[#030712]/60 backdrop-blur-xl">
        <Link href="/" className="text-xl font-luxury bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-500/60 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre o destino..."
              className="bg-black/40 border border-amber-500/40 rounded-full py-2 pl-10 pr-8 text-xs focus:outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all duration-300 text-white placeholder-white/40 w-72"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="w-px h-5 bg-white/10 hidden md:block" />
          <UserNav />
        </div>
      </nav>

      {/* ── MAIN DASHBOARD LAYOUT ── */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        
        {/* ══ PANEL IZQUIERDO: Panel de Control (Fixed Width) ══ */}
        <aside className="hidden md:flex flex-col w-[340px] border-r border-white/5 bg-[#030712]/40 backdrop-blur-2xl p-6 flex-none relative z-10">
          
          <div className="mb-8">
            <p className="text-[9px] uppercase tracking-[0.4em] text-amber-500 mb-2 flex items-center gap-2">
              <Crown className="w-3 h-3" /> Ecosistema Premium
            </p>
            <h1 className="text-3xl font-luxury leading-tight mb-2">Directorio<br/><span className="text-white/40 italic">Exclusivo</span></h1>
            <p className="text-xs text-white/40 leading-relaxed">Explora proveedores basados en el tipo de eventos y catálogos que ofrecen.</p>
          </div>

          {/* Filtros Estilizados */}
          <div className="mb-8 flex-1">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-4 px-1">Tipos de Catálogos</p>
            <div className="flex flex-col gap-1.5">
              {FILTERS.map(f => {
                // Contamos cuántas empresas tienen al menos un catálogo de este tipo
                const count = f === "Todos" 
                  ? companies.filter(c => c.catalogos.length > 0).length 
                  : companies.filter(c => c.catalogos.some(cat => cat.tipo_evento === f)).length;
                
                const isActive = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 border ${
                      isActive 
                        ? "bg-gradient-to-r from-amber-900/40 to-transparent border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                        : "bg-transparent border-transparent text-white/40 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-xs tracking-wide">{f}</span>
                    <span className={`text-[10px] font-mono ${isActive ? "text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)] font-bold" : "text-white/60"}`}>
                      {String(count).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tarjeta Destacada */}
          <div className="mt-auto relative rounded-2xl overflow-hidden border border-amber-500/20 p-5 group cursor-pointer bg-black/40 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-amber-400/60">Destacado del Mes</p>
                <p className="text-sm font-luxury text-white truncate">{featuredCompany.name}</p>
              </div>
            </div>
            <p className="text-[10px] text-white/40 mb-4 relative z-10 line-clamp-2">Reconocido por su excelencia y múltiples opciones en Bodas y Corporativo.</p>
            <Link href={`/empresa/${featuredCompany.id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400 hover:text-white transition-colors relative z-10">
              Ver perfil <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </aside>

        {/* ══ PANEL DERECHO: Paginación + Grid Fijo ══ */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          {/* Header del Grid */}
          <div className="flex-none flex items-center justify-between px-8 py-5 border-b border-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-xs text-white/60">
                Mostrando <span className="text-white font-medium">{paginated.length}</span> empresas con catálogos de <span className="text-white font-medium">{activeFilter}</span>
              </p>
            </div>
            
            {/* Controles de Paginación Superior */}
            {totalPages > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-white/30">Página {currentPage} de {totalPages}</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-amber-500/40 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-amber-500/40 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Grid Principal - SIN SCROLL, llena la pantalla */}
          <div className="flex-1 p-8">
            {paginated.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/20 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <Search className="w-12 h-12 mb-4 text-white/10" />
                <p className="text-2xl font-luxury mb-2 text-white/40">Sin resultados</p>
                <p className="text-sm">Ninguna empresa tiene catálogos asignados a la categoría "{activeFilter}".</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPage + activeFilter + search}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full"
                  style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}
                >
                  {paginated.map((company) => (
                    <Link key={company.id} href={`/empresa/${company.id}`} className="group block h-full">
                      <div className={`h-full relative overflow-hidden rounded-2xl bg-[#050B14]/80 backdrop-blur-xl border transition-all duration-500 flex flex-col group-hover:-translate-y-1 ${
                        company.id === featuredCompany.id ? "border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "border-white/5 group-hover:border-amber-500/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
                      }`}>
                        
                        {/* Cover Image */}
                        <div className="relative h-[50%] flex-none overflow-hidden">
                          <Image src={company.image} alt={company.name} fill className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent" />
                          
                          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md border border-amber-500/20 px-2 py-1 rounded-full">
                            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                            <span className="text-[10px] font-semibold text-white">{company.rating}</span>
                          </div>
                          
                          {company.tag && (
                            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full border backdrop-blur-md ${getBadgeClasses(company.tag)}`}>
                              <span className="text-[8px] uppercase tracking-widest font-bold">{company.tag}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between p-5 relative z-10">
                          {/* Logo Avatar overlapping cover */}
                          <div className="absolute -top-6 left-5 w-12 h-12 bg-[#020617] rounded-xl border border-amber-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.15)] transform group-hover:rotate-6 transition-transform duration-500">
                            <span className="text-xs font-luxury text-amber-400">{company.logo}</span>
                          </div>

                          <div className="pt-6">
                            <h3 className="text-lg font-luxury text-white/90 group-hover:text-amber-400 transition-colors leading-tight mb-2">{company.name}</h3>
                            
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {/* Mostramos los tipos de catálogos que ofrece esta empresa */}
                              {Array.from(new Set(company.catalogos.map(cat => cat.tipo_evento))).map((tipo, idx) => (
                                <span key={idx} className="text-[7px] px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-widest text-amber-500/80 bg-amber-900/10">
                                  {tipo}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-white/40 group-hover:text-white/60 transition-colors">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="text-[10px] tracking-wide truncate">{company.district}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                            <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{company.catalogos.length} catálogos en total</span>
                            <div className="w-6 h-6 rounded-full border border-amber-500/0 group-hover:border-amber-500/40 flex items-center justify-center group-hover:bg-amber-500/10 transition-all duration-300">
                              <ChevronRight className="w-3 h-3 text-amber-500/0 group-hover:text-amber-400 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Footer del Grid (Paginación Inferior) */}
          {totalPages > 1 && (
            <div className="flex-none px-8 py-5 border-t border-white/[0.03] flex items-center justify-center gap-2 relative z-10">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentPage === i + 1 ? "w-8 bg-amber-500" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Ir a la página ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
