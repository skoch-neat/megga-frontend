import { useAuth } from "react-oidc-context";
import { useEffect, useState, useCallback } from "react";

function App() {
  const auth = useAuth();
  const [userData, setUserData] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const signOutRedirect = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  // Function to save user to the backend
  const saveUserToBackend = useCallback(async () => {
    if (auth.isAuthenticated && auth.user?.profile && auth.user.access_token) {
      const user = {
        email: auth.user.profile.email,
        first_name: auth.user.profile.given_name,
        last_name: auth.user.profile.family_name,
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.access_token}`,
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error("Failed to save user to the backend");
        }

        console.log("User saved to backend successfully.");
      } catch (error) {
        console.error("Error saving user to backend:", error);
      }
    }
  }, [auth.isAuthenticated, auth.user?.profile, auth.user?.access_token, API_BASE_URL]);

  // Function to fetch user data from the backend
  const fetchUserData = useCallback(async () => {
    if (auth.isAuthenticated && auth.user?.access_token) {
      try {
        console.log("Fetching user data...");
        const response = await fetch(`${API_BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        console.log("User data fetched:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [API_BASE_URL, auth.isAuthenticated, auth.user?.access_token]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      saveUserToBackend();
      fetchUserData();
    }
  }, [auth.isAuthenticated, saveUserToBackend, fetchUserData]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre>Hello, {auth.user?.profile.given_name} {auth.user?.profile.family_name}!</pre>

        <div>
          <h3>Fetched User Data:</h3>
          {userData ? (
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }


  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Welcome to MEGGA</h1>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
