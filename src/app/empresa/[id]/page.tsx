"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Star, MapPin, Calendar, BookOpen, Phone, Globe, Camera, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const mockCompany = {
  id: "ryan-smart-catering",
  name: "Ryan Smart Catering",
  tagline: "La excelencia hecha experiencia.",
  description: "Especialistas en eventos de gala, corporativos de alto perfil y bodas de ensueño. Transformamos ingredientes premium en momentos que nunca se olvidan.",
  coverImage: "/hero.png",
  logo: "RS",
  rating: "5.0",
  reviews: 84,
  since: "2019",
  location: "Lima, Perú",
  district: "Miraflores",
  catalogs: [
    { id: "bodas-plata-sandra-del-pozo", title: "Bodas de Plata Sandra", image: "/hero.png", type: "Bodas",       items: 50, date: "Mar 2026" },
    { id: "boda-civil-vip",              title: "Boda Civil VIP",        image: "/hero.png", type: "Bodas",       items: 12, date: "Ene 2026" },
    { id: "quinceanero-oro",             title: "Quinceañero de Oro",    image: "/hero.png", type: "Sociales",    items: 10, date: "Dic 2025" },
    { id: "lunch-ejecutivo",             title: "Lunch Ejecutivo",       image: "/hero.png", type: "Corporativo", items: 6,  date: "Nov 2025" },
    { id: "gala-anual-2025",             title: "Gala Anual 2025",       image: "/hero.png", type: "Corporativo", items: 8,  date: "Oct 2025" },
    { id: "boda-campo-lima",             title: "Boda Campo Lima",       image: "/hero.png", type: "Bodas",       items: 15, date: "Sep 2025" },
  ],
};

const TYPE_COLORS: Record<string, string> = {
  Bodas:       "text-pink-300 border-pink-300/30 bg-pink-300/10",
  Sociales:    "text-purple-300 border-purple-300/30 bg-purple-300/10",
  Corporativo: "text-blue-300 border-blue-300/30 bg-blue-300/10",
};

