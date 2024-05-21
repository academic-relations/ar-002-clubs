import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { ManageWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";

const MembersManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      <MoreDetailTitle
        title="(현재 현황 보여주기)"
        // TODO: mock data 가져와서 title formatting
        moreDetail="전체 보기"
        moreDetailPath="/manage-club/members"
      />
      회원 table
    </ManageWrapper>
  );
};

export default MembersManageFrame;
