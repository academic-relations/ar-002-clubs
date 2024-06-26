"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import ActivityManageFrame from "./_atomic/ActivityManageFrame";
import InfoManageFrame from "./_atomic/InfoManageFrame";
import MembersManageFrame from "./_atomic/MembersManageFrame";
import ServiceManageFrame from "./_atomic/ServiceManageFrame";

const ManageClubMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
      title="대표 동아리 관리"
    />
    <InfoManageFrame />
    <ActivityManageFrame />
    <MembersManageFrame />
    <ServiceManageFrame />
  </FlexWrapper>
);

export default ManageClubMainFrame;
