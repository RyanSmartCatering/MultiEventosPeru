"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User as UserIcon, BookOpen, Settings, Sparkles } from "lucide-react";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabaseRef = useRef(createClient());
  const router = useRouter();

  useEffect(() => {
    const supabase = supabaseRef.current;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await supabaseRef.current.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (loading) return <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />;
  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Usuario";
  const email = user.email || "";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 glass-btn pl-2 pr-4 py-2 rounded-full hover:border-gold/40 transition-all"
      >
        {avatarUrl ? (
          <Image src={avatarUrl} alt={name} width={32} height={32} className="rounded-full ring-1 ring-gold/30" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-gold" />
          </div>
        )}
        <span className="text-xs text-white/60 hidden md:block max-w-[110px] truncate tracking-wide">{name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-60 bg-[#000c1e]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(255,195,0,0.08)] z-50 rounded-sm overflow-hidden">
          {/* User info header */}
          <div className="px-5 py-4 border-b border-white/[0.06] bg-gold/[0.03]">
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={name} width={40} height={40} className="rounded-full ring-1 ring-gold/30" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-gold" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-luxury text-white/90 truncate">{name}</p>
                <p className="text-[10px] text-white/30 truncate mt-0.5">{email}</p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            {[
              { icon: UserIcon, label: "Mi Perfil", action: () => setOpen(false) },
              { icon: BookOpen, label: "Mis Catálogos", action: () => setOpen(false) },
              { icon: Sparkles, label: "Crear Catálogo con IA", action: () => setOpen(false), gold: true },
              { icon: Settings, label: "Configuración", action: () => setOpen(false) },
            ].map(({ icon: Icon, label, action, gold }) => (
              <button
                key={label}
                onClick={action}
                className={`w-full flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-white/[0.04] ${gold ? "text-gold/70 hover:text-gold" : "text-white/50 hover:text-white/80"}`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>

          {/* Sign out */}
          <div className="border-t border-white/[0.06] py-2">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.05] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
