import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const LogIn = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else if (!auth.isLoading) {
      auth.signinRedirect().catch((err) => {
        if (import.meta.env.DEV) {
          console.error("Login Redirect Error:", err);
        }
      });
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.signinRedirect, navigate]);

  return <h1>Redirecting...</h1>;
};

export default LogIn;
