import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ListItem } from "./FundingInfoList";

const BasicEvidenceList = () => (
  <FlexWrapper direction="column" gap={16}>
    <Typography
      ff="PRETENDARD"
      fw="MEDIUM"
      fs={16}
      lh={20}
      color="BLACK"
      style={{ paddingLeft: 2, paddingRight: 2 }}
    >
      필수 증빙
    </Typography>
    <ListItem>거래 사실 증빙</ListItem>
    <ListItem>거래 세부항목 증빙</ListItem>
  </FlexWrapper>
);

export default BasicEvidenceList;
