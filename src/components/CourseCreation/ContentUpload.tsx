
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FileUploader from '@/components/FileUploader';

interface ContentUploadProps {
  onFileUpload: (file: File, textContent: string) => void;
}

const ContentUpload = ({ onFileUpload }: ContentUploadProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Upload Content</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload a PDF file to extract content
            </p>
          </div>
        </div>
        
        <FileUploader onFileUpload={onFileUpload} />
      </CardContent>
    </Card>
  );
};

export default ContentUpload;
