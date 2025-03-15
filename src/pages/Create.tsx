
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

// Mock data and functions for demo
const mockCourseGeneration = (formData: CourseFormData) => {
  return new Promise<{
    title: string;
    description: string;
    sections: CourseSection[];
    estimatedDuration: string;
    learningObjectives: string[];
  }>((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve({
        title: "Introduction to Machine Learning Concepts",
        description: "A beginner-friendly guide to understanding the fundamentals of machine learning, including key algorithms, practical applications, and implementation basics.",
        estimatedDuration: "1.5 hours",
        learningObjectives: [
          "Understand the core concepts and terminology of machine learning",
          "Identify different types of machine learning algorithms and their use cases",
          "Recognize how machine learning is applied in real-world situations",
          "Develop a basic understanding of the machine learning workflow"
        ],
        sections: [
          {
            id: "s1",
            type: "header",
            content: "Introduction to Machine Learning"
          },
          {
            id: "s2",
            type: "paragraph",
            content: "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The focus is on developing computer programs that can access data and use it to learn for themselves."
          },
          {
            id: "s3",
            type: "paragraph",
            content: "The process of learning begins with observations or data, such as examples, direct experience, or instruction. It looks for patterns in data so that later decisions can be made based on the examples that we provide. The primary aim is to allow computers to learn automatically without human intervention or assistance and adjust actions accordingly."
          },
          {
            id: "s4",
            type: "header",
            content: "Types of Machine Learning"
          },
          {
            id: "s5",
            type: "subheader",
            content: "Supervised Learning"
          },
          {
            id: "s6",
            type: "paragraph",
            content: "Supervised learning is where you have input variables (x) and an output variable (y) and you use an algorithm to learn the mapping function from the input to the output. The goal is to approximate the mapping function so well that when you have new input data (x), you can predict the output variables (y) for that data."
          },
          {
            id: "s7",
            type: "image",
            content: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: "s8",
            type: "subheader",
            content: "Unsupervised Learning"
          },
          {
            id: "s9",
            type: "paragraph",
            content: "Unsupervised learning is where you only have input data (x) and no corresponding output variables. The goal for unsupervised learning is to model the underlying structure or distribution in the data in order to learn more about the data."
          },
          {
            id: "s10",
            type: "quiz",
            content: "Which type of machine learning uses labeled data to train algorithms?",
            options: [
              "Unsupervised Learning",
              "Supervised Learning",
              "Reinforcement Learning",
              "Semi-supervised Learning"
            ],
            answer: 1
          },
          {
            id: "s11",
            type: "header",
            content: "Common Machine Learning Algorithms"
          },
          {
            id: "s12",
            type: "paragraph",
            content: "Machine learning algorithms are the engines of machine learning, meaning it is the algorithms that turn a data set into a model. Which algorithm works best depends on the type of problem you're solving, the computing resources available, and the nature of the data."
          },
          {
            id: "s13",
            type: "subheader",
            content: "Linear Regression"
          },
          {
            id: "s14",
            type: "paragraph",
            content: "Linear regression is perhaps one of the most well-known and well-understood algorithms in statistics and machine learning. Predictive modeling is primarily concerned with minimizing the error of a model or making the most accurate predictions possible, at the expense of explainability."
          },
          {
            id: "s15",
            type: "assignment",
            content: "Research and write a brief summary (250-300 words) of a real-world application that uses linear regression. Include what data is being used, what is being predicted, and why linear regression is an appropriate choice for this application."
          }
        ]
      });
    }, 3000);
  });
};

const Create = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedCourse, setGeneratedCourse] = useState<null | {
    title: string;
    description: string;
    sections: CourseSection[];
    estimatedDuration: string;
    learningObjectives: string[];
  }>(null);
  const [formData, setFormData] = useState<CourseFormData | null>(null);
  
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsFileUploaded(true);
  };
  
  const handleFormSubmit = async (data: CourseFormData) => {
    setFormData(data);
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would call an AI API with the PDF file and form data
      const courseData = await mockCourseGeneration(data);
      setGeneratedCourse(courseData);
      setCurrentStep(2);
      toast.success('Course generated successfully!');
    } catch (error) {
      toast.error('Failed to generate course. Please try again.');
      console.error('Error generating course:', error);
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
