/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import ItemNumberInput from "@sparcs-clubs/web/common/components/Forms/ItemNumberInput";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import type { StorageFormProps } from ".";

type StorageFormSecondProps = Pick<
  StorageFormProps,
  "requestForm" | "setRequestForm"
>;

const StorageFormSecondInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px;
`;

const StorageFormSecond: React.FC<StorageFormSecondProps> = ({
  requestForm,
}) => {
  const {
    watch,
    control,
    setValue,
    formState: { isValid },
  } = useFormContext<StorageFormSecondProps>();

  const [numberOfBoxes, setNumberOfBoxes] = useState<number>(
    requestForm?.numberOfBoxes ?? 0,
  );
  const [desiredPickUpDate, setDesiredPickUpDate] = useState<Date | undefined>(
    requestForm?.desiredPickUpDate ?? undefined,
  );
  const [desiredStartDate, setDesiredStartDate] = useState<Date | undefined>(
    requestForm?.desiredStartDate ?? undefined,
  );
  const [desiredDuration, setDesiredDuration] = useState<number>(1);
  const [desiredEndDate, setDesiredEndDate] = useState<Date | undefined>(
    requestForm?.desiredEndDate ?? undefined,
  );

  return (
    <StorageFormSecondInner>
      <Card outline gap={20}>
        <Typography>보관 물품</Typography>
        <ItemNumberInput
          label="상자 개수"
          placeholder="필요한 상자의 개수를 적어주세요"
          unit="개"
          value={numberOfBoxes.toString()}
          handleChange={value => {
            setNumberOfBoxes(Number(value));
          }}
        />
      </Card>
      <Card outline gap={20}>
        <Typography>일정 선택</Typography>
        <GridView>
          <FormController
            name="requestForm.desiredPickUpDate"
            control={control}
            renderItem={({ value, onChange }) => (
              <DateInput
                label="desiredPickUpDate"
                selected={value}
                onChange={(data: Date | null) => onChange(data)}
              />
            )}
          />
        </GridView>
      </Card>
    </StorageFormSecondInner>
  );
};

export default StorageFormSecond;
