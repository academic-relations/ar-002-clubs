import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { AcfTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import type { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";

interface AcfTableProps {
  certificateList: ApiAcf003ResponseOk;
}

const MyActivityCertificateTable: React.FC<AcfTableProps> = ({
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
        동아리
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={180}>
        발급 매수
      </TableCell>
    </TableRow>
    {certificateList.items.map((certificate, index) => {
      const { color, text } = getTagDetail(certificate.statusEnum, AcfTagList);
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

export default MyActivityCertificateTable;
