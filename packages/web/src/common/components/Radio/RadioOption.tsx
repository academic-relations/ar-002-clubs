"use client";

import React from "react";
import styled from "styled-components";
import RadioButton from "./RadioButton";

export interface RadioOptionProps<T extends string> {
  value: T;
  checked?: boolean;
  children: React.ReactNode;
  onClick?: (value: T) => void;
}

const RadioOptionInner = styled.div`
  display: flex;
  padding-left: 2px;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.BLACK};
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
}: RadioOptionProps<T>) => (
  <RadioOptionInner onClick={() => onClick(value)}>
    <RadioButton checked={checked} />
    {children}
  </RadioOptionInner>
);

export default RadioOption;
