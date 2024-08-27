import React, { useEffect, useState } from "react";

import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";
import { ApiReg008ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { useTheme } from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";
import { useGetMemberRegistration } from "@sparcs-clubs/web/features/manage-club/members/services/getClubMemberRegistration";

import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const MembersManageFrame: React.FC = () => {
  // 자신이 대표자인 동아리 clubId 가져오기
  const { data: idData } = useGetMyManageClub() as {
    data: ApiClb015ResponseOk;
    isLoading: boolean;
  };

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
  const {
    data: memberData,
    isLoading: memberIsLoading,
    isError: memberIsError,
  } = useGetMemberRegistration({ clubId: idData.clubId }) as {
    data: ApiReg008ResponseOk;
    isLoading: boolean;
    isError: boolean;
  };

  const appliedCount =
    memberData &&
    memberData.applies.filter(
      member =>
        member.applyStatusEnumId ===
        RegistrationApplicationStudentStatusEnum.Pending,
    ).length;
  const approvedCount =
    memberData &&
    memberData.applies.filter(
      member =>
        member.applyStatusEnumId ===
        RegistrationApplicationStudentStatusEnum.Approved,
    ).length;
  const rejectedCount =
    memberData &&
    memberData.applies.filter(
      member =>
        member.applyStatusEnumId ===
        RegistrationApplicationStudentStatusEnum.Rejected,
    ).length;
  const totalCount = memberData && memberData.applies.length;

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
      <AsyncBoundary
        isLoading={memberIsLoading && clubIsLoading}
        isError={memberIsError && clubIsError}
      >
        <FlexWrapper direction="column" gap={20}>
          <MoreDetailTitle
            title={isMobileView ? mobileTitle : title}
            moreDetail="전체 보기"
            moreDetailPath="/manage-club/members"
          />
          {memberData && clubData && (
            <MembersTable
              memberList={memberData.applies}
              clubName={clubData.name_kr}
              clubId={idData.clubId}
            />
          )}
        </FlexWrapper>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};

export default MembersManageFrame;
