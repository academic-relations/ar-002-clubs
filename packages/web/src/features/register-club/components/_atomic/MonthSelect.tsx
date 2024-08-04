import React, { useState } from "react";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const MonthSelect: React.FC = () => {
  const [month, setMonth] = useState("");

  const monthSelectItems: SelectItem[] = Array.from(
    { length: 12 },
    (_, i) => i + 1,
  ).map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  return (
    <Select
      label="설립 월"
      placeholder="설립 월을 선택해주세요"
      items={monthSelectItems}
      selectedValue={month}
      onSelect={setMonth}
    />
  );
};

export default MonthSelect;
