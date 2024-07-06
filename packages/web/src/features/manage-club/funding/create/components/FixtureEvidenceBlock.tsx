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
  evidenceValue: string;
  setEvidenceValue: (value: string) => void;
  classValue: string;
  setclassValue: (value: string) => void;
  name: string;
  setName: (value: string) => void;
}

const FixtureEvidenceBlock: React.FC<FixtureEvidenceBlockProps> = ({
  isFixture,
  evidenceValue,
  setEvidenceValue,
  classValue,
  setclassValue,
  name,
  setName,
}) => {
  const content = isFixture ? "비품" : "물품";

  const fixtureEvidenceList = isFixture
    ? [
        { label: `${content} 구매`, value: "1" },
        { label: `${content} 관리`, value: "2" },
      ]
    : [
        { label: `동아리 ${content} 구매`, value: "1" },
        { label: `동아리 ${content} 관리`, value: "2" },
      ];

  // TODO: 관련 enum 생기면 수정
  const fixtureClassList = [
    { label: "전자기기", value: "1" },
    { label: "가구", value: "2" },
    { label: "악기", value: "3" },
    { label: "소프트웨어", value: "4" },
    { label: "기타", value: "5" },
  ];

  return (
    <FlexWrapper direction="column" gap={8}>
      <EvidenceBlockTitle title={`${content} 증빙`}>
        <Card outline gap={32}>
          <FlexWrapper direction="row" gap={32}>
            <Select
              items={fixtureEvidenceList}
              label="증빙 분류"
              placeholder="증빙 분류를 선택해주세요"
              selectedValue={evidenceValue}
              onSelect={setEvidenceValue}
            />
            <Select
              items={fixtureClassList}
              label={`${content} 분류`}
              placeholder={`${content} 분류를 선택해주세요`}
              selectedValue={classValue}
              onSelect={setclassValue}
            />
          </FlexWrapper>
          <TextInput
            placeholder={`${content}명을 입력해주세요`}
            label={`${content}명`}
            value={name}
            handleChange={setName}
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
