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
  ActivityTypeEnum,
  type Activity,
} from "../service/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

interface TagDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): TagDetail => {
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

const getTypeTags = (type: number): TagDetail => {
  switch (type) {
    case ActivityTypeEnum.FitInside:
      return { text: "동아리 성격에 합치하는 내부 활동", color: "YELLOW" };
    case ActivityTypeEnum.FitOutside:
      return { text: "동아리 성격에 합치하는 외부 활동", color: "BLUE" };
    case ActivityTypeEnum.NotFit:
      return { text: "동아리 성격에 합치하지 않는 활동", color: "PURPLE" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

const formatDate = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii)", { locale: ko });

const ActivityReportTable: React.FC<ActivityTableProps> = ({
  activityList,
}) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={120}>
        상태
      </TableCell>
      <TableCell type="Header" width="30%">
        활동명
      </TableCell>
      <TableCell type="Header" width="25%" minWidth={250}>
        활동 분류
      </TableCell>
      <TableCell type="Header" width="35%">
        활동 기간
      </TableCell>
    </TableRow>
    {activityList.map((activity, index) => (
      <TableRow key={activity.name + String(index)} isBorder>
        <TableCell type="Tag" width="10%" minWidth={120}>
          <Tag color={getStatusDetails(activity.status).color}>
            {getStatusDetails(activity.status).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="30%">
          {activity.name}
        </TableCell>
        <TableCell type="Tag" width="25%" minWidth={250}>
          <Tag color={getTypeTags(activity.type).color}>
            {getTypeTags(activity.type).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="35%">
          {formatDate(activity.startDate)} ~ {formatDate(activity.endDate)}
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default ActivityReportTable;
