import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Menu, X } from "lucide-react";

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showTabletNav, setShowTabletNav] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup intersection observer to detect active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          observerRef.current?.unobserve(section);
        });
      }
    };
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle tablet navigation
  useEffect(() => {
    const handleResize = () => {
      setShowTabletNav(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 hidden lg:flex items-center justify-between px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-md"
            : "bg-transparent",
        )}
      >
        <div className="flex items-center">
          <motion.a
            href="#home"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Narayana
          </motion.a>
        </div>

        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <a
              href="https://github.com/Narayaaana11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <a
              href="https://www.linkedin.com/in/narayaaana/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button
            className="rounded-lg"
            onClick={() => {
              const el = document.querySelector("#contact");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact Me
          </Button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <div className="fixed top-3 right-3 z-50 lg:hidden">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "p-2.5 sm:p-3 rounded-lg transition-all duration-300 touch-manipulation active:scale-95",
            scrolled || mobileMenuOpen
              ? "bg-background/80 backdrop-blur-md shadow-md"
              : "bg-transparent",
          )}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-4 sm:px-6 pb-6 lg:hidden flex flex-col overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileMenuOpen(false);
            }}
          >
            <div className="flex flex-col space-y-1 sm:space-y-2">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium transition-all touch-manipulation",
                    activeSection === item.href.substring(1)
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto flex flex-col space-y-3 sm:space-y-4">
              <div className="flex justify-center space-x-4 sm:space-x-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-11 w-11 sm:h-12 sm:w-12 touch-manipulation"
                  asChild
                >
                  <a
                    href="https://github.com/Narayaaana11"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-11 w-11 sm:h-12 sm:w-12 touch-manipulation"
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/narayaaana/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
              <Button
                className="rounded-lg w-full py-3 sm:py-4 text-base sm:text-lg touch-manipulation"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.querySelector("#contact");
                  if (el) {
                    setTimeout(() => {
                      el.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }
                }}
              >
                Contact Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tablet Navigation */}
      <AnimatePresence>
        {showTabletNav && (
          <motion.nav
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden sm:flex lg:hidden items-center justify-center px-4 py-2 rounded-full transition-all duration-300",
              "bg-background/80 backdrop-blur-md shadow-lg border border-border/50",
            )}
          >
            <div className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                    activeSection === item.href.substring(1)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
