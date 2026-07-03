import { memo } from "react";

import { Monaco } from "@monaco-editor/react";
import { Languages } from "lucide-react";
import type * as monaco from "monaco-editor";

import { cn } from "@/lib/utils";

import { LanguageSelection } from "./components/language-select";

type StatusBarCursorPosition = {
  readonly line: number;
  readonly column: number;
  readonly selected?: number;
};

interface StatusBarProps {
  monaco: Monaco | null;
  editor: monaco.editor.IStandaloneCodeEditor | null;
  readonly cursorPosition: StatusBarCursorPosition;
  className?: string;
}

const MemoizedLanguageLabel = memo(function MemoizedLanguagesIcon() {
  return (
    <span className="flex items-center gap-x-1">
      <Languages className="size-4" aria-hidden="true" />
      <span className="sr-only">Current language:</span>
      Language:
    </span>
  );
});

function formatCursorPosition({
  line,
  column,
  selected,
}: StatusBarCursorPosition): string {
  const basePosition = `Ln ${line}, Col ${column}`;
  return selected ? `${basePosition} (${selected} selected)` : basePosition;
}

const StatusBar = memo(function StatusBar({
  monaco,
  editor,
  cursorPosition,
  className,
}: StatusBarProps) {
  if (!monaco || !editor) return null;

  return (
    <section
      className={cn(
        `animate-fade-in h-6 w-full flex-shrink-0 bg-[#09090f]/90 border-t border-white/[0.08] flex items-center select-none`,
        className
      )}
      role="status"
      aria-label="Editor status bar"
    >
      <div
        className={`flex w-full items-center justify-end gap-x-4 px-4 text-[11px]
          text-slate-400 font-sans`}
      >
        <div className="flex items-center gap-x-2">
          <MemoizedLanguageLabel />
          <LanguageSelection
            monaco={monaco}
            editor={editor}
            className="hover:bg-white/5 hover:text-slate-200 transition-colors rounded px-1.5 py-0.5 text-slate-300 font-medium"
          />
        </div>
        <div className="h-3 w-px bg-white/[0.08]" />
        <div
          className="flex items-center font-mono text-slate-300"
          aria-live="polite"
          aria-atomic="true"
        >
          {formatCursorPosition(cursorPosition)}
        </div>
      </div>
    </section>
  );
});

StatusBar.displayName = "StatusBar";

export { StatusBar, type StatusBarCursorPosition };
