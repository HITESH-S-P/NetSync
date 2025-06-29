import { useRef, useState } from "react";
import { Play, OctagonX } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cancelExecution, executeCode } from "./utils";

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
    <div className="flex items-center gap-2">
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
  );
};

export { RunButton };
