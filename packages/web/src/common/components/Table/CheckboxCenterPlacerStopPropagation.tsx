import React from "react";

import { styled } from "styled-components";

const CheckboxCenterPlacer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CheckboxCenterPlacerStopPropagation: React.FC<
  React.PropsWithChildren<{ onClick?: (e: React.MouseEvent) => void }>
> = ({ children = <div />, onClick = () => {} }) => (
  <CheckboxCenterPlacer
    onClick={e => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    }}
  >
    {children}
  </CheckboxCenterPlacer>
);

export default CheckboxCenterPlacerStopPropagation;
