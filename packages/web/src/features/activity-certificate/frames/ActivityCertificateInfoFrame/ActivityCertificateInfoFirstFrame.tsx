import React from "react";

import { Divider } from "@mui/material";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";

import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { useGetUserClubs } from "@sparcs-clubs/web/features/activity-certificate/services/useGetUserClubs";
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

  const {
    data: clubData,
    isLoading: isClubLoading,
    isError: isClubError,
  } = useGetUserClubs();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetUserProfile();

  const clubList: SelectItem<number>[] =
    clubData?.clubs.map(club => ({
      label: club.name_kr,
      value: club.id,
    })) ?? [];

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 7)
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
  };

  return (
    <AsyncBoundary
      isLoading={isClubLoading || isProfileLoading}
      isError={isClubError || isProfileError}
    >
      <Card outline gap={40}>
        <FormController
          name="clubId"
          control={control}
          required
          renderItem={props => (
            <Select {...props} label="동아리 이름" items={clubList} />
          )}
        />
        <FormController
          name="activityDuration"
          control={control}
          renderItem={props => (
            <TextInput {...props} label="활동 기간" placeholder="" disabled />
          )}
        />
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
          defaultValue={profile?.name}
          renderItem={props => (
            <TextInput {...props} label="신청자 이름" placeholder="" disabled />
          )}
        />
        <FormController
          name="applicantDepartment"
          control={control}
          defaultValue={profile?.department}
          renderItem={props => (
            <TextInput {...props} label="신청자 학과" placeholder="" disabled />
          )}
        />
        <FormController
          name="applicantStudentNumber"
          control={control}
          defaultValue={profile?.studentNumber}
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
    </AsyncBoundary>
  );
};

export default ActivityCertificateInfoFirstFrame;
