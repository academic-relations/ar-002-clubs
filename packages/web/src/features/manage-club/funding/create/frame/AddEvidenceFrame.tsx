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

const AddEvidenceFrame = () => {
  const [toggle, setToggle] = useState(true);

  // TODO: 코드 좀 더 예쁘게 바꾸기
  const [productChecked, setProductChecked] = useState(false);
  const [fixtureChecked, setfixtureChecked] = useState(false);
  const [transportChecked, settransportChecked] = useState(false);
  const [nonCorpChecked, setnonCorpChecked] = useState(false);
  const [foodChecked, setfoodChecked] = useState(false);
  const [laborChecked, setlaborChecked] = useState(false);
  const [externalChecked, setexternalChecked] = useState(false);
  const [publChecked, setpublChecked] = useState(false);
  const [profitChecked, setprofitChecked] = useState(false);
  const [jointChecked, setjointChecked] = useState(false);
  const [etcChecked, setetcChecked] = useState(false);

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
                optionText="물품"
                checked={productChecked}
                onClick={() => setProductChecked(!productChecked)}
              />
              <CheckboxOption
                optionText="비품"
                checked={fixtureChecked}
                onClick={() => setfixtureChecked(!fixtureChecked)}
              />
              <CheckboxOption
                optionText="교통비"
                checked={transportChecked}
                onClick={() => settransportChecked(!transportChecked)}
              />
              <CheckboxOption
                optionText="비법인 거래"
                checked={nonCorpChecked}
                onClick={() => setnonCorpChecked(!nonCorpChecked)}
              />
              <CheckboxOption
                optionText="식비"
                checked={foodChecked}
                onClick={() => setfoodChecked(!foodChecked)}
              />
              <CheckboxOption
                optionText="근로 계약"
                checked={laborChecked}
                onClick={() => setlaborChecked(!laborChecked)}
              />
              <CheckboxOption
                optionText="외부 행사 참가비"
                checked={externalChecked}
                onClick={() => setexternalChecked(!externalChecked)}
              />
              <CheckboxOption
                optionText="발간물"
                checked={publChecked}
                onClick={() => setpublChecked(!publChecked)}
              />
              <CheckboxOption
                optionText="수익 사업"
                checked={profitChecked}
                onClick={() => setprofitChecked(!profitChecked)}
              />
              <CheckboxOption
                optionText="공동 경비"
                checked={jointChecked}
                onClick={() => setjointChecked(!jointChecked)}
              />
              <CheckboxOption
                optionText="기타"
                checked={etcChecked}
                onClick={() => setetcChecked(!etcChecked)}
              />
            </FlexWrapper>
          </FlexWrapper>
        </Card>
        {productChecked && (
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
        {fixtureChecked && (
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
        {transportChecked && (
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
        {nonCorpChecked && (
          <NonCorpEvidenceBlock
            traderName={nonCorpTraderName}
            setTraderName={setNonCorpTraderName}
            traderAccount={nonCorpTraderAccount}
            setTraderAccount={setNonCorpTraderAccount}
            wasteExplanation={nonCorpWasteExplanation}
            setWasteExplanation={setNonCorpWasteExplanation}
          />
        )}
        {foodChecked && (
          <OtherEvidenceBlock
            content="식비"
            value={foodValue}
            onChange={setFoodValue}
          />
        )}
        {laborChecked && (
          <OtherEvidenceBlock
            content="근로 계약"
            value={laborValue}
            onChange={setLaborValue}
          />
        )}
        {externalChecked && (
          <OtherEvidenceBlock
            content="외부 행사 참가비"
            value={externalValue}
            onChange={setExternalValue}
          />
        )}
        {publChecked && (
          <OtherEvidenceBlock
            content="발간물"
            value={publValue}
            onChange={setPublValue}
          />
        )}
        {profitChecked && (
          <OtherEvidenceBlock
            content="수익 사업"
            value={profitValue}
            onChange={setProfitValue}
          />
        )}
        {jointChecked && (
          <OtherEvidenceBlock
            content="공동 경비"
            value={jointValue}
            onChange={setJointValue}
          />
        )}
        {etcChecked && (
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
