import React from "react";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { manageRentalProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

interface ManageRentalProgressProps {
  status: RentalOrderStatusEnum;
  onClickCancel: () => void;
}

const ManageRentalProgress: React.FC<ManageRentalProgressProps> = ({
  status,
  onClickCancel,
}) => {
  const manageRental = manageRentalProgress(status);
  return (
    <ProgressStatus
      labels={manageRental.labels}
      progress={manageRental.progress}
      infoText={manageRental.infoText}
      optional={
        status === RentalOrderStatusEnum.Applied && (
          <Button onClick={onClickCancel} style={{ width: "max-content" }}>
            신청 취소
          </Button>
        )
      }
    />
  );
};

export default ManageRentalProgress;
