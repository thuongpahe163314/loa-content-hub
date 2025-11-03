import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Array<'ADMIN' | 'EDITOR' | 'CONTENT_CREATOR' | 'VIEWER'>;
}

export default function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-destructive">Không có quyền truy cập</h1>
          <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
