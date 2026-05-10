"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const LIMA_DISTRICTS = [
  "Todos","Miraflores","San Isidro","Surco","La Molina",
  "San Borja","Barranco","Jesús María","San Miguel","Pueblo Libre",
  "Lince","Magdalena","Chorrillos","Surquillo",
];

const companies = [
  { id:"ryan-smart-catering",  name:"Ryan Smart Catering",  rating:"5.0", category:"Gala & Corporativo",  logo:"RS", tag:"Verificado", district:"Miraflores", image:"/hero.png" },
  { id:"elite-events",         name:"Elite Events Perú",    rating:"4.9", category:"Bodas de Lujo",        logo:"EE", tag:"Premium",    district:"San Isidro",  image:"/hero.png" },
  { id:"gourmet-peru",         name:"Gourmet Perú",         rating:"4.8", category:"Comida Fusión",        logo:"GP", tag:"Nuevo",      district:"Surco",        image:"/hero.png" },
  { id:"midnight-banquets",    name:"Midnight Banquets",    rating:"4.9", category:"Eventos Nocturnos",    logo:"MB",                  district:"La Molina",    image:"/hero.png" },
  { id:"la-gala-catering",     name:"La Gala Catering",     rating:"4.7", category:"Quinceañeros",         logo:"LG",                  district:"San Borja",    image:"/hero.png" },
  { id:"sabores-andinos",      name:"Sabores Andinos",      rating:"4.8", category:"Comida Peruana",       logo:"SA", tag:"Artesanal",  district:"Barranco",     image:"/hero.png" },
  { id:"prestige-events",      name:"Prestige Events",      rating:"4.6", category:"Eventos Sociales",     logo:"PE",                  district:"Jesús María",  image:"/hero.png" },
  { id:"golden-banquet",       name:"Golden Banquet",       rating:"4.9", category:"Bodas & Gala",         logo:"GB", tag:"Top",        district:"San Miguel",   image:"/hero.png" },
];

export default function ExplorarPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Todos");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = companies.filter((c) => {
    const matchDistrict = selectedDistrict === "Todos" || c.district === selectedDistrict;
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());
    return matchDistrict && matchSearch;
  });

  return (
    /* h-full + overflow-hidden → sin scroll global; el grid interior tiene su propio scroll */
    <main className="h-full w-full bg-background text-white flex flex-col overflow-hidden relative">

      {/* ── Rich luxury background ── */}
      <div className="bg-dots" />
      <div className="bg-diag" />
      <div className="bg-vline-left" />
      <div className="bg-vline-right" />
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-orb-center" />
      <div className="bg-line-top" />
      <div className="bg-line-bottom" />
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />
      <div className="bg-diamond" style={{ top: "30%", left: "6%", animationDelay: "1s" }} />
      <div className="bg-diamond" style={{ top: "70%", right: "6%", animationDelay: "3s" }} />

      {/* ══════ NAV ══════ */}
      <nav className="relative z-50 flex-shrink-0 w-full px-6 md:px-10 py-5 flex justify-between items-center border-b border-white/[0.05] bg-[#000814]/80 backdrop-blur-2xl">
        <Link href="/" className="text-xl md:text-2xl font-luxury gold-gradient font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <UserNav />
      </nav>

      {/* ══════ HEADER ══════ */}
      <div className="relative z-10 flex-shrink-0 px-6 md:px-10 pt-8 pb-5">
        <div className="max-w-[1600px] mx-auto">
          <p className="text-[9px] uppercase tracking-[0.55em] text-gold/50 mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold/30" />
            Directorio de Catering
            <span className="w-8 h-[1px] bg-gold/30" />
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-luxury tracking-tighter leading-[1.05]">
              Descubre la{" "}
              <span className="gold-shimmer italic">Excelencia</span>
            </h1>
            <p className="text-white/30 font-light text-sm max-w-xs leading-relaxed hidden md:block">
              Los mejores catálogos de catering y eventos premium de Lima.
            </p>
          </div>

          {/* ── Search & filter bar ── */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/30 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar empresa o tipo de evento..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-3 pl-12 pr-5 text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all text-white placeholder-white/20"
                />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`glass-btn flex items-center gap-2 px-5 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${filterOpen ? "border-gold/50 text-gold bg-gold/10" : "text-white/50"}`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:block">Filtrar</span>
              </button>
            </div>

            {filterOpen && (
              <div className="overflow-x-auto scrollbar-hide pb-1">
                <div className="flex gap-2 w-max">
                  {LIMA_DISTRICTS.map((district) => (
                    <button
                      key={district}
                      onClick={() => setSelectedDistrict(district)}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                        selectedDistrict === district
                          ? "bg-gold text-black font-bold shadow-[0_0_20px_rgba(255,195,0,0.3)]"
                          : "glass-btn text-white/50 hover:text-gold"
                      }`}
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
              {filtered.length} empresa{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* ══════ GRID — el único bloque con scroll ══════ */}
      <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide px-6 md:px-10 pb-8">
        <div className="max-w-[1600px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-white/20">
              <p className="text-3xl font-luxury mb-3">Sin resultados</p>
              <p className="text-sm">Prueba con otro distrito o término de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((company) => (
                <Link key={company.id} href={`/empresa/${company.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm bg-white/[0.03] border border-white/[0.06] group-hover:border-gold/30 group-hover:bg-white/[0.05] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,195,0,0.07)]">
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image src={company.image} alt={company.name} fill className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 sepia-[0.2]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/30 to-transparent" />
                      <div className="absolute top-3 right-3 glass-btn px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="text-gold text-[10px]">★</span>
                        <span className="text-[10px] font-semibold">{company.rating}</span>
                      </div>
                      {company.tag && (
                        <div className="absolute top-3 left-3 border border-gold/25 bg-gold/10 px-2.5 py-1 rounded-full">
                          <span className="text-[8px] uppercase tracking-[0.2em] text-gold">{company.tag}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 relative">
                      {/* Floating logo */}
                      <div className="absolute -top-6 right-4 w-12 h-12 bg-[#000814] rounded-full border border-gold/20 flex items-center justify-center shadow-xl">
                        <span className="text-xs font-luxury text-gold">{company.logo}</span>
                      </div>

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <MapPin className="w-2.5 h-2.5 text-gold/40" />
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">{company.district}</span>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-gold/50 mb-1">{company.category}</p>
                      <h3 className="text-lg font-luxury text-white/85 group-hover:text-gold transition-colors duration-300 leading-tight">{company.name}</h3>
                      <div className="mt-3 w-5 h-[1px] bg-gold/25 group-hover:w-12 transition-all duration-500" />
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
