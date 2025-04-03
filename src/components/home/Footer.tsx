
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900/30 mt-auto">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
              AdaptEdU
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Transform your content into engaging learning experiences
            </p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link to="/create" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Create
            </Link>
            <Link to="/dashboard" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AdaptEdU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
