"use client";

import React from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";

import type { ClubInfo } from "@sparcs-clubs/web/features/clubs/types/clubs.types";

const ClubsPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 60px;
`;

const ClubListsByDepartmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

interface ClubsPageMainFrameProps {
  clubClassesAndListsPairs: Array<[string, Array<ClubInfo>]>;
}

const ClubsPageMainFrame: React.FC<ClubsPageMainFrameProps> = ({
  clubClassesAndListsPairs,
}) => (
  <ClubsPageMainFrameInner>
    <PageTitle>동아리 목록</PageTitle>
    <ClubListsByDepartmentWrapper>
      {clubClassesAndListsPairs.map(
        (clubClassAndListPair: [string, Array<ClubInfo>]) => (
          <ClubsSectionFrame
            clubs_class={clubClassAndListPair[0]}
            clubs_list={clubClassAndListPair[1]}
            key={clubClassAndListPair[0]}
          />
        ),
      )}
    </ClubListsByDepartmentWrapper>
  </ClubsPageMainFrameInner>
);

export default ClubsPageMainFrame;
