import React from "react";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

import FilePreview from "@sparcs-clubs/web/common/components/FilePreview";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/service/_mock/mockFundingDetail";

import { FileWrapper } from "./BasicEvidenceList";
import { ListItem } from "./FundingInfoList";

interface FixtureEvidenceListProps {
  isFixture?: boolean;
}

const FixtureEvidenceList: React.FC<FixtureEvidenceListProps> = ({
  isFixture = false,
}) => {
  const content = isFixture ? "비품" : "동아리 용품";

  const evidenceEnumMap = (enumValue?: FixtureEvidenceEnum): string => {
    if (enumValue === FixtureEvidenceEnum.Management) {
      return "관리";
    }
    if (enumValue === FixtureEvidenceEnum.Purchase) {
      return "구매";
    }
    return "";
  };

  const classEnumMap = (enumValue?: FixtureClassEnum): string => {
    if (enumValue === FixtureClassEnum.Furniture) {
      return "가구";
    }
    if (enumValue === FixtureClassEnum.Software) {
      return "소프트웨어";
    }
    if (enumValue === FixtureClassEnum.Electronics) {
      return "전자기기";
    }
    if (enumValue === FixtureClassEnum.MusicalInstruments) {
      return "악기";
    }
    if (enumValue === FixtureClassEnum.Others) {
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
        {content} 증빙
      </Typography>
      <ListItem>
        증빙 분류: {content}{" "}
        {evidenceEnumMap(
          isFixture
            ? mockFundingDetail.fixtureEvidenceEnumId
            : mockFundingDetail.clubSuppliesEvidenceEnumId,
        )}
      </ListItem>
      <ListItem>
        {content} 분류:{" "}
        {classEnumMap(
          isFixture
            ? mockFundingDetail.fixtureClassEnumId
            : mockFundingDetail.clubSuppliesClassEnumId,
        )}
      </ListItem>
      <ListItem>
        {content}명:{" "}
        {isFixture
          ? mockFundingDetail.fixtureName
          : mockFundingDetail.clubSuppliesName}
      </ListItem>
      <ListItem>{content} 증빙</ListItem>
      {/* TODO: file이랑 연결 */}
      <FileWrapper>
        <Typography ff="PRETENDARD" fw="REGULAR" fs={14} lh={16} color="BLACK">
          {isFixture
            ? mockFundingDetail.fixturePurpose
            : mockFundingDetail.clubSuppliesPurpose}
        </Typography>
        <FilePreview fileName="something.pdf" />
        <FilePreview fileName="something.pdf" />
      </FileWrapper>
    </FlexWrapper>
  );
};

export default FixtureEvidenceList;
