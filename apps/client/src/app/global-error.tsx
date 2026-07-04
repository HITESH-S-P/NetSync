"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { AlertOctagon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#08080f] px-4 text-white">
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

          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">Critical Application Error</h1>
          <p className="text-sm leading-relaxed text-white/45 mb-6">
            A critical system error occurred. We have logged this error and are looking into it.
            {error.digest && (
              <span className="block mt-2 font-mono text-xs text-white/30">
                Error ID: {error.digest}
              </span>
            )}
          </p>

          <Button
            onClick={() => reset()}
            className="btn-gradient w-full py-6 flex items-center justify-center gap-2 border-0"
          >
            <RefreshCcw className="size-4" />
            <span>Reload Application</span>
          </Button>
        </div>
      </body>
    </html>
  );
}
