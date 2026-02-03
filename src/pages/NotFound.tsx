import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // 404 route accessed
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--accent-blue)/0.06)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <div className="text-9xl sm:text-[120px] font-bold gradient-text bg-gradient-to-r from-primary via-primary-glow to-accent-blue bg-clip-text text-transparent">
            404
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-3">
          Oops! Page Not Found
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another
          location.
        </p>

        <p className="text-sm text-muted-foreground mb-8">
          Attempted to access:{" "}
          <span className="font-mono text-accent-blue">
            {location.pathname}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
            size="lg"
          >
            <a href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Home
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
