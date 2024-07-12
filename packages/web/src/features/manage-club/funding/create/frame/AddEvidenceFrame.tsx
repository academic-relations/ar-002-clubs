import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import FixtureEvidenceBlock from "../components/FixtureEvidenceBlock";
import NonCorpEvidenceBlock from "../components/NonCorpEvidenceBlock";
import OtherEvidenceBlock from "../components/OtherEvidenceBlock";
import TransportEvidenceBlock from "../components/TransportEvidenceBlock";

import { FundingFrameProps } from "./FundingInfoFrame";

const AddEvidenceFrame: React.FC<FundingFrameProps> = ({
  funding,
  setFunding,
}) => {
  const [toggle, setToggle] = useState(true);

  const [productEvidenceValue, setProductEvidenceValue] = useState("");
  const [productClassValue, setProductClassValue] = useState("");
  const [productName, setProductName] = useState("");
  const [fixtureEvidenceValue, setFixtureEvidenceValue] = useState("");
  const [fixtureClassValue, setFixtureClassValue] = useState("");
  const [fixtureName, setFixtureName] = useState("");

  const [transportType, setTransportType] = useState("");
  const [transportOrigin, setTransportOrigin] = useState("");
  const [transportDestination, setTransportDestination] = useState("");
  const [transportPurpose, setTransportPurpose] = useState("");

  const [nonCorpTraderName, setNonCorpTraderName] = useState("");
  const [nonCorpTraderAccount, setNonCorpTraderAccount] = useState("");
  const [nonCorpWasteExplanation, setNonCorpWasteExplanation] = useState("");

  const [foodValue, setFoodValue] = useState("");
  const [laborValue, setLaborValue] = useState("");
  const [externalValue, setExternalValue] = useState("");
  const [publValue, setPublValue] = useState("");
  const [profitValue, setProfitValue] = useState("");
  const [jointValue, setJointValue] = useState("");
  const [etcValue, setEtcValue] = useState("");

  return (
    <FoldableSectionTitle
      title="추가 증빙"
      toggle={toggle}
      toggleHandler={() => setToggle(!toggle)}
    >
      <FlexWrapper direction="column" gap={40}>
        <Card outline>
          <FlexWrapper direction="column" gap={16}>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              추가 증빙 분류
            </Typography>
            <FlexWrapper direction="column" gap={12}>
              <CheckboxOption
                optionText="동아리 용품"
                checked={funding.purposeId === "0"}
                onClick={() => {}}
              />
              <CheckboxOption
                optionText="비품"
                checked={funding.isFixture}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isFixture: !funding.isFixture,
                  })
                }
              />
              <CheckboxOption
                optionText="교통비"
                checked={funding.isTransportation}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isTransportation: !funding.isTransportation,
                  })
                }
              />
              <CheckboxOption
                optionText="비법인 거래"
                checked={funding.isNonCorporateTransaction}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isNonCorporateTransaction:
                      !funding.isNonCorporateTransaction,
                  })
                }
              />
              <CheckboxOption
                optionText="식비"
                checked={funding.isFoodExpense}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isFoodExpense: !funding.isFoodExpense,
                  })
                }
              />
              <CheckboxOption
                optionText="근로 계약"
                checked={funding.isLaborContract}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isLaborContract: !funding.isLaborContract,
                  })
                }
              />
              <CheckboxOption
                optionText="외부 행사 참가비"
                checked={funding.isExternalEventParticipationFee}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isExternalEventParticipationFee:
                      !funding.isExternalEventParticipationFee,
                  })
                }
              />
              <CheckboxOption
                optionText="발간물"
                checked={funding.isPublication}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isPublication: !funding.isPublication,
                  })
                }
              />
              <CheckboxOption
                optionText="수익 사업"
                checked={funding.isProfitMakingActivity}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isProfitMakingActivity: !funding.isProfitMakingActivity,
                  })
                }
              />
              <CheckboxOption
                optionText="공동 경비"
                checked={funding.isJointExpense}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isJointExpense: !funding.isJointExpense,
                  })
                }
              />
              <CheckboxOption
                optionText="기타"
                checked={funding.isEtcExpense}
                onClick={() =>
                  setFunding({
                    ...funding,
                    isEtcExpense: !funding.isEtcExpense,
                  })
                }
              />
            </FlexWrapper>
          </FlexWrapper>
        </Card>
        {funding.purposeId === "0" && (
          <FixtureEvidenceBlock
            isFixture={false}
            evidenceValue={productEvidenceValue}
            setEvidenceValue={setProductEvidenceValue}
            classValue={productClassValue}
            setclassValue={setProductClassValue}
            name={productName}
            setName={setProductName}
          />
        )}
        {funding.isFixture && (
          <FixtureEvidenceBlock
            isFixture
            evidenceValue={fixtureEvidenceValue}
            setEvidenceValue={setFixtureEvidenceValue}
            classValue={fixtureClassValue}
            setclassValue={setFixtureClassValue}
            name={fixtureName}
            setName={setFixtureName}
          />
        )}
        {funding.isTransportation && (
          <TransportEvidenceBlock
            type={transportType}
            setType={setTransportType}
            origin={transportOrigin}
            setOrigin={setTransportOrigin}
            destination={transportDestination}
            setDestination={setTransportDestination}
            purpose={transportPurpose}
            setPurpose={setTransportPurpose}
          />
        )}
        {funding.isNonCorporateTransaction && (
          <NonCorpEvidenceBlock
            traderName={nonCorpTraderName}
            setTraderName={setNonCorpTraderName}
            traderAccount={nonCorpTraderAccount}
            setTraderAccount={setNonCorpTraderAccount}
            wasteExplanation={nonCorpWasteExplanation}
            setWasteExplanation={setNonCorpWasteExplanation}
          />
        )}
        {funding.isFoodExpense && (
          <OtherEvidenceBlock
            content="식비"
            value={foodValue}
            onChange={setFoodValue}
          />
        )}
        {funding.isLaborContract && (
          <OtherEvidenceBlock
            content="근로 계약"
            value={laborValue}
            onChange={setLaborValue}
          />
        )}
        {funding.isExternalEventParticipationFee && (
          <OtherEvidenceBlock
            content="외부 행사 참가비"
            value={externalValue}
            onChange={setExternalValue}
          />
        )}
        {funding.isPublication && (
          <OtherEvidenceBlock
            content="발간물"
            value={publValue}
            onChange={setPublValue}
          />
        )}
        {funding.isProfitMakingActivity && (
          <OtherEvidenceBlock
            content="수익 사업"
            value={profitValue}
            onChange={setProfitValue}
          />
        )}
        {funding.isJointExpense && (
          <OtherEvidenceBlock
            content="공동 경비"
            value={jointValue}
            onChange={setJointValue}
          />
        )}
        {funding.isEtcExpense && (
          <OtherEvidenceBlock
            content="기타"
            value={etcValue}
            onChange={setEtcValue}
          />
        )}
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};
export default AddEvidenceFrame;
