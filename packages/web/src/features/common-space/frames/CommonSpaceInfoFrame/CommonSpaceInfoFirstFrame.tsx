import React, { useEffect } from "react";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import StyledBottom from "@sparcs-clubs/web/common/components/StyledBottom";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { CommonSpaceInterface } from "@sparcs-clubs/web/features/common-space/types/commonSpace";

interface CommonSpaceInfoFirstFrameProps {
  onPrev: VoidFunction;
  onNext: VoidFunction;
}

const CommonSpaceInfoFirstFrame: React.FC<CommonSpaceInfoFirstFrameProps> = ({
  onPrev,
  onNext,
}) => {
  const {
    control,
    reset,
    setValue,
    formState: { isValid, isDirty },
  } = useFormContext<CommonSpaceInterface>();

  const { data, isLoading, isError } = useGetUserProfile();

  useEffect(() => {
    if (data) {
      reset({
        agreement: true,
        clubName: data.clubs[0]?.name_kr || "",
        name: data.name || "",
        phoneNumber: data.phoneNumber || "",
      });
    }
  }, [data, reset]);

  return (
    <AsyncBoundary isLoading={isLoading || !data} isError={isError}>
      <Card outline gap={40}>
        <FormController
          name="clubName"
          control={control}
          required
          defaultValue={data?.clubs[0].name_kr || ""}
          renderItem={({ onChange, value }) => (
            <Select
              onChange={selectedValue => {
                setValue("body.clubId", parseInt(selectedValue));
                onChange(selectedValue);
              }}
              items={
                data?.clubs.map(club => ({
                  label: club.name_kr,
                  value: club.id.toString(),
                  selectable: true,
                })) || []
              }
              label="동아리 이름"
              value={value}
            />
          )}
        />
        <FormController
          name="name"
          control={control}
          required
          renderItem={() => (
            <TextInput
              label="신청자 이름"
              placeholder={data?.name || ""}
              disabled
            />
          )}
        />
        <FormController
          name="phoneNumber"
          control={control}
          minLength={13}
          required
          defaultValue={data?.phoneNumber || ""}
          renderItem={({ onChange, value }) => (
            <PhoneInput
              label="신청자 전화번호"
              placeholder={data?.phoneNumber || ""}
              onChange={val => {
                setValue("phoneNumber", val);
                onChange(val);
              }}
              value={value}
            />
          )}
        />
      </Card>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button
          onClick={onNext}
          type={isValid && isDirty ? "default" : "disabled"}
        >
          다음
        </Button>
      </StyledBottom>
    </AsyncBoundary>
  );
};

export default CommonSpaceInfoFirstFrame;
