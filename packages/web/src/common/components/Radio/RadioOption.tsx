"use client";

import React from "react";

import styled from "styled-components";

import RadioButton from "./RadioButton";

export interface RadioOptionProps<T extends string> {
  value: T;
  checked?: boolean;
  children: React.ReactNode;
  onClick?: (value: T) => void;
  disabled?: boolean;
}

const RadioOptionInner = styled.div<{ disabled: boolean }>`
  display: flex;
  padding-left: 2px;
  align-items: center;
  gap: 12px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.GRAY[300] : theme.colors.BLACK};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;

const RadioOption = <T extends string>({
  value,
  checked = false,
  children,
  onClick = () => {},
  disabled = false,
}: RadioOptionProps<T>) => (
  <RadioOptionInner
    onClick={() => !disabled && onClick(value)}
    disabled={disabled}
  >
    <RadioButton checked={checked} />
    {children}
  </RadioOptionInner>
);

export default RadioOption;
