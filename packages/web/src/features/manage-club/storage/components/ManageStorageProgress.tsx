import React from "react";

import { StorageStatusEnum } from "@sparcs-clubs/interface/common/enum/storage.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { manageStorageProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

interface ManageStorageProgressProps {
  status: StorageStatusEnum;
}

const ManageStorageProgress: React.FC<ManageStorageProgressProps> = ({
  status,
}) => {
  const manageStorage = manageStorageProgress(status);
  const onClickCancel = () => {};
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

export default ManageStorageProgress;
