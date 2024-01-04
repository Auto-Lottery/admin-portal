"use client";

import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useClientRequest } from "./client-request-context";
import { redirect, usePathname } from "next/navigation";
import { AdminUser, AdminUserWithToken } from "@/types/user";
interface AuthContextType {
  login: () => Promise<void>;
  logout: () => void;
  user: AdminUser | null | undefined;
  token?: string;
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => {},
  logout: () => {},
  user: undefined,
  isLogged: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

const UNAUTHENTICATED_PATHS = ["/login", "/register"];
const PUBLIC_PATHS = UNAUTHENTICATED_PATHS.concat(["/test"]);

function AuthProvider({
  children,
  loggedUserData,
}: {
  children: ReactNode;
  loggedUserData: AdminUserWithToken | null;
}) {
  const { getRequest } = useClientRequest();
  const [user, setUser] = useState<AdminUser | null | undefined>();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  const checkTokenExpire = useCallback((loggedUserData: AdminUserWithToken) => {
    const { exp, token, ...userData } = loggedUserData;
    if (exp && Date.now() < exp * 1000 && token) {
      localStorage.setItem("token", token);
      setUser(userData);
      setToken(token);
      setIsLogged(true);
      setLoading(false);
      return;
    } else {
      logout();
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const res = await getRequest("/api/checkAuth");
    if (res === null) {
      logout();
      return;
    }
    const lud = res as AdminUserWithToken;
    checkTokenExpire(lud);
  }, [getRequest]);

  useEffect(() => {
    if (loggedUserData) {
      checkTokenExpire(loggedUserData);
    } else {
      checkAuth();
    }
    return () => {};
  }, [checkAuth, checkTokenExpire, loggedUserData]);

  const login = async () => {
    checkAuth();
  };

  const logout = useCallback(async () => {
    await getRequest("/api/logout");
    setIsLogged(false);
    setLoading(false);
    setUser(undefined);
    localStorage.removeItem("token");
    if (
      !PUBLIC_PATHS.includes(pathname) &&
      !UNAUTHENTICATED_PATHS.includes(pathname)
    ) {
      window.location.replace("/login");
    }
  }, []);

  if (loading) {
    return null;
  }

  if (!isLogged && !PUBLIC_PATHS.includes(pathname)) {
    return redirect("/login");
  }

  if (isLogged && UNAUTHENTICATED_PATHS.includes(pathname)) {
    return redirect("/");
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
