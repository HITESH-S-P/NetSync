import { useRef, useState } from "react";
import { Play, OctagonX, Sparkles } from "lucide-react";
import ReactDOM from "react-dom";

import { Button } from "@/components/ui/button";

import { cancelExecution, executeCode, fakeExecuteCode } from "./utils";

interface RunButtonProps {
  monaco: any;
  editor: any;
  setOutput: React.Dispatch<React.SetStateAction<any[]>>;
  className?: string;
}

const RunButton = ({
  monaco,
  editor,
  setOutput,
  className,
}: RunButtonProps) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [args, setArgs] = useState<string[]>([]);
  const [stdin, setStdin] = useState("");
  const [feedbackText, setFeedbackText] = useState<string | null>(null);

  const handleClick = () => {
    if (isRunning) {
      cancelExecution(abortControllerRef, setIsRunning, setOutput);
    } else {
      executeCode(
        monaco,
        editor,
        setOutput,
        setIsRunning,
        abortControllerRef,
        args,
        stdin
      );
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button
          className="h-8 px-3 rounded-md bg-white/[0.04] border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-violet-300 font-sans text-xs font-semibold shadow-md active:scale-95 transition-all duration-200 flex items-center gap-x-1.5"
          onClick={() =>
            fakeExecuteCode(
              monaco,
              editor,
              setOutput,
              setIsRunning,
              abortControllerRef,
              args,
              stdin,
              setFeedbackText
            )
          }
        >
          <Sparkles className="size-3.5 text-violet-400" />
          <span>AI Feedback</span>
        </Button>
        <Button
          onClick={handleClick}
          className="h-8 px-3 rounded-md bg-emerald-600 border border-emerald-500/30 hover:bg-emerald-500 text-white font-sans text-xs font-semibold shadow-md active:scale-95 transition-all duration-200 flex items-center gap-x-1.5"
          disabled={!editor}
          aria-busy={isRunning}
          aria-label={isRunning ? "Cancel execution" : "Run code"}
        >
          {isRunning ? (
            <>
              <OctagonX className="size-3.5 animate-pulse text-red-200" aria-hidden="true" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Play className="size-3.5 fill-current" aria-hidden="true" />
              <span>Run Code</span>
            </>
          )}
        </Button>
      </div>
      {feedbackText &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#0b0b14] text-slate-200 p-6 rounded-xl shadow-2xl max-w-2xl w-full border border-white/[0.08] flex flex-col max-h-[85vh] animate-slide-up">
              <div className="flex items-center gap-x-2 mb-4 pb-3 border-b border-white/5">
                <div className="p-1.5 rounded-md bg-violet-500/10 text-violet-400">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-none">AI Code Review</h2>
                  <p className="text-[11px] text-slate-400 mt-1">Generated suggestions for improvement</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto text-sm bg-black/40 p-4 rounded-lg border border-white/5 font-mono leading-relaxed text-slate-300">
                {feedbackText}
              </div>

              <div className="flex justify-end gap-x-3 mt-5 pt-3 border-t border-white/5">
                <Button
                  onClick={() => setFeedbackText(null)}
                  className="px-5 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-950/20 transition-all duration-200 active:scale-95"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export { RunButton };
