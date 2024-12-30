import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatSlashDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";

import useRegisterClubDetail from "../services/getRegisterClubDetail";

const ClubRegisterApproveFrame = ({ applyId }: { applyId: number }) => {
  const { data, isLoading, isError } = useRegisterClubDetail({
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
      </Card>
    </AsyncBoundary>
  );
};

export default ClubRegisterApproveFrame;
