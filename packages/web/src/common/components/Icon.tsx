"use client";

import React from "react";
import styled from "styled-components";
import { Icon as MUIIcon } from "@mui/material";

interface IconProps {
  type: string;
  size: number;
}

const IconInner = styled(MUIIcon)<{ size: number }>`
  font-size: ${({ size }) => size}px;
  color: ${({ theme }) => theme.colors.BLACK};
`;

const Icon: React.FC<IconProps> = ({ type, size }) => (
  <IconInner fontSize="inherit" size={size}>
    {type}
  </IconInner>
);
export default Icon;
