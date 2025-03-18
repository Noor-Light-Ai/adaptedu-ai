
import CourseSectionRenderer from './CourseSectionRenderer';
import { CourseSection } from '../CoursePreview';

interface CourseContentPageProps {
  sections: CourseSection[];
  quizAnswers: Record<string, { selectedAnswer?: number; showAnswer: boolean }>;
  onAnswerSelect: (sectionId: string, answerIndex: number) => void;
  onCheckAnswer: (sectionId: string) => void;
}

const CourseContentPage = ({ 
  sections, 
  quizAnswers, 
  onAnswerSelect, 
  onCheckAnswer 
}: CourseContentPageProps) => {
  return (
    <div className="space-y-8 min-h-[600px] p-6 animate-fade-in">
      {sections.map((section, index) => (
        <div key={section.id} className="animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
          <CourseSectionRenderer 
            section={section} 
            quizState={quizAnswers[section.id]} 
            onAnswerSelect={onAnswerSelect}
            onCheckAnswer={onCheckAnswer}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseContentPage;
