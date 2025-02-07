import React from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";

import { AddEvidence } from "../types/funding";
import EvidenceBlockTitle from "./EvidenceBlockTitle";

const FixedWidthWrapper = styled.div`
  min-width: 200px;
`;

const NonCorpEvidenceBlock: React.FC<{ required?: boolean }> = ({
  required = false,
}) => {
  const formCtx = useFormContext<AddEvidence>();
  const { control, watch, setValue } = formCtx;

  const nonCorporateTransactionFiles = watch("nonCorporateTransactionFiles");

  return (
    <FlexWrapper direction="column" gap={4}>
      <EvidenceBlockTitle title="비법인 거래 증빙">
        <Card outline gap={32}>
          <FlexWrapper direction="row" gap={32}>
            <FixedWidthWrapper>
              <FormController
                name="traderName"
                required={required}
                control={control}
                renderItem={props => (
                  <TextInput
                    {...props}
                    placeholder="거래자명을 입력하세요"
                    label="거래자명"
                  />
                )}
              />
            </FixedWidthWrapper>
            <FormController
              name="traderAccountNumber"
              required={required}
              control={control}
              renderItem={props => (
                <TextInput
                  {...props}
                  placeholder="거래자 계좌번호를 입력하세요"
                  label="거래자 계좌번호"
                />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={4}>
            <FormController
              name="wasteExplanation"
              required={required}
              control={control}
              renderItem={props => (
                <TextInput
                  {...props}
                  area
                  placeholder="낭비가 아니라는 소명을 입력하세요"
                  label="낭비가 아니라는 소명"
                />
              )}
            />
            <FormController
              name="nonCorporateTransactionFiles"
              required={required}
              control={control}
              renderItem={props => (
                <FileUpload
                  {...props}
                  fileId="nonCorporateTransactionFiles"
                  multiple
                  initialFiles={nonCorporateTransactionFiles}
                  onChange={files =>
                    setValue("nonCorporateTransactionFiles", files, {
                      shouldValidate: true,
                    })
                  }
                />
              )}
            />
          </FlexWrapper>
        </Card>
      </EvidenceBlockTitle>
    </FlexWrapper>
  );
};

export default NonCorpEvidenceBlock;
