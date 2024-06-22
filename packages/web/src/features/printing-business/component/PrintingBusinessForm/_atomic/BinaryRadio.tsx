import React from "react";

import styled from "styled-components";

import Radio from "@sparcs-clubs/web/common/components/Radio";
import RadioOption from "@sparcs-clubs/web/common/components/Radio/RadioOption";

interface BinaryRadioProps {
  label?: string;
  firstOptionLabel: string;
  secondOptionLabel: string;
  isFirstOptionSelected: boolean;
  setIsFirstOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const BinaryRadioInner = styled.div`
  width: 1056px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 2px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 20px;
  text-align: left;
`;

const BinaryRadio: React.FC<BinaryRadioProps> = ({
  label = undefined,
  firstOptionLabel,
  secondOptionLabel,
  isFirstOptionSelected,
  setIsFirstOptionSelected,
}) => (
  <BinaryRadioInner>
    <StyledLabel>{label}</StyledLabel>
    <Radio
      value={String(isFirstOptionSelected)}
      onChange={(boolStr: string) =>
        setIsFirstOptionSelected(JSON.parse(boolStr))
      }
    >
      {[
        <RadioOption key={`${label}_true`} value="true">
          {firstOptionLabel}
        </RadioOption>,
        <RadioOption key={`${label}_false`} value="false">
          {secondOptionLabel}
        </RadioOption>,
      ]}
    </Radio>
  </BinaryRadioInner>
);

export default BinaryRadio;
