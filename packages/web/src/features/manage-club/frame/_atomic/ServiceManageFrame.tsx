import React from "react";
import styled from "styled-components";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";

const ServiceManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ServiceManageFrame: React.FC = () => (
  <ServiceManageWrapper>
    (서비스 신청)
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
  </ServiceManageWrapper>
);

export default ServiceManageFrame;
