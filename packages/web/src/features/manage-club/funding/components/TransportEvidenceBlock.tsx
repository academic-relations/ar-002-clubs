import React, { useEffect, useState } from "react";

import { TransportationEnum as E } from "@sparcs-clubs/interface/common/enum/funding.enum";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { mockParticipantData } from "@sparcs-clubs/web/features/manage-club/activity-report/_mock/mock";
import SelectParticipant from "@sparcs-clubs/web/features/manage-club/activity-report/components/SelectParticipant";

import {
  isParticipantsRequired,
  isPurposeInfoRequired,
} from "@sparcs-clubs/web/utils/isTransportation";

import { FundingFrameProps } from "../frames/FundingInfoFrame";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

const FixedWidthWrapper = styled.div`
  min-width: 200px;
`;

const TransportationList = [
  { label: "시내/마을버스", value: String(E.CityBus) },
  { label: "고속/시외버스", value: String(E.IntercityBus) },
  { label: "철도", value: String(E.Rail) },
  { label: "택시", value: String(E.Taxi) },
  { label: "전세버스", value: String(E.CharterBus) },
  { label: "화물 운반", value: String(E.Cargo) },
  { label: "콜밴", value: String(E.CallVan) },
  { label: "비행기", value: String(E.Airplane) },
  { label: "선박", value: String(E.Ship) },
  { label: "기타", value: String(E.Others) },
];

const purposeInfo = (enumString: string | undefined) => {
  const type = Number(enumString);
  switch (type) {
    case E.Cargo:
      return "* 운반한 화물 목록을 함께 작성해주세요";
    case E.CallVan:
      return "* 운반한 화물 목록을 함께 작성해주세요";
    case E.Airplane:
      return "* 행사 장소의 타당성을 함께 작성해주세요";
    case E.Ship:
      return "* 행사 장소의 타당성을 함께 작성해주세요";
    case E.Others:
      return "* 운반한 화물 목록과 행사 장소의 타당성을 함께 작성해주세요";
    default:
      return "";
  }
};

const TransportEvidenceBlock: React.FC<FundingFrameProps> = ({
  funding,
  setFunding,
}) => {
  const setFundingHandler = (key: string, value: boolean | string) => {
    setFunding({ ...funding, [key]: value });
  };

  const [participants, setParticipants] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setParticipants(
      funding.transportationPassengers.reduce((acc, participant) => {
        const index = mockParticipantData.findIndex(
          data => data.studentId === participant.studentNumber,
        );
        return { ...acc, [index]: true };
      }, {}),
    );
  }, []);

  useEffect(() => {
    setFunding({
      ...funding,
      transportationPassengers: mockParticipantData
        .filter((_, i) => participants[i])
        .map(participant => ({
          studentNumber: participant.studentId,
          name: participant.name,
        })),
    });
  }, [participants, setFunding]);

  return (
    <FlexWrapper direction="column" gap={8}>
      <EvidenceBlockTitle title="교통비 증빙">
        <Card outline gap={32}>
          <FlexWrapper direction="row" gap={32}>
            <FixedWidthWrapper>
              <Select
                items={TransportationList}
                label="교통수단"
                placeholder="교통수단을 선택해주세요"
                selectedValue={funding.transportationEnumId}
                onSelect={value =>
                  setFundingHandler("transportationEnumId", value)
                }
              />
            </FixedWidthWrapper>
            <TextInput
              placeholder="출발지를 입력해주세요"
              label="출발지"
              value={funding.origin}
              handleChange={value => setFundingHandler("origin", value)}
            />
            <TextInput
              placeholder="도착지를 입력해주세요"
              label="도착지"
              value={funding.destination}
              handleChange={value => setFundingHandler("destination", value)}
            />
          </FlexWrapper>
          {isParticipantsRequired(funding.transportationEnumId) && (
            <FlexWrapper direction="column" gap={4}>
              <Typography fs={16} fw="MEDIUM" lh={20}>
                탑승자 명단
              </Typography>
              <SelectParticipant
                data={mockParticipantData}
                onChange={setParticipants}
                value={participants}
              />
            </FlexWrapper>
          )}
          <FlexWrapper direction="column" gap={4}>
            <Typography
              fw="MEDIUM"
              fs={16}
              lh={20}
              style={{ paddingLeft: 2, paddingRight: 2 }}
            >
              이용 목적
            </Typography>
            {isPurposeInfoRequired(funding.transportationEnumId) && (
              <Typography
                fw="REGULAR"
                fs={14}
                lh={20}
                color="GRAY.600"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {purposeInfo(funding.transportationEnumId)}
              </Typography>
            )}
            <TextInput
              area
              placeholder="이용 목적을 입력하세요"
              value={funding.purposeOfTransportation}
              handleChange={value =>
                setFundingHandler("purposeOfTransportation", value)
              }
            />
          </FlexWrapper>
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default TransportEvidenceBlock;
