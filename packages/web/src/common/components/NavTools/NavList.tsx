"use client";

import type { Paths } from "@sparcs-clubs/web/constants/paths";
import paths from "@sparcs-clubs/web/constants/paths";

import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";

const NavListInner = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 60px;
`;

interface NavListProps {
  keys: (keyof Paths)[];
  className?: string;
}

const NavList: React.FC<NavListProps> = ({ keys, className = "" }) => (
  <NavListInner className={className}>
    {keys.map(key => (
      <NavItem {...paths[key]} />
    ))}
  </NavListInner>
);
export default NavList;
