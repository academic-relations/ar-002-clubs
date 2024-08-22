"use client";

import React from "react";

import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import NoManageClub from "@sparcs-clubs/web/common/frames/NoManageClub";
import ActivityManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ActivityManageFrame";
import InfoManageFrame from "@sparcs-clubs/web/features/manage-club/frames/InfoManageFrame";
import MembersManageFrame from "@sparcs-clubs/web/features/manage-club/frames/MembersManageFrame";
import ServiceManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ServiceManageFrame";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";

const ManageClubFrame: React.FC = () => {
  const { delegate, isLoading } = useCheckManageClub();

  if (isLoading) {
    return <AsyncBoundary isLoading={isLoading} isError />;
  }

  if (delegate === undefined) {
    return <NoManageClub />;
  }

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[{ name: "대표 동아리 관리", path: "/manage-club" }]}
        title="대표 동아리 관리"
      />
      <InfoManageFrame
        isRepresentative={delegate === ClubDelegateEnum.Representative}
      />
      <ActivityManageFrame />
      <MembersManageFrame />
      <ServiceManageFrame />
    </FlexWrapper>
  );
};

export default ManageClubFrame;