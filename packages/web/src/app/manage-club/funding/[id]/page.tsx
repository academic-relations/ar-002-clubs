"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FundingDetailFrame from "@sparcs-clubs/web/features/manage-club/funding/frame/FundingDetailFrame";

const FundingDetail = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "지원금", path: "/manage-club/funding" },
      ]}
      title="지원금 신청"
      enableLast
    />
    {/* TODO: 기간 맞춰서 isNow 설정 */}
    <FundingDetailFrame isNow />
    <FundingDetailFrame isNow={false} />
  </FlexWrapper>
);

export default FundingDetail;
