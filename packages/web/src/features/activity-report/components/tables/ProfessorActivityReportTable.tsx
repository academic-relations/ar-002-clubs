import React from "react";

import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import {
  ActTypeTagList,
  ApplyTagList,
} from "@sparcs-clubs/web/constants/tableTagList";

import { mockProfessorActivityReportData } from "@sparcs-clubs/web/features/activity-report/_mock/professor";
import { BaseActivityReport } from "@sparcs-clubs/web/features/activity-report/types/activityReport";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ProfessorActivityReportTableProps {
  clubId: number;
}

interface ProfessorActivityReportTableData extends BaseActivityReport {
  id: number;
  activityStatusEnumId: ActivityStatusEnum;
  professorApproval: string;
}

const getProfessorApprovalTagColor = (professorApproval: string): TagColor => {
  switch (professorApproval) {
    case "대기":
      return "GRAY";
    case "완료":
      return "GREEN";
    case "반려":
      return "RED";
    default:
      return "GRAY";
  }
};

const columnHelper = createColumnHelper<ProfessorActivityReportTableData>();
const columns = [
  columnHelper.accessor("activityStatusEnumId", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 0,
  }),
  columnHelper.accessor("professorApproval", {
    id: "professorApproval",
    header: "지도교수",
    cell: info => (
      <Tag color={getProfessorApprovalTagColor(info.getValue())}>
        {info.getValue()}
      </Tag>
    ),
    size: 0,
  }),
  columnHelper.accessor("name", {
    id: "activity",
    header: "활동명",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 32,
  }),
  columnHelper.accessor(
    row =>
      `${formatDate(row.durations[0].startTerm)} ~ ${formatDate(row.durations[0].endTerm)}${row.durations.length > 1 ? ` 외 ${row.durations.length - 1}개` : ""}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 48,
    },
  ),
];

const ProfessorActivityReportTable: React.FC<
  ProfessorActivityReportTableProps
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ clubId }) => {
  // TODO: 실제 데이터 받아오기
  const data =
    mockProfessorActivityReportData as ProfessorActivityReportTableData[];
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  const router = useRouter();

  const openApproveAllModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          confirmButtonText="승인"
          onConfirm={() => {
            // TODO: (@dora) 전체 승인 로직 넣기
            close();
          }}
          onClose={close}
        >
          모든 활동 보고서를 일괄 승인합니다. <br />
          해당 작업은 되돌릴 수 없습니다.
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <>
      <FlexWrapper direction="row" gap={16} style={{ alignItems: "center" }}>
        <Typography fs={20} lh={24} fw="MEDIUM" style={{ flex: 1 }}>
          활동 보고서
        </Typography>
        <Button type="default" onClick={openApproveAllModal}>
          전체 승인
        </Button>
      </FlexWrapper>
      <Table
        table={table}
        count={data.length}
        onClick={row => router.push(`/manage-club/activity-report/${row.id}`)}
      />
    </>
  );
};

export default ProfessorActivityReportTable;
