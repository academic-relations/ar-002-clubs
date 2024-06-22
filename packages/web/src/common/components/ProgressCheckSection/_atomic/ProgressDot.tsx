import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

export enum Status {
  Approved, // 체크
  Canceled, // X
  Pending, // 빈 원
}

const ProgressDotBack = styled.div<{ status: Status }>`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: ${props =>
    props.status === Status.Pending
      ? `2px solid ${props.theme.colors.GRAY[300]}`
      : "none"};
  background-color: ${props => {
    switch (props.status) {
      case Status.Approved:
        return props.theme.colors.PRIMARY;
      case Status.Canceled:
        return props.theme.colors.RED[600];
      case Status.Pending:
      default:
        return props.theme.colors.WHITE;
    }
  }};
`;

const ProgressDot = ({ status }: { status: Status }) => (
  <ProgressDotBack status={status}>
    {status === Status.Approved && (
      <Icon type="check" color="white" size={16} />
    )}
    {status === Status.Canceled && (
      <Icon type="close" color="white" size={16} />
    )}
  </ProgressDotBack>
);

export default ProgressDot;
