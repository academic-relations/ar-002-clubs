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
  padding-left: 2px;
`;

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
  optionText,
  checked,
  onClick,
}) => (
  <CheckboxOptionWrapper>
    <Checkbox checked={checked} onClick={onClick} />
    <Typography ff="PRETENDARD" fs={16} lh={20} color="BLACK">
      {optionText}
    </Typography>
  </CheckboxOptionWrapper>
);
export default CheckboxOption;
