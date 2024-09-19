import React, { useEffect, useState } from "react";

import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { overlay } from "overlay-kit";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import { ListItem } from "@sparcs-clubs/web/common/components/ListItem";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { patchActivityExecutive } from "@sparcs-clubs/web/features/executive/register-club/services/patchActivityExecutive";
import { patchActivityExecutiveSendBack } from "@sparcs-clubs/web/features/executive/register-club/services/patchActivityExecutiveSendBack";
import { useDeleteActivityReportProvisional } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useDeleteActivityReportProvisional";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";
import { getActivityTypeTagLabel } from "@sparcs-clubs/web/features/register-club/utils/activityType";

import {
  formatDate,
  formatSlashDateTime,
} from "@sparcs-clubs/web/utils/Date/formatDate";

import EditActivityReportModal from "./EditActivityReportModal";

interface PastActivityReportModalProps {
  activityId: number;
  profile: string;
  isOpen: boolean;
  close: VoidFunction;
  viewOnly?: boolean;
}

const PastActivityReportModal: React.FC<PastActivityReportModalProps> = ({
  activityId,
  profile,
  isOpen,
  close,
  viewOnly = false,
}) => {
  const { data, isLoading, isError, refetch } = useGetActivityReport(
    profile,
    activityId,
  );
  const {
    mutate: deleteActivityReport,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteActivityReportProvisional();

  const isExecutive = profile === "executive";
  const [rejectionDetail, setRejectionDetail] = useState("");

  const handleDelete = () => {
    deleteActivityReport(
      { requestParam: { activityId } },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  const handleEdit = () => {
    overlay.open(
      ({ isOpen: isOpenEditActivityModal, close: closeEditActivityModal }) => (
        <EditActivityReportModal
          profile={profile}
          activityId={activityId}
          isOpen={isOpenEditActivityModal}
          close={() => {
            closeEditActivityModal();
            refetch();
          }}
        />
      ),
    );
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      overlay.open(
        ({
          isOpen: isOpenDeleteSuccessModal,
          close: closeDeleteSuccessModal,
        }) => (
          <Modal isOpen={isOpenDeleteSuccessModal}>
            <ConfirmModalContent onConfirm={closeDeleteSuccessModal}>
              활동 보고서가 삭제되었습니다.
            </ConfirmModalContent>
          </Modal>
        ),
      );
      return;
    }
    if (isDeleteError) {
      overlay.open(
        ({ isOpen: isOpenDeleteErrorModal, close: closeDeleteErrorModal }) => (
          <Modal isOpen={isOpenDeleteErrorModal}>
            <ConfirmModalContent onConfirm={closeDeleteErrorModal}>
              활동 보고서 삭제에 실패했습니다.
            </ConfirmModalContent>
          </Modal>
        ),
      );
    }
  }, [isDeleteSuccess, isDeleteError]);

  const handleApprove = async () => {
    await patchActivityExecutive({ activityId });
    close();
  };

  const handleReject = async () => {
    await patchActivityExecutiveSendBack(
      { activityId },
      { comment: rejectionDetail },
    );
    setRejectionDetail("");
    refetch();
    close();
  };

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} width="full">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper gap={20} direction="column">
          {!isExecutive &&
            data.activityStatusEnumId === ActivityStatusEnum.Rejected &&
            data.comments.length > 0 && (
              <RejectReasonToast
                title="반려 사유"
                reasons={data.comments.map(comment => ({
                  datetime: comment.createdAt,
                  reason: comment.content,
                }))}
              />
            )}

          <FlexWrapper gap={16} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              활동 정보
            </Typography>
            <FlexWrapper gap={12} direction="column">
              <ListItem>활동명: {data.name}</ListItem>
              <ListItem>
                활동 분류: {getActivityTypeTagLabel(data.activityTypeEnumId)}
              </ListItem>
              <ListItem>활동 기간: </ListItem>
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
              <ListItem>활동 장소: {data.location}</ListItem>
              <ListItem>활동 목적: {data.purpose}</ListItem>
              <ListItem>활동 내용: {data.detail}</ListItem>
            </FlexWrapper>
          </FlexWrapper>
          <FlexWrapper gap={16} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              활동 인원({data.participants.length ?? 0}명)
            </Typography>

            {data.participants.map(participant => (
              <ListItem key={participant.studentId}>
                {participant.studentNumber} {participant.name}
              </ListItem>
            ))}
          </FlexWrapper>
          <FlexWrapper gap={16} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              활동 증빙
            </Typography>
            <FlexWrapper gap={12} direction="column">
              <ListItem>
                첨부 파일 ({data.evidenceFiles.length ?? 0}개)
              </ListItem>
              {data.evidenceFiles.length > 0 && (
                <FlexWrapper
                  direction="column"
                  gap={0}
                  style={{ paddingLeft: 16 }}
                >
                  <ThumbnailPreviewList
                    fileList={data.evidenceFiles.map(_file => ({
                      id: _file.fileId,
                      name: _file.name,
                      url: _file.url,
                    }))}
                    disabled
                  />
                </FlexWrapper>
              )}
              <ListItem>부가 설명: {data.evidence}</ListItem>
            </FlexWrapper>
          </FlexWrapper>
          {isExecutive && (
            <>
              {data.comments.length > 0 && (
                <FlexWrapper direction="column" gap={8}>
                  {data.comments.map((comment, index) => (
                    <FlexWrapper
                      direction="column"
                      gap={4}
                      key={`${index.toString()}`}
                    >
                      <Typography fs={14} lh={16} color="GRAY.600">
                        {formatSlashDateTime(comment.createdAt)}
                      </Typography>
                      <Typography fs={16} lh={24}>
                        {comment.content}
                      </Typography>
                    </FlexWrapper>
                  ))}
                </FlexWrapper>
              )}
              <FlexWrapper gap={16} direction="column">
                <Typography fw="MEDIUM" fs={16} lh={20}>
                  반려 사유 (반려 시에만 입력)
                </Typography>
                <TextInput
                  value={rejectionDetail}
                  handleChange={setRejectionDetail}
                  placeholder="내용"
                  area
                />
              </FlexWrapper>
            </>
          )}
          {!isExecutive && viewOnly ? (
            <FlexWrapper direction="row" gap={12}>
              <Button type="outlined" onClick={close}>
                닫기
              </Button>
            </FlexWrapper>
          ) : (
            <FlexWrapper
              direction="row"
              gap={12}
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Button type="outlined" onClick={close}>
                취소
              </Button>
              <FlexWrapper direction="row" gap={12}>
                <Button onClick={isExecutive ? handleApprove : handleDelete}>
                  {isExecutive ? "신청 승인" : "삭제"}
                </Button>
                {/* TODO: 반려 연결 */}
                <Button
                  onClick={isExecutive ? handleReject : handleEdit}
                  type={
                    isExecutive && rejectionDetail === ""
                      ? "disabled"
                      : "default"
                  }
                >
                  {isExecutive ? "신청 반려" : "수정"}
                </Button>
              </FlexWrapper>
            </FlexWrapper>
          )}
        </FlexWrapper>
      </AsyncBoundary>
    </Modal>
  );
};

export default PastActivityReportModal;
