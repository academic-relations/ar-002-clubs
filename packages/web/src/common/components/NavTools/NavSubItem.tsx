"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

type Path = {
  name: string;
  path?: string;
};

const NavSubItemInner = styled.div`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  white-space: nowrap;
  border-radius: 4px;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration: none;
`;

const NavSubItem = ({ name, path = "" }: Path) => (
  <NavSubItemInner>
    {path ? <StyledLink href={path}>{name}</StyledLink> : name}
  </NavSubItemInner>
);

export default NavSubItem;
