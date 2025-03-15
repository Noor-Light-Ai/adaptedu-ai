
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, FileType, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      validateAndProcessFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are supported');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFile(file);
    simulateUpload(file);
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            onFileUpload(file);
            toast.success('File uploaded successfully');
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    setFile(null);
    setUploadComplete(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf"
      />

      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
          className={`pdf-drop-area w-full h-64 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
            }`}
        >
          <Upload className="w-12 h-12 text-blue-500 mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
            Drag and drop your PDF file
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            or click to browse
          </p>
          <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
            <FileType className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-xs text-blue-500">PDF up to 10MB</span>
          </div>
        </div>
      )}

      {file && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileType className="w-6 h-6 text-blue-500 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
                  {file.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            {uploadComplete ? (
              <div className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900/20 text-green-500 text-xs px-2 py-1 rounded-full flex items-center mr-3">
                  <Check className="w-3 h-3 mr-1" />
                  Uploaded
                </span>
                <button
                  onClick={resetUpload}
                  className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {isUploading ? `${uploadProgress}%` : ''}
              </div>
            )}
          </div>
          
          {isUploading && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-200" 
                style={{ width: `${uploadProgress}%` }} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
