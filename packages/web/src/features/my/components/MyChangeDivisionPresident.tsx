import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React from "react";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import NotificationCard from "@sparcs-clubs/web/common/components/NotificationCard";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  ChangeDivisionPresidentMessageContext,
  ChangeDivisionPresidentStatusEnum,
} from "@sparcs-clubs/web/constants/changeDivisionPresident";
import ChangeDivisionPresidentModalContent from "@sparcs-clubs/web/features/my/components/ChangeDivisionPresidentModalContent";

export type MyChangeDivisionPresidentStatusEnum =
  | ChangeDivisionPresidentStatusEnum.Requested
  | ChangeDivisionPresidentStatusEnum.Confirmed;

interface MyChangeDivisionPresidentProps {
  status: MyChangeDivisionPresidentStatusEnum;
  isDivisionPresident: boolean;
  actingPresident?: boolean;
  change?: [string, string];
  fetch: () => void;
  onConfirmed: () => void;
  onRejected: () => void;
}

const notificationStatus: Record<
  MyChangeDivisionPresidentStatusEnum,
  "Alert" | "Success"
> = {
  [ChangeDivisionPresidentStatusEnum.Requested]: "Alert",
  [ChangeDivisionPresidentStatusEnum.Confirmed]: "Success",
};

const MyChangeDivisionPresident: React.FC<MyChangeDivisionPresidentProps> = ({
  status = ChangeDivisionPresidentStatusEnum.Requested,
  isDivisionPresident,
  actingPresident = false,
  change = undefined,
  fetch,
  onConfirmed,
  onRejected,
}: MyChangeDivisionPresidentProps) => {
  const router = useRouter();
  const messageContext = new ChangeDivisionPresidentMessageContext({
    actingPresident,
    division: "'생활체육' 분과",
    status,
    page: "/my",
    change,
    isModal: false,
  });

  const buttonString =
    status === ChangeDivisionPresidentStatusEnum.Requested
      ? "클릭하여 더보기"
      : "분과 관리 페이지 바로가기";

  const openConfirmModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ChangeDivisionPresidentModalContent
          needPhoneNumber
          actingPresident
          change={["20210227 박병찬", "20200510 이지윤"]}
          onClose={close}
          fetch={fetch}
          onConfirmed={onConfirmed}
          onRejected={onRejected}
        />
      </Modal>
    ));
  };

  const onClick =
    status === ChangeDivisionPresidentStatusEnum.Requested
      ? openConfirmModal
      : () => {
          router.push("/manage-division");
        };

  return (
    <NotificationCard
      status={notificationStatus[status]}
      header={messageContext.getHeader()}
    >
      <FlexWrapper gap={8} direction="column">
        <Typography fs={16} lh={24} style={{ whiteSpace: "pre-wrap" }}>
          {messageContext.getBody()}
        </Typography>
        {isDivisionPresident && (
          <TextButton
            text={buttonString}
            color="GRAY"
            fw="REGULAR"
            onClick={onClick}
          />
        )}
      </FlexWrapper>
    </NotificationCard>
  );
};

export default MyChangeDivisionPresident;
