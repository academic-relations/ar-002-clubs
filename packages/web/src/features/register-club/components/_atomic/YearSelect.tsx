import React from "react";

import { Controller } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const YearSelect: React.FC = () => {
  const startYear = 1980;

  const years = Array.from(
    { length: new Date().getFullYear() - startYear + 1 },
    (_, i) => startYear + i,
  );

  const yearSelectItems: SelectItem<string>[] = years.map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  return (
    <Controller
      name="foundedYearAt"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          label="설립 연도"
          placeholder="설립 연도를 선택해주세요"
          items={yearSelectItems}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default YearSelect;
