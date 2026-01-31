import type React from "react";
import { Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 sm:py-8 md:py-10 border-t border-border/50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        {/* Scroll to Top Button */}
        <Button
          onClick={scrollToTop}
          size="sm"
          className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/60 h-9 w-9 sm:h-10 sm:w-10"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">
          {/* Branding */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold gradient-text">
              Narayana Thota
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex justify-center md:justify-start"
          >
            <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Education", href: "#education" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 animated-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-1 py-0.5"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Social */}
          <div className="flex flex-col items-center md:items-end gap-2 sm:gap-3">
            <div className="flex justify-center gap-4 sm:gap-6">
              <a
                href="https://github.com/Narayaaana11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded p-1"
                aria-label="GitHub Profile"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/narayaaana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded p-1"
                aria-label="LinkedIn Profile"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="mailto:narayaaana11@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded p-1"
                aria-label="Email"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
            <a
              href="mailto:narayaaana11@gmail.com"
              className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              narayaaana11@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-muted-foreground text-xs md:text-sm flex items-center justify-center gap-2">
            © {currentYear} Narayana Thota
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </p>
        </div>

        {/* Background Decoration */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-primary opacity-5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-accent opacity-5 rounded-full blur-3xl" />
        </div>
      </div>
    </footer>
  );
}
