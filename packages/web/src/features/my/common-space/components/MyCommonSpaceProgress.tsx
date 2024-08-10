import React from "react";

import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";

import Button from "@sparcs-clubs/web/common/components/Button";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import { manageCommonSpaceProgress } from "@sparcs-clubs/web/constants/manageClubProgress";

interface MyCommonSpaceProgressProps {
  status: CommonSpaceUsageOrderStatusEnum;
}

const MyCommonSpaceProgress: React.FC<MyCommonSpaceProgressProps> = ({
  status,
}) => {
  const myCommonSpace = manageCommonSpaceProgress(status);

  // TODO: Implement onClickCancel
  const onClickCancel = () => {};
  return (
    <ProgressStatus
      labels={myCommonSpace.labels}
      progress={myCommonSpace.progress}
      infoText={myCommonSpace.infoText}
      optional={
        status === CommonSpaceUsageOrderStatusEnum.Applied && (
          <Button onClick={onClickCancel} style={{ width: "max-content" }}>
            신청 취소
          </Button>
        )
      }
    />
  );
};

export default MyCommonSpaceProgress;
