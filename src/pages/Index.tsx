import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ExerciseBrowser from "@/components/ExerciseBrowser";
import TutorialSection from "@/components/TutorialSection";
import ProgressTracker from "@/components/ProgressTracker";
import { Play, Code, BookOpen, Target, Trophy, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-coding.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("playground");

  const features = [
    {
      icon: Code,
      title: "Interactive Code Editor",
      description: "Write, test, and debug code with real-time analysis and suggestions",
      color: "primary"
    },
    {
      icon: Target,
      title: "Smart Exercises",
      description: "Practice with adaptive coding challenges that match your skill level",
      color: "success"
    },
    {
      icon: BookOpen,
      title: "Step-by-Step Tutorials",
      description: "Learn programming concepts through guided interactive lessons",
      color: "warning"
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Monitor your growth with detailed analytics and achievements",
      color: "destructive"
    }
  ];

  const sampleCode = `// Welcome to CodeMaster! 
// Try this sample function:

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(8)); // What will this output?`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                AI-Powered Learning Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">
                Master Programming with{" "}
                <span className="gradient-text">Interactive Learning</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Learn to code with real-time error detection, intelligent debugging suggestions, 
                and personalized exercises that adapt to your skill level.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="gap-2" onClick={() => setActiveTab("playground")}>
                <Play className="h-5 w-5" />
                Start Coding Now
              </Button>
              <Button variant="outline" size="lg" className="gap-2" onClick={() => setActiveTab("tutorials")}>
                <BookOpen className="h-5 w-5" />
                Browse Tutorials
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Everything You Need to Learn Programming</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines the best learning tools with AI-powered assistance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/20 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Platform Interface */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="playground" className="gap-2">
                  <Code className="h-4 w-4" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="exercises" className="gap-2">
                  <Target className="h-4 w-4" />
                  Exercises
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Tutorials
                </TabsTrigger>
                <TabsTrigger value="progress" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Progress
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="playground" className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold">Interactive Code Playground</h2>
                <p className="text-muted-foreground">
                  Write code, get instant feedback, and learn from AI-powered suggestions
                </p>
              </div>
              <CodeEditor 
                initialCode={sampleCode}
                language="javascript"
                onRun={(code) => console.log("Code executed:", code)}
              />
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              <ExerciseBrowser />
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <TutorialSection />
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <ProgressTracker />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-hero/10">
        <div className="container mx-auto text-center">
          <Card className="p-8 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to Start Your Coding Journey?</h2>
                <p className="text-muted-foreground">
                  Join thousands of developers who are mastering programming with CodeMaster
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50 bg-card/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-1 rounded bg-gradient-primary">
              <Code className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold gradient-text">CodeMaster</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CodeMaster. Empowering developers worldwide with interactive learning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;