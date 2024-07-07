import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

interface NonCorpEvidenceBlockProps {
  traderName: string;
  setTraderName: (value: string) => void;
  traderAccount: string;
  setTraderAccount: (value: string) => void;
  wasteExplanation: string;
  setWasteExplanation: (value: string) => void;
}

const FixedWidthWrapper = styled.div`
  min-width: 200px;
`;

const NonCorpEvidenceBlock: React.FC<NonCorpEvidenceBlockProps> = ({
  traderName,
  setTraderName,
  traderAccount,
  setTraderAccount,
  wasteExplanation,
  setWasteExplanation,
}) => (
  <FlexWrapper direction="column" gap={4}>
    <EvidenceBlockTitle title="비법인 거래 증빙">
      <Card outline gap={32}>
        <FlexWrapper direction="row" gap={32}>
          <FixedWidthWrapper>
            <TextInput
              placeholder="거래자명을 입력하세요"
              label="거래자명"
              value={traderName}
              handleChange={setTraderName}
            />
          </FixedWidthWrapper>
          <TextInput
            placeholder="거래자 계좌번호를 입력하세요"
            label="거래자 계좌번호"
            value={traderAccount}
            handleChange={setTraderAccount}
          />
        </FlexWrapper>
        <TextInput
          area
          placeholder="낭비가 아니라는 소명을 입력하세요"
          label="낭비가 아니라는 소명"
          value={wasteExplanation}
          handleChange={setWasteExplanation}
        />
      </Card>
    </EvidenceBlockTitle>
  </FlexWrapper>
);

export default NonCorpEvidenceBlock;
