
import { ChevronLeft, ChevronRight, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CourseAudioPlayer from './CourseAudioPlayer';

interface CoursePreviewFooterProps {
  currentPage: number;
  totalPages: number;
  useTts: boolean;
  isPublishing: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPublish: () => Promise<void>;
  // Audio props
  isCourseCoverPage: boolean;
  courseTitle: string;
  courseDescription: string;
  learningObjectives: string[];
  sectionsToRead: string;
}

const CoursePreviewFooter = ({
  currentPage,
  totalPages,
  useTts,
  isPublishing,
  onPrevPage,
  onNextPage,
  onPublish,
  isCourseCoverPage,
  courseTitle,
  courseDescription,
  learningObjectives,
  sectionsToRead
}: CoursePreviewFooterProps) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        {useTts && (
          <CourseAudioPlayer
            currentPage={currentPage}
            isCourseCoverPage={isCourseCoverPage}
            courseTitle={courseTitle}
            courseDescription={courseDescription}
            learningObjectives={learningObjectives}
            sectionsToRead={sectionsToRead}
          />
        )}
      </div>

      <Button 
        onClick={onPublish}
        className="gap-2"
        disabled={isPublishing}
      >
        {isPublishing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Bookmark className="h-4 w-4" />
            Publish Course
          </>
        )}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={currentPage === totalPages - 1}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default CoursePreviewFooter;
