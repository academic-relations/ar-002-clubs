import React from "react";

import { useFormContext } from "react-hook-form";

import Card from "@sparcs-clubs/web/common/components/Card";
import CheckboxOption from "@sparcs-clubs/web/common/components/CheckboxOption";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import FixtureEvidenceBlock from "../components/FixtureEvidenceBlock";
import NonCorpEvidenceBlock from "../components/NonCorpEvidenceBlock";
import OtherEvidenceBlock from "../components/OtherEvidenceBlock";
import TransportEvidenceBlock from "../components/TransportEvidenceBlock";
import {
  FundingFormData,
  isActivityReportUnverifiable,
} from "../types/funding";

const AddEvidenceFrame: React.FC = () => {
  const formCtx = useFormContext<FundingFormData>();
  const { control, watch } = formCtx;

  const purposeId = watch("purposeId");
  const isFixture = watch("isFixture");
  const isTransportation = watch("isTransportation");
  const isNonCorporateTransaction = watch("isNonCorporateTransaction");
  const isFoodExpense = watch("isFoodExpense");
  const isLaborContract = watch("isLaborContract");
  const isPublication = watch("isPublication");
  const isExternalEventParticipationFee = watch(
    "isExternalEventParticipationFee",
  );
  const isProfitMakingActivity = watch("isProfitMakingActivity");
  const isJointExpense = watch("isJointExpense");
  const isEtcExpense = watch("isEtcExpense");

  return (
    <FoldableSectionTitle title="추가 증빙">
      <FlexWrapper direction="column" gap={40}>
        <Card outline>
          <FlexWrapper direction="column" gap={16}>
            <Typography
              ff="PRETENDARD"
              fw="MEDIUM"
              fs={16}
              lh={20}
              color="BLACK"
            >
              추가 증빙 분류
            </Typography>
            <FlexWrapper direction="column" gap={12}>
              <CheckboxOption
                optionText="(활동보고서로 증빙이 불가능한) 동아리 용품"
                checked={isActivityReportUnverifiable(Number(purposeId))}
                onClick={() => {}}
              />
              <FormController
                name="isFixture"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="비품"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isTransportation"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="교통비"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isNonCorporateTransaction"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="비법인 거래"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isFoodExpense"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="식비"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isLaborContract"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="근로 계약"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isExternalEventParticipationFee"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="외부 행사 참가비"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isPublication"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="발간물"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isProfitMakingActivity"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="수익 사업"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isJointExpense"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="공동 경비"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
              <FormController
                name="isEtcExpense"
                control={control}
                renderItem={({ value, onChange }) => (
                  <CheckboxOption
                    optionText="기타"
                    checked={value}
                    onClick={() => onChange(!value)}
                  />
                )}
              />
            </FlexWrapper>
          </FlexWrapper>
        </Card>
        {/* 활보로 증빙 불가능한 동아리 용품 */}
        {isActivityReportUnverifiable(Number(purposeId)) && (
          <FixtureEvidenceBlock
            isFixture={false}
            required={isActivityReportUnverifiable(Number(purposeId))}
          />
        )}
        {isFixture && <FixtureEvidenceBlock isFixture required={isFixture} />}
        {isTransportation && (
          <TransportEvidenceBlock required={isTransportation} />
        )}
        {isNonCorporateTransaction && (
          <NonCorpEvidenceBlock required={isNonCorporateTransaction} />
        )}
        {isFoodExpense && (
          <FormController
            name="foodExpenseExplanation"
            required={isFoodExpense}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="식비" />
            )}
          />
        )}
        {isLaborContract && (
          <FormController
            name="laborContractExplanation"
            required={isLaborContract}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="근로 계약" />
            )}
          />
        )}
        {isExternalEventParticipationFee && (
          <FormController
            name="externalEventParticipationFeeExplanation"
            required={isExternalEventParticipationFee}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="외부 행사 참가비" />
            )}
          />
        )}
        {isPublication && (
          <FormController
            name="publicationExplanation"
            required={isPublication}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="발간물" />
            )}
          />
        )}
        {isProfitMakingActivity && (
          <FormController
            name="profitMakingActivityExplanation"
            required={isProfitMakingActivity}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="수익 사업" />
            )}
          />
        )}
        {isJointExpense && (
          <FormController
            name="jointExpenseExplanation"
            required={isJointExpense}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="공동 경비" />
            )}
          />
        )}
        {isEtcExpense && (
          <FormController
            name="etcExpenseExplanation"
            required={isEtcExpense}
            control={control}
            renderItem={props => (
              <OtherEvidenceBlock {...props} content="기타" />
            )}
          />
        )}
      </FlexWrapper>
    </FoldableSectionTitle>
  );
};
export default AddEvidenceFrame;
