"use client";

import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import mockupClubMemberRegister from "@sparcs-clubs/web/features/executive/register-member/[id]/_mock/mockClubMemberRegister";
import calcRegisterInfo from "@sparcs-clubs/web/features/executive/register-member/[id]/services/calcRegisterInfo";

import RegisterInfoTable from "@sparcs-clubs/web/features/executive/register-member/components/RegisterInfoTable";
import StatusInfoFrame from "@sparcs-clubs/web/features/executive/register-member/components/StatusInfoFrame";

import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const RegisterMember = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const pathSegments = window.location.pathname.split("/").filter(Boolean);
  const id = pathSegments[pathSegments.length - 1];

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

  const club = useGetClubDetail(id);

  const GetPageTitle = () => `회원 등록 신청 내역 (${club.data?.name})`;

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
          <FlexWrapper gap={8} direction="row">
            <Icon type="expand_more" size={16} />
            <Typography>회원 등록 신청 통계</Typography>
          </FlexWrapper>
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
          <StatusInfoFrame
            statusInfo={
              calcRegister.get(MemberStatusEnum.Rejected) || defaultStatusInfo
            }
            status={MemberStatusEnum.Rejected}
          />
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

export default RegisterMember;
