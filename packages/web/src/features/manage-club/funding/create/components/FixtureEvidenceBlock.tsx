import React from "react";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

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
  const content = isFixture ? "비품" : "동아리 용품";

  const fixtureEvidenceList = [
    { label: `${content} 구매`, value: String(FixtureEvidenceEnum.Purchase) },
    { label: `${content} 관리`, value: String(FixtureEvidenceEnum.Management) },
  ];

  const fixtureClassList = [
    { label: "전자기기", value: String(FixtureClassEnum.Electronics) },
    { label: "가구", value: String(FixtureClassEnum.Furniture) },
    { label: "악기", value: String(FixtureClassEnum.MusicalInstruments) },
    { label: "소프트웨어", value: String(FixtureClassEnum.Software) },
    { label: "기타", value: String(FixtureClassEnum.Others) },
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
          {/* TODO: EvidenceUploadWithText 컴포넌트로 변경 */}
          {classValue && (
            <FlexWrapper direction="column" gap={4}>
              <Typography
                ff="PRETENDARD"
                fw="MEDIUM"
                fs={16}
                lh={20}
                color="BLACK"
              >
                {classValue === String(FixtureClassEnum.Software)
                  ? "소프트웨어 증빙"
                  : `${content} 증빙`}
              </Typography>
              <Typography
                ff="PRETENDARD"
                fw="REGULAR"
                fs={14}
                lh={20}
                color="GRAY.600"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {classValue === String(FixtureClassEnum.Software)
                  ? "* 동아리 성격에 합치하는 활동에 사용하는 소프트웨어라는 소명 필요"
                  : `* ${content} 사용 목적 입력 필요`}
              </Typography>
              <TextInput
                placeholder={
                  classValue === String(FixtureClassEnum.Software)
                    ? "소프트웨어 증빙을 입력하세요"
                    : `${content} 증빙을 입력하세요`
                }
                area
              />
              <FileUpload />
            </FlexWrapper>
          )}
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default FixtureEvidenceBlock;
