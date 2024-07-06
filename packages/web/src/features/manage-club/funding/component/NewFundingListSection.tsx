"use client";

import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Info from "@sparcs-clubs/web/common/components/Info";
import {
  newFundingListSectionInfoText,
  newFundingListSectionTitle,
  newFundingOrderButtonText,
} from "@sparcs-clubs/web/constants/manageClubFunding";
import colors from "@sparcs-clubs/web/styles/themes/colors";

import NewFundingListTable from "./_atomic/NewFundingListTable";

const NewFundingListSectionInner = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  flex-grow: 0; */
`;

const NewFundingListSectionContents = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 24px;
  gap: 20px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

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

const NewFundingOrderButtonText = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.WHITE};

  padding-left: 4px;
`;

const NewFundingListSection: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <NewFundingListSectionInner>
      <FoldableSectionTitle
        title={newFundingListSectionTitle}
        toggle={toggle}
        toggleHandler={() => {
          setToggle(!toggle);
        }}
      />
      {toggle ? (
        <NewFundingListSectionContents>
          {/* TODO: 지원금 신청 기간 받아오는 API 생기면 대체해야함! */}
          <Info text={newFundingListSectionInfoText("2024 봄", new Date())} />
          <NewFundingOrderButtonRow>
            <Button>
              <Icon type="add" size={16} color={colors.WHITE} />
              <NewFundingOrderButtonText>
                {newFundingOrderButtonText}
              </NewFundingOrderButtonText>
            </Button>
          </NewFundingOrderButtonRow>
          {/* TODO: ManageClubFundingMainFrame으로부터 주입받은 테이블 데이터 전달하기 */}
          <NewFundingListTable />
        </NewFundingListSectionContents>
      ) : null}
    </NewFundingListSectionInner>
  );
};

export default NewFundingListSection;
