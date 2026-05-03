import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Camera, Globe, Phone } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

// Mock Data Temporal
const mockCompany = {
  id: "ryan-smart-catering",
  name: "Ryan Smart Catering",
  description: "Especialistas en eventos de gala, corporativos de alto perfil y bodas de ensueño. Transformamos ingredientes premium en experiencias inolvidables.",
  coverImage: "/hero.png",
  logo: "RS",
  catalogs: [
    { id: "gala-verano-2026", title: "Gala de Verano 2026", image: "/hero.png", type: "Corporativo" },
    { id: "boda-civil-vip", title: "Boda Civil VIP", image: "/hero.png", type: "Bodas" },
    { id: "quinceanero-oro", title: "Quinceañero de Oro", image: "/hero.png", type: "Sociales" }
  ]
};

export default async function EmpresaPage({ params }: Props) {
  const { id } = await params;
  
  // En el futuro: const company = await supabase.from('companies').select('*').eq('slug', id).single();
  const company = mockCompany;

  return (
    <main className="min-h-screen bg-background text-white pb-24">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
        <Link href="/explorar" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-gold transition-colors">
          <ChevronLeft className="w-4 h-4" /> Volver
        </Link>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={company.coverImage}
            alt={company.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/80 to-transparent" />
        </div>
        
        {/* Company Info */}
        <div className="absolute bottom-0 w-full px-6 md:px-12 translate-y-1/3 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[#000814] rounded-full border border-gold/30 flex items-center justify-center shadow-2xl relative overflow-hidden">
            <span className="text-4xl font-luxury text-gold">{company.logo}</span>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 to-transparent" />
          </div>
          <div className="mb-8 md:mb-4">
            <h1 className="text-4xl md:text-5xl font-luxury text-white/90 drop-shadow-xl">{company.name}</h1>
            <div className="flex gap-4 justify-center md:justify-start mt-4 text-white/50">
              <Camera className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
              <Globe className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
              <Phone className="w-5 h-5 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* About & Catalogs */}
      <div className="mt-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="w-12 h-[1px] bg-gold mb-6" />
          <p className="text-lg font-light text-white/60 leading-relaxed">
            {company.description}
          </p>
        </div>

        <h2 className="text-2xl font-luxury gold-gradient mb-8 tracking-wider">Nuestros Catálogos</h2>
        
        {/* Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.catalogs.map((catalog) => (
            <Link key={catalog.id} href={`/evento/${catalog.id}`} className="group">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/5 bg-white/5">
                <Image
                  src={catalog.image}
                  alt={catalog.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-[10px] text-gold uppercase tracking-[0.3em] mb-2 font-bold">{catalog.type}</div>
                  <h3 className="text-2xl font-luxury text-white group-hover:text-gold transition-colors">{catalog.title}</h3>
                  <div className="mt-4 w-8 h-[1px] bg-gold/50 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
