import React, { useEffect, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { useFormContext } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const MonthSelect: React.FC = () => {
  const { watch, setValue } = useFormContext<ApiReg001RequestBody>();
  const foundedAt = watch("foundedAt");

  const [value, onChange] = useState<number>();

  const monthSelectItems: SelectItem<number>[] = Array.from(
    { length: 12 },
    (_, i) => i + 1,
  ).map(data => ({
    value: data,
    label: data.toString(),
  }));

  useEffect(() => {
    if (value == null) return;

    const selectedDate = foundedAt == null ? new Date() : foundedAt;

    selectedDate.setMonth(value - 1);

    setValue("foundedAt", selectedDate);
  }, [value, setValue]);

  return (
    <Select
      label="설립 월"
      placeholder="설립 월을 선택해주세요"
      items={monthSelectItems}
      value={value}
      onChange={onChange}
    />
  );
};

export default MonthSelect;
