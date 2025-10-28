import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { api, bindTokenAccessors, setAuthToken } from "../lib/api";
import { AUTH_LOGOUT, AUTH_SIGNIN, AUTH_SIGNUP } from "../lib/urls";

type User = {
  entity_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  status?: string;
};

type AppContextType = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user?: User) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (first_name: string, last_name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuth: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const TOKEN_KEY = "rp_token";
const USER_KEY = "rp_user";

export function AppProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const setAuth = (newToken: string, newUser?: User) => {
    setToken(newToken);
    if (newUser) setUser(newUser);
    localStorage.setItem(TOKEN_KEY, newToken);
    if (newUser) localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  };

  const clearAuth = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  // Bind accessors for refresh interceptor
  useEffect(() => {
    bindTokenAccessors(
      () => token,
      (t: string) => setAuth(t)
    );
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.post(AUTH_SIGNIN, { email, password }, { headers: { "X-RP-Skip-Refresh": "1" } });
    const { access_token, user } = res.data.data;
    setAuth(access_token, user);
  };

  const signup = async (first_name: string, last_name: string, email: string, password: string) => {
    const res = await api.post(AUTH_SIGNUP, { first_name, last_name, email, password }, { headers: { "X-RP-Skip-Refresh": "1" } });
    const { access_token, user } = res.data.data;
    setAuth(access_token, user);
  };

  const logout = async () => {
    try {
      await api.post(AUTH_LOGOUT, {} , { withCredentials: true });
    } finally {
      clearAuth();
    }
  };

  const value = useMemo(
    () => ({ token, user, setAuth, login, signup, logout, clearAuth }),
    [token, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
