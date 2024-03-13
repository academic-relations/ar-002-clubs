"use client";

import React from "react";
import styled from "styled-components";

const CardInner = styled.div`
  position: relative;
  padding: 16px 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.round.md};
  box-shadow: ${({ theme }) => theme.shadow.md};

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card: React.FC<React.PropsWithChildren> = ({ children = <div /> }) => (
  <CardInner>{children}</CardInner>
);

export default Card;
