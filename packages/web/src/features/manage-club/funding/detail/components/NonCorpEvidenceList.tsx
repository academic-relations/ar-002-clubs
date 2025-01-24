import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/services/_mock/mockFundingDetail";

import { ListItem } from "./FundingInfoList";

const NonCorpEvidenceList = () => (
  <FlexWrapper direction="column" gap={16}>
    <Typography
      ff="PRETENDARD"
      fw="MEDIUM"
      fs={16}
      lh={20}
      color="BLACK"
      style={{ paddingLeft: 2, paddingRight: 2 }}
    >
      비법인 거래
    </Typography>
    {/* TODO: file이랑 연결 */}
    <ListItem>
      거래자명: {mockFundingDetail.nonCorporateTransaction?.traderName}
    </ListItem>
    <ListItem>
      거래자 계좌번호:{" "}
      {mockFundingDetail.nonCorporateTransaction?.traderAccountNumber}
    </ListItem>
    <ListItem>
      낭비가 아니라는 소명:{" "}
      {mockFundingDetail.nonCorporateTransaction?.wasteExplanation}
    </ListItem>
  </FlexWrapper>
);

export default NonCorpEvidenceList;
