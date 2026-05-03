import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 luxury-card border-none bg-[#001d3d]/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-luxury gold-gradient font-bold tracking-tighter">MULTIEVENTS</div>
          <div className="hidden md:flex space-x-10 text-xs uppercase tracking-[0.2em] text-white/70 font-medium">
            <a href="#proceso" className="hover:text-gold transition-colors">Proceso</a>
            <a href="#planes" className="hover:text-gold transition-colors">Precios</a>
            <a href="#contacto" className="hover:text-gold transition-colors">Contacto</a>
          </div>
          <button className="border border-gold/40 px-8 py-2 text-[10px] uppercase tracking-[0.2em] font-bold bg-gold/5 hover:bg-gold/10 transition-all text-gold">
            Ingresar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Luxury Event"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/20 to-background" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <h2 className="text-gold text-sm md:text-base font-luxury mb-6 tracking-[0.5em] uppercase opacity-80">
            El Portafolio Inteligente para Catering y Eventos
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-luxury mb-10 leading-[0.9] tracking-tighter">
            Digitaliza la <br /> <span className="gold-gradient italic px-4">Excelencia</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            Nuestra IA transforma tus documentos en experiencias interactivas de lujo. 
            Crea catálogos inteligentes en segundos.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <button className="bg-gold hover:bg-gold-dark text-black font-bold px-12 py-5 transition-all tracking-[0.2em] uppercase text-xs shadow-[0_0_30px_rgba(255,195,0,0.3)]">
              Empezar ahora
            </button>
            <button className="text-white font-bold tracking-[0.2em] uppercase text-xs border-b border-white/20 hover:border-gold transition-all pb-1">
              Ver Demo Interactiva
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold to-transparent" />
        </div>
      </section>

      {/* Magic Load Highlight */}
      <section id="proceso" className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="w-12 h-[1px] bg-gold" />
            <h3 className="text-4xl md:text-5xl font-luxury leading-tight">
              ¿Word a Web en <br /><span className="gold-gradient">3 segundos?</span>
            </h3>
            <p className="text-white/60 text-lg leading-relaxed">
              Olvídate de subir plato por plato o mueble por mueble. Nuestra tecnología <span className="text-gold">Magic Load</span> lee tus archivos actuales y construye tu portafolio automáticamente.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <div className="text-3xl font-luxury text-gold mb-2">95%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Menos trabajo manual</div>
              </div>
              <div>
                <div className="text-3xl font-luxury text-gold mb-2">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Diseño Responsivo</div>
              </div>
            </div>
          </div>
          <div className="luxury-card p-1 text-gold/20">
             <div className="bg-[#000814] p-12 text-center border border-gold/10">
                <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
                <p className="font-luxury text-gold text-sm tracking-widest mb-2">Procesando Documento...</p>
                <p className="text-white/30 text-xs">Analizando menú de gala 2026</p>
             </div>
          </div>
        </div>
      </section>

      {/* Soles Pricing Section */}
      <section id="planes" className="py-32 px-6 bg-[#000d1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-luxury mb-4 italic">Inversión en tu Marca</h3>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">Precios en Soles (PEN) vía Culqi</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Cortesía", price: "S/ 0", feat: ["20 Tokens de IA", "Perfil Básico", "Soporte Mail"] },
              { name: "Pack Evento", price: "S/ 25", feat: ["60 Tokens de IA", "Magic Load Ilimitado", "PDFs de Lujo", "WhatsApp Directo"], best: true },
              { name: "Multi Pack", price: "S/ 45", feat: ["150 Tokens de IA", "Destacado en Ciudad", "Análisis de Visitas"] },
            ].map((plan, i) => (
              <div key={i} className={`p-12 luxury-card flex flex-col ${plan.best ? 'border-gold/60 bg-gold/5' : ''}`}>
                <h4 className="font-luxury text-xl mb-8 opacity-80">{plan.name}</h4>
                <div className="text-5xl font-bold mb-10 tracking-tighter">{plan.price}</div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.feat.map((f, fi) => (
                    <li key={fi} className="text-xs text-white/60 flex items-center gap-3">
                      <div className="w-1 h-1 bg-gold rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`py-4 text-[10px] uppercase tracking-widest font-bold transition-all ${plan.best ? 'bg-gold text-black' : 'border border-white/20 hover:border-gold text-white'}`}>
                  Obtener Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <div className="font-luxury text-3xl gold-gradient mb-8 font-bold">MULTIEVENTS</div>
        <div className="flex justify-center gap-12 text-[10px] uppercase tracking-widest text-white/30 mb-12">
          <a href="#" className="hover:text-gold transition-all">Instagram</a>
          <a href="#" className="hover:text-gold transition-all">WhatsApp</a>
          <a href="#" className="hover:text-gold transition-all">Términos</a>
        </div>
        <p className="text-[10px] text-white/20 tracking-[0.5em] uppercase">
          &copy; 2026 MULTIEVENTS PERÚ - Desarrollado con Inteligencia Artificial
        </p>
      </footer>
    </main>
  );
}
