import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Camera, Globe, Phone, Star, Calendar } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

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
  catalogs: [
    { id: "gala-verano-2026", title: "Gala de Verano 2026", image: "/hero.png", type: "Corporativo", items: 8 },
    { id: "boda-civil-vip", title: "Boda Civil VIP", image: "/hero.png", type: "Bodas", items: 12 },
    { id: "quinceanero-oro", title: "Quinceañero de Oro", image: "/hero.png", type: "Sociales", items: 10 },
    { id: "lunch-ejecutivo", title: "Lunch Ejecutivo Premium", image: "/hero.png", type: "Corporativo", items: 6 }
  ]
};

export default async function EmpresaPage({ params }: Props) {
  await params;
  const company = mockCompany;

  return (
    <main className="min-h-screen bg-background text-white pb-24 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="fixed top-0 right-0 w-[50vw] h-[40vh] bg-gold/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[35vw] h-[35vh] bg-midnight/50 rounded-full blur-[130px] pointer-events-none" />

      {/* ── Back button (glassmorphism, floating) ── */}
      <Link
        href="/explorar"
        className="glass-btn absolute top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] text-white/60 hover:text-gold"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Volver
      </Link>

      {/* ── Hero Banner ── */}
      <div className="relative h-[65vh] w-full">
        <div className="absolute inset-0">
          <Image src={company.coverImage} alt={company.name} fill className="object-cover sepia-[0.15]" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/70 to-[#000814]/20" />
          {/* Horizontal gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>

        {/* Stars overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{ top: `${Math.random() * 70}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 + 0.1 }}
            />
          ))}
        </div>

        {/* Company info at bottom */}
        <div className="absolute bottom-0 w-full px-6 md:px-16 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left pb-0 translate-y-1/3">
          {/* Logo */}
          <div className="w-28 h-28 md:w-36 md:h-36 bg-[#000814] rounded-full border border-gold/30 flex items-center justify-center shadow-[0_0_60px_rgba(0,0,0,0.8)] relative flex-shrink-0">
            <span className="text-4xl md:text-5xl font-luxury text-gold">{company.logo}</span>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
              <span className="text-[8px] text-black font-bold">✓</span>
            </div>
          </div>

          {/* Name & tagline */}
          <div className="mb-4 md:mb-8">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-xs text-white/50">{company.rating} · {company.reviews} reseñas</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-luxury text-white/90">{company.name}</h1>
            <p className="text-white/40 italic text-sm mt-2">&ldquo;{company.tagline}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* ── Content below banner ── */}
      <div className="mt-32 md:mt-40 px-6 md:px-16 max-w-7xl mx-auto">
        {/* Quick stats + social */}
        <div className="flex flex-wrap gap-6 items-start justify-between mb-16">
          <div className="flex gap-8">
            {[["Desde", company.since], ["Ciudad", company.location], ["Catálogos", String(company.catalogs.length)]].map(([label, val]) => (
              <div key={label}>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 mb-1">{label}</p>
                <p className="text-lg font-luxury text-gold">{val}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {[Camera, Globe, Phone].map((Icon, i) => (
              <button key={i} className="glass-btn w-10 h-10 flex items-center justify-center rounded-full">
                <Icon className="w-4 h-4 text-white/50" />
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gold" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60">Sobre Nosotros</p>
          </div>
          <p className="text-lg font-light text-white/50 leading-relaxed">{company.description}</p>
        </div>

        {/* ── Catalog Grid ── */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-[1px] bg-gold" />
            <h2 className="text-3xl font-luxury gold-gradient tracking-wider">Nuestros Catálogos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {company.catalogs.map((catalog) => (
              <Link key={catalog.id} href={`/evento/${catalog.id}`} className="group">
                <div className="luxury-card overflow-hidden rounded-sm border border-white/[0.06] group-hover:border-gold/40 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={catalog.image} alt={catalog.title} fill
                      className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700 sepia-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Type badge */}
                    <div className="absolute top-3 left-3 glass-btn px-2.5 py-1 rounded-full">
                      <span className="text-[8px] uppercase tracking-[0.25em] text-gold">{catalog.type}</span>
                    </div>

                    {/* Items count */}
                    <div className="absolute top-3 right-3">
                      <span className="text-[8px] uppercase tracking-widest text-white/40">{catalog.items} platos</span>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 w-full p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg font-luxury text-white group-hover:text-gold transition-colors leading-tight">
                        {catalog.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gold">Ver Catálogo</span>
                        <span className="text-gold text-xs">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
