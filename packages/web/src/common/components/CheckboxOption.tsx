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
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 8px;
  }
  padding-left: 2px;
`;

const CheckboxWrapper = styled.div`
  height: 20px !important;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    height: 16px !important;
  }
  justify-content: center;
  align-items: center;
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
    <CheckboxWrapper>
      <Checkbox checked={checked} onClick={onClick} />
    </CheckboxWrapper>
    <ResponsiveTypography ff="PRETENDARD" color="BLACK">
      {optionText}
    </ResponsiveTypography>
  </CheckboxOptionWrapper>
);
export default CheckboxOption;
