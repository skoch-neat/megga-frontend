import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) return;
    navigate(auth.isAuthenticated ? "/dashboard" : "/about", { replace: true });
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  return <h1>Processing login...</h1>;
};

export default RedirectHandler;
