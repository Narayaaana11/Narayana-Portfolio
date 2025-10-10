import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}