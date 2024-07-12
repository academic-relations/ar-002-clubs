"use client";

import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!isLoggedIn) {
      setIsMenuOpen(false);
    }
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        // TODO: 나중에 이름/신분 실제로 받아오기
        <LoginInner onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon type="person" size={16} />
          하승종 (학부생)
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
