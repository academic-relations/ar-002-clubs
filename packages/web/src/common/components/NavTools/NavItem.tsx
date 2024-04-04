"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import NavSubMenu from "./NavSubMenu";

type Path = {
  name: string;
  path?: string;
  sub?: Path[];
  highlight?: boolean;
};

const NavItemInner = styled.div<{ highlight?: boolean }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  border-bottom: 2px solid transparent;
  padding: 8px 0;
  &:hover {
    ${({ highlight, theme }) =>
      highlight && `border-bottom: 2px solid ${theme.colors.PRIMARY};`}
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;
`;

const NavItem = ({ name, path = "", sub = [], highlight = false }: Path) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <NavItemInner
      highlight={highlight}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {path ? <StyledLink href={path}>{name}</StyledLink> : name}
      {!path && isHover && <NavSubMenu sub={sub} />}
    </NavItemInner>
  );
};

export default NavItem;
