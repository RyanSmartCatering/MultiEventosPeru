import Image from "next/image";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

const companies = [
  {
    id: "ryan-smart-catering",
    name: "Ryan Smart Catering",
    rating: "5.0",
    category: "Gala & Corporativo",
    logo: "RS",
    tag: "Verificado",
    events: 12,
    image: "/hero.png"
  },
  {
    id: "elite-events",
    name: "Elite Events Perú",
    rating: "4.9",
    category: "Bodas de Lujo",
    logo: "EE",
    tag: "Premium",
    events: 8,
    image: "/hero.png"
  },
  {
    id: "gourmet-peru",
    name: "Gourmet Perú",
    rating: "4.8",
    category: "Comida Fusión",
    logo: "GP",
    tag: "Nuevo",
    events: 5,
    image: "/hero.png"
  },
  {
    id: "midnight-banquets",
    name: "Midnight Banquets",
    rating: "4.9",
    category: "Eventos Nocturnos",
    logo: "MB",
    events: 20,
    image: "/hero.png"
  },
  {
    id: "la-gala-catering",
    name: "La Gala Catering",
    rating: "4.7",
    category: "Quinceañeros & Sociales",
    logo: "LG",
    events: 15,
    image: "/hero.png"
  },
  {
    id: "sabores-andinos",
    name: "Sabores Andinos",
    rating: "4.8",
    category: "Comida Peruana Premium",
    logo: "SA",
    tag: "Artesanal",
    events: 9,
    image: "/hero.png"
  }
];

export default function ExplorarPage() {
  return (
    <main className="min-h-screen bg-background text-white pb-24 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="fixed top-0 left-0 w-[60vw] h-[40vh] bg-gold/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vh] bg-midnight/60 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Navigation ── */}
      <nav className="w-full z-50 p-6 md:p-10 flex justify-between items-center border-b border-white/[0.05] bg-[#000814]/80 backdrop-blur-xl sticky top-0">
        <Link href="/" className="text-xl md:text-2xl font-luxury gold-gradient font-bold tracking-tighter hover:opacity-80 transition-opacity">
          MULTIEVENTS
        </Link>
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-gold/60" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Explorar</span>
        </div>
      </nav>

      {/* ── Hero Header ── */}
      <div className="pt-20 px-6 max-w-7xl mx-auto">
        {/* Title block */}
        <div className="text-center mb-4 relative">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gold/60 mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-gold/40" />
            Empresas Verificadas
            <span className="w-8 h-[1px] bg-gold/40" />
          </p>
          <h1 className="text-5xl md:text-7xl font-luxury mb-6 tracking-tighter leading-[1.1]">
            Descubre la <span className="gold-shimmer italic">Excelencia</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed text-sm">
            Explora portafolios interactivos de las empresas de catering y eventos más destacadas del Perú.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-12 mb-20">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gold/40" />
          </div>
          <input
            type="text"
            placeholder="Buscar empresa, categoría o tipo de evento..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-full py-4 pl-14 pr-6 text-sm focus:outline-none focus:border-gold/40 focus:bg-white/[0.07] transition-all text-white placeholder-white/25 backdrop-blur-md"
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-20">
          {[["6+", "Empresas"], ["50+", "Catálogos"], ["500+", "Eventos"]].map(([num, label]) => (
            <div key={label} className="text-center border border-white/5 py-5 rounded-sm bg-white/[0.02]">
              <p className="text-3xl font-luxury gold-gradient">{num}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Company Grid ── */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Link key={company.id} href={`/empresa/${company.id}`} className="group block">
              <div className="luxury-card overflow-hidden rounded-sm bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500 border border-white/[0.06] hover:border-gold/30 hover:shadow-[0_0_40px_rgba(255,195,0,0.07)]">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-in-out sepia-[0.2]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/40 to-transparent" />

                  {/* Rating */}
                  <div className="absolute top-4 right-4 glass-btn px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <span className="text-gold text-xs">★</span>
                    <span className="text-xs font-semibold">{company.rating}</span>
                  </div>

                  {/* Tag */}
                  {company.tag && (
                    <div className="absolute top-4 left-4 bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold">{company.tag}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 relative">
                  {/* Logo circle */}
                  <div className="absolute -top-8 right-5 w-16 h-16 bg-[#000814] rounded-full border border-gold/20 flex items-center justify-center shadow-2xl">
                    <span className="text-base font-luxury text-gold">{company.logo}</span>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 mb-2">{company.category}</p>
                  <h3 className="text-2xl font-luxury text-white/90 group-hover:text-gold transition-colors duration-300 mb-3">
                    {company.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-white/25">{company.events} Catálogos disponibles</p>

                  <div className="mt-4 w-6 h-[1px] bg-gold/30 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
