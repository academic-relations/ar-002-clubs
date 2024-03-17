"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const DivisionSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const MoreInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const DivisionSectionTitle: React.FC<{
  division: string;
  clubList: Array<ClubInfo>;
  toggle: boolean;
  toggleHandler: () => void;
}> = ({ division, clubList, toggle, toggleHandler }) => (
  <DivisionSectionTitleInner>
    <SectionTitle size="lg">
      {division} ({clubList.length})
    </SectionTitle>
    <MoreInfo onClick={toggleHandler}>{toggle ? `접기` : `펼치기`}</MoreInfo>
  </DivisionSectionTitleInner>
);

export default DivisionSectionTitle;
