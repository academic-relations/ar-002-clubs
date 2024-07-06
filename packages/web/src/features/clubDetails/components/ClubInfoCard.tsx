"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  getTagColorFromClubType,
  getTagColorFromDivision,
  getTagContentFromClubType,
} from "@sparcs-clubs/web/types/clubdetail.types";

import ClubInfoItem from "./ClubInfoItem";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface ClubInfoCardProps {
  club: ApiClb002ResponseOK;
}

const ClubInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  > * {
    flex: 1;
  }
`;

const ClubInfoCard: React.FC<ClubInfoCardProps> = ({ club }) => (
  <Card gap={16} padding="16px 20px">
    <ClubInfoRow>
      <ClubInfoItem
        title="동아리 지위"
        content={
          <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
            {getTagContentFromClubType(club.type, club.isPermanent)}
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
    <ClubInfoItem title="동아리방" content={club.room ? club.room : "-"} />
  </Card>
);

export default ClubInfoCard;
