
import { Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CourseSection } from '../CoursePreview';

interface CourseAssignmentSectionProps {
  section: CourseSection;
}

const CourseAssignmentSection = ({ section }: CourseAssignmentSectionProps) => {
  return (
    <Card className="overflow-hidden border-purple-100 dark:border-purple-900/30">
      <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 border-b border-purple-100 dark:border-purple-900/30">
        <h4 className="font-medium text-purple-700 dark:text-purple-300 flex items-center">
          <Bookmark className="w-4 h-4 mr-2" />
          Practice Assignment
        </h4>
      </div>
      <CardContent className="p-4">
        <p className="text-gray-700 dark:text-gray-200">{section.content}</p>
      </CardContent>
    </Card>
  );
};

export default CourseAssignmentSection;
