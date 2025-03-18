import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import CoursePreview, { CourseSection } from '@/components/CoursePreview';
import VoiceAssistant from '@/components/VoiceAssistant';
import Header from '@/components/Header';

interface Course {
  id: string;
  title: string;
  description: string;
  sections: CourseSection[];
  estimatedDuration: string;
  learningObjectives: string[];
  coverImage?: string;
  created_at: string;
}

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [assistantMessage, setAssistantMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        setTimeout(() => {
          setCourse({
            id: id || '1',
            title: 'Introduction to Machine Learning',
            description: 'Learn the fundamentals of machine learning and AI',
            estimatedDuration: '2 hours',
            learningObjectives: [
              'Understand basic machine learning concepts',
              'Identify different types of learning algorithms',
              'Apply simple machine learning models to real-world problems',
              'Evaluate model performance and accuracy'
            ],
            sections: [
              { id: 's1', type: 'header', content: 'Introduction to Machine Learning' },
              { id: 's2', type: 'paragraph', content: 'Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. The focus is on developing computer programs that can access data and learn from it.' },
              { id: 's3', type: 'image', content: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070' },
              
              { id: 's4', type: 'header', content: 'Types of Machine Learning' },
              { id: 's5', type: 'paragraph', content: 'There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Each serves different purposes and is suitable for different types of problems.' },
              { id: 's6', type: 'subheader', content: 'Supervised Learning' },
              
              { id: 's7', type: 'paragraph', content: 'Supervised learning involves training a model on a labeled dataset, which means we have both input data and output labels. The algorithm learns to map inputs to outputs based on example input-output pairs.' },
              { id: 's8', type: 'quiz', content: 'Which of the following is NOT a type of machine learning?', options: ['Supervised Learning', 'Unsupervised Learning', 'Determined Learning', 'Reinforcement Learning'], answer: 2 },
              { id: 's9', type: 'subheader', content: 'Unsupervised Learning' },
              
              { id: 's10', type: 'paragraph', content: 'Unsupervised learning involves training a model on unlabeled data. The algorithm tries to learn patterns and relationships in the data without any guidance.' },
              { id: 's11', type: 'subheader', content: 'Reinforcement Learning' },
              { id: 's12', type: 'paragraph', content: 'Reinforcement learning involves training a model to make a sequence of decisions. The algorithm learns to achieve a goal in an uncertain, complex environment.' },
              
              { id: 's13', type: 'assignment', content: 'Research and write a short report (500 words) on a real-world application of machine learning that interests you. Describe the problem being solved, the type of machine learning approach used, and why it was effective.' },
              { id: 's14', type: 'header', content: 'Machine Learning Algorithms' },
              { id: 's15', type: 'paragraph', content: 'There are many different machine learning algorithms, each with their own strengths and weaknesses. Some common algorithms include decision trees, neural networks, support vector machines, and k-means clustering.' }
            ],
            created_at: new Date().toISOString()
          });
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course');
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);
  
  const handlePublish = async () => {
    try {
      toast.success('Course published successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error publishing course:', error);
      toast.error('Failed to publish course');
    }
  };
  
  const handleAssistantResponse = (response: string) => {
    setAssistantMessage(response);
    
    setTimeout(() => {
      setAssistantMessage(null);
    }, 10000);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <div className="container max-w-6xl mx-auto pt-28 px-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading course...</p>
          </div>
        ) : course ? (
          <>
            <CoursePreview 
              course={course} 
              useTts={true}
              onPublish={handlePublish}
            />
            
            <VoiceAssistant 
              courseTitle={course.title}
              courseContent={course.sections.map(s => s.content).join('\n')}
              onAssistantResponse={handleAssistantResponse}
            />
            
            {assistantMessage && (
              <div className="fixed bottom-24 right-6 max-w-xs bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in z-40">
                <p className="text-sm">{assistantMessage}</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-yellow-800 dark:text-yellow-300 mb-2">Course Not Found</h2>
            <p className="text-yellow-700 dark:text-yellow-400 mb-4">
              The course you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
