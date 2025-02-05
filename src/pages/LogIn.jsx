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
      console.log("Redirecting to login..."); // ✅ Debugging line to confirm function is running
      auth.signinRedirect().catch((err) => console.error("Login Redirect Error:", err));
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.signinRedirect, navigate]);

  return <h1>Redirecting...</h1>;
};

export default LogIn;
