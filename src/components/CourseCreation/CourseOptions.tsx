
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CourseForm, { CourseFormData } from '@/components/CourseForm';

interface CourseOptionsProps {
  onSubmit: (data: CourseFormData) => void;
  isLoading: boolean;
  isFileUploaded: boolean;
}

const CourseOptions = ({ onSubmit, isLoading, isFileUploaded }: CourseOptionsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-medium">Course Options</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Customize how your course will be generated
            </p>
          </div>
        </div>
        
        <CourseForm 
          onSubmit={onSubmit} 
          isLoading={isLoading}
          isFileUploaded={isFileUploaded}
        />
      </CardContent>
    </Card>
  );
};

export default CourseOptions;
