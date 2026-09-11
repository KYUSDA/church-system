import { useNavigate } from "react-router-dom";
import { ServerCrash, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServerDown = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">

        {/* Server Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
          <ServerCrash className="h-10 w-10 text-destructive" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight">
          Server Unavailable
        </h1>

        {/* Description */}
        <p className="mt-4 text-muted-foreground leading-7">
          We're unable to connect to our server at the moment.
          Login and registration are temporarily unavailable.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Please try again later.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handleRetry}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Status */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
          Authentication service unavailable
        </div>
      </div>
    </div>
  );
};

export default ServerDown;

