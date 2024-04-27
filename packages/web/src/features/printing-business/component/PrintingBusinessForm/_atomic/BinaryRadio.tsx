import React from "react";

import Radio from "@sparcs-clubs/web/common/components/Radio";
import RadioOption from "@sparcs-clubs/web/common/components/Radio/RadioOption";

interface BinaryRadioProps {
  firstOptionLabel: string;
  secondOptionLabel: string;
  isFirstOptionSelected: boolean;
  setIsFirstOptionSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const BinaryRadio: React.FC<BinaryRadioProps> = ({
  firstOptionLabel,
  secondOptionLabel,
  isFirstOptionSelected,
  setIsFirstOptionSelected,
}) => (
  <Radio
    value={String(isFirstOptionSelected)}
    onChange={(boolStr: string) =>
      setIsFirstOptionSelected(JSON.parse(boolStr))
    }
  >
    {[
      <RadioOption value="true">{firstOptionLabel}</RadioOption>,
      <RadioOption value="false">{secondOptionLabel}</RadioOption>,
    ]}
  </Radio>
);

export default BinaryRadio;
