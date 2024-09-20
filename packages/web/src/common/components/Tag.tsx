"use client";

import React from "react";

import styled from "styled-components";

type TagColor =
  | "GREEN"
  | "BLUE"
  | "ORANGE"
  | "PURPLE"
  | "PINK"
  | "YELLOW"
  | "RED"
  | "GRAY";

const TagInner = styled.div<{ color: TagColor; width: string }>`
  position: relative;
  width: ${({ width }) => width};
  padding: ${({ width }) => (width === "fit-content" ? "4px 12px" : "4px 0px")};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 12px;
    line-height: 14px;
    padding: 2px 8px;
  }
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.WHITE : theme.colors[color][600]};
  background-color: ${({ theme, color }) =>
    color === "RED" ? theme.colors.RED[600] : theme.colors[color][200]};
  border-radius: ${({ theme }) => theme.round.sm};
  text-align: center;
`;

interface TagProps extends React.PropsWithChildren {
  color?: TagColor;
  width?: string;
}

const Tag: React.FC<TagProps> = ({
  children = <div />,
  color = "BLUE",
  width = "fit-content",
}) => (
  <TagInner color={color} width={width}>
    {children}
  </TagInner>
);

export type { TagColor };
export default Tag;
