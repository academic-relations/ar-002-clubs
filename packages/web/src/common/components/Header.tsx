"use client";

import React from "react";
import styled from "styled-components";

const IdentityBar = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  padding: 20px 0;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const Header: React.FC<React.PropsWithChildren> = ({ children = <div /> }) => (
  <>
    <IdentityBar />
    <HeaderInner>{children}</HeaderInner>
  </>
);

export default Header;
