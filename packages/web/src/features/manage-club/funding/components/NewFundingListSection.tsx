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

import useGetNewFundingList from "../services/useGetNewFundingList";

import NewFundingListTable from "./_atomic/NewFundingListTable";

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

const NewFundingListSection: React.FC<{ clubId: number }> = ({ clubId }) => {
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

  return (
    <FoldableSectionTitle title={newFundingListSectionTitle}>
      <FlexWrapper direction="column" gap={20}>
        {/* TODO: 지원금 신청 기간 받아오는 API 생기면 대체해야함! */}
        <Info text={newFundingListSectionInfoText("2024 봄", new Date())} />
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
            newFundingList={newFundingList?.fundings.map(funding => ({
              ...funding,
              activityName: funding.purposeActivity?.name ?? "",
            }))}
          />
        </AsyncBoundary>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default NewFundingListSection;
