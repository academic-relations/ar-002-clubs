import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import { FundingFrameProps } from "../frames/FundingInfoFrame";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

const FixedWidthWrapper = styled.div`
  min-width: 200px;
`;

const NonCorpEvidenceBlock: React.FC<FundingFrameProps> = ({
  funding,
  setFunding,
}) => {
  const setFundingHandler = (key: string, value: boolean | string) => {
    setFunding({ ...funding, [key]: value });
  };

  return (
    <FlexWrapper direction="column" gap={4}>
      <EvidenceBlockTitle title="비법인 거래 증빙">
        <Card outline gap={32}>
          <FlexWrapper direction="row" gap={32}>
            <FixedWidthWrapper>
              <TextInput
                placeholder="거래자명을 입력하세요"
                label="거래자명"
                value={funding.traderName}
                handleChange={value => setFundingHandler("traderName", value)}
              />
            </FixedWidthWrapper>
            <TextInput
              placeholder="거래자 계좌번호를 입력하세요"
              label="거래자 계좌번호"
              value={funding.traderAccountNumber}
              handleChange={value =>
                setFundingHandler("traderAccountNumber", value)
              }
            />
          </FlexWrapper>
          <TextInput
            area
            placeholder="낭비가 아니라는 소명을 입력하세요"
            label="낭비가 아니라는 소명"
            value={funding.wasteExplanation}
            handleChange={value => setFundingHandler("wasteExplanation", value)}
          />
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default NonCorpEvidenceBlock;
