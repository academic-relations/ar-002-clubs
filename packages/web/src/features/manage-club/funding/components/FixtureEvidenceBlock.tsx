import React from "react";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

import { useFormContext } from "react-hook-form";

import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import UnitInput from "@sparcs-clubs/web/common/components/Forms/UnitInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { AddEvidence } from "../types/funding";

import EvidenceBlockTitle from "./EvidenceBlockTitle";

interface FixtureEvidenceBlockProps {
  isFixture: boolean;
}

const FixtureEvidenceBlock: React.FC<FixtureEvidenceBlockProps> = ({
  isFixture,
}) => {
  const formCtx = useFormContext<AddEvidence>();
  const { control, watch, setValue } = formCtx;

  const fixtureClassEnumId = watch("fixtureClassEnumId");
  const clubSuppliesClassEnumId = watch("clubSuppliesClassEnumId");
  const fixtureFiles = watch("fixtureSoftwareEvidenceFiles");
  const clubSuppliesFiles = watch("clubSuppliesSoftwareEvidenceFiles");

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
            <FormController
              name={
                isFixture
                  ? "fixtureEvidenceEnumId"
                  : "clubSuppliesEvidenceEnumId"
              }
              control={control}
              renderItem={props => (
                <Select
                  {...props}
                  items={fixtureEvidenceList}
                  label="증빙 분류"
                  placeholder="증빙 분류를 선택해주세요"
                />
              )}
            />
            <FormController
              name={
                isFixture ? "fixtureClassEnumId" : "clubSuppliesClassEnumId"
              }
              control={control}
              renderItem={props => (
                <Select
                  {...props}
                  items={fixtureClassList}
                  label={`${content} 분류`}
                  placeholder={`${content} 분류를 선택해주세요`}
                />
              )}
            />
          </FlexWrapper>
          <FormController
            name={isFixture ? "fixtureName" : "clubSuppliesName"}
            control={control}
            renderItem={props => (
              <TextInput
                {...props}
                placeholder={`${content}명을 입력해주세요`}
                label={`${content}명`}
              />
            )}
          />

          <FlexWrapper direction="row" gap={32}>
            <FormController
              name={isFixture ? "numberOfFixture" : "numberOfClubSupplies"}
              control={control}
              renderItem={props => (
                <ItemNumberInput
                  {...props}
                  label={`${content} 개수`}
                  placeholder={`${content} 개수를 입력해주세요`}
                />
              )}
            />
            <FormController
              name={isFixture ? "priceOfFixture" : "priceOfClubSupplies"}
              control={control}
              renderItem={({ value, onChange }) => (
                <UnitInput
                  label={`${content} 개별 단가`}
                  placeholder={`${content} 개별 단가를 입력해주세요`}
                  unit="원 / 1개"
                  value={value?.toString()}
                  handleChange={onChange}
                  setErrorStatus={() => {}}
                />
              )}
            />
          </FlexWrapper>
          {/* TODO: EvidenceUploadWithText 컴포넌트로 변경 */}
          {(isFixture ? fixtureClassEnumId : clubSuppliesClassEnumId) && (
            <FlexWrapper direction="column" gap={4}>
              <Typography
                ff="PRETENDARD"
                fw="MEDIUM"
                fs={16}
                lh={20}
                color="BLACK"
              >
                {(isFixture ? fixtureClassEnumId : clubSuppliesClassEnumId) ===
                FixtureClassEnum.Software
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
                {(isFixture ? fixtureClassEnumId : clubSuppliesClassEnumId) ===
                FixtureClassEnum.Software
                  ? "* 동아리 성격에 합치하는 활동에 사용하는 소프트웨어라는 소명 필요"
                  : `* ${content} 사용 목적 입력 필요`}
              </Typography>
              <FormController
                name={isFixture ? "fixturePurpose" : "clubSuppliesPurpose"}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    placeholder={
                      (isFixture
                        ? fixtureClassEnumId
                        : clubSuppliesClassEnumId) === FixtureClassEnum.Software
                        ? "소프트웨어 증빙을 입력하세요"
                        : `${content} 증빙을 입력하세요`
                    }
                    area
                  />
                )}
              />
              {isFixture ? (
                <FormController
                  name="fixtureSoftwareEvidenceFiles"
                  required
                  control={control}
                  renderItem={props => (
                    <FileUpload
                      {...props}
                      fileId="fixtureSoftwareEvidenceFiles"
                      multiple
                      initialFiles={fixtureFiles}
                      onChange={files =>
                        setValue("fixtureSoftwareEvidenceFiles", files, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              ) : (
                <FormController
                  name="clubSuppliesSoftwareEvidenceFiles"
                  required
                  control={control}
                  renderItem={props => (
                    <FileUpload
                      {...props}
                      fileId="clubSuppliesSoftwareEvidenceFiles"
                      multiple
                      initialFiles={clubSuppliesFiles}
                      onChange={files =>
                        setValue("clubSuppliesSoftwareEvidenceFiles", files, {
                          shouldValidate: true,
                        })
                      }
                    />
                  )}
                />
              )}
            </FlexWrapper>
          )}
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default FixtureEvidenceBlock;
