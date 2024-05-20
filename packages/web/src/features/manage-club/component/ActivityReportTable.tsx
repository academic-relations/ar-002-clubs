import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import {
  ActivityStatusEnum,
  type Activity,
} from "../service/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

interface StatusDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): StatusDetail => {
  switch (status) {
    case ActivityStatusEnum.Writing:
      return { text: "작성 중", color: "BLUE" };
    case ActivityStatusEnum.Applied:
      return { text: "신청 완료", color: "PURPLE" };
    case ActivityStatusEnum.Approved:
      return { text: "승인 완료", color: "GREEN" };
    case ActivityStatusEnum.Rejected:
      return { text: "신청 반려", color: "RED" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

const formatDate = (date: Date) => {
  format(date, "yyyy년 M월 d일 (iii)", { locale: ko });
};

const ActivityReportTable: React.FC<ActivityTableProps> = ({
  activityList,
}) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="15%">
        상태
      </TableCell>
      <TableCell type="Header" width="30%">
        활동명
      </TableCell>
      <TableCell type="Header" width="25%">
        활동 분류
      </TableCell>
      <TableCell type="Header" width="30%">
        활동 기간
      </TableCell>
    </TableRow>
    {activityList.map(activity => (
      <TableRow isBoarder>
        <TableCell type="Tag" width="15%">
          <Tag color={getStatusDetails(activity.status).color}>
            {getStatusDetails(activity.status).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="30%">
          {activity.name}
        </TableCell>
        <TableCell type="Default" width="25%">
          {activity.type}
        </TableCell>
        <TableCell type="Default" width="30%">
          {formatDate(activity.startDate)} ~ {formatDate(activity.endDate)}
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default ActivityReportTable;
