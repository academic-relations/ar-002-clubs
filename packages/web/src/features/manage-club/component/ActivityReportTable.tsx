import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import type { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
  type Activity,
} from "../service/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

const ActivityTagList: {
  [key in ActivityStatusEnum]: StatusDetail;
} = {
  [ActivityStatusEnum.Writing]: { text: "작성 중", color: "BLUE" },
  [ActivityStatusEnum.Applied]: { text: "신청 완료", color: "PURPLE" },
  [ActivityStatusEnum.Approved]: { text: "승인 완료", color: "GREEN" },
  [ActivityStatusEnum.Rejected]: { text: "신청 반려", color: "RED" },
};

const TypeTagList: {
  [key in ActivityTypeEnum]: StatusDetail;
} = {
  [ActivityTypeEnum.FitInside]: {
    text: "동아리 성격에 합치하는 내부 활동",
    color: "YELLOW",
  },
  [ActivityTypeEnum.FitOutside]: {
    text: "동아리 성격에 합치하는 외부 활동",
    color: "BLUE",
  },
  [ActivityTypeEnum.NotFit]: {
    text: "동아리 성격에 합치하지 않는 활동",
    color: "PURPLE",
  },
};

const formatDate = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii)", { locale: ko });

const ActivityReportTable: React.FC<ActivityTableProps> = ({
  activityList,
}) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={116}>
        상태
      </TableCell>
      <TableCell type="Header" width="30%">
        활동명
      </TableCell>
      <TableCell type="Header" width="25%" minWidth={248}>
        활동 분류
      </TableCell>
      <TableCell type="Header" width="35%">
        활동 기간
      </TableCell>
    </TableRow>
    {activityList.map((activity, index) => {
      const { color: actcolor, text: acttext } = getTagDetail(
        activity.status,
        ActivityTagList,
      );
      const { color: typecolor, text: typetext } = getTagDetail(
        activity.type,
        TypeTagList,
      );
      return (
        <TableRow key={activity.name + String(index)} isBorder>
          <TableCell type="Tag" width="10%" minWidth={116}>
            <Tag color={actcolor}>{acttext}</Tag>
          </TableCell>
          <TableCell type="Default" width="30%">
            {activity.name}
          </TableCell>
          <TableCell type="Tag" width="25%" minWidth={248}>
            <Tag color={typecolor}>{typetext}</Tag>
          </TableCell>
          <TableCell type="Default" width="35%">
            {formatDate(activity.startDate)} ~ {formatDate(activity.endDate)}
          </TableCell>
        </TableRow>
      );
    })}
  </TableWrapper>
);

export default ActivityReportTable;
