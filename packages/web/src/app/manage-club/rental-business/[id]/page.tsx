"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import RentalDetailFrame from "@sparcs-clubs/web/features/rental-business/frames/RentalDetailFrame";

const ManageRentalDetail = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        {
          name: "대여 사업 신청 내역",
          path: "/manage-club/rental-business",
        },
      ]}
      title="대여 사업 신청 내역"
      enableLast
    />
    <RentalDetailFrame />
  </FlexWrapper>
);
export default ManageRentalDetail;
