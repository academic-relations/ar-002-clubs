"use client";

import React from "react";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ManageClubTableMainFrame from "@sparcs-clubs/web/features/manageClubTable/frames/ManageClubTableMainFrame";

const ManageClubActivityCertificate = () => (
  <>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        {
          name: "활동확인서 발급 내역",
          path: "/manage-club/activity-certificate",
        },
      ]}
      title="활동확인서 발급 내역"
    />
    <ManageClubTableMainFrame pageType="activity-certificate" />
  </>
);

export default ManageClubActivityCertificate;
