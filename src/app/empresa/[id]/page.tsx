"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, Globe, Phone, Star, BookOpen, ArrowLeft, Calendar } from "lucide-react";
import { UserNav } from "@/components/UserNav";

const mockCompany = {
  id: "ryan-smart-catering",
  name: "Ryan Smart Catering",
  tagline: "La excelencia hecha experiencia.",
  description:
    "Especialistas en eventos de gala, corporativos de alto perfil y bodas de ensueño. Transformamos ingredientes premium en momentos que nunca se olvidan.",
  coverImage: "/hero.png",
  logo: "RS",
  rating: "5.0",
  reviews: 84,
  since: "2019",
  location: "Lima, Perú",
  catalogs: [
    { id: "gala-verano-2026",   title: "Gala de Verano 2026",       image: "/hero.png", type: "Corporativo", items: 8  },
    { id: "boda-civil-vip",     title: "Boda Civil VIP",            image: "/hero.png", type: "Bodas",       items: 12 },
    { id: "quinceanero-oro",    title: "Quinceañero de Oro",        image: "/hero.png", type: "Sociales",    items: 10 },
    { id: "lunch-ejecutivo",    title: "Lunch Ejecutivo Premium",   image: "/hero.png", type: "Corporativo", items: 6  },
  ],
};

export default function EmpresaPage() {
  const company = mockCompany;

  return (
    <main className="h-full w-full bg-background text-white flex flex-col overflow-hidden relative">

      {/* ── Background decorations ── */}
      <div className="bg-dots" />
      <div className="bg-diag" />
      <div className="bg-vline-left" />
      <div className="bg-vline-right" />
      <div className="bg-orb-tl" />
      <div className="bg-orb-br" />
      <div className="bg-line-top" />
      <div className="bg-line-bottom" />
      <div className="bg-corner-tl" />
      <div className="bg-corner-tr" />

      {/* ════════════════════════════════
          NAV — completamente transparente,
          posicionado absolute sobre el hero
         ════════════════════════════════ */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex justify-between items-center">
        <Link
          href="/explorar"
          className="flex items-center gap-2 text-white/50 hover:text-gold transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Explorar</span>
        </Link>
        <UserNav />
      </nav>

      {/* ══════════════════════════
          Scrollable content wrapper
         ══════════════════════════ */}
      <div className="relative flex-1 overflow-y-auto scrollbar-hide">

        {/* ── Hero Banner — full width, overlapped by nav ── */}
        <div className="relative h-[70vh] w-full flex-shrink-0">
          <Image
            src={company.coverImage}
            alt={company.name}
            fill
            className="object-cover sepia-[0.15]"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/60 to-[#000814]/10" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-gold/30"
                style={{
                  top: `${15 + Math.sin(i * 1.3) * 55}%`,
                  left: `${(i * 5.5) % 100}%`,
                  opacity: 0.1 + (i % 5) * 0.05,
                }}
              />
            ))}
          </div>

          {/* Company identity — bottom of hero */}
          <div className="absolute bottom-0 w-full px-6 md:px-16 pb-0 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left translate-y-[40%]">
            {/* Logo circle */}
            <div className="w-28 h-28 md:w-36 md:h-36 bg-[#000814] rounded-full border border-gold/30 flex items-center justify-center shadow-[0_0_80px_rgba(0,0,0,0.9),_0_0_30px_rgba(255,195,0,0.08)] relative flex-shrink-0">
              <span className="text-4xl md:text-5xl font-luxury text-gold">{company.logo}</span>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[8px] text-black font-bold">✓</span>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4 md:mb-8">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                ))}
                <span className="text-xs text-white/40 ml-1">{company.rating} · {company.reviews} reseñas</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-luxury text-white/90 leading-tight">{company.name}</h1>
              <p className="text-white/35 italic text-sm mt-2">"{company.tagline}"</p>
            </div>
          </div>
        </div>

        {/* ── Content below hero ── */}
        <div className="mt-28 md:mt-40 px-6 md:px-16 max-w-7xl mx-auto pb-20">

          {/* Quick stats + social icons */}
          <div className="flex flex-wrap gap-8 items-start justify-between mb-14">
            <div className="flex gap-10">
              {[["Desde", company.since], ["Ciudad", company.location], ["Catálogos", String(company.catalogs.length)]].map(([label, val]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-white/25 mb-1">{label}</p>
                  <p className="text-xl font-luxury text-gold">{val}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {[Camera, Globe, Phone].map((Icon, i) => (
                <button key={i} className="glass-btn w-10 h-10 flex items-center justify-center rounded-full hover:border-gold/40 transition-all">
                  <Icon className="w-4 h-4 text-white/40" />
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-[1px] bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold/50">Sobre Nosotros</p>
            </div>
            <p className="text-base md:text-lg font-light text-white/45 leading-relaxed">{company.description}</p>
          </div>

          {/* ════════════════════════════════
              CATALOG GRID — el corazón de la página
             ════════════════════════════════ */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[1px] bg-gold" />
                <h2 className="text-3xl md:text-4xl font-luxury gold-gradient tracking-wider">
                  Nuestros Catálogos
                </h2>
              </div>
              <div className="flex items-center gap-2 text-white/25 text-[10px] uppercase tracking-[0.3em]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{company.catalogs.length} catálogos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {company.catalogs.map((catalog, idx) => (
                <Link key={catalog.id} href={`/evento/${catalog.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm border border-white/[0.07] group-hover:border-gold/35 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(255,195,0,0.08)]">

                    {/* Portrait image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.03]">
                      <Image
                        src={catalog.image}
                        alt={catalog.title}
                        fill
                        className="object-cover opacity-45 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 sepia-[0.2]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000814]/95 via-[#000814]/40 to-transparent" />

                      {/* Gold corner ornaments on hover */}
                      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/0 group-hover:border-gold/50 transition-all duration-500" />
                      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/0 group-hover:border-gold/50 transition-all duration-500" />

                      {/* Type badge */}
                      <div className="absolute top-4 left-4 glass-btn px-2.5 py-1 rounded-full">
                        <span className="text-[8px] uppercase tracking-[0.25em] text-gold">{catalog.type}</span>
                      </div>

                      {/* Items count */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 text-white/30">
                          <Calendar className="w-2.5 h-2.5" />
                          <span className="text-[8px] uppercase tracking-widest">{catalog.items} platos</span>
                        </div>
                      </div>

                      {/* Chapter number */}
                      <div className="absolute bottom-16 left-4 text-[48px] font-luxury text-white/[0.04] leading-none select-none pointer-events-none">
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      {/* Info bottom */}
                      <div className="absolute bottom-0 w-full p-4">
                        <h3 className="text-lg font-luxury text-white/90 group-hover:text-gold transition-colors duration-300 leading-tight mb-2">
                          {catalog.title}
                        </h3>
                        <div className="flex items-center gap-2 overflow-hidden h-4">
                          <div className="w-0 group-hover:w-full h-[1px] bg-gold/40 transition-all duration-700" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gold/0 group-hover:text-gold/80 transition-all duration-300 whitespace-nowrap">
                            Ver catálogo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
