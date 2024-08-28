import React, { useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { useFormContext } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

const YearSelect: React.FC = () => {
  const { watch, setValue } = useFormContext<ApiReg001RequestBody>();

  const foundedAt = watch("foundedAt");

  const [value, onChangeValue] = useState<string>(
    foundedAt ? foundedAt.getFullYear().toString() : "",
  );

  const startYear = 1980;
  const years = Array.from(
    { length: new Date().getFullYear() - startYear + 1 },
    (_, i) => startYear + i,
  ).reverse();
  const items: SelectItem<string>[] = years.map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  const onChange = (_value: string) => {
    const year = parseInt(_value);
    const month = foundedAt ? foundedAt.getMonth() : 1;
    const date = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
    setValue("foundedAt", date);
    onChangeValue(_value);
  };

  return (
    <Select
      label="설립 연도"
      placeholder="설립 연도를 선택해주세요"
      items={items}
      value={value}
      onChange={onChange}
    />
  );
};

export default YearSelect;
