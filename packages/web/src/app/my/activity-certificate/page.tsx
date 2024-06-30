"use client";

import React from "react";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const MyActivityCertificate = () => (
  <>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        {
          name: "활동확인서 발급 내역",
          path: "/my/activity-certificate",
        },
      ]}
      title="활동확인서 발급 내역"
    />
    <ManageClubTableMainFrame pageType="activity-certificate" />
  </>
);

export default MyActivityCertificate;
