import { Card } from "@/components/ui/card";
import narayanaImg from "@/assets/narayana.jpg";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Target, Code2, Users, Lightbulb, TrendingUp } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useBreakpoint } from "@/hooks/use-mobile";

export function About() {
  const isTablet = useBreakpoint("tablet");

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.03)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection as="div" className="text-center mb-12 sm:mb-16 lg:mb-20" animation="fade-down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About <span className="gradient-text bg-gradient-to-r from-primary via-primary-glow to-accent-blue bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get to know more about my journey, passion, and aspirations in the world of technology.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Enhanced Profile Image */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <Card className="p-6 sm:p-8 lg:p-10 glass border-0 shadow-card hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02]">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-88 lg:h-88 rounded-2xl bg-gradient-to-br from-card via-secondary to-card overflow-hidden border border-border/20">
                  {/* Actual profile image */}
                  <div className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent-blue/10 to-accent-purple/10">
                    <img
                      src={narayanaImg}
                      alt="Narayana Thota profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-full shadow-lg border-4 border-white/20"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full opacity-60 animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-primary to-primary-glow rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </Card>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-accent animate-bounce">
                <Users className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-glow animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </div>

          {/* Enhanced Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                Passionate Developer & <span className="gradient-accent-text">Problem Solver</span>
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm a dedicated full-stack developer currently pursuing my MCA at Aditya University.
                  With hands-on experience in building modern web applications, I combine technical
                  expertise with a strong problem-solving mindset to create impactful digital solutions.
                </p>

                <p>
                  My journey in technology is driven by curiosity and the desire to learn continuously.
                  I thrive in collaborative environments and believe that great software is built through
                  teamwork, clear communication, and attention to detail.
                </p>
              </div>
            </div>

            {/* Enhanced Career Goals Card */}
            <Card className="p-6 sm:p-8 glass border-0 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-xl">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg sm:text-xl">Career Goals</h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Seeking opportunities to contribute to impactful projects while mastering
                    advanced system design and scalable software solutions. Committed to continuous
                    learning and staying updated with emerging technologies.
                  </p>
                </div>
              </div>
            </Card>

            {/* Enhanced Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 glass border-0 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-lg">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-accent-blue" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium">Education</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">MCA Student</div>
                    <div className="text-xs text-primary">Aditya University</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass border-0 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-r from-accent-purple/10 to-accent-orange/10 rounded-lg">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-accent-purple" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-medium">Location</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Andhra Pradesh, India</div>
                    <div className="text-xs text-primary">Open to Remote</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Interests Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg sm:text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Interests & Values
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Problem Solving
                </Badge>
                {/* <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  System Design
                </Badge> */}
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Team Collaboration
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Continuous Learning
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Better Code
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Innovation
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  User Experience
                </Badge>
                {/* <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm hover:bg-primary/20 transition-colors duration-300">
                  Performance
                </Badge> */}
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 glass border-0 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <div className="text-center space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">1+</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Years Experience</div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass border-0 shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <div className="text-center space-y-2">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">06+</div>
                  <div className="text-sm sm:text-base text-muted-foreground">Projects Completed</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}