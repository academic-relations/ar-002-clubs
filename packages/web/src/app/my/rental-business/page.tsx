"use client";

import React from "react";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockupMyRental } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClub";
import MyRentalTable from "@sparcs-clubs/web/features/rental-business/components/MyRentalTable";

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
`;

const MyRentalBusiness = () => (
  <FlexWrapper direction="column" gap={20}>
    <PageHead
      items={[
        { name: "마이페이지", path: "/my" },
        { name: "대여 사업 신청 내역", path: "/my/rental-business" },
      ]}
      title="대여 사업 신청 내역"
    />
    <TableWithCount>
      <Typography fs={16} lh={20} color="GRAY.600">
        총 {mockupMyRental.items.length}개
      </Typography>
      <MyRentalTable rentalList={mockupMyRental} />
    </TableWithCount>
  </FlexWrapper>
);

export default MyRentalBusiness;
