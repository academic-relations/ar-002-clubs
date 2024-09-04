import React, { BaseSyntheticEvent, useCallback, useEffect } from "react";

import { ApiAct008RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";

import { useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";

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
        /* TODO: (@dora) connect actual participant info */
        participants: [
          {
            studentId: 20200510,
          },
        ],
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
          /* TODO: (@dora) connect actual participants */
          body: { ..._data, participants: [{ studentId: 20200510 }] },
        },
        { onSuccess: close },
      );
    },
    [activityId, close, mutate],
  );

  const handleCancel = () => {
    close();
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  return (
    <Modal isOpen={isOpen}>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <ActivityReportForm
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          formCtx={formCtx as any}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </AsyncBoundary>
    </Modal>
  );
};

export default EditActivityReportModal;
