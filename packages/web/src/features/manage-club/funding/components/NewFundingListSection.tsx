"use client";

import React from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";

import {
  newFundingListSectionInfoText,
  newFundingListSectionTitle,
  newFundingOrderButtonText,
} from "@sparcs-clubs/web/constants/manageClubFunding";

import { FUNDING_TABLE_NO_ACTIVITY_NAME } from "../constants";
import useGetFundingDeadline from "../services/useGetFundingDeadline";
import useGetNewFundingList from "../services/useGetNewFundingList";

import NewFundingListTable from "./_atomic/NewFundingListTable";

interface NewFundingListSectionProps {
  clubId: number;
}
const NewFundingOrderButtonRow = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const NewFundingListSection: React.FC<NewFundingListSectionProps> = ({
  clubId,
}) => {
  const router = useRouter();
  const createFundingClick = () => {
    router.push(`/manage-club/funding/create`);
  };

  const {
    data: newFundingList,
    isLoading: isLoadingNewFundingList,
    isError: isErrorNewFundingList,
  } = useGetNewFundingList({
    clubId,
  });

  const {
    data: fundingDeadline,
    isLoading: isLoadingFundingDeadline,
    isError: isErrorFundingDeadline,
  } = useGetFundingDeadline();

  return (
    <FoldableSectionTitle title={newFundingListSectionTitle}>
      <FlexWrapper direction="column" gap={20}>
        <AsyncBoundary
          isLoading={isLoadingFundingDeadline}
          isError={isErrorFundingDeadline}
        >
          <Info text={newFundingListSectionInfoText(fundingDeadline)} />
        </AsyncBoundary>
        <NewFundingOrderButtonRow>
          <IconButton icon="add" type="default" onClick={createFundingClick}>
            {newFundingOrderButtonText}
          </IconButton>
        </NewFundingOrderButtonRow>
        <AsyncBoundary
          isLoading={isLoadingNewFundingList}
          isError={isErrorNewFundingList}
        >
          <NewFundingListTable
            newFundingList={newFundingList?.fundings
              .map(funding => ({
                ...funding,
                activityName:
                  funding.purposeActivity?.name ??
                  FUNDING_TABLE_NO_ACTIVITY_NAME,
              }))
              .sort((a, b) => a.fundingStatusEnum - b.fundingStatusEnum)}
          />
        </AsyncBoundary>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default NewFundingListSection;
