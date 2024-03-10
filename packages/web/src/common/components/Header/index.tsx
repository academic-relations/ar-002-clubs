"use client";

import navPaths from "@sparcs-clubs/web/constants/nav";
import NavList from "@sparcs-clubs/web/common/components/NavTools/NavList";

import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Login from "./Login";

const TopBar = styled.div`
  height: 5px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const NavInner = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const StyledNavList = styled(NavList)`
  position: absolute;
  left: 160px;
  top: 15px;

  width: 1120px;
  @media (max-width: 1200px) {
    width: 880px;
  }

  @media (max-width: 960px) {
    width: 640px;
    gap: 40px;
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

const HeaderInner = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
`;

const Header = () => (
  <HeaderInner>
    <TopBar />
    <NavInner>
      <Logo />
      <Login />
      <StyledNavList keys={navPaths.header} />
    </NavInner>
  </HeaderInner>
);

export default Header;
