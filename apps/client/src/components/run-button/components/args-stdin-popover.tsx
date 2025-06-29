import { useState } from "react";

import { ChevronDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExecutionArgsProps {
  onArgsChange: (args: string[]) => void;
  onStdinChange: (stdin: string) => void;
  disabled?: boolean;
}

const ArgsInputPopover = ({
  onArgsChange,
  onStdinChange,
  disabled,
}: ExecutionArgsProps) => {
  const [argsStr, setArgsStr] = useState("");
  const [stdin, setStdin] = useState("");
  const [open, setOpen] = useState(false);

  const handleArgsChange = (value: string) => {
    setArgsStr(value);
    const args = value.split("\n").filter((arg) => arg.trim());
    onArgsChange(args);
  };

  const handleStdinChange = (value: string) => {
    setStdin(value);
    onStdinChange(value);
  };

  const clearArgs = () => {
    handleArgsChange("");
  };

  const clearStdin = () => {
    handleStdinChange("");
  };

  const hasInput = argsStr || stdin;

  return <></>;
};

export { ArgsInputPopover };
