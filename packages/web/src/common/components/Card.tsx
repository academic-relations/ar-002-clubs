"use client";

import React from "react";
import styled from "styled-components";

interface CardProps {
  outline?: boolean;
  padding?: string;
  gap?: number;
}

const CardInner = styled.div<{
  outline?: boolean;
  padding?: string;
  gap?: number;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: stretch;
  padding: ${({ padding }) => padding ?? `32px`};
  gap: ${({ gap }) => (gap ? `${gap}px` : "inherit")};

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

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  children = <div />,
  ...props
}) => <CardInner {...props}>{children}</CardInner>;

export default Card;
