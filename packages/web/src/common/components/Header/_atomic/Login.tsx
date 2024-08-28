"use client";

import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { overlay } from "overlay-kit";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import AgreementModal from "@sparcs-clubs/web/common/components/Modal/AgreeModal";
import MyMenu from "@sparcs-clubs/web/common/components/MyMenu";

import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

import { getUserType } from "@sparcs-clubs/web/utils/getUserType";

const LoginInner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const Login = () => {
  const { isLoggedIn, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [type, setType] = useState("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const { logout } = useAuth();

  /* TODO 동의 여부 BE 연결하기 */
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setSelectedToken(token);
        const decoded: { name?: string; type?: string } = jwtDecode(token);
        setUserName(decoded.name || "Unknown User");
        setType(decoded.type || "Unknown Type");
      }
    }
  }, [isLoggedIn, selectedToken]);

  const submitHandler = async () => {
    console.log("modal Opended!");
    await login();
    overlay.open(
      ({ isOpen, close }) =>
        !isAgreed && (
          <AgreementModal
            isOpen={isOpen}
            onAgree={() => {
              setIsAgreed(true);
              close();
            }}
            onDisagree={async () => {
              await logout();
              close();
            }}
          />
        ),
    );
  };

  return (
    <>
      {isLoggedIn ? (
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          {userName} ({getUserType(type)})
        </LoginInner>
      ) : (
        <LoginInner onClick={submitHandler}>
          <Icon type="login" size={16} />
          로그인
        </LoginInner>
      )}
      {isMenuOpen && (
        <MyMenu
          setIsMenuOpen={setIsMenuOpen}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
        />
      )}
    </>
  );
};

export default Login;
