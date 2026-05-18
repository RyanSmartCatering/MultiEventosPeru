"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, MapPin, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const FILTERS = ["Todos", "Bodas", "Corporativo", "Quinceañeros", "Comida", "Nocturnos", "Sociales"];

// 24 empresas demo — en producción vendrán de Supabase
const companies = [
  { id:"ryan-smart-catering",  name:"Ryan Smart Catering",   rating:5.0, category:"Gala & Corporativo",  cat:"Corporativo", logo:"RS", tag:"Verificado", district:"Miraflores",  catalogs:4  },
  { id:"elite-events",         name:"Elite Events Perú",     rating:4.9, category:"Bodas de Lujo",        cat:"Bodas",       logo:"EE", tag:"Premium",    district:"San Isidro",  catalogs:7  },
  { id:"gourmet-peru",         name:"Gourmet Perú",          rating:4.8, category:"Comida Fusión",        cat:"Comida",      logo:"GP", tag:"Nuevo",      district:"Surco",        catalogs:3  },
  { id:"midnight-banquets",    name:"Midnight Banquets",     rating:4.9, category:"Eventos Nocturnos",    cat:"Nocturnos",   logo:"MB",                   district:"La Molina",    catalogs:5  },
  { id:"la-gala-catering",     name:"La Gala Catering",      rating:4.7, category:"Quinceañeros",         cat:"Quinceañeros",logo:"LG",                   district:"San Borja",    catalogs:6  },
  { id:"sabores-andinos",      name:"Sabores Andinos",        rating:4.8, category:"Comida Peruana",       cat:"Comida",      logo:"SA", tag:"Artesanal",  district:"Barranco",     catalogs:4  },
  { id:"prestige-events",      name:"Prestige Events",        rating:4.6, category:"Eventos Sociales",     cat:"Sociales",    logo:"PE",                   district:"Jesús María",  catalogs:8  },
  { id:"golden-banquet",       name:"Golden Banquet",         rating:4.9, category:"Bodas & Gala",         cat:"Bodas",       logo:"GB", tag:"Top",        district:"San Miguel",   catalogs:5  },
  { id:"luxe-moments",         name:"Luxe Moments",           rating:4.7, category:"Bodas de Lujo",        cat:"Bodas",       logo:"LM", tag:"Exclusivo",  district:"Miraflores",   catalogs:3  },
  { id:"fiesta-imperial",      name:"Fiesta Imperial",        rating:4.5, category:"Gala & Corporativo",   cat:"Corporativo", logo:"FI",                   district:"San Isidro",   catalogs:6  },
  { id:"dulces-momentos",      name:"Dulces Momentos",        rating:4.6, category:"Quinceañeros",         cat:"Quinceañeros",logo:"DM",                   district:"Lince",         catalogs:4  },
  { id:"alta-cocina-peru",     name:"Alta Cocina Perú",       rating:4.9, category:"Comida Fusión",        cat:"Comida",      logo:"AC", tag:"Chef Award", district:"Barranco",     catalogs:9  },
  { id:"eventos-aurora",       name:"Eventos Aurora",         rating:4.5, category:"Eventos Sociales",     cat:"Sociales",    logo:"EA",                   district:"Pueblo Libre", catalogs:3  },
  { id:"banquetes-sol",        name:"Banquetes del Sol",      rating:4.4, category:"Comida Peruana",       cat:"Comida",      logo:"BS",                   district:"Surquillo",    catalogs:2  },
  { id:"noche-de-gala",        name:"Noche de Gala",          rating:4.8, category:"Eventos Nocturnos",    cat:"Nocturnos",   logo:"NG", tag:"Nuevo",      district:"Chorrillos",   catalogs:5  },
  { id:"crystal-events",       name:"Crystal Events",         rating:4.7, category:"Bodas de Lujo",        cat:"Bodas",       logo:"CE",                   district:"La Molina",    catalogs:6  },
  { id:"chef-andino",          name:"Chef Andino",            rating:4.6, category:"Comida Fusión",        cat:"Comida",      logo:"CA", tag:"Artesanal",  district:"Miraflores",   catalogs:4  },
  { id:"elite-quinces",        name:"Elite Quinces Perú",     rating:4.5, category:"Quinceañeros",         cat:"Quinceañeros",logo:"EQ",                   district:"San Borja",    catalogs:5  },
  { id:"gran-fiesta",          name:"Gran Fiesta Catering",   rating:4.3, category:"Eventos Sociales",     cat:"Sociales",    logo:"GF",                   district:"Magdalena",    catalogs:3  },
  { id:"boda-perfecta",        name:"Boda Perfecta Perú",     rating:4.8, category:"Bodas de Lujo",        cat:"Bodas",       logo:"BP", tag:"Premium",    district:"San Isidro",   catalogs:7  },
  { id:"cocina-del-mar",       name:"Cocina del Mar",         rating:4.6, category:"Comida Fusión",        cat:"Comida",      logo:"CM",                   district:"Barranco",     catalogs:4  },
  { id:"imperial-events",      name:"Imperial Events",        rating:4.7, category:"Gala & Corporativo",   cat:"Corporativo", logo:"IE",                   district:"Surco",        catalogs:6  },
  { id:"fiestas-lima",         name:"Fiestas Lima Premium",   rating:4.5, category:"Eventos Sociales",     cat:"Sociales",    logo:"FL",                   district:"Jesús María",  catalogs:3  },
  { id:"sabor-y-elegancia",    name:"Sabor y Elegancia",      rating:4.9, category:"Comida Peruana",       cat:"Comida",      logo:"SE", tag:"Top",        district:"Miraflores",   catalogs:8  },
];

