"use client";

import React from "react";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import { useGetMyMemberRegistration } from "@sparcs-clubs/web/features/clubDetails/services/getMyMemberRegistration";
import {
  getClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/features/clubs/services/clubTypeControl";

import ClubRegistrationButton from "./ClubRegistrationButton";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

interface ClubCardProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
}
const ClubCardRow = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ClubCardNameRow = styled(ClubCardRow)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;
const ClubCardTagRow = styled(ClubCardRow)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;
const ClubName = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ClubCard: React.FC<
  ClubCardProps & { isRegistrationPeriod?: boolean }
> = ({ club, isRegistrationPeriod = false }) => {
  const { isLoggedIn } = useAuth();

  const {
    data: myRegistrationList,
    isLoading,
    isError,
    refetch,
  } = useGetMyMemberRegistration();

  let isInclub = false;
  let isRegistered = false;

  if (myRegistrationList && myRegistrationList.applies.length > 0) {
    const thisRegistration = myRegistrationList.applies.find(
      apply => apply.clubId === club.id,
    );
    if (thisRegistration) {
      if (
        thisRegistration.applyStatusEnumId ===
        RegistrationApplicationStudentStatusEnum.Approved
      ) {
        isInclub = true;
      }
      isRegistered = true;
    } else {
      isRegistered = false;
    }
  }

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card gap={16} padding="16px 20px">
        <ClubCardNameRow>
          <ClubName>{club.name_kr}</ClubName>
          <FlexWrapper direction="row" gap={4}>
            <Icon type="person" size={16} />
            <Typography fs={14} lh={16}>
              {club.totalMemberCnt}
            </Typography>
          </FlexWrapper>
        </ClubCardNameRow>
        <ClubCardRow>
          {club.advisor === "null" ||
          club.advisor === "undefined" ||
          club.advisor === undefined ||
          club.advisor === null ||
          club.advisor === ""
            ? `회장 ${club.representative}`
            : `회장 ${club.representative} | 지도교수 ${club.advisor}`}
        </ClubCardRow>
        <ClubCardRow>{club.characteristic}</ClubCardRow>
        <ClubCardTagRow>
          <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
            {getClubType(club)}
          </Tag>
          {isRegistrationPeriod && isLoggedIn && (
            <ClubRegistrationButton
              club={club}
              refetch={refetch}
              isInClub={isInclub}
              isRegistered={isRegistered}
              myRegistrationList={myRegistrationList ?? { applies: [] }}
            />
          )}
        </ClubCardTagRow>
      </Card>
    </AsyncBoundary>
  );
};
export default ClubCard;
export type { ClubCardProps };
