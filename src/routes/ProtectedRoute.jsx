import { Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();

  if (error) {
    return (
      <div role="alert" className="auth-error">
        <h2>Authentication Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Verifying authentication...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/about"
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
