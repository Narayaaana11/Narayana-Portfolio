import {
  Download,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import heroImage from "@/assets/hero-image.jpg";
import profileImage from "@/assets/profile-image.jpg";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

// Tech Stack Icons - Using CDN links for official icons
const techIcons = {
  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  html5:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
};

export function Hero() {
  // Ref and state for responsive tech icon circle
  const profileRef = useRef<HTMLDivElement>(null);
  const [circle, setCircle] = useState({
    center: 0,
    radius: 0,
    iconSize: 0,
    imgSize: 0,
  });
  // State for shuffling tech icons
  const initialTechList = [
    { key: "react", label: "React" },
    { key: "typescript", label: "TypeScript" },
    { key: "javascript", label: "JavaScript" },
    { key: "nodejs", label: "Node.js" },
    { key: "python", label: "Python" },
    { key: "mongodb", label: "MongoDB" },
    { key: "css3", label: "CSS3" },
    { key: "html5", label: "HTML5" },
    { key: "git", label: "Git" },
    { key: "vite", label: "Vite" },
  ];
  const [techList, setTechList] = useState(initialTechList);

  // Remove shuffle interval - icons now orbit continuously

  useEffect(() => {
    function updateCircle() {
      const container = profileRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      // Smaller icons, perfectly centered on the circle
      let iconSize = Math.max(20, Math.min(rect.width, rect.height) * 0.11); // 11% of container
      let imgSize = iconSize * 0.7;
      let radius = rect.width / 2 - iconSize / 2 - 6; // 6px gap
      let center = rect.width / 2;
      setCircle({ center, radius, iconSize, imgSize });
    }

    // Call immediately
    updateCircle();

    // Also call after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateCircle, 100);

    window.addEventListener("resize", updateCircle);
    return () => {
      window.removeEventListener("resize", updateCircle);
      clearTimeout(timeoutId);
    };
  }, []);
  const handleDownloadResume = () => {
    // Download the resume PDF from the public folder
    const link = document.createElement("a");
    link.href = "/Thota Veera Venkata Naga Satyanarayana Instep Internship.pdf";
    link.download =
      "Thota Veera Venkata Naga Satyanarayana Instep Internship.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-16 md:py-0"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(var(--primary)/0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,hsl(var(--accent-blue)/0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent-purple)/0.04)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-16 left-8 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-sm"
        style={{ filter: "blur(8px)" }}
      >
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute bottom-24 right-12 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-accent-blue/15 to-accent-purple/15 blur-sm"
        style={{ filter: "blur(10px)" }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute top-1/3 right-6 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-accent-orange/20 to-primary-glow/20 blur-sm"
        style={{ filter: "blur(6px)" }}
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            x: [0, 8, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-1/3 left-16 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-accent-purple/15 to-accent-blue/15 blur-sm"
        style={{ filter: "blur(4px)" }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, -5, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll Down</span>
          <ChevronDown className="h-6 w-6 text-muted-foreground opacity-50" />
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center min-h-screen lg:min-h-[calc(100vh-8rem)] perspective-1000">
          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8 px-2 sm:px-0"
          >
            {/* Greeting and Name */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                  <motion.span
                    variants={itemVariants}
                    className="block text-foreground/90"
                  >
                    Hi, I'm
                  </motion.span>
                  <motion.div
                    variants={itemVariants}
                    className="overflow-hidden inline-block"
                  >
                    <motion.span
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className="block gradient-text bg-gradient-to-r from-primary via-primary-glow to-accent-blue bg-clip-text text-transparent"
                    >
                      Narayana Thota
                    </motion.span>
                  </motion.div>
                </h1>
                <motion.h2
                  variants={itemVariants}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium inline-flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2"
                >
                  <span>Full-Stack Developer</span>
                  <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="hidden sm:inline-block text-primary/80 text-xs sm:text-sm md:text-base">
                    Available for hire
                  </span>
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto xl:mx-0 leading-relaxed"
              >
                Building scalable applications with{" "}
                <span className="gradient-accent-text font-semibold bg-gradient-to-r from-accent-blue via-accent-purple to-primary bg-clip-text text-transparent">
                  code, logic, and creativity
                </span>
                . Passionate about modern web technologies and creating
                impactful digital experiences.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={handleDownloadResume}
                  className="group bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-lg hover:shadow-glow transition-all duration-300 w-full sm:w-auto"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Download Resume
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-border/50 hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:block"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() =>
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:bg-accent/30 transition-all duration-300"
                >
                  <span>View Projects</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-3 sm:gap-4 justify-center xl:justify-start"
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary hover:bg-accent/50 transition-all duration-300 h-10 w-10 rounded-full"
                >
                  <a
                    href="https://github.com/Narayaaana11"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary hover:bg-accent/50 transition-all duration-300 h-10 w-10 rounded-full"
                >
                  <a
                    href="https://www.linkedin.com/in/narayaaana"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary hover:bg-accent/50 transition-all duration-300 h-10 w-10 rounded-full"
                >
                  <a
                    href="mailto:narayaaana11@gmail.com"
                    aria-label="Send Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="h-10 flex items-center ml-2"
              >
                <span className="text-xs text-muted-foreground hidden sm:inline-block">
                  Connect with me
                </span>
              </motion.div>
            </motion.div>

            {/* Profile Image Section */}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center xl:justify-end mt-6 sm:mt-8 lg:mt-0"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative group"
              ref={profileRef}
            >
              {/* Main Profile Container */}
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
                style={{ maxWidth: "90vw", maxHeight: "90vw" }}
              >
                {/* Outer Glow Ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent-blue/20 to-accent-purple/20 blur-xl"
                />

                {/* Glass Container */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full rounded-full p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14"
                >
                  {/* Inner Container */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-lg border-2 border-primary/20"
                  >
                    <img
                      src={profileImage}
                      alt="Narayana Thota - Full-Stack Developer"
                      className="w-full h-full object-cover rounded-full brightness-110 contrast-110"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                />

                <motion.div
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.5,
                    },
                  }}
                />

                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    },
                  }}
                />

                <motion.div
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.25, 1],
                  }}
                  transition={{
                    rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                    scale: {
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1.5,
                    },
                  }}
                />

                {/* Floating Tech Stack Indicators - Orbital Revolution */}
                {/* Rotating container for orbital motion */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformOrigin: "center",
                    pointerEvents: "none",
                  }}
                >
                  {/* Tech Icons in Circular Pattern */}
                  {(() => {
                    const iconCount = techList.length;
                    if (!circle.radius || circle.radius === 0) return null;
                    return techList.map((icon, i) => {
                      const angle = (2 * Math.PI * i) / iconCount - Math.PI / 2;
                      // Center the icon exactly on the circle path
                      const x =
                        circle.center +
                        circle.radius * Math.cos(angle) -
                        circle.iconSize / 2;
                      const y =
                        circle.center +
                        circle.radius * Math.sin(angle) -
                        circle.iconSize / 2;
                      return (
                        <motion.div
                          key={`${icon.key}-${i}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            delay: 0.1 + i * 0.05,
                            duration: 0.4,
                            type: "spring",
                          }}
                          whileHover={{
                            scale: 1.25,
                            filter:
                              "drop-shadow(0 0 20px hsl(var(--primary) / 0.8))",
                            pointerEvents: "auto",
                          }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            position: "absolute",
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${circle.iconSize}px`,
                            height: `${circle.iconSize}px`,
                            zIndex: 2,
                            background: "rgba(255,255,255,0.08)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            backdropFilter: "blur(6px)",
                            cursor: "pointer",
                            pointerEvents: "auto",
                            transition: "box-shadow 0.3s, filter 0.3s",
                          }}
                        >
                          <motion.img
                            src={techIcons[icon.key]}
                            alt={icon.label}
                            title={icon.label}
                            style={{
                              width: `${circle.imgSize}px`,
                              height: `${circle.imgSize}px`,
                              objectFit: "contain",
                            }}
                            className="drop-shadow-lg"
                            animate={{
                              rotate: [0, -360],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                      );
                    });
                  })()}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
