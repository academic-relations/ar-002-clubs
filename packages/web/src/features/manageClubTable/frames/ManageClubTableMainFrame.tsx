"use client";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import React, { useState } from "react";
import styled from "styled-components";
import NoticePagination from "@sparcs-clubs/web/features/notices/components/NoticePagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { tempHeaders } from "../types/ManageClubTableHeader";
import { mockData } from "../types/mock";
import {
  ManageClubRentalBusinessStatus,
  ManageClubTagColorsInterface,
  ManageClubRentalBusinessData,
} from "../types/ManageClubTable";
import {
  ManageClubTagColors,
  dateAndTimeFormatKeys,
  dateFormatKeys,
  numberFormatKeys,
  startEndTimeFormatKeys,
} from "../types/ManageClubTableConst";

const ManageClubTablePageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
`;

const TableFrameInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px #dddddd solid;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  margin-bottom: 20px;
`;

const TableRowFrameInner = styled.div`
  width: 100%;
  align-items: flex-start;
  display: grid;
`;

const TableCellInner = styled.div`
  width: 100%;
  height: 100%;
`;

const formattedString = (
  key: string,
  value: Date | number | string,
): string => {
  if (value === undefined) {
    return "";
  }

  const days = "일월화수목금토";

  if (dateAndTimeFormatKeys.includes(key)) {
    return `${(value as Date).getFullYear()}년 ${(value as Date).getMonth() + 1}월 ${(value as Date).getDate()}일 (${days[(value as Date).getDay()]}) ${(value as Date).getHours().toString().padStart(2, "0")}:${(value as Date).getMinutes().toString().padStart(2, "0")}`;
  }
  if (dateFormatKeys.includes(key)) {
    return `${(value as Date).getFullYear()}년 ${(value as Date).getMonth() + 1}월 ${(value as Date).getDate()}일 (${days[(value as Date).getDay()]})`;
  }
  if (startEndTimeFormatKeys.includes(key)) {
    return value as string;
  }
  if (numberFormatKeys.includes(key)) {
    return `${value}매`;
  }

  return value as string;
};

const columnSort = (headerName: string) => {
  switch (headerName) {
    case tempHeaders[1].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
    case tempHeaders[2].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) =>
        a.name.localeCompare(b.name) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case tempHeaders[4].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => {
        if (a.rentTime === undefined && b.rentTime === undefined) return 0;
        if (a.rentTime === undefined) return 1;
        if (b.rentTime === undefined) return -1;
        return (
          b.rentTime.getTime() - a.rentTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      };
    case tempHeaders[5].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => {
        if (a.returnTime === undefined && b.returnTime === undefined) return 0;
        if (a.returnTime === undefined) return 1;
        if (b.returnTime === undefined) return -1;
        return (
          b.returnTime.getTime() - a.returnTime.getTime() ||
          b.submitTime.getTime() - a.submitTime.getTime()
        );
      };
    default:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
  }
};

const ManageClubTableMainFrame: React.FC = () => {
  // TODO - 실제 API 연결 시 올바른 형식으로 실제 데이터 값 넣어주기

  const [page, setPage] = useState<number>(1);
  const [sortColumnName, setSortColumnName] = useState<string>("신청 일시");
  const data = mockData
    .sort(columnSort(sortColumnName))
    .slice((page - 1) * 10, page * 10);

  //   const columnSort = (headerName:string) => {};

  return (
    <ManageClubTablePageMainFrameInner>
      <Typography
        style={{
          width: "100%",
          marginBottom: "8px",
          textAlign: "right",
          color: "#555555",
        }}
        type="p"
      >{`총 ${mockData.length}개`}</Typography>
      <TableFrameInner>
        <TableRowFrameInner
          style={{
            gridTemplateColumns: tempHeaders
              .map(headerInfo => headerInfo.headerWidth)
              .join(" "),
          }}
        >
          {tempHeaders.map((headerInfo, index) => (
            <TableCellInner
              style={
                headerInfo.headerType === "HeaderSort"
                  ? {
                      gridColumn: `${index + 1} / ${index + 2}`,
                      cursor: "pointer",
                    }
                  : { gridColumn: `${index + 1} / ${index + 2}` }
              }
              key={headerInfo.headerName}
              onClick={
                headerInfo.headerType === "HeaderSort"
                  ? () => setSortColumnName(headerInfo.headerName)
                  : () => {}
              }
            >
              <TableCell type={headerInfo.headerType} width="100%">
                {headerInfo.headerName}
              </TableCell>
            </TableCellInner>
          ))}
        </TableRowFrameInner>

        {data.map(rowInfo => (
          <TableRowFrameInner
            style={{
              gridTemplateColumns: tempHeaders
                .map(headerInfo => headerInfo.headerWidth)
                .join(" "),
              borderBottom: "1px #EEEEEE solid",
            }}
          >
            {Object.entries(rowInfo).map(([key, value], index) => (
              <TableCellInner
                style={{
                  gridColumn: `${index + 1} / ${index + 2}`,
                }}
                key={key}
              >
                <TableCell type="Default" width="100%">
                  {key === "status" ? (
                    <Tag
                      color={
                        ManageClubTagColors[
                          Object.keys(ManageClubRentalBusinessStatus)[
                            Object.values(
                              ManageClubRentalBusinessStatus,
                            ).indexOf(value)
                          ] as keyof ManageClubTagColorsInterface
                        ]
                      }
                    >
                      {value}
                    </Tag>
                  ) : (
                    formattedString(key, value)
                  )}
                </TableCell>
              </TableCellInner>
            ))}
          </TableRowFrameInner>
        ))}
      </TableFrameInner>
      {mockData.length > 1 ? (
        <NoticePagination
          totalPage={Math.ceil(mockData.length / 10)}
          currentPage={page}
          limit={10}
          setPage={setPage}
        />
      ) : null}
    </ManageClubTablePageMainFrameInner>
  );
};

export default ManageClubTableMainFrame;
