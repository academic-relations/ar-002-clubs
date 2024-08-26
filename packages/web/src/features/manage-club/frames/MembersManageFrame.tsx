import React, { useEffect, useState } from "react";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useTheme } from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";
import { useGetMemberRegistration } from "@sparcs-clubs/web/features/manage-club/members/services/getClubMemberRegistration";

import { Members } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

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

const MembersManageFrame: React.FC = () => {
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

  const appliedCount = registerMember.filter(
    member =>
      member.applyStatusEnumId ===
      RegistrationApplicationStudentStatusEnum.Pending,
  ).length;
  const approvedCount = registerMember.filter(
    member =>
      member.applyStatusEnumId ===
      RegistrationApplicationStudentStatusEnum.Approved,
  ).length;
  const rejectedCount = registerMember.filter(
    member =>
      member.applyStatusEnumId ===
      RegistrationApplicationStudentStatusEnum.Rejected,
  ).length;
  const totalCount = registerMember.length;

  const title = `2024년 봄학기 (신청 ${appliedCount}명, 승인 ${approvedCount}명, 반려 ${rejectedCount}명 / 총 ${totalCount}명)`;
  const mobileTitle = `2024년 봄학기`;
  // TODO: 학기 받아올 수 있도록 수정

  const theme = useTheme();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(
        window.innerWidth <= parseInt(theme.responsive.BREAKPOINT.sm),
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <FoldableSectionTitle title="회원 명단">
      <AsyncBoundary isLoading={memberIsLoading} isError={memberIsError}>
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title={isMobileView ? mobileTitle : title}
            moreDetail="전체 보기"
            moreDetailPath="/manage-club/members"
          />
          <MembersTable
            memberList={registerMember}
            clubName={clubDetail.name_kr}
          />
        </FlexWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default MembersManageFrame;
