
import { CourseSection } from '../CoursePreview';
import CourseQuizSection from './CourseQuizSection';
import CourseAssignmentSection from './CourseAssignmentSection';

interface CourseSectionRendererProps {
  section: CourseSection;
  quizState?: { selectedAnswer?: number; showAnswer: boolean };
  onAnswerSelect: (sectionId: string, answerIndex: number) => void;
  onCheckAnswer: (sectionId: string) => void;
}

const CourseSectionRenderer = ({ 
  section, 
  quizState, 
  onAnswerSelect, 
  onCheckAnswer 
}: CourseSectionRendererProps) => {
  switch (section.type) {
    case 'header':
      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            {section.content}
          </h2>
        </div>
      );
    case 'subheader':
      return (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {section.content}
          </h3>
        </div>
      );
    case 'paragraph':
      return (
        <div>
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {section.content}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className="my-6">
          <img 
            src={section.content} 
            alt="Course illustration" 
            className="rounded-lg max-h-64 mx-auto"
          />
        </div>
      );
    case 'quiz':
      return (
        <CourseQuizSection 
          section={section} 
          selectedAnswer={quizState?.selectedAnswer} 
          showAnswer={quizState?.showAnswer || false}
          onAnswerSelect={onAnswerSelect}
          onCheckAnswer={onCheckAnswer}
        />
      );
    case 'assignment':
      return <CourseAssignmentSection section={section} />;
    default:
      return null;
  }
};

export default CourseSectionRenderer;
