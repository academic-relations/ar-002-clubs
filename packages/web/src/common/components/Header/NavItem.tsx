import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavItemInner = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
`;

type Path = {
  name: string;
  path: string;
};

const NavItem = ({ name, path }: Path) => (
  <NavItemInner>
    <Link href={path}>{name}</Link>
  </NavItemInner>
);

export default NavItem;
