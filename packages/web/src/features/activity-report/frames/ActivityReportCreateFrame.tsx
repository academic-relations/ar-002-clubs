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
      <ActivityReportForm clubId={clubId} onSubmit={handleSubmit} />
    </FlexWrapper>
  );
};

export default ActivityReportCreateFrame;
