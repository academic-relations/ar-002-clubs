"use client";

import React from "react";

import styled from "styled-components";

import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { pastFundingListSectionTitle } from "@sparcs-clubs/web/constants/manageClubFunding";

import PastSingleSemesterFundingListSection from "./_atomic/PastSingleSemesterFundingListSection";

const PastFundingListSectionInner = styled.div`
  /* New FundingListFrame */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  flex-grow: 0; */
`;

const PastFundingListSectionContents = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 24px;
  gap: 40px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const PastFundingListSection: React.FC = () => (
  <PastFundingListSectionInner>
    <FoldableSectionTitle title={pastFundingListSectionTitle}>
      <PastFundingListSectionContents>
        {/* TODO: ManageClubFundingMainFrame으로부터 주입받은 테이블 데이터 매핑하기 */}
        <PastSingleSemesterFundingListSection />
        <PastSingleSemesterFundingListSection />
        <PastSingleSemesterFundingListSection />
      </PastFundingListSectionContents>
    </FoldableSectionTitle>
  </PastFundingListSectionInner>
);

export default PastFundingListSection;
