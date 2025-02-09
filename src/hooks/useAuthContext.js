import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiService } from "../services/api";

export const useAuthContext = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const retry = async (fn, retries, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay * 2);
    }
  };

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user?.profile) return;

    const idTokenPayload = JSON.parse(atob(auth.user.id_token.split(".")[1]));
    const { email, given_name: firstName, family_name: lastName } = idTokenPayload;

    if (!email) {
      console.warn("Warning: ID Token is missing email.");
      return;
    }

    const token = auth.user.id_token;
    localStorage.setItem("auth_token", token);

    (async () => {
      let retries = 3;
      try {
        const { data } = await retry(() => apiService.get("userByEmail", email), retries);
        setUserId(data?.user_id ?? null);

        if (!data?.user_id) {
          const newUser = await retry(async () => {
            await apiService.post("users", { email, firstName, lastName });
            return apiService.get("userByEmail", email);
          }, retries);
          setUserId(newUser.data.user_id);
        }
      } catch (error) {
        throw new Error("Failed to authenticate user");
      }
    })();
  }, [auth.isAuthenticated, auth.user]);

  return { auth, userId, navigate };
};
