import React from "react";

import { Divider } from "@mui/material";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import DateRangeInputWithLabel from "@sparcs-clubs/web/common/components/Forms/DateRangeInputWithLabel";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

import DashboardButton from "../components/DashboardButton";

const DashboardSectionInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 24px;
  justify-content: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
          <DashboardSectionInner>
            <FlexWrapper direction="column" gap={12}>
              <Card outline>
                <DateRangeInputWithLabel label="동아리 등록 기간" />
                <DateRangeInputWithLabel label="회원 등록 기간" />
                <ButtonWrapper>
                  <Button type="disabled" onClick={() => {}}>
                    저장
                  </Button>
                </ButtonWrapper>
              </Card>
              <DashboardButton
                text="동아리 등록 신청 내역"
                link="/executive/register-club"
              />
              <DashboardButton
                text="회원 등록 신청 내역"
                link="/executive/register-member"
              />
            </FlexWrapper>
          </DashboardSectionInner>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={20} style={{ flex: 1 }}>
          <SectionTitle>활동 보고서 / 지원금</SectionTitle>
          <DashboardSectionInner>
            <Card outline>
              <DateRangeInputWithLabel label="활동 보고서 작성 기간" />
              <DateRangeInputWithLabel label="활동 보고서 수정 기간" />
              <DateRangeInputWithLabel label="활동 보고서 검토 기간" />
              <Divider />
              <DateRangeInputWithLabel label="지원금 신청 기간" />
              <ButtonWrapper>
                <Button type="disabled" onClick={() => {}}>
                  저장
                </Button>
              </ButtonWrapper>
            </Card>
            <FlexWrapper direction="column" gap={12}>
              <DashboardButton
                text="활동 보고서 작성 내역"
                link="/executive/activity-report"
              />
              <DashboardButton
                text="지원금 신청 내역"
                link=""
                // TODO: 지원금 신청 내역 링크 추가
              />
            </FlexWrapper>
          </DashboardSectionInner>
        </FlexWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveDashboardFrame;
