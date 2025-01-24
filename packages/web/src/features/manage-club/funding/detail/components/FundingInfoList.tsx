import * as React from "react";

import { IFundingResponse } from "@sparcs-clubs/interface/api/funding/type/funding.type";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

interface FundingInfoListProps {
  data: IFundingResponse;
}

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

const FundingInfoList: React.FC<FundingInfoListProps> = ({ data }) => (
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
    <ListItem>항목명: {data.name}</ListItem>
    <ListItem>
      지출 목적: {data.purposeActivity?.name ?? "활동보고서로 증빙 불가"}
    </ListItem>
    <ListItem>지출 일자: {formatDate(data.expenditureDate)}</ListItem>
    <ListItem>지출 금액: {data.expenditureAmount.toLocaleString()}원</ListItem>
  </FlexWrapper>
);

export default FundingInfoList;
