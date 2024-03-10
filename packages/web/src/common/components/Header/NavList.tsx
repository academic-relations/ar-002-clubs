"use client";

import type { Paths } from "@sparcs-clubs/web/constants/paths";
import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";

const NavListInner = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 60px;
`;

interface NavListProps extends Paths {
  className?: string;
}

const NavList: React.FC<NavListProps> = ({
  className = "",
  CLUBS,
  VOTING,
  COMMUNITY,
  SERVICE_REQUEST,
}) => (
  <NavListInner className={className}>
    <NavItem {...CLUBS} />
    <NavItem {...VOTING} />
    <NavItem {...COMMUNITY} />
    <NavItem {...SERVICE_REQUEST} />
  </NavListInner>
);
export default NavList;
