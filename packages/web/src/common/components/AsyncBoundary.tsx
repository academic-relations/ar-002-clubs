import React from "react";
import styled from "styled-components";
import CircleSpinner from "./Spinner/CircleSpinner";

interface IAsyncHandler {
  isLoading: boolean;
  isError: boolean;
  renderIfLoading?: React.ReactNode;
  renderIfError?: React.ReactNode;
  defaultLoadingPageHeight?: number;
}

const SpinnerWrapper = styled.div<{ defaultLoadingPageHeight?: number }>`
  width: 100%;
  height: ${({ defaultLoadingPageHeight }) =>
    defaultLoadingPageHeight
      ? `${defaultLoadingPageHeight}px`
      : "min(100%, 200px)"};
  min-height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AsyncBoundary: React.FC<React.PropsWithChildren<IAsyncHandler>> = ({
  isLoading,
  isError,
  defaultLoadingPageHeight,
  renderIfLoading = (
    <SpinnerWrapper defaultLoadingPageHeight={defaultLoadingPageHeight}>
      <CircleSpinner />
    </SpinnerWrapper>
  ),
  renderIfError = <div>Error</div>,
  children = <div>Loaded!</div>,
}) => {
  if (isLoading) {
    return renderIfLoading;
  }
  if (isError) {
    return renderIfError;
  }
  return children;
};

export default AsyncBoundary;
