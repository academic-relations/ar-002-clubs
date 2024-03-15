"use client";

import React from "react";
import styled from "styled-components";

import Login from "./Login";
import Logo from "./Logo";

const IdentityBar = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const Header: React.FC = () => (
  <>
    <IdentityBar />
    <HeaderInner>
      <Logo />
      <Login />
    </HeaderInner>
  </>
);

export default Header;
