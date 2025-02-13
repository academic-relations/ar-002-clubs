"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalDetailFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalDetailFrame";

const MyRentalDetail = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        {
          name: "대여 사업 신청 내역",
          path: "/my/rental-business",
        },
      ]}
      title="대여 사업 신청 내역"
      enableLast
    />
    <RentalDetailFrame />
  </FlexWrapper>
);
export default MyRentalDetail;
