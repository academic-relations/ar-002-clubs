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

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xl}) {
    grid-template-columns: repeat(4, calc((100% - 48px) / 4));
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    grid-template-columns: repeat(3, calc((100% - 48px) / 3));
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.md}) {
    grid-template-columns: repeat(2, calc((100% - 48px) / 2));
  }

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    grid-template-columns: calc((100% - 48px));
  }
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
