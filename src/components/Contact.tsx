import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import emailjs from '@emailjs/browser';
import { validateEmailJSConfig } from '@/lib/emailjs-config';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "narayaaana11@gmail.com",
    href: "mailto:narayaaana11@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-630-125-3789",
    href: "tel:+916301253789"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Andhra Pradesh, India",
    href: "#"
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Narayaaana11",
    color: "hover:text-foreground"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/narayaaana/",
    color: "hover:text-accent-blue"
  },
  {
    icon: ExternalLink,
    label: "Portfolio",
    href: "#",
    color: "hover:text-primary"
  }
];

export function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate EmailJS configuration
      const configValidation = validateEmailJSConfig();
      
      if (!configValidation.isValid) {
        console.error('EmailJS configuration is missing:', configValidation.missingVars);
        toast({
          title: "Configuration Error",
          description: "Email service is not properly configured. Please contact me directly.",
          variant: "destructive",
        });
        return;
      }

      // Initialize EmailJS with your public key
      emailjs.init(configValidation.config.publicKey);

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'Contact Form Submission',
        message: formData.message,
        to_email: 'narayaaana11@gmail.com', // Your email
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        configValidation.config.serviceId,
        configValidation.config.templateId,
        templateParams
      );

      console.log('Email sent successfully:', result);

      // Reset form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      toast({
        title: "Error Sending Message",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8 lg:pl-32">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate or discuss opportunities? I'd love to hear from you. 
            Let's connect and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you have a project in mind, want to discuss collaboration opportunities, 
                or simply want to say hello, I'm always excited to connect with fellow developers, 
                potential clients, and interesting people from the tech community.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((contact) => {
                const Icon = contact.icon;
                return (
                  <Card key={contact.label} className="p-4 glass border-0 shadow-card hover:shadow-glow transition-all duration-300 group">
                    <a 
                      href={contact.href}
                      className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{contact.label}</div>
                        <div className="text-sm">{contact.value}</div>
                      </div>
                    </a>
                  </Card>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="sm"
                      asChild
                      className={`glass h-12 w-12 rounded-lg transition-all duration-300 ${social.color}`}
                    >
                      <a 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <Card className="p-6 glass border-0 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <h4 className="font-semibold">Currently Available</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                I'm actively seeking new opportunities and open to freelance projects. 
                Response time: Usually within 24 hours.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-accent/20 rounded">Full-time Roles</span>
                <span className="text-xs px-2 py-1 bg-accent/20 rounded">Freelance Projects</span>
                <span className="text-xs px-2 py-1 bg-accent/20 rounded">Collaborations</span>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 glass border-0 shadow-card animate-slide-in-right">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="glass border-border/50 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="glass border-border/50 focus:border-primary/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="glass border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or idea..."
                  rows={5}
                  required
                  className="glass border-border/50 focus:border-primary/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By sending this message, you agree that I may contact you regarding your inquiry.
              </p>
            </form>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-sm text-muted-foreground">
                I typically respond to emails within 24 hours during business days. 
                For urgent matters, feel free to call.
              </p>
            </Card>
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-2">Project Collaboration</h4>
              <p className="text-sm text-muted-foreground">
                I'm open to both short-term projects and long-term collaborations. 
                Let's discuss your requirements and timeline.
              </p>
            </Card>
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-2">Technology Stack</h4>
              <p className="text-sm text-muted-foreground">
                Specialized in modern web technologies including React, Node.js, 
                Python, and cloud platforms. Always learning new technologies.
              </p>
            </Card>
            <Card className="p-6 glass border-0 shadow-card">
              <h4 className="font-semibold mb-2">Location & Remote Work</h4>
              <p className="text-sm text-muted-foreground">
                Based in Andhra Pradesh, India. Open to remote work opportunities 
                and occasional travel for the right projects.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}