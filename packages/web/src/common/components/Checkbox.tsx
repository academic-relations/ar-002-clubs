"use client";

import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

type CheckboxProps = {
  checked: boolean;
};

const CheckboxInner = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const Checkbox = ({ checked }: CheckboxProps) => (
  <CheckboxInner>{checked && <Icon type="check" size={16} />}</CheckboxInner>
);

export default Checkbox;
