import React, { useCallback } from "react";

import { differenceInHours, differenceInMinutes, subSeconds } from "date-fns";

import { useFormContext } from "react-hook-form";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import StyledBottom from "@sparcs-clubs/web/common/components/StyledBottom";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import useGetCommonSpaces from "@sparcs-clubs/web/features/common-space/service/getCommonSpaces";
import postCommonSpaceUsageOrder from "@sparcs-clubs/web/features/common-space/service/postCommonSpaceUsageOrder";
import { CommonSpaceInterface } from "@sparcs-clubs/web/features/common-space/types/commonSpace";
import {
  formatSimpleSlashDate,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formatDate";

const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  padding-left: 20px;
`;

const ReservationInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const CommonSpaceInfoThirdFrame: React.FC<
  Partial<CommonSpaceInterface> & { onPrev: () => void }
> = ({ onPrev }) => {
  const {
    watch,
    getValues,
    formState: { isValid },
  } = useFormContext();
  const body = watch("body");
  const param = watch("param");
  const { email, clubId, startTerm, endTerm } = body;

  const { spaceId } = param;
  const {
    data: commonSpacesData,
    isLoading: commonSpacesLoading,
    isError: commonSpacesError,
  } = useGetCommonSpaces();

  const {
    data: userProfileData,
    isLoading: userProfileLoading,
    isError: userProfileError,
  } = useGetUserProfile();

  const handleSubmit = useCallback(() => {
    if (isValid) {
      postCommonSpaceUsageOrder(
        { spaceId },
        { email, clubId, startTerm, endTerm: subSeconds(endTerm, 1) },
      );
    }
  }, [body, param]);

  return isValid ? (
    <>
      <Card outline gap={20}>
        <CardInner>
          <Typography fs={16} lh={20} fw="MEDIUM">
            신청자 정보
          </Typography>
          <AsyncBoundary
            isLoading={userProfileLoading}
            isError={userProfileError}
          >
            <StyledList>
              <li>
                동아리:{" "}
                {
                  userProfileData?.clubs.filter(club => club.id === clubId)[0]
                    ?.name_kr
                }
              </li>
              <li>담당자: {userProfileData?.name}</li>
              <li>연락처: {getValues("phoneNumber")}</li>
            </StyledList>
          </AsyncBoundary>
        </CardInner>
        <ReservationInfo>
          <Typography fs={16} lh={20} fw="MEDIUM">
            예약 공간
          </Typography>
          <AsyncBoundary
            isLoading={commonSpacesLoading}
            isError={commonSpacesError}
          >
            <Typography fs={16} lh={20} fw="REGULAR">
              {commonSpacesData?.commonSpaces[spaceId - 1]?.name},{" "}
              {`${formatSimpleSlashDate(startTerm)} `}
              {formatTime(startTerm)} ~ {formatTime(endTerm)} (
              {`${differenceInHours(endTerm, startTerm)}시간`}
              {differenceInMinutes(endTerm, startTerm) % 60
                ? ` ${differenceInMinutes(endTerm, startTerm) % 60}분`
                : ""}
              )
            </Typography>
          </AsyncBoundary>
        </ReservationInfo>
      </Card>
      <Info text="먼가 넣을 것이 없을까나" />
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button type={isValid ? "default" : "disabled"} onClick={handleSubmit}>
          다음
        </Button>
      </StyledBottom>
    </>
  ) : null;
};

export default CommonSpaceInfoThirdFrame;
