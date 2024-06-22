import React from "react";

import { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import type { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface AcfTableProps {
  certificateList: ApiAcf003ResponseOk;
}

const TagList: {
  [key in ActivityCertificateOrderStatusEnum]: StatusDetail;
} = {
  [ActivityCertificateOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [ActivityCertificateOrderStatusEnum.Approved]: {
    text: "승인",
    color: "YELLOW",
  },
  [ActivityCertificateOrderStatusEnum.Issued]: { text: "발급", color: "GREEN" },
  [ActivityCertificateOrderStatusEnum.Rejected]: { text: "반려", color: "RED" },
  [ActivityCertificateOrderStatusEnum.Received]: {
    text: "수령",
    color: "GREEN",
  }, // TODO: 수령 있어야 하는거 맞는지 확인
};

const ActivityCertificateTable: React.FC<AcfTableProps> = ({
  certificateList,
}) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={90}>
        상태
      </TableCell>
      <TableCell type="Header" width="50%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={180}>
        신청자
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={180}>
        발급 매수
      </TableCell>
    </TableRow>
    {certificateList.items.map((certificate, index) => {
      const { color, text } = getTagDetail(certificate.statusEnum, TagList);
      return (
        <TableRow isBorder key={certificate.studentName + String(index)}>
          <TableCell type="Tag" width="10%" minWidth={90}>
            <Tag color={color}>{text}</Tag>
          </TableCell>
          <TableCell type="Default" width="50%">
            {formatDateTime(new Date(certificate.createdAt))}
          </TableCell>
          <TableCell type="Default" width="20%" minWidth={180}>
            {certificate.studentName}
          </TableCell>
          <TableCell type="Default" width="20%" minWidth={180}>
            {certificate.issuedNumber}매
          </TableCell>
        </TableRow>
      );
    })}
  </TableWrapper>
);

export default ActivityCertificateTable;
