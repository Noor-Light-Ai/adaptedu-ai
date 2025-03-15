
import { useState } from 'react';
import { BookOpen, Check, HelpCircle, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface CourseFormData {
  prompt: string;
  includeQuizzes: boolean;
  includeAssignments: boolean;
  includeImages: boolean;
  useTts: boolean;
}

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  isLoading: boolean;
  isFileUploaded: boolean;
}

const examplePrompts = [
  "Create a beginner-friendly introduction to machine learning",
  "Develop a comprehensive guide to digital marketing for small businesses",
  "Design a step-by-step tutorial on web development fundamentals"
];

const CourseForm = ({ onSubmit, isLoading, isFileUploaded }: CourseFormProps) => {
  const [formData, setFormData] = useState<CourseFormData>({
    prompt: "",
    includeQuizzes: true,
    includeAssignments: false,
    includeImages: true,
    useTts: true
  });

  const handleChange = (field: keyof CourseFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleExampleClick = (prompt: string) => {
    setFormData(prev => ({ ...prev, prompt }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="prompt" className="text-sm font-medium">
            Course Instructions
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Describe what you want to create. Be specific about course level, 
                   learning objectives, and main topics.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="prompt"
          placeholder="e.g., Create a beginner-friendly introduction to machine learning"
          value={formData.prompt}
          onChange={(e) => handleChange('prompt', e.target.value)}
          className="min-h-[120px] resize-none"
        />
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-muted-foreground">Example prompts:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(prompt)}
                className="text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-quizzes" className="text-sm">Include quizzes</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add knowledge check quizzes throughout the course</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="include-quizzes"
            checked={formData.includeQuizzes}
            onCheckedChange={(checked) => handleChange('includeQuizzes', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-assignments" className="text-sm">Include assignments</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add practical exercises or assignments to apply knowledge</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="include-assignments"
            checked={formData.includeAssignments}
            onCheckedChange={(checked) => handleChange('includeAssignments', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="include-images" className="text-sm">Include images</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add relevant images to enhance visual learning</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="include-images"
            checked={formData.includeImages}
            onCheckedChange={(checked) => handleChange('includeImages', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="use-tts" className="text-sm">Enable AI voice narration</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate AI voice narration for the course content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Switch
            id="use-tts"
            checked={formData.useTts}
            onCheckedChange={(checked) => handleChange('useTts', checked)}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full gap-2" 
        disabled={!isFileUploaded || formData.prompt.trim().length < 10 || isLoading}
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
            Generating Course...
          </>
        ) : (
          <>
            <BookOpen className="h-4 w-4" />
            Generate Course
          </>
        )}
      </Button>
    </form>
  );
};

export default CourseForm;
