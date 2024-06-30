"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyServiceTable from "@sparcs-clubs/web/features/my/component/MyServiceTable";

const MyPrintingBusiness = () => (
  <FlexWrapper direction="column" gap={20}>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        { name: "홍보물 인쇄 내역", path: "/my/printing-business" },
      ]}
      title="홍보물 인쇄 내역"
    />
    <MyServiceTable />
  </FlexWrapper>
);

export default MyPrintingBusiness;
