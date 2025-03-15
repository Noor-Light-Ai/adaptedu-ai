
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

const AuthHeader = () => {
  const { user, loading } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {loading ? (
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
      ) : !user ? (
        <>
          <Button variant="ghost" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Sign Up</Link>
          </Button>
        </>
      ) : (
        <UserMenu />
      )}
    </div>
  );
};

export default AuthHeader;
