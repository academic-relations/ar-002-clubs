"use client";

import React from "react";
import styled from "styled-components";

const Card: React.FC<React.PropsWithChildren> = styled.div<{
  outline?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 16px 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: ${({ theme }) => theme.round.md};
  box-shadow: ${({ theme, outline }) =>
    outline ? "inherit" : theme.shadow.md};
  border: ${({ theme, outline }) =>
    outline ? `1px solid ${theme.colors.GRAY[200]}` : "inherit"};
`;

export default Card;
