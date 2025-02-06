import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const SignOut = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    try {
      auth.removeUser();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Failed to remove user:", error);
      }
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_preferences");
    sessionStorage.clear();

    const { VITE_COGNITO_CLIENT_ID, VITE_COGNITO_LOGOUT_URI, VITE_COGNITO_DOMAIN } = import.meta.env;
    if (VITE_COGNITO_CLIENT_ID && VITE_COGNITO_LOGOUT_URI && VITE_COGNITO_DOMAIN) {
      window.location.href = `${VITE_COGNITO_DOMAIN}/logout?client_id=${VITE_COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(VITE_COGNITO_LOGOUT_URI)}`;
    } else {
      const message = "Unable to complete sign out. Please contact support if the issue persists.";
      if (import.meta.env.DEV) {
        console.error("Missing Cognito configuration.");
      }
    }
  }, [auth]);

  return <h1>Signing out...</h1>;
};

export default SignOut;
