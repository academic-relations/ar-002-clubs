"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";

const MyCommonSpace = () => (
  <FlexWrapper direction="column" gap={20}>
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
    <MyServiceTable />
  </FlexWrapper>
);

export default MyCommonSpace;
