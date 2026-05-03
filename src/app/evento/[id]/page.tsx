import Image from "next/image";
import { MessageCircle, Calendar, MapPin, ChevronRight } from "lucide-react";

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
  
  // En el futuro, aquí haremos: const event = await supabase.from('events').select('*').eq('slug', id).single();
  const event = mockEvent;

  return (
    <main className="min-h-screen bg-[#000814] text-white font-sans pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000814] via-[#000814]/60 to-transparent" />
        </div>
        
        {/* Event Info Overlay */}
        <div className="absolute bottom-0 w-full p-6 pb-10">
          <div className="w-12 h-[1px] bg-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-luxury mb-4 drop-shadow-xl tracking-tight">
            {event.title}
          </h1>
          
          <div className="flex flex-col gap-2 text-xs uppercase tracking-widest text-white/70 mb-4 font-light">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-gold" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-gold" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <p className="text-sm font-light leading-relaxed text-white/80 max-w-xl">
            {event.description}
          </p>
        </div>
      </div>

      {/* Sticky Categories Navigation */}
      <div className="sticky top-0 z-40 bg-[#000814]/90 backdrop-blur-md border-b border-white/5 w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 px-6 py-4 w-max">
          {event.sections.map((section, idx) => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors ${idx === 0 ? 'text-gold' : 'text-white/50 hover:text-white'}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="px-6 mt-8 max-w-3xl mx-auto space-y-24">
        {event.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-luxury text-gold">{section.title}</h2>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-gold/50 to-transparent" />
            </div>

            <div className="flex flex-col gap-6">
              {section.items.map((item, idx) => (
                <div key={idx} className="luxury-card group flex gap-4 p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg overflow-hidden border border-white/5 hover:border-gold/30">
                  {/* Item Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex flex-col justify-center py-1">
                    {item.tag && (
                      <span className="text-[9px] uppercase tracking-widest text-gold mb-1 border border-gold/30 px-2 py-0.5 rounded-full w-max">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="text-lg font-luxury mb-1 text-white/90 group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-2 md:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      
      {/* End Signature */}
      <div className="mt-24 text-center pb-8 opacity-40">
        <div className="w-8 h-[1px] bg-white/30 mx-auto mb-4" />
        <p className="text-[10px] uppercase tracking-widest">Experiencia Digitalizada por</p>
        <p className="text-xs font-luxury text-gold mt-1">MultiEvents AI</p>
      </div>
    </main>
  );
}
