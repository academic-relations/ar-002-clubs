"use client";

import React from "react";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";
import {
  getClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/types/clubs.types";

interface ClubCardProps {
  club: ClubInfo;
}

const ClubCardInner = styled(Card)`
  gap: 16px;
`;

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
  <ClubCardInner>
    <ClubCardNameRow>
      <ClubName>{club.name}</ClubName>
      <ClubMemberCount>
        <Icon type="person" size={16} />
        <div>{club.members}</div>
      </ClubMemberCount>
    </ClubCardNameRow>

    <ClubCardRow>
      {club.advisor === null
        ? `회장 ${club.president}`
        : `회장 ${club.president} | 지도교수 ${club.advisor}`}
    </ClubCardRow>
    <ClubCardRow>{club.description}</ClubCardRow>

    <ClubCardRow>
      <Tag color={getTagColorFromClubType(club.type)}>{getClubType(club)}</Tag>
    </ClubCardRow>
  </ClubCardInner>
);

export default ClubCard;
