import React from "react";

import { IFundingResponse } from "@sparcs-clubs/interface/api/funding/type/funding.type";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ListItem } from "./FundingInfoList";

const NonCorpEvidenceList: React.FC<{ data: IFundingResponse }> = ({
  data,
}) => (
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

    <ListItem>거래자명: {data.nonCorporateTransaction?.traderName}</ListItem>
    <ListItem>
      거래자 계좌번호: {data.nonCorporateTransaction?.traderAccountNumber}
    </ListItem>
    <ListItem>
      낭비가 아니라는 소명: {data.nonCorporateTransaction?.wasteExplanation}
    </ListItem>
  </FlexWrapper>
);

export default NonCorpEvidenceList;
