import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import RedirectHandler from "./pages/RedirectHandler";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import Message from "./components/Message";
import "./App.css";

function App() {
  const { auth, userId, error } = useAuthContext();

  return (
    <>
      <NavBar />
      <Message type="error">{error}</Message>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={!auth.isAuthenticated ? <LogIn /> : <Navigate to="/dashboard" replace />} />
        <Route path="/auth-redirect" element={<RedirectHandler />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard userId={userId} />
            </ProtectedRoute>
          }
        />
        <Route path="/signout" element={<SignOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
