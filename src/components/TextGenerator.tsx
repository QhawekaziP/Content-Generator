import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Copy, FileText } from "lucide-react";

const TextGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setGeneratedText(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedText(data.text);
      toast.success("Text generated successfully!");
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    
    navigator.clipboard.writeText(generatedText);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">What would you like to write about?</label>
        <Textarea
          placeholder="Write a blog post about sustainable living..."
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
            <FileText className="mr-2 h-5 w-5" />
            Generate Text
          </>
        )}
      </Button>

      {generatedText && (
        <div className="space-y-4 animate-in fade-in-50 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Generated Content</h3>
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
          <div className="p-4 rounded-lg bg-secondary/20 border border-border/50">
            <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
              {generatedText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
