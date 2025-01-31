import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

const Login = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  return <div className="login-container"><h1>Redirecting to Login...</h1></div>;
};

export default Login;
