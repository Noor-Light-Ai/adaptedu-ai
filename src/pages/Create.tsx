
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import CourseForm, { CourseFormData } from '@/components/CourseForm';
import CoursePreview, { CourseSection } from '@/components/CoursePreview';
import { supabase } from '@/integrations/supabase/client';

const Create = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfTextContent, setPdfTextContent] = useState<string>('');
  const [pdfAnalysis, setPdfAnalysis] = useState<any>(null);
  const [generatedCourse, setGeneratedCourse] = useState<null | {
    title: string;
    description: string;
    sections: CourseSection[];
    estimatedDuration: string;
    learningObjectives: string[];
  }>(null);
  const [formData, setFormData] = useState<CourseFormData | null>(null);
  
  const handleFileUpload = async (file: File, textContent: string) => {
    setUploadedFile(file);
    setPdfTextContent(textContent);
    setIsFileUploaded(true);
    
    try {
      toast.info('Analyzing PDF content...', { duration: 3000 });
      
      // Call the edge function to analyze the PDF
      const { data, error } = await supabase.functions.invoke('analyze-pdf', {
        body: { 
          pdfContent: textContent,
          prompt: "Analyze this PDF content and extract key information",
          options: {
            includeQuizzes: true,
            includeAssignments: false,
            includeImages: true
          }
        }
      });
      
      if (error) {
        console.error('Error analyzing PDF:', error);
        toast.error('Error analyzing PDF content');
        return;
      }
      
      setPdfAnalysis(data);
      toast.success('PDF analysis complete!');
    } catch (error) {
      console.error('Error during PDF analysis:', error);
      toast.error('Failed to analyze PDF');
    }
  };
  
  const handleFormSubmit = async (data: CourseFormData) => {
    setFormData(data);
    setIsGenerating(true);
    
    try {
      // Call the edge function to generate course content
      const { data: courseData, error } = await supabase.functions.invoke('generate-course', {
        body: {
          pdfText: pdfTextContent,
          analysis: pdfAnalysis,
          formData: data
        }
      });
      
      if (error) {
        console.error('Error generating course:', error);
        toast.error('Failed to generate course. Please try again.');
        setIsGenerating(false);
        return;
      }
      
      setGeneratedCourse(courseData);
      setCurrentStep(2);
      toast.success('Course generated successfully!');
    } catch (error) {
      console.error('Error generating course:', error);
      toast.error('Failed to generate course. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handlePublish = () => {
    // In a real implementation, this would save the course to the user's library
    toast.success('Course published to your library!');
    navigate('/dashboard');
  };
  
  const getStepIcon = (step: number, currentStep: number) => {
    if (step < currentStep) {
      return <Check className="h-5 w-5" />;
    }
    return <span>{step}</span>;
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="container max-w-6xl mx-auto pt-28 px-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Create New Course
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload a PDF and let AI transform it into a structured course
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${currentStep >= 1 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {getStepIcon(1, currentStep)}
              </div>
              <div className={`w-24 h-1 mx-2 
                ${currentStep >= 2 
                  ? 'bg-blue-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                ${currentStep >= 2 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {getStepIcon(2, currentStep)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-2">
            <div className="text-center w-36">
              <p className={`text-sm font-medium 
                ${currentStep >= 1 
                  ? 'text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Content Upload
              </p>
            </div>
            <div className="text-center w-36">
              <p className={`text-sm font-medium 
                ${currentStep >= 2 
                  ? 'text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Preview & Publish
              </p>
            </div>
          </div>
        </div>
        
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upload Content</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upload a PDF file to extract content
                      </p>
                    </div>
                  </div>
                  
                  <FileUploader onFileUpload={handleFileUpload} />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Course Options</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Customize how your course will be generated
                      </p>
                    </div>
                  </div>
                  
                  <CourseForm 
                    onSubmit={handleFormSubmit} 
                    isLoading={isGenerating}
                    isFileUploaded={isFileUploaded}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <img 
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efd?q=80&w=2070&auto=format&fit=crop" 
                  alt="Course creation illustration" 
                  className="rounded-lg object-cover h-[600px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Transform Your Knowledge</h3>
                  <p className="text-white/80">
                    Your PDF will be processed and structured into an engaging course with sections, quizzes, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 2 && generatedCourse && formData && (
          <div>
            <CoursePreview 
              course={generatedCourse} 
              useTts={formData.useTts}
              onPublish={handlePublish}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
