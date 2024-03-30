import styled from "styled-components";
import { Step } from "./StepDot";

const StepLabel = styled.div<{ step: Step }>`
  color: ${props => {
    switch (props.step) {
      case Step.After:
        return props.theme.colors.GRAY[600];
      case Step.Before:
        return props.theme.colors.GRAY[300];
      case Step.Current:
      default:
        return props.theme.colors.BLACK;
    }
  }};
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: normal;
  white-space: nowrap;
`;

export default StepLabel;
