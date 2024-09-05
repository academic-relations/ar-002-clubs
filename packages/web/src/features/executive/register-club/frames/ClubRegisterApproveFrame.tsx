import { useState } from "react";

import { RegistrationStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

import useRegisterClubDetail from "../services/getRegisterClubDetail";
import { patchClubRegistrationExecutive } from "../services/patchClubRegistrationExecutive";
import { postClubRegistrationSendBack } from "../services/postClubRegistrationSendBack";

const ClubRegisterApproveFrame = ({ applyId }: { applyId: number }) => {
  const [rejectionDetail, setRejectionDetail] = useState("");

  const { data, isLoading, isError, refetch } = useRegisterClubDetail({
    applyId,
  });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Card gap={20} outline>
        {data && data.comments.length > 0 && (
          <FlexWrapper direction="column" gap={8}>
            {data.comments.map((comment, index) => (
              <FlexWrapper
                direction="column"
                gap={4}
                key={`${index.toString()}`}
              >
                <Typography fs={14} lh={16} color="GRAY.600">
                  {formatSlashDateTime(comment.createdAt)}
                </Typography>
                <Typography fs={16} lh={24}>
                  {comment.content}
                </Typography>
              </FlexWrapper>
            ))}
          </FlexWrapper>
        )}
        <FlexWrapper gap={4} direction="column">
          <Typography
            fs={16}
            lh={20}
            fw="MEDIUM"
            style={{ marginLeft: 2, marginRight: 2 }}
          >
            반려 사유 (반려 시에만 입력)
          </Typography>
          <TextInput
            value={rejectionDetail}
            handleChange={setRejectionDetail}
            placeholder="내용"
            area
          />
        </FlexWrapper>
        <FlexWrapper gap={16} direction="row" style={{ marginLeft: "auto" }}>
          <Button
            type={
              data?.registrationStatusEnumId !== RegistrationStatusEnum.Approved
                ? "default"
                : "disabled"
            }
            onClick={() => {
              patchClubRegistrationExecutive({ applyId });
              refetch();
            }}
          >
            신청 승인
          </Button>
          <Button
            type={
              rejectionDetail &&
              data?.registrationStatusEnumId !== RegistrationStatusEnum.Approved
                ? "default"
                : "disabled"
            }
            onClick={async () => {
              await postClubRegistrationSendBack(
                { applyId },
                { comment: rejectionDetail },
              );
              refetch();
              setRejectionDetail("");
            }}
          >
            신청 반려
          </Button>
        </FlexWrapper>
      </Card>
    </AsyncBoundary>
  );
};

export default ClubRegisterApproveFrame;
