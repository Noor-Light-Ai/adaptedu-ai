
import { Clock, BookOpen, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CourseCoverPageProps {
  title: string;
  description: string;
  estimatedDuration: string;
  learningObjectives: string[];
  coverImage?: string;
  quizCount: number;
  assignmentCount: number;
}

const CourseCoverPage = ({
  title,
  description,
  estimatedDuration,
  learningObjectives,
  coverImage,
  quizCount,
  assignmentCount
}: CourseCoverPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[600px] p-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl">
        {coverImage && (
          <img
            src={coverImage}
            alt="Course cover"
            className="w-32 h-32 object-cover rounded-xl mb-4"
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          {description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {estimatedDuration}
          </div>
          <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-sm">
            <BookOpen className="w-4 h-4 mr-2" />
            {quizCount} Quizzes
          </div>
          <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full text-sm">
            <Award className="w-4 h-4 mr-2" />
            {assignmentCount} Assignments
          </div>
        </div>
        
        <div className="w-full">
          <h3 className="text-lg font-medium mb-3">Learning Objectives</h3>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-left">
                    <div className="min-w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseCoverPage;
