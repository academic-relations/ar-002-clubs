"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

const executiveRental = () => (
  <FlexWrapper>
    <PageHead
      items={[
        { name: "집행부원 대시보드", path: "/executive" },
        { name: "대여 사업 신청 내역", path: "/executive/rental-business" },
      ]}
      title="대여 사업 신청 내역"
    />
  </FlexWrapper>
);

export default executiveRental;
