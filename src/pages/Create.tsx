
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import PageHeader from '@/components/CourseCreation/PageHeader';
import StepNavigation from '@/components/CourseCreation/StepNavigation';
import ContentUpload from '@/components/CourseCreation/ContentUpload';
import CourseOptions from '@/components/CourseCreation/CourseOptions';
import CoursePreview from '@/components/CoursePreview';
import { CourseFormData } from '@/components/CourseForm';
import { 
  GeneratedCourse, 
  analyzePdf, 
  generateCourse, 
  publishCourse 
} from '@/services/courseService';

const Create = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pdfTextContent, setPdfTextContent] = useState<string>('');
  const [pdfAnalysis, setPdfAnalysis] = useState<any>(null);
  const [generatedCourse, setGeneratedCourse] = useState<null | GeneratedCourse>(null);
  const [formData, setFormData] = useState<CourseFormData | null>(null);
  
  const handleFileUpload = async (file: File, textContent: string) => {
    setUploadedFile(file);
    setPdfTextContent(textContent);
    setIsFileUploaded(true);
    
    try {
      toast.info('Analyzing PDF content...', { duration: 3000 });
      const analysisData = await analyzePdf(textContent);
      setPdfAnalysis(analysisData);
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
      const courseData = await generateCourse(pdfTextContent, pdfAnalysis, data);
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
  
  const handlePublish = async () => {
    if (!generatedCourse) return;

    try {
      await publishCourse(generatedCourse);
      toast.success('Your course has been added to the library successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to publish course');
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Header />
      
      <div className="container max-w-6xl mx-auto pt-28 px-6">
        <PageHeader />
        
        <StepNavigation 
          currentStep={currentStep} 
          totalSteps={2} 
          stepLabels={['Content Upload', 'Preview & Publish']} 
        />
        
        {currentStep === 1 && (
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              <ContentUpload onFileUpload={handleFileUpload} />
              
              <CourseOptions 
                onSubmit={handleFormSubmit} 
                isLoading={isGenerating}
                isFileUploaded={isFileUploaded}
              />
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
