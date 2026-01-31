import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Guard Hub — Security Management System",
    description:
      "A comprehensive security workforce management system that digitizes and automates security agency operations. Features automated shift rostering, leave management, real-time attendance tracking, and operational dashboards to improve workforce utilization and reduce manual scheduling effort.",
    image: "/projects/guardhub.jpg",
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
    ],
    githubUrl: "https://github.com/username/guardhub",
    featured: true,
  },
  {
    id: 2,
    title: "Matrix Library Management System",
    description:
      "A rack-based digital library solution that modernizes traditional library workflows. Features QR/barcode scanning, secure authentication, role-based access control, AI-powered chatbot for book discovery, and comprehensive dashboards for librarians and students.",
    image: "/projects/matrix-library.jpg",
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "AI Chatbot",
    ],
    githubUrl: "https://github.com/username/matrix-library",
    featured: true,
  },
  {
    id: 3,
    title: "Aditya University Visitor Management System",
    description:
      "An institutional visitor tracking platform designed to enhance campus security. Features visitor registration with time logs, role-based access for security staff, real-time monitoring dashboards, and comprehensive audit trails replacing manual visitor registers.",
    image: "/projects/visitor-management.jpg",
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Security",
    ],
    githubUrl: "https://github.com/username/visitor-management",
    featured: true,
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [view, setView] = useState<"grid" | "carousel">("grid");
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter((project) => project.featured);
  const maxIndex = featuredProjects.length - 1;

  const handlePrevious = () => {
    setCarouselIndex((current) => (current > 0 ? current - 1 : maxIndex));
  };

  const handleNext = () => {
    setCarouselIndex((current) => (current < maxIndex ? current + 1 : 0));
  };

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (view === "carousel") {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselIndex, view]);

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen relative"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
            My Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Explore my portfolio of projects showcasing my skills and experience
            in web development, mobile applications, and software engineering.
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 flex-wrap">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              onClick={() => setView("grid")}
              className="rounded-xl text-sm sm:text-base"
            >
              Grid View
            </Button>
            <Button
              variant={view === "carousel" ? "default" : "outline"}
              onClick={() => setView("carousel")}
              className="rounded-xl text-sm sm:text-base"
            >
              Carousel View
            </Button>
          </div>
        </motion.div>

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {view === "grid" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow/20 rounded-xl touch-manipulation">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 flex flex-wrap gap-1 sm:gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 && (
                          <Badge
                            variant="secondary"
                            className="bg-background/80 backdrop-blur-sm text-xs sm:text-sm"
                          >
                            +{project.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-4 flex-grow line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 sm:gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-lg text-xs sm:text-sm"
                          onClick={() => handleProjectClick(project)}
                        >
                          Details
                        </Button>
                        <div className="flex gap-1 sm:gap-2">
                          {project.githubUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-lg h-8 w-8 sm:h-10 sm:w-10"
                              asChild
                            >
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                              >
                                <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                          {project.liveDemoUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-lg h-8 w-8 sm:h-10 sm:w-10"
                              asChild
                            >
                              <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Live Demo"
                              >
                                <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carousel View */}
        <AnimatePresence mode="wait">
          {view === "carousel" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-xl border border-border/50 shadow-lg"
            >
              <div className="overflow-hidden">
                <motion.div
                  ref={carouselRef}
                  animate={{ x: `calc(-${carouselIndex * 100}%)` }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="flex"
                >
                  {featuredProjects.map((project) => (
                    <div key={project.id} className="w-full flex-shrink-0">
                      <div className="relative aspect-[16/9] md:aspect-[21/9]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                          <div className="max-w-3xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-background/80 backdrop-blur-sm"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">
                              {project.title}
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-2xl">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-3">
                              <Button
                                onClick={() => handleProjectClick(project)}
                                className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
                              >
                                View Details
                              </Button>
                              {project.liveDemoUrl && (
                                <Button
                                  variant="outline"
                                  className="rounded-lg"
                                  asChild
                                >
                                  <a
                                    href={project.liveDemoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                  </a>
                                </Button>
                              )}
                              {project.githubUrl && (
                                <Button
                                  variant="outline"
                                  className="rounded-lg"
                                  asChild
                                >
                                  <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Github className="mr-2 h-4 w-4" />
                                    Code
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Carousel Navigation */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-border/50 hover:bg-primary/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0">
                <div className="flex justify-center gap-2">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarouselIndex(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index === carouselIndex
                          ? "w-8 bg-primary"
                          : "w-2 bg-primary/30 hover:bg-primary/50",
                      )}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border border-border/50"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeProjectDetails}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {activeProject.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeProject.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeProject.liveDemoUrl && (
                      <Button className="rounded-lg" asChild>
                        <a
                          href={activeProject.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {activeProject.githubUrl && (
                      <Button variant="outline" className="rounded-lg" asChild>
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
