"use client";

import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import ManageClubFundingMainFrame from "@sparcs-clubs/web/features/manage-club/funding/frame/ManageClubFundingMainFrame";

import {
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
          { name: manageClubFundingPageName, path: manageClubFundingPagePath },
        ]}
      />
      <PageTitle>{manageClubFundingPageName}</PageTitle>
    </PageHeadWrapper>
    <ManageClubFundingMainFrame />
  </>
);

export default Funding;
