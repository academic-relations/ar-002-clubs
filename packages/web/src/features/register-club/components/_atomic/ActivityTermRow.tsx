import React, { useState } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import DateRangeInput from "@sparcs-clubs/web/common/components/Forms/DateRangeInput";

const ActivityTermRow: React.FC<{
  startDate: string;
  endDate: string;
  onDateChange: (index: number, start: string, end: string) => void;
  index: number;
}> = ({ startDate, endDate, onDateChange, index }) => {
  const [startMonth, setStartMonth] = useState<string>(startDate);
  const [endMonth, setEndMonth] = useState<string>(endDate);
  const handleDateChange = (monthString: string) => {
    const start = monthString.split("|")[0];
    const end = monthString.split("|")[1];
    setStartMonth(start);
    setEndMonth(end);
    onDateChange(index, start, end);
  };

  return (
    <FlexWrapper direction="row" gap={8}>
      <DateRangeInput
        startValue={startMonth}
        endValue={endMonth}
        limitStartValue="1970.01"
        limitEndValue="2030.01"
        placeholder="20XX.XX"
        onChange={handleDateChange}
      />
    </FlexWrapper>
  );
};

export default ActivityTermRow;
