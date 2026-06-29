"use client";

import Link from "next/link";
import { AlertOctagon, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08080f] px-4 dark text-white">
      {/* ─── Ambient Glow Orbs ─── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-rose-950/[0.12] blur-[120px]" />
      </div>

      {/* ─── Dot Grid Background ─── */}
      <div className="pointer-events-none fixed inset-0 dot-grid-bg opacity-50" aria-hidden="true" />

      {/* ─── Card Content ─── */}
      <div className="relative z-10 w-full max-w-lg glass-card glow-border p-8 text-center animate-slide-up">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <AlertOctagon className="size-8" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">Something went wrong</h1>
        
        <p className="text-sm leading-relaxed text-white/45 mb-6 max-h-48 overflow-y-auto bg-black/40 border border-white/5 rounded-lg p-3 text-left font-mono">
          {error.message || "An unexpected error occurred. Please try again later."}
          {error.digest && (
            <span className="block mt-2 text-xs text-white/30">
              Error ID: {error.digest}
            </span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => reset()} className="btn-ghost-brand flex-1 py-6 flex items-center justify-center gap-2 border-white/10">
            <RefreshCcw className="size-4" />
            <span>Try Again</span>
          </Button>
          
          <Button asChild className="btn-gradient flex-1 py-6 flex items-center justify-center gap-2 border-0">
            <Link href="/">
              <Home className="size-4" />
              <span>Return Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
