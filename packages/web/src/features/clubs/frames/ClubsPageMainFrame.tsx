"use client";

import React from "react";
import styled from "styled-components";

import ClubsSectionFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsSectionFrame";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

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

interface ClubsPageMainFrameProps {
  clubDivisionAndListsPairs: Array<[string, Array<ClubInfo>]>;
}

const ClubsPageMainFrame: React.FC<ClubsPageMainFrameProps> = ({
  clubDivisionAndListsPairs,
}) => (
  <ClubsPageMainFrameInner>
    <ClubListsByDepartmentWrapper>
      {clubDivisionAndListsPairs.map(
        (clubDivisionAndListsPair: [string, Array<ClubInfo>]) => (
          <ClubsSectionFrame
            division={clubDivisionAndListsPair[0]}
            clubList={clubDivisionAndListsPair[1]}
            key={clubDivisionAndListsPair[0]}
          />
        ),
      )}
    </ClubListsByDepartmentWrapper>
  </ClubsPageMainFrameInner>
);

export default ClubsPageMainFrame;
