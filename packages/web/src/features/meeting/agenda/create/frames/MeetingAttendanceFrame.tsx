import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Table from "@sparcs-clubs/web/common/components/Table";
import Typography from "@sparcs-clubs/web/common/components/Typography";

export interface President {
  position: string;
  name: string;
  note?: string;
}

export interface ClubRepresentative {
  division: string;
  clubName: string;
  name: string;
  note?: string;
}

export interface DivisionPresident {
  division: string;
  name: string;
  note?: string;
}

const getCell = (info: { getValue: () => string | undefined }) =>
  info.getValue() ?? "-";

const presidentColumnHelper = createColumnHelper<President>();
const presidentTableColumn = [
  presidentColumnHelper.accessor("position", {
    header: "직책",
    cell: getCell,
  }),
  presidentColumnHelper.accessor("name", {
    header: "이름",
    cell: getCell,
  }),
  presidentColumnHelper.accessor("note", {
    header: "비고",
    cell: getCell,
  }),
];

const clubRepresentativeColumnHelper = createColumnHelper<ClubRepresentative>();
const clubRepresentativeTableColumn = [
  clubRepresentativeColumnHelper.accessor("division", {
    header: "분과",
    cell: getCell,
    size: 20,
  }),
  clubRepresentativeColumnHelper.accessor("clubName", {
    header: "동아리",
    cell: getCell,
    size: 30,
  }),
  clubRepresentativeColumnHelper.accessor("name", {
    header: "이름",
    cell: getCell,
    size: 30,
  }),
  clubRepresentativeColumnHelper.accessor("note", {
    header: "비고",
    cell: getCell,
    size: 30,
  }),
];

const divisionPresidentColumnHelper = createColumnHelper<DivisionPresident>();
const divisionPresidentTableColumn = [
  divisionPresidentColumnHelper.accessor("division", {
    header: "분과",
    cell: getCell,
  }),
  divisionPresidentColumnHelper.accessor("name", {
    header: "이름",
    cell: getCell,
  }),
  divisionPresidentColumnHelper.accessor("note", {
    header: "비고",
    cell: getCell,
  }),
];

interface MeetingAttendanceFrameProps {
  presidentList: President[];
  clubRepresentativeList: ClubRepresentative[];
  divisionPresidentList: DivisionPresident[];
}

const MeetingAttendanceFrame: React.FC<MeetingAttendanceFrameProps> = ({
  presidentList,
  clubRepresentativeList,
  divisionPresidentList,
}: MeetingAttendanceFrameProps) => {
  const participantNumber =
    presidentList.length +
    clubRepresentativeList.length +
    divisionPresidentList.length;

  return (
    <FoldableSectionTitle title={`회의 출석 명단 (총 ${participantNumber}명)`}>
      <FlexWrapper gap={40} direction="column">
        <FlexWrapper gap={20} direction="column">
          <Typography
            fw="MEDIUM"
            fs={20}
            lh={24}
          >{`회장단 (${presidentList.length}명)`}</Typography>
          <Table
            table={useReactTable({
              columns: presidentTableColumn,
              data: presidentList,
              getCoreRowModel: getCoreRowModel(),
              enableSorting: false,
            })}
          />
        </FlexWrapper>
        <FlexWrapper gap={20} direction="column">
          <Typography
            fw="MEDIUM"
            fs={20}
            lh={24}
          >{`동아리 대표자 (${clubRepresentativeList.length}명)`}</Typography>
          <Table
            table={useReactTable({
              columns: clubRepresentativeTableColumn,
              data: clubRepresentativeList,
              getCoreRowModel: getCoreRowModel(),
              enableSorting: false,
            })}
          />
        </FlexWrapper>
        <FlexWrapper gap={20} direction="column">
          <Typography
            fw="MEDIUM"
            fs={20}
            lh={24}
          >{`동아리 대표자 (${divisionPresidentList.length}명)`}</Typography>
          <Table
            table={useReactTable({
              columns: divisionPresidentTableColumn,
              data: divisionPresidentList,
              getCoreRowModel: getCoreRowModel(),
              enableSorting: false,
            })}
          />
        </FlexWrapper>
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default MeetingAttendanceFrame;
