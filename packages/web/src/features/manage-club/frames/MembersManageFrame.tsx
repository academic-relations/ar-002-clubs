import React, { useEffect, useState } from "react";

import { useTheme } from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";

import {
  MemberStatusEnum,
  mockupManageMems,
} from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const MembersManageFrame: React.FC = () => {
  const appliedCount = mockupManageMems.filter(
    member => member.status === MemberStatusEnum.Applied,
  ).length;
  const approvedCount = mockupManageMems.filter(
    member => member.status === MemberStatusEnum.Approved,
  ).length;
  const rejectedCount = mockupManageMems.filter(
    member => member.status === MemberStatusEnum.Rejected,
  ).length;
  const totalCount = mockupManageMems.length;

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
      <FlexWrapper direction="column" gap={20}>
        <MoreDetailTitle
          title={isMobileView ? mobileTitle : title}
          moreDetail="전체 보기"
          moreDetailPath="/manage-club/members"
        />
        <MembersTable memberList={mockupManageMems} />
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};

export default MembersManageFrame;
