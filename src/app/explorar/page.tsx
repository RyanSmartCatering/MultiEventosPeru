"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, ChevronRight } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const CATEGORIES = [
  { label: "Todos", value: "todos" },
  { label: "Bodas", value: "bodas" },
  { label: "Gala & Corp.", value: "corporativo" },
  { label: "Quinceañeros", value: "quincea" },
  { label: "Comida", value: "comida" },
  { label: "Nocturnos", value: "nocturnos" },
];

const companies = [
  { id: "ryan-smart-catering",   name: "Ryan Smart Catering",   rating: 5.0, category: "Gala & Corporativo",   cat: "corporativo", logo: "RS", tag: "Verificado", district: "Miraflores",  image: "/hero.png", catalogs: 4  },
  { id: "elite-events",          name: "Elite Events Perú",     rating: 4.9, category: "Bodas de Lujo",         cat: "bodas",       logo: "EE", tag: "Premium",    district: "San Isidro",   image: "/hero.png", catalogs: 7  },
  { id: "gourmet-peru",          name: "Gourmet Perú",          rating: 4.8, category: "Comida Fusión",         cat: "comida",      logo: "GP", tag: "Nuevo",      district: "Surco",         image: "/hero.png", catalogs: 3  },
  { id: "midnight-banquets",     name: "Midnight Banquets",     rating: 4.9, category: "Eventos Nocturnos",     cat: "nocturnos",   logo: "MB",                    district: "La Molina",     image: "/hero.png", catalogs: 5  },
  { id: "la-gala-catering",      name: "La Gala Catering",      rating: 4.7, category: "Quinceañeros",          cat: "quincea",     logo: "LG",                    district: "San Borja",     image: "/hero.png", catalogs: 6  },
  { id: "sabores-andinos",       name: "Sabores Andinos",       rating: 4.8, category: "Comida Peruana",        cat: "comida",      logo: "SA", tag: "Artesanal",  district: "Barranco",      image: "/hero.png", catalogs: 4  },
  { id: "prestige-events",       name: "Prestige Events",       rating: 4.6, category: "Eventos Sociales",      cat: "bodas",       logo: "PE",                    district: "Jesús María",   image: "/hero.png", catalogs: 8  },
  { id: "golden-banquet",        name: "Golden Banquet",        rating: 4.9, category: "Bodas & Gala",          cat: "bodas",       logo: "GB", tag: "Top",        district: "San Miguel",    image: "/hero.png", catalogs: 5  },
  { id: "luxe-moments",          name: "Luxe Moments",          rating: 4.7, category: "Bodas de Lujo",         cat: "bodas",       logo: "LM", tag: "Exclusivo",  district: "Miraflores",   image: "/hero.png", catalogs: 3  },
  { id: "fiesta-imperial",       name: "Fiesta Imperial",       rating: 4.5, category: "Gala & Corporativo",   cat: "corporativo", logo: "FI",                    district: "San Isidro",    image: "/hero.png", catalogs: 6  },
  { id: "dulces-momentos",       name: "Dulces Momentos",       rating: 4.6, category: "Quinceañeros",          cat: "quincea",     logo: "DM",                    district: "Lince",         image: "/hero.png", catalogs: 4  },
  { id: "alta-cocina-peru",      name: "Alta Cocina Perú",      rating: 4.9, category: "Comida Fusión",         cat: "comida",      logo: "AC", tag: "Chef Award", district: "Barranco",      image: "/hero.png", catalogs: 9  },
];

