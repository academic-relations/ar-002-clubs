"use client";

import React from "react";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const MyRentalBusiness = () => (
  <>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        { name: "대여 사업 신청 내역", path: "/my/rental-business" },
      ]}
      title="대여 사업 신청 내역"
    />
    <ManageClubTableMainFrame pageType="rental-business" />
  </>
);

export default MyRentalBusiness;
