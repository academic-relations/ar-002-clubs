"use client";

import React, { ReactNode, useCallback } from "react";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { Profile } from "@sparcs-clubs/web/common/providers/AuthContext";
import { getActivityReportProgress } from "@sparcs-clubs/web/features/manage-club/activity-report/constants/activityReportProgress";
import { useDeleteActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useDeleteActivityReport";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";
import { kstToUtc } from "@sparcs-clubs/web/utils/Date/extractDate";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const DeleteAndEditButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

interface ActivityReportDetailFrameProps {
  profile: Profile;
}

const ActivityReportDetailFrame: React.FC<ActivityReportDetailFrameProps> = ({
  profile,
}) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { mutate: deleteActivityReport } = useDeleteActivityReport();

  const onClick = () => {
    router.push("/manage-club/activity-report");
  };

  // TODO: 지도교수 승인 추가 예정
  // const { color: approvalTagColor, text: approvalTagText } = getTagDetail(
  //   ActivityProfessorApprovalEnum.Requested,
  //   ProfessorApprovalTagList,
  // );

  const handleEdit = () => {
    router.push(`/manage-club/activity-report/${id}/edit`);
  };

  const handleDelete = useCallback(() => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            deleteActivityReport(
              { requestParam: { activityId: Number(id) } },
              {
                onSuccess: () => {
                  close();
                  router.push("/manage-club/activity-report");
                },
              },
            );
          }}
          onClose={close}
          confirmButtonText="삭제"
        >
          활동 보고서를 삭제하면 복구할 수 없습니다.
          <br />
          삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  }, [deleteActivityReport, id, router]);

  const { data, isLoading, isError } = useGetActivityReport(
    profile.type,
    Number(id),
  );

  const activityType: (type: ActivityTypeEnum) => string = type => {
    switch (type) {
      case ActivityTypeEnum.matchedInternalActivity:
        return "동아리 성격에 합치하는 내부 활동";
        break;
      case ActivityTypeEnum.matchedExternalActivity:
        return "동아리 성격에 합치하는 외부 활동";
        break;
      case ActivityTypeEnum.notMatchedActivity:
        return "동아리 성격에 합치하지 않는 활동";
        break;
      default:
        return "";
    }
  };

  if (!data || !("clubId" in data)) {
    return <AsyncBoundary isLoading={isLoading} isError={isError} />;
  }

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서"
        enableLast
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper
          direction="column"
          gap={40}
          style={{ alignSelf: "stretch" }}
        >
          <Card outline={false} padding="32px" gap={20}>
            <ProgressStatus
              labels={
                getActivityReportProgress(
                  data.activityStatusEnumId,
                  kstToUtc(data.updatedAt),
                ).labels
              }
              progress={
                getActivityReportProgress(
                  data.activityStatusEnumId,
                  kstToUtc(data.updatedAt),
                ).progress
              }
              optional={
                data.comments &&
                data.comments.length > 0 && (
                  <RejectReasonToast
                    title="반려 사유"
                    reasons={data.comments.map(comment => ({
                      datetime: comment.createdAt,
                      reason: comment.content,
                    }))}
                  />
                )
              }
            />
            <ActivitySection label="활동 정보">
              <ActivityDetail>{`활동명: ${data.name}`}</ActivityDetail>
              <ActivityDetail>
                {`활동 분류: ${activityType(data.activityTypeEnumId)}`}
              </ActivityDetail>
              <ActivityDetail>활동 기간:</ActivityDetail>
              <FlexWrapper
                direction="column"
                gap={12}
                style={{ paddingLeft: 24 }}
              >
                {data.durations.map((duration, index) => (
                  <Typography key={index}>
                    {`${formatDate(duration.startTerm)} ~ ${formatDate(duration.endTerm)}`}
                  </Typography>
                ))}
              </FlexWrapper>
              <ActivityDetail>{`활동 장소: ${data.location}`}</ActivityDetail>
              <ActivityDetail>{`활동 목적: ${data.purpose}`}</ActivityDetail>
              <ActivityDetail>{`활동 내용: ${data.detail}`}</ActivityDetail>
            </ActivitySection>
            <ActivitySection label={`활동 인원(${data.participants.length}명)`}>
              {data.participants.map(participant => (
                <ActivityDetail
                  key={participant.studentId}
                >{`${participant.studentNumber} ${participant.name}`}</ActivityDetail>
              ))}
            </ActivitySection>
            <ActivitySection label="활동 증빙">
              <ActivityDetail>첨부 파일</ActivityDetail>
              <ActivityDetail>
                <FilePreviewContainer>
                  <ThumbnailPreviewList
                    fileList={data.evidenceFiles.map(file => ({
                      id: file.fileId,
                      name: file.name,
                      url: file.url,
                    }))}
                  />
                </FilePreviewContainer>
              </ActivityDetail>
              <ActivityDetail>{`부가 설명: ${data.evidence}`}</ActivityDetail>
            </ActivitySection>
            {/* TODO: 지도교수 승인 추가 예정 */}
            {/* <FlexWrapper
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
              <Tag color={approvalTagColor}>{approvalTagText}</Tag>
            </FlexWrapper> */}
          </Card>
          <ButtonContainer>
            <Button type="default" onClick={onClick}>
              목록으로 돌아가기
            </Button>
            <DeleteAndEditButtonContainer>
              <Button type="default" onClick={handleDelete}>
                삭제
              </Button>
              <Button type="default" onClick={handleEdit}>
                수정
              </Button>
            </DeleteAndEditButtonContainer>
          </ButtonContainer>
        </FlexWrapper>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ActivityReportDetailFrame;
