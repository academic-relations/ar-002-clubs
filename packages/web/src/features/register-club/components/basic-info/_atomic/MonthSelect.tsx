import React, { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import {
  getActualMonth,
  getActualYear,
} from "@sparcs-clubs/web/utils/Date/extractDate";

const MonthSelect: React.FC = () => {
  const { setValue, watch } = useFormContext<ApiReg001RequestBody>();

  const foundedAt = watch("foundedAt");
  const initialValue = useMemo(
    () => (foundedAt ? getActualMonth(foundedAt).toString() : ""),
    [foundedAt],
  );
  const [value, onChangeValue] = useState<string>(initialValue);

  const items: SelectItem<string>[] = Array.from(
    { length: 12 },
    (_, i) => i + 1,
  ).map(data => ({
    value: data.toString(),
    label: data.toString(),
  }));

  const onChange = (_value: string) => {
    const month = parseInt(_value);
    const year = foundedAt ? getActualYear(foundedAt) : 2020;
    const date = new Date(`${year}-${month.toString().padStart(2, "0")}-01`);
    setValue("foundedAt", date, { shouldValidate: true });
    onChangeValue(_value);
  };

  return (
    <Select
      label="설립 월"
      placeholder="설립 월을 선택해주세요"
      items={items}
      value={value}
      onChange={onChange}
    />
  );
};

export default MonthSelect;
