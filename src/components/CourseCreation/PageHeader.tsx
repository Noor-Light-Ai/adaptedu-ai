
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        Create New Course
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Upload a PDF and let AI transform it into a structured course
      </p>
    </div>
  );
};

export default PageHeader;
