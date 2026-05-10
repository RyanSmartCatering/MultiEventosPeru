"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const LIMA_DISTRICTS = [
  "Todos","Miraflores","San Isidro","Surco","La Molina",
  "San Borja","Barranco","Jesús María","San Miguel","Pueblo Libre",
  "Lince","Magdalena","Chorrillos","Surquillo"
];

const companies = [
  { id:"ryan-smart-catering", name:"Ryan Smart Catering", rating:"5.0", category:"Gala & Corporativo", logo:"RS", tag:"Verificado", district:"Miraflores", image:"/hero.png" },
  { id:"elite-events", name:"Elite Events Perú", rating:"4.9", category:"Bodas de Lujo", logo:"EE", tag:"Premium", district:"San Isidro", image:"/hero.png" },
  { id:"gourmet-peru", name:"Gourmet Perú", rating:"4.8", category:"Comida Fusión", logo:"GP", tag:"Nuevo", district:"Surco", image:"/hero.png" },
  { id:"midnight-banquets", name:"Midnight Banquets", rating:"4.9", category:"Eventos Nocturnos", logo:"MB", district:"La Molina", image:"/hero.png" },
  { id:"la-gala-catering", name:"La Gala Catering", rating:"4.7", category:"Quinceañeros", logo:"LG", district:"San Borja", image:"/hero.png" },
  { id:"sabores-andinos", name:"Sabores Andinos", rating:"4.8", category:"Comida Peruana", logo:"SA", tag:"Artesanal", district:"Barranco", image:"/hero.png" },
  { id:"prestige-events", name:"Prestige Events", rating:"4.6", category:"Eventos Sociales", logo:"PE", district:"Jesús María", image:"/hero.png" },
  { id:"golden-banquet", name:"Golden Banquet", rating:"4.9", category:"Bodas & Gala", logo:"GB", tag:"Top", district:"San Miguel", image:"/hero.png" },
];

export default function ExplorarPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("Todos");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = companies.filter((c) => {
    const matchDistrict = selectedDistrict === "Todos" || c.district === selectedDistrict;
    const matchSearch = !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());
    return matchDistrict && matchSearch;
  });

  return (
    <main className="min-h-screen bg-background text-white pb-24 relative overflow-hidden">
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

      <nav className="w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center border-b border-white/[0.04] bg-[#000814]/85 backdrop-blur-xl sticky top-0">
        <Link href="/" className="text-xl md:text-2xl font-luxury gold-gradient font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <UserNav />
      </nav>

      <div className="pt-16 pb-12 px-6 md:px-10 max-w-[1600px] mx-auto">
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold/50 mb-5 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold/30" />Directorio de Catering<span className="w-8 h-[1px] bg-gold/30" />
          </p>
          <h1 className="text-5xl md:text-7xl font-luxury tracking-tighter leading-[1.05] mb-5">
            Descubre la <br className="hidden md:block" />
            <span className="gold-shimmer italic">Excelencia</span>
          </h1>
          <p className="text-white/35 font-light text-sm max-w-lg leading-relaxed">
            Portafolios interactivos de las mejores empresas de catering y eventos en Lima.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/30 pointer-events-none" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar empresa o tipo de evento..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-3.5 pl-12 pr-5 text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all text-white placeholder-white/20"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`glass-btn flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.2em] ${filterOpen ? "border-gold/50 text-gold" : "text-white/50"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Filtrar</span>
            </button>
          </div>

          {filterOpen && (
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <div className="flex gap-2 w-max">
                {LIMA_DISTRICTS.map((district) => (
                  <button key={district} onClick={() => setSelectedDistrict(district)}
                    className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                      selectedDistrict === district ? "bg-gold text-black font-bold shadow-[0_0_20px_rgba(255,195,0,0.3)]" : "glass-btn text-white/50 hover:text-gold"
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            {filtered.length} empresa{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="px-6 md:px-10 max-w-[1600px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-32 text-white/20">
            <p className="text-2xl font-luxury mb-3">Sin resultados</p>
            <p className="text-sm">Prueba con otro distrito o término de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((company) => (
              <Link key={company.id} href={`/empresa/${company.id}`} className="group block">
                <div className="relative overflow-hidden rounded-sm bg-white/[0.03] border border-white/[0.06] group-hover:border-gold/30 group-hover:bg-white/[0.06] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,195,0,0.06)]">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={company.image} alt={company.name} fill className="object-cover opacity-45 group-hover:opacity-65 group-hover:scale-110 transition-all duration-700 sepia-[0.15]" />
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
                  <div className="p-5 relative">
                    <div className="absolute -top-7 right-4 w-14 h-14 bg-[#000814] rounded-full border border-gold/20 flex items-center justify-center shadow-xl">
                      <span className="text-sm font-luxury text-gold">{company.logo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <MapPin className="w-2.5 h-2.5 text-gold/40" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/30">{company.district}</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-gold/50 mb-1.5">{company.category}</p>
                    <h3 className="text-xl font-luxury text-white/85 group-hover:text-gold transition-colors duration-300 leading-tight">{company.name}</h3>
                    <div className="mt-4 w-5 h-[1px] bg-gold/25 group-hover:w-14 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
