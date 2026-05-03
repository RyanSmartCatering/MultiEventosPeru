import Image from "next/image";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-luxury gold-gradient font-bold tracking-tighter">
          MULTIEVENTS
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <button className="text-white font-medium text-xs md:text-sm tracking-[0.2em] uppercase hover:text-gold transition-colors">
            Iniciar Sesión
          </button>
          <button className="border border-gold/40 px-6 py-3 text-xs md:text-sm uppercase tracking-[0.2em] font-bold bg-gold/5 hover:bg-gold/20 transition-all text-gold backdrop-blur-sm">
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Luxury Event"
          fill
          className="object-cover opacity-60 scale-105 animate-pulse-slow"
          priority
        />
        {/* Advanced Gradients for Luxury Feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/80 via-[#000814]/40 to-[#000814]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000814]/50 to-[#000814]" />
      </div>

      {/* Central Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 mt-10">
        <div className="mb-6 flex items-center gap-4 opacity-80">
          <div className="w-12 h-[1px] bg-gold" />
          <h2 className="text-gold text-xs md:text-sm font-luxury tracking-[0.4em] uppercase">
            El Portafolio Inteligente
          </h2>
          <div className="w-12 h-[1px] bg-gold" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-luxury mb-8 leading-[1.1] tracking-tighter drop-shadow-2xl">
          Digitaliza la <br />
          <span className="gold-gradient italic pr-4">Excelencia</span>
        </h1>
        
        <p className="text-sm md:text-lg text-white/60 font-light max-w-xl mx-auto leading-relaxed mb-12">
          Transforma tus documentos en experiencias interactivas de lujo. 
          Bienvenido a la nueva era del catering y los eventos.
        </p>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative bg-gold text-black font-bold px-12 py-5 overflow-hidden transition-all tracking-[0.2em] uppercase text-xs shadow-[0_0_40px_rgba(255,195,0,0.2)] hover:shadow-[0_0_60px_rgba(255,195,0,0.4)]">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative">Comenzar mi Portafolio</span>
          </button>
          
          <button className="text-white/70 font-bold tracking-[0.2em] uppercase text-xs border-b border-white/20 hover:border-gold hover:text-white transition-all pb-1">
            Ver Demo Interactiva
          </button>
        </div>
      </div>

      {/* Decorative Bottom Elements */}
      <div className="absolute bottom-0 w-full p-8 flex justify-between items-end z-10 opacity-30 pointer-events-none text-[8px] md:text-[10px] tracking-[0.3em] text-white uppercase">
        <div>&copy; 2026 MULTIEVENTS</div>
        <div className="hidden md:block">Potenciado por IA</div>
        <div className="flex gap-4">
          <span>IG</span>
          <span>WA</span>
        </div>
      </div>
    </main>
  );
}
