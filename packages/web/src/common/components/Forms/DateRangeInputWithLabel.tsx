import React from "react";

import FlexWrapper from "../FlexWrapper";
import Typography from "../Typography";

import DateRangeInput from "./DateRangeInput";

interface DateRangeInputWithLabelProps {
  label: string;
  placeholder?: string;
}

const DateRangeInputWithLabel: React.FC<DateRangeInputWithLabelProps> = ({
  label,
  placeholder = "20XX.XX.XX",
}) => (
  <FlexWrapper gap={4} direction="column">
    <Typography fs={16} lh={20} fw="MEDIUM">
      {label}
    </Typography>
    <DateRangeInput
      startValue=""
      endValue=""
      limitStartValue=""
      limitEndValue=""
      onChange={() => {}}
      placeholder={placeholder}
      isTextAlignCenter
    />
  </FlexWrapper>
);

export default DateRangeInputWithLabel;
