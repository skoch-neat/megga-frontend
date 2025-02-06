import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/about" replace />;
};

export default ProtectedRoute;
