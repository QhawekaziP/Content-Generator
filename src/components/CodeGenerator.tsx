import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Copy, Code } from "lucide-react";

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setGeneratedCode(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedCode(data.code);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedCode) return;
    
    navigator.clipboard.writeText(generatedCode);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Describe the code you need</label>
        <Textarea
          placeholder="Create a React component for a todo list with add and delete functionality..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] bg-background/50 border-border/50 focus:border-primary transition-colors"
          disabled={isLoading}
        />
      </div>

      <Button 
        onClick={handleGenerate} 
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Code className="mr-2 h-5 w-5" />
            Generate Code
          </>
        )}
      </Button>

      {generatedCode && (
        <div className="space-y-4 animate-in fade-in-50 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Generated Code</h3>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/50 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed text-foreground">
              <code>{generatedCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
