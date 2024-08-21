"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ActivityManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ActivityManageFrame";
import InfoManageFrame from "@sparcs-clubs/web/features/manage-club/frames/InfoManageFrame";
import MembersManageFrame from "@sparcs-clubs/web/features/manage-club/frames/MembersManageFrame";
import ServiceManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ServiceManageFrame";

const ManageClub: React.FC = () => {
  const isRepresentative = false; // 대표자 <--> 대의원

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
        title="대표 동아리 관리"
      />
      <InfoManageFrame isRepresentative={isRepresentative} />
      <ActivityManageFrame />
      <MembersManageFrame />
      <ServiceManageFrame />
    </FlexWrapper>
  );
};

export default ManageClub;
