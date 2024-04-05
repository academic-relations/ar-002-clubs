import styled from "styled-components";
import StepDot, { Step } from "./_atomic/StepDot";
import StepLabel from "./_atomic/StepLabel";

export interface StepInputType {
  label: string;
  stepIndex: number;
}

interface StepProcessProps {
  steps: StepInputType[];
  activeStepIndex: number;
}

const StepProcessInner = styled.div`
  width: 100%;
  // 디자인에서 고정값이라 일단 고정해 두었습니다.
  height: 68px;
  padding: 0px 60px;

  display: flex;
  flex-direction: column;
`;

const StepContainer = styled.div<{ width: string }>`
  display: flex;
  justify-content: space-between;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    background: ${props => props.theme.colors.GRAY[300]};
    height: 4px;
    border-radius: 2px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  &::after {
    content: "";
    position: absolute;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.MINT[300]} 100%,
      ${props => props.theme.colors.GRAY[300]} 100%
    );
    height: 4px;
    border-radius: 2px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const getStep = (activeStepIndex: number, index: number) => {
  if (activeStepIndex === index) {
    return Step.Current;
  }
  if (activeStepIndex < index) {
    return Step.Before;
  }
  return Step.After;
};

const StepProcess: React.FC<StepProcessProps> = ({
  steps,
  activeStepIndex,
}: StepProcessProps) => {
  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStepIndex - 1)}%`;

  return (
    <StepProcessInner>
      <StepContainer width={width}>
        {steps.map(({ stepIndex, label }) => (
          <StepWrapper key={stepIndex}>
            <StepDot step={getStep(activeStepIndex, stepIndex)} />
            <StepsLabelContainer>
              <StepLabel
                key={stepIndex}
                step={getStep(activeStepIndex, stepIndex)}
              >
                {label}
              </StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
    </StepProcessInner>
  );
};

export default StepProcess;
