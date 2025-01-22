import React from "react";

import { Divider } from "@mui/material";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { TotalContentsContainer } from "@sparcs-clubs/web/features/executive/register-member/components/StatusInfoFrame";

interface ActivityReportStatisticContentProps {
  pendingTotalCount: number;
  approvedTotalCount: number;
  rejectedTotalCount: number;
}

const ActivityReportStatisticContent: React.FC<
  ActivityReportStatisticContentProps
> = ({ pendingTotalCount, approvedTotalCount, rejectedTotalCount }) => {
  const reviewdTotalCount = approvedTotalCount + rejectedTotalCount;
  const totalCount =
    pendingTotalCount + approvedTotalCount + rejectedTotalCount;

  return (
    <Card gap={16} padding="16px" outline>
      <Toggle label={<Typography>활동 보고서 통계</Typography>}>
        <FlexWrapper direction="column" gap={8} style={{ width: "100%" }}>
          <FlexWrapper direction="row" gap={20}>
            <Typography fw="MEDIUM" fs={16} lh={20}>
              검토율
            </Typography>
            <Typography>
              {reviewdTotalCount}개 / {totalCount}개 (
              {((reviewdTotalCount / totalCount) * 100).toFixed(1)}%)
            </Typography>
          </FlexWrapper>
          <Divider />
          <FlexWrapper direction="row" gap={40}>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="GRAY">대기</Tag>
              <TotalContentsContainer>
                {pendingTotalCount}개
              </TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="GREEN">승인</Tag>
              <TotalContentsContainer>
                {approvedTotalCount}개
              </TotalContentsContainer>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Tag color="RED">반려</Tag>
              <TotalContentsContainer>
                {rejectedTotalCount}개
              </TotalContentsContainer>
            </FlexWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </Toggle>
    </Card>
  );
};

export default ActivityReportStatisticContent;
