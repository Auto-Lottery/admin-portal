"use client";

import React, { ReactNode, createContext, useState, useEffect, useContext, useCallback } from "react";
import { useClientRequest } from "./client-request-context";
import { redirect, usePathname } from "next/navigation";

interface User {
    _id: string;
    phoneNumber: string;
    operator: string;
    role: [string];
}

interface TokenData {
    token: string;
    exp?: number;
}

interface AuthContextType {
    login: (values?: any) => Promise<void>;
    logout: () => void;
    user: User | null | undefined;
    token?: string;
    isLogged: boolean;
}

const AuthContext = createContext<AuthContextType>({
    login: async (values?: any) => { },
    logout: () => { },
    user: undefined,
    isLogged: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

const UNAUTHENTICATED_PATHS = ["/login", "/register"];
const PUBLIC_PATHS = UNAUTHENTICATED_PATHS.concat(['/test']);

function AuthProvider({ children }: { children: ReactNode }) {
    const { getRequest } = useClientRequest();
    const [user, setUser] = useState<User | null | undefined>();
    const [tokenData, setTokenData] = useState<TokenData>();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const pathname = usePathname();

    const checkAuth = useCallback(
        async (loggedDataStr: string) => {
            try {
                const { exp, token, ...userData } = JSON.parse(loggedDataStr) as (TokenData & User);
                if (exp && Date.now() < exp * 1000 && token) {
                    setUser(userData);
                    setIsLogged(true);
                    setLoading(false);
                    setTokenData({
                        exp,
                        token
                    });
                    return;
                }
                logout();
            } catch (err) {
                logout();
            }
        },
        [getRequest]
    );

    useEffect(() => {
        const loggedDataStr = localStorage.getItem("loggedData");

        if (loggedDataStr) {
            checkAuth(loggedDataStr);
        } else {
            logout();
            setLoading(false);
        }
        return () => { };
    }, [checkAuth]);

    const login = async (res: any) => {
        const loggedDataStr = JSON.stringify(res);
        localStorage.setItem("loggedData", loggedDataStr);
        checkAuth(loggedDataStr);
    };

    const logout = useCallback(() => {
        setIsLogged(false);
        setLoading(false);
        setTokenData(undefined);
        setUser(undefined);
        localStorage.clear();
    }, []);

    if (loading) {
        return null
    }

    if ((!isLogged && !PUBLIC_PATHS.includes(pathname))) {
        return redirect("/login");
    }

    if (isLogged && UNAUTHENTICATED_PATHS.includes(pathname)) {
        return redirect("/");
    }

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                token: tokenData?.token,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
