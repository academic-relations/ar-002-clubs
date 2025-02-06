import { Divider } from "@mui/material";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { TotalContentsContainer } from "@sparcs-clubs/web/features/executive/register-member/components/StatusInfoFrame";

interface FundingStatisticContentProps {
  totalCount: number;
  appliedCount: number;
  approvedCount: number;
  rejectedCount: number;
  committeeCount: number;
  partialCount: number;
}

const FundingStatisticContent = ({
  totalCount,
  appliedCount,
  approvedCount,
  rejectedCount,
  committeeCount,
  partialCount,
}: FundingStatisticContentProps) => {
  const reviewedCount =
    approvedCount + rejectedCount + committeeCount + partialCount;

  return (
    <Card gap={16} padding="16px" outline>
      <Toggle label={<Typography>지원금 통계</Typography>}>
        <FlexWrapper direction="column" gap={8} style={{ width: "100%" }}>
          <FlexWrapper direction="row" gap={20}>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              검토율
            </Typography>
            <Typography>
              {reviewedCount}개 / {totalCount}개 (
              {totalCount === 0
                ? "-"
                : ((reviewedCount / totalCount) * 100).toFixed(1)}
              %)
            </Typography>
          </FlexWrapper>
          <Divider />
          <FlexWrapper direction="row" gap={40}>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="GRAY">대기</Tag>
              <TotalContentsContainer>{appliedCount}개</TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="GREEN">승인</Tag>
              <TotalContentsContainer>{approvedCount}개</TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="RED">반려</Tag>
              <TotalContentsContainer>{rejectedCount}개</TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="YELLOW">운위</Tag>
              <TotalContentsContainer>
                {committeeCount}개
              </TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="PURPLE">부분 승인</Tag>
              <TotalContentsContainer>{partialCount}개</TotalContentsContainer>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </Toggle>
    </Card>
  );
};

export default FundingStatisticContent;
