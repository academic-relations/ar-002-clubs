import React from "react";

import styled from "styled-components";

import Checkbox from "./Checkbox";
import Typography from "./Typography";

interface CheckboxOptionProps {
  optionText: string;
  checked: boolean;
  onClick: () => void;
}

const CheckboxOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 8px;
  }
  padding-left: 2px;
`;

const ResponsiveTypography = styled(Typography)`
  font-size: 16px;
  line-height: 20px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
  }
`;

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  optionText,
  checked,
  onClick,
}) => (
  <CheckboxOptionWrapper>
    <Checkbox checked={checked} onClick={onClick} />
    <ResponsiveTypography ff="PRETENDARD" color="BLACK">
      {optionText}
    </ResponsiveTypography>
  </CheckboxOptionWrapper>
);
export default CheckboxOption;
