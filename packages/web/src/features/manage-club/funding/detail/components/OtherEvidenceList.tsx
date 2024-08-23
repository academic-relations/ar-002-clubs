import React from "react";

import ThumbnailPreviewList from "@sparcs-clubs/web/common/components/File/ThumbnailPreviewList";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { ListItem } from "./FundingInfoList";

interface OtherEvidenceListProps {
  content: string;
  explanation: string;
  //   fileList: { uid: string; link: string }[];
}

const OtherEvidenceList: React.FC<OtherEvidenceListProps> = ({
  content,
  explanation,
  //   fileList,
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
      {content}
    </Typography>
    <ListItem>
      {content} 증빙: {explanation}
    </ListItem>
    {/* TODO: file 연결 */}
    <FlexWrapper direction="column" gap={12} style={{ paddingLeft: 24 }}>
      <ThumbnailPreviewList
        fileList={[
          {
            name: "something.pdf",
            src: "https://pdfobject.com/pdf/sample.pdf",
          },
          {
            name: "something.pdf",
            src: "https://pdfobject.com/pdf/sample.pdf",
          },
        ]}
      />
    </FlexWrapper>
  </FlexWrapper>
);

export default OtherEvidenceList;
