import React from "react";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import NotificationCard from "@sparcs-clubs/web/common/components/NotificationCard";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { manageRentalProgress } from "@sparcs-clubs/web/constants/manageClubProgress";
import colors from "@sparcs-clubs/web/styles/themes/colors";

interface ManageRentalProgressProps {
  status: RentalOrderStatusEnum;
}

const ManageRentalProgress: React.FC<ManageRentalProgressProps> = ({
  status,
}) => {
  const manageRental = manageRentalProgress(status);
  const onClickCancel = () => {};
  return (
    <ProgressStatus
      labels={manageRental.labels}
      progress={manageRental.progress}
      infoText={manageRental.infoText}
      optional={
        <>
          {status === RentalOrderStatusEnum.Applied && (
            <Button onClick={onClickCancel} style={{ width: "max-content" }}>
              신청 취소
            </Button>
          )}
          {status === RentalOrderStatusEnum.Overdue && (
            <NotificationCard status="Alert">
              <Typography fs={16} lh={24}>
                반납일인 2024년 3월 18일(월)로부터{" "}
                <span style={{ fontWeight: 600, color: colors.RED[600] }}>
                  3일
                </span>
                이 연체되었습니다 빠른 반납 부탁
              </Typography>
            </NotificationCard>
          )}
        </>
      }
    />
  );
};

export default ManageRentalProgress;
