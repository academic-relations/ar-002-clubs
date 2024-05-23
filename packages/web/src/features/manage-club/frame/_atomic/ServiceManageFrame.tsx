import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";
import {
  ManageTablesWrapper,
  ManageWrapper,
} from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import RentalTable from "@sparcs-clubs/web/features/manage-club/component/RentalTable";
import PrintingTable from "@sparcs-clubs/web/features/manage-club/component/PrintingTable";
import ActivityCertificateTable from "@sparcs-clubs/web/features/manage-club/component/ActivityCertificateTable";
import CommonSpaceTable from "@sparcs-clubs/web/features/manage-club/component/CommonSpaceTable";
import {
  mockupManageAcf,
  mockupManageCms,
  mockupManagePrint,
  mockupManageRental,
} from "@sparcs-clubs/web/features/manage-club/service/_mock/mockManageClub";

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
          {/* TODO: moreDetailPath 수정 */}
          <MoreDetailTitle
            title="대여 사업"
            moreDetail="내역 더보기"
            moreDetailPath="/rental-business"
          />
          <RentalTable rentalList={mockupManageRental} />
          <MoreDetailTitle
            title="홍보물 인쇄"
            moreDetail="내역 더보기"
            moreDetailPath="/printing-business"
          />
          <PrintingTable printingList={mockupManagePrint} />
          <MoreDetailTitle
            title="활동확인서 발급"
            moreDetail="내역 더보기"
            moreDetailPath="/activity-certificate"
          />
          <ActivityCertificateTable certificateList={mockupManageAcf} />
          <MoreDetailTitle
            title="공용공간 비정기사용"
            moreDetail="내역 더보기"
            moreDetailPath="/common-space"
          />
          <CommonSpaceTable spaceList={mockupManageCms} />
        </ManageTablesWrapper>
      )}
    </ManageWrapper>
  );
};

export default ServiceManageFrame;
