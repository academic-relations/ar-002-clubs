import React, { useCallback, useEffect } from "react";

import { Divider } from "@mui/material";

import { useFormContext } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";

import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import Select, { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import { StyledBottom } from "@sparcs-clubs/web/common/components/StyledBottom";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import { useGetUserClubs } from "@sparcs-clubs/web/features/activity-certificate/services/useGetUserClubs";
import { ActivityBasicInfo } from "@sparcs-clubs/web/features/activity-certificate/types/activityCertificate";
import { formatActivityDuration } from "@sparcs-clubs/web/features/activity-certificate/utils/formatActivityDuration";

interface ActivityCertificateInfoFirstFrameProps {
  onPrev: VoidFunction;
  onNext: VoidFunction;
}

const ActivityCertificateInfoFirstFrame: React.FC<
  ActivityCertificateInfoFirstFrameProps
> = ({ onPrev, onNext }) => {
  const {
    watch,
    control,
    resetField,
    formState: { isValid },
  } = useFormContext<ActivityBasicInfo>();

  const clubId = watch("clubId");

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

  const getActivityDuration = useCallback(
    () =>
      clubData?.clubs
        .find(club => club.id === clubId)
        ?.dateRange.map(({ startMonth, endMonth }) => ({
          startMonth: new Date(
            new Date(startMonth).getFullYear(),
            new Date(startMonth).getMonth(),
          ),
          endMonth: endMonth ? new Date(endMonth) : undefined,
        })),
    [clubData?.clubs, clubId],
  );

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 3) return numericValue;
    if (numericValue.length <= 7)
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
  };

  useEffect(() => {
    if (clubId != null) {
      resetField("activityDuration", {
        defaultValue: getActivityDuration(),
      });
    }
  }, [clubId, getActivityDuration, resetField]);

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
          required
          renderItem={({ value }) => (
            <TextInput
              label="활동 기간"
              placeholder={formatActivityDuration(value ?? [])}
              disabled
            />
          )}
        />
        <FormController
          name="issuedNumber"
          control={control}
          rules={{
            min: { value: 1, message: "1 이상이어야 합니다" },
          }}
          required
          renderItem={props => (
            <ItemNumberInput {...props} label="발급 매수" placeholder="X개" />
          )}
        />

        <Divider />
        <FormController
          name="applicantName"
          control={control}
          defaultValue={profile?.name}
          renderItem={({ value }) => (
            <TextInput label="신청자 이름" placeholder={value} disabled />
          )}
        />
        <FormController
          name="applicantDepartment"
          control={control}
          defaultValue={profile?.department}
          renderItem={({ value }) => (
            <TextInput label="신청자 학과" placeholder={value} disabled />
          )}
        />
        <FormController
          name="applicantStudentNumber"
          control={control}
          defaultValue={profile?.studentNumber}
          renderItem={({ value }) => (
            <TextInput
              label="신청자 학번"
              placeholder={value.toString()}
              disabled
            />
          )}
        />
        <FormController
          name="applicantPhoneNumber"
          control={control}
          minLength={13}
          required
          pattern={/^010-\d{4}-\d{4}$/}
          patternMessage="전화번호는 010으로 시작하여야 합니다"
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
