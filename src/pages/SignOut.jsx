import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const SignOut = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    auth.removeUser();
    localStorage.removeItem("auth_token");

    const { VITE_COGNITO_CLIENT_ID, VITE_COGNITO_LOGOUT_URI, VITE_COGNITO_DOMAIN } = import.meta.env;
    if (VITE_COGNITO_CLIENT_ID && VITE_COGNITO_LOGOUT_URI && VITE_COGNITO_DOMAIN) {
      window.location.href = `${VITE_COGNITO_DOMAIN}/logout?client_id=${VITE_COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(VITE_COGNITO_LOGOUT_URI)}`;
    } else {
      console.error("❌ Missing Cognito configuration.");
    }
  }, [auth]);

  return <h1>Signing out...</h1>;
};

export default SignOut;
