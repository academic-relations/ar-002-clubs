import React, { useMemo } from "react";
import styled from "styled-components";

import colors from "@sparcs-clubs/web/styles/themes/colors";
import { formatDotDetailDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import FlexWrapper from "../FlexWrapper";
import Icon from "../Icon";
import Typography from "../Typography";

export type ToastColorType = { background: string; border: string };

interface Reason {
  datetime: Date;
  reason: React.ReactNode;
  status?: string;
}

export interface ToastProps {
  title: string;
  reasons: Reason[];
  color: "green" | "red" | "yellow";
}

const ForceBorderRadius = styled.div<{ color: ToastColorType }>`
  position: sticky;
  top: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ color }) => color.border};
  background: ${({ color }) => color.background};
  z-index: ${({ theme }) => theme.zIndices.toast};
`;

const ApproveReasonToastInner = styled.div<{ color: ToastColorType }>`
  color: ${({ theme }) => theme.colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;

  .ApproveReasonToast-title {
    padding: 12px 16px 0 16px;

    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${({ color }) => color.background};
    z-index: ${({ theme }) => theme.zIndices.toast + 1};
  }

  .ApproveReasonToast-reasons {
    display: flex;
    width: 100%;
    padding: 0 16px 12px 44px;
    flex-direction: column;
    gap: 8px;
    flex: 1 0 0;
  }

  .ApproveReasonToast-sticky-title {
    position: sticky;
    top: 0;
    background: ${({ color }) => color.background};
    z-index: ${({ theme }) => theme.zIndices.toast + 1};
  }
`;

const Toast: React.FC<ToastProps> = ({ title, reasons, color }) => {
  const toastColor: ToastColorType = useMemo(() => {
    switch (color) {
      case "red":
        return { background: colors.RED[100], border: colors.RED[600] };
      case "yellow":
        return { background: colors.YELLOW[200], border: colors.YELLOW[600] };
      case "green":
      default:
        return { background: colors.GREEN[100], border: colors.GREEN[600] };
    }
  }, []);

  return (
    <ForceBorderRadius color={toastColor}>
      <ApproveReasonToastInner color={toastColor}>
        <div className="ApproveReasonToast-title">
          <Icon type="error" size={20} color={toastColor.border} />
          <Typography fs={16} lh={24} fw="MEDIUM">
            {title}
          </Typography>
        </div>
        <div className="ApproveReasonToast-reasons">
          {reasons.map(reason => (
            <FlexWrapper
              direction="column"
              gap={4}
              key={formatDotDetailDate(reason.datetime)}
            >
              <Typography fs={14} lh={16} fw="REGULAR" color="GRAY.600">
                {formatDotDetailDate(reason.datetime)}{" "}
                {reason.status && `• ${reason.status}`}
              </Typography>
              <Typography fs={16} lh={24} fw="REGULAR">
                {reason.reason}
              </Typography>
            </FlexWrapper>
          ))}
        </div>
      </ApproveReasonToastInner>
    </ForceBorderRadius>
  );
};

export default Toast;
