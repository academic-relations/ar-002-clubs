"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { mockupMyRental } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClub";
import MyRentalTable from "@sparcs-clubs/web/features/rental-business/components/MyRentalTable";

const MyRentalBusiness = () => (
  <FlexWrapper direction="column" gap={20}>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        { name: "대여 사업 신청 내역", path: "/my/rental-business" },
      ]}
      title="대여 사업 신청 내역"
    />
    <MyRentalTable rentalList={mockupMyRental} withCount />
  </FlexWrapper>
);

export default MyRentalBusiness;
