import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

const SignOut = () => {
  const auth = useAuth();

  useEffect(() => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

    if (!clientId || !logoutUri || !cognitoDomain) {
      console.error("Missing Cognito configuration. Check your .env file.");
      return;
    }

    auth.removeUser();
    localStorage.removeItem("auth_token");

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  }, []);

  return <div className="logout-container"><h1>Signing out...</h1></div>;
};

export default SignOut;
