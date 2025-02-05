import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "../services/api";

export const useAuthContext = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user?.profile) return;

    const { email, given_name: firstName, family_name: lastName } = auth.user.profile;
    const token = auth.user.access_token;
    localStorage.setItem("auth_token", token);

    (async () => {
      try {
        const { data } = await apiService.get("userByEmail", email);
        setUserId(data?.user_id ?? null);

        if (!data?.user_id) {
          await apiService.post("users", { email, firstName, lastName });
          const newUser = await apiService.get("userByEmail", email);
          setUserId(newUser.data.user_id);
        }
      } catch (error) {
        console.error("❌ Authentication error:", error);
      }
    })();
  }, [auth.isAuthenticated, auth.user]);

  return { auth, userId, navigate };
};
