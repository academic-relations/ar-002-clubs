"use client";

import React from "react";

import styled from "styled-components";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  numberToKrWon,
  tableHeaderText,
  tableRowCountText,
} from "@sparcs-clubs/web/constants/manageClubFunding";

import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

const TableWithCount = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0; */
`;

const CountRow = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  width: 100%;

  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY[600]};

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
`;

const Table = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  /* gray300 */
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 8px;

  // 질문: 테두리를 둥글게 만드려고 overflow: hidden을 걸었는데 tableCell의 스타일을 조정하는게 더 좋을까요?
  overflow: hidden;

  /* Inside auto layout */
  /* flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0; */
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};

  /* Inside auto layout */
  /* flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0; */
`;

// * 인터페이스가 구현되면 바로 없애버려야할 목업이기에 따로 폴더를 구성하지 않고 타입 명시와 선언 모두 여기에 해둡니다!
const mockData: Array<{
  id: number;
  status: string;
  activityName: string;
  contentName: string;
  expenditureAmount: number;
  approvedAmount?: number;
}> = [
  {
    id: 1,
    status: "작성중",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 2,
    status: "작성중",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 3,
    status: "신청 완료",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 4,
    status: "신청 반려",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 5,
    status: "승인 완료",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
    approvedAmount: 300000,
  },
  {
    id: 6,
    status: "승인 완료",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
    approvedAmount: 0,
  },
];

const mockStatusToTagColor = (status: string): TagColor => {
  switch (status) {
    case "작성중":
      return "BLUE";
    case "신청 완료":
      return "PURPLE";
    case "신청 반려":
      return "RED";
    case "승인 완료":
      return "GREEN";
    default:
      return "RED";
  }
};

const NewFundingListTable: React.FC = () => (
  <TableWithCount>
    <CountRow>{tableRowCountText(mockData.length)}</CountRow>
    <Table>
      <HeaderRow>
        <TableCell type="Header" width="10%">
          {tableHeaderText.status}
        </TableCell>
        <TableCell type="Header" width="45%">
          {tableHeaderText.activityName}
        </TableCell>
        <TableCell type="Header" width="15%">
          {tableHeaderText.contentName}
        </TableCell>
        <TableCell type="Header" width="15%">
          {tableHeaderText.expenditureAmount}
        </TableCell>
        <TableCell type="Header" width="15%">
          {tableHeaderText.approvedAmount}
        </TableCell>
      </HeaderRow>
      {mockData.map(data => (
        <ContentRow key={data.id}>
          <TableCell type="Tag" width="10%">
            <Tag color={mockStatusToTagColor(data.status)}>{data.status}</Tag>
          </TableCell>
          <TableCell type="Default" width="45%">
            {data.activityName}
          </TableCell>
          <TableCell type="Default" width="15%">
            {data.contentName}
          </TableCell>
          <TableCell type="Default" width="15%">
            {numberToKrWon(data.expenditureAmount)}
          </TableCell>
          <TableCell type="Default" width="15%">
            {data.approvedAmount === undefined
              ? "-"
              : numberToKrWon(data.approvedAmount ?? 0)}
          </TableCell>
        </ContentRow>
      ))}
      <ContentRow>
        <TableCell type="Default" width="70%">
          {"\t"}
        </TableCell>
        <TableCell type="Default" width="15%">
          {numberToKrWon(
            mockData.reduce((acc, data) => acc + data.expenditureAmount, 0),
          )}
        </TableCell>
        <TableCell type="Default" width="15%">
          {numberToKrWon(
            mockData.reduce((acc, data) => acc + (data.approvedAmount ?? 0), 0),
          )}
        </TableCell>
      </ContentRow>
    </Table>
  </TableWithCount>
);

export default NewFundingListTable;
