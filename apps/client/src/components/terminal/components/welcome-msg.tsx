import Image from "next/image";

import { SITE_NAME } from "@/lib/constants";

const WelcomeMsg = () => (
  <div className="mb-3 font-sans text-xs select-none">
    <div className="flex items-center gap-x-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-3 py-2 w-fit">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-emerald-400 font-medium font-mono">Console System Active</span>
      <span className="text-slate-500">|</span>
      <span className="text-slate-400">Ready to execute code...</span>
    </div>
    <div className="mt-4 pl-1 text-[11px] font-bold text-slate-500 tracking-wider uppercase">Execution Logs</div>
  </div>
);

export { WelcomeMsg };
