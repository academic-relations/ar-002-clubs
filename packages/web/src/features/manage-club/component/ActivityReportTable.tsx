import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  ActTypeTagList,
  ApplyTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type Activity } from "../service/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

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
      const { color: actColor, text: actText } = getTagDetail(
        activity.status,
        ApplyTagList,
      );
      const { color: typeColor, text: typeText } = getTagDetail(
        activity.type,
        ActTypeTagList,
      );
      return (
        <TableRow key={activity.name + String(index)} isBorder>
          <TableCell type="Tag" width="10%" minWidth={116}>
            <Tag color={actColor}>{actText}</Tag>
          </TableCell>
          <TableCell type="Default" width="30%">
            {activity.name}
          </TableCell>
          <TableCell type="Tag" width="25%" minWidth={248}>
            <Tag color={typeColor}>{typeText}</Tag>
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
