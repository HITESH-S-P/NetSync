"use client";

import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08080f] px-4 dark text-white">
      {/* ─── Ambient Glow Orbs ─── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.08] blur-[100px]" />
      </div>

      {/* ─── Dot Grid Background ─── */}
      <div className="pointer-events-none fixed inset-0 dot-grid-bg opacity-50" aria-hidden="true" />

      {/* ─── Card Content ─── */}
      <div className="relative z-10 w-full max-w-md glass-card glow-border p-8 text-center animate-slide-up">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
          <Compass className="size-8" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-white/90 mb-3">Page Not Found</h2>
        
        <p className="text-sm leading-relaxed text-white/45 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to the safety of the homepage.
        </p>

        <Button asChild className="btn-gradient w-full py-6 flex items-center justify-center gap-2 border-0">
          <Link href="/">
            <Home className="size-4" />
            <span>Return Home</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
