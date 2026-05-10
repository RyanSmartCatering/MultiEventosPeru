"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { UserNav } from "@/components/UserNav";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  /**
   * Si ya hay sesión activa → redirige directo al destino.
   * Si no → lanza el flujo de Google OAuth.
   */
  const handleCTA = async (destination: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push(destination);
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${destination}`,
      },
    });
  };

  return (
    <main className="relative h-full w-full overflow-hidden bg-background">

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
      <div className="bg-diamond" style={{ top: "24%", left: "8%" }} />
      <div className="bg-diamond" style={{ top: "68%", right: "7%", animationDelay: "2s" }} />

      {/* ── Hero background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Luxury Event"
          fill
          className="object-cover opacity-45 scale-105 animate-pulse-slow"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000814]/90 via-[#000814]/25 to-[#000814]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,_rgba(0,8,20,0.95)_0%,_transparent_100%)]" />
      </div>

      {/* ── Navigation — solo logo + UserNav (avatar si hay sesión) ── */}
      <nav className="absolute top-0 w-full z-50 px-6 md:px-10 py-6 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-luxury gold-gradient font-bold tracking-tighter select-none">
          MULTIEVENTS
        </div>
        {/* Muestra el avatar/dropdown solo cuando hay sesión activa */}
        <UserNav />
      </nav>

      {/* ── Central Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        {/* Ornamental subtitle */}
        <div className="mb-6 flex items-center gap-4 opacity-75">
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-gold/70" />
          <p className="text-gold text-[10px] md:text-xs font-luxury tracking-[0.45em] uppercase">
            El Portafolio Inteligente
          </p>
          <div className="w-14 h-[1px] bg-gradient-to-l from-transparent to-gold/70" />
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-luxury mb-8 leading-[1.08] tracking-tighter drop-shadow-2xl">
          Digitaliza la <br />
          <span className="gold-shimmer italic pr-4">Excelencia</span>
        </h1>

        {/* Tagline */}
        <p className="text-sm md:text-base text-white/50 font-light max-w-lg mx-auto leading-relaxed mb-12">
          Transforma tus documentos en experiencias interactivas de lujo.
          Bienvenido a la nueva era del catering y los eventos.
        </p>

        {/* ── Two-path CTA ── */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-xl mx-auto">

          {/* Explorar catálogos */}
          <button
            onClick={() => handleCTA("/explorar")}
            className="group relative w-full sm:w-1/2 border border-white/20 hover:border-gold/60 bg-[#000814]/60 backdrop-blur-md text-white font-bold px-8 py-5 overflow-hidden transition-all duration-300 tracking-[0.15em] uppercase text-sm"
          >
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold/0 group-hover:bg-gold/50 transition-all duration-300" />
            <span className="relative tracking-[0.2em]">Explorar Catálogos</span>
          </button>

          {/* Crear portafolio */}
          <button
            onClick={() => handleCTA("/empresa/mi-empresa")}
            className="group relative w-full sm:w-1/2 bg-gold text-black font-bold px-8 py-5 overflow-hidden transition-all duration-300 tracking-[0.15em] uppercase text-sm shadow-[0_0_35px_rgba(255,195,0,0.22)] hover:shadow-[0_0_55px_rgba(255,195,0,0.45)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative tracking-[0.2em]">Crear mi Portafolio</span>
          </button>
        </div>

        {/* Note */}
        <p className="mt-7 text-[10px] text-white/30 uppercase tracking-[0.25em]">
          * Requiere iniciar sesión con Google para continuar
        </p>

        {/* Ornamental diamond row */}
        <div className="mt-12 flex items-center gap-3 opacity-25">
          <div className="w-1 h-1 bg-gold rotate-45" />
          <div className="w-10 h-[1px] bg-gold/60" />
          <div className="w-1.5 h-1.5 bg-gold rotate-45" />
          <div className="w-10 h-[1px] bg-gold/60" />
          <div className="w-1 h-1 bg-gold rotate-45" />
        </div>
      </div>

      {/* ── Decorative footer info ── */}
      <div className="absolute bottom-0 w-full px-8 py-5 flex justify-between items-end z-10 pointer-events-none">
        <span className="text-[9px] text-white/20 uppercase tracking-[0.3em]">© 2026 MultiEvents</span>
        <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] hidden md:block">Potenciado por IA</span>
        <div className="flex gap-4 text-[9px] text-white/20 uppercase tracking-[0.3em]">
          <span>IG</span><span>WA</span>
        </div>
      </div>
    </main>
  );
}
