import { ThemeProvider } from "@/hooks/use-theme";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Languages } from "@/components/Languages";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

export function Portfolio() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            (entry.target as HTMLElement).style.opacity = '1';
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        <Navigation />

        <main className="relative">
          <Hero />
          <div className="space-y-24 sm:space-y-32 md:space-y-40">
            <section id="about" className="opacity-0 transition-all duration-700 translate-y-4">
              <About />
            </section>
            <section id="skills" className="opacity-0 transition-all duration-700 translate-y-4">
              <Skills />
            </section>
            <section id="projects" className="opacity-0 transition-all duration-700 translate-y-4">
              <Projects />
            </section>
            <section id="education" className="opacity-0 transition-all duration-700 translate-y-4">
              <Education />
            </section>
            <section id="languages" className="opacity-0 transition-all duration-700 translate-y-4">
              <Languages />
            </section>
            <section id="contact" className="opacity-0 transition-all duration-700 translate-y-4">
              <Contact />
            </section>
          </div>
        </main>

        <Footer />

        {/* Enhanced Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Primary Gradient Orb */}
          <div
            className="absolute top-1/4 -left-32 w-72 h-72 bg-gradient-primary opacity-5 rounded-full blur-3xl animate-float-slow transform-gpu"
          />

          {/* Accent Gradient Orb */}
          <div
            className="absolute top-3/4 -right-32 w-96 h-96 bg-gradient-accent opacity-5 rounded-full blur-3xl animate-float-reverse transform-gpu"
            style={{ animationDelay: '2s' }}
          />

          {/* Warm Gradient Orb */}
          <div
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-warm opacity-5 rounded-full blur-3xl animate-pulse transform-gpu"
            style={{ animationDelay: '4s' }}
          />

          {/* Morphing Element */}
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent-blue/10 rounded-full blur-3xl animate-morph transform-gpu"
          />

          {/* Gradient Mesh */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.05)_0%,transparent_50%)] animate-breathe"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--accent-blue)/0.05)_0%,transparent_50%)] animate-breathe"
              style={{ animationDelay: '2s' }}
            />
          </div>

          {/* Additional Floating Elements */}
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 rounded-full blur-2xl animate-float-reverse transform-gpu"
            style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-accent-orange/20 to-primary/20 rounded-full blur-2xl animate-float-slow transform-gpu"
            style={{ animationDelay: '5s' }} />
        </div>
      </div>
    </ThemeProvider>
  );
}