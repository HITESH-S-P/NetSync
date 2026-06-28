import { Suspense } from "react";
import {
  Code2,
  Terminal,
  Video,
  LayoutTemplate,
  NotebookPen,
  GitPullRequestCreateArrow,
  Sparkles,
  Zap,
  Users,
} from "lucide-react";

import { RoomAccessForm } from "@/components/room-access-form";

interface PageProps {
  searchParams: Promise<{ room: string }>;
}

const features = [
  {
    icon: <Code2 className="size-5" />,
    title: "Real-time Collaboration",
    description: "Code together with live cursors, highlighting, and follow mode",
  },
  {
    icon: <Terminal className="size-5" />,
    title: "Shared Terminal",
    description: "Execute code and share results with 80+ supported languages",
  },
  {
    icon: <LayoutTemplate className="size-5" />,
    title: "Live Preview",
    description: "Preview UI changes instantly with Tailwind CSS and more",
  },
  {
    icon: <Video className="size-5" />,
    title: "Video & Voice Chat",
    description: "Communicate with your team using built-in video and voice",
  },
  {
    icon: <NotebookPen className="size-5" />,
    title: "Shared Notepad",
    description: "Take notes together with rich text and markdown support",
  },
  {
    icon: <GitPullRequestCreateArrow className="size-5" />,
    title: "GitHub Integration",
    description: "Open and save files directly from your GitHub repositories",
  },
];

const highlights = [
  {
    icon: <Zap className="size-5 text-amber-400" />,
    label: "Lightning Fast",
    desc: "Sub-50ms sync latency",
  },
  {
    icon: <Users className="size-5 text-cyan-400" />,
    label: "Multi-User",
    desc: "Unlimited collaborators",
  },
  {
    icon: <Sparkles className="size-5 text-violet-400" />,
    label: "AI Powered",
    desc: "Smart code assistance",
  },
];

export default async function Page({ searchParams }: PageProps) {
  const roomId = (await searchParams).room;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#08080f] dark">
      {/* ─── Ambient Gradient Orbs ─── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
      </div>

      {/* ─── Dot Grid Background ─── */}
      <div
        className="pointer-events-none fixed inset-0 dot-grid-bg opacity-60"
        aria-hidden="true"
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">

        {/* ─── Hero Section ─── */}
        <section className="flex w-full flex-col items-center pt-16 sm:pt-24 lg:pt-32">

          {/* Badge */}
          <div className="animate-slide-up mb-8 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-white/60 backdrop-blur-sm">
            <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open-source collaborative code editor
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up delay-100 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
              style={{ animationFillMode: 'both' }}>
            <span className="block">Code Together.</span>
            <span className="block text-gradient-brand">Ship Faster.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up delay-200 mt-6 max-w-2xl text-center text-lg text-white/50 sm:text-xl"
             style={{ animationFillMode: 'both' }}>
            Real-time collaborative code editor with live preview, shared terminal,
            and video chat — everything your team needs in one place.
          </p>

          {/* Quick Stats */}
          <div className="animate-slide-up delay-300 mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
               style={{ animationFillMode: 'both' }}>
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-2.5 text-sm">
                {h.icon}
                <div>
                  <p className="font-medium text-white/90">{h.label}</p>
                  <p className="text-white/40">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Form Section ─── */}
        <section className="animate-slide-up delay-400 mt-12 w-full max-w-lg sm:mt-16"
                 style={{ animationFillMode: 'both' }}>
          <div className="glass-card glow-border p-6 sm:p-8">
            <Suspense fallback={null}>
              <RoomAccessForm roomId={roomId} />
            </Suspense>
          </div>
        </section>

        {/* ─── Features Grid ─── */}
        <section className="animate-slide-up delay-500 mt-20 w-full max-w-5xl pb-20 sm:mt-28"
                 style={{ animationFillMode: 'both' }}>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Everything you need to collaborate
            </h2>
            <p className="mt-3 text-white/40">
              Powerful features built for modern development teams
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card-hover group p-5"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
                  {feature.icon}
                </div>
                <h3 className="mb-1.5 font-semibold text-white/90">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="w-full border-t border-white/[0.06] py-6 text-center text-sm text-white/30">
          <p>Built by Hitesh S P · RVsync</p>
        </footer>
      </div>
    </main>
  );
}
