import React, { MouseEvent } from "react";
import styled from "styled-components";

import colors from "@sparcs-clubs/web/styles/themes/colors";

import Icon from "./Icon";

type CheckboxProps = {
  checked: boolean;
  onClick?: (event?: MouseEvent) => void;
  disabled?: boolean;
};

const CheckboxInner = styled.div<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid
    ${({ disabled, theme }) =>
      disabled ? theme.colors.GRAY[300] : theme.colors.BLACK};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.GRAY[100] : "transparent"};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    width: 14px;
    height: 14px;
  }
`;

const CheckboxOutter = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onClick = () => {},
  disabled = false,
}) => (
  <CheckboxOutter>
    <CheckboxInner
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {checked && (
        <Icon
          type="check"
          size={16}
          color={disabled ? colors.GRAY[300] : colors.BLACK}
        />
      )}
    </CheckboxInner>
  </CheckboxOutter>
);

export default Checkbox;
