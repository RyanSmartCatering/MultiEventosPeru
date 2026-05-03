import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const companies = [
  { id: "ryan-smart-catering", name: "Ryan Smart Catering", rating: "5.0", category: "Gala & Corporativo", image: "/hero.png" },
  { id: "elite-events", name: "Elite Events", rating: "4.9", category: "Bodas de Lujo", image: "/hero.png" },
  { id: "gourmet-peru", name: "Gourmet Perú", rating: "4.8", category: "Comida Fusión", image: "/hero.png" },
  { id: "midnight-banquets", name: "Midnight Banquets", rating: "4.9", category: "Eventos Nocturnos", image: "/hero.png" }
];

export default function ExplorarPage() {
  return (
    <main className="min-h-screen bg-background text-white pb-24">
      {/* Navigation */}
      <nav className="w-full z-50 p-6 md:p-10 flex justify-between items-center border-b border-white/5 bg-[#000814]/80 backdrop-blur-md sticky top-0">
        <Link href="/" className="text-xl md:text-2xl font-luxury gold-gradient font-bold tracking-tighter">
          MULTIEVENTS
        </Link>
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <span className="text-gold">Explorar</span>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-luxury mb-6 tracking-tighter">
          Descubre la <span className="gold-gradient italic">Excelencia</span>
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Explora los catálogos interactivos de las empresas de catering y eventos más exclusivas.
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gold/50" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all text-white placeholder-white/30"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Link key={company.id} href={`/empresa/${company.id}`} className="group block">
              <div className="luxury-card border-none bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden rounded-xl">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={company.image}
                    alt={company.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/40 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 flex items-center gap-1">
                    <span className="text-gold text-xs">★</span>
                    <span className="text-xs font-bold">{company.rating}</span>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <div className="absolute -top-10 right-6 w-16 h-16 bg-background rounded-full border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                    <div className="text-xs font-luxury text-gold uppercase tracking-widest text-center leading-none">
                      {company.name.substring(0, 2)}
                    </div>
                  </div>
                  
                  <div className="text-[10px] uppercase tracking-widest text-gold mb-2">
                    {company.category}
                  </div>
                  <h3 className="text-2xl font-luxury text-white/90 group-hover:text-gold transition-colors">
                    {company.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
