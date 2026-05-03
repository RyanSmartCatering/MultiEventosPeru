import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Calendar, MapPin, ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

// Mock Data Temporal
const mockEvent = {
  id: "gala-verano-2026",
  title: "Gala Anual de Verano 2026",
  date: "25 de Noviembre, 2026",
  location: "Hacienda Los Ficus",
  description: "Una experiencia culinaria exclusiva diseñada para deleitar sus sentidos con los mejores ingredientes de la temporada. Por Ryan Smart Catering.",
  coverImage: "/hero.png",
  sections: [
    {
      id: "recepcion",
      title: "Recepción",
      items: [
        { name: "Tartar de Atún Rojo", description: "Con palta brasa, alcaparras y emulsión de ají amarillo sobre crocante de tapioca.", image: "/hero.png", tag: "Fresco" },
        { name: "Cucharitas de Ceviche", description: "Pesca del día con leche de tigre al ají limo y maíz chulpi.", image: "/hero.png", tag: "Marino" },
        { name: "Mini Causas Limeñas", description: "Coronadas con pulpa de cangrejo y caviar de pez volador.", image: "/hero.png" }
      ]
    },
    {
      id: "plato-fondo",
      title: "Plato de Fondo",
      items: [
        { name: "Lomo Fino en Salsa de Hongos", description: "Acompañado de puré rústico trufado y espárragos bebé salteados en mantequilla de hierbas.", image: "/hero.png", tag: "Recomendado" },
        { name: "Salmón Glaseado al Miso", description: "Sobre cama de quinua negra y vegetales de estación al wok.", image: "/hero.png" }
      ]
    },
    {
      id: "mesa-dulces",
      title: "Mesa de Dulces",
      items: [
        { name: "Macarons Franceses", description: "Variedad de frambuesa, pistacho y chocolate bitter.", image: "/hero.png" },
        { name: "Shots de Suspiro a la Limeña", description: "Con merengue italiano al oporto y polvo de canela.", image: "/hero.png" }
      ]
    }
  ]
};

export default async function EventoPage({ params }: Props) {
  const { id } = await params;
  const event = mockEvent;

  return (
    <main className="min-h-screen bg-[#00040a] text-white font-sans py-12 md:py-24 px-4 flex justify-center items-center relative overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent pointer-events-none" />

      {/* The Book Container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row bg-[#000814] shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,195,0,0.1)] rounded-sm overflow-hidden z-10 border-x border-gold/20">
        
        {/* Book Fold Gradient (Center) - Only visible on desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Left Page (Cover / Info) */}
        <div className="w-full lg:w-1/2 relative min-h-[80vh] flex flex-col justify-between p-8 md:p-16 border-r border-gold/10">
          <div className="absolute inset-0 z-0">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover opacity-20 grayscale sepia-[0.3]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/50 via-[#000814]/80 to-[#000814]" />
          </div>

          <div className="relative z-10">
            <Link href={`/empresa/ryan-smart-catering`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/60 hover:text-gold transition-colors mb-16">
              <ChevronLeft className="w-4 h-4" /> Volver
            </Link>
            
            <div className="w-16 h-[1px] bg-gold mb-8" />
            <p className="text-gold text-xs uppercase tracking-[0.4em] mb-4">Menú Exclusivo</p>
            <h1 className="text-5xl md:text-7xl font-luxury mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl text-white/90">
              {event.title}
            </h1>
            
            <div className="flex flex-col gap-4 text-xs uppercase tracking-widest text-white/50 mb-12 font-light border-l border-gold/30 pl-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gold" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm font-light leading-relaxed text-white/50 italic">
            "{event.description}"
          </div>
        </div>

        {/* Right Page (The Menu) */}
        <div className="w-full lg:w-1/2 bg-[#000a18] p-8 md:p-16 relative overflow-y-auto max-h-[80vh] scrollbar-hide">
          <div className="space-y-24">
            {event.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <div className="text-center mb-12">
                  <span className="text-[10px] text-gold/50 uppercase tracking-[0.3em] font-bold">Capítulo</span>
                  <h2 className="text-3xl font-luxury text-gold mt-2">{section.title}</h2>
                  <div className="w-12 h-[1px] bg-gold/30 mx-auto mt-6" />
                </div>

                <div className="flex flex-col gap-10">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <div className="relative w-full sm:w-28 h-48 sm:h-28 flex-shrink-0 rounded-sm overflow-hidden border border-gold/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 sepia-[0.2]"
                        />
                      </div>
                      
                      <div className="flex flex-col py-1">
                        {item.tag && (
                          <span className="text-[8px] uppercase tracking-[0.2em] text-gold mb-2 border border-gold/20 px-2 py-0.5 rounded-sm w-max bg-gold/5">
                            {item.tag}
                          </span>
                        )}
                        <h3 className="text-xl font-luxury mb-2 text-white/90 group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-white/40 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-32 text-center pb-8 opacity-40">
            <div className="w-8 h-[1px] bg-white/30 mx-auto mb-4" />
            <p className="text-[10px] uppercase tracking-[0.3em]">Fin del Catálogo</p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-gold text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,195,0,0.3)] hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </main>
  );
}
