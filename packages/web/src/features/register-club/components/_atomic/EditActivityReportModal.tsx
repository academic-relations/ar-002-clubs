import React, { useCallback, useEffect } from "react";

import { ApiAct008RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";
import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import { useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import { useGetActivityReport } from "@sparcs-clubs/web/features/activity-report/services/useGetActivityReport";
import { filterActivityComments } from "@sparcs-clubs/web/features/activity-report/utils/filterComment";
import usePutActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePutActivityReportForNewClub";

import ActivityReportForm from "./ActivityReportForm";

interface EditActivityReportModalProps {
  activityId: number;
  profile: string;
  isOpen: boolean;
  close: () => void;
}

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const EditActivityReportModal: React.FC<EditActivityReportModalProps> = ({
  activityId,
  profile,
  isOpen,
  close,
}) => {
  const formCtx = useForm<ApiAct008RequestBody>({ mode: "all" });

  const { data, isLoading, isError } = useGetActivityReport(
    profile,
    activityId,
  );

  useEffect(() => {
    if (data) {
      /* NOTE: (@dora) request body of put should not include clubId */
      formCtx.reset({
        name: data.name,
        activityTypeEnumId: data.activityTypeEnumId,
        durations: data.durations,
        location: data.location,
        purpose: data.purpose,
        detail: data.detail,
        evidence: data.evidence,
        evidenceFiles: data.evidenceFiles,
        participants: data.participants,
      });
      /* TODO: (@dora) refactor to use lodash */
      // formCtx.reset(_.omit(activityReportData, "clubId"));
    }
  }, [data, formCtx]);

  const { mutate } = usePutActivityReportForNewClub();

  const submitHandler = useCallback(
    (_data: ApiAct008RequestBody, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          params: { activityId },
          body: {
            ..._data,
            durations: _data.durations.map(({ startTerm, endTerm }) => ({
              startTerm,
              endTerm,
            })),
            participants: _data.participants.map(({ studentId }) => ({
              studentId,
            })),
          },
        },
        { onSuccess: close },
      );
    },
    [activityId, close, mutate],
  );

  const handleCancel = () => {
    close();
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  if (!data) return null;

  return (
    <Modal isOpen={isOpen} width="full">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <FlexWrapper gap={20} direction="column">
          {data.activityStatusEnumId === ActivityStatusEnum.Rejected &&
            data.comments.length > 0 && (
              <RejectReasonToast
                title="반려 사유"
                reasons={filterActivityComments(data.comments).map(comment => ({
                  datetime: comment.createdAt,
                  reason: comment.content,
                }))}
              />
            )}

          <ActivityReportForm
            /* eslint-disable  @typescript-eslint/no-explicit-any */
            clubId={data.clubId}
            formCtx={formCtx as any}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </FlexWrapper>
      </AsyncBoundary>
    </Modal>
  );
};

export default EditActivityReportModal;
