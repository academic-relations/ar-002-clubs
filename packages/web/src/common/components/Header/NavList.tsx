import type { Paths } from "@sparcs-clubs/web/constants/paths";
import React from "react";
import styled from "styled-components";
import NavItem from "./NavItem";

const NavListInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NavList = ({ CLUBS, VOTING, COMMUNITY, SERVICE_REQUEST }: Paths) => (
  <NavListInner>
    <NavItem {...CLUBS} />
    <NavItem {...VOTING} />
    <NavItem {...COMMUNITY} />
    <NavItem {...SERVICE_REQUEST} />
  </NavListInner>
);
export default NavList;
