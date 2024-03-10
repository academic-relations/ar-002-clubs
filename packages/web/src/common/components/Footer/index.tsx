"use client";

import NavList from "@sparcs-clubs/web/common/components/NavTools/NavList";
import NavItem from "@sparcs-clubs/web/common/components/NavTools/NavItem";

import navPaths from "@sparcs-clubs/web/constants/nav";

import React from "react";
import styled from "styled-components";
import SPARCSLogo from "./SPARCSLogo";

const FooterInner = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media (max-width: 720px) {
    justify-content: center;
    position: static;
  }
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

const NavItemOuter = styled.div`
  @media (max-width: 720px) {
    display: none;
  }
`;

const Footer = () => (
  <FooterInner>
    <SPARCSLogo />
    <NavItemOuter>
      <NavItem
        name="문의: clubsunion2019@gmail.com"
        path="mailto:clubsunion2019@gmail.com"
      />
    </NavItemOuter>
    <StyledNavList keys={navPaths.footer} />
  </FooterInner>
);

export default Footer;
