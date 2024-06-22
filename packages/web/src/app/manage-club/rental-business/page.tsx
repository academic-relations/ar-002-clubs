"use client";

import React from "react";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const ManageClubRentalBusiness = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "대여 사업 신청 내역", path: "/manage-club/rental-business" },
      ]}
      title="대여 사업 신청 내역"
    />
    <ManageClubTableMainFrame pageType="rental-business" />
  </>
);

export default ManageClubRentalBusiness;
