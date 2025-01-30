import React from "react";

import styled from "styled-components";

import colors from "@sparcs-clubs/web/styles/themes/colors";
import { formatDotDetailDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import FlexWrapper from "./FlexWrapper";
import Icon from "./Icon";

import Typography from "./Typography";

interface Reason {
  datetime: Date;
  reason: React.ReactNode;
}

interface PartialApproveReasonToastProps {
  title: string;
  reasons: Reason[];
}

const ForceBorderRadius = styled.div`
  position: sticky;
  top: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GREEN[600]};
  background: ${({ theme }) => theme.colors.GREEN[100]};
  z-index: ${({ theme }) => theme.zIndices.toast};
`;

const PartialApproveReasonToastInner = styled.div`
  color: ${({ theme }) => theme.colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;

  .PartialApproveReasonToast-title {
    padding: 12px 16px 0 16px;

    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${({ theme }) => theme.colors.GREEN[100]};
    z-index: ${({ theme }) => theme.zIndices.toast + 1};
  }

  .PartialApproveReasonToast-reasons {
    display: flex;
    width: 100%;
    padding: 0 16px 12px 44px;
    flex-direction: column;
    gap: 8px;
    flex: 1 0 0;
  }

  .PartialApproveReasonToast-sticky-title {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.GREEN[100]};
    z-index: ${({ theme }) => theme.zIndices.toast + 1};
  }
`;

const PartialApproveReasonToast: React.FC<PartialApproveReasonToastProps> = ({
  title,
  reasons,
}) => (
  <ForceBorderRadius>
    <PartialApproveReasonToastInner>
      <div className="PartialApproveReasonToast-title">
        <Icon type="error" size={20} color={colors.GREEN[600]} />
        <Typography fs={16} lh={24} fw="MEDIUM">
          {title}
        </Typography>
      </div>
      <div className="PartialApproveReasonToast-reasons">
        {reasons.map(reason => (
          <FlexWrapper
            direction="column"
            gap={4}
            key={formatDotDetailDate(reason.datetime)}
          >
            <Typography fs={14} lh={16} fw="REGULAR" color="GRAY.600">
              {formatDotDetailDate(reason.datetime)}
            </Typography>
            <Typography fs={16} lh={24} fw="REGULAR">
              {reason.reason}
            </Typography>
          </FlexWrapper>
        ))}
      </div>
    </PartialApproveReasonToastInner>
  </ForceBorderRadius>
);

export default PartialApproveReasonToast;
