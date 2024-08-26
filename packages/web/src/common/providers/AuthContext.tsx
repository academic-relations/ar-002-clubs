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

// import postRefresh from "@sparcs-clubs/web/lib/_axios/postRefresh";

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

  const login = async () => {
    try {
      const response = await getLogin();
      window.location.href = response.url;
      // const refreshed = await postRefresh();
      // // TODO: 로그인시 기본 프로필 선택
      // localStorage.setItem(
      //   "responseToken",
      //   JSON.stringify(refreshed.accessToken),
      // );
      // if (refreshed.accessToken) {
      //   localStorage.setItem(
      //     "accessToken",
      //     refreshed.accessToken.undergraduate ??
      //       refreshed.accessToken.master ??
      //       refreshed.accessToken.doctor ??
      //       refreshed.accessToken.professor ??
      //       refreshed.accessToken.employee ??
      //       refreshed.accessToken.executive ??
      //       "",
      //   );
      //   setIsLoggedIn(true);
      //   console.log("Logged in successfully.");
      // }
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
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = useMemo(
    () => ({ isLoggedIn, login, logout, profile }),
    [isLoggedIn],
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
