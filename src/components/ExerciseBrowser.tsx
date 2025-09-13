import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Star, Clock, CheckCircle, Play } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  rating: number;
  completed: boolean;
  tags: string[];
}

const ExerciseBrowser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const exercises: Exercise[] = [
    {
      id: "1",
      title: "Array Manipulation Basics",
      description: "Learn fundamental array operations including map, filter, and reduce methods.",
      difficulty: "Beginner",
      category: "JavaScript",
      duration: "15 min",
      rating: 4.8,
      completed: true,
      tags: ["arrays", "methods", "basics"]
    },
    {
      id: "2", 
      title: "Async/Await Patterns",
      description: "Master asynchronous JavaScript with promises and async/await syntax.",
      difficulty: "Intermediate",
      category: "JavaScript",
      duration: "25 min",
      rating: 4.9,
      completed: false,
      tags: ["async", "promises", "patterns"]
    },
    {
      id: "3",
      title: "React Component Architecture",
      description: "Build scalable React applications with proper component design patterns.",
      difficulty: "Advanced",
      category: "React",
      duration: "45 min",
      rating: 4.7,
      completed: false,
      tags: ["react", "components", "architecture"]
    },
    {
      id: "4",
      title: "Algorithm: Binary Search",
      description: "Implement and optimize binary search algorithm with various data structures.",
      difficulty: "Intermediate",
      category: "Algorithms",
      duration: "30 min",
      rating: 4.6,
      completed: true,
      tags: ["algorithms", "search", "optimization"]
    }
  ];

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  const categories = ["All", "JavaScript", "React", "Algorithms", "Python", "Data Structures"];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "All" || exercise.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "All" || exercise.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const completionPercentage = (completedCount / exercises.length) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Exercise Browser</h2>
          <p className="text-muted-foreground">Practice coding with interactive exercises</p>
        </div>
        
        <Card className="p-4 lg:w-80">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-semibold">{completedCount}/{exercises.length}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {Math.round(completionPercentage)}% completed
            </p>
          </div>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary/50"
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="p-6 hover:shadow-lg transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`text-${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </Badge>
                    {exercise.completed && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {exercise.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  {exercise.rating}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {exercise.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {exercise.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {exercise.duration}
                </div>
                <Button 
                  variant={exercise.completed ? "success" : "default"} 
                  size="sm"
                  className="gap-2"
                >
                  <Play className="h-3 w-3" />
                  {exercise.completed ? "Review" : "Start"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-2">
            <Filter className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">No exercises found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ExerciseBrowser;