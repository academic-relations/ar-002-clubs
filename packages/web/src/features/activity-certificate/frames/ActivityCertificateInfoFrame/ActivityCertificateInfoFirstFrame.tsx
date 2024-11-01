import React from "react";

import { Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import { ActivityBasicInfo } from "@sparcs-clubs/web/features/activity-certificate/types/activityCertificate";

import { StyledBottom } from "../_atomic/StyledBottom";

interface ActivityCertificateInfoFirstFrameProps {
  onPrev: VoidFunction;
  onNext: VoidFunction;
}

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateInfoFirstFrameProps
> = ({ onPrev, onNext }) => {
  const {
    control,
    formState: { isValid },
  } = useFormContext<ActivityBasicInfo>();

  // TODO: api 연결
  const mockClubList: SelectItem<string>[] = [
    { label: "동아리", value: "1", selectable: true },
    { label: "또다른동아리", value: "2", selectable: true },
    { label: "안되는동아리", value: "3", selectable: false },
  ];

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 7)
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
  };

  return (
    <>
      <Card outline gap={40}>
        <FormController
          name="clubId"
          control={control}
          required
          renderItem={props => (
            <Select {...props} label="동아리 이름" items={mockClubList} />
          )}
        />
        <FormController
          name="activityDuration"
          control={control}
          renderItem={props => (
            <TextInput {...props} label="활동 기간" placeholder="" disabled />
          )}
        />
        {/* // TODO. 0일 경우 에러 */}
        <FormController
          name="issuedNumber"
          control={control}
          rules={{
            min: { value: 1, message: "1 이상이어야 합니다" },
          }}
          required
          renderItem={({ value, onChange, errorMessage }) => (
            <TextInput
              label="발급 매수"
              placeholder="X개"
              value={`${value}개`}
              onChange={data => {
                const extractedValue = data.currentTarget.value.replace(
                  /[^0-9]/g,
                  "",
                );
                onChange(+extractedValue);
              }}
              errorMessage={errorMessage}
            />
          )}
        />

        <Divider />
        <FormController
          name="applicantName"
          control={control}
          renderItem={props => (
            <TextInput {...props} label="신청자 이름" placeholder="" disabled />
          )}
        />
        <FormController
          name="applicantDepartment"
          control={control}
          renderItem={props => (
            <TextInput {...props} label="신청자 학과" placeholder="" disabled />
          )}
        />
        <FormController
          name="applicantStudentNumber"
          control={control}
          renderItem={props => (
            <TextInput {...props} label="신청자 학번" placeholder="" disabled />
          )}
        />
        <FormController
          name="applicantPhoneNumber"
          control={control}
          minLength={13}
          required
          renderItem={({ value, onChange, errorMessage }) => (
            <TextInput
              label="신청자 전화번호"
              placeholder="010-XXXX-XXXX"
              value={formatPhoneNumber(value)}
              onChange={e => {
                const formattedValue = formatPhoneNumber(e.target.value);
                onChange(formattedValue);
              }}
              errorMessage={errorMessage}
            />
          )}
        />
      </Card>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={onNext} type={isValid ? "default" : "disabled"}>
          다음
        </Button>
      </StyledBottom>
    </>
  );
};

export default ActivityCertificateInfoFirstFrame;
