import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import ActivityCertificateTable from "@sparcs-clubs/web/features/manage-club/components/ActivityCertificateTable";
import CommonSpaceTable from "@sparcs-clubs/web/features/manage-club/components/CommonSpaceTable";
import PrintingTable from "@sparcs-clubs/web/features/manage-club/components/PrintingTable";
import RentalTable from "@sparcs-clubs/web/features/manage-club/components/RentalTable";

import {
  mockupManageAcf,
  mockupManageCms,
  mockupManagePrint,
  mockupManageRental,
} from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const ServiceManageFrame: React.FC = () => (
  <FoldableSectionTitle title="서비스 신청">
    <FlexWrapper direction="column" gap={40}>
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
    </FlexWrapper>
  </FoldableSectionTitle>
);

export default ServiceManageFrame;
