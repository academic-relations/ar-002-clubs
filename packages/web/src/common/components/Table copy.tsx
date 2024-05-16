import React from "react";
import styled from "styled-components";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import TableCell from "./Table/TableCell";

interface TableProps<T> {
  table: TableType<T>;
}

const TableInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
  border-radius: 8px;
  overflow: hidden;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
`;

const Table = <T,>({ table }: TableProps<T>) => (
  <TableInner>
    <HeaderRow>
      {table.getHeaderGroups().map(headerGroup => (
        <>
          {headerGroup.headers.map(header => {
            if (header.isPlaceholder) {
              return null;
            }
            if (header.column.getCanSort()) {
              return (
                <TableCell
                  type="HeaderSort"
                  minWidth={header.column.getSize()}
                  width={header.column.getSize()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              );
            }
            return (
              <TableCell
                type="Header"
                minWidth={header.column.getSize()}
                width={header.column.getSize()}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableCell>
            );
          })}
        </>
      ))}
    </HeaderRow>
    <ContentRow>
      {table.getRowModel().rows.map(row => (
        <TableBody key={row.id}>
          {row.getVisibleCells().map(cell => (
            <TableCell
              key={cell.id}
              type="Default"
              width={cell.column.getSize()}
              minWidth={cell.column.getSize()}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableBody>
      ))}
    </ContentRow>
  </TableInner>
);

export default Table;
