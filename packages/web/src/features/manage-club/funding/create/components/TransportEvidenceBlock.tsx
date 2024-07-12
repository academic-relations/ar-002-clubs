import React from "react";

import { TransportationEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

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
  { label: "시내/마을버스", value: String(TransportationEnum.CityBus) },
  { label: "고속/시외버스", value: String(TransportationEnum.IntercityBus) },
  { label: "철도", value: String(TransportationEnum.Rail) },
  { label: "택시", value: String(TransportationEnum.Taxi) },
  { label: "전세버스", value: String(TransportationEnum.CharterBus) },
  { label: "화물 운반", value: String(TransportationEnum.Cargo) },
  { label: "콜밴", value: String(TransportationEnum.CallVan) },
  { label: "비행기", value: String(TransportationEnum.Airplane) },
  { label: "선박", value: String(TransportationEnum.Ship) },
  { label: "기타", value: String(TransportationEnum.Others) },
];

const purposeInfo = (type: TransportationEnum) => {
  switch (type) {
    case TransportationEnum.Cargo || TransportationEnum.CallVan:
      return "* 운반한 화물 목록을 함께 작성해주세요";
    case TransportationEnum.Airplane || TransportationEnum.Ship:
      return "* 행사 장소의 타당성을 함께 작성해주세요";
    case TransportationEnum.Others:
      return "* 운반한 화물 목록과 행사 장소의 타당성을 함께 작성해주세요";
    default:
      return "";
  }
};

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
        {(type === String(TransportationEnum.Taxi) ||
          type === String(TransportationEnum.CharterBus) ||
          type === String(TransportationEnum.CallVan) ||
          type === String(TransportationEnum.Airplane) ||
          type === String(TransportationEnum.Ship) ||
          type === String(TransportationEnum.Others)) && (
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
        <FlexWrapper direction="column" gap={4}>
          <Typography
            ff="PRETENDARD"
            fw="MEDIUM"
            fs={16}
            lh={20}
            color="BLACK"
            style={{ paddingLeft: 2, paddingRight: 2 }}
          >
            이용 목적
          </Typography>
          {(type === String(TransportationEnum.Cargo) ||
            type === String(TransportationEnum.CallVan) ||
            type === String(TransportationEnum.Airplane) ||
            type === String(TransportationEnum.Ship) ||
            type === String(TransportationEnum.Others)) && (
            <Typography
              ff="PRETENDARD"
              fw="REGULAR"
              fs={14}
              lh={20}
              color="GRAY.600"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {purposeInfo(Number(type))}
            </Typography>
          )}
          <TextInput
            area
            placeholder="이용 목적을 입력하세요"
            value={purpose}
            handleChange={setPurpose}
          />
        </FlexWrapper>
      </Card>
    </EvidenceBlockTitle>
  </FlexWrapper>
);

export default TransportEvidenceBlock;
