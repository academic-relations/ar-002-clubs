import React from "react";
import { useFormContext } from "react-hook-form";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import { DivisionTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface DivisionSelectProps {
  isRenewal?: boolean;
}

const DivisionSelect: React.FC<DivisionSelectProps> = ({
  isRenewal = false,
}) => {
  const { control } = useFormContext<ApiReg001RequestBody>();

  const divisionItems: SelectItem<number>[] = Object.values(DivisionType)
    .filter(value => typeof value === "number")
    .map(data => {
      const { text } = getTagDetail(+data, DivisionTypeTagList);
      return {
        value: +data,
        label: text,
      };
    });

  return (
    <FormController
      name="divisionId"
      required
      control={control}
      renderItem={props => (
        <Select
          {...props}
          label={isRenewal ? "소속 분과" : "희망 분과"}
          placeholder={
            isRenewal ? "소속 분과를 선택해주세요" : "희망 분과를 선택해주세요"
          }
          items={divisionItems}
        />
      )}
    />
  );
};

export default DivisionSelect;
