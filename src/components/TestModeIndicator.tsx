
import { AlertCircle } from 'lucide-react';

const TestModeIndicator = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-md shadow-md flex items-center space-x-2 z-50">
      <AlertCircle className="h-4 w-4" />
      <span className="text-sm font-medium">Test Mode: Authentication Disabled</span>
    </div>
  );
};

export default TestModeIndicator;
