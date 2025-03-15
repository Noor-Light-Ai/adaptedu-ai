
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
