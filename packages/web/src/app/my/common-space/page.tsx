"use client";

import React from "react";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const MyCommonSpace = () => (
  <>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        {
          name: "공용공간 비정기사용 내역",
          path: "/my/common-space",
        },
      ]}
      title="공용공간 비정기사용 내역"
    />
    <ManageClubTableMainFrame pageType="common-space" />
  </>
);

export default MyCommonSpace;
