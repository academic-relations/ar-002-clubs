import React, { useCallback, useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import { storageOrderSteps } from "@sparcs-clubs/web/constants/storage";

import StorageFormFirst from "./StorageFormFirst";
import StorageFormSecond from "./StorageFormSecond";
// import StorageFormThird from "./StorageFormThird";

import type { ApiSto001RequestBody } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto001";

interface StorageFormProps {
  username: string;
  clubs: Array<{
    id: ApiSto001RequestBody["clubId"];
    name_kr: string;
    name_en: string;
  }>;
  setAgreement: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  requestForm: Partial<ApiSto001RequestBody>;
  setRequestForm: React.Dispatch<
    React.SetStateAction<Partial<ApiSto001RequestBody>>
  >;
}

const StyledButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Step2Form = [
  StorageFormFirst,
  StorageFormSecond,
  //  StorageFormThird
];

const StorageForm: React.FC<StorageFormProps> = ({
  username,
  clubs,
  setAgreement,
  step,
  setStep,
  requestForm,
  setRequestForm,
}) => {
  const CurrentForm = Step2Form[step - 1];

  const onPrev = useCallback(() => {
    if (step === 1) {
      setAgreement(false);
      return;
    }
    setStep(step - 1);
  }, [setAgreement, step, setStep]);

  const onNext = useCallback(() => {
    if (step === Step2Form.length) {
      return;
    }
    setStep(step + 1);
  }, [step, setStep]);

  const [formError, setFormError] = useState<boolean>(false);

  return (
    <FlexWrapper direction="column" gap={60}>
      <StepProcess steps={storageOrderSteps} activeStepIndex={step} />
      <CurrentForm
        username={username}
        clubs={clubs}
        requestForm={requestForm}
        setRequestForm={setRequestForm}
        setFormError={setFormError}
      />
      <StyledButton>
        <Button onClick={onPrev}>이전</Button>
        <Button type={formError ? "disabled" : "default"} onClick={onNext}>
          {/* todo!: 신청 버튼 클릭시 신청이 POST되는 API 호출이 필요합니다. */}
          {step === Step2Form.length ? "신청" : "다음"}
        </Button>
      </StyledButton>
    </FlexWrapper>
  );
};

export default StorageForm;

export type { StorageFormProps };
