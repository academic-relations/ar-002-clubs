import React from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import { fromUUID } from "@sparcs-clubs/web/common/components/File/attachment";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";
import { getActivityTypeTagLabel } from "@sparcs-clubs/web/features/register-club/utils/activityType";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

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

const ActivityDetail: React.FC<{ text: string }> = ({ text }) => (
  <FlexTypography fw="REGULAR" fs={16} lh={20}>
    {`• ${text}`}
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
  const { data, isLoading, isError } = useGetActivityReport(activityId);

  return (
    <Modal isOpen={isOpen}>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper gap={20} direction="column">
          <ActivitySection label="활동 정보">
            <ActivityDetail text={`활동명: ${data?.name}`} />
            <ActivityDetail
              text={`활동 분류: ${data ? getActivityTypeTagLabel(data.activityTypeEnumId) : "-"}`}
            />
            <ActivityDetail text="활동 기간:" />
            <FlexWrapper
              direction="column"
              gap={12}
              style={{ paddingLeft: 24 }}
            >
              {data?.durations.map((duration, index) => (
                <Typography key={index}>
                  {`${formatDate(duration.startTerm)} ~ ${formatDate(duration.endTerm)}`}
                </Typography>
              ))}
            </FlexWrapper>
            <ActivityDetail text={`활동 장소: ${data?.location}`} />
            <ActivityDetail text={`활동 목적: ${data?.purpose}`} />
            <ActivityDetail text={`활동 내용: ${data?.detail}`} />
          </ActivitySection>
          <ActivitySection
            label={`활동 인원(${data?.participants.length ?? 0}명)`}
          >
            {data?.participants.map((participant, index) => (
              <ActivityDetail key={index} text={`${participant.studentId}`} />
            ))}
          </ActivitySection>
          <ActivitySection label="활동 증빙">
            <ActivityDetail text="첨부 파일" />
            <FilePreviewContainer>
              <ThumbnailPreviewList
                fileList={
                  data?.evidenceFiles.map(file => fromUUID(file.uuid)) ?? []
                }
                disabled
              />
            </FilePreviewContainer>
            <ActivityDetail text={`부가 설명: ${data?.evidence}`} />
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
      </AsyncBoundary>
    </Modal>
  );
};

export default PastActivityReportModal;
