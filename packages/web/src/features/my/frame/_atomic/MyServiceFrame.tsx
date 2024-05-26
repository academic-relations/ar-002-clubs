import React from "react";

import MoreDetailTitle from "@sparcs-clubs/web/common/components/MoreDetailTitle";
import {
  ManageTablesWrapper,
  ManageWrapper,
  SectionWrapper,
} from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import {
  mockupMyAcf,
  mockupMyCms,
  mockupMyPrint,
  mockupMyRental,
} from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import MyRentalTable from "@sparcs-clubs/web/features/my/component/MyRentalTable";
import MyActivityCertificateTable from "@sparcs-clubs/web/features/my/component/MyActivityCertificateTable";
import MyCommonSpaceTable from "@sparcs-clubs/web/features/my/component/MyCommonSpaceTable";
import MyPrintingTable from "@sparcs-clubs/web/features/my/component/MyPrintingTable";

const MyServiceFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="서비스 신청 내역"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <ManageTablesWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="대여 사업"
              moreDetail="내역 더보기"
              moreDetailPath="/my/rental-business"
            />
            <MyRentalTable rentalList={mockupMyRental} />
          </SectionWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="홍보물 인쇄"
              moreDetail="내역 더보기"
              moreDetailPath="/my/printing-business"
            />
            <MyPrintingTable printingList={mockupMyPrint} />
          </SectionWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="활동확인서 발급"
              moreDetail="내역 더보기"
              moreDetailPath="/my/activity-certificate"
            />
            <MyActivityCertificateTable certificateList={mockupMyAcf} />
          </SectionWrapper>
          <SectionWrapper>
            <MoreDetailTitle
              title="공용공간 비정기사용"
              moreDetail="내역 더보기"
              moreDetailPath="/my/common-space"
            />
            <MyCommonSpaceTable spaceList={mockupMyCms} />
          </SectionWrapper>
        </ManageTablesWrapper>
      )}
    </ManageWrapper>
  );
};

export default MyServiceFrame;
