import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";
import {
  ManageTablesWrapper,
  ManageWrapper,
} from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";

const ServiceManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="서비스 신청"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <ManageTablesWrapper>
          <MoreDetailTitle
            title="대여 사업"
            moreDetail="내역 더보기"
            moreDetailPath="/rental-business"
          />
          대여 table
          <MoreDetailTitle
            title="홍보물 인쇄"
            moreDetail="내역 더보기"
            moreDetailPath="/printing-business"
          />
          홍보물 table
          <MoreDetailTitle
            title="활동확인서 발급"
            moreDetail="내역 더보기"
            moreDetailPath="/activity-certificate"
          />
          활동확인서 table
          <MoreDetailTitle
            title="공용공간 비정기사용"
            moreDetail="내역 더보기"
            moreDetailPath="/common-space"
          />
          공용공간 table
        </ManageTablesWrapper>
      )}
    </ManageWrapper>
  );
};

export default ServiceManageFrame;
