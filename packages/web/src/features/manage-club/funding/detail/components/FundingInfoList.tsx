import React from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/service/_mock/mockFundingDetail";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formateDate";

export const ListItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.BLACK};

  &:before {
    content: "•";
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const FundingInfoList = () => (
  <FlexWrapper direction="column" gap={16}>
    <Typography
      ff="PRETENDARD"
      fw="MEDIUM"
      fs={16}
      lh={20}
      color="BLACK"
      style={{ paddingLeft: 2, paddingRight: 2 }}
    >
      지원금 정보
    </Typography>
    <ListItem>항목명: {mockFundingDetail.name}</ListItem>
    {/* TODO: purposeId 연결하기 */}
    <ListItem>지출 목적: ~~~~</ListItem>
    <ListItem>
      지출 일자: {formatDate(mockFundingDetail.expenditureDate)}
    </ListItem>
    <ListItem>
      지출 금액: {mockFundingDetail.expenditureAmount.toLocaleString()}원
    </ListItem>
  </FlexWrapper>
);

export default FundingInfoList;
