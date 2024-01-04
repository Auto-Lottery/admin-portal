"use client";

import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { redirect, usePathname } from "next/navigation";
import { AdminUser, AdminUserWithToken } from "@/types/user";
import { useClientRequest } from "./client-request-context";

interface AuthContextType {
  login: () => Promise<void>;
  logout: () => void;
  user: AdminUser | null | undefined;
  token?: string;
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextType>({
  login: async () => { },
  logout: () => { },
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
  }, [getRequest, pathname]);

  const checkTokenExpire = useCallback((passloggedUserData: AdminUserWithToken) => {
    const { exp, token: tempToken, ...userData } = passloggedUserData;
    if (exp && Date.now() < exp * 1000 && tempToken) {
      localStorage.setItem("token", tempToken);
      setUser(userData);
      setToken(tempToken);
      setIsLogged(true);
      setLoading(false);

    } else {
      logout();
    }
  }, [logout]);

  const checkAuth = useCallback(async () => {
    const res = await getRequest("/api/checkAuth");
    if (res === null) {
      logout();
      return;
    }
    const lud = res as AdminUserWithToken;
    checkTokenExpire(lud);
  }, [getRequest, checkTokenExpire, logout]);

  useEffect(() => {
    if (loggedUserData) {
      checkTokenExpire(loggedUserData);
    } else {
      checkAuth();
    }
    return () => { };
  }, [checkAuth, checkTokenExpire, loggedUserData]);

  const login = useCallback(async () => {
    checkAuth();
  }, [checkAuth]);

  const data = useMemo(() => ({
    isLogged,
    user,
    token,
    logout,
    login
  }), [isLogged,
    user,
    token,
    logout,
    login]);

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
      value={data}
    >
      {children}
    </AuthContext.Provider >
  );
}

export default AuthProvider;
