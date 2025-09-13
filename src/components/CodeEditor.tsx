import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, RotateCcw, Save, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onRun?: (code: string) => void;
}

const CodeEditor = ({ initialCode = "", language = "javascript", onRun }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setErrors([]);
    
    // Simulate code execution and analysis
    setTimeout(() => {
      try {
        // Simple JavaScript evaluation for demo
        if (language === "javascript") {
          const result = eval(code);
          setOutput(String(result));
          onRun?.(code);
        }
      } catch (error) {
        setErrors([error instanceof Error ? error.message : "Unknown error"]);
        setOutput("Error occurred during execution");
      }
      setIsRunning(false);
    }, 1000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setErrors([]);
  };

  const formatCode = (text: string) => {
    // Simple syntax highlighting simulation
    return text
      .replace(/(function|const|let|var|if|else|for|while|return)/g, '<span class="syntax-keyword">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="syntax-string">$1</span>')
      .replace(/(\d+)/g, '<span class="syntax-number">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>');
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Code Editor</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="code" size="sm">
            <Save className="h-4 w-4" />
          </Button>
          <Button 
            variant="success" 
            size="sm" 
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="h-4 w-4" />
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              {language.toUpperCase()}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-code-bg border border-code-border rounded-lg resize-none font-code text-sm focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Write your code here..."
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Output
            </div>
            <div className="h-32 p-4 bg-code-bg border border-code-border rounded-lg font-code text-sm overflow-auto">
              {output || "Run your code to see output..."}
            </div>

            {errors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <XCircle className="h-4 w-4" />
                  Errors Detected
                </div>
                <div className="space-y-1">
                  {errors.map((error, index) => (
                    <div key={index} className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                Analysis & Suggestions
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-3 w-3" />
                  Syntax is valid
                </div>
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-3 w-3" />
                  Consider adding error handling
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-3 w-3" />
                  Code follows best practices
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CodeEditor;