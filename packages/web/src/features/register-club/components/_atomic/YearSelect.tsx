import React, { useState } from "react";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const YearSelect: React.FC = () => {
  const [year, setYear] = useState("");

  const startYear = 1980;

  const years = Array.from(
    { length: new Date().getFullYear() - startYear + 1 },
    (_, i) => startYear + i,
  );

  const yearSelectItems: SelectItem[] = years.map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  return (
    <Select
      label="설립 연도"
      placeholder="설립 연도를 선택해주세요"
      items={yearSelectItems}
      selectedValue={year}
      onSelect={setYear}
    />
  );
};

export default YearSelect;
