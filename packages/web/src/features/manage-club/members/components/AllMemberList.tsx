import React, { useState } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface AllMemberListProps {
  semester: string;
  members: {
    studentNumber: number;
    name: string;
    email: string;
    phoneNumber?: string;
  }[];
  searchText?: string;
}

const AllMemberListTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const columnHelper =
  createColumnHelper<AllMemberListProps["members"][number]>();

const columns = [
  columnHelper.accessor("studentNumber", {
    id: "studentNumber",
    header: "학번",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "신청자",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "전화번호",
    cell: info => info.getValue(),
    size: 20,
    enableSorting: false,
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "이메일",
    cell: info => info.getValue(),
    size: 20,
    enableSorting: false,
  }),
  columnHelper.display({
    id: "remarks",
    header: "비고",
    cell: () => " ",
    size: 20,
    enableSorting: false,
  }),
];

const AllMemberList: React.FC<AllMemberListProps> = ({
  semester,
  members,
  searchText = "",
}) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleHandler = () => setToggle(!toggle);
  const searchedMembers = members.filter(member =>
    member.name.startsWith(searchText),
  );

  const memberCount = searchedMembers.length;

  const table = useReactTable({
    columns,
    data: searchedMembers,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <FlexWrapper direction="column" gap={20}>
      <AllMemberListTitle>
        <Typography
          fs={20}
          fw="MEDIUM"
          lh={24}
          ff="PRETENDARD"
          color="BLACK"
          style={{ flex: 1 }}
        >
          {semester} (총 {memberCount}명)
        </Typography>
        <TextButton
          fs={14}
          fw="REGULAR"
          color="BLACK"
          text={toggle ? `접기` : `펼치기`}
          onClick={toggleHandler}
        />
      </AllMemberListTitle>
      {toggle && (
        <TableWithCount>
          <Typography
            fw="REGULAR"
            fs={16}
            lh={20}
            ff="PRETENDARD"
            color="GRAY.600"
          >
            총 {memberCount}명
          </Typography>
          <Table table={table} />
        </TableWithCount>
      )}
    </FlexWrapper>
  );
};

export default AllMemberList;