export default function EmpresaPage() {
  const company = mockCompany;
  const [catalogStart, setCatalogStart] = useState(0);
  const [activeTab, setActiveTab] = useState("Todos");
  const tabs = ["Todos", "Bodas", "Corporativo", "Sociales"];
  
  const filteredCatalogs = company.catalogs.filter(c => activeTab === "Todos" || c.type === activeTab);
  
  const visible = 3; // cards visible a la vez en desktop
  const canPrev = catalogStart > 0;
  const canNext = catalogStart + visible < filteredCatalogs.length;

  // Resetea la paginacion cuando cambian los tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCatalogStart(0);
  };

  return (
    <main className="h-[100dvh] w-full bg-[#00050f] text-white overflow-hidden flex flex-col relative">

      {/* Background */}
      <div className="bg-dots" />
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-line-top" />
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />

      {/* ── NAV (fixed top) ── */}
      <nav className="relative z-50 flex-none flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/[0.05]">
        <Link href="/explorar" className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Explorar</span>
        </Link>
        <UserNav />
      </nav>

      {/* ── TWO-COLUMN BODY ── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* ════ LEFT COLUMN — hero + info ════ */}
        <div className="md:w-[42%] flex-none flex flex-col overflow-hidden">

          {/* Hero image — toma el 45% del alto en desktop */}
          <div className="relative flex-none" style={{ height: "clamp(180px, 40vh, 320px)" }}>
            <Image src={company.coverImage} alt={company.name} fill className="object-cover opacity-50" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00050f]/40 to-[#00050f]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#00050f]/60" />
          </div>

          {/* Identity — sobrepuesto sobre el hero */}
          <div className="relative flex-none px-8 -mt-16 pb-4">
            <div className="flex items-end gap-4 mb-4">
              {/* Logo */}
              <div className="w-16 h-16 rounded-2xl bg-[#00050f] border border-gold/25 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)] flex-shrink-0">
                <span className="text-xl font-luxury text-gold">{company.logo}</span>
              </div>
              {/* Stars + reviews */}
              <div className="pb-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                  ))}
                  <span className="text-[10px] text-white/30 ml-1">{company.rating} · {company.reviews} reseñas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gold/40" />
                  <span className="text-[10px] text-white/35 uppercase tracking-wider">{company.district}, {company.location}</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-luxury text-white/90 leading-tight mb-1">{company.name}</h1>
            <p className="text-white/35 italic text-sm mb-5">&ldquo;{company.tagline}&rdquo;</p>

            {/* Stats row */}
            <div className="flex gap-6 mb-5">
              {[
                ["Desde", company.since],
                ["Catálogos", String(company.catalogs.length)],
                ["Reseñas", String(company.reviews)],
              ].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[8px] uppercase tracking-[0.35em] text-white/25 mb-0.5">{label}</p>
                  <p className="text-lg font-luxury text-gold">{val}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <p className="text-xs text-white/40 leading-relaxed mb-5 max-w-sm">{company.description}</p>

            {/* Action buttons */}
            <div className="flex gap-3">
              {[Camera, Globe, Phone].map((Icon, i) => (
                <button key={i} className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300">
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block flex-none w-px bg-white/[0.05] my-6" />

        {/* ════ RIGHT COLUMN — catálogos ════ */}
        <div className="flex-1 flex flex-col px-6 md:px-8 py-6 overflow-hidden gap-5">

          {/* Header */}
          <div className="flex-none flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-gold" />
              <h2 className="text-xl md:text-2xl font-luxury gold-gradient tracking-wide">Nuestros Catálogos</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white/25 text-[9px] uppercase tracking-widest">
                <BookOpen className="w-3 h-3" />
                <span>{filteredCatalogs.length} catálogos</span>
              </div>
              {/* Nav arrows */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCatalogStart(s => Math.max(0, s - 1))}
                  disabled={!canPrev}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${canPrev ? "border-gold/30 text-gold hover:bg-gold/10" : "border-white/10 text-white/15 cursor-not-allowed"}`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCatalogStart(s => Math.min(filteredCatalogs.length - visible, s + 1))}
                  disabled={!canNext}
                  className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${canNext ? "border-gold/30 text-gold hover:bg-gold/10" : "border-white/10 text-white/15 cursor-not-allowed"}`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-1 overflow-x-auto pb-2 scrollbar-hide flex-none">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-[#D4AF37]/15 border border-[#D4AF37]/80 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.2)] font-bold" 
                    : "bg-transparent border border-white/10 text-white/40 hover:text-white hover:border-white/30"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Catalog cards — 3 columnas, altura fija para llenar el espacio */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-0">
            {filteredCatalogs.slice(catalogStart, catalogStart + visible * 2).map((catalog, idx) => (
              <Link key={catalog.id} href={`/evento/${catalog.id}`} className="group block min-h-0">
                <div className="h-full relative overflow-hidden rounded-xl border border-white/[0.07] group-hover:border-gold/40 transition-all duration-400 group-hover:shadow-[0_0_40px_rgba(255,195,0,0.1)] flex flex-col">

                  {/* Image */}
                  <div className="relative flex-1 overflow-hidden min-h-[100px]">
                    <Image
                      src={catalog.image}
                      alt={catalog.title}
                      fill
                      className="object-cover opacity-40 group-hover:opacity-65 group-hover:scale-105 transition-all duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00050f]/95 via-[#00050f]/30 to-transparent" />

                    {/* Corner ornaments */}
                    <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-gold/0 group-hover:border-gold/50 transition-all duration-400" />
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-gold/0 group-hover:border-gold/50 transition-all duration-400" />

                    {/* Type badge */}
                    <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full border text-[8px] uppercase tracking-[0.2em] ${TYPE_COLORS[catalog.type] || "text-gold border-gold/30 bg-gold/10"}`}>
                      {catalog.type}
                    </div>

                    {/* Number */}
                    <div className="absolute bottom-12 right-3 text-[52px] font-luxury text-white/[0.04] leading-none select-none">
                      {String(idx + 1 + catalogStart).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-none p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-luxury text-white/90 group-hover:text-gold transition-colors leading-tight">{catalog.title}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-2.5 h-2.5 text-gold/30" />
                        <span className="text-[8px] text-white/25">{catalog.date}</span>
                        <span className="text-[8px] text-white/15">·</span>
                        <span className="text-[8px] text-white/25">{catalog.items} secciones</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-all duration-300">
                        <span className="text-[9px] uppercase tracking-widest whitespace-nowrap font-bold">Explorar Catálogo</span>
                        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                    {/* Gold reveal line */}
                    <div className="mt-3 h-[1px] bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex-none flex justify-center gap-1.5">
            {Array.from({ length: Math.ceil(filteredCatalogs.length / visible) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCatalogStart(i * visible)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${Math.floor(catalogStart / visible) === i ? "bg-gold w-4" : "bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
