import React from "react";

import { Divider } from "@mui/material";
import { ApiAct024ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct024";
import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { TotalContentsContainer } from "@sparcs-clubs/web/features/executive/register-member/components/StatusInfoFrame";

interface ActivityReportClubStatisticProps {
  data: ApiAct024ResponseOk;
}

const ActivityReportClubStatistic: React.FC<
  ActivityReportClubStatisticProps
> = ({ data }) => {
  const pendingTotalCount = data.items.reduce(
    (acc, item) =>
      acc + (item.activityStatusEnum === ActivityStatusEnum.Applied ? 1 : 0),
    0,
  );
  const approvedTotalCount = data.items.reduce(
    (acc, item) =>
      acc + (item.activityStatusEnum === ActivityStatusEnum.Approved ? 1 : 0),
    0,
  );
  const rejectedTotalCount = data.items.reduce(
    (acc, item) =>
      acc + (item.activityStatusEnum === ActivityStatusEnum.Rejected ? 1 : 0),
    0,
  );
  const reviewdTotalCount = approvedTotalCount + rejectedTotalCount;
  const totalCount =
    pendingTotalCount + approvedTotalCount + rejectedTotalCount;

  return (
    <Card gap={16} padding="16px" outline>
      <Toggle label={<Typography>활동 보고서 통계</Typography>}>
        <FlexWrapper direction="column" gap={8} style={{ width: "100%" }}>
          <FlexWrapper direction="row" gap={40}>
            <FlexWrapper direction="row" gap={20}>
              <Typography fw="MEDIUM" fs={16} lh={20}>
                담당자
              </Typography>
              <Typography>{data.chargedExecutive?.name || "-"}</Typography>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Typography fw="MEDIUM" fs={16} lh={20}>
                검토율
              </Typography>
              <Typography>
                {reviewdTotalCount}개 / {totalCount}개 (
                {((reviewdTotalCount / totalCount) * 100).toFixed(1)}%)
              </Typography>
            </FlexWrapper>
            <FlexWrapper direction="row" gap={20}>
              <Typography fw="MEDIUM" fs={16} lh={20}>
                승인율
              </Typography>
              <Typography>
                {approvedTotalCount}개 / {totalCount}개 (
                {((approvedTotalCount / totalCount) * 100).toFixed(1)}%)
              </Typography>
            </FlexWrapper>
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

export default ActivityReportClubStatistic;
