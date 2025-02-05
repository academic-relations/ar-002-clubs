"use client";

import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React, { useCallback, useMemo } from "react";
import styled from "styled-components";

import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import NotFound from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import List from "@sparcs-clubs/web/common/components/List";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { Profile } from "@sparcs-clubs/web/common/providers/AuthContext";
import { getActivityTypeLabel } from "@sparcs-clubs/web/types/activityType";
import {
  getProfessorApprovalLabel,
  getProfessorApprovalTagColor,
} from "@sparcs-clubs/web/types/professorApproval";
import {
  formatDate,
  formatDotDetailDate,
} from "@sparcs-clubs/web/utils/Date/formatDate";

import ExecutiveActivityReportApprovalSection from "../components/ExecutiveActivityReportApprovalSection";
import { getActivityReportProgress } from "../constants/activityReportProgress";
import useGetActivityReportDetail from "../hooks/useGetActivityReportDetail";
import useProfessorApproveSingleActivityReport from "../hooks/useProfessorApproveSingleActivityReport";
import { useDeleteActivityReport } from "../services/useDeleteActivityReport";
import useGetActivityDeadline from "../services/useGetActivityDeadline";
import { CurrentActivityReport } from "../types/activityReport";
import { filterActivityComments } from "../utils/filterComment";

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
// label prop으로 이름을 넣고, children으로 List 컴포넌트 또는 기타 children을 넣어주세요.
// 들여쓰기가 필요한 경우 FlexWrapper를 활용해 주세요.

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

  const { data, isLoading, isError } = useGetActivityReportDetail(Number(id));
  const {
    data: activityDeadline,
    isLoading: isLoadingDeadline,
    isError: isErrorDeadline,
  } = useGetActivityDeadline();
  const { mutate: deleteActivityReport } = useDeleteActivityReport();
  const { mutate: approveActivityReport } =
    useProfessorApproveSingleActivityReport();

  const isProgressVisible =
    profile.type === "undergraduate" || profile.type === "executive";
  const isCommentsVisible =
    profile.type === "undergraduate" || profile.type === "executive";

  const navigateToActivityReportList = () => {
    if (profile.type === "executive") {
      router.back();
    } else {
      router.push("/manage-club/activity-report");
    }
  };

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
                  window.location.href = "/manage-club/activity-report";
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
  }, [deleteActivityReport, id]);

  const handleProfessorApproval = useCallback(() => {
    approveActivityReport(Number(id), {
      onSuccess: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 승인이 완료되었습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
      onError: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 승인에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  }, [approveActivityReport, id]);

  const isPastActivity = useMemo(() => {
    if (
      !activityDeadline ||
      !activityDeadline.targetTerm ||
      !data.durations ||
      data.durations.length === 0
    ) {
      return false;
    }

    const maxEndTermDuration = data.durations.reduce(
      (maxDuration, currentDuration) =>
        new Date(currentDuration.endTerm) > new Date(maxDuration.endTerm)
          ? currentDuration
          : maxDuration,
      data.durations[0],
    );

    return (
      new Date(maxEndTermDuration.endTerm) <
      new Date(activityDeadline.targetTerm.startTerm)
    );
  }, [activityDeadline, data.durations]);

  if (isError) {
    return <NotFound />;
  }

  if (!data || isLoading) {
    return <AsyncBoundary isLoading={isLoading} isError={isError} />;
  }

  const additionalButtons = () => {
    if (profile.type === "undergraduate") {
      return (
        <FlexWrapper gap={12}>
          <Button type="default" onClick={handleDelete}>
            삭제
          </Button>
          <Button type="default" onClick={handleEdit}>
            수정
          </Button>
        </FlexWrapper>
      );
    }

    if (profile.type === "professor") {
      return (
        <Button
          type={data.professorApprovedAt ? "disabled" : "default"}
          onClick={handleProfessorApproval}
        >
          승인
        </Button>
      );
    }

    return null;
  };

  const activityReportProgress = (activityData: CurrentActivityReport) =>
    getActivityReportProgress(
      activityData.activityStatusEnumId,
      activityData.activityStatusEnumId === ActivityStatusEnum.Applied
        ? activityData.editedAt
        : activityData.commentedAt || activityData.updatedAt,
    );

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FlexWrapper direction="column" gap={40} style={{ alignSelf: "stretch" }}>
        <Card outline padding="32px" gap={20}>
          {isProgressVisible && (
            <ProgressStatus
              labels={activityReportProgress(data).labels}
              progress={activityReportProgress(data).progress}
              optional={
                isCommentsVisible &&
                filterActivityComments(data.comments).length > 0 && (
                  <RejectReasonToast
                    title="반려 사유"
                    reasons={filterActivityComments(data.comments).map(
                      comment => ({
                        datetime: comment.createdAt,
                        reason: comment.content,
                      }),
                    )}
                  />
                )
              }
            />
          )}

          <ActivitySection label="활동 정보">
            <List
              dataList={[
                `활동명: ${data.name}`,
                `활동 분류: ${getActivityTypeLabel(data.activityTypeEnumId)}`,
                "활동 기간:",
              ]}
              listType="bullet"
              gap={16}
            />

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
            <List
              dataList={[
                `활동 장소: ${data.location}`,
                `활동 목적: ${data.purpose}`,
                `활동 내용: ${data.detail}`,
              ]}
              listType="bullet"
              gap={16}
            />
          </ActivitySection>
          <ActivitySection label={`활동 인원(${data.participants.length}명)`}>
            <List
              dataList={data.participants.map(
                participant =>
                  `${participant.studentNumber} ${participant.name}`,
              )}
              listType="bullet"
              gap={16}
              startIndex={0}
              fw="REGULAR"
              fs={16}
              lh={20}
            />
          </ActivitySection>
          <ActivitySection label="활동 증빙">
            <List
              dataList={[
                "첨부 파일",
                <FilePreviewContainer key="file-preview">
                  <ThumbnailPreviewList
                    fileList={data.evidenceFiles}
                    disabled
                  />
                </FilePreviewContainer>,
                `부가 설명: ${data.evidence}`,
              ]}
              listType="bullet"
              gap={16}
            />
          </ActivitySection>
          {data.professorApproval !== null && (
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
              <FlexWrapper
                direction="row"
                gap={8}
                style={{ alignItems: "center" }}
              >
                {data.professorApprovedAt && (
                  <Typography fs={14} lh={16} color="GRAY.300">
                    {formatDotDetailDate(data.professorApprovedAt)}
                  </Typography>
                )}
                <Tag
                  color={getProfessorApprovalTagColor(data.professorApproval)}
                >
                  {getProfessorApprovalLabel(data.professorApproval)}
                </Tag>
              </FlexWrapper>
            </FlexWrapper>
          )}
        </Card>

        {profile.type === "executive" && (
          <ExecutiveActivityReportApprovalSection
            comments={filterActivityComments(data.comments)}
            clubId={data.clubId}
          />
        )}

        <FlexWrapper gap={20} justify="space-between">
          <Button type="default" onClick={navigateToActivityReportList}>
            목록으로 돌아가기
          </Button>

          <AsyncBoundary
            isLoading={isLoadingDeadline}
            isError={isErrorDeadline}
          >
            {isPastActivity ? null : additionalButtons()}
          </AsyncBoundary>
        </FlexWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ActivityReportDetailFrame;
