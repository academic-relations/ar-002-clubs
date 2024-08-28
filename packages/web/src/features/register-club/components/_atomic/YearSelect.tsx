import React, { useEffect, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { useFormContext } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const YearSelect: React.FC<{ isProvisional?: boolean }> = ({
  isProvisional = false,
}) => {
  const { watch, setValue } = useFormContext<ApiReg001RequestBody>();
  const foundedAt = watch("foundedAt");

  const [value, onChange] = useState<number>();

  const startYear = 1980;

  const years = Array.from(
    { length: new Date().getFullYear() - startYear + 1 },
    (_, i) => startYear + i,
  ).reverse();

  useEffect(() => {
    if (value == null && foundedAt != null) {
      onChange(foundedAt.getFullYear());
    }
  }, [foundedAt, value]);

  useEffect(() => {
    if (value == null) return;

    const selectedDate = foundedAt == null ? new Date() : foundedAt;

    selectedDate.setFullYear(value);
    if (foundedAt) {
      selectedDate.setMonth(foundedAt.getMonth());
    }

    setValue("foundedAt", selectedDate);
  }, [value, setValue, isProvisional]);

  const yearSelectItems: SelectItem<number>[] = years.map(data => ({
    value: data,
    label: data.toString(),
  }));

  return (
    <Select
      label="설립 연도"
      placeholder="설립 연도를 선택해주세요"
      items={yearSelectItems}
      value={value}
      onChange={onChange}
    />
  );
};

export default YearSelect;
