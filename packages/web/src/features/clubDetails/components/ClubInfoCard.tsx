"use client";

import React, { useEffect, useState } from "react";

import styled, { useTheme } from "styled-components";

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
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 8px;
  }
  > * {
    flex: 1;
  }
`;

const ResponsiveClubInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 8px;
    flex-direction: column;
  }
  > * {
    flex: 1;
  }
`;

const ResponsiveClubCard = styled(Card)`
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 8px;
  }
`;

const ClubInfoCard: React.FC<ClubInfoCardProps> = ({ club }) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${theme.responsive.BREAKPOINT.sm})`,
    );

    // Check the initial state
    setIsMobile(mediaQuery.matches);

    // Set up an event listener to update the state when the window resizes
    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the event listener on component unmount
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [theme]);

  return (
    <ResponsiveClubCard padding="16px 20px">
      <ClubInfoRow>
        <ClubInfoItem
          title={isMobile ? "지위" : "동아리 지위"}
          content={
            <Tag color={getTagColorFromClubType(club.type, club.isPermanent)}>
              {getTagContentFromClubType(club.type, club.isPermanent)}
            </Tag>
          }
        />
        <ClubInfoItem
          title={isMobile ? "분과" : "소속 분과"}
          content={
            <Tag color={getTagColorFromDivision(club.divisionName)}>
              {club.divisionName}
            </Tag>
          }
        />
      </ClubInfoRow>
      <ResponsiveClubInfoRow>
        <ClubInfoItem title="성격" content={club.characteristic} />
        <ClubInfoItem
          title={isMobile ? "연도" : "설립연도"}
          content={`${club.foundingYear}년`}
        />
      </ResponsiveClubInfoRow>
      <ClubInfoItem
        title={isMobile ? "동방" : "동아리방"}
        content={club.room ? club.room : "-"}
      />
    </ResponsiveClubCard>
  );
};

export default ClubInfoCard;
