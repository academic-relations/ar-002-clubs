import React, { useEffect, useState } from "react";

import {
  createColumnHelper,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { hangulIncludes } from "es-hangul";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import Table from "@sparcs-clubs/web/common/components/Table";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { type Participant } from "../types/activityReport";

interface SelectParticipantProps {
  data: Participant[];
  onChange?: (selected: Participant[]) => void;
}

const SelectParticipantInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
`;

const CheckboxCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const columnHelper = createColumnHelper<Participant>();

const columns = [
  columnHelper.display({
    id: "multiSelect",
    header: ({ table }) => (
      <TableCell minWidth={40} width="5%" type="Header">
        <CheckboxCenterPlacer>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onClick={table.getToggleAllRowsSelectedHandler()}
          />
        </CheckboxCenterPlacer>
      </TableCell>
    ),
    cell: ({ row }) => (
      <TableCell minWidth={40} width="5%" type="Default">
        <CheckboxCenterPlacer>
          <Checkbox
            checked={row.getIsSelected()}
            onClick={row.getToggleSelectedHandler()}
          />
        </CheckboxCenterPlacer>
      </TableCell>
    ),
  }),
  columnHelper.accessor("studentId", {
    id: "studentId",
    header: () => (
      <TableCell width="35%" minWidth={100} type="Header">
        학번
      </TableCell>
    ),
    cell: info => (
      <TableCell width="35%" minWidth={100} type="Default">
        {info.getValue()}
      </TableCell>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: () => (
      <TableCell minWidth={90} width="30%" type="Header">
        신청자
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={90} width="30%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: () => (
      <TableCell minWidth={130} width="30%" type="Header">
        전화번호
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={130} width="30%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => (
      <TableCell width="40%" type="Header">
        이메일
      </TableCell>
    ),
    cell: info => (
      <TableCell width="40%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
  }),
];

const containsTextFilter: FilterFn<Participant> = (
  row: Row<Participant>,
  _: string,
  filterValue: string,
) => {
  const name = row.getValue<string>("name").toLowerCase();
  const studentId = row.getValue<string>("studentId").toLowerCase();
  const filterText = filterValue.toLowerCase();
  return hangulIncludes(name, filterText) || studentId.startsWith(filterText);
};

const SelectParticipant: React.FC<SelectParticipantProps> = ({
  data,
  onChange = () => {},
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState<RowSelectionState>({});
  const [searchText, setSearchText] = useState<string>("");
  const [selected, setSelected] = useState<Participant[]>([]);

  useEffect(() => {
    const res = data.filter((_, i) => selectedRowIds[i]);
    setSelected(res);
    onChange(res);
  }, [selectedRowIds]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection: selectedRowIds,
      globalFilter: searchText,
    },
    onRowSelectionChange: setSelectedRowIds,
    globalFilterFn: containsTextFilter,
    initialState: {
      sorting: [
        {
          id: "studentId",
          desc: true,
        },
      ],
    },
  });

  return (
    <Card outline padding="32px" gap={32}>
      <SearchInput
        searchText={searchText}
        handleChange={setSearchText}
        placeholder="학번 또는 이름을 검색해주세요"
      />
      <SelectParticipantInner>
        <Typography
          fs={16}
          fw="REGULAR"
          ff="PRETENDARD"
          lh={20}
          color="GRAY.600"
        >
          {searchText && `검색 결과 ${table.getRowModel().rows.length}명 / `}
          {`총 ${data.length}명`}
        </Typography>
        <Table
          table={table}
          height={320}
          emptyMessage="검색 결과가 존재하지 않습니다"
        />
      </SelectParticipantInner>
      <Toggle
        label={
          <Typography type="p_b">
            선택된 회원 목록 ({selected.length}명)
          </Typography>
        }
      >
        {selected.length ? (
          selected.map((participant, i) => (
            <Typography key={i} type="p">
              {participant.studentId} {participant.name}
            </Typography>
          ))
        ) : (
          <Typography ff="PRETENDARD" fs={16} fw="REGULAR" color="GRAY.300">
            선택된 회원이 없습니다.
          </Typography>
        )}
      </Toggle>
    </Card>
  );
};

export default SelectParticipant;
