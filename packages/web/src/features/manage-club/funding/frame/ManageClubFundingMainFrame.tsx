"use client";

import React from "react";
import styled from "styled-components";

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
  <ManageClubFundingMainFrameInner>
    <NewFundingListSection />
    <PastFundingListSection />
  </ManageClubFundingMainFrameInner>
);

export default ManageClubFundingMainFrame;
