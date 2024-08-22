"use client";

import React, { ReactNode } from "react";

import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import AdvisorProfessorApprovalTag, {
  ProfessorApproval,
} from "../components/AdvisorProfessorApprovalTag";

interface ActivitySectionProps extends React.PropsWithChildren {
  label: string;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  label,
  children = null,
}) => (
  <FlexWrapper
    direction="column"
    gap={16}
    style={{ alignItems: "flex-start", alignSelf: "stretch" }}
  >
    <Typography
      fw="MEDIUM"
      fs={16}
      lh={20}
      style={{ paddingLeft: "2px", paddingRight: "2px" }}
    >
      {label}
    </Typography>
    {children}
  </FlexWrapper>
);
// ActivitySection은 활동 보고서에서 구분된 각 영역을 나타냅니다.
// label prop으로 이름을 넣고, children으로 ActivityDetail들을 넣어 주세요.

const FlexTypography = styled(Typography)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  align-self: stretch;
`;

const ActivityDetail: React.FC<{ children: string | ReactNode }> = ({
  children = "",
}) => {
  const isString: boolean = typeof children === "string";
  return (
    <FlexTypography fw="REGULAR" fs={16} lh={20}>
      {isString ? `• ${children}` : children}
    </FlexTypography>
  );
};
// ActivityDetail은 세부 활동 내역을 나타냅니다.
// string이면 bullet point가 자동으로 포함됩니다.
// string이 아닌 경우는 FilePreview가 들어가는 경우입니다. padding이 포함됩니다.

const FilePreviewContainerWrapper = styled(FlexWrapper)`
  padding-left: 24px;
  align-items: flex-start;
  align-self: stretch;
`;

const FilePreviewContainer: React.FC<React.PropsWithChildren> = ({
  children = null,
}) => (
  <FilePreviewContainerWrapper direction="column" gap={12}>
    {children}
  </FilePreviewContainerWrapper>
);

const ActivityReportDetailFrame: React.FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const onClick = () => {
    router.push("/manage-club/activity-report");
  };

  return (
    <FlexWrapper
      direction="column"
      gap={60}
      style={{ alignItems: "flex-start" }}
    >
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title={`활동 보고서 : ${id}(id 가져오기 테스트용)`}
        enableLast
      />
      <FlexWrapper
        direction="column"
        gap={40}
        style={{ alignItems: "flex-start", alignSelf: "stretch" }}
      >
        <Card outline={false} padding="32px" gap={20}>
          <ProgressStatus
            labels={["신청 완료", "동아리 연합회 신청 반려"]}
            progress={[
              {
                status: ProgressCheckSectionStatusEnum.Approved,
                date: new Date("2024-03-11 21:00"),
              },
              {
                status: ProgressCheckSectionStatusEnum.Canceled,
                date: new Date("2024-03-11 21:00"),
              },
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
              <FilePreviewContainer>
                <ThumbnailPreviewList
                  fileList={[
                    {
                      name: "bamseam.pdf",
                      src: "https://pdfobject.com/pdf/sample.pdf",
                    },
                    {
                      name: "coffee.pdf",
                      src: "https://pdfobject.com/pdf/sample.pdf",
                    },
                    {
                      name: "gaebal.pdf",
                      src: "https://pdfobject.com/pdf/sample.pdf",
                    },
                  ]}
                />
              </FilePreviewContainer>
            </ActivityDetail>
            <ActivityDetail>
              부가 설명: 커피를 마시며 개발을 했고 밤을 샜어요
            </ActivityDetail>
          </ActivitySection>
          <FlexWrapper
            direction="row"
            gap={16}
            justify="space-between"
            style={{
              alignItems: "center",
              alignSelf: "stretch",
              width: "100%",
            }}
          >
            <ActivitySection label="지도교수 승인" />
            <AdvisorProfessorApprovalTag
              professorApproval={ProfessorApproval.PENDING}
            />
          </FlexWrapper>
        </Card>
        <Button type="default" onClick={onClick}>
          목록으로 돌아가기
        </Button>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default ActivityReportDetailFrame;
