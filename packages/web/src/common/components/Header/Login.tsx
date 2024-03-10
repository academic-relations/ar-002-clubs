"use client";

import React from "react";
import Link from "next/link";
import paths from "@sparcs-clubs/web/constants/paths";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";

const LoginInner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;

const Login = () => (
  <Link href={paths.LOGIN.path}>
    <LoginInner>
      <PersonIcon />
      {paths.LOGIN.name}
    </LoginInner>
  </Link>
);

export default Login;
