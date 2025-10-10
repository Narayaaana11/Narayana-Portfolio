import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe } from "lucide-react";

interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Intermediate' | 'Beginner';
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
    description: "Mother tongue, fluent in all contexts"
  },
  {
    name: "English",
    level: "Fluent",
    proficiency: 90,
    flag: "🇺🇸",
    description: "Professional proficiency in speaking, reading, and writing"
  },
  {
    name: "Hindi",
    level: "Intermediate",
    proficiency: 70,
    flag: "🇮🇳",
    description: "Good conversational skills and basic reading comprehension"
  },
  {
    name: "Japanese",
    level: "Beginner",
    proficiency: 25,
    flag: "🇯🇵",
    description: "Basic phrases and learning fundamentals"
  }
];

const levelColors = {
  Native: "text-primary",
  Fluent: "text-accent-blue",
  Intermediate: "text-accent-orange",
  Beginner: "text-accent-purple"
};

export function Languages() {
  return (
    <section id="languages" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8 lg:pl-32">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Language <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Multilingual communication abilities enabling effective collaboration across diverse teams and cultures.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {languages.map((language, index) => (
              <Card 
                key={language.name} 
                className="p-6 glass border-0 shadow-card hover:shadow-glow transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{language.name}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`${levelColors[language.level]} text-xs`}
                      >
                        {language.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">
                      {language.proficiency}%
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Progress 
                    value={language.proficiency} 
                    className="h-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {language.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Language Stats */}
          <Card className="p-8 glass border-0 shadow-card">
            <div className="text-center mb-8">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Global Communication</h3>
              <p className="text-muted-foreground">
                Multilingual skills enabling effective collaboration in diverse, international environments
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">{languages.length}</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">2</div>
                <div className="text-sm text-muted-foreground">Fluent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">3</div>
                <div className="text-sm text-muted-foreground">Indian Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">1</div>
                <div className="text-sm text-muted-foreground">International</div>
              </div>
            </div>
          </Card>

          {/* Cultural Context */}
          {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">🌏</span>
                Cultural Awareness
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Diverse cultural background from South India</div>
                <div>• Understanding of regional business practices</div>
                <div>• Cross-cultural communication experience</div>
                <div>• Adaptability to international work environments</div>
              </div>
            </Card>

            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">💼</span>
                Professional Use
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Technical documentation in English</div>
                <div>• Client communication across regions</div>
                <div>• Team collaboration with diverse members</div>
                <div>• International conference participation</div>
              </div>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}