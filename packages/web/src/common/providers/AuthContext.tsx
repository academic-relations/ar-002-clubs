"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import postLogin from "../services/postLogin";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async () => {
    try {
      const response = await postLogin();
      if (response && response.accessToken) {
        localStorage.setItem(
          "accessToken",
          response.accessToken.undergraduate ?? "",
        );
        setIsLoggedIn(true);
        console.log("Logged in successfully.");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
