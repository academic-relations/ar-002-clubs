"use client";

import React from "react";
import styled, { css } from "styled-components";
import { Icon as MUIIcon } from "@mui/material";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
}

const IconInner = styled.div<{ size: number; clickable: boolean }>`
  display: flex;
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.BLACK};
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Icon: React.FC<IconProps> = ({ type, size, onClick = () => {} }) => (
  <IconInner size={size} clickable={!!onClick} onClick={onClick}>
    <MUIIcon fontSize="inherit">{type}</MUIIcon>
  </IconInner>
);

export default Icon;
