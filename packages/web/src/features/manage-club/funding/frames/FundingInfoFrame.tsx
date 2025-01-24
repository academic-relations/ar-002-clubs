import React from "react";

import { useFormContext } from "react-hook-form";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Card from "@sparcs-clubs/web/common/components/Card";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import UnitInput from "@sparcs-clubs/web/common/components/Forms/UnitInput";
import Select from "@sparcs-clubs/web/common/components/Select";
import useGetActivityAvailable from "@sparcs-clubs/web/features/activity-report/services/useGetActivityAvailable";
import { FundingInfo } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;

  > div {
    flex: 1;
  }
`;
const FundingInfoFrame: React.FC<{ clubId: number }> = ({ clubId }) => {
  const formCtx = useFormContext<FundingInfo>();
  const { control } = formCtx;

  const {
    data: purposeActivity,
    isLoading,
    isError,
  } = useGetActivityAvailable({ clubId });

  const purposeItems = [
    ...(purposeActivity?.activities.map(activity => ({
      value: activity.id,
      label: activity.name,
    })) ?? []),
    { value: Infinity, label: "활동보고서로 증빙 불가" },
  ];

  return (
    <FoldableSectionTitle title="지원금 정보">
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Card outline gap={32}>
          <FormController
            name="name"
            required
            control={control}
            renderItem={props => (
              <TextInput
                {...props}
                label="항목명"
                placeholder="항목명을 입력하세요"
              />
            )}
          />
          <RowWrapper>
            <FormController
              name="purposeActivity.id"
              required
              control={control}
              renderItem={props => (
                <Select
                  {...props}
                  items={purposeItems}
                  label="지출 목적"
                  placeholder="지출 목적을 선택해주세요"
                />
              )}
            />
            <FormController
              name="expenditureDate"
              required
              control={control}
              renderItem={({ value, onChange, errorMessage }) => (
                <DateInput
                  label="지출 일자"
                  placeholder="20XX.XX.XX"
                  selected={value}
                  onChange={(data: Date | null) => {
                    onChange(data);
                  }}
                  errorMessage={errorMessage}
                  showIcon
                />
              )}
            />
            <FormController
              name="expenditureAmount"
              required
              control={control}
              renderItem={({ value, onChange }) => (
                <UnitInput
                  label="지출 금액"
                  placeholder="금액을 입력해주세요"
                  unit="원"
                  value={value?.toString()}
                  handleChange={onChange}
                  setErrorStatus={() => {}}
                />
              )}
            />
          </RowWrapper>
        </Card>
      </AsyncBoundary>
    </FoldableSectionTitle>
  );
};
export default FundingInfoFrame;
