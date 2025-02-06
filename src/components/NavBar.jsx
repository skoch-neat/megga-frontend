import { useAuth } from "react-oidc-context";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "../components/Button";
import "./NavBar.css";

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
          <button className="nav-button" onClick={() => auth.signinRedirect({ prompt: "login" })}>
            Log In
          </button>
          <button className="nav-button" onClick={() => auth.signinRedirect({ prompt: "signup" })}>
            Sign Up
          </button>
        </>
      )}
      <Button onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</Button>
    </nav>
  );
};

export default NavBar;
