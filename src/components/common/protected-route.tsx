import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// future: components/common/protected-route.tsx
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth(); // hook doesn't exist yet
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}