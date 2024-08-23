import React from "react";

import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
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
    {/* TODO: file이랑 연결 */}
    <ListItem>거래 사실 증빙</ListItem>
    <FlexWrapper direction="column" gap={12} style={{ paddingLeft: 24 }}>
      <ThumbnailPreviewList
        fileList={[
          {
            name: "거래 사실 증빙.pdf",
            src: "https://pdfobject.com/pdf/sample.pdf",
          },
        ]}
      />
    </FlexWrapper>
    <ListItem>거래 세부항목 증빙</ListItem>
    <FlexWrapper direction="column" gap={12} style={{ paddingLeft: 24 }}>
      <ThumbnailPreviewList
        fileList={[
          {
            name: "거래 세부항목 증빙.pdf",
            src: "https://pdfobject.com/pdf/sample.pdf",
          },
        ]}
      />
    </FlexWrapper>
  </FlexWrapper>
);

export default BasicEvidenceList;
