"use client";

import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import MyMenu from "@sparcs-clubs/web/common/components/MyMenu";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";

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

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
    } else {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded: { name?: string; type?: string } = jwtDecode(token);
        setUserName(decoded.name || "Unknown User");
        setType(decoded.type || "Unknown Type");
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        // TODO: 나중에 이름/신분 실제로 받아오기
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          {userName} ({type})
        </LoginInner>
      ) : (
        <LoginInner onClick={login}>
          <Icon type="login" size={16} />
          로그인
        </LoginInner>
      )}
      {isMenuOpen && <MyMenu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};

export default Login;
