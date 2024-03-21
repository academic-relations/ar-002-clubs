"use client";

import React from "react";
import styled from "styled-components";

import type { ClubDetail } from "@sparcs-clubs/web/types/clubdetail.types";
import {
  getClubType,
  getTagColorFromClubType,
  getTagColorFromDivision,
} from "@sparcs-clubs/web/types/clubdetail.types";

import Card from "@sparcs-clubs/web/common/components/Card";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import ClubInfoItem from "./ClubInfoItem";

interface ClubInfoCardProps {
  club: ClubDetail;
}

const ClubInfoCardInner = styled(Card)`
  gap: 16px;
`;

const ClubInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  > * {
    flex: 1;
  }
`;

const ClubInfoCard: React.FC<ClubInfoCardProps> = ({ club }) => (
  <ClubInfoCardInner>
    <ClubInfoRow>
      <ClubInfoItem
        title="동아리 지위"
        content={
          <Tag color={getTagColorFromClubType(club.type)}>
            {getClubType(club)}
          </Tag>
        }
      />
      <ClubInfoItem
        title="소속 분과"
        content={
          <Tag color={getTagColorFromDivision(club.divisionName)}>
            {club.divisionName}
          </Tag>
        }
      />
    </ClubInfoRow>
    <ClubInfoRow>
      <ClubInfoItem title="성격" content={club.characteristic} />
      <ClubInfoItem title="설립 연도" content={`${club.foundingYear}년`} />
    </ClubInfoRow>
    <ClubInfoItem title="동아리방" content={club.room} />
  </ClubInfoCardInner>
);

export default ClubInfoCard;
