import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";

interface FlexWrapperProps {
  direction: "row" | "column";
  gap: number;
}

const FlexWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<FlexWrapperProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => `${gap}px`};
`;

export default FlexWrapper;
