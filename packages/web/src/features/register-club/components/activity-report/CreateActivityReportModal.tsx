import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";

import apiAct011 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";

import Modal from "@sparcs-clubs/web/common/components/Modal";
import { errorHandler } from "@sparcs-clubs/web/common/components/Modal/ErrorModal";
import { ActivityReportFormData } from "@sparcs-clubs/web/features/activity-report/types/form";
import usePostActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePostActivityReportForNewClub";

import ActivityReportForm from "./_atomic/ActivityReportForm";

interface CreateActivityReportModalProps {
  clubId: number;
  isOpen: boolean;
  close: VoidFunction;
}

// TODO. 활동기간 리스트 추가, 파일업로드 추가
const CreateActivityReportModal: React.FC<CreateActivityReportModalProps> = ({
  clubId,
  isOpen,
  close,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = usePostActivityReportForNewClub();

  const submitHandler = useCallback(
    (data: ActivityReportFormData) => {
      console.log(data);
      mutate(
        {
          body: {
            ...data,
            clubId,
            evidence: data.evidence ?? "", // NOTE: (@dora) evidence is optional
            evidenceFiles: data.evidenceFiles.map(({ id }) => ({
              fileId: id,
            })),
            participants: data.participants.map(({ id }) => ({
              studentId: id,
            })),
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [apiAct011.url()] });
            close();
          },
          onError: () => errorHandler("생성에 실패하였습니다"),
        },
      );
    },
    [close, mutate],
  );

  const handleCancel = () => {
    close();
  };

  return (
    <Modal isOpen={isOpen} width="full">
      <ActivityReportForm
        clubId={clubId}
        onCancel={handleCancel}
        onSubmit={submitHandler}
      />
    </Modal>
  );
};

export default CreateActivityReportModal;
