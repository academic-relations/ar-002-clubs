"use client";

import React from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";
import { getClubsList } from "@sparcs-clubs/web/features/clubs/services/getClubsList";
import { fromObj } from "@sparcs-clubs/web/types/clubs.types";

const ClubsPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ClubListsByDepartmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ClubsPageMainFrame: React.FC = () => {
  const { data, isLoading, isError } = getClubsList();
  return (
    <ClubsPageMainFrameInner>
      <PageTitle>동아리 목록</PageTitle>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <ClubListsByDepartmentWrapper>
          {(data?.divisions ?? []).map(division => (
            <ClubsSectionFrame
              title={division.name}
              clubList={division.clubs.map(fromObj)}
              key={division.name}
            />
          ))}
        </ClubListsByDepartmentWrapper>
      </AsyncBoundary>
    </ClubsPageMainFrameInner>
  );
};

export default ClubsPageMainFrame;
