"use client";

import React, { useState } from "react";

import { Divider } from "@mui/material";

import { useParams } from "next/navigation";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Toggle from "@sparcs-clubs/web/common/components/Toggle";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";

import mockupClubMemberRegister from "@sparcs-clubs/web/features/executive/register-member/[id]/_mock/mockClubMemberRegister";
import calcRegisterInfo from "@sparcs-clubs/web/features/executive/register-member/[id]/services/calcRegisterInfo";
import RegisterInfoTable from "@sparcs-clubs/web/features/executive/register-member/components/RegisterInfoTable";
import StatusInfoFrame from "@sparcs-clubs/web/features/executive/register-member/components/StatusInfoFrame";

import TotalInfoFrame from "@sparcs-clubs/web/features/executive/register-member/components/TotalInfoFrame";
import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const ExecutiveRegisterMemberDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { id } = useParams();

  const DividerContatiner = styled.div`
    padding-left: 28px;
  `;

  /* TODO : API로 데이터 받아오기 */
  const paginatedData = {
    total: mockupClubMemberRegister.total,
    applies: mockupClubMemberRegister.applies.slice(
      (currentPage - 1) * limit,
      currentPage * limit,
    ),
    offset: (currentPage - 1) * limit,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const calcRegister = calcRegisterInfo(mockupClubMemberRegister);

  const defaultStatusInfo = { Regular: 0, NonRegular: 0, Total: 0 };

  const club = useGetClubDetail(id as string);

  const GetPageTitle = () => `회원 등록 신청 내역 (${club.data?.name_kr})`;

  return (
    <AsyncBoundary isLoading={club.isLoading} isError={club.isError}>
      <FlexWrapper direction="column" gap={20}>
        <PageHead
          items={[
            { name: "집행부원 대시보드", path: "/executive" },
            { name: "회원 등록 신청 내역", path: `/executive/register-member` },
          ]}
          enableLast
          title={GetPageTitle()}
        />
        <Card gap={16} padding="16px">
          <Toggle label={<Typography>회원 등록 신청 통계</Typography>}>
            <StatusInfoFrame
              statusInfo={
                calcRegister.get(MemberStatusEnum.Applied) || defaultStatusInfo
              }
              status={MemberStatusEnum.Applied}
            />
            <StatusInfoFrame
              statusInfo={
                calcRegister.get(MemberStatusEnum.Approved) || defaultStatusInfo
              }
              status={MemberStatusEnum.Approved}
            />
            <FlexWrapper gap={8} direction="column">
              <StatusInfoFrame
                statusInfo={
                  calcRegister.get(MemberStatusEnum.Rejected) ||
                  defaultStatusInfo
                }
                status={MemberStatusEnum.Rejected}
              />
              <DividerContatiner>
                <Divider />
              </DividerContatiner>
              <TotalInfoFrame
                statusInfo={calcRegister.get("Total") || defaultStatusInfo}
              />
            </FlexWrapper>
          </Toggle>
        </Card>
        <RegisterInfoTable memberRegisterInfoList={paginatedData} />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil(mockupClubMemberRegister.total / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </FlexWrapper>
    </AsyncBoundary>
  );
};

export default ExecutiveRegisterMemberDetail;
