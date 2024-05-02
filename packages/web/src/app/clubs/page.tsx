"use client";

import React from "react";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb/BreadCrumb";
import styled from "styled-components";
// import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Clubs = () => (
  <>
    <PageHeadWrapper>
      <BreadCrumb items={[{ name: "동아리 목록", path: "/clubs" }]} />
      <PageTitle>동아리 목록</PageTitle>
    </PageHeadWrapper>
    <ClubsPageMainFrame />
  </>
);

export default Clubs;
