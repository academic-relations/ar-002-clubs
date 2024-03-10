"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import ClubListGrid from "@sparcs-clubs/web/features/clubs/frames/ClubListGrid";

import type { ClubInfo } from "@sparcs-clubs/web/features/clubs/types/clubs.types";

const ClubClassSectionFrameInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

type ClubsSectionFrameProps = {
  clubs_class: string;
  clubs_list: Array<ClubInfo>;
};

const ClubsSectionFrame: React.FC<ClubsSectionFrameProps> = ({
  clubs_class,
  clubs_list,
}) => (
  <ClubClassSectionFrameInner>
    <SectionTitle size="lg">{`${clubs_class} (${clubs_list.length.toString()})`}</SectionTitle>
    <ClubListGrid clubs_list={clubs_list} />
  </ClubClassSectionFrameInner>
);

export default ClubsSectionFrame;
