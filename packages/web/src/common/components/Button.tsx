"use client";

import React, { HTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = {
  type?: keyof typeof ButtonTypeInner;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const ButtonInner = styled.div`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const ButtonDefaultInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.WHITE};
  background: ${({ theme }) => theme.colors.PRIMARY};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.MINT[800]};
  }
`;

const ButtonOutlinedInner = styled(ButtonInner)`
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  }
`;

const ButtonDisabledInner = styled(ButtonInner)`
  color: ${({ theme }) => theme.colors.GRAY[300]};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  background: ${({ theme }) => theme.colors.GRAY[100]};
  cursor: not-allowed;
`;

const ButtonTypeInner = {
  default: ButtonDefaultInner,
  outlined: ButtonOutlinedInner,
  disabled: ButtonDisabledInner,
};

const Button = ({ type = "default", children, ...divProps }: ButtonProps) => {
  const ButtonChosenInner = ButtonTypeInner[type];
  return (
    <ButtonChosenInner
      {...divProps}
      onClick={type === "disabled" ? undefined : divProps.onClick}
    >
      {children}
    </ButtonChosenInner>
  );
};

export default Button;
