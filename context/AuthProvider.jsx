import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/auth/me`, { withCredentials: true });
      setUser(res.data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = useMemo(() => ({ user, setUser, loading, refreshUser }), [user, loading, refreshUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;


