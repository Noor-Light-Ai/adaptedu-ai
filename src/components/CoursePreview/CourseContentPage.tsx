
import CourseSectionRenderer from './CourseSectionRenderer';
import { CourseSection } from '../CoursePreview';

interface CourseContentPageProps {
  sections: CourseSection[];
}

const CourseContentPage = ({ sections }: CourseContentPageProps) => {
  return (
    <div className="space-y-8 min-h-[600px] p-6 animate-fade-in">
      {sections.map((section, index) => (
        <div key={section.id} className="animate-fade-up" style={{ animationDelay: `${index * 150}ms` }}>
          <CourseSectionRenderer section={section} />
        </div>
      ))}
    </div>
  );
};

export default CourseContentPage;
