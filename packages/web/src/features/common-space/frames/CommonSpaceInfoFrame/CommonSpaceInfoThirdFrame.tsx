import React, { useEffect } from "react";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { ko } from "date-fns/locale";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetUserProfile from "@sparcs-clubs/web/common/services/getUserProfile";
import useGetCommonSpaces from "@sparcs-clubs/web/features/common-space/service/getCommonSpaces";

import { CommonSpaceInfoProps } from "@sparcs-clubs/web/features/common-space/types/commonSpace";

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
  CommonSpaceInfoProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, body, param }) => {
  const { email, clubId, startTerm, endTerm } = body;
  const { spaceId } = param;
  const correct = email && clubId && startTerm && endTerm && spaceId;
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

  useEffect(() => {
    setNextEnabled(!!correct);
  }, [correct, setNextEnabled]);

  return correct ? (
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
              <li>동아리: {userProfileData?.clubs[clubId]?.name}</li>
              <li>담당자: {userProfileData?.name}</li>
              <li>연락처: {userProfileData?.phoneNumber}</li>
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
              {commonSpacesData?.commonSpaces[spaceId]?.name},{" "}
              {format(startTerm, "M/d(E) ", { locale: ko })}
              {format(startTerm, "HH:mm", { locale: ko })} ~
              {format(endTerm, "HH:mm", { locale: ko })} (
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
    </>
  ) : null;
};

export default CommonSpaceInfoThirdFrame;
