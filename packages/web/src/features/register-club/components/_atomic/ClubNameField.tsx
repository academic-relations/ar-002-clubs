import React, { useCallback, useEffect, useState } from "react";

import { ApiReg001RequestBody } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg001";
import { useFormContext } from "react-hook-form";

import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";

import { ClubRegistrationInfo } from "@sparcs-clubs/web/features/register-club/types/registerClub";

interface ClubNameFieldProps {
  clubList?: ClubRegistrationInfo[];
}

const ClubNameField: React.FC<ClubNameFieldProps> = ({ clubList = [] }) => {
  const { control, resetField, setValue } =
    useFormContext<ApiReg001RequestBody>();

  const [isCheckedClubName, setIsCheckedClubName] = useState(false);

  const clubOptions = useCallback(
    () =>
      clubList?.map(
        data =>
          ({
            label: data.clubNameKr,
            value: data.id,
          }) as SelectItem<number>,
      ),
    [clubList],
  );

  useEffect(() => {
    if (clubList.length > 0 && !isCheckedClubName) {
      resetField("clubNameKr", { keepError: false });
      resetField("clubNameEn", { keepError: false });
      setValue("clubNameKr", "");
      setValue("clubNameEn", "");
    }
  }, [clubList.length, isCheckedClubName, resetField, setValue]);

  if (clubList.length === 0) {
    return (
      <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
        <FormController
          name="clubNameKr"
          required
          control={control}
          renderItem={props => (
            <TextInput
              {...props}
              label="동아리명 (국문)"
              placeholder="국문 동아리명을 입력해주세요"
            />
          )}
        />
        <FormController
          name="clubNameEn"
          required
          control={control}
          renderItem={props => (
            <TextInput
              {...props}
              label="동아리명 (영문)"
              placeholder="영문 동아리명을 입력해주세요"
            />
          )}
        />
      </FlexWrapper>
    );
  }

  return (
    <>
      <FormController
        name="clubId"
        required
        control={control}
        renderItem={props => (
          <Select
            {...props}
            label="동아리명 (국문)"
            placeholder="동아리명을 선택해주세요"
            items={clubOptions()}
          />
        )}
      />
      <CheckboxOption
        optionText="동아리명을 변경하고 싶어요"
        checked={isCheckedClubName}
        onClick={() => {
          setIsCheckedClubName(!isCheckedClubName);
        }}
      />
      {isCheckedClubName && (
        <FlexWrapper direction="row" gap={32} style={{ width: "100%" }}>
          <FormController
            name="clubNameKr"
            required={isCheckedClubName}
            control={control}
            renderItem={props => (
              <TextInput
                {...props}
                label="신규 동아리명 (국문)"
                placeholder="국문 동아리명을 입력해주세요"
              />
            )}
          />
          <FormController
            name="clubNameEn"
            required={isCheckedClubName}
            control={control}
            renderItem={props => (
              <TextInput
                {...props}
                label="신규 동아리명 (영문)"
                placeholder="영문 동아리명을 입력해주세요"
              />
            )}
          />
        </FlexWrapper>
      )}
    </>
  );
};

export default ClubNameField;
