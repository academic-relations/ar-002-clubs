import React from "react";

import { Controller } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const MonthSelect: React.FC = () => {
  const monthSelectItems: SelectItem<string>[] = Array.from(
    { length: 12 },
    (_, i) => i + 1,
  ).map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  return (
    <Controller
      name="foundedMonthAt"
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          label="설립 월"
          placeholder="설립 월을 선택해주세요"
          items={monthSelectItems}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default MonthSelect;
