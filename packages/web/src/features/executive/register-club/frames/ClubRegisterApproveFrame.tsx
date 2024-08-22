import { useState } from "react";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

interface RejectReason {
  date: Date;
  reason: string;
}

const ClubRegistorApproveFrame = ({
  canApprove,
  rejectReasonList,
}: {
  canApprove: boolean;
  rejectReasonList: RejectReason[];
}) => {
  const [rejectionDetail, setRejectionDetail] = useState("");
  const [rejectReasonListState, setRejectReasonListState] =
    useState(rejectReasonList);

  return (
    <Card gap={20} outline>
      <FlexWrapper direction="column" gap={8}>
        {rejectReasonListState.map((rejectReason, index) => (
          <FlexWrapper direction="column" gap={4} key={`${index.toString()}`}>
            <Typography fs={14} lh={16} color="GRAY.600">
              {formatSlashDateTime(rejectReason.date)}
            </Typography>
            <Typography fs={16} lh={24}>
              {rejectReason.reason}
            </Typography>
          </FlexWrapper>
        ))}
      </FlexWrapper>
      <FlexWrapper gap={4} direction="column">
        <Typography
          fs={16}
          lh={20}
          fw="MEDIUM"
          style={{ marginLeft: 2, marginRight: 2 }}
        >
          반려 사유
        </Typography>
        <TextInput
          value={rejectionDetail}
          handleChange={setRejectionDetail}
          placeholder="내용"
          area
        />
      </FlexWrapper>
      <FlexWrapper gap={16} direction="row" style={{ marginLeft: "auto" }}>
        <Button type={canApprove ? "default" : "disabled"}>신청 승인</Button>
        <Button
          type={rejectionDetail && canApprove ? "default" : "disabled"}
          onClick={() => {
            const newRejectReasonList = [...rejectReasonList];
            newRejectReasonList.push({
              date: new Date(Date.now()),
              reason: rejectionDetail,
            });
            setRejectReasonListState(newRejectReasonList);

            setRejectionDetail("");
          }}
        >
          신청 반려
        </Button>
      </FlexWrapper>
    </Card>
  );
};

export default ClubRegistorApproveFrame;
