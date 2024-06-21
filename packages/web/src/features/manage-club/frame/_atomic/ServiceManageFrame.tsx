import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import { ManageTablesWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
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
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";

const ServiceManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <FlexWrapper direction="column" gap={40}>
      <FoldableSectionTitle
        title="서비스 신청"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <ManageTablesWrapper>
          <FlexWrapper direction="column" gap={20}>
            <MoreDetailTitle
              title="대여 사업"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/rental-business"
            />
            <RentalTable rentalList={mockupManageRental} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={20}>
            <MoreDetailTitle
              title="홍보물 인쇄"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/printing-business"
            />
            <PrintingTable printingList={mockupManagePrint} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={20}>
            <MoreDetailTitle
              title="활동확인서 발급"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/activity-certificate"
            />
            <ActivityCertificateTable certificateList={mockupManageAcf} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={20}>
            <MoreDetailTitle
              title="공용공간 비정기사용"
              moreDetail="내역 더보기"
              moreDetailPath="/manage-club/common-space"
            />
            <CommonSpaceTable spaceList={mockupManageCms} />
          </FlexWrapper>
        </ManageTablesWrapper>
      )}
    </FlexWrapper>
  );
};

export default ServiceManageFrame;
