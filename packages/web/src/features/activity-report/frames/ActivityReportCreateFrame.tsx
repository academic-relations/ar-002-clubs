import React from "react";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import ActivityReportForm from "../components/ActivityReportForm";
import { useCreateActivityReport } from "../hooks/useCreateActivityReport";
import { ActivityReportFormData } from "../types/form";

interface ActivityReportCreateFrameProps {
  clubId: number;
}

const ActivityReportCreateFrame: React.FC<ActivityReportCreateFrameProps> = ({
  clubId,
}) => {
  const router = useRouter();
  const { mutate: createActivityReport } = useCreateActivityReport(clubId);

  const handleSubmit = (data: ActivityReportFormData) => {
    createActivityReport(data, {
      onSuccess: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent
              onConfirm={() => {
                localStorage.removeItem("durations");
                localStorage.removeItem("participants");
                localStorage.removeItem("evidenceFiles");
                localStorage.removeItem("name");
                localStorage.removeItem("activityTypeEnumId");
                localStorage.removeItem("location");
                localStorage.removeItem("purpose");
                localStorage.removeItem("detail");
                localStorage.removeItem("evidence");

                close();
                router.push("/manage-club/activity-report");
              }}
            >
              활동 보고서 작성이 완료되었습니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
      onError: error => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              활동 보고서 작성에 실패했습니다.
              <Typography color="GRAY.300" fs={12} lh={16} fw="REGULAR">
                {error.message}
              </Typography>
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
  };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 작성"
        enableLast
      />
      <ActivityReportForm
        clubId={clubId}
        onSubmit={handleSubmit}
        temporaryStorageName={
          JSON.parse(localStorage.getItem("name") || '""') || undefined
        }
        temporaryStorageActivityTypeEnumId={
          JSON.parse(localStorage.getItem("activityTypeEnumId") || '""') ||
          undefined
        }
        temporaryStorageDurations={
          JSON.parse(localStorage.getItem("durations") || '""') || undefined
        }
        temporaryStorageLocation={
          JSON.parse(localStorage.getItem("location") || '""') || undefined
        }
        temporaryStoragePurpose={
          JSON.parse(localStorage.getItem("purpose") || '""') || undefined
        }
        temporaryStorageDetail={
          JSON.parse(localStorage.getItem("detail") || '""') || undefined
        }
        temporaryStorageEvidence={
          JSON.parse(localStorage.getItem("evidence") || '""') || undefined
        }
        temporaryStorageEvidenceFiles={
          JSON.parse(localStorage.getItem("evidenceFiles") || '""') || undefined
        }
        temporaryStorageParticipants={
          JSON.parse(localStorage.getItem("participants") || '""') || undefined
        }
      />
    </FlexWrapper>
  );
};

export default ActivityReportCreateFrame;
