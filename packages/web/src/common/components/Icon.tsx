"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Icon as MUIIcon } from "@mui/material";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
}

const IconInner = styled.div<{ size: number; clickable: boolean }>`
  display: flex;
  font-size: ${({ size }) => size}px;
  color: ${({ color, theme }) => color || theme.colors.BLACK};
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Icon: React.FC<IconProps> = ({
  type,
  size,
  onClick = undefined,
  color = colors.BLACK,
}) => (
  <IconInner size={size} clickable={!!onClick} color={color} onClick={onClick}>
    <MUIIcon fontSize="inherit">{type}</MUIIcon>
  </IconInner>
);

export default Icon;
