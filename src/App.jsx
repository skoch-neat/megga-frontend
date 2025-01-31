import { useAuth } from "react-oidc-context";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { fetchUsers, createUser } from "./services/api";
import ProtectedRoute from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import RedirectHandler from "./pages/RedirectHandler";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Store token when user logs in
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.access_token) {
      localStorage.setItem("auth_token", auth.user.access_token);
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

  // Redirect from login to dashboard
  useEffect(() => {
    if (auth.isAuthenticated && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  const saveUserToBackend = useCallback(async () => {
    if (auth.isAuthenticated && auth.user?.profile && auth.user.access_token) {
      try {
        await createUser({
          email: auth.user.profile.email,
          first_name: auth.user.profile.given_name,
          last_name: auth.user.profile.family_name,
        }, auth.user.access_token);
      } catch (err) {
        setError(err.message);
      }
    }
  }, [auth.isAuthenticated, auth.user?.profile, auth.user?.access_token]);

  const fetchUserData = useCallback(async () => {
    if (auth.isAuthenticated && auth.user?.access_token) {
      setLoading(true);
      try {
        const { data } = await fetchUsers(auth.user.access_token);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

  // Fetch user data after login
  useEffect(() => {
    if (auth.isAuthenticated) {
      saveUserToBackend();
      fetchUserData();
    }
  }, [auth.isAuthenticated, saveUserToBackend, fetchUserData]);

  return (
    <>
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!auth.isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/auth-redirect" element={<RedirectHandler />} />
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              <ProtectedRoute>
                <Dashboard userData={userData} loading={loading} error={error} />
              </ProtectedRoute>
            ) : (
              <Navigate to="/about" replace />
            )
          }
        />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
