"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import {
  manageClubFundingPageBreadCrumbName,
  manageClubFundingPageName,
  manageClubFundingPagePath,
} from "@sparcs-clubs/web/constants/manageClubFunding";
import NewFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/components/NewFundingListSection";
import PastFundingListSection from "@sparcs-clubs/web/features/manage-club/funding/components/PastFundingListSection";

const ManageClubFundingMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
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
    {/* TODO: API 구현 이후엔 테이블 데이터 전부 프레임에서 주입해줄 것! */}
    <NewFundingListSection />
    <PastFundingListSection />
  </FlexWrapper>
);

export default ManageClubFundingMainFrame;
