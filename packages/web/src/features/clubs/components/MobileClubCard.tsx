"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useAuth } from "@sparcs-clubs/web/common/providers/AuthContext";
import {
  getShortClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/features/clubs/services/clubTypeControl";

import ClubRegistrationButton from "./ClubRegistrationButton";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

interface ClubCardProps {
  club: ApiClb001ResponseOK["divisions"][number]["clubs"][number];
}

const ClubName = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClubCardNameWithTag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`;

const ClubCardNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const ClubCharacteristic = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;

const ClubCardRow = styled.div`
  display: flex;
  flex: 1 0 0;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  align-self: stretch;
`;

const MobileClubCard: React.FC<
  ClubCardProps & { isRegistrationPeriod?: boolean }
> = ({ club, isRegistrationPeriod = false }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Card gap={12} padding="16px 20px">
      <ClubCardNameRow>
        <ClubCardNameWithTag>
          <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
            {getShortClubType(club)}
          </Tag>
          <ClubName>{club.name_kr}</ClubName>
        </ClubCardNameWithTag>
        <FlexWrapper direction="row" gap={4}>
          <Icon type="person" size={16} />
          <Typography fs={14} lh={16}>
            {club.totalMemberCnt}
          </Typography>
        </FlexWrapper>
      </ClubCardNameRow>
      <ClubCardRow>
        <ClubCharacteristic>{club.characteristic}</ClubCharacteristic>
        {isRegistrationPeriod && isLoggedIn && (
          <ClubRegistrationButton club={club} isMobile />
        )}
      </ClubCardRow>
    </Card>
  );
};

export default MobileClubCard;
