"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";

const MyActivityCertificate = () => (
  <FlexWrapper direction="column" gap={20}>
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
    <MyServiceTable />
  </FlexWrapper>
);

export default MyActivityCertificate;
