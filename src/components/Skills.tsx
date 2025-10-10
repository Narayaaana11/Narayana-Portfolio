import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Code, Database, Wrench, Users, Globe, Zap, Shield, Palette, Smartphone, Cloud, Server, Cpu, Layers, GitBranch, Monitor, Smartphone as Mobile, Database as Db, Lock, Rocket, Target, Brain, Lightbulb, TrendingUp } from "lucide-react";

interface Skill {
  name: string;
  category: 'programming' | 'tools' | 'core' | 'soft' | 'frontend' | 'backend' | 'devops';
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
  description: string;
  icon: React.ElementType;
  iconUrl?: string;
  experience?: string;
  projects?: number;
}

const skills: Skill[] = [
  // Programming Languages
  { name: "JavaScript", category: "programming", level: "intermediate", description: "Modern ES6+, DOM manipulation, async programming, functional programming", icon: Code, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", projects: 15 },
  { name: "TypeScript", category: "programming", level: "intermediate", description: "Type safety, interfaces, generics, advanced patterns", icon: Code, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", projects: 12 },
  { name: "Python", category: "programming", level: "intermediate", description: "Data structures, algorithms, web frameworks, automation", icon: Code, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", projects: 10 },
  // { name: "Java", category: "programming", level: "intermediate", description: "OOP principles, collections, multithreading, Spring Boot", icon: Code, projects: 8 },
  { name: "HTML", category: "programming", level: "intermediate", description: "Semantic markup, accessibility, SEO optimization, modern standards", icon: Globe, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", projects: 20 },
  { name: "CSS", category: "programming", level: "intermediate", description: "Modern layouts, animations, responsive design, CSS Grid/Flexbox", icon: Palette, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", projects: 20 },
  { name: "SQL", category: "programming", level: "intermediate", description: "Database queries, optimization, design, stored procedures", icon: Database, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", projects: 12 },

  // Frontend Technologies
  { name: "React", category: "frontend", level: "intermediate", description: "Hooks, Context API, performance optimization, testing", icon: Layers, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", projects: 18 },
  // { name: "Next.js", category: "frontend", level: "intermediate", description: "SSR, SSG, API routes, performance optimization", icon: Rocket, projects: 8 },
  // { name: "Vue.js", category: "frontend", level: "intermediate", description: "Composition API, Vuex, component architecture", icon: Layers, projects: 5 },
  { name: "Tailwind CSS", category: "frontend", level: "intermediate", description: "Utility-first CSS, custom components, responsive design", icon: Palette, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", projects: 15 },
  // { name: "Sass/SCSS", category: "frontend", level: "intermediate", description: "CSS preprocessing, mixins, variables, architecture", icon: Palette, projects: 10 },

  // Backend Technologies
  { name: "Node.js", category: "backend", level: "intermediate", description: "Express.js, REST APIs, middleware, authentication", icon: Server, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", projects: 12 },
  { name: "Express.js", category: "backend", level: "intermediate", description: "Web framework, routing, middleware, error handling", icon: Server, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", projects: 12 },
  // { name: "FastAPI", category: "backend", level: "intermediate", description: "Python web framework, async programming, OpenAPI", icon: Server, projects: 4 },
  { name: "MongoDB", category: "backend", level: "intermediate", description: "NoSQL database, aggregation, indexing, optimization", icon: Database, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", projects: 8 },
  // { name: "PostgreSQL", category: "backend", level: "intermediate", description: "Relational database, complex queries, optimization", icon: Database, projects: 6 },
  // { name: "Redis", category: "backend", level: "intermediate", description: "Caching, session management, pub/sub", icon: Database, projects: 5 },

  // Tools & Platforms
  { name: "Git", category: "tools", level: "intermediate", description: "Version control, branching strategies, collaboration, CI/CD", icon: GitBranch, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", projects: 25 },
  { name: "GitHub", category: "tools", level: "intermediate", description: "Repository management, CI/CD, project collaboration, Actions", icon: GitBranch, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", projects: 25 },
  { name: "VS Code", category: "tools", level: "intermediate", description: "Extensions, debugging, productivity optimization, customization", icon: Monitor, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", projects: 25 },
  { name: "Figma", category: "tools", level: "intermediate", description: "UI/UX design, prototyping, design systems, collaboration", icon: Palette, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", projects: 8 },
  { name: "Supabase", category: "tools", level: "intermediate", description: "Backend as a service, real-time databases, authentication", icon: Cloud, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", projects: 6 },
  { name: "Firebase", category: "tools", level: "intermediate", description: "Cloud services, authentication, real-time database", icon: Cloud, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", projects: 4 },
  { name: "Docker", category: "tools", level: "intermediate", description: "Containerization, deployment, microservices", icon: Wrench, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", projects: 5 },

  // DevOps & Cloud
  // { name: "AWS", category: "devops", level: "intermediate", description: "Cloud services, EC2, S3, Lambda, deployment", icon: Cloud, projects: 3 },
  { name: "Vercel", category: "devops", level: "intermediate", description: "Deployment, hosting, edge functions, analytics", icon: Cloud, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", projects: 10 },
  { name: "Netlify", category: "devops", level: "intermediate", description: "Static site hosting, forms, functions, CI/CD", icon: Cloud, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", projects: 8 },

  // Core Concepts
  // { name: "System Design", category: "core", level: "intermediate", description: "Scalable architecture, design patterns, microservices", icon: Server, projects: 6 },
  { name: "OOP", category: "core", level: "intermediate", description: "Object-oriented programming principles, SOLID, design patterns", icon: Code, projects: 15 },
  { name: "DBMS", category: "core", level: "intermediate", description: "Database management, normalization, indexing, optimization", icon: Database, projects: 12 },
  { name: "DSA", category: "core", level: "intermediate", description: "Data structures and algorithms optimization, problem solving", icon: Brain, projects: 20 },
  { name: "Operating Systems", category: "core", level: "intermediate", description: "Process management, memory allocation, system calls", icon: Server, projects: 8 },
  { name: "Computer Networks", category: "core", level: "intermediate", description: "TCP/IP, HTTP, WebSocket, network protocols", icon: Globe, projects: 10 },

  // Soft Skills
  { name: "Problem Solving", category: "soft", level: "intermediate", description: "Analytical thinking, debugging, optimization, creative solutions", icon: Target, projects: 25 },
  { name: "Team Collaboration", category: "soft", level: "intermediate", description: "Agile methodologies, code reviews, mentoring, leadership", icon: Users, projects: 20 },
  { name: "Communication", category: "soft", level: "intermediate", description: "Technical documentation, presentations, client interaction", icon: Users, projects: 15 },
  { name: "Time Management", category: "soft", level: "intermediate", description: "Project planning, deadline management, prioritization", icon: Shield, projects: 18 },
  { name: "Continuous Learning", category: "soft", level: "intermediate", description: "Self-improvement, technology trends, skill development", icon: TrendingUp, projects: 25 },
  { name: "Innovation", category: "soft", level: "intermediate", description: "Creative thinking, new technologies, process improvement", icon: Lightbulb, projects: 12 },
];

const categories = {
  programming: { name: "Programming Languages", icon: Code, color: "text-primary" },
  frontend: { name: "Frontend", icon: Layers, color: "text-accent-blue" },
  backend: { name: "Backend", icon: Server, color: "text-accent-purple" },
  tools: { name: "Tools & Platforms", icon: Wrench, color: "text-accent-orange" },
  devops: { name: "DevOps & Cloud", icon: Cloud, color: "text-green-500" },
  core: { name: "Core Concepts", icon: Brain, color: "text-purple-500" },
  soft: { name: "Soft Skills", icon: Users, color: "text-pink-500" },
};

const levelColors = {
  expert: "text-primary",
  advanced: "text-accent-blue",
  intermediate: "text-accent-orange",
  beginner: "text-accent-purple"
};

const levelLabels = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner"
};

export function Skills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === null || skill.category === activeCategory)
  );

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.03)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Technical <span className="gradient-text bg-gradient-to-r from-primary via-primary-glow to-accent-blue bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore my technical expertise and professional capabilities across different domains and technologies.
          </p>
        </div>

        {/* Enhanced Search and Filter */}
        <div className="mb-12 sm:mb-16 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass border-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>

          {/* Enhanced Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Badge
              variant={activeCategory === null ? "default" : "secondary"}
              className="cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2 px-4 py-2"
              onClick={() => setActiveCategory(null)}
            >
              <Code className="h-4 w-4" />
              All Skills
            </Badge>
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <Badge
                  key={key}
                  variant={activeCategory === key ? "default" : "secondary"}
                  className="cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-2 px-4 py-2"
                  onClick={() => setActiveCategory(key === activeCategory ? null : key)}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => {
            const category = categories[skill.category];
            const CategoryIcon = category.icon;
            const SkillIcon = skill.icon;
            const isFlipped = flippedCard === skill.name;

            return (
              <Card
                key={skill.name}
                className="relative h-48 sm:h-52 glass border-0 shadow-card skill-card-hover cursor-pointer group overflow-hidden hover:shadow-xl transition-all duration-500"
                onClick={() => setFlippedCard(isFlipped ? null : skill.name)}
              >
                <div className={`absolute inset-0 transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-between ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10">
                        {skill.iconUrl ? (
                          <img src={skill.iconUrl} alt={`${skill.name} icon`} className="h-5 w-5 sm:h-6 sm:w-6 object-cover rounded" />
                        ) : (
                          <SkillIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${levelColors[skill.level]}`} />
                        )}
                      </div>
                      <Badge variant="outline" className={`text-xs ${levelColors[skill.level]} border-current`}>
                        {levelLabels[skill.level]}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-tight">{skill.name}</h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CategoryIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{category.name}</span>
                      </div>
                      {skill.experience && (
                        <div className="text-xs text-primary font-medium">
                          {skill.experience} • {skill.projects} projects
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-center ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 bg-gradient-to-br from-card via-secondary to-card`}>
                    <div className="text-center space-y-3">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 mx-auto w-fit">
                        {skill.iconUrl ? (
                          <img src={skill.iconUrl} alt={`${skill.name} icon`} className="h-6 w-6 sm:h-8 sm:w-8 object-cover rounded mx-auto" />
                        ) : (
                          <SkillIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${levelColors[skill.level]} mx-auto`} />
                        )}
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base">{skill.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {levelLabels[skill.level]}
                        </Badge>
                        {skill.experience && (
                          <Badge variant="outline" className="text-xs">
                            {skill.experience}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/10 to-primary-glow/10 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg">No skills found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}

        Enhanced Skills Summary
        <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-6">
          {Object.entries(categories).map(([key, category]) => {
            const Icon = category.icon;
            const categorySkills = skills.filter(skill => skill.category === key);
            const expertCount = categorySkills.filter(skill => skill.level === 'expert').length;
            const advancedCount = categorySkills.filter(skill => skill.level === 'advanced').length;

            return (
              <Card key={key} className="p-4 sm:p-6 glass border-0 shadow-card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 mx-auto w-fit mb-3">
                  <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${category.color} mx-auto`} />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm mb-2">{category.name}</h3>
                <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">{categorySkills.length}</div>
                <div className="text-xs text-muted-foreground">
                  {/* {expertCount + advancedCount} Advanced+ */}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Skills Statistics */}
        {/* <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-6 sm:p-8 glass border-0 shadow-card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{skills.length}</div>
            <div className="text-sm sm:text-base text-muted-foreground">Total Skills</div>
          </Card>
          <Card className="p-6 sm:p-8 glass border-0 shadow-card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
              {skills.filter(s => s.level === 'expert' || s.level === 'advanced').length}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">Advanced+ Skills</div>
          </Card>
          <Card className="p-6 sm:p-8 glass border-0 shadow-card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
              {Object.keys(categories).length}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">Categories</div>
          </Card>
          <Card className="p-6 sm:p-8 glass border-0 shadow-card text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
              {skills.reduce((sum, s) => sum + (s.projects || 0), 0)}
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">Total Projects</div>
          </Card>
        </div> */}
      </div>
    </section>
  );
}