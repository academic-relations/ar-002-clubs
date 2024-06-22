import styled from "styled-components";

import { Status } from "./ProgressDot";

const ProgressLine = styled.div<{ status: Status }>`
  display: flex;
  height: 2px;
  flex: 1;
  border-radius: 0;
  background-color: ${props => {
    switch (props.status) {
      case Status.Approved:
        return props.theme.colors.PRIMARY;
      case Status.Canceled:
        return props.theme.colors.RED[600];
      case Status.Pending:
        return props.theme.colors.GRAY[300];
      default:
        return props.theme.colors.GRAY[300];
    }
  }};
`;

export default ProgressLine;
