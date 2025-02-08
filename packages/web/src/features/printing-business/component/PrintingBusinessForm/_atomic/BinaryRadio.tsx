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

const BinaryRadio: React.FC<BinaryRadioProps> = ({
  label = undefined,
  firstOptionLabel,
  secondOptionLabel,
  isFirstOptionSelected,
  setIsFirstOptionSelected,
}) => (
  <BinaryRadioInner>
    <Radio
      label={label}
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
