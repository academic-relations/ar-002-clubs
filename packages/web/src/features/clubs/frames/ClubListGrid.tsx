"use client";

import React from "react";
import styled from "styled-components";

import ClubCard from "@sparcs-clubs/web/features/clubs/components/ClubCard";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const ClubListGridInner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 48px) / 4));
  row-gap: 16px;
  column-gap: 16px;
  grid-auto-flow: row;
  padding: 0px 0px 0px 24px;
`;

const ClubListGridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ClubListGridItemProps {
  clubs_list: Array<ClubInfo>;
}

const ClubListGrid: React.FC<ClubListGridItemProps> = ({ clubs_list }) => (
  <ClubListGridInner>
    {clubs_list.map((club: ClubInfo) => (
      <ClubListGridItem key={club.name}>
        <ClubCard club={club} />
      </ClubListGridItem>
    ))}
  </ClubListGridInner>
);

export default ClubListGrid;
