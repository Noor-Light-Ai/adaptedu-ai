
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import CoursePreviewHeader from './CoursePreview/CoursePreviewHeader';
import CourseCoverPage from './CoursePreview/CourseCoverPage';
import CourseContentPage from './CoursePreview/CourseContentPage';
import CoursePreviewFooter from './CoursePreview/CoursePreviewFooter';

export interface CourseSection {
  id: string;
  type: 'header' | 'subheader' | 'paragraph' | 'image' | 'quiz' | 'assignment';
  content: string;
  options?: string[];
  answer?: number;
}

interface CourseData {
  title: string;
  description: string;
  sections: CourseSection[];
  estimatedDuration: string;
  learningObjectives: string[];
  coverImage?: string;
}

interface CoursePreviewProps {
  course: CourseData;
  useTts: boolean;
  onPublish: () => Promise<void> | void;
}

interface QuizState {
  [sectionId: string]: {
    selectedAnswer?: number;
    showAnswer: boolean;
  };
}

const CoursePreview = ({ course, useTts, onPublish }: CoursePreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizState>({});
  const previewRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const totalSections = course.sections.length;
  const sectionsPerPage = 3;
  const contentPages = Math.ceil(totalSections / sectionsPerPage);
  const totalPages = contentPages + 1;

  const quizCount = course.sections.filter(s => s.type === 'quiz').length;
  const assignmentCount = course.sections.filter(s => s.type === 'assignment').length;

  // Initialize quiz state for all quiz sections
  useEffect(() => {
    const quizState: QuizState = {};
    course.sections.forEach(section => {
      if (section.type === 'quiz') {
        quizState[section.id] = {
          selectedAnswer: undefined,
          showAnswer: false
        };
      }
    });
    setQuizAnswers(quizState);
  }, [course.sections]);

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = 0;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [currentPage]);

  const handleAnswerSelect = (sectionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        selectedAnswer: answerIndex
      }
    }));
  };

  const handleCheckAnswer = (sectionId: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        showAnswer: true
      }
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getSectionsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * sectionsPerPage;
    const endIndex = Math.min(startIndex + sectionsPerPage, totalSections);
    return course.sections.slice(startIndex, endIndex);
  };

  const getTextContentForCurrentPage = () => {
    if (currentPage === 0) {
      return '';
    }
    
    const sectionsToRead = getSectionsForCurrentPage()
      .filter(section => ['header', 'subheader', 'paragraph'].includes(section.type))
      .map(section => section.content)
      .join('. ');
    
    return sectionsToRead;
  };

  const handlePublishCourse = async () => {
    try {
      setIsPublishing(true);
      await onPublish();
    } catch (error) {
      console.error('Error publishing course:', error);
      toast.error('Failed to publish course. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <CoursePreviewHeader 
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      <div 
        ref={previewRef}
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 300px)', minHeight: '600px' }}
      >
        {currentPage === 0 ? (
          <CourseCoverPage 
            title={course.title}
            description={course.description}
            estimatedDuration={course.estimatedDuration}
            learningObjectives={course.learningObjectives}
            coverImage={course.coverImage}
            quizCount={quizCount}
            assignmentCount={assignmentCount}
          />
        ) : (
          <CourseContentPage 
            sections={getSectionsForCurrentPage()} 
            quizAnswers={quizAnswers}
            onAnswerSelect={handleAnswerSelect}
            onCheckAnswer={handleCheckAnswer}
          />
        )}
      </div>

      <CoursePreviewFooter 
        currentPage={currentPage}
        totalPages={totalPages}
        useTts={useTts}
        isPublishing={isPublishing}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPublish={handlePublishCourse}
        isCourseCoverPage={currentPage === 0}
        courseTitle={course.title}
        courseDescription={course.description}
        learningObjectives={course.learningObjectives}
        sectionsToRead={getTextContentForCurrentPage()}
      />
    </div>
  );
};

export default CoursePreview;
