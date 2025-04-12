
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const AuthHeader = () => {
  const { loading } = useAuth();

  // Test mode - always show user menu
  return (
    <div className="flex items-center gap-4">
      {loading ? (
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
      ) : (
        <UserMenu />
      )}
    </div>
  );
};

export default AuthHeader;
