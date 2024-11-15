"use client";

import React, { useEffect } from "react";

import { FormProvider } from "react-hook-form";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { ListItem } from "@sparcs-clubs/web/common/components/ListItem";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import RentalList from "@sparcs-clubs/web/features/rental-business/components/RentalList";
import mockupAvailableRental from "@sparcs-clubs/web/features/rental-business/service/_mock/mockAvailableRental";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { RentalFrameProps } from "../RentalNoticeFrame";

const RentalPeriodInner = styled.div`
  display: flex;
`;

const RentalInfoThirdFrame: React.FC<
  RentalFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ formCtx, setNextEnabled }) => {
  const { control, getValues, watch } = formCtx;
  const purpose = watch("purpose");

  useEffect(() => {
    setNextEnabled(!!purpose);
  }, [purpose, setNextEnabled]);

  return (
    <FormProvider {...formCtx}>
      <Card outline gap={20}>
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={16} lh={20} fw="MEDIUM">
            신청자 정보
          </Typography>
          <ListItem>동아리: {getValues("info.clubName")}</ListItem>
          <ListItem>담당자: {getValues("info.applicant")}</ListItem>
          <ListItem>연락처: {getValues("info.phoneNumber")}</ListItem>
        </FlexWrapper>
        <FlexWrapper direction="row" gap={16}>
          <Typography fs={16} lh={20} fw="MEDIUM">
            대여 기간
          </Typography>
          <RentalPeriodInner>
            {formatDate(getValues("date.start") || new Date())} ~
            {formatDate(getValues("date.end") || new Date())}
            {/* new Date() 넣어도 되는 이유: thirdFrame에서는 rental date가 둘 다 not null인 상태로 넘어옴 */}
          </RentalPeriodInner>
        </FlexWrapper>
        <Typography fs={16} lh={20} fw="MEDIUM">
          대여 물품
        </Typography>
        {/* TODO: RentalList mockupAvailableRental 없애기 */}
        <RentalList
          formCtx={formCtx}
          availableRentals={mockupAvailableRental}
        />
        {/* TODO: 조건 채우기 */}
        <FormController
          name="purpose"
          required
          control={control}
          renderItem={props => (
            <TextInput {...props} placeholder="내용" area label="대여 목적" />
          )}
        />
      </Card>
    </FormProvider>
  );
};

export default RentalInfoThirdFrame;
