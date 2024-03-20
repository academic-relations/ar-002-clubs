"use client";

import React from "react";
import styled from "styled-components";
import NavSubItem from "./NavSubItem";

const NavItemInner = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: -50%;
  display: inline-flex;
  padding: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 4px;
`;

type SubPath = {
  name: string;
  path?: string;
};

const NavSubMenu = ({ sub }: { sub: SubPath[] }) => (
  <NavItemInner>
    {sub.map(({ name, path }) => (
      <NavSubItem key={name} name={name} path={path} />
    ))}
  </NavItemInner>
);

export default NavSubMenu;
