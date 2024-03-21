"use client";

import React from "react";
import styled from "styled-components";

type TagColor = "GREEN" | "BLUE" | "ORANGE" | "PURPLE" | "PINK" | "YELLOW";

const TagInner = styled.div<{ color: TagColor }>`
  position: relative;
  width: fit-content;
  padding: 4px 12px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme, color }) => theme.colors[color][600]};
  background-color: ${({ theme, color }) => theme.colors[color][200]};
  border-radius: ${({ theme }) => theme.round.sm};
`;

interface TagProps extends React.PropsWithChildren {
  color?: TagColor;
}

const Tag: React.FC<TagProps> = ({ children = <div />, color = "BLUE" }) => (
  <TagInner color={color}>{children}</TagInner>
);

export type { TagColor };
export default Tag;
