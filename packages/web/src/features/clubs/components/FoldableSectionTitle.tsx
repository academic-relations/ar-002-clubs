"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import type { ClubCardProps } from "@sparcs-clubs/web/features/clubs/components/ClubCard";

const FoldableSectionTitleInner = styled.div`
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

const FoldableSectionTitle: React.FC<{
  title: string;
  clubList: Array<ClubCardProps["club"]>;
  toggle: boolean;
  showLength?: boolean;
  toggleHandler: () => void;
}> = ({ title, clubList, toggle, showLength = true, toggleHandler }) => (
  <FoldableSectionTitleInner>
    <SectionTitle size="lg">
      {title} {showLength && `(${clubList.length})`}
    </SectionTitle>
    <MoreInfo onClick={toggleHandler}>{toggle ? `접기` : `펼치기`}</MoreInfo>
  </FoldableSectionTitleInner>
);

export default FoldableSectionTitle;
