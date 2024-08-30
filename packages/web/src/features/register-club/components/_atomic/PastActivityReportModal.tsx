import React, { ReactNode } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { mockPastActivityData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import { getActivityTypeTagLabel } from "@sparcs-clubs/web/features/register-club/utils/activityType";
// import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";

interface PastActivityReportModalProps {
  activityId: number;
  isOpen: boolean;
  close: VoidFunction;
}

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
}) => (
  <FlexTypography fw="REGULAR" fs={16} lh={20}>
    {`• ${children}`}
  </FlexTypography>
);

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
// TODO. 활동기간 리스트 추가, 파일업로드 추가
const PastActivityReportModal: React.FC<PastActivityReportModalProps> = ({
  activityId,
  isOpen,
  close,
}) => {
  /* TODO: (@dora) connect api */
  // const { data, isLoading, isError } = useGetActivityReport(activityId);
  const data = mockPastActivityData.activities.filter(
    activity => activity.id === activityId,
  )[0];

  return (
    <Modal isOpen={isOpen}>
      <FlexWrapper gap={20} direction="column">
        <ActivitySection label="활동 정보">
          <ActivityDetail>활동명: {data.name}</ActivityDetail>
          <ActivityDetail>
            활동 분류: {getActivityTypeTagLabel(data.activityTypeEnumId)}
          </ActivityDetail>
          <ActivityDetail>
            활동 기간: 2024년 5월 24일 (금) ~ 2024년 5월 25일 (토)
          </ActivityDetail>
          <ActivityDetail>활동 장소: 동아리방</ActivityDetail>
          <ActivityDetail>활동 목적: 동아리 회원 개발 실력 향상</ActivityDetail>
          <ActivityDetail>활동 내용: 밤을 새서 개발을 했다.</ActivityDetail>
        </ActivitySection>
        <ActivitySection label="활동 인원(4명)">
          <ActivityDetail>20200510 이지윤</ActivityDetail>
          <ActivityDetail>20200511 박병찬</ActivityDetail>
          <ActivityDetail>20230510 이도라</ActivityDetail>
          <ActivityDetail>20240510 스팍스</ActivityDetail>
        </ActivitySection>
        <ActivitySection label="활동 증빙">
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
          gap={12}
          style={{ flex: 1, justifyContent: "space-between" }}
        >
          <Button type="outlined" onClick={close}>
            취소
          </Button>
          <FlexWrapper direction="row" gap={12}>
            <Button onClick={() => close()}>삭제</Button>
            <Button onClick={() => close()}>수정</Button>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>
    </Modal>
  );
};

export default PastActivityReportModal;
