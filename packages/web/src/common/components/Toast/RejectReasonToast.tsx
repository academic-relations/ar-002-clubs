import React from "react";

import Toast, { ToastProps } from ".";

type RejectReasonToastProps = Omit<ToastProps, "color">;

const RejectReasonToast: React.FC<RejectReasonToastProps> = ({
  title,
  reasons,
}) => <Toast title={title} reasons={reasons} color="red" />;

export default RejectReasonToast;
