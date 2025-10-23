import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Copy, Share2 } from "lucide-react";

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
      toast.success("Text generated");
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
    toast.success("Copied");
  };

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Describe what you want to write..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] resize-none"
        disabled={isLoading}
      />

      <Button 
        onClick={handleGenerate} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating
          </>
        ) : (
          "Generate Text"
        )}
      </Button>

      {generatedText && (
        <div className="space-y-3 animate-in fade-in-50 duration-300">
          <div className="p-4 rounded border bg-muted/20">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">
              {generatedText}
            </p>
          </div>
          <div className="space-y-2">
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <div className="grid grid-cols-4 gap-2">
              <Button
                onClick={() => {
                  window.open('https://www.instagram.com/', '_blank');
                  toast.success("Opening Instagram");
                }}
                variant="outline"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                IG
              </Button>
              <Button
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(generatedText || '')}`, '_blank');
                  toast.success("Opening Facebook");
                }}
                variant="outline"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                FB
              </Button>
              <Button
                onClick={() => {
                  window.open('https://www.linkedin.com/feed/', '_blank');
                  toast.success("Opening LinkedIn - paste your text there");
                }}
                variant="outline"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                LI
              </Button>
              <Button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(generatedText || '')}`, '_blank');
                  toast.success("Opening X");
                }}
                variant="outline"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                X
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
