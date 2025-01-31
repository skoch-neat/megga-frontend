import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "email openid profile",
  storage: localStorage,
  onSigninCallback: () => {
    console.log("Signin callback triggered: User successfully redirected back.");
  },
  onSigninError: (error) => {
    console.error("Signin error occurred:", error);
  },
  onSignoutCallback: () => {
    console.log("Signout callback triggered: User signed out.");
  },
};

// Load Theme from Local Storage
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
