"use client";

import React from "react";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const MyPrintingBusiness = () => (
  <>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        { name: "홍보물 인쇄 내역", path: "/my/printing-business" },
      ]}
      title="홍보물 인쇄 내역"
    />
    <ManageClubTableMainFrame pageType="printing-business" />
  </>
);

export default MyPrintingBusiness;