const STARS = [5, 4, 3];

export default function ExplorarPage() {
  const [search, setSearch]           = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [minRating, setMinRating]     = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() =>
    companies.filter(c => {
      const matchCat    = activeFilter === "Todos" || c.cat === activeFilter;
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.district.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchRating = c.rating >= minRating;
      return matchCat && matchSearch && matchRating;
    }),
  [search, activeFilter, minRating]);

  const activeFilterCount = (activeFilter !== "Todos" ? 1 : 0) + (minRating > 0 ? 1 : 0);

  return (
    <main className="h-[100dvh] w-full bg-[#00050f] text-white overflow-hidden flex flex-col relative">

      {/* Background */}
      <div className="bg-dots" />
      <div className="bg-orb-tl" />
      <div className="bg-line-top" />
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />

      {/* ── NAV ── */}
      <nav className="relative z-50 flex-none flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.05]">
        <Link href="/" className="text-xl font-luxury gold-gradient font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <UserNav />
      </nav>

      {/* ── HEADER + SEARCH ── */}
      <div className="relative z-10 flex-none px-6 md:px-10 pt-5 pb-4 border-b border-white/[0.04]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-[1600px] mx-auto">

          {/* Title + count */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.5em] text-gold/40 mb-1">Directorio</p>
            <h1 className="text-2xl md:text-3xl font-luxury leading-tight">
              Descubre la <span className="gold-shimmer italic">Excelencia</span>
              <span className="ml-3 text-sm font-sans font-normal text-white/25 not-italic">{filtered.length} empresas</span>
            </h1>
          </div>

          {/* Search + filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold/40 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar empresa, distrito..."
                className="bg-white/[0.04] border border-white/[0.08] rounded-full py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-gold/40 transition-all text-white placeholder-white/25 w-64"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] border transition-all ${showFilters ? "border-gold/50 text-gold bg-gold/10" : "glass-btn text-white/50"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtros</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gold text-black text-[8px] font-bold flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Filter drawer */}
        {showFilters && (
          <div className="max-w-[1600px] mx-auto mt-4 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 self-center mr-1">Tipo:</p>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] transition-all duration-200 ${
                    activeFilter === f ? "bg-gold text-black font-bold shadow-[0_0_16px_rgba(255,195,0,0.35)]" : "glass-btn text-white/45 hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="h-5 w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-wrap gap-2">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/25 self-center mr-1">Mín ★:</p>
              {STARS.map(s => (
                <button
                  key={s}
                  onClick={() => setMinRating(minRating === s ? 0 : s)}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] tracking-widest transition-all ${
                    minRating === s ? "bg-gold/20 border border-gold/50 text-gold" : "glass-btn text-white/40 hover:text-gold"
                  }`}
                >
                  {"★".repeat(s)}+
                </button>
              ))}
            </div>
            {activeFilterCount > 0 && (
              <button onClick={() => { setActiveFilter("Todos"); setMinRating(0); }} className="text-[9px] uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors ml-2">
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── COMPANIES GRID (scrollable internamente) ── */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide px-6 md:px-10 py-5">
        <div className="max-w-[1600px] mx-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-white/20">
              <p className="text-2xl font-luxury mb-2">Sin resultados</p>
              <p className="text-sm">Prueba con otros términos o quita los filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map(company => (
                <Link key={company.id} href={`/empresa/${company.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.07] group-hover:border-gold/40 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(255,195,0,0.1)] flex flex-col">

                    {/* Cover image — fixed compact height */}
                    <div className="relative h-24 flex-none overflow-hidden">
                      <Image src="/hero.png" alt={company.name} fill className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00050f] via-[#00050f]/20 to-transparent" />

                      {/* Rating pill */}
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                        <Star className="w-2 h-2 text-gold fill-gold" />
                        <span className="text-[9px] font-semibold">{company.rating}</span>
                      </div>

                      {/* Tag */}
                      {company.tag && (
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full border border-gold/30 bg-gold/15">
                          <span className="text-[7px] uppercase tracking-wide text-gold">{company.tag}</span>
                        </div>
                      )}

                      {/* Logo avatar */}
                      <div className="absolute -bottom-4 left-2.5 w-8 h-8 bg-[#00050f] rounded-full border border-gold/25 flex items-center justify-center z-10 shadow-lg">
                        <span className="text-[8px] font-luxury text-gold">{company.logo}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-none pt-5 pb-3 px-3">
                      <div className="flex items-center gap-1 mb-0.5">
                        <MapPin className="w-2 h-2 text-gold/30 flex-shrink-0" />
                        <span className="text-[7px] text-white/25 uppercase tracking-wider truncate">{company.district}</span>
                      </div>
                      <p className="text-[7px] uppercase tracking-[0.2em] text-gold/45 mb-0.5 truncate">{company.category}</p>
                      <h3 className="text-[11px] font-luxury text-white/85 group-hover:text-gold transition-colors leading-tight mb-1.5 line-clamp-2">{company.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[7px] text-white/20">{company.catalogs} catálogos</span>
                        <ChevronRight className="w-3 h-3 text-gold/0 group-hover:text-gold/60 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer fijo — cantidad visible */}
      <div className="relative z-10 flex-none px-6 md:px-10 py-2.5 border-t border-white/[0.04] flex justify-between items-center">
        <p className="text-[8px] uppercase tracking-[0.35em] text-white/20">
          Mostrando <span className="text-gold/50">{filtered.length}</span> de <span className="text-gold/50">{companies.length}</span> empresas
        </p>
        <p className="text-[8px] uppercase tracking-[0.35em] text-white/15">Multi Eventos Perú © 2026</p>
      </div>

    </main>
  );
}
