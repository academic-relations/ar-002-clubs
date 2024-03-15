"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

import paths from "@sparcs-clubs/web/constants/paths";

const LoginInner = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const Login = () => (
  <LoginInner href={paths.LOGIN.path}>
    <Icon type="person" size={16} />
    {paths.LOGIN.name}
  </LoginInner>
);

export default Login;
