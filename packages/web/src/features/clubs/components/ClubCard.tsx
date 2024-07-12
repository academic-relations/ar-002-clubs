"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
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

const ClubCard: React.FC<ClubCardProps> = ({ club }) => (
  <Card gap={16} padding="16px 20px">
    <ClubCardNameRow>
      <ClubName>{club.name}</ClubName>
      <FlexWrapper direction="row" gap={4}>
        <Icon type="person" size={16} />
        <Typography fs={14} lh={16}>
          {club.totalMemberCnt}
        </Typography>
      </FlexWrapper>
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
