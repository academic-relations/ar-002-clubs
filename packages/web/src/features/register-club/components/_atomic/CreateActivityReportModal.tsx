import { addHours } from "date-fns";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { ApiAct007RequestBody } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";

import Modal from "@sparcs-clubs/web/common/components/Modal";
import usePostActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePostActivityReportForNewClub";

import ActivityReportForm from "./ActivityReportForm";

interface CreateActivityReportModalProps {
  clubId: number;
  isOpen: boolean;
  close: VoidFunction;
  refetch: () => void;
}

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const CreateActivityReportModal: React.FC<CreateActivityReportModalProps> = ({
  clubId,
  isOpen,
  close,
  refetch,
}) => {
  const formCtx = useForm<ApiAct007RequestBody>({ mode: "all" });

  const { mutate } = usePostActivityReportForNewClub();

  const submitHandler = useCallback(
    (_data: ApiAct007RequestBody, e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      mutate(
        {
          body: {
            ..._data,
            clubId,
            durations: _data.durations.map(({ startTerm, endTerm }) => ({
              startTerm: addHours(startTerm, 9),
              endTerm: addHours(endTerm, 9),
            })),
            evidence: _data.evidence ?? "", // NOTE: (@dora) evidence is optional
            participants: _data.participants.map(({ studentId }) => ({
              studentId,
            })),
          },
        },
        {
          onSuccess: () => {
            close();
            refetch();
          },
        },
      );
    },
    [close, mutate],
  );

  const handleCancel = () => {
    close();
  };

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    formCtx.handleSubmit(_data => submitHandler(_data, e))();
  };

  return (
    <Modal isOpen={isOpen} width="full">
      <ActivityReportForm
        // TODO. 리팩토링 해야 함
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        clubId={clubId}
        formCtx={formCtx as any}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default CreateActivityReportModal;
