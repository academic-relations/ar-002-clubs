import React from "react";

import Toast, { ToastProps } from ".";

type ApproveReasonToastProps = Omit<ToastProps, "color">;

const ApproveReasonToast: React.FC<ApproveReasonToastProps> = ({
  title,
  reasons,
}) => <Toast title={title} reasons={reasons} color="green" />;

export default ApproveReasonToast;
