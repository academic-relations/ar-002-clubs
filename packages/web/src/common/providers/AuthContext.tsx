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
import { overlay } from "overlay-kit";
import { Cookies } from "react-cookie";

import {
  getLocalstorageItem,
  removeLocalstorageItem,
  setLocalstorageItem,
  subscribeLocalstorageSet,
  unsubscribeLocalstorageSet,
} from "@sparcs-clubs/web/utils/localstorage";

import AgreementModal from "../components/Modal/AgreeModal";
import getLogin from "../services/getLogin";
import getUserAgree from "../services/getUserAgree";
import postLogout from "../services/postLogout";
import postUserAgree from "../services/postUserAgree";

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
  const [isAgreed, setIsAgreed] = useState(true);

  const checkAgree = async () => {
    const agree = await getUserAgree();
    setIsAgreed(agree.status.isAgree);
  };

  useEffect(() => {
    const handleLocalstorageUpdate = () => {
      const token = getLocalstorageItem("accessToken");
      if (token) {
        setIsLoggedIn(true);
        const decoded: { name?: string; type?: string } = jwtDecode(token);
        setProfile(decoded.name);
      }
    };
    subscribeLocalstorageSet(handleLocalstorageUpdate);

    return () => unsubscribeLocalstorageSet(handleLocalstorageUpdate);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const cookies = new Cookies();
      const responseToken = cookies.get("accessToken");
      if (responseToken !== undefined) {
        setLocalstorageItem("responseToken", JSON.stringify(responseToken));
        if (responseToken) {
          setLocalstorageItem(
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
      removeLocalstorageItem("accessToken");
      removeLocalstorageItem("responseToken");
      const cookies = new Cookies();
      cookies.remove("accessToken");
      console.log("Logged out successfully.");
    } catch (error) {
      setIsLoggedIn(false);
      removeLocalstorageItem("accessToken");
      removeLocalstorageItem("responseToken");
      const cookies = new Cookies();
      cookies.remove("accessToken");
      console.log("Logged out.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      checkAgree();
    }
    if (isAgreed) {
      overlay.closeAll();
    }
    overlay.open(
      ({ isOpen, close }) =>
        !isAgreed &&
        isLoggedIn && (
          <AgreementModal
            isOpen={isOpen}
            onAgree={async () => {
              try {
                await postUserAgree();
                setIsAgreed(true);
                close();
              } catch (error) {
                window.location.reload();
              }
            }}
            onDisagree={async () => {
              await logout();
              close();
            }}
          />
        ),
    );
  }, [isAgreed, isLoggedIn]);

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
