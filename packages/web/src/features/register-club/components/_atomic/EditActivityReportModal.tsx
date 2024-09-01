import React, { BaseSyntheticEvent, useCallback, useEffect } from "react";

import { ApiAct008RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";

import _ from "lodash";
import { useForm } from "react-hook-form";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import { useGetActivityReport } from "@sparcs-clubs/web/features/manage-club/activity-report/services/useGetActivityReport";

import usePutActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePutActivityReportForNewClub";

import ActivityReportForm from "./ActivityReportForm";

interface EditActivityReportModalProps {
  activityId: number;
  isOpen: boolean;
  close: () => void;
}

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const EditActivityReportModal: React.FC<EditActivityReportModalProps> = ({
  activityId,
  isOpen,
  close,
}) => {
  const formCtx = useForm<ApiAct008RequestBody>({ mode: "all" });

  const {
    data: activityReportData,
    isLoading,
    isError,
  } = useGetActivityReport(activityId);

  useEffect(() => {
    if (activityReportData) {
      /* NOTE: (@dora) request body of put should not include clubId */
      formCtx.reset(_.omit(activityReportData, "clubId"));
    }
  }, [activityReportData, formCtx]);

  const { mutate } = usePutActivityReportForNewClub();

  const submitHandler = useCallback(
    (data: ApiAct008RequestBody, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          params: { activityId },
          /* TODO: (@dora) connect actual participants */
          body: { ...data, participants: [{ studentId: 20200510 }] },
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
    formCtx.handleSubmit(data => submitHandler(data, e))();
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
