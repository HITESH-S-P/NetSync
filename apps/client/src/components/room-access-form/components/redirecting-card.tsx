import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/spinner";

export const RedirectingCard = () => (
  <div
    className="animate-fade-in w-full max-w-md backdrop-blur-sm"
    role="status"
    aria-live="polite"
  >
    <Alert
      className="bg-black/40 border-white/10 text-white flex items-center gap-x-3 p-4 rounded-xl"
      aria-labelledby="redirect-title"
    >
      <Spinner className="size-5 text-indigo-400" />
      <div>
        <AlertTitle id="redirect-title" className="font-semibold text-white/95">Redirecting to room...</AlertTitle>
      </div>
    </Alert>
  </div>
);
