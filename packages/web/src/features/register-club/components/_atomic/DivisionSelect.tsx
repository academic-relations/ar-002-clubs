import React from "react";

import FormController from "@sparcs-clubs/web/common/components/FormController";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

interface DivisionSelectProps {
  isRenewal?: boolean;
}

const DivisionSelect: React.FC<DivisionSelectProps> = ({
  isRenewal = false,
}) => {
  const divisionItems: SelectItem<string>[] = Object.values(DivisionType).map(
    data => ({
      value: data.toString(),
      label: data.toString(),
    }),
  );
  return (
    <FormController
      name="divisionId"
      required
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
