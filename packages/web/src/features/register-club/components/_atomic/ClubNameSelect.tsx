import React, { useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";

import { useFormContext } from "react-hook-form";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

import { ClubRegistrationInfo } from "@sparcs-clubs/web/features/register-club/types/registerClub";

interface ClubNameSelectProps {
  clubList?: ClubRegistrationInfo[];
  editMode?: boolean;
}

const ClubNameSelect: React.FC<ClubNameSelectProps> = ({
  clubList = [],
  editMode = false,
}) => {
  const { watch, setValue } = useFormContext<ApiReg001RequestBody>();

  const clubNameKr = watch("clubNameKr");

  const [value, onChangeValue] = useState<string>(clubNameKr ?? "");

  const items: SelectItem<string>[] = clubList.map(data => ({
    value: data.id.toString(),
    label: data.clubNameKr,
  }));

  const onChange = (_value: string) => {
    const clubInfo = clubList.filter(club => club.id === parseInt(_value))[0];
    setValue("clubNameKr", clubInfo.clubNameKr, { shouldValidate: true });
    setValue("clubNameEn", clubInfo.clubNameEn, { shouldValidate: true });
    onChangeValue(clubInfo.clubNameKr);
  };

  return (
    <Select
      label="동아리명 (국문)"
      placeholder="동아리명을 선택해주세요"
      items={items}
      value={value}
      disabled={editMode}
      onChange={onChange}
    />
  );
};

export default ClubNameSelect;
