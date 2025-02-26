"use client";

import React, { useEffect, useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import PhoneInput from "@sparcs-clubs/web/common/components/Forms/PhoneInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import type { SelectItem } from "@sparcs-clubs/web/common/components/Select";
import Select from "@sparcs-clubs/web/common/components/Select";
import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import useGetMyClub from "@sparcs-clubs/web/features/my/clubs/service/useGetMyClub";

import { RentalFrameProps } from "../RentalNoticeFrame";

const RentalInfoFirstFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ formCtx, setNextEnabled }) => {
  const { data, isLoading, isError } = useGetUserProfile();
  // usr001 수정 후 다시 확인
  const {
    data: clubData,
    isLoading: clubIsLoading,
    isError: clubIsError,
  } = useGetMyClub();

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = formCtx;

  const [clubList, setClubList] = useState<SelectItem<string>[]>([]);
  const [userPhone, setUserPhone] = useState<string | undefined>();

  useEffect(() => {
    if (data) {
      // setClubList(
      //   data.clubs.map(club => ({
      //     label: club.nameKr,
      //     value: String(club.id),
      //     selectable: true,
      //   })),
      // );
      setValue("info.applicant", data.name);
      setUserPhone(data.phoneNumber);
    }
    if (clubData) {
      setClubList(
        clubData?.semesters[0].clubs.map(club => ({
          label: club.nameKr,
          value: String(club.id),
          selectable: true,
        })),
      );
    }
  }, [data, clubData, setClubList, setUserPhone, setValue]);

  const clubId = watch("info.clubId");
  const phoneNumber = watch("info.phoneNumber");

  useEffect(() => {
    const hasNoErrors = !errors.info?.clubId && !errors.info?.phoneNumber;
    setNextEnabled(!!clubId && !!phoneNumber && hasNoErrors);
  }, [clubId, phoneNumber, errors, setNextEnabled]);

  useEffect(() => {
    const clubName = clubList.find(
      club => club.value === String(clubId),
    )?.label;
    if (clubName) {
      setValue("info.clubName", clubName);
    }
  }, [clubId, clubList, setValue]);

  return (
    // TODO: club loading & error 지우기
    <AsyncBoundary
      isLoading={isLoading && clubIsLoading}
      isError={isError && clubIsError}
    >
      <Card outline gap={40}>
        <FormController
          name="info.clubId"
          required
          control={control}
          renderItem={props => (
            <Select {...props} items={clubList} label="동아리 이름" />
          )}
        />
        <TextInput
          label="신청자 이름"
          placeholder={watch("info.applicant") ?? ""}
          disabled
        />
        <FormController
          name="info.phoneNumber"
          required
          control={control}
          defaultValue={data?.phoneNumber}
          // TODO: phoneInput 조건 달기
          // minLength={13}
          // pattern={/^(\d{3}-\d{4}-\d{4})$/}
          renderItem={props => (
            <PhoneInput
              {...props}
              label="신청자 전화번호"
              placeholder={
                /^(\d{3}-\d{4}-\d{4})$/.test(userPhone ?? "")
                  ? (userPhone ?? "")
                  : ""
              }
            />
          )}
        />
      </Card>
    </AsyncBoundary>
  );
};

export default RentalInfoFirstFrame;
