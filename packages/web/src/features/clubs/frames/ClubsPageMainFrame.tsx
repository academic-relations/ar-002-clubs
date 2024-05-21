"use client";

import React from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { useGetClubsList } from "@sparcs-clubs/web/features/clubs/services/useGetClubsList";

const ClubsPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const ClubListsByDepartmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ClubsPageMainFrame: React.FC = () => {
  const { data, isLoading, isError } = useGetClubsList();
  return (
    <ClubsPageMainFrameInner>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <ClubListsByDepartmentWrapper>
          {(data?.divisions ?? []).map(division => (
            <ClubsSectionFrame
              title={division.name}
              clubList={division.clubs.sort((a, b) => {
                if (a.isPermanent && !b.isPermanent) return -1;
                if (!a.isPermanent && b.isPermanent) return 1;
                return a.type - b.type || a.name.localeCompare(b.name);
              })}
              key={division.name}
            />
          ))}
        </ClubListsByDepartmentWrapper>
      </AsyncBoundary>
    </ClubsPageMainFrameInner>
  );
};

export default ClubsPageMainFrame;
