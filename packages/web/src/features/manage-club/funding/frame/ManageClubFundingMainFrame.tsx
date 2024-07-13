"use client";

import React from "react";

import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import {
  manageClubFundingPageBreadCrumbName,
  manageClubFundingPageName,
  manageClubFundingPagePath,
} from "@sparcs-clubs/web/constants/manageClubFunding";
import NewFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/component/NewFundingListSection";
import PastFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/component/PastFundingListSection";

const ManageClubFundingMainFrameInner = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 60px;
  gap: 60px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  flex-grow: 0; */
`;

const ManageClubFundingMainFrame: React.FC = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        {
          name: manageClubFundingPageBreadCrumbName,
          path: manageClubFundingPagePath,
        },
      ]}
      title={manageClubFundingPageName}
    />
    <ManageClubFundingMainFrameInner>
      {/* TODO: API 구현 이후엔 테이블 데이터 전부 프레임에서 주입해줄 것! */}
      <NewFundingListSection />
      <PastFundingListSection />
    </ManageClubFundingMainFrameInner>
  </>
);

export default ManageClubFundingMainFrame;
