import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const RedirectHandler = () => {
  const { auth, navigate } = useAuthContext();

  useEffect(() => {
    if (!auth.isLoading) {
      navigate(auth.isAuthenticated ? "/dashboard" : "/about", { replace: true });
    }
  }, [auth.isAuthenticated, auth.isLoading, navigate]);

  return <h1>Processing login...</h1>;
};

export default RedirectHandler;
