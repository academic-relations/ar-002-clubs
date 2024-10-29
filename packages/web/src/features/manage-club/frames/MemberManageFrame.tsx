import React from "react";

import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ApiClb010ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb010";
import { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import Table from "@sparcs-clubs/web/common/components/Table";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

import { useGetClubMembers } from "@sparcs-clubs/web/features/manage-club/members/services/getClubMembers";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const columnHelper =
  createColumnHelper<ApiClb010ResponseOk["members"][number]>();

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

const MemberManageFrame: React.FC = () => {
  // 자신이 대표자인 동아리 clubId 가져오기
  const { data: idData } = useGetMyManageClub() as {
    data: ApiClb015ResponseOk;
    isLoading: boolean;
  };

  const {
    data: membersData,
    isLoading: memberIsLoading,
    isError: memberIsError,
  } = useGetClubMembers({
    clubId: idData.clubId,
    semesterId: 16, // TODO: 현재 학기를 받아와서 수정
  });

  const membersCount = membersData.members.length;

  const table = useReactTable({
    columns,
    data: membersData.members,
    getCoreRowModel: getCoreRowModel(),
  });

  // 자신이 대표자인 동아리 clubId에 해당하는 동아리 세부정보 가져오기
  const {
    data: clubData,
    isLoading: clubIsLoading,
    isError: clubIsError,
  } = useGetClubDetail(idData.clubId.toString()) as {
    data: ApiClb002ResponseOK;
    isLoading: boolean;
    isError: boolean;
  };

  const title = `2024년 가을학기(총 ${membersCount}명)`;
  // TODO: 학기 받아올 수 있도록 수정

  return (
    <FoldableSectionTitle title="회원 명단">
      <AsyncBoundary
        isLoading={clubIsLoading || memberIsLoading}
        isError={clubIsError || memberIsError}
      >
        {clubData && membersData && (
          <FlexWrapper direction="column" gap={16}>
            <MoreDetailTitle
              title={title}
              moreDetail="전체 보기"
              moreDetailPath="/manage-club/members"
            />
            <Table table={table} />
          </FlexWrapper>
        )}
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default MemberManageFrame;
