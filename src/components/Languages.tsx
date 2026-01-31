import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe } from "lucide-react";

interface Language {
  name: string;
  level: "Native" | "Fluent" | "Intermediate" | "Beginner";
  proficiency: number;
  flag: string;
  description: string;
}

const languages: Language[] = [
  {
    name: "Telugu",
    level: "Native",
    proficiency: 100,
    flag: "🇮🇳",
    description: "Mother tongue, fluent in all contexts",
  },
  {
    name: "English",
    level: "Fluent",
    proficiency: 90,
    flag: "🇺🇸",
    description: "Professional proficiency in speaking, reading, and writing",
  },
  {
    name: "Hindi",
    level: "Intermediate",
    proficiency: 70,
    flag: "🇮🇳",
    description: "Good conversational skills and basic reading comprehension",
  },
  {
    name: "Japanese",
    level: "Beginner",
    proficiency: 25,
    flag: "🇯🇵",
    description: "Basic phrases and learning fundamentals",
  },
];

const levelColors = {
  Native: "text-primary",
  Fluent: "text-accent-blue",
  Intermediate: "text-accent-orange",
  Beginner: "text-accent-purple",
};

export function Languages() {
  return (
    <section
      id="languages"
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
            Language <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Multilingual communication abilities enabling effective
            collaboration across diverse teams and cultures.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {languages.map((language, index) => (
              <Card
                key={language.name}
                className="p-4 sm:p-6 glass border-0 shadow-card hover:shadow-glow transition-all duration-300 group animate-scale-in touch-manipulation"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-lg sm:text-2xl flex-shrink-0">
                      {language.flag}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-lg">
                        {language.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`${levelColors[language.level]} text-xs`}
                      >
                        {language.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg sm:text-2xl font-bold gradient-text">
                      {language.proficiency}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Progress value={language.proficiency} className="h-2" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {language.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Language Stats */}
          <Card className="p-4 sm:p-6 md:p-8 glass border-0 shadow-card">
            <div className="text-center mb-6 sm:mb-8">
              <Globe className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary mx-auto mb-2 sm:mb-4" />
              <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                Global Communication
              </h3>
              <p className="text-xs sm:text-base text-muted-foreground px-2">
                Multilingual skills enabling effective collaboration in diverse,
                international environments
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  {languages.length}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Languages
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  2
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Fluent
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  3
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Indian Langs
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                  1
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Intl Lang
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
