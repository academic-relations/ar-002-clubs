import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

interface TransportEvidenceBlockProps {
  type: string;
  setType: (value: string) => void;
  origin: string;
  setOrigin: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  purpose: string;
  setPurpose: (value: string) => void;
}

// TODO: transportationEnumId랑 맞추기
const TransportationList = [
  { label: "시내/마을버스", value: "1" },
  { label: "고속/시외버스", value: "2" },
  { label: "철도", value: "3" },
  { label: "택시", value: "4" },
  { label: "전세버스", value: "5" },
  { label: "화물 운반", value: "6" },
  { label: "콜밴", value: "7" },
  { label: "비행기", value: "8" },
  { label: "선박", value: "9" },
  { label: "기타", value: "10" },
];

const TransportEvidenceBlock: React.FC<TransportEvidenceBlockProps> = ({
  type,
  setType,
  origin,
  setOrigin,
  destination,
  setDestination,
  purpose,
  setPurpose,
}) => (
  <FlexWrapper direction="column" gap={8}>
    <EvidenceBlockTitle title="교통비 증빙">
      <Card outline gap={32}>
        <FlexWrapper direction="row" gap={32}>
          <Select
            items={TransportationList}
            label="교통수단"
            placeholder="교통수단을 선택해주세요"
            selectedValue={type}
            onSelect={setType}
          />
          <TextInput
            placeholder="출발지를 입력해주세요"
            label="출발지"
            value={origin}
            handleChange={setOrigin}
          />
          <TextInput
            placeholder="도착지를 입력해주세요"
            label="도착지"
            value={destination}
            handleChange={setDestination}
          />
        </FlexWrapper>
        <TextInput
          area
          placeholder="이용 목적을 입력하세요"
          label="이용 목적"
          value={purpose}
          handleChange={setPurpose}
        />
      </Card>
    </EvidenceBlockTitle>
  </FlexWrapper>
);

export default TransportEvidenceBlock;
