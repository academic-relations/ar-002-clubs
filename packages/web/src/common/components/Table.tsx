import { Fragment, useMemo } from "react";

import { flexRender, type Table as TableType } from "@tanstack/react-table";
import styled from "styled-components";

import TableCell from "./Table/TableCell";

import Typography from "./Typography";

interface TableProps<T> {
  table: TableType<T>;
  height?: number | undefined;
  emptyMessage?: string;
  noBorder?: boolean;
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

// const a: Updater<ColumnSizingState>

const Table = <T,>({
  table,
  height = undefined,
  emptyMessage = "",
  noBorder = false,
}: TableProps<T>) => {
  const Wrapper = useMemo(() => (noBorder ? Fragment : TableInner), [noBorder]);

  // 야매로 min-width 바꿔치기
  // eslint-disable-next-line no-underscore-dangle
  table._getColumnDefs().forEach(column => {
    // eslint-disable-next-line no-param-reassign
    column.minSize = 0;
  });

  return (
    <Wrapper height={height}>
      <Header>
        {table.getHeaderGroups().map(headerGroup => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              if (header.isPlaceholder) {
                return null;
              }
              if (header.column.getCanSort()) {
                return (
                  <TableCell
                    key={header.id}
                    width={header.getSize()}
                    type="HeaderSort"
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
                  key={header.id}
                  width={header.getSize()}
                  type="Header"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              );
            })}
          </HeaderRow>
        ))}
      </Header>
      <Content>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map(row => (
            <ContentRow key={row.id} selected={row.getIsSelected()}>
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  width={cell.column.getSize()}
                  type="Default"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
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
    </Wrapper>
  );
};

export default Table;
