"use client";

import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import {
  getClubType,
  getShortClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/features/clubs/services/clubTypeControl";
import isStudent from "@sparcs-clubs/web/utils/isStudent";

import ClubRegistrationButtonWrapper from "./_atomic/ClubRegistrationButtonWrapper";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

export interface ClubProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
}

interface ClubCardProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
  isRegistrationPeriod?: boolean;
  isMobile?: boolean;
}

const ClubCardRow = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ClubCardLongText = styled(Typography).withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isMobile: boolean }>`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
  line-height: ${({ isMobile }) => (isMobile ? "16px" : "20px")};
`;

const ClubCardNameWithTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`;

const ClubName = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  width: 100%;
  font-size: ${({ isMobile }) => (isMobile ? "16px" : "20px")};
  line-height: ${({ isMobile }) => (isMobile ? "20px" : "24px")};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubCard: React.FC<ClubCardProps> = ({
  club,
  isRegistrationPeriod = false,
  isMobile = false,
}) => {
  const { isLoggedIn, profile } = useAuth();

  return (
    <Card gap={isMobile ? 12 : 16} padding="16px 20px">
      <ClubCardRow isMobile={isMobile}>
        <ClubCardNameWithTag>
          {isMobile && (
            <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
              {getShortClubType(club)}
            </Tag>
          )}
          <ClubName isMobile={isMobile}>{club.name_kr}</ClubName>
        </ClubCardNameWithTag>
        <FlexWrapper direction="row" gap={4}>
          <Icon type="person" size={16} />
          <Typography fs={14} lh={16}>
            {club.totalMemberCnt}
          </Typography>
        </FlexWrapper>
      </ClubCardRow>
      {!isMobile && (
        <ClubCardLongText isMobile={isMobile}>
          {club.advisor === "null" ||
          club.advisor === "undefined" ||
          club.advisor === undefined ||
          club.advisor === null ||
          club.advisor === ""
            ? `회장 ${club.representative}`
            : `회장 ${club.representative} | 지도교수 ${club.advisor}`}
        </ClubCardLongText>
      )}
      {!isMobile && (
        <ClubCardLongText isMobile={isMobile}>
          {club.characteristic}
        </ClubCardLongText>
      )}
      <ClubCardRow isMobile={isMobile}>
        {!isMobile && (
          <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
            {getClubType(club)}
          </Tag>
        )}
        {isMobile && (
          <ClubCardLongText isMobile={isMobile}>
            {club.characteristic}
          </ClubCardLongText>
        )}
        {isRegistrationPeriod && isLoggedIn && isStudent(profile) && (
          <ClubRegistrationButtonWrapper club={club} isMobile={isMobile} />
        )}
      </ClubCardRow>
    </Card>
  );
};
export default ClubCard;
