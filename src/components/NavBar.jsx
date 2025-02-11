import { useAuth } from "react-oidc-context";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Button } from "@aws-amplify/ui-react";
import "./NavBar.css";
import '@aws-amplify/ui-react/styles.css';

const NavBar = () => {
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav-bar">
      <NavLink to="/about">About</NavLink>
      {auth.isAuthenticated ? (
        <>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/signout">Sign Out</NavLink>
        </>
      ) : (
        <>
          <Button className="nav-button" variation="primary" onClick={
            () => auth.signinRedirect({ prompt: "login" })
              .then(user => {
                console.log("oidc.user", oidc.user);
              })
          }>
            Log In
          </Button>
          <Button className="nav-button" variation="link" onClick={() => auth.signinRedirect({ prompt: "signup" })}>
            Sign Up
          </Button>
        </>
      )}
      <Button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</Button>
    </nav>
  );
};

export default NavBar;
