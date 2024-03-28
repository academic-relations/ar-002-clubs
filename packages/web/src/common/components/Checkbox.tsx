"use client";

import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

type CheckboxProps = {
  checked: boolean;
};

const CheckboxInner = styled.div`
  display: inline-flex;
  align-items: flex-start;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
`;

const Checkbox = ({ checked }: CheckboxProps) => (
  <CheckboxInner>{checked && <Icon type="check" size={16} />}</CheckboxInner>
);

export default Checkbox;
