import React from "react";

import styled from "styled-components";

import colors from "@sparcs-clubs/web/styles/themes/colors";

import Icon from "./Icon";

import Typography from "./Typography";

interface Reason {
  datetime: string;
  reason: React.ReactNode;
}

interface RejectReasonToastProps {
  title: string;
  reasons: Reason[];
}

const ForceBorderRadius = styled.div`
  position: sticky;
  top: 100px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.RED[600]};
  background: ${({ theme }) => theme.colors.RED[100]};
  z-index: ${({ theme }) => theme.zIndices.toast};
`;

const RejectReasonToastInner = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  display: flex;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  .RejectReasonToast-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    align-self: stretch;
    .RejectReasonToast-reasons {
      display: flex;
      width: 540px;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 8px;
      flex: 1 0 0;
    }
  }
`;

const RejectReasonToast: React.FC<RejectReasonToastProps> = ({
  title,
  reasons,
}) => (
  <ForceBorderRadius>
    <RejectReasonToastInner>
      <Icon type="error" size={20} color={colors.RED[600]} />
      <div className="RejectReasonToast-content">
        <Typography fs={16} lh={24} fw="MEDIUM">
          {title}
        </Typography>
        <div className="RejectReasonToast-reasons">
          {reasons.map(reason => (
            <div key={reason.datetime}>
              <Typography fs={14} lh={16} fw="REGULAR" color="GRAY.600">
                {reason.datetime}
              </Typography>
              <Typography fs={16} lh={24} fw="REGULAR">
                {reason.reason}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </RejectReasonToastInner>
  </ForceBorderRadius>
);

export default RejectReasonToast;
