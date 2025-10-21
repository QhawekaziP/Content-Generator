import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ImageGenerator from "@/components/ImageGenerator";
import TextGenerator from "@/components/TextGenerator";
import CodeGenerator from "@/components/CodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-3 text-foreground tracking-tight">
            Content Generator
          </h1>
          <p className="text-muted-foreground">
            AI-powered creation tools
          </p>
        </div>

        <Card className="border shadow-sm">
          <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
              <TabsTrigger 
                value="image" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-sm py-2"
              >
                Images
              </TabsTrigger>
              <TabsTrigger 
                value="text" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-sm py-2"
              >
                Text
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-sm py-2"
              >
                Code
              </TabsTrigger>
            </TabsList>
            
            <div className="p-8">
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
  );
};

export default Index;
