"use client";

import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import ManageClubFundingMainFrame from "@sparcs-clubs/web/features/manage-club/funding/frame/ManageClubFundingMainFrame";

import {
  manageClubFundingPageBreadCrumbName,
  manageClubFundingPageName,
  manageClubFundingPagePath,
} from "@sparcs-clubs/web/constants/manageClubFunding";

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Funding = () => (
  <>
    <PageHeadWrapper>
      <BreadCrumb
        items={[
          // TODO: 중간 경로(대표 동아리 관리)는 일단 넣어두긴 했는데... 언젠가 생기겠죠??
          { name: "대표 동아리 관리", path: "/manage-club" },
          {
            name: manageClubFundingPageBreadCrumbName,
            path: manageClubFundingPagePath,
          },
        ]}
      />
      <PageTitle>{manageClubFundingPageName}</PageTitle>
    </PageHeadWrapper>
    <ManageClubFundingMainFrame />
  </>
);

export default Funding;
