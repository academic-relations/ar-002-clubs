import React from "react";

import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { manageStorageProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

import { getValueStorage } from "@sparcs-clubs/web/types/storage.types";

import { usePatchStorageApplication } from "../services/usePatchStorageApplication";

interface ManageStorageProgressProps {
  applicationId: number;
  status: StorageStatusEnum;
}

export const ManageStorageProgress: React.FC<ManageStorageProgressProps> = ({
  applicationId,
  status,
}) => {
  const manageStorage = manageStorageProgress(status);
  const onClickCancel = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePatchStorageApplication(
      { applicationId },
      { status: getValueStorage(status) },
    );
  };
  return (
    <ProgressStatus
      labels={manageStorage.labels}
      progress={manageStorage.progress}
      infoText={manageStorage.infoText}
      optional={
        status === StorageStatusEnum.Applied && (
          <Button onClick={onClickCancel} style={{ width: "max-content" }}>
            신청 취소
          </Button>
        )
      }
    />
  );
};
