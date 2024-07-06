import React, { useState } from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

const FundingInfoFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [selectedPurpose, setSelectedPurpose] = useState<string>("");

  const purposeItems = [
    { value: "1", label: "활동보고서 1" },
    { value: "2", label: "활동보고서 2" },
    { value: "3", label: "활동보고서 3" },
    { value: "0", label: "활동보고서로 증빙 불가" },
  ];

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
          value={name}
          handleChange={setName}
        />
        <FlexWrapper direction="row" gap={32}>
          <Select
            items={purposeItems}
            label="지출 목적"
            selectedValue={selectedPurpose}
            onSelect={setSelectedPurpose}
            placeholder="지출 목적을 선택해주세요"
          />
          {/* TODO: 지출 일자, 지출 금액 해당 컴포넌트로 구현 */}
          <TextInput
            label="지출 일자"
            placeholder="20XX.XX.XX"
            value={date}
            handleChange={setDate}
          />
          <TextInput
            label="지출 금액"
            placeholder="금액을 입력해주세요"
            value={amount}
            handleChange={setAmount}
          />
        </FlexWrapper>
      </Card>
    </FoldableSectionTitle>
  );
};
export default FundingInfoFrame;
