import React from "react";

import { flexRender, type Table as TableType } from "@tanstack/react-table";
import styled from "styled-components";

import Typography from "./Typography";

interface TableProps<T> {
  table: TableType<T>;
  height?: number | undefined;
  emptyMessage?: string;
}

const TableInner = styled.table<{ height?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 8px;
  overflow: hidden;
  border-spacing: 0;
  height: ${({ height }) => (height ? `${height}px` : "none")};
`;

const Header = styled.thead`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const HeaderRow = styled.tr`
  display: flex;
  width: 100%;
`;

const Content = styled.tbody`
  display: block;
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const ContentRow = styled.tr<{ selected: boolean }>`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.MINT[100] : "transparent"};
`;

const EmptyCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Table = <T,>({
  table,
  height = undefined,
  emptyMessage = "",
}: TableProps<T>) => (
  <TableInner height={height}>
    <Header>
      {table.getHeaderGroups().map(headerGroup => (
        <HeaderRow key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            if (header.isPlaceholder) {
              return null;
            }
            if (header.column.getCanSort()) {
              return flexRender(
                header.column.columnDef.header,
                header.getContext(),
              );
            }
            return flexRender(
              header.column.columnDef.header,
              header.getContext(),
            );
          })}
        </HeaderRow>
      ))}
    </Header>
    <Content>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map(row => (
          <ContentRow key={row.id} selected={row.getIsSelected()}>
            {row
              .getVisibleCells()
              .map(cell =>
                flexRender(cell.column.columnDef.cell, cell.getContext()),
              )}
          </ContentRow>
        ))
      ) : (
        <EmptyCenterPlacer>
          <Typography
            fs={16}
            lh={24}
            color="GRAY.300"
            ff="PRETENDARD"
            fw="REGULAR"
          >
            {emptyMessage}
          </Typography>
        </EmptyCenterPlacer>
      )}
    </Content>
  </TableInner>
);

export default Table;
