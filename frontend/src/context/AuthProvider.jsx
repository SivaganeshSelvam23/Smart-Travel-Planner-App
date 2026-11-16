import { useState, useEffect } from "react";
import { AuthContext } from "./Authcontext";
import { getCurrentUser, loginUser, logoutUser } from "../services/auth.api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      console.log("1. Session check started");
      try {
        const currentUser = await getCurrentUser();

        console.log("2. Session request completed");

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        console.log("3. Session check failed");
        if (!cancelled) {
          setAuthError("Unable to check your session.");
        }
      } finally {
        console.log("4. Finally executed");
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    checkSession();

    return () => {
      console.log("5. Effect cleanup executed");
      cancelled = true;
    };
  }, []);
  async function login(credentials) {
    const result = await loginUser(credentials);

    setUser(result.user);
    setAuthError("");

    return result;
  }
  async function logout() {
    await logoutUser();

    setUser(null);
    setAuthError("");
  }
  return (
    <AuthContext.Provider value={{ user, loading, authError, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
