import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { FundingFrameProps } from "./FundingInfoFrame";

const BasicEvidenceFrame: React.FC<FundingFrameProps> = ({
  funding,
  setFunding,
}) => (
  <FoldableSectionTitle title="필수 증빙">
    <Card outline gap={32}>
      <FlexWrapper direction="column" gap={4}>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          거래 사실 증빙
        </Typography>
        <FileUpload />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={4}>
        <Typography ff="PRETENDARD" fw="MEDIUM" fs={16} lh={20} color="BLACK">
          거래 세부항목 증빙
        </Typography>
        <TextInput
          placeholder="거래 세부항목 증빙을 입력하세요"
          area
          value={funding.tradeDetailExplanation}
          handleChange={value =>
            setFunding({ ...funding, tradeDetailExplanation: value })
          }
        />
        <FileUpload />
      </FlexWrapper>
    </Card>
  </FoldableSectionTitle>
);
export default BasicEvidenceFrame;
