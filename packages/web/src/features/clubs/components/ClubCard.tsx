"use client";

import React from "react";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import {
  getClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/features/clubs/services/clubTypeControl";

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

const ClubMemberCount = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  font-size: 14px;
  line-height: 16px;
`;

const ClubCard: React.FC<ClubCardProps> = ({ club }) => (
  <Card gap={16} padding="16px 20px">
    <ClubCardNameRow>
      <ClubName>{club.name}</ClubName>
      <ClubMemberCount>
        <Icon type="person" size={16} />
        <div>{club.totalMemberCnt}</div>
      </ClubMemberCount>
    </ClubCardNameRow>

    <ClubCardRow>
      {club.advisor === null
        ? `회장 ${club.representative}`
        : `회장 ${club.representative} | 지도교수 ${club.advisor}`}
    </ClubCardRow>
    <ClubCardRow>{club.characteristic}</ClubCardRow>

    <ClubCardRow>
      <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
        {getClubType(club)}
      </Tag>
    </ClubCardRow>
  </Card>
);

export default ClubCard;

export type { ClubCardProps };
