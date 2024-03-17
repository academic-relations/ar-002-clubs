"use client";

import React from "react";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import ClubNameAndMemberCountRow from "@sparcs-clubs/web/features/clubs/components/ClubNameAndMemberCountRow";
import DescriptionRow from "@sparcs-clubs/web/features/clubs/components/DescriptionRow";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";
import {
  getClubType,
  getTagColorFromClubType,
} from "@sparcs-clubs/web/types/clubs.types";

const ClubCardWrapper = styled.div`
  width: 100%;
`;

const ClubCardInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface ClubCardProps {
  club: ClubInfo;
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const presidentAndAdvisor: string =
    club.advisor === null
      ? `회장 ${club.president}`
      : `회장 ${club.president} | 지도교수 ${club.advisor}`;
  return (
    <ClubCardWrapper>
      <Card>
        <ClubCardInner>
          <ClubNameAndMemberCountRow
            name={club.name}
            membersCount={club.members}
          />
          <DescriptionRow>{presidentAndAdvisor}</DescriptionRow>
          <DescriptionRow>{club.description}</DescriptionRow>
          <Tag color={getTagColorFromClubType(club.type)}>
            {getClubType(club)}
          </Tag>
        </ClubCardInner>
      </Card>
    </ClubCardWrapper>
  );
};

export default ClubCard;
