/* eslint-disable no-nested-ternary */

"use client";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import React, { useState } from "react";
import styled from "styled-components";
import NoticePagination from "@sparcs-clubs/web/features/notices/components/NoticePagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  activityCertificateMockData,
  commonSpaceMockData,
  printingBusinessMockData,
  rentalBusinessMockData,
} from "../types/mock";
import {
  ManageClubRentalBusinessStatus,
  ManageClubTagColorsInterface,
  ManageClubRentalBusinessData,
  ManageClubPrintingBusinessData,
  ManageClubActivityCertificateData,
  ManageClubCommonSpaceData,
} from "../types/ManageClubTable";
import {
  ManageClubTagColors,
  activityCertificateStepOrder,
  commonSpaceStepOrder,
  dateAndTimeFormatKeys,
  dateFormatKeys,
  numberFormatKeys,
  printingBusinessStepOrder,
  rentalBusinessStepOrder,
  startEndTimeFormatKeys,
} from "../types/ManageClubTableConst";
import {
  activityCertificateHeaders,
  commonSpaceHeaders,
  printingBusinessHeaders,
  rentalBusinessHeaders,
} from "../types/ManageClubTableHeader";

type ManageClubTableMainFrameProps = {
  pageType:
    | "rental-business"
    | "printing-business"
    | "activity-certificate"
    | "common-space";
};

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
    return "-";
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

const rentalBusinessColumnSort = (headerName: string) => {
  switch (headerName) {
    case rentalBusinessHeaders[0].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) =>
        rentalBusinessStepOrder.indexOf(a.status) -
          rentalBusinessStepOrder.indexOf(b.status) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case rentalBusinessHeaders[1].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
    case rentalBusinessHeaders[2].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) =>
        a.name.localeCompare(b.name) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case rentalBusinessHeaders[4].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) =>
        b.rentTime.getTime() - a.rentTime.getTime() ||
        b.submitTime.getTime() - a.submitTime.getTime();

    case rentalBusinessHeaders[5].headerName:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) =>
        b.returnTime.getTime() - a.returnTime.getTime() ||
        b.submitTime.getTime() - a.submitTime.getTime();

    default:
      return (
        a: ManageClubRentalBusinessData,
        b: ManageClubRentalBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
  }
};

