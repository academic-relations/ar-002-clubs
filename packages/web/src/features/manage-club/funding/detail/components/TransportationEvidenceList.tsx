import React from "react";

import { TransportationEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/service/_mock/mockFundingDetail";

import { FileWrapper } from "./BasicEvidenceList";
import { ListItem } from "./FundingInfoList";

const TransportationEvidenceList = () => {
  const transportationEnumMap = (enumValue?: TransportationEnum): string => {
    if (enumValue === TransportationEnum.CityBus) {
      return "시내/마을버스";
    }
    if (enumValue === TransportationEnum.IntercityBus) {
      return "고속/시외버스";
    }
    if (enumValue === TransportationEnum.Rail) {
      return "철도";
    }
    if (enumValue === TransportationEnum.Taxi) {
      return "택시";
    }
    if (enumValue === TransportationEnum.CharterBus) {
      return "전세버스";
    }
    if (enumValue === TransportationEnum.Cargo) {
      return "화물 운반";
    }
    if (enumValue === TransportationEnum.CallVan) {
      return "콜밴";
    }
    if (enumValue === TransportationEnum.Airplane) {
      return "비행기";
    }
    if (enumValue === TransportationEnum.Ship) {
      return "선박";
    }
    if (enumValue === TransportationEnum.Others) {
      return "기타";
    }
    return "";
  };

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography
        ff="PRETENDARD"
        fw="MEDIUM"
        fs={16}
        lh={20}
        color="BLACK"
        style={{ paddingLeft: 2, paddingRight: 2 }}
      >
        교통비
      </Typography>
      <ListItem>
        교통수단:{" "}
        {transportationEnumMap(mockFundingDetail.transportationEnumId)}
      </ListItem>
      <ListItem>출발지: {mockFundingDetail.origin}</ListItem>
      <ListItem>도착지: {mockFundingDetail.destination}</ListItem>
      <ListItem>
        탑승자 명단 ({mockFundingDetail.transportationPassengers.length}명)
      </ListItem>
      <FileWrapper>
        {mockFundingDetail.transportationPassengers.map(passenger => (
          <Typography
            key={passenger.name}
            ff="PRETENDARD"
            fw="REGULAR"
            fs={14}
            lh={16}
            color="BLACK"
          >
            {passenger.studentNumber} {passenger.name}
          </Typography>
        ))}
      </FileWrapper>
      <ListItem>
        이용 목적: {mockFundingDetail.purposeOfTransportation}
      </ListItem>
    </FlexWrapper>
  );
};

export default TransportationEvidenceList;