export default function ExplorarPage() {
  const [activeCat, setActiveCat] = useState("todos");
  const [search, setSearch] = useState("");

  const filtered = companies.filter((c) => {
    const matchCat = activeCat === "todos" || c.cat === activeCat;
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="h-[100dvh] w-full bg-[#00050f] text-white overflow-hidden flex flex-col relative">

      {/* Background decorations */}
      <div className="bg-dots" />
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-line-top" />
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />

      {/* ── NAV ── */}
      <nav className="relative z-50 flex-none flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.05]">
        <Link href="/" className="text-xl font-luxury gold-gradient font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold/40 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar empresa..."
              className="bg-white/[0.04] border border-white/[0.08] rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-gold/40 transition-all text-white placeholder-white/25 w-52"
            />
          </div>
          <UserNav />
        </div>
      </nav>

      {/* ── BODY: Sidebar + Grid ── */}
      <div className="relative z-10 flex flex-1 overflow-hidden">

        {/* SIDEBAR — filtros */}
        <aside className="hidden md:flex flex-col flex-none w-48 border-r border-white/[0.05] px-4 py-6 gap-1">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gold/40 mb-4 px-2">Categorías</p>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCat(cat.value)}
              className={`text-left px-3 py-2.5 rounded-lg text-xs tracking-wide transition-all duration-200 ${
                activeCat === cat.value
                  ? "bg-gold/15 border border-gold/30 text-gold font-semibold"
                  : "text-white/40 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {cat.label}
            </button>
          ))}

          <div className="mt-auto pt-6 border-t border-white/[0.05]">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 px-2">Empresas</p>
            <p className="text-2xl font-luxury text-gold px-2">{filtered.length}</p>
            <p className="text-[9px] text-white/20 px-2">encontradas</p>
          </div>
        </aside>

        {/* MAIN GRID */}
        <div className="flex-1 overflow-hidden flex flex-col px-5 py-5 gap-4">

          {/* Header line */}
          <div className="flex-none flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-gold/40 mb-1">Directorio de Catering</p>
              <h1 className="text-2xl font-luxury tracking-tight">
                Descubre la <span className="gold-shimmer italic">Excelencia</span>
              </h1>
            </div>
            {/* Mobile category pills */}
            <div className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCat(cat.value)}
                  className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeCat === cat.value ? "bg-gold text-black font-bold" : "glass-btn text-white/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid — auto-fill cards para llenar el espacio disponible */}
          {filtered.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-white/20">
              <p className="text-xl font-luxury">Sin resultados</p>
            </div>
          ) : (
            <div className="flex-1 grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gridAutoRows: "1fr", alignContent: "start" }}>
              {filtered.map((company) => (
                <Link key={company.id} href={`/empresa/${company.id}`} className="group block min-h-0">
                  <div className="h-full relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.07] group-hover:border-gold/40 transition-all duration-400 group-hover:shadow-[0_0_30px_rgba(255,195,0,0.1)] flex flex-col">

                    {/* Image */}
                    <div className="relative flex-1 overflow-hidden min-h-[90px]">
                      <Image src={company.image} alt={company.name} fill className="object-cover opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-600" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00050f] via-[#00050f]/20 to-transparent" />

                      {/* Tag */}
                      {company.tag && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-gold/30 bg-gold/10">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-gold">{company.tag}</span>
                        </div>
                      )}

                      {/* Rating */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                        <Star className="w-2.5 h-2.5 text-gold fill-gold" />
                        <span className="text-[10px] font-semibold">{company.rating}</span>
                      </div>

                      {/* Logo flotante */}
                      <div className="absolute -bottom-4 left-3 w-8 h-8 bg-[#00050f] rounded-full border border-gold/25 flex items-center justify-center z-10">
                        <span className="text-[9px] font-luxury text-gold">{company.logo}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="pt-5 pb-3 px-3">
                      <div className="flex items-center gap-1 mb-0.5">
                        <MapPin className="w-2 h-2 text-gold/30" />
                        <span className="text-[8px] text-white/25 uppercase tracking-wider">{company.district}</span>
                      </div>
                      <p className="text-[8px] uppercase tracking-[0.2em] text-gold/50 mb-0.5">{company.category}</p>
                      <h3 className="text-sm font-luxury text-white/85 group-hover:text-gold transition-colors leading-tight mb-1">{company.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] text-white/20">{company.catalogs} catálogos</span>
                        <ChevronRight className="w-3 h-3 text-gold/0 group-hover:text-gold/60 transition-all -translate-x-1 group-hover:translate-x-0" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