const printingBusinessColumnSort = (headerName: string) => {
  switch (headerName) {
    case printingBusinessHeaders[0].headerName:
      return (
        a: ManageClubPrintingBusinessData,
        b: ManageClubPrintingBusinessData,
      ) =>
        printingBusinessStepOrder.indexOf(a.status) -
          printingBusinessStepOrder.indexOf(b.status) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case printingBusinessHeaders[1].headerName:
      return (
        a: ManageClubPrintingBusinessData,
        b: ManageClubPrintingBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
    case printingBusinessHeaders[2].headerName:
      return (
        a: ManageClubPrintingBusinessData,
        b: ManageClubPrintingBusinessData,
      ) =>
        a.name.localeCompare(b.name) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case printingBusinessHeaders[4].headerName:
      return (
        a: ManageClubPrintingBusinessData,
        b: ManageClubPrintingBusinessData,
      ) =>
        b.receiveTime.getTime() - a.receiveTime.getTime() ||
        b.submitTime.getTime() - a.submitTime.getTime();
    default:
      return (
        a: ManageClubPrintingBusinessData,
        b: ManageClubPrintingBusinessData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
  }
};

const activityCertificateColumnSort = (headerName: string) => {
  switch (headerName) {
    case activityCertificateHeaders[0].headerName:
      return (
        a: ManageClubActivityCertificateData,
        b: ManageClubActivityCertificateData,
      ) =>
        activityCertificateStepOrder.indexOf(a.status) -
          activityCertificateStepOrder.indexOf(b.status) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case activityCertificateHeaders[1].headerName:
      return (
        a: ManageClubActivityCertificateData,
        b: ManageClubActivityCertificateData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
    case activityCertificateHeaders[2].headerName:
      return (
        a: ManageClubActivityCertificateData,
        b: ManageClubActivityCertificateData,
      ) =>
        a.name.localeCompare(b.name) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    default:
      return (
        a: ManageClubActivityCertificateData,
        b: ManageClubActivityCertificateData,
      ) => b.submitTime.getTime() - a.submitTime.getTime();
  }
};

const commonSpaceColumnSort = (headerName: string) => {
  switch (headerName) {
    case commonSpaceHeaders[0].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        commonSpaceStepOrder.indexOf(a.status) -
          commonSpaceStepOrder.indexOf(b.status) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case commonSpaceHeaders[1].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        b.submitTime.getTime() - a.submitTime.getTime();
    case commonSpaceHeaders[2].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        a.name.localeCompare(b.name) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case commonSpaceHeaders[4].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        b.reserveTime.getTime() - a.reserveTime.getTime() ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case commonSpaceHeaders[5].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        b.reserveStartEndHour.localeCompare(a.reserveStartEndHour) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    case commonSpaceHeaders[6].headerName:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        b.reserveRoom.localeCompare(a.reserveRoom) ||
        b.submitTime.getTime() - a.submitTime.getTime();
    default:
      return (a: ManageClubCommonSpaceData, b: ManageClubCommonSpaceData) =>
        b.submitTime.getTime() - a.submitTime.getTime();
  }
};

const ManageClubTableMainFrame: React.FC<ManageClubTableMainFrameProps> = ({
  pageType,
}) => {
  // TODO - 실제 API 연결 시 올바른 형식으로 실제 데이터 값 넣어주기

  const [page, setPage] = useState<number>(1);
  const [sortColumnName, setSortColumnName] = useState<string>("신청 일시");

  const mockDataChooser = () => {
    switch (pageType) {
      case "rental-business":
        return rentalBusinessMockData;
      case "printing-business":
        return printingBusinessMockData;
      case "activity-certificate":
        return activityCertificateMockData;
      default: // "common-space"
        return commonSpaceMockData;
    }
  };

  //   const mockData = mockDataChooser(pageType);
  //   const data = mockData
  //     .sort(columnSort(pageType, sortColumnName))
  //     .slice((page - 1) * 10, page * 10);
  const mockData = mockDataChooser();

  const data =
    pageType === "rental-business"
      ? (mockData as ManageClubRentalBusinessData[])
          .sort(rentalBusinessColumnSort(sortColumnName))
          .slice((page - 1) * 10, page * 10)
      : pageType === "printing-business"
        ? (mockData as ManageClubPrintingBusinessData[])
            .sort(printingBusinessColumnSort(sortColumnName))
            .slice((page - 1) * 10, page * 10)
        : pageType === "activity-certificate"
          ? (mockData as ManageClubActivityCertificateData[])
              .sort(activityCertificateColumnSort(sortColumnName))
              .slice((page - 1) * 10, page * 10)
          : (mockData as ManageClubCommonSpaceData[])
              .sort(commonSpaceColumnSort(sortColumnName))
              .slice((page - 1) * 10, page * 10);

  const headers =
    pageType === "rental-business"
      ? rentalBusinessHeaders
      : pageType === "printing-business"
        ? printingBusinessHeaders
        : pageType === "activity-certificate"
          ? activityCertificateHeaders
          : commonSpaceHeaders;

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
            gridTemplateColumns: headers
              .map(headerInfo => headerInfo.headerWidth)
              .join(" "),
          }}
        >
          {headers.map((headerInfo, index) => (
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

        {data.map((rowInfo, rowIndex) => (
          <TableRowFrameInner
            style={{
              gridTemplateColumns: headers
                .map(headerInfo => headerInfo.headerWidth)
                .join(" "),
              borderBottom: "1px #EEEEEE solid",
            }}
            id={`row${rowIndex.toString()}`}
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
