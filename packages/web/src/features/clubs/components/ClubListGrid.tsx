"use client";

import React from "react";
import styled from "styled-components";

import ClubCard from "@sparcs-clubs/web/features/clubs/components/ClubCard";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

interface ClubListGridItemProps {
  clubList: Array<ClubInfo>;
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
    {clubList.map((club: ClubInfo) => (
      <ClubCard key={club.name} club={club} />
    ))}
  </ClubListGridInner>
);

export default ClubListGrid;
