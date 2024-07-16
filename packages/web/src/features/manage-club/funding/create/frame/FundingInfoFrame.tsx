import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import { FundingInterface } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

export interface FundingFrameProps {
  funding: FundingInterface;
  setFunding: React.Dispatch<React.SetStateAction<FundingInterface>>;
}

const FundingInfoFrame: React.FC<FundingFrameProps> = ({
  funding,
  setFunding,
}) => {
  const [toggle, setToggle] = useState<boolean>(true);

  const purposeItems = [
    { value: "1", label: "활동보고서 1" },
    { value: "2", label: "활동보고서 2" },
    { value: "3", label: "활동보고서 3" },
    { value: "0", label: "활동보고서로 증빙 불가" },
  ];
  const setFundingHandler = (key: string, value: string) => {
    setFunding({ ...funding, [key]: value });
  };

  return (
    <FoldableSectionTitle
      title="지원금 정보"
      toggle={toggle}
      toggleHandler={() => setToggle(!toggle)}
    >
      <Card outline gap={32}>
        <TextInput
          label="항목명"
          placeholder="항목명을 입력하세요"
          value={funding.name}
          handleChange={value => setFundingHandler("name", value)}
        />
        <FlexWrapper direction="row" gap={32}>
          <Select
            items={purposeItems}
            label="지출 목적"
            selectedValue={funding.purposeId}
            onSelect={value => setFundingHandler("purposeId", value)}
            placeholder="지출 목적을 선택해주세요"
          />
          {/* TODO: 지출 일자, 지출 금액 해당 컴포넌트로 구현 */}
          <TextInput
            label="지출 일자"
            placeholder="20XX.XX.XX"
            value={funding.expenditureDate}
            handleChange={value => setFundingHandler("expenditureDate", value)}
          />
          <TextInput
            label="지출 금액"
            placeholder="금액을 입력해주세요"
            value={funding.expenditureAmount}
            handleChange={value =>
              setFundingHandler("expenditureAmount", value)
            }
          />
        </FlexWrapper>
      </Card>
    </FoldableSectionTitle>
  );
};
export default FundingInfoFrame;
