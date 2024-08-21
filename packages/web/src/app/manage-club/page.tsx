"use client";

import React from "react";

import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import NoManageClub from "@sparcs-clubs/web/app/NoManageClub";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ActivityManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ActivityManageFrame";
import InfoManageFrame from "@sparcs-clubs/web/features/manage-club/frames/InfoManageFrame";
import MembersManageFrame from "@sparcs-clubs/web/features/manage-club/frames/MembersManageFrame";
import ServiceManageFrame from "@sparcs-clubs/web/features/manage-club/frames/ServiceManageFrame";
import { useCheckManageClub } from "@sparcs-clubs/web/hooks/checkManageClub";
import { useGetProfileNow } from "@sparcs-clubs/web/hooks/getProfileNow";

const ManageClub: React.FC = () => {
  const profile = useGetProfileNow();
  const { delegate, isLoading } = useCheckManageClub();

  if (profile !== "undergraduate") {
    return <NoManageClub />;
  }
  if (!isLoading && delegate === undefined) {
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

export default ManageClub;
