import React from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import DashboardButton from "../components/DashboardButton";

const ExecutiveDashboardFrame = () => {
  const isLoading = false;
  const isError = false;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper
        direction="row"
        gap={60}
        style={{ justifyContent: "space-between" }}
      >
        <FlexWrapper direction="column" gap={20} style={{ flex: 1 }}>
          <SectionTitle>동아리 / 회원 등록</SectionTitle>
          <FlexWrapper direction="column" gap={12}>
            <DashboardButton text="동아리 등록 신청 내역" />
            <DashboardButton text="회원 등록 신청 내역" />
          </FlexWrapper>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={20} style={{ flex: 1 }}>
          <SectionTitle>활동 보고서 / 지원금</SectionTitle>
          <FlexWrapper direction="column" gap={12}>
            <DashboardButton text="활동 보고서 작성 내역" />
            <DashboardButton text="지원금 신청 내역" />
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveDashboardFrame;
