
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoursePreviewHeaderProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const CoursePreviewHeader = ({ 
  currentPage, 
  totalPages, 
  onPrevPage, 
  onNextPage 
}: CoursePreviewHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
        <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
        Course Preview
      </h3>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        Page {currentPage + 1} of {totalPages}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevPage}
            disabled={currentPage === 0}
            className="h-7 w-7"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextPage}
            disabled={currentPage === totalPages - 1}
            className="h-7 w-7"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewHeader;
