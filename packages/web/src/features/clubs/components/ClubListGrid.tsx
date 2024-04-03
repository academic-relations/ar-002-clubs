"use client";

import React from "react";
import styled from "styled-components";

import ClubCard from "@sparcs-clubs/web/features/clubs/components/ClubCard";

import type { ClubCardProps } from "@sparcs-clubs/web/features/clubs/components/ClubCard";

interface ClubListGridItemProps {
  clubList: Array<ClubCardProps["club"]>;
}

const ClubListGridInner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 48px) / 4));
  gap: 16px;
  padding-left: 24px;
`;

const ClubListGrid: React.FC<ClubListGridItemProps> = ({ clubList }) => (
  <ClubListGridInner>
    {clubList.map((club: ClubCardProps["club"]) => (
      <ClubCard key={club.name} club={club} />
    ))}
  </ClubListGridInner>
);

export default ClubListGrid;
