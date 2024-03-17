"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/frames/ClubListGrid";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const ClubDivisionSectionFrameInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

type ClubsSectionFrameProps = {
  division: string; // 분과
  clubList: Array<ClubInfo>;
};

const ClubsSectionFrame: React.FC<ClubsSectionFrameProps> = ({
  division,
  clubList,
}) => (
  <ClubDivisionSectionFrameInner>
    <SectionTitle size="lg">{`${division} (${clubList.length.toString()})`}</SectionTitle>
    <ClubListGrid clubs_list={clubList} />
  </ClubDivisionSectionFrameInner>
);

export default ClubsSectionFrame;
