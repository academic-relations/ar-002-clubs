import React from "react";

import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

interface FixtureEvidenceBlockProps {
  isFixture: boolean;
}

const FixtureEvidenceBlock: React.FC<FixtureEvidenceBlockProps> = ({
  isFixture,
}) => {
  const content = isFixture ? "비품" : "물품";
  return (
    <FlexWrapper direction="column" gap={8}>
      <EvidenceBlockTitle title={`${content} 증빙`}>
        <Card outline gap={32}>
          <FlexWrapper direction="row" gap={32}>
            <Select
              items={[]}
              label="증빙 분류"
              placeholder="증빙 분류를 선택해주세요"
            />
            <Select
              items={[]}
              label={`${content} 분류`}
              placeholder={`${content} 분류를 선택해주세요`}
            />
          </FlexWrapper>
          <TextInput
            placeholder={`${content}명을 입력해주세요`}
            label={`${content}명`}
          />
          <FlexWrapper direction="column" gap={4}>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              {`${content} 증빙`}
            </Typography>
            <Typography
              ff="PRETENDARD"
              fw="REGULAR"
              fs={14}
              lh={20}
              color="GRAY.600"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {`* ${content} 사용 목적 입력 필요`}
            </Typography>
            <TextInput placeholder={`${content} 증빙을 입력하세요.`} area />
            <FileUpload placeholder="파일을 선택해주세요" />
          </FlexWrapper>
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default FixtureEvidenceBlock;
