"use client";

import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";

import PersonInfoItem from "./PersonInfoItem";

import type { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";

interface PersonInfoCardProps {
  club: ApiClb002ResponseOK;
}

const StyledCard = styled(Card)`
  width: fit-content;
  min-width: 300px;
  max-width: 100%;
  padding: 16px 20px;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    width: 100%;
    max-width: 100%;
  }
`;

const PersonInfoCard: React.FC<PersonInfoCardProps> = ({ club }) => (
  <StyledCard>
    <PersonInfoItem title="총원" content={`${club.totalMemberCnt}명`} />
    <PersonInfoItem title="대표자" content={club.representative} />
    <PersonInfoItem
      title="지도교수"
      content={
        club.advisor === null ||
        club.advisor === undefined ||
        club.advisor === "null" ||
        club.advisor === "undefined" ||
        club.advisor === ""
          ? "-"
          : club.advisor
      }
    />
  </StyledCard>
);

export default PersonInfoCard;
