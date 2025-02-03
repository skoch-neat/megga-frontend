import { useAuth } from "react-oidc-context";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { createUser, fetchUserByEmail } from "./services/api";
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
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const USER_ID_ERROR_MESSAGE = "Unable to retrieve user ID. You may not be able to view, create, or edit thresholds.";
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.access_token) {
      localStorage.setItem("auth_token", auth.user.access_token);
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

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
        console.error("Error saving user to backend:", err);
        setError(USER_ID_ERROR_MESSAGE);
      }
    }
  }, [auth.isAuthenticated, auth.user?.profile, auth.user?.access_token]);

  const fetchUserId = useCallback(async () => {
    if (auth.isAuthenticated && auth.user?.profile?.email) {
      try {
        const response = await fetchUserByEmail(auth.user.profile.email);
        if (response.data && response.data.user_id) {
          setUserId(response.data.user_id);
        }
      } catch (err) {
        console.error("Error fetching user ID:", err);
        setError(USER_ID_ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auth.isAuthenticated, auth.user?.profile?.email]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      saveUserToBackend();
      fetchUserId();
    }
  }, [auth.isAuthenticated, saveUserToBackend, fetchUserId]);

  return (
    <>
      {error && <div className="error-message">Error: {error}</div>}
      <NavBar toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!auth.isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} />
        <Route path="/auth-redirect" element={<RedirectHandler />} />
        <Route
          path="/dashboard"
          element={
            auth.isLoading || loading ? (
              <h2>Loading...</h2>
            ) : auth.isAuthenticated ? (
              <ProtectedRoute>
                <Dashboard userId={userId} />
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
