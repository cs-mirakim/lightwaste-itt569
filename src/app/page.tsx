import Link from "next/link";
import { Zap, ShieldCheck, UserCheck, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative border-b border-neutral-800/80 backdrop-blur-md bg-neutral-950/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-bold text-lg text-white">
            <span className="size-8 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
              <Zap className="size-5 fill-neutral-950" />
            </span>
            <span className="tracking-tight">LightWaste</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700/60 ml-1">
              IoT ITT569
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/user">
              <Button variant="ghost" size="sm" className="text-neutral-300 hover:text-white hover:bg-neutral-800/60">
                Portal Pengguna
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold shadow-md shadow-amber-500/20">
                Papan Pentadbir
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col items-center text-center justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 mb-6 backdrop-blur shadow-inner">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          Sistem Pengurusan Tenaga Pencahayaan Berbilang Zon Pintar
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
          Hentikan Pembaziran Tenaga Bilik Kuliah dengan <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">LightWaste</span>
        </h1>

        <p className="mt-4 text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed">
          Kawalan zon pencahayaan pintar secara berpusat untuk 4 bilik kuliah dan makmal. Disepadukan dengan perkakasan 4x Maker UNO, Gateway NodeMCU ESP8266, penderia LDR, dan pangkalan data awan Firebase.
        </p>

        {/* Dual CTA cards for Persona 1 (User) and Persona 2 (Admin) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-10 text-left">
          {/* Persona 1: User */}
          <Link
            href="/user"
            className="group relative bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between"
          >
            <div>
              <div className="size-11 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="size-6" />
              </div>
              <h2 className="text-xl font-bold text-white flex items-center justify-between">
                Portal Pengguna (User)
                <ArrowRight className="size-4 text-neutral-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Untuk pensyarah &amp; pelajar di dalam bilik. Pilih bilik kuliah khusus, fahami panduan penjimatan tenaga, dan kawal suis lampu zon bilik tersebut.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="size-3.5" /> Akses Pantas Melalui Telefon / Tablet
            </div>
          </Link>

          {/* Persona 2: Admin */}
          <Link
            href="/admin"
            className="group relative bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between"
          >
            <div>
              <div className="size-11 rounded-xl bg-amber-950/50 border border-amber-800/40 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-6" />
              </div>
              <h2 className="text-xl font-bold text-white flex items-center justify-between">
                Papan Pentadbir (Admin)
                <ArrowRight className="size-4 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Untuk penyelia bangunan &amp; pengurusan fasiliti. Paparan Bento Grid 4 bilik serentak, bacaan sensor LDR, analitik kuasa, serta kawalan override induk (Master Switch).
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-amber-400 font-medium">
              <CheckCircle2 className="size-3.5" /> Kawalan Pukal (Master All-OFF)
            </div>
          </Link>
        </div>

        {/* System Architecture Strip */}
        <div className="mt-14 w-full max-w-4xl bg-neutral-900/30 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3 flex items-center justify-center gap-2">
            <Layers className="size-4 text-neutral-400" /> Aliran Seni Bina Sistem ITT569
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs font-mono text-neutral-300">
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800/70 border border-neutral-700">4x Maker UNO (Bilik)</span>
            <span className="text-neutral-500">&larr;I2C / Serial&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800/70 border border-neutral-700">ESP8266 Gateway</span>
            <span className="text-neutral-500">&larr;Wi-Fi&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-neutral-800/70 border border-neutral-700">Firebase RTDB</span>
            <span className="text-neutral-500">&larr;&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/50">Next.js 15 UI</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-400">
        LightWaste &copy; 2026 &mdash; Projek Sistem Pengurusan Pencahayaan IoT Berasaskan ITT569.
      </footer>
    </div>
  );
}
