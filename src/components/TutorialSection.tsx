import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, BookOpen, PlayCircle, CheckCircle, Code } from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  code?: string;
  type: "explanation" | "code" | "interactive";
}

const TutorialSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const tutorial: TutorialStep[] = [
    {
      id: 1,
      title: "Introduction to Variables",
      content: "Variables are containers that store data values. In JavaScript, you can declare variables using let, const, or var keywords.",
      code: "let message = 'Hello, World!';\nconst pi = 3.14159;\nvar count = 0;",
      type: "explanation"
    },
    {
      id: 2,
      title: "Working with Functions",
      content: "Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.",
      code: "function greetUser(name) {\n  return `Hello, ${name}!`;\n}\n\nconst result = greetUser('Alice');\nconsole.log(result);",
      type: "code"
    },
    {
      id: 3,
      title: "Interactive Challenge",
      content: "Now it's your turn! Try creating a function that calculates the area of a rectangle.",
      code: "// Your task: Create a function called calculateArea\n// It should take width and height as parameters\n// Return the area (width * height)\n\nfunction calculateArea(width, height) {\n  // Write your code here\n}\n\n// Test your function\nconsole.log(calculateArea(5, 3)); // Should output: 15",
      type: "interactive"
    },
    {
      id: 4,
      title: "Arrays and Loops",
      content: "Arrays store multiple values in a single variable. Loops help you iterate through array elements efficiently.",
      code: "const fruits = ['apple', 'banana', 'orange'];\n\n// Using for loop\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}\n\n// Using forEach method\nfruits.forEach(fruit => {\n  console.log(fruit);\n});",
      type: "explanation"
    }
  ];

  const progress = ((currentStep + 1) / tutorial.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorial.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
  };

  const currentTutorialStep = tutorial[currentStep];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interactive Tutorial</h2>
          <p className="text-muted-foreground">Step-by-step coding lessons</p>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {tutorial.length}
          </span>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{currentTutorialStep.title}</h3>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="w-32 h-2" />
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% complete
                </span>
              </div>
            </div>
            {completedSteps.has(currentStep) && (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-foreground">{currentTutorialStep.content}</p>
          </div>

          {currentTutorialStep.code && (
            <Card className="p-4 bg-code-bg border-code-border">
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Code Example</span>
                {currentTutorialStep.type === "interactive" && (
                  <Button variant="code" size="sm" className="ml-auto">
                    <PlayCircle className="h-3 w-3 mr-1" />
                    Try it
                  </Button>
                )}
              </div>
              <pre className="font-code text-sm overflow-x-auto">
                <code 
                  dangerouslySetInnerHTML={{
                    __html: currentTutorialStep.code
                      .replace(/(function|const|let|var|if|else|for|while|return)/g, '<span class="syntax-keyword">$1</span>')
                      .replace(/('.*?'|".*?")/g, '<span class="syntax-string">$1</span>')
                      .replace(/(\d+)/g, '<span class="syntax-number">$1</span>')
                      .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
                  }}
                />
              </pre>
            </Card>
          )}

          {currentTutorialStep.type === "interactive" && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircle className="h-4 w-4 text-warning" />
                <span className="text-sm font-semibold text-warning">Interactive Challenge</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete the code above to solve this challenge. Test your solution and move to the next step.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!completedSteps.has(currentStep) && (
                <Button variant="success" onClick={handleStepComplete}>
                  <CheckCircle className="h-4 w-4" />
                  Mark Complete
                </Button>
              )}
              <Button
                variant="default"
                onClick={handleNext}
                disabled={currentStep === tutorial.length - 1}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tutorial.map((step, index) => (
          <Card
            key={step.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              index === currentStep ? 'ring-2 ring-primary' : ''
            } ${
              completedSteps.has(index) ? 'bg-success/10 border-success/20' : ''
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                completedSteps.has(index) 
                  ? 'bg-success text-success-foreground' 
                  : index === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {completedSteps.has(index) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{step.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{step.type}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TutorialSection;