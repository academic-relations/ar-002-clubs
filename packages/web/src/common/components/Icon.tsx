"use client";

import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import { Icon as MUIIcon } from "@mui/material";
import styled, { css } from "styled-components";

import colors from "@sparcs-clubs/web/styles/themes/colors";

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
  className?: string;
}

const IconInner = styled(MUIIcon).withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{
  clickable: boolean;
}>`
  display: flex;
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
  className = "",
}) => (
  <IconInner
    className={className}
    clickable={!!onClick}
    onClick={onClick}
    style={{ color, fontSize: size }}
  >
    {type}
  </IconInner>
);

export default Icon;
