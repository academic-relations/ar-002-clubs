"use client";

import React from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { pastFundingListSectionTitle } from "@sparcs-clubs/web/constants/manageClubFunding";

import useGetActivityTerms from "@sparcs-clubs/web/features/activity-report/services/useGetActivityTerms";

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

const PastFundingListSection: React.FC<{ clubId: number }> = ({ clubId }) => {
  const {
    data: activityTerms,
    isLoading,
    isError,
  } = useGetActivityTerms({ clubId });

  if (!activityTerms) {
    return null;
  }

  return (
    <PastFundingListSectionInner>
      <FoldableSectionTitle title={pastFundingListSectionTitle}>
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <PastFundingListSectionContents>
            {activityTerms.terms.toReversed().map(term => (
              <PastSingleSemesterFundingListSection
                key={term.id}
                termId={term.id}
                clubId={clubId}
              />
            ))}
          </PastFundingListSectionContents>
        </AsyncBoundary>
      </FoldableSectionTitle>
    </PastFundingListSectionInner>
  );
};

export default PastFundingListSection;
