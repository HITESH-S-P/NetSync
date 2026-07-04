import { useRef } from "react";

import { Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShareDialog, ShareDialogRef } from "@/components/share-dialog";

interface RoomProps {
  roomId: string;
}

const ShareButton = ({ roomId }: RoomProps) => {
  const shareDialogRef = useRef<ShareDialogRef>(null);

  const handleButtonClick = () => {
    shareDialogRef.current?.openDialog();
  };

  return (
    <>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="animate-fade-in-top hover:!text-foreground hover:bg-white/5 transition-all duration-200 aspect-square h-7 rounded-md p-1.5
                text-slate-300 sm:aspect-auto sm:px-2.5 flex items-center gap-x-1.5"
              aria-label="Share this coding room"
              aria-haspopup="dialog"
              aria-expanded="false"
              onClick={handleButtonClick}
            >
              <Share className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-medium">Share</span>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </Dialog>
      <ShareDialog
        ref={shareDialogRef}
        roomId={roomId}
        aria-label="Share room options"
      />
    </>
  );
};

export { ShareButton };
