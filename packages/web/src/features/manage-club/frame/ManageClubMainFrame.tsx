"use client";

import React from "react";
import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import InfoManageFrame from "./_atomic/InfoManageFrame";
import MembersManageFrame from "./_atomic/MembersManageFrame";
import ActivityManageFrame from "./_atomic/ActivityManageFrame";
import ServiceManageFrame from "./_atomic/ServiceManageFrame";

const ManageClubMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ManageClubMainFrame: React.FC = () => (
  <ManageClubMainFrameInner>
    <PageHead
      items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
      title="대표 동아리 관리"
    />
    <InfoManageFrame />
    <ActivityManageFrame />
    <MembersManageFrame />
    <ServiceManageFrame />
  </ManageClubMainFrameInner>
);

export default ManageClubMainFrame;
