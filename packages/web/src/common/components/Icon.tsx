"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Icon as MUIIcon } from "@mui/material";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  isWhite?: boolean;
}

const IconInner = styled.div<{
  size: number;
  clickable: boolean;
  isWhite: boolean;
}>`
  display: flex;
  font-size: ${({ size }) => size}px;
  color: ${({ theme, isWhite }) =>
    isWhite ? theme.colors.WHITE : theme.colors.BLACK};
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Icon: React.FC<IconProps> = ({
  type,
  size,
  onClick = () => {},
  isWhite = false,
}) => (
  <IconInner
    size={size}
    clickable={!!onClick}
    onClick={onClick}
    isWhite={isWhite}
  >
    <MUIIcon fontSize="inherit">{type}</MUIIcon>
  </IconInner>
);

export default Icon;
