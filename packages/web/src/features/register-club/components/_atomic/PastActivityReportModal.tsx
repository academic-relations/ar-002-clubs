import React, { useEffect } from "react";

import { overlay } from "overlay-kit";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { ListItem } from "@sparcs-clubs/web/common/components/ListItem";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useDeleteActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useDeleteActivityReport";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";
import { getActivityTypeTagLabel } from "@sparcs-clubs/web/features/register-club/utils/activityType";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

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
  const { data, isLoading, isError } = useGetActivityReport(
    profile,
    activityId,
  );
  const {
    mutate: deleteActivityReport,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteActivityReport();

  const handleDelete = () => {
    deleteActivityReport({ requestParam: { activityId } });
    close();
  };

  const handleEdit = () => {
    overlay.open(
      ({ isOpen: isOpenEditActivityModal, close: closeEditActivityModal }) => (
        <EditActivityReportModal
          profile={profile}
          activityId={activityId}
          isOpen={isOpenEditActivityModal}
          close={closeEditActivityModal}
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

  return (
    <Modal isOpen={isOpen} width="full">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper gap={20} direction="column">
          <FlexWrapper gap={16} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              활동 정보
            </Typography>
            <FlexWrapper gap={12} direction="column">
              <ListItem>활동명: {data?.name}</ListItem>
              <ListItem>
                활동 분류:{" "}
                {data ? getActivityTypeTagLabel(data.activityTypeEnumId) : "-"}
              </ListItem>
              <ListItem>활동 기간: </ListItem>
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
              <ListItem>활동 장소: {data?.location}</ListItem>
              <ListItem>활동 목적: {data?.purpose}</ListItem>
              <ListItem>활동 내용: {data?.detail}</ListItem>
            </FlexWrapper>
          </FlexWrapper>
          <FlexWrapper gap={16} direction="column">
            <Typography fw="MEDIUM" fs={16} lh={20}>
              활동 인원({data?.participants.length ?? 0}명)
            </Typography>

            {data?.participants.map((participant, index) => (
              <ListItem key={index}>
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
                첨부 파일 ({data?.evidenceFiles.length ?? 0}개)
              </ListItem>
              {data && data.evidenceFiles.length > 0 && (
                <FlexWrapper
                  direction="column"
                  gap={0}
                  style={{ paddingLeft: 16 }}
                >
                  <ThumbnailPreviewList
                    fileList={
                      data.evidenceFiles.map(file => ({
                        id: file.fileId,
                        name: file.name,
                        src: file.url,
                      })) ?? []
                    }
                    disabled
                  />
                </FlexWrapper>
              )}
              <ListItem>부가 설명: {data?.evidence}</ListItem>
            </FlexWrapper>
          </FlexWrapper>
          {viewOnly ? (
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
                <Button onClick={handleDelete}>삭제</Button>
                <Button onClick={handleEdit}>수정</Button>
              </FlexWrapper>
            </FlexWrapper>
          )}
        </FlexWrapper>
      </AsyncBoundary>
    </Modal>
  );
};

export default PastActivityReportModal;
