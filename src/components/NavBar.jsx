import { useAuth } from "react-oidc-context";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ toggleTheme, theme }) => {
  const auth = useAuth();

  return (
    <nav className="nav-bar">
      <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>

      {!auth.isAuthenticated ? (
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Log In</NavLink>
      ) : (
        <>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
          <NavLink to="/signout" className={({ isActive }) => (isActive ? "active" : "")}>Sign Out</NavLink>
        </>
      )}

      <button
        className={`theme-toggle ${theme === "dark" ? "dark-mode" : "light-mode"}`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  );
};

export default NavBar;
