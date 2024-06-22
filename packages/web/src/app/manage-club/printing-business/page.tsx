"use client";

import React from "react";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const ManageClubPrintingBusiness = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "홍보물 인쇄 내역", path: "/manage-club/printing-business" },
      ]}
      title="홍보물 인쇄 내역"
    />
    <ManageClubTableMainFrame pageType="printing-business" />
  </>
);

export default ManageClubPrintingBusiness;
