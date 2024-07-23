import React from "react";

import { PromotionalPrintingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/promotionalPrinting.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { managePrintingProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

interface ManagePrintingProgressProps {
  status: PromotionalPrintingOrderStatusEnum;
  onClickCancel: () => void;
}

const ManagePrintingProgress: React.FC<ManagePrintingProgressProps> = ({
  status,
  onClickCancel,
}) => {
  const managePrinting = managePrintingProgress(status);
  return (
    <ProgressStatus
      labels={managePrinting.labels}
      progress={managePrinting.progress}
      infoText={managePrinting.infoText}
      optional={
        status === PromotionalPrintingOrderStatusEnum.Applied && (
          <Button onClick={onClickCancel} style={{ width: "max-content" }}>
            신청 취소
          </Button>
        )
      }
    />
  );
};

export default ManagePrintingProgress;
