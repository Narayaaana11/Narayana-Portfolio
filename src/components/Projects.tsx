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
    title: "Portfolio Website",
    description: "A modern portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and dark mode support.",
    image: "/projects/portfolio.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/username/portfolio",
    liveDemoUrl: "https://portfolio.dev",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
    image: "/projects/ecommerce.jpg",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/username/ecommerce",
    liveDemoUrl: "https://ecommerce-demo.dev",
    featured: true,
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "An AI-powered image generation tool that creates unique images based on text prompts using machine learning models.",
    image: "/projects/ai-image.jpg",
    tags: ["Python", "TensorFlow", "React", "Flask"],
    githubUrl: "https://github.com/username/ai-image-generator",
    featured: true,
  },
  {
    id: 4,
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects, and deadlines with team collaboration features.",
    image: "/projects/task-app.jpg",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    githubUrl: "https://github.com/username/task-manager",
    liveDemoUrl: "https://task-manager-demo.dev",
    featured: false,
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A weather application that displays current conditions and forecasts for locations worldwide using weather APIs.",
    image: "/projects/weather.jpg",
    tags: ["JavaScript", "OpenWeather API", "Chart.js", "CSS"],
    githubUrl: "https://github.com/username/weather-dashboard",
    liveDemoUrl: "https://weather-dashboard-demo.dev",
    featured: false,
  },
  {
    id: 6,
    title: "Social Media Analytics",
    description: "A data visualization tool for analyzing social media engagement, reach, and audience demographics.",
    image: "/projects/social-analytics.jpg",
    tags: ["Python", "D3.js", "Django", "PostgreSQL"],
    githubUrl: "https://github.com/username/social-analytics",
    featured: false,
  },
];

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [view, setView] = useState<"grid" | "carousel">("grid");
  const carouselRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(project => project.featured);
  const maxIndex = featuredProjects.length - 1;

  const handlePrevious = () => {
    setCarouselIndex(current => (current > 0 ? current - 1 : maxIndex));
  };

  const handleNext = () => {
    setCarouselIndex(current => (current < maxIndex ? current + 1 : 0));
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
    <section id="projects" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow">
            My Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills and experience in web development, 
            mobile applications, and software engineering.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              onClick={() => setView("grid")}
              className="rounded-xl"
            >
              Grid View
            </Button>
            <Button
              variant={view === "carousel" ? "default" : "outline"}
              onClick={() => setView("carousel")}
              className="rounded-xl"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                  <Card className="overflow-hidden h-full flex flex-col border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow/20 rounded-xl">
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {project.description.length > 120
                          ? `${project.description.substring(0, 120)}...`
                          : project.description}
                      </p>
                      <div className="flex gap-3 mt-auto">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 rounded-lg"
                          onClick={() => handleProjectClick(project)}
                        >
                          Details
                        </Button>
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button variant="outline" size="icon" className="rounded-lg" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.liveDemoUrl && (
                            <Button variant="outline" size="icon" className="rounded-lg" asChild>
                              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
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
                                <Badge key={tag} variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h3>
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
                                <Button variant="outline" className="rounded-lg" asChild>
                                  <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Live Demo
                                  </a>
                                </Button>
                              )}
                              {project.githubUrl && (
                                <Button variant="outline" className="rounded-lg" asChild>
                                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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
                          : "w-2 bg-primary/30 hover:bg-primary/50"
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
                  <h3 className="text-2xl font-bold mb-4">{activeProject.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {activeProject.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {activeProject.liveDemoUrl && (
                      <Button className="rounded-lg" asChild>
                        <a href={activeProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {activeProject.githubUrl && (
                      <Button variant="outline" className="rounded-lg" asChild>
                        <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
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