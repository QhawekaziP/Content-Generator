import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Copy, Share2 } from "lucide-react";

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
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
        body: { prompt, language },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setGeneratedCode(data.code);
      toast.success("Code generated");
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
    toast.success("Copied");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Select programming language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="csharp">C#</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="php">PHP</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="swift">Swift</SelectItem>
            <SelectItem value="kotlin">Kotlin</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="Describe the code you need..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
          disabled={isLoading}
        />
      </div>

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
          "Generate Code"
        )}
      </Button>

      {generatedCode && (
        <div className="space-y-3 animate-in fade-in-50 duration-300">
          <div className="p-4 rounded border bg-muted/20 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code>{generatedCode}</code>
            </pre>
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
                  window.open('https://www.facebook.com/sharer/sharer.php', '_blank');
                  toast.success("Opening Facebook - paste your code there");
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
                  toast.success("Opening LinkedIn - paste your code there");
                }}
                variant="outline"
                size="sm"
              >
                <Share2 className="mr-2 h-4 w-4" />
                LI
              </Button>
              <Button
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my generated code!')}`, '_blank');
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

export default CodeGenerator;
