import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ImageGenerator from "@/components/ImageGenerator";
import TextGenerator from "@/components/TextGenerator";
import CodeGenerator from "@/components/CodeGenerator";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, hsl(270 100% 70% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(220 100% 65% / 0.15) 0%, transparent 50%)'
        }} />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-glow">
              Content Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate stunning images, engaging text, and production-ready code with AI
            </p>
          </div>

          {/* Generator Tabs */}
          <Card className="max-w-5xl mx-auto backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                <TabsTrigger value="image" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Images
                </TabsTrigger>
                <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Text
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Code
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="image" className="mt-0">
                  <ImageGenerator />
                </TabsContent>
                
                <TabsContent value="text" className="mt-0">
                  <TextGenerator />
                </TabsContent>
                
                <TabsContent value="code" className="mt-0">
                  <CodeGenerator />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
