"use client";

import React from "react";
import Link from "next/link";
import styled from "styled-components";

import paths from "@sparcs-clubs/web/constants/paths";
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
      <Link
        key={club.id}
        href={`${paths.CLUBS.sub[0].path}/${club.id.toString()}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ClubCard key={club.name} club={club} />
      </Link>
    ))}
  </ClubListGridInner>
);

export default ClubListGrid;
