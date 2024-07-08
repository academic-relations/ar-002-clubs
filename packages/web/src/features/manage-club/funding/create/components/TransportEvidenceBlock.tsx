import React from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockParticipantData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";

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

const FixedWidthWrapper = styled.div`
  min-width: 200px;
`;

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
          <FixedWidthWrapper>
            <Select
              items={TransportationList}
              label="교통수단"
              placeholder="교통수단을 선택해주세요"
              selectedValue={type}
              onSelect={setType}
            />
          </FixedWidthWrapper>
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
        {/* TODO: readable하게 고치기 (Enum 사용) */}
        {(type === "4" || type === "8" || type === "10") && (
          <FlexWrapper direction="column" gap={4}>
            <Typography
              ff="PRETENDARD"
              fs={16}
              fw="MEDIUM"
              lh={20}
              color="BLACK"
            >
              탑승자 명단
            </Typography>
            <SelectParticipant data={mockParticipantData} />
          </FlexWrapper>
        )}
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
