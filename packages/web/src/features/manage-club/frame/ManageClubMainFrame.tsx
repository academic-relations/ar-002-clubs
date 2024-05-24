"use client";

import React from "react";
import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import InfoManageFrame from "./_atomic/InfoManageFrame";
import MembersManageFrame from "./_atomic/MembersManageFrame";
import ActivityManageFrame from "./_atomic/ActivityManageFrame";
import ServiceManageFrame from "./_atomic/ServiceManageFrame";

const ManageClubMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ManageClubMainFrame: React.FC = () => (
  <ManageClubMainFrameInner>
    <PageHeadWrapper>
      <BreadCrumb
        items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
      />
      <PageTitle>대표 동아리 관리</PageTitle>
    </PageHeadWrapper>
    <InfoManageFrame />
    <ActivityManageFrame />
    <MembersManageFrame />
    <ServiceManageFrame />
  </ManageClubMainFrameInner>
);

export default ManageClubMainFrame;
