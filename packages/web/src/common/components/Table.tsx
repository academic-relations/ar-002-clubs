import React from "react";
import styled from "styled-components";
import { flexRender, type Table as TableType } from "@tanstack/react-table";

interface TableProps<T> {
  table: TableType<T>;
}

const TableInner = styled.table`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 8px;
  overflow: hidden;
  border-collapse: collapse;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ContentRow = styled.tr`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const Table = <T,>({ table }: TableProps<T>) => (
  <TableInner>
    <Header>
      {table.getHeaderGroups().map(headerGroup => (
        <HeaderRow>
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
      {table.getRowModel().rows.map(row => (
        <ContentRow key={row.id}>
          {row
            .getVisibleCells()
            .map(cell =>
              flexRender(cell.column.columnDef.cell, cell.getContext()),
            )}
        </ContentRow>
      ))}
    </Content>
  </TableInner>
);

export default Table;
