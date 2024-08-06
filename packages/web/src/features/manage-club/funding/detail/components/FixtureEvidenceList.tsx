import React from "react";

import FilePreview from "@sparcs-clubs/web/common/components/FilePreview";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/services/_mock/mockFundingDetail";

import {
  classEnumMap,
  evidenceEnumMap,
} from "@sparcs-clubs/web/utils/fundingEnumMap";

import { ListItem } from "./FundingInfoList";

interface FixtureEvidenceListProps {
  isFixture?: boolean;
}

const FixtureEvidenceList: React.FC<FixtureEvidenceListProps> = ({
  isFixture = false,
}) => {
  const content = isFixture ? "비품" : "동아리 용품";

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
      <FlexWrapper direction="column" gap={12} style={{ paddingLeft: 24 }}>
        <Typography ff="PRETENDARD" fw="REGULAR" fs={14} lh={16} color="BLACK">
          {isFixture
            ? mockFundingDetail.fixturePurpose
            : mockFundingDetail.clubSuppliesPurpose}
        </Typography>
        <FilePreview fileName="something.pdf" />
        <FilePreview fileName="something.pdf" />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default FixtureEvidenceList;
