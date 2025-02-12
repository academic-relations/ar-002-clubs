"use client";

import React from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSection from "@sparcs-clubs/web/common/components/FoldableSection";
import { singleSemesterFundingListSectionTitleText } from "@sparcs-clubs/web/constants/manageClubFunding";
import useGetActivityTerm from "@sparcs-clubs/web/features/activity-report/hooks/useGetActivityTerm";
import useGetPastFundingList from "@sparcs-clubs/web/features/manage-club/funding/hooks/useGetPastFundingList";

import PastFundingListTable from "./PastFundingListTable";

interface PastSingleSemesterFundingListSectionProps {
  termId: number;
  clubId: number;
}
const PastSingleSemesterFundingListSectionInner = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  z-index: 2; */
`;

const PastSingleSemesterFundingListSection: React.FC<
  PastSingleSemesterFundingListSectionProps
> = ({ clubId, termId }) => {
  const { data: activityTerm } = useGetActivityTerm(clubId, termId);

  const { data, isLoading, isError } = useGetPastFundingList(termId, clubId);

  return (
    <PastSingleSemesterFundingListSectionInner>
      <FoldableSection
        key={activityTerm.id}
        title={singleSemesterFundingListSectionTitleText(
          activityTerm.year,
          activityTerm.name,
          data.length,
        )}
      >
        <AsyncBoundary isLoading={isLoading} isError={isError}>
          <PastFundingListTable data={data} />
        </AsyncBoundary>
      </FoldableSection>
    </PastSingleSemesterFundingListSectionInner>
  );
};

export default PastSingleSemesterFundingListSection;
