import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { ManageSingleWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import MembersTable from "@sparcs-clubs/web/features/manage-club/component/MembersTable";
import {
  MemberStatusEnum,
  mockupManageMems,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

const MembersManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);

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
  // TODO: 학기 받아올 수 있도록 수정
  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <ManageSingleWrapper>
          <MoreDetailTitle
            title={title}
            moreDetail="전체 보기"
            moreDetailPath="/manage-club/members"
          />
          <MembersTable memberList={mockupManageMems} />
        </ManageSingleWrapper>
      )}
    </FlexWrapper>
  );
};

export default MembersManageFrame;
