"use client";

import React from "react";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const ManageClubCommonSpace = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        {
          name: "공용공간 비정기사용 내역",
          path: "/manage-club/common-space",
        },
      ]}
      title="공용공간 비정기사용 내역"
    />
    <ManageClubTableMainFrame pageType="common-space" />
  </>
);

export default ManageClubCommonSpace;
