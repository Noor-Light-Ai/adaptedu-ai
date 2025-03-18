
import { supabase } from '@/integrations/supabase/client';
import { CourseFormData } from '@/components/CourseForm';
import { toast } from 'sonner';

export interface CourseSection {
  id: string;
  type: 'header' | 'subheader' | 'paragraph' | 'image' | 'quiz' | 'assignment';
  content: string;
  options?: string[];
  answer?: number;
}

export interface GeneratedCourse {
  title: string;
  description: string;
  sections: CourseSection[];
  estimatedDuration: string;
  learningObjectives: string[];
  coverImage?: string;
}

export const analyzePdf = async (textContent: string): Promise<any> => {
  try {
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
      throw new Error(error.message || 'Error analyzing PDF content');
    }
    
    return data;
  } catch (error) {
    console.error('Error during PDF analysis:', error);
    throw error;
  }
};

export const generateCourse = async (
  pdfTextContent: string,
  pdfAnalysis: any,
  formData: CourseFormData
): Promise<GeneratedCourse> => {
  try {
    const { data: courseData, error } = await supabase.functions.invoke('generate-course', {
      body: {
        pdfText: pdfTextContent,
        analysis: pdfAnalysis,
        formData: formData
      }
    });
    
    if (error) {
      console.error('Error generating course:', error);
      throw new Error(error.message || 'Failed to generate course');
    }
    
    return courseData;
  } catch (error) {
    console.error('Error generating course:', error);
    throw error;
  }
};

export const publishCourse = async (generatedCourse: GeneratedCourse): Promise<void> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user || !user.user) {
      throw new Error('You must be logged in to publish a course');
    }
    
    // Convert GeneratedCourse to JSON-compatible object
    const courseContent = JSON.parse(JSON.stringify(generatedCourse));
    
    const courseData = {
      user_id: user.user.id,
      title: generatedCourse.title,
      description: generatedCourse.description,
      cover_image: generatedCourse.coverImage || 'https://images.unsplash.com/photo-1571260899304-425eee4c7efd?q=80&w=2070&auto=format&fit=crop',
      duration: generatedCourse.estimatedDuration,
      sections: generatedCourse.sections.length,
      content: courseContent // Use the JSON-stringified and parsed object
    };
    
    console.log('Publishing course with data:', courseData);
    
    const { data, error } = await supabase
      .from('courses')
      .insert(courseData)
      .select()
      .single();
    
    if (error) {
      console.error('Error saving course:', error);
      throw new Error('Failed to save course to library: ' + error.message);
    }
    
    console.log('Course published successfully:', data);
  } catch (error) {
    console.error('Error publishing course:', error);
    throw error;
  }
};
