import React from "react";

import styled from "styled-components";

interface IconButtonProps {
  type?: keyof typeof IconButtonTypeInner;
  icon: string;
  onClick: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const IconButtonInner = styled.div<{ hasChildren: boolean }>`
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
  children = null,
  style = {},
  ...props
}: IconButtonProps) => {
  const IconButtonChosenInner = IconButtonTypeInner[type];
  return (
    <IconButtonChosenInner
      onClick={onClick}
      hasChildren={!!children}
      style={style}
      {...props}
    >
      <i className="material-icons">{icon}</i>
      {children}
    </IconButtonChosenInner>
  );
};

export default IconButton;
