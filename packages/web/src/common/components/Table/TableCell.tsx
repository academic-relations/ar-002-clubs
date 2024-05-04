import React, { ReactNode } from "react";
import styled from "styled-components";
import colors from "@sparcs-clubs/web/styles/themes/colors";
import Icon from "../Icon";

interface TableCellProps {
  type: "Default" | "None" | "Tag" | "Header" | "HeaderSort";
  children: ReactNode;
  width?: string | number;
  minWidth?: number;
}

const CommonCellWrapper = styled.div<{
  isHeader: boolean;
  width: string | number;
  minWidth: number;
}>`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  min-width: ${({ width }) => `${width}px`};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 12px 8px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  background-color: ${({ theme, isHeader }) =>
    isHeader ? theme.colors.PRIMARY : "transparent"};
`;

const CellText = styled.div<{ isGray: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ isGray, theme }) =>
    isGray ? theme.colors.GRAY[300] : theme.colors.BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HeaderInner = styled.div`
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.WHITE};
`;

const SortWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0px;
  padding-left: 20px;
`;

const TableCell: React.FC<TableCellProps> = ({
  type,
  children,
  width = "150px",
  minWidth = 150,
}) => (
  <CommonCellWrapper
    width={width}
    minWidth={minWidth}
    isHeader={type === "Header" || type === "HeaderSort"}
  >
    {type === "Default" && <CellText isGray={false}>{children}</CellText>}
    {type === "None" && <CellText isGray>{children}</CellText>}
    {type === "Tag" && children}
    {type === "Header" && <HeaderInner>{children}</HeaderInner>}
    {type === "HeaderSort" && (
      <SortWrapper>
        <HeaderInner>{children}</HeaderInner>
        <Icon type="arrow_drop_down" size={24} color={colors.WHITE} />
      </SortWrapper>
    )}
  </CommonCellWrapper>
);

export default TableCell;
