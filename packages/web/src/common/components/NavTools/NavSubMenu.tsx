"use client";

import React from "react";
import styled from "styled-components";
import NavSubItem from "./NavSubItem";

const NavItemOuter = styled.div`
  position: absolute;
  top: calc(100% - 8px);
  left: -50%;
  cursor: pointer;
`;

const NavItemInner = styled.div`
  margin-top: 16px;
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
  <NavItemOuter>
    <NavItemInner>
      {sub.map(({ name, path }) => (
        <NavSubItem key={name} name={name} path={path} />
      ))}
    </NavItemInner>
  </NavItemOuter>
);

export default NavSubMenu;
