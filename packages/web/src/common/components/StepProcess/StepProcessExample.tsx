import { useState } from "react";
import styled from "styled-components";
import StepProcess, { StepInputType } from "./StepProcess";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 100px;
`;

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: ${props => props.theme.colors.PRIMARY};
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const steps: StepInputType[] = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "대여 물품 선택",
    stepIndex: 2,
  },
  {
    label: "최종확인",
    stepIndex: 3,
  },
];

const StepProcessExample = () => {
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <StepProcess steps={steps} activeStepIndex={activeStep} />
      <ButtonsContainer>
        <ButtonStyle onClick={prevStep} disabled={activeStep === 1}>
          Previous
        </ButtonStyle>
        <ButtonStyle onClick={nextStep} disabled={activeStep === steps.length}>
          Next
        </ButtonStyle>
      </ButtonsContainer>
    </div>
  );
};

export default StepProcessExample;
