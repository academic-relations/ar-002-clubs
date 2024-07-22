"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";

import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";

import {
  newFundingListSectionInfoText,
  newFundingListSectionTitle,
  newFundingOrderButtonText,
} from "@sparcs-clubs/web/constants/manageClubFunding";

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

const NewFundingListSection: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const router = useRouter();
  const createFundingClick = () => {
    router.push(`/manage-club/funding/create`);
  };

  return (
    <FoldableSectionTitle
      title={newFundingListSectionTitle}
      toggle={toggle}
      toggleHandler={() => {
        setToggle(!toggle);
      }}
    >
      <FlexWrapper direction="column" gap={20}>
        {/* TODO: 지원금 신청 기간 받아오는 API 생기면 대체해야함! */}
        <Info text={newFundingListSectionInfoText("2024 봄", new Date())} />
        <NewFundingOrderButtonRow>
          <IconButton icon="add" type="default" onClick={createFundingClick}>
            {newFundingOrderButtonText}
          </IconButton>
        </NewFundingOrderButtonRow>
        {/* TODO: ManageClubFundingMainFrame으로부터 주입받은 테이블 데이터 전달하기 */}
        <NewFundingListTable />
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default NewFundingListSection;
