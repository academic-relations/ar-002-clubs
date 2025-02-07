"use client";

import React from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { pastFundingListSectionTitle } from "@sparcs-clubs/web/constants/manageClubFunding";
import useGetActivityTerms from "@sparcs-clubs/web/features/activity-report/services/useGetActivityTerms";

import useGetFundingDeadline from "../services/useGetFundingDeadline";
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

  const {
    data: fundingDeadline,
    isLoading: isLoadingFundingDeadline,
    isError: isErrorFundingDeadline,
  } = useGetFundingDeadline();

  if (!activityTerms) {
    return null;
  }

  return (
    <PastFundingListSectionInner>
      <FoldableSectionTitle title={pastFundingListSectionTitle}>
        <AsyncBoundary
          isLoading={isLoading || isLoadingFundingDeadline}
          isError={isError || isErrorFundingDeadline}
        >
          <PastFundingListSectionContents>
            {activityTerms.terms
              .toReversed()
              .filter(term => {
                if (!fundingDeadline) return true;

                return (
                  new Date(term.startTerm).getTime() !==
                    new Date(
                      fundingDeadline.targetDuration.startTerm,
                    ).getTime() &&
                  new Date(term.endTerm).getTime() !==
                    new Date(fundingDeadline.targetDuration.endTerm).getTime()
                );
              })
              .map(term => (
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
