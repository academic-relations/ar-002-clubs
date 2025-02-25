import { addHours } from "date-fns";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import Modal from "@sparcs-clubs/web/common/components/Modal";
import { ActivityReportFormData } from "@sparcs-clubs/web/features/activity-report/types/form";
import usePostActivityReportForNewClub from "@sparcs-clubs/web/features/register-club/services/usePostActivityReportForNewClub";

import ActivityReportForm from "./_atomic/ActivityReportForm";

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
  const formCtx = useForm<ActivityReportFormData>({ mode: "all" });

  const { mutate } = usePostActivityReportForNewClub();

  const submitHandler = useCallback(
    (data: ActivityReportFormData) => {
      mutate(
        {
          body: {
            ...data,
            clubId,
            durations: data.durations.map(({ startTerm, endTerm }) => ({
              startTerm: addHours(startTerm, 9),
              endTerm: addHours(endTerm, 9),
            })),
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

  return (
    <Modal isOpen={isOpen} width="full">
      <ActivityReportForm
        clubId={clubId}
        onCancel={handleCancel}
        onSubmit={() => formCtx.handleSubmit(submitHandler)}
      />
    </Modal>
  );
};

export default CreateActivityReportModal;
