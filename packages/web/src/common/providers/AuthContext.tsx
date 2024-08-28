"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";

import getLogin from "../services/getLogin";
import postLogout from "../services/postLogout";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  profile: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<string | undefined>(undefined);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      const decoded: { type?: string } = jwtDecode(accessToken);
      setProfile(decoded.type);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const cookies = new Cookies();
      const responseToken = cookies.get("accessToken");
      if (responseToken !== undefined) {
        localStorage.setItem("responseToken", JSON.stringify(responseToken));
        if (responseToken) {
          localStorage.setItem(
            "accessToken",
            responseToken.professor ??
              responseToken.doctor ??
              responseToken.master ??
              responseToken.undergraduate ??
              responseToken.employee ??
              responseToken.executive ??
              "",
          );
          setIsLoggedIn(true);
          cookies.remove("accessToken");
          console.log("Logged in successfully.");
        }
      }
    }
  }, [isLoggedIn]);

  const login = async () => {
    try {
      const response = await getLogin();
      window.location.href = response.url;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      setIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("responseToken");
      const cookies = new Cookies();
      cookies.remove("accessToken");
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = useMemo(
    () => ({ isLoggedIn, login, logout, profile }),
    [isLoggedIn, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
