import React from "react";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { manageRentalProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

interface MyRentalProgressProps {
  status: RentalOrderStatusEnum;
}

const MyRentalProgress: React.FC<MyRentalProgressProps> = ({ status }) => {
  const myRental = manageRentalProgress(status);
  const onClickCancel = () => {};
  return (
    <ProgressStatus
      labels={myRental.labels}
      progress={myRental.progress}
      infoText={myRental.infoText}
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

export default MyRentalProgress;
