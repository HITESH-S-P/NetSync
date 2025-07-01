import { useRef, useState } from "react";
import { Play, OctagonX } from "lucide-react";
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
      <div className="flex items-center gap-2">
        <Button
          className={`h-9 px-5 py-1 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
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
          # Feedback
        </Button>
        <Button
          onClick={handleClick}
          className={`h-9 px-5 py-1 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
          disabled={!editor}
          aria-busy={isRunning}
          aria-label={isRunning ? "Cancel execution" : "Run code"}
        >
          {isRunning ? (
            <>
              <OctagonX className="mr-2" aria-hidden="true" />
              Cancel
            </>
          ) : (
            <>
              <Play className="mr-2" aria-hidden="true" />
              Run Code
            </>
          )}
        </Button>
      </div>
      {feedbackText &&
        typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-[#1f1f1f] text-gray-200 p-6 rounded-2xl shadow-2xl max-w-2xl w-[90%] border border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-center text-white">
                AI Feedback
              </h2>

              <div className="max-h-[65vh] overflow-y-auto text-sm whitespace-pre-wrap font-mono leading-relaxed bg-[#2a2a2a] p-4 rounded-md border border-gray-700">
                {feedbackText}
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setFeedbackText(null)}
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export { RunButton };
