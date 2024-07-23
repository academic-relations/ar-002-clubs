"use client";

import React, { useState } from "react";

import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import NavList from "@sparcs-clubs/web/common/components/NavTools/NavList";
import navPaths from "@sparcs-clubs/web/constants/nav";

import MobileNavMenu from "../NavTools/MobileNavMenu";

import Login from "./_atomic/Login";
import Logo from "./_atomic/Logo";

const IdentityBar = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ theme }) => theme.responsive.CONTENT.xxl};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    width: ${({ theme }) => theme.responsive.CONTENT.xl};
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    width: ${({ theme }) => theme.responsive.CONTENT.lg};
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: none;
  }
`;

const HeaderInner = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  -webkit-backdrop-filter: blur(
    10px
  ); /* Add this line first, it fixes blur for Safari*/
  backdrop-filter: blur(10px);
`;

const Menu = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    display: flex;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>();
  return (
    <HeaderInner>
      <IdentityBar />
      <NavInner>
        <Logo />
        <Login />
        <Menu>
          <Icon
            type="menu"
            size={24}
            onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          />
        </Menu>
        <StyledNavList highlight keys={navPaths.header} />
      </NavInner>
      {isMobileMenuVisible && (
        <MobileNavMenu
          keys={navPaths.header}
          onClose={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
        />
      )}
    </HeaderInner>
  );
};

export default Header;
