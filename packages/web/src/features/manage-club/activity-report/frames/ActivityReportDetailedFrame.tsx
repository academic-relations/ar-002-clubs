"use client";

import React from "react";

import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";

import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ActivitySectionProps {
  label: string;
  children?: React.ReactNode;
}

const ActivityReportDetailedFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
`;

const ActivitySectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const CardAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
`;

const ActivitySection: React.FC<ActivitySectionProps> = ({
  label,
  children = null,
}) => (
  <ActivitySectionWrapper>
    <Typography fw="MEDIUM" fs={16} lh={20}>
      {label}
    </Typography>
    {children}
  </ActivitySectionWrapper>
);
// ActivitySection은 활동 보고서에서 구분된 각 영역을 나타냅니다.
// label prop으로 이름을 넣고, children으로 ActivityDetail들을 넣어 주세요.

const ActivityDetail: React.FC<{ children: string }> = ({ children = "" }) => (
  <Typography fw="REGULAR" fs={16} lh={20}>
    {`• ${children}`}
  </Typography>
);
// ActivityDetail은 세부 활동 내역을 나타냅니다.
// bullet point가 자동으로 포함됩니다.

const ActivityReportDetailedFrame: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const onClick = () => {
    router.push("/manage-club/activity-report");
  };

  return (
    <ActivityReportDetailedFrameInner>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title={`활동 보고서 : ${id}(id 가져오기 테스트용)`}
        enableLast
      />
      <CardAndButtonWrapper>
        <Card outline={false} padding="32px" gap={20}>
          <ProgressStatus
            labels={["신청 완료", "동아리 연합회 신청 반려"]}
            progress={[
              { status: Status.Approved, date: new Date("2024-03-11 21:00") },
              { status: Status.Canceled, date: new Date("2024-03-11 21:00") },
            ]}
          />
          <ActivitySection label="활동 정보">
            <ActivityDetail>활동명: 스팍스 봄학기 해커톤</ActivityDetail>
            <ActivityDetail>
              활동 분류: 동아리 성격에 합치하는 내부 활동
            </ActivityDetail>
            <ActivityDetail>
              활동 기간: 2024년 5월 24일 (금) ~ 2024년 5월 25일 (토)
            </ActivityDetail>
            <ActivityDetail>활동 장소: 동아리방</ActivityDetail>
            <ActivityDetail>
              활동 목적: 동아리 회원 개발 실력 향상
            </ActivityDetail>
            <ActivityDetail>활동 내용: 밤을 새서 개발을 했다.</ActivityDetail>
          </ActivitySection>
          <ActivitySection label="활동 인원(4명)">
            <ActivityDetail>20200510 이지윤</ActivityDetail>
            <ActivityDetail>20200511 박병찬</ActivityDetail>
            <ActivityDetail>20230510 이도라</ActivityDetail>
            <ActivityDetail>20240510 스팍스</ActivityDetail>
          </ActivitySection>
          <ActivitySection label="활동 증빙">
            <ActivityDetail>활동명: 스팍스 봄학기 해커톤</ActivityDetail>
            <ActivityDetail>첨부 파일</ActivityDetail>
            <ActivityDetail>
              (ActivityDetail 대신 File Thumbnail이 보여야 할 자리)
            </ActivityDetail>
            <ActivityDetail>
              부가 설명: 커피를 마시며 개발을 했고 밤을 샜어요
            </ActivityDetail>
          </ActivitySection>
          <ActivitySection label="지도교수 승인" />
        </Card>
        <Button type="default" onClick={onClick}>
          목록으로 돌아가기
        </Button>
      </CardAndButtonWrapper>
    </ActivityReportDetailedFrameInner>
  );
};

export default ActivityReportDetailedFrame;
