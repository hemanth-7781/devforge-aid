import { Button } from "@/components/ui/button";
import { Code, BookOpen, Target, Trophy, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">CodeMaster</h1>
              <p className="text-xs text-muted-foreground">Learn. Code. Excel.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Tutorials
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Target className="h-4 w-4" />
              Exercises
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Code className="h-4 w-4" />
              Playground
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Trophy className="h-4 w-4" />
              Progress
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;