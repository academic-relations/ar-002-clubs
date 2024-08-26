import React, { useEffect, useState } from "react";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";
import { useGetMemberRegistration } from "@sparcs-clubs/web/features/manage-club/members/services/getClubMemberRegistration";
import { Members } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const TableWithPagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

interface MyManageClubData {
  clubId: number;
  delegateEnumId: number;
}

interface MyManageClubDetail {
  id: number;
  name_kr: string;
  name_en: string;
  type: ClubTypeEnum; // 동아리 유형(정동아리 | 가동아리)
  isPermanent: boolean; // 상임동아리 여부
  characteristic: string; // 동아리 소개
  representative: string; // 동아리 대표
  advisor?: string; // 동아리 지도교수
  totalMemberCnt: number;
  description: string;
  divisionName: string; // 분과명
  foundingYear: number;
  room: string; // 동아리방 위치
}

const RegisterMemberList = () => {
  const [page, setPage] = useState<number>(1);

  const [clubId, setClubId] = useState<number>(0); // 자신이 대표자인 동아리의 clubId
  const [clubDetail, setClubDetail] = useState<MyManageClubDetail>({
    // 자신이 대표자인 동아리의 세부 정보
    id: 0,
    name_kr: "",
    name_en: "",
    type: ClubTypeEnum.Provisional,
    isPermanent: false,
    characteristic: "",
    representative: "",
    advisor: "",
    totalMemberCnt: 1,
    description: "",
    divisionName: "",
    foundingYear: 2024,
    room: "",
  });
  const [registerMember, setRegisterMember] = useState<Members[]>([]);

  // 자신이 대표자인 동아리 clubId 가져오기
  const { data: idData, isLoading: idIsLoading } = useGetMyManageClub() as {
    data: MyManageClubData;
    isLoading: boolean;
  };

  useEffect(() => {
    if (!idIsLoading && idData && Object.keys(idData).length > 0) {
      setClubId(idData.clubId);
    }
  }, [idIsLoading, idData, clubId]);

  // 자신이 대표자인 동아리 clubId에 해당하는 동아리 세부정보 가져오기
  const { data, isLoading } = useGetClubDetail(clubId.toString());
  const {
    data: memberData,
    isLoading: memberIsLoading,
    isError: memberIsError,
  } = useGetMemberRegistration({ clubId });

  useEffect(() => {
    if (!isLoading && data) {
      setClubDetail(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (!memberIsLoading && memberData && memberData.applies) {
      setRegisterMember(memberData.applies);
    }
  }, [memberIsLoading, memberData]);

  const totalPage = Math.ceil(registerMember.length / 10);

  return (
    <TableWithPagination>
      <AsyncBoundary isLoading={memberIsLoading} isError={memberIsError}>
        <MembersTable
          memberList={registerMember}
          clubName={clubDetail.name_kr}
          clubId={clubId}
        />
        {totalPage !== 1 && (
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            limit={10}
            setPage={setPage}
          />
        )}
      </AsyncBoundary>
    </TableWithPagination>
  );
};

export default RegisterMemberList;
