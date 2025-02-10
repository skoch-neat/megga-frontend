import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "../services/api";

export const useAuthContext = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user?.profile) return;

    const idTokenPayload = JSON.parse(atob(auth.user.id_token.split(".")[1]));
    const { email, given_name: firstName, family_name: lastName } = idTokenPayload;

    if (!email) {
      if (import.meta.env.DEV) console.warn("⚠️ Warning: ID Token is missing email.");
      return;
    }

    if (import.meta.env.DEV) console.log("🔒 Fetching user ID for:", email);

    const token = auth.user.id_token;
    localStorage.setItem("auth_token", token);

    (async () => {
      try {
        setLoading(true);

        const { data } = await apiService.get("userByEmail", email);
        if (data?.user_id) {
          setUserId(data.user_id);
          localStorage.setItem("user_id", data.user_id);
        } else {
          if (import.meta.env.DEV) console.log("🆕 User not found, creating:", email);

          const newUser = await apiService.post("users", { email, firstName, lastName });
          setUserId(newUser.data.user_id);
          localStorage.setItem("user_id", newUser.data.user_id);
        }
      } catch (error) {
        console.error("❌ Failed to authenticate user:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [auth.isAuthenticated, auth.user]);

  return { auth, userId, loading, navigate };
};
