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
  <CheckboxInner>
    {checked && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M14 4.66668L5.99999 12.6667L2.33333 9.00002L3.27333 8.06002L5.99999 10.78L13.06 3.72668L14 4.66668Z"
          fill="#333333"
        />
      </svg>
    )}
  </CheckboxInner>
);

export default Checkbox;
