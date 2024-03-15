"use client";

import React from "react";
import styled from "styled-components";

import NavList from "@sparcs-clubs/web/common/components/NavTools/NavList";
import NavItem from "@sparcs-clubs/web/common/components/NavTools/NavItem";

import navPaths from "@sparcs-clubs/web/constants/nav";

import SPARCSLogo from "./SPARCSLogo";

const FooterInner = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media (max-width: 720px) {
    justify-content: center;
  }
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

const MailTo = styled.div`
  @media (max-width: 720px) {
    display: none;
  }
`;

const Footer = () => (
  <FooterInner>
    <SPARCSLogo />
    <MailTo>
      <NavItem
        name="문의: clubsunion2019@gmail.com"
        path="mailto:clubsunion2019@gmail.com"
      />
    </MailTo>
    <StyledNavList keys={navPaths.footer} />
  </FooterInner>
);

export default Footer;
