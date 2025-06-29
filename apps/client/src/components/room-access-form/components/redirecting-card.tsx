import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/spinner";

export const RedirectingCard = () => (
  <div
    className="animate-fade-in w-full max-w-md backdrop-blur-sm"
    role="status"
    aria-live="polite"
  >
    <Alert
      className="bg-background/50 flex gap-x-2"
      aria-labelledby="redirect-title"
      aria-describedby="redirect-description"
    >
      <Spinner className="size-6" />
      <div>
        <AlertTitle id="redirect-title">Wait</AlertTitle>
      </div>
    </Alert>
  </div>
);
