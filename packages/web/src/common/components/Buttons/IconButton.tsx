import React from "react";

import isPropValid from "@emotion/is-prop-valid";

import styled from "styled-components";

import Icon from "../Icon";

interface IconButtonProps {
  type?: keyof typeof IconButtonTypeInner;
  icon: string;
  size?: number;
  onClick: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const IconButtonInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop) && prop !== "hasChildren",
})<{ hasChildren: boolean }>`
  display: inline-flex;
  padding: ${({ hasChildren }) => (hasChildren ? "8px 16px" : "8px")};
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  gap: 4px;
`;

const IconButtonDefaultInner = styled(IconButtonInner)`
  color: ${({ theme }) => theme.colors.WHITE};
  background: ${({ theme }) => theme.colors.PRIMARY};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.MINT[800]};
  }
`;

const IconButtonOutlinedInner = styled(IconButtonInner)`
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  }
`;

const IconButtonDisabledInner = styled(IconButtonInner)`
  color: ${({ theme }) => theme.colors.GRAY[300]};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  background: ${({ theme }) => theme.colors.GRAY[100]};
  cursor: not-allowed;
`;

const IconButtonTypeInner = {
  default: IconButtonDefaultInner,
  outlined: IconButtonOutlinedInner,
  disabled: IconButtonDisabledInner,
};

const IconButton = ({
  type = "default",
  icon,
  onClick,
  size = 16,
  children = null,
  style = {},
  ...props
}: IconButtonProps) => {
  const IconButtonChosenInner = IconButtonTypeInner[type];
  const handleClick = type !== "disabled" ? onClick : undefined;

  return (
    <IconButtonChosenInner
      onClick={handleClick}
      hasChildren={!!children}
      style={style}
      {...props}
    >
      <Icon type={icon} size={size} color="inherit" />
      {children}
    </IconButtonChosenInner>
  );
};

export default IconButton;
