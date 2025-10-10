import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  location: string;
  status: 'completed' | 'current';
  description: string;
  highlights: string[];
}

const education: EducationItem[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Aditya University",
    duration: "2024 - 2026",
    grade: "SGPA: 7.85",
    location: "Andhra Pradesh, India",
    status: "current",
    description: "Advanced studies in computer science with focus on modern software development, system design, and emerging technologies.",
    highlights: [
      "Advanced Algorithms & Data Structures",
      "Software Engineering Principles",
      "Database Management Systems",
      "Web Technologies & Frameworks",
      "System Design & Architecture"
    ]
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Aditya Degree College",
    duration: "2021 - 2024",
    grade: "CGPA: 7.24",
    location: "Andhra Pradesh, India",
    status: "completed",
    description: "Comprehensive foundation in computer science fundamentals, programming languages, and software development practices.",
    highlights: [
      "Programming Fundamentals (C, C++, Java)",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL, RDBMS)",
      "Operating Systems & Networks",
      "Software Development Life Cycle"
    ]
  }
];

const achievements: string[] = [
  "Oracle Academy Java Certification",
  "Built and deployed full-stack canteen app in under a week",
  "Consistent academic performance throughout degree",
  "Active participation in coding competitions",
  "Leadership roles in technical projects"
];

export function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8 lg:pl-32">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic journey and notable accomplishments in the field of computer science and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div className="space-y-8 animate-slide-in-left">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Academic Background
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-border" />

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <Card key={index} className="relative ml-12 p-6 glass border-0 shadow-card hover:shadow-glow transition-all duration-300">
                    {/* Timeline Dot */}
                    <div className="absolute -left-12 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-glow" />

                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge
                            variant={edu.status === 'current' ? 'default' : 'secondary'}
                            className="mb-2"
                          >
                            {edu.status === 'current' ? 'Current' : 'Completed'}
                          </Badge>
                          <h4 className="text-xl font-bold">{edu.degree}</h4>
                          <p className="text-muted-foreground font-medium">{edu.institution}</p>
                        </div>
                        <Badge variant="outline" className="bg-accent/50">
                          {edu.grade}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {edu.description}
                      </p>

                      <div>
                        <h5 className="font-medium mb-2 text-sm">Key Subjects & Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {edu.highlights.map((highlight) => (
                            <Badge key={highlight} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Certifications */}
          <div className="space-y-8 animate-slide-in-right">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              Achievements & Certifications
            </h3>

            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-4">Notable Accomplishments</h4>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Academic Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 glass border-0 shadow-card text-center">
                <div className="text-2xl font-bold gradient-text mb-1">7.85</div>
                <div className="text-xs text-muted-foreground">Current SGPA</div>
                <div className="text-xs text-muted-foreground mt-1">MCA Program</div>
              </Card>
              <Card className="p-6 glass border-0 shadow-card text-center">
                <div className="text-2xl font-bold gradient-text mb-1">7.24</div>
                <div className="text-xs text-muted-foreground">Overall CGPA</div>
                <div className="text-xs text-muted-foreground mt-1">BCA Degree</div>
              </Card>
            </div>

            {/* Additional Info */}
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-3">Academic Focus Areas</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-primary mb-2">Current Focus</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Advanced System Design</div>
                    <div>• Full-Stack Development</div>
                    <div>• Cloud Technologies</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-primary mb-2">Research Interests</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Software Architecture</div>
                    <div>• Performance Optimization</div>
                    <div>• Modern Web Frameworks</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-3">Extracurricular Activities</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Technical project collaborations and team leadership
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Participation in coding competitions and hackathons
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Peer mentoring and knowledge sharing sessions
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}